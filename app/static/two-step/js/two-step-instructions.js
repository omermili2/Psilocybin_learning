
//---------------------------------------//
// Define instructions (section 1a)
//---------------------------------------//
// ThjsPsychTwoStepComprehensions to introduce the “alien space trading” mechanic.
// The key pieces of information to communicate are:
//   - The two planets and their respective aliens
//   - Trading with aliens for treasure or junk
//   - Probabilistic nature of trading
//   - Keyboard keys for making choices

// Define instructions screens.
const INSTRUCTIONS_0A = {
  type: jsPsychTwoStepInstructions,
  pages: [
    {
      prompt:instructions_00_a,
    },
    {
      prompt:instructions_01,
      // audio:'../static/mrst/audio/coutndown1.mp3',
      // view_duration: 1000,
    },
    {
      prompt:instructions_02,
      add_planets:true,
      // audio:'../static/two-step/audio/coutndown1.mp3',
      // view_duration: 1000,
    },
    {
      prompt:instructions_03_a,
      add_aliens: 2,
      // audio:'../static/mrst/audio/coutndown1.mp3',
      // view_duration: 1000,
    },
    {
      prompt:instructions_03_b,
      // audio:'../static/mrst/audio/coutndown1.mp3',
      // view_duration: 1000,
    },
    // {
    //   prompt:instructions_04_a,
    //   // audio:'../static/mrst/audio/coutndown1.mp3',
    //   // view_duration: 1000,
    // },
    // {
    //   prompt:instructions_04_aa,
    //   // audio:'../static/mrst/audio/coutndown1.mp3',
    //   // view_duration: 1000,
    // },


  ],
  rocket_colors: practice_info.rocket_colors,
  planet_colors:practice_info.planet_colors,
  aliens: practice_info.aliens,
  button_labels: [previous_label, next_label],
  key_forward:next_key,
  key_backward:previous_key,
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}


// Define section 1 practice
var practice_0a = {
    type: jsPsychPreAlienPractice,
    aliens: static_aliens.slice(0,2),
    planet_color: planet_colors.slice(2,4),
    feedback_duration: feedback_duration,
    valid_responses: trial_keys,
    randomize: false,
    data: {practice: '0a'},
  };



// Practice block (section 1b)
const PRACTICE_0A = {
  timeline: Array(n_practice_choose_alien).fill(practice_0a)
};


// Define instructions screens.
const INSTRUCTIONS_0B = {
  type: jsPsychTwoStepInstructions,
  pages: [
    // {
    //   prompt:instructions_04_b,

    // },
    {
      prompt:instructions_05_a,
      add_diamonds:true,

    },
    {
      prompt:instructions_05_c,
      add_rocks:true,

    },
    {
      prompt:instructions_05_d,

    },
    {
      prompt:instructions_05_e,

    },
    {
      prompt:instructions_05_f,
      add_aliens: 1,

    },

  ],
  rocket_colors: practice_info.rocket_colors,
  planet_colors:practice_info.planet_colors,
  aliens: static_aliens.slice(0,1),
  button_labels: [previous_label, next_label],
  key_forward:next_key,
  key_backward:previous_key,
  left_to_right:reading_dir_left_to_right,
  on_finish: function(){
    jsPsych.setProgressBar(0); 
  }
}

var n_trial_0b = 0;
// Define section 1 practice
var practice_0b = {
    type: jsPsychOneAlienPractice,
    outcomes:[],
    aliens: static_aliens.slice(0,1),
    planet_color: planet_colors.slice(2,4),
    feedback_duration: feedback_duration,
    valid_responses: trial_keys[0],
    randomize: false,
    data: {practice: '0b'},
    on_start: function(trial) {
      trial.outcomes = one_alien_good_outcomes[n_trial_0b];
      n_trial_0b ++;
    },
    on_finish: function(){
      jsPsych.setProgressBar(n_trial_0b/n_practice_get_outcome);
    },
    
  };



