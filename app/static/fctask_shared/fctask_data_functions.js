/*
DATA-SAVING FUNCTIONS
Fear Conditioning Task, Acquisition+Extinction and Recovery Phase
*/

// saves entire task setup, saved at end of Task 3
var fcTaskSaveSetup = function(timeline_acqext, timeline_recovery){
  var fcTaskSetup ={
    timeline_acqext: JSON.stringify(timeline_acqext),
    timeline_recovery: JSON.stringify(timeline_recovery),
    stimulus_display_order : [
      acqOneImage,
      acqTwoImage,
      extinctionOne,
      extinctionTwo,
      extinctionThree,
      recoveryOne,
      recoveryTwo,
      relearnOne,
      relearnTwo,
    ],
    acq_conditioning_order: [
      acqOneAudio,
      acqTwoAudio,
    ],
    relearn_conditioning_order: [
      relearnOneAudio,
      relearnTwoAudio,
    ],
    cs_plus_stimulus: csPlus,
    cs_minus_stimulus: csMinus,
    cs_practice_stimulus: stim,
    aversive_audio: [
      aversive1,
      aversive2,
      aversive3
    ],
    practice_audio: ambient,
    
    // comprehension check data
    test_type: jsPsych.data.get().select('test_type').values,
    comp_check_response: jsPsych.data.get().select('comp_check_response').values,
    question_order: jsPsych.data.get().select('question_order').values,
    // data from debrief survey
    debrief_responses: jsPsych.data.get().select('debriefing').values,
  };
  jsPsych.data.get().addToLast(fcTaskSetup);
};


/*
Function is called twice (i.e. after the end of each task; once after Acquition + Extinction Phase,and again after Recovery Phase.)
*/

var fcTaskSaveData = function () {
  const fcTaskData = {
    // block + phase name
    fc_phase: jsPsych.data.get().select('fc_phase').values,

    // rt for fc trials
    fc_rt: jsPsych.data.get().select('fc_rt').values, // not differentiated between stimulus
    stimulus_image: jsPsych.data.get().select('stimulus_image').values,
    stimulus_audio: jsPsych.data.get().select('stimulus_audio').values,

    // attention check data
    attention_check_response: jsPsych.data.get().select('attention_check_response').values, // null if wrong

    // expectancy rating data
    expectancy_cs_plus: jsPsych.data.get().select('csPlusRating').values,
    expectancy_cs_minus: jsPsych.data.get().select('csMinusRating').values,

    // affective rating data
    rated_stimulus: jsPsych.data.get().select('ratedStimulus').values,
    unpleasant_rating: jsPsych.data.get().select('unpleasantRating').values,
    anxious_rating: jsPsych.data.get().select('anxiousRating').values,
    fearful_rating: jsPsych.data.get().select('fearfulRating').values,

    // Data from plugins 
    trial_type: jsPsych.data.get().select('trial_type').values,
    trial_index: jsPsych.data.get().select('trial_index').values,
  }
  // appends to end of dataset
  jsPsych.data.get().addToLast(fcTaskData);
};

var saveInteractionData = function() {
  const interactionData = jsPsych.data.getInteractionData().json();
  jsPsych.data.get().addToLast(interactionData);
}

var saveSymptomSurveyData = function(){
  var surveyData = {
    gad7: jsPsych.data.get().filter({survey: 'gad7'}).values(),
    phq9: jsPsych.data.get().filter({survey: 'phq9'}).values(),
  }
  jsPsych.data.get().addToLast(surveyData);
}

var saveResponseStyleData = function(){
    var responseStyleData = {
      responsestyle_cs: jsPsych.data.get().select('responseStyleCsRating').values,
    }
    jsPsych.data.get().addToLast(responseStyleData);
}

var saveDatafcTaskOne = function (workerId, assignmentId, hitId) {
  saveInteractionData();
  fcTaskSaveData();
  saveSymptomSurveyData();
  on_success('acqext');
}
	
var saveDatafcTaskRecovery = function (workerId, assignmentId, hitId) {
  fcTaskSaveSetup();
  saveInteractionData();
  fcTaskSaveData();
  saveResponseStyleData();
  on_success('recovery');
}

