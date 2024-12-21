

//// support function
function loop_quiz_node(label, n_quiz_q, quiz_prompt,quiz_options, quiz_correct, instruction_review, feedback_err, feedback_pos, audio,  max_errors){
  var quiz_num_errors=0;

  const quiz = {
    type: jsPsychPgngComprehension,
    prompts: ['<p>'+quiz_prompt+'</p>'],
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
      timeline:[{type: jsPsychPgngInstructions,
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
      if (quiz_num_errors <= max_errors) {
        return false;
      } else {
        return true;
      }
    }
  };

  const quiz_pos_feedback = {
      timeline:[{type: jsPsychPgngInstructions,
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

      if (quiz_num_errors > max_errors) {
        return true;
      } else {
        return false;
      }

    }
  }

  return quiz_node
}


function practice_loop(block, label, practice_params, feedback_trouble){

  // Initialize practice counters.
  var practice_counter = 0;
  var correct_counter = 0;
  const practice_len = practice_params.practice_outcomes.length ;

  cor_outcome_options = [practice_params.outcome_correct, 
                    practice_params.outcome_incorrect]
  
  inc_outcome_options = [practice_params.outcome_incorrect, 
    practice_params.outcome_correct]
  
  practice_node = [];

  for (let i = 0; i < practice_len; i++) {

      var practice_trial = {
        type: jsPsychPgngTrial,
        robot_rune: practice_params.rune,
        scanner_color: practice_params.scanner_color,
        outcome_color: practice_params.outcome_color,
        outcome_sec_color: practice_params.outcome_sec_color,
        outcome_correct: cor_outcome_options[practice_params.practice_outcomes[i]],
        outcome_incorrect: inc_outcome_options[practice_params.practice_outcomes[i]],
        correct: practice_params.correct_key,
        valid_responses: practice_params.valid_responses,
        trial_duration: practice_params.trial_duration,
        feedback_duration: practice_params.feedback_duration,
        data: {block: block, practice: label},

        on_finish: function(data) {
          if (data.accuracy == 1) {
            correct_counter++;
          } 
          practice_counter++;


          var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
          jsPsych.setProgressBar(curr_progress_bar_value + (1/practice_len));
        }
      }

    practice_node.push(practice_trial); 

  }

  // Practice help (GW robot)
  const practice_help = {
    type: jsPsychPgngInstructions,
    pages: [
      {
        prompt: feedback_trouble,
        // robot_runes:'',
        // scanner_colors:'#FFFFFF00',
        // audio:['../static/pgng/audio/coutndown1.mp3'],
        // view_duration:[],
      }
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

  // Practice block
  const PRACTICE = {
    timeline: [practice_node.slice(0,practice_len/2), 
              practice_help_node, 
              practice_node.slice(practice_len/2, practice_len)].flat()
    }

  return PRACTICE

}

function old_dyn_practice_loop(block, label, practice_params, n_practice, n_err, feedback_trouble, outcome_prob){

  var err_counter = 0;
  var practice_counter = 0;

  var last_five = Array(n_practice).fill(0); // keep track of last N trials
  var last_five_sum = 0;

  var help_counter = 0;

  const practice_trial = {
    type: jsPsychPgngTrial,
    robot_rune: practice_params.rune,
    scanner_color: practice_params.scanner_color,
    outcome_color: practice_params.outcome_color,
    outcome_sec_color: practice_params.outcome_sec_color,
    outcome_correct: practice_params.outcome_correct,
    outcome_incorrect: practice_params.outcome_incorrect,
    correct: practice_params.correct_key,
    valid_responses: practice_params.valid_responses,
    trial_duration: practice_params.trial_duration,
    feedback_duration: practice_params.feedback_duration,
    data: {block: block, practice: label},
    on_start: function(trial){
      trial.outcome_correct = Math.random() < outcome_prob? practice_params.outcome_correct : practice_params.outcome_correct;
      trial.outcome_incorrect = Math.random() < outcome_prob? practice_params.outcome_incorrect : practice_params.outcome_incorrect;
    },
    on_finish: function(data) {
      practice_counter++;
      last_five[practice_counter%n_practice] = data.accuracy;
      last_five_sum = last_five.reduce((partialSum, a) => partialSum + a, 0)
      if (data.accuracy == 0) {
        err_counter++;
      }
    }
  }

  const practice_node = { // serve 5 pratice trials
    timeline: Array(n_practice).fill(practice_trial),
  }

  const practice_help = {
    type: jsPsychPgngInstructions,
    pages: [
      {
        prompt: feedback_trouble,
        // audio:['../static/pgng/audio/coutndown1.mp3'],
        // view_duration:[],
      }
    ],
    key_forward:next_key,
    key_backward:previous_key,
    button_labels:[previous_label, next_label],
    left_to_right:reading_dir_left_to_right,
  }

  const practice_help_node = {
    timeline: [practice_help],
    conditional_function: function() {
      if ( err_counter >= n_err ) {
        err_counter = 0;
        help_counter++;
        return true;
      } else {
        return false;

      }
    }
  }

  const PRACTICE = {
    timeline: [practice_node, practice_help_node],
    loop_function: function(data) {
      if ((help_counter <= 2) & ( last_five_sum < n_practice-1  ) )
      {
        return true;
      }
      else {
        return false;
      }
    }
  }

  return PRACTICE


}

function dyn_practice_loop(block, label, practice_params, n_practice, n_err, practice_outcomes, feedback_trouble){

  var err_counter = 0;
  var practice_counter = 0;

  var last_five = Array(n_practice).fill(0); // keep track of last N trials
  var last_five_sum = 0;

  var help_counter = 0;

  var practice_counter = 0;

  cor_outcome_options = [practice_params.outcome_correct, 
                    practice_params.outcome_incorrect]
  
  inc_outcome_options = [practice_params.outcome_incorrect, 
    practice_params.outcome_correct]
  
  // console.log(cor_outcome_options);
  // console.log(practice_outcomes);

  var practice_trial = {
    type: jsPsychPgngTrial,
    robot_rune: practice_params.rune,
    scanner_color: practice_params.scanner_color,
    outcome_color: practice_params.outcome_color,
    outcome_sec_color: practice_params.outcome_sec_color,
    outcome_correct: practice_params.outcome_correct,
    outcome_incorrect: practice_params.outcome_incorrect,
    correct: practice_params.correct_key,
    valid_responses: practice_params.valid_responses,
    trial_duration: practice_params.trial_duration,
    feedback_duration: practice_params.feedback_duration,
    data: {block: block, practice: label},
    on_start: function(trial) {
      trial.outcome_incorrect = inc_outcome_options[practice_outcomes[practice_counter+1]];
      trial.outcome_correct = cor_outcome_options[practice_outcomes[practice_counter+1]];
      console.log(trial.outcome_correct);
    },
    on_finish: function(data) {
      practice_counter++;
      last_five[practice_counter%n_practice] = data.accuracy;
      last_five_sum = last_five.reduce((partialSum, a) => partialSum + a, 0)
      if (data.accuracy == 0) {
        err_counter++;
      }
    }
  }

  const practice_node = { // serve 5 pratice trials
    timeline: Array(n_practice).fill(practice_trial),
  }

  const practice_help = {
    type: jsPsychPgngInstructions,
    pages: [
      {
        prompt: feedback_trouble,
        // audio:['../static/pgng/audio/coutndown1.mp3'],
        // view_duration:[],
      }
    ],
    key_forward:next_key,
    key_backward:previous_key,
    button_labels:[previous_label, next_label],
    left_to_right:reading_dir_left_to_right,
  }

  const practice_help_node = {
    timeline: [practice_help],
    conditional_function: function() {
      if ( err_counter >= n_err ) {
        err_counter = 0;
        help_counter++;
        return true;
      } else {
        return false;

      }
    }
  }

  const PRACTICE = {
    timeline: [practice_node, practice_help_node],
    loop_function: function(data) {
      if ((help_counter <= 2) & ( last_five_sum < n_practice-1  ) )
      {
        return true;
      }
      else {
        return false;
      }
    }
  }

  return PRACTICE


}

function old_semi_dyn_practice_loop(block, label, practice_params, practice_outcomes, feedback_trouble){

  // Initialize practice counters.
  var practice_counter = 0;
  var correct_counter = 0;
  const practice_len = practice_outcomes.length ;
  var corr_in_a_row = Array(practice_params.n_in_row_practice).fill(0); // keep track of last N trials
  var corr_in_a_row_sum = 0;
  var offer_help = 0;

  cor_outcome_options = [practice_params.outcome_correct, 
                    practice_params.outcome_incorrect]
  
  inc_outcome_options = [practice_params.outcome_incorrect, 
    practice_params.outcome_correct]
  
  practice_node_timeline = [];

    // Practice help (GW robot)
  const practice_help = {
      type: jsPsychPgngInstructions,
      pages: [
        {
          prompt: feedback_trouble,
          // robot_runes:'',
          // scanner_colors:'#FFFFFF00',
          // audio:['../static/pgng/audio/coutndown1.mp3'],
          // view_duration:[],
        }
      ],
      key_forward:next_key,
      key_backward:previous_key,
      button_labels:[previous_label, next_label],
      left_to_right:reading_dir_left_to_right,
    }

  for (let i = 0; i < practice_len; i++) {

      var practice_trial = {
        type: jsPsychPgngTrial,
        robot_rune: practice_params.rune,
        scanner_color: practice_params.scanner_color,
        outcome_color: practice_params.outcome_color,
        outcome_sec_color: practice_params.outcome_sec_color,
        outcome_correct: cor_outcome_options[practice_outcomes[i]],
        outcome_incorrect: inc_outcome_options[practice_outcomes[i]],
        correct: practice_params.correct_key,
        valid_responses: practice_params.valid_responses,
        trial_duration: practice_params.trial_duration,
        feedback_duration: practice_params.feedback_duration,
        data: {block: block, practice: label},

        on_finish: function(data) {
          if (data.accuracy == 1) {
            correct_counter++;
          } 
          practice_counter++;
          corr_in_a_row[practice_counter%practice_params.n_in_row_practice] = data.accuracy;
          corr_in_a_row_sum = corr_in_a_row.reduce((partialSum, a) => partialSum + a, 0)

          var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
          jsPsych.setProgressBar(curr_progress_bar_value + (1/practice_len));
        }
    }

    const practice_trial_node = {
      timeline: [practice_trial],
      conditional_function: function() {
        if (corr_in_a_row_sum<practice_params.n_in_row_practice) {
          return true;
        } else {
          return false;
        }
      }
      }

    practice_node_timeline.push(practice_trial_node);
  
    const practice_help_node = {
    timeline: [practice_help],
    conditional_function: function() {
      if ((correct_counter <= practice_counter/2 ) & (offer_help==0)& (practice_counter>=3) ) { // if more than half correct
        offer_help=1;
        return true;
      } else {
        return false;
      }
      }
    }
    practice_node_timeline.push(practice_help_node);  
    
    

  }





  // Practice block
  const PRACTICE = {
    timeline: practice_node_timeline
    }

  return PRACTICE

}

function semi_dyn_practice_loop(block, label, practice_params, feedback_trouble){

  // Initialize practice counters.
  var practice_counter = 0;
  var correct_counter = 0;
  const practice_len = practice_params.n_pratice*2 ;
  var offer_help = 0;

  var n_row = 0;
  var sham = 0;

  practice_node_timeline = [];


    // Practice help (GW robot)
  const practice_help = {
      type: jsPsychPgngInstructions,
      pages: [
        {
          prompt: feedback_trouble,
          // robot_runes:'',
          // scanner_colors:'#FFFFFF00',
          // audio:['../static/pgng/audio/coutndown1.mp3'],
          // view_duration:[],
        }
      ],
      key_forward:next_key,
      key_backward:previous_key,
      button_labels:[previous_label, next_label],
      left_to_right:reading_dir_left_to_right,
    }

  for (let i = 0; i < practice_len; i++) {

    var practice_trial = {
        type: jsPsychPgngTrial,
        robot_rune: practice_params.rune,
        scanner_color: practice_params.scanner_color,
        outcome_color: practice_params.outcome_color,
        outcome_sec_color: practice_params.outcome_sec_color,
        outcome_correct: practice_params.outcome_correct,
        outcome_incorrect: practice_params.outcome_incorrect,
        correct: practice_params.correct_key,
        valid_responses: practice_params.valid_responses,
        trial_duration: practice_params.trial_duration,
        feedback_duration: practice_params.feedback_duration,
        data: {block: block, practice: label, sham:sham, n_row: n_row},
        on_start: function(trial)
        {
          if (sham==1){
          trial.outcome_correct = practice_params.outcome_incorrect;
          trial.outcome_incorrect = practice_params.outcome_correct;
        }
        },
        on_finish: function(data) {
          sham=0;

          if (data.accuracy == 1) {
            correct_counter++;
            n_row++;

            if (n_row==4){
              sham=1;
            }
          } 
          else{
            n_row=0;
          }
          practice_counter++;

          var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
          jsPsych.setProgressBar(curr_progress_bar_value + (1/practice_len));
          // console.log(sham, n_row, correct_counter)

        }
    }

    const practice_trial_node = {
      timeline: [practice_trial],
      conditional_function: function() {
        if ((i>=10) & (n_row>=6)) {
          return false;
        } else {
          return true;
        }
      }
      }

    practice_node_timeline.push(practice_trial_node);
  
    const practice_help_node = {
    timeline: [practice_help],
    conditional_function: function() {
      if ((correct_counter <= practice_counter/2 ) & (offer_help==0)& (practice_counter>=3) ) { // if more than half correct
        offer_help=1;
        return true;
      } else {
        return false;
      }
      }
    }
    practice_node_timeline.push(practice_help_node);  
    
    

  }





  // Practice block
  const PRACTICE = {
    timeline: practice_node_timeline
    }

  return PRACTICE

}