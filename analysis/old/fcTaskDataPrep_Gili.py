import os  
import json  
import numpy as np  
import matplotlib.pyplot as plt  
from glob import glob


# adjust path to where the data is  
files = glob('../data/data_jun_20/s*_scream_acq_ext_*[0-9].json')

# files = [os.path.join(dp, f) for dp, dn, filenames in os.walk(data_path) for f in filenames if f.endswith('acqext.json')]  
  
Nsj = len(files)  
  
allData = [{} for _ in range(Nsj)]  
  
for sj in range(Nsj):  
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
  
    filename = files[sj]  
  
    # take data saved at end of json file  
    with open(filename, 'r') as file:  
        e = json.load(file)  
    d = e[-1]  
  
    # add expectancy ratings of CS-  
    for i in range(len(d['expectancy_cs_minus'])):  
        if not d['expectancy_cs_minus'][i]:  
            addnum = np.nan  
        else:  
            addnum = float(d['expectancy_cs_minus'][i])  
        exp_minus.append(addnum)  
  
    # add expectancy ratings of CS+  
    for i in range(len(d['expectancy_cs_plus'])):  
        if not d['expectancy_cs_plus'][i]:  
            addnum = np.nan  
        else:  
            addnum = float(d['expectancy_cs_plus'][i])  
        exp_plus.append(addnum)  
  
    allData[sj]['exp_plus'] = np.array(exp_plus)  
    allData[sj]['exp_minus'] = np.array(exp_minus)  
  
    # save information on experiment design  
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
  
    # save practice ratings  
    practRatings = []  
    for i in range(len(d['trial_type'])):  
        a = d['trial_type'][i]  
  
        if a == 'expectancy-rating':  
            newS = e[i]  
            if 'csRating' in newS:  
                try:  
                    practRatings.append(float(e[i]['csRating']))  
                except ValueError:  
                    practRatings.append(np.nan)  
  
    try:  
        j = 1  
        exp_order_reorg = exp_order.copy()  
        for k in range(len(exp_order)):  
            if exp_order[k] == 3:  
                exp_order_reorg[k] = StimSeq[j - 1]  
                j += 1  
  
        b = [i for i, x in enumerate(exp_order) if x == 3]  
    except Exception as e:  
        print(f'StimSeq not correct for subject {sj}')  
  
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
  
    # save information for each subject in struct  
    allData[sj]['pleasM'] = pleasM  
    allData[sj]['pleasP'] = pleasP  
  
    allData[sj]['RTM'] = np.abs(d['fc_rt'][np.array(StimSeq) == 1])  
    allData[sj]['RTP'] = np.abs(d['fc_rt'][np.array(StimSeq) == 2])  
    allData[sj]['RT'] = np.abs(d['fc_rt'])  
  
    allData[sj]['StimSeq'] = StimSeq  
    allData[sj]['cs'] = StimSeq  
    allData[sj]['us'] = us  
    try:  
        allData[sj]['exp_order'] = exp_order  
    except Exception as e:  
        pass  
  
    allData[sj]['exp_order_reorg'] = exp_order_reorg  
    allData[sj]['ID'] = filename[0:24]  
    allData[sj]['d'] = d  
    allData[sj]['trial_type'] = d['trial_type']  
    allData[sj]['practRatings'] = practRatings  
  
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
    if len(allData[sj]['exp_minus']) == 20:  
        exp_minus_mat.append(allData[sj]['exp_minus'])  
        exp_plus_mat.append(allData[sj]['exp_plus'])  
    else:  
        print(f'sj {sj} not added')  
  
for sj in range(Nsj):  
    try:  
        if len(allData[sj]['pleasM']) == 6:  
            pleasM_mat.append(allData[sj]['pleasM'])  
            pleasP_mat.append(allData[sj]['pleasP'])  
  
        RTP_mat.append(allData[sj]['RTP'])  
        RTM_mat.append(allData[sj]['RTM'])  
        RT_mat.append(allData[sj]['RT'])  
  
    except Exception as e:  
        print(f'sj {sj} not added')  
  
exp_minus_mat = np.array(exp_minus_mat).T  
exp_plus_mat = np.array(exp_plus_mat).T  
pleasM_mat = np.array(pleasM_mat)  
pleasP_mat = np.array(pleasP_mat)  
RTM_mat = np.array(RTM_mat).T  
RTP_mat = np.array(RTP_mat).T  
RT_mat = np.array(RT_mat).T  
  
mExpMinus = np.mean(exp_minus_mat, axis=1)  
mExpPlus = np.mean(exp_plus_mat, axis=1)  
  
mPleasM = np.mean(pleasM_mat, axis=0)  
mPleasP = np.mean(pleasP_mat, axis=0)  
  
mRTP = np.mean(RTP_mat, axis=1)  
mRTM = np.mean(RTM_mat, axis=1)  
mRT = np.mean(RT_mat, axis=1)  
  
# prep data for plotting  
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
  
plt.plot(CSminusInt[4:], linewidth=2)  
plt.plot(CSplusInt[4:], linewidth=2)  
plt.show()  
  
# plot average expectancy ratings and reaction times  
fig, (ax1, ax2) = plt.subplots(1, 2)  
  
ax1.plot(range(1, 21), mExpMinus, linewidth=3)  
ax1.plot(range(1, 21), mExpPlus, linewidth=3)  
  
ax2.plot(range(1, 29), mRTM)  
ax2.plot(range(1, 35), mRTP)  
  
plt.show()  
  
# plot affective ratings  
fig, ax = plt.subplots()  
  
ax.plot(range(1, 7), mPleasM, linewidth=3)  
ax.plot(range(1, 7), mPleasP, linewidth=3)  
ax.set_ylim([1, 100])  
ax.set_ylabel('Pleasant')  
  
plt.show()  
