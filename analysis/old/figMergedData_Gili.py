import numpy as np  
import matplotlib.pyplot as plt  
  
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
excl = []  
  
# merge data from acquisition and recovery  
for sj in range(allData.shape[1]):  
    if len(allData[sj].exp_minus) == 20 and len(allData[sj].exp_minus_R) == 11:  
        dataToAdd = np.concatenate((allData[sj].exp_minus, allData[sj].exp_minus_R))  
        exp_minus_mat.append(dataToAdd)  
        dataToAdd = np.concatenate((allData[sj].exp_plus, allData[sj].exp_plus_R))  
        exp_plus_mat.append(dataToAdd)  
    else:  
        print(f'sj {sj} not added')  
        excl.append(sj)  
  
allData = np.delete(allData, excl, axis=1)  
  
excl = []  
for sj in range(allData.shape[1]):  
    try:  
        pleasM_mat.append(np.concatenate((allData[sj].pleasM, allData[sj].pleasM_R)))  
        pleasP_mat.append(np.concatenate((allData[sj].pleasP, allData[sj].pleasP_R)))  
  
        dataToAdd = np.concatenate((allData[sj].RTP, allData[sj].RTP_R))  
        RTP_mat.append(dataToAdd)  
  
        dataToAdd = np.concatenate((allData[sj].RTM, allData[sj].RTM_R))  
        RTM_mat.append(dataToAdd)  
  
        dataToAdd = np.concatenate((allData[sj].RT, allData[sj].RT_R))  
        RT_mat.append(dataToAdd)  
  
    except:  
        print(f'sj {sj} not added')  
        excl.append(sj)  
  
# only continue with participants who have complete dataset  
allData = np.delete(allData, excl, axis=1)  
  
mExpMinus = np.nanmean(exp_minus_mat, axis=1)  
mExpPlus = np.nanmean(exp_plus_mat, axis=1)  
  
mPleasM = np.nanmean(pleasM_mat, axis=0)  
mPleasP = np.nanmean(pleasP_mat, axis=0)  
  
mRTP = np.nanmean(RTP_mat, axis=1)  
mRTM = np.nanmean(RTM_mat, axis=1)  
mRT = np.nanmean(RT_mat, axis=1)  
  
StimSeq_Merged = np.concatenate((allData[0].StimSeq, allData[0].StimSeq_R))  
  
# prep plotting  
nTrials = (len(mRTM) + len(mRTP))  
CSplus = []  
CSminus = []  
otherCS = []  
for i in range(nTrials):  
    if StimSeq_Merged[i] == 2:  
        CSplus.append(mRT[i])  
        CSminus.append(np.nan)  
    else:  
        CSminus.append(mRT[i])  
        CSplus.append(np.nan)  
  
CSplusInt = np.interp(np.arange(len(CSplus)), np.flatnonzero(~np.isnan(CSplus)), np.array(CSplus)[~np.isnan(CSplus)])  
CSminusInt = np.interp(np.arange(len(CSminus)), np.flatnonzero(~np.isnan(CSminus)), np.array(CSminus)[~np.isnan(CSminus)])  
  
# plot expectany ratings  
fig, ax = plt.subplots(1, 2, figsize=(12, 6))  
  
ax[0].plot(np.arange(31), mExpMinus, linewidth=3)  
ax[0].plot(np.arange(31), mExpPlus, linewidth=3)  
ax[0].set_ylim([0, 100])  
ax[0].axvline(x=[9, 19, 25], linestyle='--', linewidth=2)  
ax[0].set_ylabel('Expectany ratings')  
ax[0].set_xlabel('Rating number')  
  
ax[1].plot(CSminusInt, linewidth=2)  
ax[1].plot(CSplusInt, linewidth=2)  
ax[1].plot(np.arange(94), CSminus, 'b*', markersize=10)  
ax[1].plot(np.arange(94), CSplus, 'r*', markersize=10)  
ax[1].axvline(x=[26, 56, 75], linestyle='--', linewidth=2)  
ax[1].set_ylabel('Reaction time')  
ax[1].set_xlabel('Trial number')  
  
plt.show()  
  
# plot affective ratings  
nRat = mPleasP.shape[1]  
  
fig, ax = plt.subplots()  
  
ax.plot(np.arange(nRat), mPleasM, linewidth=3)  
ax.plot(np.arange(nRat), mPleasP, linewidth=3)  
ax.set_ylim([1, 100])  
ax.set_ylabel('Unpleasant')  
ax.set_xlabel('Rating number')  
ax.axvline(x=[2, 5, 8], linestyle='--', linewidth=2)  
  
plt.show()  
