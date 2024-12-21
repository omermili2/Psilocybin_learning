
import os, json
import numpy as np
from os.path import dirname
import pandas as pd

from pandas import DataFrame, concat
from tqdm import tqdm


## Identify block runsheet.
def block_version(df):
    session = df.name[1]; robots = df[:4].value_counts()
    if  (robots['NGAL'] == 2): return '1a'
    else: return '1b'
    # elif (session == 2) and (robots['GAL'] == 2): return '2b'
    # elif (session == 2): return '2a'
    # elif (session == 3) and (robots['NGW'] == 2): return '3b'
    # else: return '3a'


def get_data(files, name_index=21):
    '''
    parses PGNG files,
    see readme file for data dict
    
    '''
    DATA = []    
    ## Define columns of interest.
    cols = ['block','trial','stimulus','valence','action','robot','rune','rune_set','correct',
            'choice','rt','accuracy','sham','outcome','total_keys']
    
    for file in files:

        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
        ### Load JSON file.
        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
        
        ## Load file.
        subject = file[name_index:name_index+3]

        with open(file, 'r') as f:
            JSON = json.load(f)

        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
        ### Assemble behavioral data.
        #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

        ## Assemble behavioral data.
        data = pd.DataFrame([dd for dd in JSON if dd['trial_type'] == 'pgng-trial'])
        data = data.query('block > 0').reset_index(drop=True)

        ## Limit to columns of interest.
        data = data[cols]

        ## Reformat columns.
        data['block'] = data.block.astype(int)
        data['trial'] = data.trial.astype(int)
        data['stimulus'] = np.where(data.block == 1, 0, 12) + (data.stimulus.astype(int) + 1)
        data['correct'] = data.correct.replace({32: 1, -1:0})
        data['choice'] = data.choice.replace({32: 1, -1:0})
        data['rt'] = np.where(data.rt < 0, np.nan, data['rt'] * 1e-3).round(3)
        data['robot'] = data.robot.replace({1:'GW',2:'NGW',3:'GAL',4:'NGAL'})

            ## Define exposure.
        f = lambda x: np.arange(x.size)+1
        data.insert(2,'exposure',data.groupby('rune').trial.transform(f))

        ## Add subject.
        data.insert(0,'subject',subject)
        # data.insert(1,'session',int(session[-1]))
        data.insert(3,'runsheet',0)
            
        ## Append.
        DATA.append(data)
    
    DATA = concat(DATA).sort_values(['subject','trial'])

    
    # DATA['runsheet'] = DATA.groupby(['subject','block']).robot.transform(block_version)
    ## Format data.
    DATA = DATA.rename(columns={col: col.lower() for col in DATA.columns})
    DATA['valence'] = DATA.valence.replace({k: k.lower() for k in DATA.valence.unique()})
    DATA['action'] = DATA.action.replace({k: k.lower() for k in DATA.action.unique()})
    DATA['robot'] = DATA.robot.replace({k: k.lower() for k in DATA.robot.unique()})
    DATA['choice'].replace({" ":1}, inplace=True)
    DATA['correct'].replace({" ":1}, inplace=True)

    
    ## Standardize stimuli.
    DATA['x1'] = DATA.robot.replace({'gw': 1, 'ngw': 2, 'gal': 3, 'ngal': 4})
    DATA['x2'] = DATA.groupby(['subject','stimulus']).exposure.transform(np.max)
    DATA['stimulus'] = DATA.apply(lambda x: '%s_%0.2d_%0.2d' %(x.rune_set[-1], x.x1, x.x2), 1)
    DATA['stimulus'] = np.unique(DATA.stimulus, return_inverse=True)[-1] + 1
    DATA = DATA.drop(columns=['x1','x2'])

    return DATA

