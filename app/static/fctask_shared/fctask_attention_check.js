/*
* Attention Checks
*/

const attentionCheckIcon = "../static/fctask_shared/images/fctask-shared/attention-check.png";
const letterB = "../static/fctask_shared/audio/fctask-shared/letterB.mp3";
const letterG = "../static/fctask_shared/audio/fctask-shared/letterG.mp3";
const letterL = "../static/fctask_shared/audio/fctask-shared/letterL.mp3";
const letterN = "../static/fctask_shared/audio/fctask-shared/letterN.mp3";
const letterR = "../static/fctask_shared/audio/fctask-shared/letterR.mp3";


// Fixation crosses with an audio test interlaced
const attentionCheckG = {
  type: jsPsychImageKeyboardResponse,
  stimulus: attentionCheckIcon,
  choices: ['ג'],
  stimulus_width: 500,
  prompt: `<br><audio autoplay><source src = ${letterG} type="audio/mpeg"></audio>`,
  data: {
    correct_key: "ג"
  },
  trial_duration: 10000,
  on_finish(trial_data){
    trial_data.attention_check_response = trial_data.response
  }
}

// Fixation crosses with an audio test interlaced
const attentionCheckR = {
  type: jsPsychImageKeyboardResponse,
  stimulus: attentionCheckIcon,
  choices: ['ר'],
  stimulus_width: 500,
  prompt: `<br><audio autoplay><source src = ${letterR} type="audio/mpeg"></audio>`,
  data: {
    correct_key: "ר"
  },
  trial_duration: 10000,
  post_trial_gap: 300,
  on_finish(trial_data){
    trial_data.attention_check_response = trial_data.response
  }
}

// Fixation crosses with an audio test interlaced
const attentionCheckL = {
  type: jsPsychImageKeyboardResponse,
  stimulus: attentionCheckIcon,
  choices: ['ל'],
  stimulus_width: 500,
  prompt: `<br><audio autoplay><source src = ${letterL} type="audio/mpeg"></audio>`,
  data: {
    correct_key: "ל"
  },
  trial_duration: 10000,
  on_finish(trial_data){
    trial_data.attention_check_response = trial_data.response
  }
}

// Fixation crosses with an audio test interlaced
const attentionCheckB = {
  type: jsPsychImageKeyboardResponse,
  stimulus: attentionCheckIcon,
  choices: ['ב'],
  stimulus_width: 500,
  prompt: `<br><audio autoplay><source src = ${letterB} type="audio/mpeg"></audio>`,
  data: {
    correct_key: "ב"
  },
  trial_duration: 10000,
  on_finish(trial_data){
    trial_data.attention_check_response = trial_data.response
  }
}

// Fixation crosses with an audio test interlaced
const attentionCheckN = {
  type: jsPsychImageKeyboardResponse,
  stimulus: attentionCheckIcon,
  choices: ['נ'],
  stimulus_width: 500,
  prompt: `<br><audio autoplay><source src = ${letterN} type="audio/mpeg"></audio>`,
  data: {
    correct_key: "נ"
  },
  trial_duration: 10000,
  on_finish(trial_data){
    trial_data.attention_check_response = trial_data.response
  }
}

// Filler page after attention check to reorient to spacebar
const pressSpacebar = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'לחצו על מקש הרווח כדי להמשיך',
  trial_duration: 10000,
  on_finish(trial_data){
    trial_data.press_spacebar = trial_data.response
  }
}


// Filler page after attention check to reorient to spacebar
const pressSpacebarSaveHalfTime = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'לחצו על מקש הרווח כדי להמשיך. שימו לב, כשתלחצו ״המשך״ הנתונים ישמרו במחשב.',
  trial_duration: 10000,
  on_finish(trial_data){
    trial_data.press_spacebar = trial_data.response
  }
}
