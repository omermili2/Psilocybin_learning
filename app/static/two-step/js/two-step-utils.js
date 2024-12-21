

//// support function
function loop_quiz_node(label, n_quiz_q, quiz_prompt,quiz_options, quiz_correct, instruction_review, feedback_err,  feedback_pos, audio, max_errors){
  var quiz_num_errors=0;

  const quiz = {
    type: jsPsychTwoStepComprehension,
    prompts: [quiz_prompt],
    options: [quiz_options],
    correct: [quiz_correct],
    left_to_right:reading_dir_left_to_right,
    data: {quiz: label},
    button_label: continue_label,
    on_finish: function(trial){
      quiz_num_errors = trial.num_errors;

      if (trial.num_errors==0){
        var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(curr_progress_bar_value + (1/n_quiz_q));
      }
    }
    
  }

  const quiz_help = {
      timeline:[{type: jsPsychTwoStepInstructions,
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
      rocket_colors: practice_info.rocket_colors,
      planet_colors:practice_info.planet_colors,
      aliens: practice_info.aliens,
      button_labels: [previous_label,next_label],
      key_forward:next_key,
      key_backward:previous_key,
      left_to_right:reading_dir_left_to_right,

    }],
    conditional_function: function(data) {
      if (quiz_num_errors <= max_errors) {
        return false;
      } else {
        return true;
      }
    }
  };

  const quiz_pos_feedback = {
      timeline:[{type: jsPsychTwoStepInstructions,
      pages: [
        {
          prompt:feedback_pos,
        // audio:audio.feedback_pos
      }
      ],
      rocket_colors: practice_info.rocket_colors,
      planet_colors:practice_info.planet_colors,
      aliens: practice_info.aliens,
      button_labels: [previous_label,next_label],
      key_forward:next_key,
      key_backward:previous_key,
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
      quiz_pos_feedback
    ],
    loop_function: function(data) {

      if (quiz_num_errors > max_errors) {
        return true;
      } else {
        return false;
      }

    }
  }

  return quiz_node
}
