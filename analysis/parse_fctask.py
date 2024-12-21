import os, json
import numpy as np
from os.path import dirname
from pandas import DataFrame, concat
from tqdm import tqdm

def get_data_acq(files, name_index=21):

    ## Preallocate space.
    DATA_ACQEXT = []

    for file in tqdm(files):

        ## Load file.
        subject = file[name_index:name_index+3]

        with open(file, 'r') as f:
            JSON = json.load(f)

        
        data_to_pd = []
        for dd in JSON:
            if (dd['trial_type'] == 'fctask-trial') or (dd['trial_type']=='expectancy-rating'):
                data_to_pd.append(dd)
        
        data = DataFrame(data_to_pd)

        data['fc_rt'] = np.round(data.fc_rt * 1e-3, 3)
        data['fc_key'] = data['fc_key'].replace({32.0:1})
        data['time_elapsed'] = np.round(data.time_elapsed * 1e-3, 3)

        data['totalTime'] = np.round(data.totalTime * 1e-3, 3)

        # update phases
        phases = ['practice', 'acquisitionBlockOne', 'acquisitionBlockTwo', 'extinctionBlockOne', 'extinctionBlockTwo', 'extinctionBlockThree']

        data['exp_phase']='a'
        phases_for_expectacy = {phase:0 for phase in phases}
        for phase in phases:
            # print(phase)
            # print(np.where(data['fc_phase']==phase)[0][0])

            phases_for_expectacy[phase] = np.where(data['fc_phase']==phase)[0][0]

        for i, row in data.iterrows():
            for phase in phases:
                if row['trial_index'] >= phases_for_expectacy[phase]:
                    data.at[i,'exp_phase'] = phase


        # data['csMinusRating'] = np.where(data.csMinusRating.isna(), data.csMinusResponses, data.csMinusRating)
        # data['csPlusRating'] = np.where(data.csPlusRating.isna(), data.csPlusResponses , data.csPlusRating)

        data['csMinusRating'] = data['csMinusResponses'].map(lambda x: x[-1] if (type(x)==type([]) and len(x)>0) else np.nan) 
        data['csPlusRating'] = data['csPlusResponses'].map(lambda x: x[-1] if (type(x)==type([]) and len(x)>0) else np.nan) 

        data['csMinusRating'] = data['csMinusRating'].astype(float)
        data['csPlusRating'] = data['csPlusRating'].astype(float)

        # data['csMinusRating'] = np.where(data.csMinusRating.isna(), data.csRating , data.csMinusRating)
        # data['csMinusRTs'] = np.where(data.csMinusRTs.isna(), data.csRTs , data.csMinusRTs)
# 
        data['csMinusRTs'] = data.csMinusRTs.map(lambda x: x[0] if (type(x)==type([]) and len(x)>0) else np.nan) 
        data['csPlusRTs'] = data.csPlusRTs.map(lambda x: x[0] if (type(x)==type([]) and len(x)>0) else np.nan) 
        data['csRTs'] = data.csPlusRTs.map(lambda x: x[0] if (type(x)==type([]) and len(x)>0) else np.nan) 

        data['csPlusRTs'] = np.round(data.csPlusRTs * 1e-3, 3) 
        data['csMinusRTs'] = np.round(data.csMinusRTs * 1e-3, 3) 
        data['csRTs'] = np.round(data.csRTs * 1e-3, 3) 


        data['er_trial'] = np.nan
        data['practice'] = False

        trial_count = 0
        for r, row in data.iterrows():
            if row['trial_type']=='expectancy-rating':
                if row['sequence']==['CS']:
                    data.at[r,'practice'] = True
                else:
                    data.at[r,'er_trial'] = trial_count
                    trial_count+=1



        data.insert(0,'subject',subject)

        DATA_ACQEXT.append(data)

    DATA_ACQEXT = concat(DATA_ACQEXT).sort_values(['subject','trial_index'])
    DATA_ACQEXT = DATA_ACQEXT.reset_index()

    DATA_ACQEXT['phase'] = DATA_ACQEXT.exp_phase.map(lambda x: x[:3])
    # DATA_ACQEXT.er_trial= DATA_ACQEXT.er_trial.astype('int')

    return DATA_ACQEXT


