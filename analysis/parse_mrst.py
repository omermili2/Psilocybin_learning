import os, json
import numpy as np
from os.path import dirname
from pandas import DataFrame, concat
from tqdm import tqdm

def get_data(files, name_index=21):
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
    ### Main loop.
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

    ## Preallocate space.
    DATA = []


    ## Define columns of interest.
    cols = ['block', 'trial', 'exposure', 'bandit', 'probability', 'stimulus', 'accuracy',
        'card_color', 'card_points', 'key_press', 'choice', 'rt', 'outcome', #'fullscreen',
        'minimum_resolution', 'browser_interactions', 'missing']
    

    for f in tqdm(files):

        ## Load file.
        subject = f[name_index:name_index+3]


        with open(f) as f:
            JSON = json.load(f)

        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
        ### Assemble behavioral data.
        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

        ## Assemble behavioral data.
        data = DataFrame([dd for dd in JSON if dd['trial_type'] == 'mrst-trial'])
        data = data.query('phase == "experiment"')
        
        ## Handle missing data.
        n_missing = data.missing.sum()
        data['missing'] = data['missing'].astype(int)
        # data = data.query('missing == False').reset_index(drop=True)

        #remove duplicates
        clean_data = []
        for trial in set(data.trial):
            rows = data[data.trial==trial] 
            n_pd = len(rows)
            if n_pd > 1:
                clean_data.append(rows.query('missing==0'))
            else:
                clean_data.append(rows)
        
        clean_data = concat(clean_data)
        data = clean_data

        data = data[cols]
        
        ## Limit to columns of interest.
        data = data[cols]
        
        ## Reformat columns.
        data[['block','trial','bandit','exposure']] = data[['block','trial','bandit','exposure']].astype(int)
        data['stimulus'] = [s.split('/')[-1].replace('.svg','') for s in data.stimulus]
        data['rt'] = np.round(data.rt * 1e-3, 3)
        
        ## Add subject. Append.
        data.insert(0,'subject',subject)
        DATA.append(data)
        
    ## Concatenate data.
    DATA = concat(DATA).sort_values(['subject','trial'])

    ## Save.
    # DATA.to_csv(os.path.join(DATA_DIR, 'risk.tsv.gz'), index=False, sep='\t', compression='gzip')
    return DATA