// Practice block (section 1b)
const PRACTICE_0B = {
  timeline: Array(n_practice_get_outcome).fill(practice_0b)
};

// Define instructions screens.
const INSTRUCTIONS_0C = {
  type: jsPsychTwoStepInstructions,
  pages: [
    {
      prompt:instructions_05_g,
      add_aliens: 1,

    },
  ],
  rocket_colors: practice_info.rocket_colors,
  planet_colors:practice_info.planet_colors,
  aliens:static_aliens.slice(0,1),
  button_labels: [previous_label, next_label],
  key_forward:next_key,
  key_backward:previous_key,
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}



const INSTRUCTIONS_0D = {
  type: jsPsychTwoStepInstructions,
      pages: [
    // {
    //   prompt:instructions_05_h,

    // },
    {
      prompt:instructions_06_a,
      add_aliens: 2,

    },
    {
      prompt:instructions_06_b,
      add_aliens: 2,

    },
  ],
  rocket_colors: practice_info.rocket_colors,
  planet_colors:practice_info.planet_colors,
  aliens:static_aliens.slice(1,3),
  button_labels: [previous_label, next_label],
  key_forward:next_key,
  key_backward:previous_key,
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}



// Initialize practice variables.
var n_trial_1 = 0;

// Define section 1 practice
var practice_1 = {
    type: jsPsychAlienPractice,
    outcomes: [],
    aliens: static_aliens.slice(1,3),
    planet_color: planet_colors.slice(2,4),
    choice_duration: null, //no time limit
    feedback_duration: feedback_duration,
    valid_responses: trial_keys,
    randomize: false,
    data: {practice: 1},

    on_start: function(trial) {
      trial.outcomes = practice_alien_outcomes[n_trial_1];
      n_trial_1 ++;
    },
    on_finish: function(){
      jsPsych.setProgressBar(n_trial_1/n_practice_choose_2_aliens);
    },
  };

// Practice block (section 1b)
const PRACTICE_1 = {
  timeline: Array(n_practice_choose_2_aliens).fill(practice_1)
};




// Define instructions screens.
const INSTRUCTIONS_1A = {
  type: jsPsychTwoStepInstructions,
  pages: [
    {
      prompt:instructions_06_c,
      add_aliens: 1,

    },
    // {
    //   prompt:instructions_06_d,

    // },
    {
      prompt:instructions_06_e,

    },
    {
      prompt:instructions_06_f,

    },
    // {
    //   prompt:instructions_06_g,

    // },

  ],
  rocket_colors: practice_info.rocket_colors,
  planet_colors:practice_info.planet_colors,
  aliens: static_aliens.slice(2,3),
  button_labels: [previous_label, next_label],
  key_forward:next_key,
  key_backward:previous_key,
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}


const INSTRUCTIONS_1B = {
  type: jsPsychTwoStepInstructions,
  pages: [
    {
      prompt:instructions_07_a,

    },
    {
      prompt:instructions_07_b,
      add_planets: 2,

    },
    {
      prompt:instructions_07_c,
      add_rockets:true

    },
    {
      prompt:instructions_07_d,
      add_rockets:true
    },
    {
      prompt:instructions_07_e,
    },
    {
      prompt:instructions_07_f,
    },
    {
      prompt:instructions_07_g,
    },
    {
      prompt:instructions_07_i,
    },

  ],
  rocket_colors: practice_info.rocket_colors,
  planet_colors:practice_info.planet_colors,
  aliens: static_aliens.slice(2,3),
  button_labels: [previous_label, next_label],
  key_forward:next_key,
  key_backward:previous_key,
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}


// Initialize practice variables.
var n_trial_2 = 0;