def get_data_rec(files, name_index=21):


    ## Preallocate space.
    DATA_REC = []

    for file in tqdm(files):

        ## Load file.
        subject = file[name_index:name_index+3]

        with open(file, 'r') as f:
            JSON = json.load(f)

        
        data_to_pd = []
        for dd in JSON:
            if (dd['trial_type'] == 'fctask-trial') or (dd['trial_type']=='expectancy-rating'):
                data_to_pd.append(dd)
        
        data = DataFrame(data_to_pd)

        # data['fc_rt'] = np.round(data.fc_rt * 1e-3, 3)
        data['fc_key'] = data['fc_key'].replace({32.0:1})
        data['time_elapsed'] = np.round(data.time_elapsed * 1e-3, 3)

  
        data['totalTime'] = np.round(data.totalTime * 1e-3, 3)

        # update phases
        # phases = ['practice', 'acquisitionBlockOne', 'acquisitionBlockTwo', 'extinctionBlockOne', 'extinctionBlockTwo', 'extinctionBlockThree']
        # abs_phases = ['n/a', 'acquisition', 'acquisition', 'extinction', 'extinction', 'extinction']

        # data['exp_phase']='a'
        # data['phase']='a'
        # phases_for_expectacy = {phase:0 for phase in phases}
        # for phase in phases:
        #     # print(phase)
        #     # print(np.where(data['fc_phase']==phase)[0][0])

        #     phases_for_expectacy[phase] = np.where(data['fc_phase']==phase)[0][0]

        # for i, row in data.iterrows():
        #     for phase, abs_phase in zip(phases, abs_phases):
        #         if row['trial_index'] >= phases_for_expectacy[phase]:
        #             data.at[i,'exp_phase'] = phase
        #             data.at[i,'phase'] = abs_phase



        # data['csMinusRating'] = np.where(data.csMinusRating.isna(), data.csMinusResponses, data.csMinusRating)
        # data['csPlusRating'] = np.where(data.csPlusRating.isna(), data.csPlusResponses , data.csPlusRating)

        data['csMinusRating'] = data['csMinusResponses'].map(lambda x: x[-1] if (type(x)==type([]) and len(x)>0) else np.nan) 
        data['csPlusRating'] = data['csPlusResponses'].map(lambda x: x[-1] if (type(x)==type([]) and len(x)>0) else np.nan) 

        data['csMinusRating'] = data['csMinusRating'].astype(float)
        data['csPlusRating'] = data['csPlusRating'].astype(float)



        data['csMinusRTs'] = data.csMinusRTs.map(lambda x: x[0] if (type(x)==type([]) and len(x)>0) else np.nan) 
        data['csPlusRTs'] = data.csPlusRTs.map(lambda x: x[0] if (type(x)==type([]) and len(x)>0) else np.nan) 
        data['csRTs'] = data.csPlusRTs.map(lambda x: x[0] if (type(x)==type([]) and len(x)>0) else np.nan) 

        data['csPlusRTs'] = np.round(data.csPlusRTs * 1e-3, 3) 
        data['csMinusRTs'] = np.round(data.csMinusRTs * 1e-3, 3) 
        data['csRTs'] = np.round(data.csRTs * 1e-3, 3) 
        
        data.insert(0,'subject',subject)

        data['er_trial'] = np.nan
        trial_count = 0
        for r, row in data.iterrows():
            if row['trial_type']=='expectancy-rating':
                data.at[r,'er_trial'] = trial_count
                trial_count+=1



        DATA_REC.append(data)

    DATA_REC = concat(DATA_REC).sort_values(['subject','trial_index'])
    DATA_REC = DATA_REC.reset_index()

    return DATA_REC