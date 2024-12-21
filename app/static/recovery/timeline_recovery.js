/*
EXPERIMENT TIMELINE
Spontaneous Recovery Phase + Relearning (Task 3)

Current Design: 
- 40 trials
- 16 trials (2 blocks of 8) of Spontaneous Recovery
  - 0% reinforcement schedule
- 24 trials (3 blocks of 8) of Relearning
  - approx. 50% reinforcement schedule 
- trial sequence hard-coded

NEW UPDATES:
* Filler page added after rating scales + attention checks
  to reorient the participant back to the spacebar. 

Files referenced:
- app/static/js/recovery/instructions_recovery.js
- app/static/js/fctask_shared/fctask_attention_check.js
- app/static/js/fctask_shared/fctask_data_functions.js
- app/static/js/fctask_shared/fctask_design.js
- app/static/js/fctask_shared/fctask_rating_scales.js
*/

/***************************************************
 
 DEBUG MODE TOGGLE
 
 ***************************************************/

// Debugging Mode
let recoveryDebugMode = false; // toggle before production!

if (recoveryDebugMode) {
  nTrialsBlock = 7
}

const full_screen = {
	type: jsPsychFullscreen,
  button_label:'המשך',
  message:'<p>כשתלחצו על המשך, הניסוי יעבור למצב תצוגה מלאה.</p>',
	fullscreen_mode: true
};

let timelineRec = [];

recoveryTaskInstructions.on_start = function() {
  msg = 'recoveryTaskInstructions'
  mode='a'
  pass_message(fout, mode, msg);
}


timelineRec.push(GETSUBJECTID);
timelineRec.push(full_screen);
timelineRec.push(recoveryTaskInstructions);

/*
SPONTANEOUS RECOVERY - TWO BLOCKS
- 3x affective ratings; once before block 1, and after each block
- 1x attention checks; before block 1
- expectancy ratings pseudo-randomised per 4 trials; once before block 1
*/

// affective rating #1 (pre block)
if (Math.random() > 0.5) {
  timelineRec.push(csMinusPlusOrder);
} else {
  timelineRec.push(csPlusMinusOrder);
}

// attention check
timelineRec.push(attentionCheckN);

// expectancy rating (once before block 1)
timelineRec.push(expectancyRating);
timelineRec.push(pressSpacebar);


// Recovery Block One
let recoveryBlockOne;
for (let i=0; i < 8; i++) {
recoveryBlockOne = {
    type: jsPsychFCtaskTrial,
    stimulus_image: recoveryOne[i],
  };
  recoveryBlockOne.on_start = function() {
    msg = 'recoveryBlockOne'
    mode='a'
    pass_message(fout, mode, msg);
  }
  
  timelineRec.push(recoveryBlockOne);
  // expectancy rating
  if (expectancyRec[i] == 1) {
    timelineRec.push(expectancyRating);
    timelineRec.push(pressSpacebar);
  }
}

// affective rating
if (Math.random() > 0.5) {
  timelineRec.push(csMinusPlusOrder);
  timelineRec.push(pressSpacebar);
} else {
  timelineRec.push(csPlusMinusOrder);
  timelineRec.push(pressSpacebar);
}

// Recovery Block Two
let recoveryBlockTwo;
for (let i=0; i < 8; i++) {
  recoveryBlockTwo = {
    type: jsPsychFCtaskTrial,
    stimulus_image: recoveryTwo[i],
  };
  recoveryBlockTwo.on_start = function() {
    msg = 'recoveryBlockTwo'
    mode='a'
    pass_message(fout, mode, msg);
  }
  timelineRec.push(recoveryBlockTwo);
  // expectancy rating
  if (expectancyRec[i] == 1) {
    timelineRec.push(expectancyRating);
    timelineRec.push(pressSpacebar);
  }
}
// affective rating
if (Math.random() > 0.5) {
  timelineRec.push(csMinusPlusOrder);
} else {
  timelineRec.push(csPlusMinusOrder);
}

/*
RELEARNING - TWO BLOCKS
- 3x affective ratings; 1 before, once after each block
- 2x attention checks; before block 1, after block 2
- expectancy ratings pseudo-randomised per two trials; once before block 1
*/

// attention check #2
timelineRec.push(attentionCheckG);

// expectancy rating #1 (once before block 1)
timelineRec.push(expectancyRating);
timelineRec.push(pressSpacebar);

// Relearning Block One
let relearnBlockOne;
for (let i=0; i < 8; i++) {
  relearnBlockOne = {
    type: jsPsychFCtaskTrial,
    stimulus_audio: relearnOneAudio[i],
    stimulus_image: relearnOne[i],
  };
  relearnBlockOne.on_start = function() {
    msg = 'relearnBlockOne'
    mode='a'
    pass_message(fout, mode, msg);
  }
  timelineRec.push(relearnBlockOne);
  // expectancy rating
  if (expectancyRelA[i] == 1) {
    timelineRec.push(expectancyRating);
    timelineRec.push(pressSpacebar);
  }
}
// affective rating
if (Math.random() > 0.5) {
  timelineRec.push(csMinusPlusOrder);
  timelineRec.push(pressSpacebar);
} else {
  timelineRec.push(csPlusMinusOrder);
  // timelineRec.push(pressSpacebarSaveHalfTime);
}

