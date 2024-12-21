
//------------------------------------//
// Define instructions text.
//------------------------------------//

var INSTRUCTIONS_01A = {
  type: jsPsychPgngInstructions,
  pages: [
    {
      prompt:instructions_00,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_01,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_02,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_03a,
      robot_runes:instruction_runes.star, //star
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_03b,
      robot_runes:instruction_runes.flower, //flower
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_03c,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_04,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_05,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_05a,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_05b,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_05d,
      robot_runes:'',
      scanner_colors:color0.scanner,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_05e,
      robot_runes:instruction_runes.web,
      scanner_colors:'#FFFFFF00',

      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_05f,
      robot_runes:instruction_runes.web,
      scanner_colors:color0.scanner,

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

  };

  var INSTRUCTIONS_SPACE_G = {
    type: jsPsychPgngInstructions,
    pages: [
  {
    prompt:instructions_space,
    robot_runes:instruction_runes.web,
    scanner_colors:color0.scanner,
  },
  ],
  key_forward:' ',
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
    
  }

  var INSTRUCTIONS_01B = {
    type: jsPsychPgngInstructions,
    pages: [
    {
      prompt:instructions_05g,
      robot_runes:instruction_runes.web,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_05i,
      robot_runes:instruction_runes.diamond,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_05j,
      robot_runes:instruction_runes.diamond,
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

};


var INSTRUCTIONS_SPACE_NG = {
  type: jsPsychPgngInstructions,
  pages: [
{
  prompt:instructions_space,
  robot_runes:instruction_runes.diamond,
  scanner_colors:color0.scanner,
},
],
key_forward:' ',
key_backward:previous_key,
button_labels:[previous_label, next_label],
left_to_right:reading_dir_left_to_right,
  
}



var INSTRUCTIONS_01C = {
  type: jsPsychPgngInstructions,
  pages: [
    {
      prompt:instructions_05k,
      // robot_runes:instruction_runes.diamond,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:  instructions_06_b+
          `<b><font color=${outcome_color_win}>`+SAFE+`</font></b>`+
          instructions_06_c+`<b><font color=${outcome_color_lose}>`+ DANGEROUS +`</font></b>`,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt: instructions_06_d+`<b><font color=${outcome_color_win}>`+SAFE+`</font></b>`+instructions_06_e+` `+instructions_06_d+`<b><font color=${outcome_color_lose}>`+DANGEROUS+`</font></b>`+instructions_06_f,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt: instructions_06_g+`<b><font color=${outcome_color_win}>`+SAFE+`</font></b>`+ instructions_06_h+
                    `<b><font color=${outcome_color_lose}>`+DANGEROUS+`</font></b>`,
      robot_runes:'',
      scanner_colors:'#FFFFFF00',
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt: instructions_07_a+
            `<b><font color=${outcome_color_win}>${instr_color_win}</font></b>,`+
            instructions_07_b+`<b><font color=${outcome_color_win}>`+
            SAFE_singular +`</font></b><br>`+instructions_07_d+` `+instructions_07_e,
      robot_runes:'',
      scanner_colors:scanner_color_win,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },

    {
      prompt: instructions_07_g +`<b><font color=${outcome_color_win}>`+SAFE_singular+`</font></b>` +instructions_07_h,
      robot_runes:'',
      scanner_colors:scanner_color_win,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt: instructions_08_a+
            `<b><font color=${outcome_color_lose}>${instr_color_lose}</font></b>,`+
            instructions_08_b+`<b><font color=${outcome_color_lose}>`+
            DANGEROUS_singular +`</font></b><br>`+ instructions_08_d ,
      robot_runes:'',
      scanner_colors:scanner_color_lose,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },

    {
      prompt: instructions_08_g +`<b><font color=${outcome_color_lose}>`+DANGEROUS_singular +`</font></b>` +instructions_08_h,
      robot_runes:'',
      scanner_colors:scanner_color_lose,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt: instructions_09_a+`<b><font color=${outcome_color_win}>`+SAFE_singular+`</font></b>.` + instructions_09_b,
      robot_runes:practice_runes[0],
      scanner_colors:scanner_color_win,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt: instructions_09_c,
      robot_runes:practice_runes[0],
      scanner_colors:scanner_color_win,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    }
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


var INSTRUCTIONS_SPACE_GW = {
  type: jsPsychPgngInstructions,
  pages: [
{
  prompt:instructions_space,
  robot_runes:practice_runes[0],
  scanner_colors:scanner_color_win,
},
],
key_forward:' ',
key_backward:previous_key,
button_labels:[previous_label, next_label],
left_to_right:reading_dir_left_to_right,
  
}



var INSTRUCTIONS_02A = {
  type: jsPsychPgngInstructions,
  pages: [
    {
      prompt:instructions_10_a,
      robot_runes:practice_runes[0],
      scanner_colors:scanner_color_win,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_10_b +`<b><font color=${outcome_color_win}>`+SAFE_singular +`</font></b> -` +instructions_10_c,
      robot_runes:practice_runes[0],
      scanner_colors:scanner_color_win,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    // {
    //   prompt:instructions_10_e +`<b><font color=${outcome_color_win}>`+SAFE_singular +`</font></b>` +instructions_10_f,
    //   // robot_runes:'',
    //   // scanner_colors:'#FFFFFF00',
    //   // audio:['../static/pgng/audio/coutndown1.mp3'],
    //   // view_duration:[],
    // },
    // {
    //   prompt: instructions_11_a+`<b><font color=${outcome_color_win}>`+SAFE_singular+`</font></b>. ` + instructions_11_b,
    //   robot_runes:practice_runes[1],
    //   scanner_colors:scanner_color_win,
    //   // audio:['../static/pgng/audio/coutndown1.mp3'],
    //   // view_duration:[],
    // }

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

var INSTRUCTIONS_SPACE_NGW = {
  type: jsPsychPgngInstructions,
  pages: [
{
  prompt:instructions_space,
  robot_runes:practice_runes[1],
  scanner_colors:scanner_color_win,
},
],
key_forward:' ',
key_backward:previous_key,
button_labels:[previous_label, next_label],
left_to_right:reading_dir_left_to_right,
  
}


var INSTRUCTIONS_03A = {
  type: jsPsychPgngInstructions,
  pages: [
    {
      prompt: instructions_12_a,
      robot_runes:practice_runes[1],
      scanner_colors:scanner_color_win,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    // {
    //   prompt:instructions_10_b +`<b><font color=${outcome_color_win}>`+SAFE_singular +`</font></b>` +instructions_10_c,
    //   robot_runes:practice_runes[1],
    //   scanner_colors:scanner_color_win,
    //   // audio:['../static/pgng/audio/coutndown1.mp3'],
    //   // view_duration:[],
    // },
    {
      prompt:instructions_13_a+`<b><font color=${outcome_color_lose}>`+DANGEROUS_singular+`</font></b>`,
      robot_runes:practice_runes[2],
      scanner_colors:scanner_color_lose,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_13_b+`<b><font color=${outcome_color_lose}>`+DANGEROUS+`</font></b>`+instructions_13_c,
      robot_runes:practice_runes[2],
      scanner_colors:scanner_color_lose,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_13_d,
      robot_runes:practice_runes[2],
      scanner_colors:scanner_color_lose,
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


  var INSTRUCTIONS_SPACE_NGAL = {
    type: jsPsychPgngInstructions,
    pages: [
  {
    prompt:instructions_space,
    robot_runes:practice_runes[2],
    scanner_colors:scanner_color_lose,
  },
  ],
  key_forward:' ',
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
    
  }  

  var INSTRUCTIONS_04A = {
    type: jsPsychPgngInstructions,
    pages: [
      {
        prompt:instructions_14_a,
        robot_runes:practice_runes[2],
        scanner_colors:scanner_color_lose,
        // audio:['../static/pgng/audio/coutndown1.mp3'],
        // view_duration:[],
      },
      {
        prompt:instructions_14_b +`<b><font color=${outcome_color_lose}>`+DANGEROUS_singular+`</font></b>`+ instructions_14_c,
        robot_runes:practice_runes[2],
        scanner_colors:scanner_color_lose,
        // audio:['../static/pgng/audio/coutndown1.mp3'],
        // view_duration:[],
      },
      {
        prompt:instructions_14_d +`<b><font color=${outcome_color_lose}>`+DANGEROUS_singular+`</font></b>`,
        robot_runes:practice_runes[3],
        scanner_colors:scanner_color_lose,
        // audio:['../static/pgng/audio/coutndown1.mp3'],
        // view_duration:[],
      },
      {
        prompt:instructions_14_f,
        robot_runes:practice_runes[3],
        scanner_colors:scanner_color_lose,
        // audio:['../static/pgng/audio/coutndown1.mp3'],
        // view_duration:[],
      }
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




  var INSTRUCTIONS_SPACE_GAL = {
    type: jsPsychPgngInstructions,
    pages: [
  {
    prompt:instructions_space,
    robot_runes:practice_runes[3],
    scanner_colors:scanner_color_lose,
  },
  ],
  key_forward:' ',
  key_backward:previous_key,
  button_labels:[previous_label, next_label],
  left_to_right:reading_dir_left_to_right,
    
  }  

var INSTRUCTIONS_05A = {
  type: jsPsychPgngInstructions,
  pages: [
    {
      prompt:instructions_15_a,
      robot_runes:practice_runes[3],
      scanner_colors:scanner_color_lose,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_15_b,
      robot_runes:practice_runes[3],
      scanner_colors:scanner_color_lose,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_15_c+
        `<b><font color=${outcome_color_win}>`+SAFE +`</font></b>` +instructions_15_d+
        `<b><font color=${outcome_color_lose}>`+DANGEROUS +`</font></b>` +instructions_15_e+
        instructions_15_f,
      robot_runes:'',
      // scanner_colors:scanner_color_lose,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_15_g,
      robot_runes:'',
      // scanner_colors:scanner_color_lose,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_15_h,
      robot_runes:'',
      // scanner_colors:scanner_color_lose,
      // audio:['../static/pgng/audio/coutndown1.mp3'],
      // view_duration:[],
    },
    {
      prompt:instructions_15_i +  `<b><font color=${outcome_color_win}>`+SAFE_singular +`</font></b>` +
       instructions_15_j + `<b><font color=${outcome_color_lose}>`+DANGEROUS_singular +`</font></b>` ,
      robot_runes:'',
      // scanner_colors:scanner_color_lose,
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

var INSTRUCTIONS_06A = {
  type: jsPsychPgngInstructions,
  pages: [

    {
      prompt:instructions_21,
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

  on_start: function(){
    jsPsych.setProgressBar(0); 
  },
  on_finish: function(){
    jsPsych.setProgressBar(0); 
  }
}

//------------------------------------//
// Define practice block #1. GO
//------------------------------------//

const practice_params_G = {
  rune:instruction_runes.web,
  scanner_color:color3.scanner,//white
  outcome_color:color3.outcome,//black
  outcome_sec_color:color3.outcome,//black
  outcome_correct:feedback_signals.check,
  outcome_incorrect:feedback_signals.x,
  correct_key: key_go,
  valid_responses:[key_go],
  trial_duration:trial_duration,
  feedback_duration:feedback_duration,
  practice_outcomes:practice_a_outcomes.G,
  n_pratice:n_practice,

};


// const PRACTICE_BLOCK_G = practice_loop(0, '01a',
// practice_params_G, feedback_trouble_go);

const PRACTICE_BLOCK_G = semi_dyn_practice_loop(0, '01a',
practice_params_G, feedback_trouble_go);



//------------------------------------//
// Define practice block #1. NO GO
//------------------------------------//

const practice_params_NG = {
  rune:instruction_runes.diamond,
  scanner_color:color3.scanner,//white
  outcome_color:color3.outcome,//black
  outcome_sec_color:color3.outcome,//black
  outcome_correct:feedback_signals.check,
  outcome_incorrect:feedback_signals.x,
  correct_key: key_nogo,
  valid_responses:[key_go],
  trial_duration:trial_duration,
  feedback_duration:feedback_duration,
  practice_outcomes:practice_a_outcomes.NG,
  n_pratice:n_practice,

};

// const PRACTICE_BLOCK_NG = practice_loop(0, '01b',
// practice_params_NG, feedback_trouble_nogo);

const PRACTICE_BLOCK_NG = semi_dyn_practice_loop(0, '01b',
practice_params_NG, feedback_trouble_nogo);


//------------------------------------//
// Define practice block #1. GW
//------------------------------------//

const practice_params_GW = {
  rune:practice_runes[0],
  scanner_color:scanner_color_win,
  outcome_color:outcome_color_win,
  outcome_sec_color:outcome_color_win,
  outcome_correct:OUTCOMES.WIN,
  outcome_incorrect:OUTCOMES.NO_WIN,
  correct_key: key_go,
  valid_responses:[key_go],
  trial_duration:trial_duration,
  feedback_duration:feedback_duration,
  practice_outcomes:practice_b_outcomes.GW,
  n_pratice:n_practice,
};
// Practice block (GW robot)
// const PRACTICE_BLOCK_GW = practice_loop(0, 'gw',
// practice_params_GW, feedback_trouble_go);


const PRACTICE_BLOCK_GW = semi_dyn_practice_loop(0, 'gw',
practice_params_GW, feedback_trouble_go);

//------------------------------------//
// Define practice block #2. NGW
//------------------------------------//

const practice_params_NGW = {
  rune:practice_runes[1],
  scanner_color:scanner_color_win,
  outcome_color:outcome_color_win,
  outcome_sec_color:outcome_color_win,
  outcome_correct:OUTCOMES.WIN,
  outcome_incorrect:OUTCOMES.NO_WIN,
  correct_key: key_nogo,
  valid_responses:[key_go],
  trial_duration:trial_duration,
  feedback_duration:feedback_duration,
  practice_outcomes:practice_b_outcomes.NGW,
  n_pratice:n_practice,

};
// Practice block (GW robot)
// const PRACTICE_BLOCK_NGW = practice_loop(0, 'ngw',
// practice_params_NGW, feedback_trouble_nogo);


const PRACTICE_BLOCK_NGW = semi_dyn_practice_loop(0, 'ngw',
practice_params_NGW, feedback_trouble_nogo);



//------------------------------------//
// Define practice block #3. NGAL
//------------------------------------//

const practice_params_NGAL = {
  rune:practice_runes[2],
  scanner_color:scanner_color_lose,
  outcome_color:outcome_color_lose,
  outcome_sec_color:outcome_color_lose,
  outcome_correct:OUTCOMES.NO_LOSS,
  outcome_incorrect:OUTCOMES.LOSS,
  correct_key: key_nogo,
  valid_responses:[key_go],
  trial_duration:trial_duration,
  feedback_duration:feedback_duration,
  practice_outcomes:practice_b_outcomes.NGAL,
  n_pratice:n_practice,

};
// Practice block (GW robot)
// const PRACTICE_BLOCK_NGAL = practice_loop(0, 'ngal',
// practice_params_NGAL, feedback_trouble_nogo);



const PRACTICE_BLOCK_NGAL = semi_dyn_practice_loop(0, 'ngal',
practice_params_NGAL, feedback_trouble_nogo);



//------------------------------------//
// Define practice block #3. GAL
//------------------------------------//
const practice_params_GAL = {
  rune:practice_runes[3],
  scanner_color:scanner_color_lose,
  outcome_color:outcome_color_lose,
  outcome_sec_color:outcome_color_lose,
  outcome_correct:OUTCOMES.NO_LOSS,
  outcome_incorrect:OUTCOMES.LOSS,
  correct_key: key_go,
  valid_responses:[key_go],
  trial_duration:trial_duration,
  feedback_duration:feedback_duration,
  practice_outcomes:practice_b_outcomes.GAL,
  n_pratice:n_practice,

};
// Practice block (GW robot)
// const PRACTICE_BLOCK_GAL = practice_loop(0, 'gal',
// practice_params_GAL,feedback_trouble_go);



const PRACTICE_BLOCK_GAL = semi_dyn_practice_loop(0, 'gal',
practice_params_GAL, feedback_trouble_go);


//------------------------------------//
// Define comprehension check.
//------------------------------------//

// Initialize comprehension check counters.
var n_quiz_q = 6;

const quiz_1a_node = loop_quiz_node('1a',n_quiz_q,
                      quiz1_prompt_1+question_mark,
                      quiz_options_keys,
                      quiz_options_keys[0],
                      instructions_05b,
                      feedback_err,
                      feedback_pos,
                      0, //tbd audio path
                      max_errors);

const quiz_1b_node = loop_quiz_node('1b',n_quiz_q,
                      quiz1_prompt_2a+`<b><font color=${outcome_color_win}>${instr_color_win} </font></b>, `+quiz1_prompt_2b+question_mark,
                      quiz_options_outcomes,
                      quiz_options_outcomes[0],
                      instructions_27a+`<b><font color=${outcome_color_win}>${instr_color_win}</font></b>,`+
                                instructions_27b+`<b><font color=${outcome_color_win}>`+SAFE+`</font></b>`+
                                instructions_27c,
                      feedback_err,
                      feedback_pos,
                      0, //tbd audio path
                      max_errors);

const quiz_1c_node = loop_quiz_node('1c',n_quiz_q,
                      quiz1_prompt_3a+`<b><font color=${outcome_color_lose}>${instr_color_lose}</font></b>, `+quiz1_prompt_3b+question_mark,
                      quiz_options_outcomes,
                      quiz_options_outcomes[1],
                      instructions_27a+`<b><font color=${outcome_color_lose}>${instr_color_lose}</font></b>,`+
                                  instructions_27b+`<b><font color=${outcome_color_lose}>`+DANGEROUS+`</font></b>`+
                                  instructions_28c,
                      feedback_err,
                      feedback_pos,
                      0, //tbd audio path
                      max_errors);

const quiz_1d_node = loop_quiz_node('1d',n_quiz_q,
                      quiz1_prompt_4_a+`<b><font color=${outcome_color_win}>`+SAFE+`</font></b>`+quiz1_prompt_4_b,
                      quiz_options_true_false,
                      quiz_options_true_false[0],
                      instructions_29c,
                      feedback_err,
                      feedback_pos,
                      0, //tbd audio path
                      max_errors);

const quiz_1e_node = loop_quiz_node('1e',n_quiz_q,
                      quiz1_prompt_5,
                      quiz_options_true_false,
                      quiz_options_true_false[0],
                      instructions_24,
                      feedback_err,
                      feedback_pos,
                      0, //tbd audio path
                      max_errors);

const quiz_1f_node = loop_quiz_node('1f',n_quiz_q,
                      quiz1_prompt_7 +`<b><font color=${outcome_color_win}>`+SAFE+`</font></b>`,
                      quiz_options_true_false,
                      quiz_options_true_false[1],
                      instructions_30c,
                      feedback_err,
                      feedback_pos,
                      0, //tbd audio path
                      max_errors);
var QUIZ = {
  timeline: [
    quiz_1a_node,
    quiz_1b_node,
    quiz_1c_node,
    quiz_1d_node,
    quiz_1e_node,
    quiz_1f_node
  ],
}


//------------------------------------//
// Define instructions block.
//------------------------------------//


var INSTRUCTIONS = {
  timeline: [
    INSTRUCTIONS_01A,
    INSTRUCTIONS_SPACE_G,
    PRACTICE_BLOCK_G, 
    INSTRUCTIONS_01B,
    INSTRUCTIONS_SPACE_NG,
    PRACTICE_BLOCK_NG,
    INSTRUCTIONS_01C,
    INSTRUCTIONS_SPACE_GW,
    PRACTICE_BLOCK_GW, 
    INSTRUCTIONS_02A,
    INSTRUCTIONS_SPACE_NGW,
    PRACTICE_BLOCK_NGW, 
    INSTRUCTIONS_03A,
    INSTRUCTIONS_SPACE_NGAL,
    PRACTICE_BLOCK_NGAL, 
    INSTRUCTIONS_04A,
    INSTRUCTIONS_SPACE_GAL,
    PRACTICE_BLOCK_GAL, 
    INSTRUCTIONS_05A,
    INSTRUCTIONS_06A,
    QUIZ

  ],

}
