
//------------------------------------//
// Define instruction #1.
//------------------------------------//


INSTRUCTIONS1 = {
  type: jsPsychMRSTInstructions,

  pages: [

    {
      prompt:instructions01,
    },
    {
      prompt:instructions02,
      show_cards: true,
      stimulus:PRACTICE_INFO.img[0],
      card_color:PRACTICE_INFO.colors[0],
      // audio:'../static/mrst/audio/coutndown1.mp3',
      // view_duration: 1000,

    },
    {
      prompt:instructions03,
      show_cards: true,
      stimulus:PRACTICE_INFO.img[0],
      card_color:PRACTICE_INFO.colors[0],
      choice: 0,
    },
    {
      prompt:instructions04,
      show_cards: true,
      stimulus:PRACTICE_INFO.img[0],
      card_color:PRACTICE_INFO.colors[0],
      choice: 1,
    },
    {
      prompt:instructions05a,
      show_cards: true,
      stimulus:PRACTICE_INFO.img[0],
      card_color:PRACTICE_INFO.colors[0],
      choice: 1,
      card_points: high_card_points,
      face: 'up',
      stimulus:'',
    },
    {
      prompt:instructions05b,
      show_cards: true,
      stimulus:PRACTICE_INFO.img[0],
      card_color:PRACTICE_INFO.colors[0],
      choice: 1,
      card_points: low_card_points,
      face: 'up',
      stimulus:'',
    },
    {
      prompt:instructions06,
      show_cards: true,
      stimulus:PRACTICE_INFO.img[0],
      card_color:PRACTICE_INFO.colors[0],
    },
    {
      prompt:instructions07a,
      img: '../static/mrst/img/instructions/all_cards.png',
    },
    {
      prompt:instructions07b1,
      // img: '../static/mrst/img/instructions/all_cards.png',
    },
    {
      prompt:instructions07b2,
      // img: '../static/mrst/img/instructions/all_cards.png',
    },
    {
      prompt:instructions08,
    },
    {
      prompt:instructions09,
    },
    // {
    //  prompt:instructions10,
    // },
    {
      prompt:instructions11a,
      show_cards: true,
      stimulus:PRACTICE_INFO.img[0],
      card_color:PRACTICE_INFO.colors[0],
    },
    {
      prompt:instructions11b,
      show_cards: true,
      stimulus:PRACTICE_INFO.img[0],
      card_color:PRACTICE_INFO.colors[0],
    }

  ],
    key_forward:next_key,
    key_backward:previous_key,
    button_labels:[previous_label, next_label],
    left_to_right:reading_dir_left_to_right,
    on_start: function(){
      jsPsych.setProgressBar(0); 
    }
}



//------------------------------------//
// Define practice #1.
//------------------------------------//

const PRACTICE1  = practice(PRACTICE_INFO.img[0], PRACTICE_INFO.colors[0],
  0, PRACTICE_INFO.outcomes_1,
  [help_00,help_01])

  //------------------------------------//
  // Define instruction #2.
  //------------------------------------//

  const INSTRUCTIONS2 = {
    type: jsPsychMRSTInstructions,
    pages: [
      {
        prompt: instructions12
      },
      {
        prompt: instructions12a
      },
      {
        prompt: instructions13,
        show_cards: true,
        stimulus: PRACTICE_INFO.img[1],
        card_color:PRACTICE_INFO.colors[1],
      },
      {
        prompt: instructions14,
        show_cards: true,
        stimulus: PRACTICE_INFO.img[1],
        card_color:PRACTICE_INFO.colors[1],
      }
    ],
    key_forward:next_key,
    key_backward:previous_key,
    button_labels:[previous_label, next_label],
    left_to_right:reading_dir_left_to_right,
    on_start: function(){
      jsPsych.setProgressBar(0); 
    }
    }


//------------------------------------//
// Define practice #2.
//------------------------------------//


const PRACTICE2  = practice(PRACTICE_INFO.img[1],
                          PRACTICE_INFO.colors[1],
                          1, PRACTICE_INFO.outcomes_2,
                          [help_00,help_01])


//------------------------------------//
// Define instruction #3.
//------------------------------------//


  const INSTRUCTIONS3 = {
    type: jsPsychMRSTInstructions,
    pages: [
      {
        prompt: instructions16,
      },
      {
        prompt: instructions15,
        },
      {
        prompt: instructions17,
      },
      // {
      //   prompt: instructions18,
      // },
      {
        prompt: instructions19,
      },
      {
        prompt: instructions20
      },
      {
        prompt: instructions21,
      },
      {
        prompt: instructions22,
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


//------------------------------------//
// Define comprehension check #1.
//------------------------------------//
var n_quiz_q=4;

const quiz_1a_node = loop_quiz_node('1a',n_quiz_q,
                      comprehension_prompt_1,
                      comprehension_options,
                      comprehension_options[0],
                      comprehension_review_1,
                      feedback_err,
                      feedback_pos,
                      max_errors);


const quiz_1b_node = loop_quiz_node('1b',n_quiz_q,
                      comprehension_prompt_2,
                      comprehension_options,
                      comprehension_options[1],
                      comprehension_review_2,
                      feedback_err,
                      feedback_pos,
                      max_errors);

const quiz_1c_node = loop_quiz_node('1c',n_quiz_q,
                      comprehension_prompt_3,
                      comprehension_options,
                      comprehension_options[0],
                      comprehension_review_3,
                      feedback_err,
                      feedback_pos,
                      max_errors);

const quiz_1d_node = loop_quiz_node('1d',n_quiz_q,
                      comprehension_prompt_4,
                      comprehension_options,
                      comprehension_options[1],
                      comprehension_review_4,
                      feedback_err,
                      feedback_pos,
                      max_errors);
var QUIZ = {
  timeline: [
    quiz_1a_node,
    quiz_1b_node,
    quiz_1c_node,
    quiz_1d_node
  ],
}


var INSTRUCTIONS = {
  timeline: [
    INSTRUCTIONS1,
    PRACTICE1,
    INSTRUCTIONS2,
    PRACTICE2,
    INSTRUCTIONS3,
    QUIZ,

]}