// Relearning Block Two
let relearnBlockTwo;
for (let i=0; i < 8; i++) {
  relearnBlockTwo = {
    type: jsPsychFCtaskTrial,
    stimulus_audio: relearnTwoAudio[i],
    stimulus_image: relearnTwo[i],
  };
  relearnBlockTwo.on_start = function() {
    msg = 'relearnBlockTwo'
    mode='a'
    pass_message(fout, mode, msg);
  }
  timelineRec.push(relearnBlockTwo);
  // expectancy rating
  if (expectancyRelB[i] == 1) {
    timelineRec.push(expectancyRating);
    timelineRec.push(pressSpacebar);
  }
}
// affective rating
if (Math.random() > 0.5) {
  timelineRec.push(csMinusPlusOrder);
} else {
  timelineRec.push(csPlusMinusOrder);
}

// attention check final
timelineRec.push(attentionCheckL);

// response style questions
// expectancy rating plugin modified for response style (conditional image display, additional text above prompt)
const responseStyle1 = {
  type: jsPsychExpectancyRatingResponsestyle,
  imageCSminus: csMinus, // candle
  context: `אמה ראתה על המסך עיגול ירוק 10 פעמים. בכל פעם שהיא ראתה את העיגול הירוק היא שמעה צעקה לאחר מכן. אמה צריכה להגיד "מה לדעתה הסיכוי שתשמע צעקה לאחר העיגול הירוק?" 
  עליה לדרג בסולם שנע בין 0% (אין סיכוי) ל50% (בחצי מהפעמים) ל100% (תמיד).`,
  prompt: "אנא בחרו מה אתם חושבים שאמה צריכה לענות."
};

const responseStyle2 = {
  type: jsPsychExpectancyRatingResponsestyle,
  imageCSminus: csMinus, // candle
  context: `ליאם ראה על המסך עיגול כתום 10 פעמים. לעולם לא נשמעה צעקה לאחר העיגול הכתום. 
  ליאם צריך להגיד "מה לדעתו הסיכוי שתשמע צעקה לאחר העיגול הירוק?"<b>
  </b> עליו לדרג בסולם שנע בין 0% (אין סיכוי) ל50% (בחצי מהפעמים) ל100% (תמיד).
  .`,
  prompt: "אנא בחרו מה אתם חושבים שליאם צריך לענות."
};

const responseStyle3 = {
  type: jsPsychExpectancyRatingResponsestyle,
  imageCSminus: csMinus, // candle
  context: `נועם ראה על המסך עיגול אדום 10 פעמים. ב-5 מהפעמים בהם הופיע העיגול האדום נשמעה צעקה לאחר מכן, ב-5 הפעמים האחרות לא נשמעה צעקה לאחר הופעת העיגול האדום.
  </b> נועם צריך להגיד "מה לדעתו הסיכוי שתשמע צעקה לאחר העיגול הירוק?"<b> 
  עליו לדרג בסולם שנע בין 0% (אין סיכוי) ל50% (בחצי מהפעמים) ל100% (תמיד).
  `,
  prompt: "אנא בחרו מה אתם חושבים שנועם צריך לענות."
};

const responseStyle4 = {
  type: jsPsychExpectancyRatingResponsestyle,
  imageCSminus: csMinus, // candle
  context: `שני ראתה על המסך עיגול צהוב 10 פעמים. ב- הפעמים הראשונות בהן הופיע העיגול הצהוב נשמעה צעקה, ב-7 הפעמים האחרות בהן הופיע העיגול הצהוב לא נשמעה צעקה. 
  שני צריכה להגיד "מה לדעתה הסיכוי שתשמע צעקה לאחר העיגול הירוק?" <b>
  עליה לדרג בסולם שנע בין 0% (אין סיכוי) ל50% (בחצי מהפעמים) ל100% (תמיד).`,
  prompt: "אנא בחרו מה אתם חושבים ששני צריכה לענות."
};


responseStyleInstructions.on_start = function() {
  msg = 'responseStyleInstructions'
  mode='a'
  pass_message(fout, mode, msg);
}



timelineRec.push(responseStyleInstructions);
timelineRec.push(responseStyle1);
timelineRec.push(responseStyle2);
timelineRec.push(responseStyle3);
timelineRec.push(responseStyle4);






// debrief with questions
// timelineRec.push(recoverySurveyDebrief);

// debrief with content
// timelineRec.push(mhalert);
timelineRec.push(contentDebrief);
