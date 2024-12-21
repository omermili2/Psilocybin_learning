%% upload data

clear all; 

% adjust path to where the data is
files = dir(['/Users/isabelpriv/Documents/Princeton/toDelete/normingStudy/norming_session_three/*/*acqext.json']);


%% organize data for each subjects and compute bonus scores
Nsj = length(files); 

allData = {};
for sj=1:Nsj

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
    
    filename = files(sj).name;
    
    % take data saved at end of json file 
    e = jsondecode(fileread([files(sj).folder filesep files(sj).name]));
    d = e{end}; 
   
   %d.debrief_responses
   
   % add expectancy ratings of CS-
   for i = 1:length(d.expectancy_cs_minus)
       if isempty(d.expectancy_cs_minus{i})
           addnum = NaN;
       else
           addnum = str2num(d.expectancy_cs_minus{i});
       end
       exp_minus = [exp_minus addnum];
   end

   % add expectancy ratings of CS+
   for i = 1:length(d.expectancy_cs_plus)
       if isempty(d.expectancy_cs_plus{i})
           addnum = NaN;
       else
           addnum = str2num(d.expectancy_cs_plus{i});
       end
       exp_plus = [exp_plus addnum];
   end
   
   allData(sj).exp_plus = exp_plus'; 
   allData(sj).exp_minus = exp_minus'; 

   % save information on experiment design
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
       if length(a)>4 && strcmp(a(34), 's')
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
    
   % save practice ratings
   practRatings = [];
    for i = 1:length(d.trial_type)
       a = d.trial_type{i};
       
       if strcmp(a, 'expectancy-rating')
           newS = e{i};
           if isfield(newS, 'csRating')
               try
               practRatings = [practRatings, str2num(e{i}.csRating)];
               catch
                   practRatings = [practRatings, NaN];
               end
                   
           end
           
       end
    end
    
           

   try
   j=1;
   exp_order_reorg = exp_order;
   for k = 1:length(exp_order)
       if exp_order(k) == 3
           exp_order_reorg(k) = StimSeq(j);
           j = j+1;
       end
   end
   
   b = find(exp_order == 3);
   catch
      
      fprintf('StimSeq not correct for subject %i',sj)
   end
   
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
   
   % save information for each subject in struct
   allData(sj).pleasM = pleasM;
   allData(sj).pleasP = pleasP;


   allData(sj).RTM = abs(d.fc_rt(StimSeq==1));
   allData(sj).RTP = abs(d.fc_rt(StimSeq==2));
   allData(sj).RT = abs(d.fc_rt);
   
   allData(sj).StimSeq = StimSeq;
   allData(sj).cs = StimSeq;
   allData(sj).us = us;
   try
   allData(sj).exp_order = exp_order;
   catch 
   end
   
   allData(sj).exp_order_reorg = exp_order_reorg;
   allData(sj).ID = filename(1:24);
   allData(sj).d = d;
   allData(sj).trial_type = d.trial_type;
   allData(sj).practRatings = practRatings;
   
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
    if length(allData(sj).exp_minus) == 20
        exp_minus_mat = [exp_minus_mat, allData(sj).exp_minus];
        exp_plus_mat = [exp_plus_mat, allData(sj).exp_plus];
    else
         fprintf('sj %i not added\n', sj)    
    end  
    
end

for sj=1:Nsj
    
    try
        if length(allData(sj).pleasM) == 6
            
            pleasM_mat = [pleasM_mat; allData(sj).pleasM];
            pleasP_mat = [pleasP_mat; allData(sj).pleasP]; 
            
        end
        
        RTP_mat = [RTP_mat, allData(sj).RTP];
        RTM_mat = [RTM_mat, allData(sj).RTM];
        RT_mat = [RT_mat, allData(sj).RT];

    catch
    fprintf('sj %i not added\n', sj)    
    end
    
 
end

mExpMinus = mean(exp_minus_mat,2);
mExpPlus = mean(exp_plus_mat,2);

mPleasM = mean(pleasM_mat);

mPleasP = mean(pleasP_mat);



mRTP = mean(RTP_mat,2);
mRTM = mean(RTM_mat,2);
mRT = mean(RT_mat,2);



% prep data for plotting
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
    


% plot average expectancy ratings and reaction times
figure;

subplot(1,2,1)
 
plot(1:20, mExpMinus, 'linewidth', 3)
hold on
plot(1:20, mExpPlus,  'linewidth', 3)


subplot(1,2,2)

plot(1:28, mRTM)
hold on 
plot(1:34, mRTP)


% uncomment below if we wanto to plot each individual
% for i = 1:size(exp_minus_mat,2)
% figure
%     plot(1:20, exp_minus_mat(:,i), 'linewidth', 3)
%     hold on
%     plot(1:20, exp_plus_mat(:,i), 'linewidth', 3)
% end


% plot affective ratings
figure

set(gca,'FontSize',22)


plot(1:6, mPleasM, 'linewidth', 3)
hold on
plot(1:6, mPleasP, 'linewidth', 3)
ylim([1 100])
ylabel('Pleasant')

set(findall(gcf,'type','text'),'FontSize',22)



