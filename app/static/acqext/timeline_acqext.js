/*
EXPERIMENT TIMELINE: Acquisition + Extinction

Current Design:
- 6 practice trials (50% reinforced with neutral sound)
- 26 trials in acquisition, 30 trials in extinction
- 2 blocks with 13 trials each
- each block has 5CS- and 8CS+
- reinforcement schedule during acquisition is 50%
- trial sequence hard-coded

NEW UPDATES:
* Filler page added after rating scales + attention checks
  to reorient the participant back to the spacebar. 

Files referenced:
- app/static/js/recovery/instructions_acqext.js
- app/static/js/fctask_shared/fctask_attention_check.js
- app/static/js/fctask_shared/fctask_data_functions.js
- app/static/js/fctask_shared/fctask_design.js
- app/static/js/fctask_shared/fctask_rating_scales.js
- app/static/js/symptom_surveys.js
*/


/***************************************************
 
 DEBUG MODE TOGGLE
 
 ***************************************************/

// Debugging Mode
let debugMode = false; // TOGGLE TO FALSE BEFORE PRODUCTION!!!
if (debugMode) {
  nTrialsBlock = 7
}


// go into full screen
const full_screen = {
	type: jsPsychFullscreen,
  message:'<p>כשתלחצו על ׳המשך׳, הניסוי יעבור למצב תצוגה מלאה.<\p>',
  button_label:'המשך',
	fullscreen_mode: true
};

let timelineAcqExt = [];

if (debugMode) {
  // debug mode
  timelineAcqExt.push(beginTask);
  timelineAcqExt.push(pressSpacebar);
  timelineAcqExt.push(csMinusPlusOrder);

} else {
  // full task
  taskInstructions.on_start = function() {
    msg = 'taskInstructions'
    mode='a'
    pass_message(fout, mode, msg);
  }

  timelineAcqExt.push(GETSUBJECTID);
  timelineAcqExt.push(full_screen);
  timelineAcqExt.push(taskInstructions);

  // Practice Block
  timelineAcqExt.push(practiceInstructions);

  let practiceTrials; // 6 trials
  for (let i=0; i < 6; i++) {
    const practiceTrials = {
      type: jsPsychFCtaskTrial,
      stimulus_audio: practiceAudio[i],
      stimulus_image: stim,
      card_prompt: `(לחצו על מקש הרווח כדי להמשיך)`,
      background_colour: "White",
      font_colour: "Black",
      data: {
        fc_phase: 'practice',
        fc_trial: i,
      },
    };
    timelineAcqExt.push(practiceTrials);
    // expectancy rating after each practice trial
    timelineAcqExt.push(practiceExpectancy);
  }
  // one affective rating after practice block
  timelineAcqExt.push(practiceAffectiveRating);
  timelineAcqExt.push(endPractice);

  timelineAcqExt.push(triggerWarnings);
}



/*
ACQUISITION PHASE - TWO BLOCKS
- 3x affective ratings; once before block 1, and after each block
- 2x attention checks; after block 1 and block 2
- expectancy ratings pseudo-randomised to have 10 total
*/

// affective rating #1 (pre block)
if (Math.random() > 0.5) {
  timelineAcqExt.push(csMinusPlusOrder);
} else {
  timelineAcqExt.push(csPlusMinusOrder);
}
// expectancy rating #1 (once before block 1)
timelineAcqExt.push(expectancyRating);
timelineAcqExt.push(pressSpacebar);

