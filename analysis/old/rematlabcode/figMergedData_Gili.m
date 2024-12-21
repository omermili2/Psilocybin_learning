%% making figures for merged data


exp_minus_mat = [];
exp_plus_mat = [];
pleasM_mat = [];
anxM_mat = [];
fearM_mat = [];
pleasP_mat = [];
anxP_mat = [];
fearP_mat = [];
RTM_mat = [];
RTP_mat = [];
RT_mat = [];
excl = [];

% merge data from acquisition and recovery 
for sj=1:size(allData,2)
    if length(allData(sj).exp_minus) == 20 && length(allData(sj).exp_minus_R) == 11
        dataToAdd = [allData(sj).exp_minus; allData(sj).exp_minus_R];
        exp_minus_mat = [exp_minus_mat, dataToAdd];
        dataToAdd = [allData(sj).exp_plus; allData(sj).exp_plus_R];
        exp_plus_mat = [exp_plus_mat, dataToAdd];
    else
         fprintf('sj %i not added\n', sj)    
         excl = [excl, sj];    
    end  
    
end


allData(excl) = [];

excl = [];
for sj=1:size(allData,2)
    
    try
    pleasM_mat = [pleasM_mat; allData(sj).pleasM allData(sj).pleasM_R];
    pleasP_mat = [pleasP_mat; allData(sj).pleasP allData(sj).pleasP_R];

    dataToAdd = [allData(sj).RTP; allData(sj).RTP_R];
    RTP_mat = [RTP_mat, dataToAdd];
    
    dataToAdd = [allData(sj).RTM; allData(sj).RTM_R];
    RTM_mat = [RTM_mat, dataToAdd];
    
    dataToAdd = [allData(sj).RT; allData(sj).RT_R];
    RT_mat = [RT_mat, dataToAdd];
    
    catch
    fprintf('sj %i not added\n', sj)   
    excl = [excl, sj];    

    end
   
end

% only continue with participants who have complete dataset
allData(excl) = [];


mExpMinus = nanmean(exp_minus_mat,2);
mExpPlus = nanmean(exp_plus_mat,2);

mPleasM = nanmean(pleasM_mat);
mPleasP = nanmean(pleasP_mat);

mRTP = nanmean(RTP_mat,2);
mRTM = nanmean(RTM_mat,2);
mRT = nanmean(RT_mat,2);

StimSeq_Merged = [allData(1).StimSeq, allData(1).StimSeq_R];

% prep plotting
nTrials = (length(mRTM)+length(mRTP));
   CSplus = [];
   CSminus = [];
   otherCS = [];
    for i=1:nTrials
        if StimSeq_Merged(i) == 2 % double-check if StimEst is the same for everybody. 
            CSplus = [CSplus, mRT(i)];
            CSminus = [CSminus, NaN];
        else  
            CSminus = [CSminus, mRT(i)];
            CSplus = [CSplus, NaN];
            
        end
    end
    CSplusInt = fillmissing(CSplus,'linear');
    hold on
    CSminusInt = fillmissing(CSminus,'linear');

    
% plot expectany ratings    
figure;

set(gca,'FontSize',22)

subplot(1,2,1)
 
plot(0:30, mExpMinus, 'linewidth', 3)
hold on
plot(0:30, mExpPlus,  'linewidth', 3)

ylim([0 100])
xline([9, 19, 25], '--', 'LineWidth',2) % need to check if these are the correct values
ylabel('Expectany ratings')
xlabel('Rating number')



set(findall(gcf,'type','text'),'FontSize',22)
set(gca,'FontSize',22)

subplot(1,2,2)

us_present = logical([allData(1).us, allData(1).us_R]);
trialList = 1:94;
us_trials = trialList(us_present);
us_trials_to_plot = ones(length(us_trials),1)*2000;

plot(CSminusInt,'LineWidth',2);
hold on
plot(CSplusInt,'LineWidth',2);
plot(1:94, CSminus, 'b*', 'MarkerSize', 10)
plot(1:94, CSplus, 'r*', 'MarkerSize', 10)

xline(us_trials, 'LineWidth',0.5) % need to check if these are the correct values

xline([26,56,75], '--', 'LineWidth',2) % need to check if these are the correct values
ylabel('Reaction time')
xlabel('Trial number')

set(findall(gcf,'type','text'),'FontSize',22)


% plot affective ratings
nRat = size(mPleasP,2);

figure

set(gca,'FontSize',22)

plot(0:nRat-1, mPleasM, 'linewidth', 3)
hold on
plot(0:nRat-1, mPleasP, 'linewidth', 3)
ylim([1 100])
ylabel('Unpleasant')
xlabel('Rating number')
xline([2,5,8], '--', 'LineWidth',2) % need to check if these are the correct values

set(findall(gcf,'type','text'),'FontSize',22)
set(gca,'FontSize',22)

set(findall(gcf,'type','text'),'FontSize',22)
set(gca,'FontSize',22)

