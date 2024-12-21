

//// support function
function loop_quiz_node(label, n_quiz_q, quiz_prompt,quiz_options, quiz_correct, instruction_review, feedback_err, feedback_pos, audio, max_errors){
  var quiz_num_errors=0;

  const quiz = {
    type: jsPsychMRSTComprehension,
    prompts: [quiz_prompt],
    options: [quiz_options],
    correct: [quiz_correct],
    left_to_right:reading_dir_left_to_right,
    button_label:continue_label,
    data: {quiz: label},
    on_finish: function(trial){
      quiz_num_errors = trial.num_errors;
      if (trial.num_errors==0){
        var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(curr_progress_bar_value + (1/n_quiz_q));
      }

    }
  }

  const quiz_help = {
      timeline:[{type: jsPsychMRSTInstructions,
      pages: [
        {
          prompt:feedback_err,
        // audio:audio.err
        },
        {
          prompt:instruction_review,
          // audio:audio.review
        },
      ],
      key_forward:next_key,
      key_backward:previous_key,
      button_labels:[previous_label, next_label],
      left_to_right:reading_dir_left_to_right,

    }],
    conditional_function: function(data) {
      if (quiz_num_errors == 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  const quiz_pos_feedback = {
      timeline:[{type: jsPsychMRSTInstructions,
      pages: [
        {
          prompt:feedback_pos,
        // audio:audio.feedback_pos
      }
      ],
      key_forward:next_key,
      key_backward:previous_key,
      button_labels:[previous_label, next_label],
      left_to_right:reading_dir_left_to_right,

    }],
    conditional_function: function(data) {
      if (quiz_num_errors == 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  var quiz_node = {
    timeline: [
      quiz,
      quiz_help,
      quiz_pos_feedback,
    ],
    loop_function: function(data) {

      if (quiz_num_errors >=1 ) {
        return true;
      } else {
        return false;
      }

    }
  }

  return quiz_node
}


function practice(stim, color, block, practice_outcomes, help_prompts){

  var practice_counter = 0;
  var correct_counter = 0;
  const practice_len = practice_outcomes.length ;

practice_node = [];

for (let i = 0; i < practice_len; i++) {


  var practice_trial = {
    type: jsPsychMRSTTrial,
    stimulus: stim, 
    card_color: color,
    certain_points: PRACTICE_INFO.face_up_points,
    card_points: practice_outcomes[i],
    choice_duration: choice_duration,
    confirmation_duration: confirmation_duration,
    feedback_duration: feedback_duration,
    valid_responses: trial_keys,
    data: {phase: 'practice', block: block,},
    on_finish: function(data) {
      var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
      jsPsych.setProgressBar(curr_progress_bar_value + (1/practice_len));

      if (data.accuracy == 1) {
        correct_counter++;
      } 
      practice_counter++;

  }
}

  practice_node.push(practice_trial); 
}


// Practice help #1
const practice_help = {
  type: jsPsychMRSTInstructions,
  pages: [
    {
      prompt: help_prompts[0],},//help_00,  },
    {
      prompt: help_prompts[1],},//help_01,  },
  ],
  key_forward:next_key,
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
  }

const practice_help_node = {
    timeline: [practice_help],
    conditional_function: function() {
      if (correct_counter > practice_counter/2 ) { // if more than half correct
        return false;
      } else {
        return true;
      }
    }
  }

  const PRACTICE = {
    timeline: [practice_node.slice(0,practice_len/2), 
              practice_help_node, 
              practice_node.slice(practice_len/2, practice_len)].flat()
    }

return PRACTICE

}

// //---------------------------------------//
// // Define functions.
// //---------------------------------------//

function longestSequence( arr ) {

  // Initialize variables.
  var counts = [0,0];
  var seqmax = 0;

  arr.forEach((i) => {
    // Increment counts.
    counts = counts.map(function(v){return ++v;});

    // Reset counter of context.
    counts[i] = 0;

    // Update sequence length max.
    if ( Math.max(...counts) > seqmax ) { seqmax = Math.max(...counts) };

  });

  return seqmax

}
