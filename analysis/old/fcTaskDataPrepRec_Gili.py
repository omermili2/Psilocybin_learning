import os  
import json  
import numpy as np  
import matplotlib.pyplot as plt  
from glob import glob

# Note: Run this file after you loaded already the acquisition and  
# extinction data. It will load each subject in the same allData struct and  
# match the data. It works on the assumptions that each subject who as  
# recovery data also has acquisition data.  
  
# %% upload data  
  
# update directory  
files = glob('../data/data_jun_20/s*_scream_recovery_*[0-9].json')
  
Nsj = len(files)
# %% organize data for each subjects and compute bonus scores  
  
filenameCount = 0  
allData = []

for sj in range(Nsj):  
  
    filename = files[filenameCount]  
  
    # if allData[sj]['ID'] == filename[1:25]:  
  
    exp_minus = []  
    exp_plus = []  
    pleasM = []  
    anxM = []  
    fearM = []  

    pleasP = []  
    anxP = []  
    fearP = []  

    gad = []  
    phq = []  

    correctLetters = 0  
  
    # load json file data added at the end from all trials  
    with open(filename, 'r') as f:  
        e = json.load(f)  
    d = e[-1]  
  
    # add expectancy ratings for CS minus  
    for i in range(len(d['expectancy_cs_minus'])):  
        if not d['expectancy_cs_minus'][i]:  
            addnum = np.nan  
        else:  
            addnum = float(d['expectancy_cs_minus'][i])  
        exp_minus.append(addnum)  

    # add expectancy ratings for CS minus  
    for i in range(len(d['expectancy_cs_plus'])):  
        if not d['expectancy_cs_plus'][i]:  
            addnum = np.nan  
        else:  
            addnum = float(d['expectancy_cs_plus'][i])  
        exp_plus.append(addnum)  
  
    allData[sj]['exp_plus_R'] = np.array(exp_plus)  
    allData[sj]['exp_minus_R'] = np.array(exp_minus)  

    # add study design information  
    StimSeq = []  
    for i in range(len(d['stimulus_image'])):  
        a = d['stimulus_image'][i]  
        if a[31] == 'c':  
            StimSeq.append(1)  
        else:  
            StimSeq.append(2)  

    us = []  
    for i in range(len(d['stimulus_audio'])):  
        a = d['stimulus_audio'][i]  
        if len(a) > 4 and a[33] == 's':  
            us.append(1)  
        else:  
            us.append(0)  
  
    exp_order = []  
    for i in range(len(d['trial_type'])):  
        a = d['trial_type'][i]  
        if a == 'fctask-trial':  
            exp_order.append(3)  
        elif a == 'expectancy-rating':  
            exp_order.append(4)  

    j = 1  
    exp_order_reorg = exp_order.copy()  
    for k in range(len(exp_order)):  
        if exp_order[k] == 3:  
            exp_order_reorg[k] = StimSeq[j - 1]  
            j += 1  

    b = [i for i, x in enumerate(exp_order) if x == 3]  

    # add affective ratings  
    for i in range(len(d['affective_cs_plus'])):  
  
        if not d['affective_cs_plus'][i]:  
            addnum = np.nan  
        else:  
            addnum = float(d['affective_cs_plus'][i])  
        pleasP.append(addnum)  

        if not d['affective_cs_minus'][i]:  
            addnum = np.nan  
        else:  
            addnum = float(d['affective_cs_minus'][i])  
        pleasM.append(addnum)  

    # add information to struct '_R' indicates that this is the recovery  
    # data  
    allData[sj]['pleasM_R'] = pleasM  
    allData[sj]['pleasP_R'] = pleasP  
    allData[sj]['RTM_R'] = np.abs(d['fc_rt'][np.array(StimSeq) == 1])  
    allData[sj]['RTP_R'] = np.abs(d['fc_rt'][np.array(StimSeq) == 2])  
    allData[sj]['RT_R'] = np.abs(d['fc_rt'])  
  
    allData[sj]['StimSeq_R'] = StimSeq  
    allData[sj]['cs_R'] = StimSeq  
    allData[sj]['us_R'] = us  
    allData[sj]['exp_order_R'] = exp_order  

    allData[sj]['exp_order_reorg_R'] = exp_order_reorg  
    allData[sj]['ID_R'] = filename[1:25]  
    filenameCount += 1  
    allData[sj]['d_R'] = d  
    allData[sj]['trial_type_R'] = d['trial_type']  

