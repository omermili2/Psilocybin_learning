% Note: Run this file after you loaded already the acquisition and
% extinciton data. It will load each subject in the same allData struct and
% match the data. It works on the assumptions that each subject who as
% recovery data also has acquisition data.

%% upload data

% update directory 
files = dir(['/Users/isabelpriv/Documents/Princeton/toDelete/normingStudy/norming_session_three/*/*recovery.json']);


%% organize data for each subjects and compute bonus scores

filenameCount = 1;

for sj=1:Nsj

    
    filename = files(filenameCount).name;

    if strcmp(allData(sj).ID, filename(1:24))
    
    exp_minus = [];
    exp_plus = [];
    pleasM = [];
    anxM = [];
    fearM = [];
    
    pleasP = [];
    anxP = [];
    fearP = [];
    
    gad =[];
    phq = [];
  
    correctLetters = 0;
    
    % load json file data added at the end from all trials
    e = jsondecode(fileread([files(filenameCount).folder filesep filename]));
    d = e{end}; 

   % add expectancy ratings for CS minus
   for i = 1:length(d.expectancy_cs_minus)
       if isempty(d.expectancy_cs_minus{i})
           addnum = NaN;
       else
           addnum = str2num(d.expectancy_cs_minus{i});
       end
       exp_minus = [exp_minus addnum];
   
   end
    
   
   % add expectancy ratings for CS minus
   for i = 1:length(d.expectancy_cs_plus)
        if isempty(d.expectancy_cs_plus{i})
           addnum = NaN;
       else
           addnum = str2num(d.expectancy_cs_plus{i});
       end
       exp_plus = [exp_plus addnum];
   
   end
   
   allData(sj).exp_plus_R = exp_plus'; 
   allData(sj).exp_minus_R = exp_minus'; 

   
    % add study design information 
   StimSeq = [];
   for i = 1:length(d.stimulus_image)
       a = d.stimulus_image{i};
       if strcmp(a(32), 'c')
           StimSeq = [StimSeq, 1];
       else
           StimSeq = [StimSeq, 2];
       end
             
   end

   us = [];
   for i = 1:length(d.stimulus_audio)
       a = d.stimulus_audio{i};
       if length(a)> 4 && strcmp(a(34), 's')
           us = [us, 1];
       else
           us = [us, 0];
       end
             
   end
   
   exp_order = [];
   for i = 1:length(d.trial_type)
       a = d.trial_type{i};
       if strcmp(a, 'fctask-trial')
           exp_order = [exp_order, 3];
       elseif strcmp(a, 'expectancy-rating')
           exp_order = [exp_order, 4];
       end             
   end
   

   
   
   j=1;
   exp_order_reorg = exp_order;
   for k = 1:length(exp_order)
       if exp_order(k) == 3
           exp_order_reorg(k) = StimSeq(j);
           j = j+1;
       end
   end
   
   b = find(exp_order == 3);
   
% add affective ratings
    for i = 1:length(d.affective_cs_plus)
       
       if isempty(d.affective_cs_plus{i})
           addnum = NaN;
       else
           addnum = str2num(d.affective_cs_plus{i});
       end
       pleasP  = [pleasP addnum];
       
       
        if isempty(d.affective_cs_minus{i})
           addnum = NaN;
       else
           addnum = str2num(d.affective_cs_minus{i});
       end
       pleasM  = [pleasM addnum];
       
      
    end
   

   % add information to struct '_R' indicates taht this is the recovery
   % data
   allData(sj).pleasM_R = pleasM;

   allData(sj).pleasP_R = pleasP;

   allData(sj).RTM_R = abs(d.fc_rt(StimSeq==1));
   allData(sj).RTP_R = abs(d.fc_rt(StimSeq==2));
   allData(sj).RT_R = abs(d.fc_rt);
   
   allData(sj).StimSeq_R = StimSeq;
   allData(sj).cs_R = StimSeq;
   allData(sj).us_R = us;
   allData(sj).exp_order_R = exp_order;
   
   
   allData(sj).exp_order_reorg_R = exp_order_reorg;
   allData(sj).ID_R = filename(1:24);
   filenameCount = filenameCount+1;
   allData(sj).d_R = d;
   allData(sj).trial_type_R = d.trial_type;
   
    
    else
    
    fprintf('file not added %s at sj %i\n',  filename, sj)
    
    end
end

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

for sj=1:Nsj
    if length(allData(sj).exp_minus_R) == 11
        exp_minus_mat = [exp_minus_mat, allData(sj).exp_minus_R];
        exp_plus_mat = [exp_plus_mat, allData(sj).exp_plus_R];
    else
         fprintf('sj %i not added\n', sj)    
    end  
    
end

for sj=1:Nsj
    
    try
    pleasM_mat = [pleasM_mat; allData(sj).pleasM_R];
    pleasP_mat = [pleasP_mat; allData(sj).pleasP_R];
    RTP_mat = [RTP_mat, allData(sj).RTP_R];
    RTM_mat = [RTM_mat, allData(sj).RTM_R];
    RT_mat = [RT_mat, allData(sj).RT_R];
    
    catch
    fprintf('sj %i not added\n', sj)    
    end
    
 
end

mExpMinus = nanmean(exp_minus_mat,2);
mExpPlus = nanmean(exp_plus_mat,2);

mPleasM = nanmean(pleasM_mat);
mPleasP = nanmean(pleasP_mat);

mRTP = nanmean(RTP_mat,2);
mRTM = nanmean(RTM_mat,2);
mRT = nanmean(RT_mat,2);


% prep information for plotting
   nTrials = (length(mRTM)+length(mRTP));
   CSplus = [];
   CSminus = [];
   otherCS = [];
    for i=1:nTrials
        if StimSeq(i) == 2 % double-check if StimEst is the same for everybody. 
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
    
    plot(CSminusInt(5:end),'LineWidth',2);
    hold on
    plot(CSplusInt(5:end),'LineWidth',2);
    

% plot average expectancy and RT data
figure;

subplot(1,2,1)
 
plot(1:11, mExpMinus, 'linewidth', 3)
hold on
plot(1:11, mExpPlus,  'linewidth', 3)


subplot(1,2,2)

plot(1:12, mRTM)
hold on 
plot(1:20, mRTP)


% plot affective ratings 
nRat = size(mPleasM,2);
figure

set(gca,'FontSize',22)

plot(1:nRat, mPleasM, 'linewidth', 3)
hold on
plot(1:nRat, mPleasP, 'linewidth', 3)
ylim([1 100])
ylabel('Pleasant')

set(findall(gcf,'type','text'),'FontSize',22)

