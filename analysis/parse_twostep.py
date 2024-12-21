import os, json
import numpy as np
from os.path import dirname, join
from pandas import DataFrame, concat, read_csv
from tqdm import tqdm
from numpy import mean
import matplotlib.pyplot as plt
import seaborn as sns 


def get_data(files, name_index=21):
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
    ### Main loop.
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

    ## Preallocate space.
    data = []

    cols = ['trial','drift_ix','state_1_key','state_1_choice','state_1_rt',
                'transition','state','state_2_key','state_2_choice','state_2_rt','outcome',#'fullscreen'
                'minimum_resolution','browser_interactions', 'missing']

    for f in tqdm(files):
        
        ## Define subject
        subject = f[name_index:name_index+3]
        
        ## Load JSON.
        with open(f, 'r') as tmp:
            JSON = json.load(tmp)
        
        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
        ### Assemble data.
        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
        
        ## Extract two-step task.
        df = [dd for dd in JSON if dd['trial_type'] == 'two-step-trial']
        df = DataFrame(df).query('trial > 0') # and missing == False')
        
        ## Reduce to columns of interest.
     
        df = df[cols]
        
        ## Format columns.
        df['state'] = df.state.replace({0: 2, 1: 3})
        df['state_1_choice'] = df.state_1_choice.replace({0:1, 1:0}) ## why?
        df['state_1_rt'] = np.round(df['state_1_rt'] * 1e-3, 3)
        df['state_2_rt'] = np.round(df['state_2_rt'] * 1e-3, 3)
        df = df.rename(columns={'state': 'state_2'})
        df.insert(0, 'subject', subject)


        df['state_2_local_choice'] = df.state_2_choice.replace({0:0, 1:1, 2:0, 3:1})
        df['prev_outcome'] = np.roll(df.outcome, 1)
        df['prev_trans'] = np.roll(df.transition, 1)
        df['prev_state_1_choice'] = np.roll(df.state_1_choice, 1)
        df['state_1_stay'] = np.where(df.state_1_choice == df.prev_state_1_choice, 1, 0)

        # df = df.query('missing == False')
        df['missing'] = df['missing'].astype(int)
        
        ## Append.
        data.append(df)
        
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
    ### Save data.
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

    ## Concatenate data.
    data = concat(data).sort_values(['subject','trial'])

    ## Save data.
    # data.to_csv(os.path.join(DATA_DIR , 'twostep.tsv.gz'), index=False, sep='\t', compression='gzip')
    return data




def plot_behvaior(df, x='outcome', y='state_1_stay', hue='transition', ylim=.5):
    '''
    input: dataframe of data, including columns:
        stage_2_outcome - reward
        stage_1_stay - stay 
        comm_trans - common
        exp_group - group
    
    output: none, plots bar
    '''    

    g = sns.catplot(
        data=df, kind="bar",
        x=x, 
        y=y, 
        hue=hue, 
        estimator=mean,
        hue_order=[1, 0], # common / rare
        order=[1,0], #rewarded / unrewarded
  
        legend=True)

    plt.ylim(ylim, None)
    g.set_xticklabels(['rewarded','unrewarded'])
    #g.set(xlabel="Reward", ylabel = "Stay")

    g.fig.subplots_adjust(top=0.9) # adjust the Figure in rp
    g.fig.suptitle('Factorial Analysis of Choice Behavior')  
    
    leg = g._legend
    new_labels = ['Common', 'Rare']
    for t, l in zip(leg.texts, new_labels): t.set_text(l)

