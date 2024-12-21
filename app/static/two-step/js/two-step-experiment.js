

//---------------------------------------//
// Define experiment timeline.
//---------------------------------------//

// Preallocate space.
var TWO_STEP_TASK = [];

// Iteratively generate trials.
for (let i=0; i < outcomes.length; i++){

  // Define trial.
  const TRIAL = {
    type: jsPsychTwoStepTrial,
    transition: transitions[i],
    outcomes:  outcomes[i],
    rocket_colors: task_info.rocket_colors,
    planet_colors: task_info.planet_colors,
    aliens: task_info.aliens,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    randomize_s1: randomize_s1,
    randomize_s2: randomize_s2,
    valid_responses_s1:trial_keys,
    valid_responses_s2:trial_keys,
    data: {
      trial: i+1,
      drifts: drifts[i],
      drift_ix: drift_ix
    },
    on_finish: function(data) {
      var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
      jsPsych.setProgressBar(curr_progress_bar_value + 1/(outcomes.length/2));


      // Store number of browser interactions
      data.browser_interactions = jsPsych.data.getInteractionData().filter({trial: data.trial_index}).count();

      // Evaluate missing data
      if ( data.state_1_choice == null || data.state_2_choice == null ) {

        // Set missing data to true.
        data.missing = true;

        // Increment counter. Check if experiment should end.
        missed_responses++;
        if (missed_responses >= missed_threshold) {
          low_quality = true;
          jsPsych.endExperiment();
        }

      } else {

        // Set missing data to false.
        data.missing = false;

      }

    }
  }

  // Define looping node.
  const TRIAL_NODE = {
    timeline: [TRIAL],
    loop_function: function(data) {
      return data.values()[0].missing;
    }
  }

  // Append trial.
  TWO_STEP_TASK.push(TRIAL_NODE)

}

//---------------------------------------//
// Define transition screens.
//---------------------------------------//

// Define ready screen.
var READY_1 = {
  type: jsPsychTwoStepInstructions,
  pages: [

    {
      prompt:instructions_09,
      // audio:'../static/mrst/audio/coutndown1.mp3',
      // view_duration: 1000,
    },

  ],
  rocket_colors: practice_info.rocket_colors,
  planet_colors:practice_info.planet_colors,
  aliens: practice_info.aliens,

  button_labels: [previous_label,next_label],
  key_forward:next_key,
  key_backward:previous_key,
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}


var PRE_READY_2 ={
  type: jsPsychTwoStepInstructions,
  pages: [
    {
      prompt:pre_ready_02,
      // audio:'../static/mrst/audio/coutndown1.mp3',
      // view_duration: 1000,
    },
      ],

    rocket_colors: practice_info.rocket_colors,
    planet_colors:practice_info.planet_colors,
    aliens: practice_info.aliens,

    button_labels: [previous_label,next_label],
    key_forward:next_key,
    key_backward:previous_key,
    left_to_right:reading_dir_left_to_right,
    on_start: function(){
      jsPsych.setProgressBar(0); 
    }
}

var READY_2 = {
  type: jsPsychTwoStepInstructions,
  pages: [
    // {
    //   prompt:block_end,
    //   // audio:'../static/mrst/audio/coutndown1.mp3',
    //   // view_duration: 1000,
    // },
    {
      prompt:instructions_10,
      // audio:'../static/mrst/audio/coutndown1.mp3',
      // view_duration: 1000,
    },

      ],

    rocket_colors: practice_info.rocket_colors,
    planet_colors:practice_info.planet_colors,
    aliens: practice_info.aliens,

    button_labels: [previous_label,next_label],
    key_forward:next_key,
    key_backward:previous_key,
    left_to_right:reading_dir_left_to_right,
    on_start: function(){
      jsPsych.setProgressBar(0); 
    }
}

//---------------------------------------//
// Define end of experiment screens.
//---------------------------------------//

// Define finish screen.
const INSTRUCTIONS_4 = {
  type: jsPsychTwoStepInstructions,
  pages: [
    {
      prompt:game_end,
      // audio:'../static/mrst/audio/coutndown1.mp3',
      // view_duration: 1000,
    },

      ],

    rocket_colors: practice_info.rocket_colors,
    planet_colors:practice_info.planet_colors,
    aliens: practice_info.aliens,

    button_labels: [previous_label,next_label],
    key_forward:next_key,
    key_backward:previous_key,
    left_to_right:reading_dir_left_to_right,
    on_start: function(){
      jsPsych.setProgressBar(0); 
    }
}

// // Define comprehension check.
// const QUIZ_4 = {
//   type: jsPsychTwoStepComprehension,
//   prompts: [
//     quiz4_prompt_part_a + ` <b><font color='${task_info.font_colors[0]}'>${task_info.planet_names_text[0]}</font></b> ` +quiz4_prompt_part_b,
//     quiz4_prompt_part_a + ` <b><font color='${task_info.font_colors[1]}'>${task_info.planet_names_text[1]}</font></b> ` +quiz4_prompt_part_b,
//   ],
//   options: [
//     task_info.rocket_names_text,
//     task_info.rocket_names_text,
//   ],
//   correct: [
//     task_info.rocket_names_text[0],
//     task_info.rocket_names_text[1],
//   ]
// }

var FINISHED = [
  INSTRUCTIONS_4,
  // QUIZ_4
];