else:  

    print(f'file not added {filename} at sj {sj}')  
  
exp_minus_mat = []  
exp_plus_mat = []  
pleasM_mat = []  
anxM_mat = []  
fearM_mat = []  
pleasP_mat = []  
anxP_mat = []  
fearP_mat = []  
RTM_mat = []  
RTP_mat = []  
RT_mat = []  
  
for sj in range(Nsj):  
    if len(allData[sj]['exp_minus_R']) == 11:  
        exp_minus_mat.append(allData[sj]['exp_minus_R'])  
        exp_plus_mat.append(allData[sj]['exp_plus_R'])  
    else:  
        print(f'sj {sj} not added')  
  
for sj in range(Nsj):  
  
    try:  
        pleasM_mat.append(allData[sj]['pleasM_R'])  
        pleasP_mat.append(allData[sj]['pleasP_R'])  
        RTP_mat.append(allData[sj]['RTP_R'])  
        RTM_mat.append(allData[sj]['RTM_R'])  
        RT_mat.append(allData[sj]['RT_R'])  
  
    except:  
        print(f'sj {sj} not added')  
  
mExpMinus = np.nanmean(exp_minus_mat, axis=1)  
mExpPlus = np.nanmean(exp_plus_mat, axis=1)  
  
mPleasM = np.nanmean(pleasM_mat, axis=0)  
mPleasP = np.nanmean(pleasP_mat, axis=0)  
  
mRTP = np.nanmean(RTP_mat, axis=1)  
mRTM = np.nanmean(RTM_mat, axis=1)  
mRT = np.nanmean(RT_mat, axis=1)  
  
# prep information for plotting  
nTrials = (len(mRTM) + len(mRTP))  
CSplus = []  
CSminus = []  
otherCS = []  
for i in range(nTrials):  
    if StimSeq[i] == 2:  # double-check if StimEst is the same for everybody.  
        CSplus.append(mRT[i])  
        CSminus.append(np.nan)  
    else:  
        CSminus.append(mRT[i])  
        CSplus.append(np.nan)  
  
CSplusInt = np.interp(np.arange(len(CSplus)), np.flatnonzero(~np.isnan(CSplus)), np.array(CSplus)[~np.isnan(CSplus)])  
CSminusInt = np.interp(np.arange(len(CSminus)), np.flatnonzero(~np.isnan(CSminus)), np.array(CSminus)[~np.isnan(CSminus)])  
  
plt.figure()  
plt.plot(CSminusInt[4:], linewidth=2)  
plt.plot(CSplusInt[4:], linewidth=2)  
plt.show()  
  
# plot average expectancy and RT data  
fig, axs = plt.subplots(1, 2)  
  
axs[0].plot(range(1, 12), mExpMinus, linewidth=3)  
axs[0].plot(range(1, 12), mExpPlus, linewidth=3)  
  
axs[1].plot(range(1, 13), mRTM)  
axs[1].plot(range(1, 21), mRTP)  
  
plt.show()  
  
# plot affective ratings  
nRat = mPleasM.shape[0]  
fig, ax = plt.subplots()  
  
ax.plot(range(1, nRat + 1), mPleasM, linewidth=3)  
ax.plot(range(1, nRat + 1), mPleasP, linewidth=3)  
ax.set_ylim([1, 100])  
ax.set_ylabel('Pleasant')  
  
plt.show()  