// Acquisition Block One
let acqBlockOne;
for (let i=0; i < nTrialsBlock; i++) {
  acqBlockOne = {
    type: jsPsychFCtaskTrial,
    stimulus_audio: acqOneAudio[i],
    stimulus_image: acqOneImage[i],
    data: {
      fc_phase: 'acquisitionBlockOne',
      fc_trial: i,
    },
  };
  acqBlockOne.on_start = function() {
    msg = 'acqBlockOne'
    mode='a'
    pass_message(fout, mode, msg);
  }
  timelineAcqExt.push(acqBlockOne);
  // expectancy rating 
  if (expectancyAcqA[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}

// affective rating #2 (post block)
if (Math.random() > 0.5) {
  timelineAcqExt.push(csMinusPlusOrder);
} else {
  timelineAcqExt.push(csPlusMinusOrder);
}
// attention check #1 (post block)
timelineAcqExt.push(attentionCheckG);
// timelineAcqExt.push(pressSpacebarSaveHalfTime);

// Acquisition Block Two
let acqBlockTwo;
for (let i=0; i < nTrialsBlock; i++) {
  acqBlockTwo = {
    type: jsPsychFCtaskTrial,
    stimulus_audio: acqTwoAudio[i],
    stimulus_image: acqTwoImage[i],
    data: {
      fc_phase: 'acquisitionBlockTwo',
      fc_trial: i,
    },
  };
  acqBlockTwo.on_start = function() {
    msg = 'acqBlockTwo'
    mode='a'
    pass_message(fout, mode, msg);
  }
  timelineAcqExt.push(acqBlockTwo);
  // expectancy rating
  if (expectancyAcqB[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}

// affective rating #3 (post block)
if (Math.random() > 0.5) {
  timelineAcqExt.push(csMinusPlusOrder);
} else {
  timelineAcqExt.push(csPlusMinusOrder);
}
// attention check #2 (post block)
timelineAcqExt.push(attentionCheckL);


timelineAcqExt = timelineAcqExt.concat(attachment_q);


/*
EXTINCTION PHASE - THREE BLOCKS
- 3x affective ratings; post blocks
- 1x attention check; after block 2
- expectancy ratings pseudo-randomised to 12 total
*/

// expectancy rating #1 (once before block 1)
timelineAcqExt.push(expectancyRating);
timelineAcqExt.push(pressSpacebar);

// Extinction Block One
let extinctionBlockOne;
for (let i=0; i < 10; i++) {
  extinctionBlockOne = {
    type: jsPsychFCtaskTrial,
    stimulus_image: extinctionOne[i],
    data: {
      fc_phase: 'extinctionBlockOne',
      fc_trial: i,
    },
  };
  extinctionBlockOne.on_start = function() {
    msg = 'extinctionBlockOne'
    mode='a'
    pass_message(fout, mode, msg);
  }
  timelineAcqExt.push(extinctionBlockOne);
  // expectancy rating
  if (expectancyExtA[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}

// affective rating #1 (post block)
if (Math.random() > 0.5) {
  timelineAcqExt.push(csMinusPlusOrder);
  timelineAcqExt.push(pressSpacebar);
} else {
  timelineAcqExt.push(csPlusMinusOrder);
  timelineAcqExt.push(pressSpacebar);
}

// Extinction Block Two
let extinctionBlockTwo;
for (let i=0; i < 10; i++) {
  extinctionBlockTwo = {
    type: jsPsychFCtaskTrial,
    stimulus_image: extinctionTwo[i],
    data: {
      fc_phase: 'extinctionBlockTwo',
      fc_trial: i,
    },
  };
  extinctionBlockTwo.on_start = function() {
    msg = 'extinctionBlockTwo'
    mode='a'
    pass_message(fout, mode, msg);
  }
  timelineAcqExt.push(extinctionBlockTwo);
  // expectancy rating
  if (expectancyExtB[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}

// affective rating #2 (post block)
if (Math.random() > 0.5) {
  timelineAcqExt.push(csMinusPlusOrder);
} else {
  timelineAcqExt.push(csPlusMinusOrder);
}
// attention check #1 (post block)
timelineAcqExt.push(attentionCheckB);
timelineAcqExt.push(pressSpacebar);

// Extinction Block Three
let extinctionBlockThree;
for (let i=0; i < 10; i++) {
  extinctionBlockThree = {
    type: jsPsychFCtaskTrial,
    stimulus_image: extinctionThree[i],
    data: {
      fc_phase: 'extinctionBlockThree',
      fc_trial: i,
    },
  };
  extinctionBlockThree.on_start = function() {
    msg = 'extinctionBlockThree'
    mode='a'
    pass_message(fout, mode, msg);
  }
  timelineAcqExt.push(extinctionBlockThree);
  // expectancy rating
  if (expectancyExtB[i] == 1) {
    timelineAcqExt.push(expectancyRating);
    timelineAcqExt.push(pressSpacebar);
  }
}
// affective rating #3 (post block)
if (Math.random() > 0.5) {
  timelineAcqExt.push(csMinusPlusOrder);
} else {
  timelineAcqExt.push(csPlusMinusOrder);
}

// task end
timelineAcqExt.push(breakReminder);

/*
Acquisition+Extinction is Task #1 in the Fear Conditioning task,
so there is no debrief-questions or debrief-information.
*/
 
