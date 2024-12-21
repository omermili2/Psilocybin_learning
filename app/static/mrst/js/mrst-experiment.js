

// Generate trials by looping over blocks.
var trial_no = 0;
var exposure = Array(N_block_sequences).fill(0);

// Preallocate space.
MRST = [];


// part 1
for (let i = 0; i < 3; i++) {

  // Initialize block container.
  var bandits = [...Array(N_bandits).keys()].map(j => i * N_bandits + j);

  //------------------------------------//
  // Generate trial sequence.
  //------------------------------------//

  // Generate experimental trial sequence.
  for (let j = 0; j < N_block_sequences; j++) {

    // Randomize bandit orders.
    bandits = jsPsych.randomization.shuffle(bandits);

    //------------------------------------//
    // Generate trials.
    //------------------------------------//


  // Iterate over trials.
    bandits.forEach((b) => {
      const card_points = Math.random() < probs[b % 3] ? high_card_points : low_card_points; // NB: changed this to reflect 3 probs

   
      // console.log (trial_no, i, b, b- 3*i);

    // Define trial.
      var trial = {
        type: jsPsychMRSTTrial,
        stimulus: stimuli[i][b- 3*i], 
        card_color: colors[i][b- 3*i],
        card_points: card_points,
        certain_points: face_up_points,
        choice_duration: choice_duration,
        randomize: true,
        confirmation_duration: confirmation_duration,
        feedback_duration: feedback_duration,
        valid_responses: trial_keys,
        data: {
          bandit: b+1 ,
          probability: probs[b % 3],
          block: i+1,
          trial: trial_no+1,
          exposure:  exposure[b]+1,
          phase: 'experiment'
        },
        on_finish: function(data) {

          var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
          jsPsych.setProgressBar(curr_progress_bar_value + (1/N_trials_first_part));


          // Store number of browser interactions
          data.browser_interactions = jsPsych.data.getInteractionData().filter({trial: data.trial_index}).count();

          // Evaluate missing data
          if ( data.choice == null ) {

            // Set missing data to true.
            data.missing = true;

          } else {

            // Set missing data to false.
            data.missing = false;

          }

        }

      }

    // Define looping node.
    const trial_node = {
      timeline: [trial],
      loop_function: function(data) {
        return data.values()[0].missing;
      }
    }

    // Append trial.
    MRST.push(trial_node);

    // Increment counters
    trial_no++;
    exposure[b]++;

  });

  }
}

// part 2 
for (let i = 2; i < N_pseudo_blocks; i++) {

  // Initialize block container.
  var bandits = [...Array(N_bandits).keys()].map(j => i * N_bandits + j);

  //------------------------------------//
  // Generate trial sequence.
  //------------------------------------//

  // Generate experimental trial sequence.
  for (let j = 0; j < N_block_sequences; j++) {

    // Randomize bandit orders.
    bandits = jsPsych.randomization.shuffle(bandits);

    //------------------------------------//
    // Generate trials.
    //------------------------------------//


  // Iterate over trials.
    bandits.forEach((b) => {
      const card_points = Math.random() < probs[b % 3] ? high_card_points : low_card_points; // NB: changed this to reflect 3 probs

   
      // console.log (trial_no, i, b, b- 3*i);

    // Define trial.
      var trial = {
        type: jsPsychMRSTTrial,
        stimulus: stimuli[i][b- 3*i], 
        card_color: colors[i][b- 3*i],
        card_points: card_points,
        certain_points: face_up_points,
        choice_duration: choice_duration,
        randomize: true,
        confirmation_duration: confirmation_duration,
        feedback_duration: feedback_duration,
        valid_responses: trial_keys,
        data: {
          bandit: b+1 ,
          probability: probs[b % 3],
          block: i+1,
          trial: trial_no+1,
          exposure:  exposure[b]+1,
          phase: 'experiment'
        },
        on_finish: function(data) {

          var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
          jsPsych.setProgressBar(curr_progress_bar_value + (1/(N_trials - N_trials_first_part)));


          // Store number of browser interactions
          data.browser_interactions = jsPsych.data.getInteractionData().filter({trial: data.trial_index}).count();

          // Evaluate missing data
          if ( data.choice == null ) {

            // Set missing data to true.
            data.missing = true;

          } else {

            // Set missing data to false.
            data.missing = false;

          }

        }

      }

    // Define looping node.
    const trial_node = {
      timeline: [trial],
      loop_function: function(data) {
        return data.values()[0].missing;
      }
    }

    // Append trial.
    MRST.push(trial_node);

    // Increment counters
    trial_no++;
    exposure[b]++;

  });

  }
}

//------------------------------------//
// Define transition screens.
//------------------------------------//

// Define ready screen.
var READY_01 = {
  type: jsPsychMRSTInstructions,
  pages: [
    {prompt:instructions23},
    {prompt:instructions24},
    {prompt:instructions25},
    {prompt:instructions25a},
    {prompt:instructions26}],
  key_forward:next_key,
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  },
  on_finish: function(){
    jsPsych.setProgressBar(0); 
  }
};

var PRE_READY_02 = {
  type: jsPsychMRSTInstructions,
  pages: [{prompt:instructions27a}],
  key_forward:next_key,
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}


var READY_02 = {
  type: jsPsychMRSTInstructions,
  pages: [//{prompt:instructions27},
    {prompt:instructions28}],
  key_forward:next_key,
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}

// var READY_03 = {
//   type: jsPsychMRSTInstructions,
//   pages: [{prompt:instructions29},
//     {prompt:instructions30}
//     ],
//     key_forward:next_key,
//     key_backward:previous_key,
//     button_labels:[previous_label, next_label],
//     left_to_right:reading_dir_left_to_right,
//
// }
//
// // Define finish screen.
var FINISHED = {
  type: jsPsychMRSTInstructions,
  pages: [
      {prompt:instructions31 } ],
  key_forward:next_key,
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(1); 
  }

}
