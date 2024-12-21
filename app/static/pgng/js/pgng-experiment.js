
//------------------------------------//
// Define experiment.
//------------------------------------//
// One block of the PGNG task is comprised of 8-12 exposures to 12 robots, or
// 120 total trials. 80% of trials provide correct feedback. There are 2 total
// blocks, or 240 total trials.


// Iteratively define trials (2 blocks, 30 exposures per robot, 4 types of robots).
var PIT = [];
var n = 0;

for (let i=0; i<runsheets.length; i++) {

  for (let j=0; j<runsheets[i]['robots'].length; j++) {

    jsPsych.randomization.shuffle([0,1,2,3]).forEach(function (k) {

      // Extract trial information.
      const robot    = runsheets[i]['robots'][j][k];
      const stimulus = runsheets[i]['stimuli'][j][k];
      const sham = runsheets[i]['sham'][j][k];

      // Define trial metadata.
      const valence = (robot < 2) ? 'win' : 'lose';
      const action = (robot % 2 == 0) ? 'go' : 'no-go';

      // Define trial outcomes.

      // const sham = (Math.random() < 0.8) ? 0 : 1;

      if (valence == 'win' && sham == 0) { //gw
        var outcome_correct   = OUTCOMES.WIN;
        var outcome_incorrect = OUTCOMES.NO_WIN;
      } else if (valence == 'win') { //ngw
        var outcome_correct   = OUTCOMES.NO_WIN;
        var outcome_incorrect = OUTCOMES.WIN;
      } else if (valence == 'lose' && sham == 0) { //gal
        var outcome_correct   = OUTCOMES.NO_LOSS;
        var outcome_incorrect = OUTCOMES.LOSS;
      } else { //ngal
        var outcome_correct   = OUTCOMES.LOSS;
        var outcome_incorrect = OUTCOMES.NO_LOSS;
      }


      // Define trial.
      const trial = {
        type: jsPsychPgngTrial,
        robot_rune: runes[i][stimulus],
        scanner_color: valence == 'win' ? scanner_color_win : scanner_color_lose,
        outcome_color: valence == 'win' ? outcome_color_win : outcome_color_lose,
        outcome_correct: outcome_correct,
        outcome_incorrect: outcome_incorrect,
        correct: robot % 2 == 0 ? key_go : -1,
        rune_set: rune_set,
        valid_responses: [key_go],
        trial_duration: trial_duration,
        feedback_duration: feedback_duration,
        data: {
          block: i + 1,
          trial: n + 1,
          stimulus: stimulus,
          robot: robot + 1,
          valence: valence,
          action: action,
          sham: sham
        },
        on_start: function(){console.log(robot + 1, valence, action, sham )},
        on_finish: function(){
          var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
          jsPsych.setProgressBar(curr_progress_bar_value + (1/(N_trials/2)));
          console.log(robot, stimulus, sham);
        }
       };

      // Append.
      PIT.push(trial)
      n++;

    })

  }

}



//------------------------------------//
// Define transition screens.
//------------------------------------//

// Define ready screen.
var READY_1 = {
  type: jsPsychPgngInstructions,
  pages: [
    {
      prompt:ready_00,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:ready_01_a,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:ready_01_b,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },

  ],
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
}


var PRE_READY_2 = {
  type: jsPsychPgngInstructions,
  pages: [

    {
      prompt:pre_ready_02,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },

  ],
  key_forward:next_key,
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }

}

// Define ready screen.
var READY_2 = {
  type: jsPsychPgngInstructions,
  pages: [

    {
      prompt:ready_02_a,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },

  ],
  key_forward:next_key,
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(0); 
  }
}

var FINISHED = {
  type: jsPsychPgngInstructions,
  pages: [
      {prompt:instructions_31 } ],
  key_forward:next_key,
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
  on_start: function(){
    jsPsych.setProgressBar(1); 
  }
  

}