// Define section 2 practice
const PRACTICE_2 = {
  timeline: [{
    type: jsPsychTwoStepTrial,
    animation:true,
    transition: 1,
    outcomes: [],
    rocket_colors: practice_info.rocket_colors,
    planet_colors: practice_info.planet_colors,
    aliens: practice_info.aliens,
    choice_duration: choice_duration,
    feedback_duration: feedback_duration,
    randomize_s1: randomize_s1,
    randomize_s2: randomize_s2,
    valid_responses_s1:trial_keys,
    valid_responses_s2:trial_keys,
    // data: {trial: 0},
    data: {practice: 2},

    on_start: function(trial) {
      n_trial_2++;
      // define transition
      trial.transition = (Math.random() < 0.8) ? 1 : 0;

      // define outcomes
      trial.outcomes = [
        (Math.random() < 0.85) ? 1 : 0,
        (Math.random() < 0.15) ? 1 : 0,
        (Math.random() < 0.15) ? 1 : 0,
        (Math.random() < 0.85) ? 1 : 0,
      ]

    },
    on_finish: function(data) {

      if ( data.state_1_choice == null || data.state_2_choice == null ) {
        data.missing = true;
      } else {
        data.missing = false;
      }
      
      jsPsych.setProgressBar(n_trial_2/n_practice_both_steps);


    }
  }],
  repetitions: n_practice_both_steps,
  loop_function: function(data) {
    return data.values()[0].missing;
  }
}


const INSTRUCTIONS_2A = {
  type: jsPsychTwoStepInstructions,
  pages: [
    {
      prompt:instructions_08_a,

    },
    {
      prompt:instructions_08_b,

    },
    {
      prompt:instructions_08_c,

    },
    {
      prompt:instructions_08_d,

    },
    {
      prompt:instructions_08_e,

    },
    {
      prompt:instructions_08_f,

    },

  ],
  rocket_colors: practice_info.rocket_colors,
  planet_colors:practice_info.planet_colors,
  aliens: static_aliens.slice(2,3),
  button_labels: [previous_label, next_label],
  key_forward:next_key,
  key_backward:previous_key,
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}

var n_quiz_q = 3
const quiz_1a_node = loop_quiz_node('1a',n_quiz_q,
                      quiz1_prompt_a,
                      quiz_options_true_false,
                      quiz_options_true_false[1],
                      quiz1_review_a,
                      feedback_err,
                      feedback_pos,
                      0, //tbd audio path
                      max_errors);

const quiz_1b_node = loop_quiz_node('1b',n_quiz_q,
                      quiz1_prompt_b,
                      quiz_options_true_false,
                      quiz_options_true_false[0],
                      quiz1_review_b,
                      feedback_err,
                      feedback_pos,
                      0, //tbd audio path
                      max_errors);

const quiz_1c_node = loop_quiz_node('1c',n_quiz_q,
                      quiz1_prompt_c,
                      quiz_options_true_false,
                      quiz_options_true_false[1],
                      quiz1_review_c,
                      feedback_err,
                      feedback_pos,
                      0, //tbd audio path
                      max_errors);

var QUIZ_1 = {
    timeline: [
      quiz_1a_node,
      quiz_1b_node,
      quiz_1c_node,
      ]
  }



const INSTRUCTIONS_2B = {
  type: jsPsychTwoStepInstructions,
  pages: [
    {
      prompt:feedback_quiz,

    },
    {
      prompt:instructions_09_a,

    },


  ],
  rocket_colors: practice_info.rocket_colors,
  planet_colors:practice_info.planet_colors,
  aliens: static_aliens.slice(2,3),
  button_labels: [previous_label, next_label],
  key_forward:next_key,
  key_backward:previous_key,
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}


//---------------------------------------//
// Define instructions timeline
//---------------------------------------//


var INSTRUCTIONS = [

  INSTRUCTIONS_0A,
  // PRACTICE_0A, // removed since version 2
  INSTRUCTIONS_0B,
  PRACTICE_0B,
  INSTRUCTIONS_0C,
  INSTRUCTIONS_0D,
  PRACTICE_1,
  INSTRUCTIONS_1A,
  INSTRUCTIONS_1B,
  PRACTICE_2,
  INSTRUCTIONS_2A,
  QUIZ_1,
  INSTRUCTIONS_2B,

]
