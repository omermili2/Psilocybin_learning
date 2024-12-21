//---------------------------------------//
// Define parameters.
//---------------------------------------//

// blocks

const N_pseudo_blocks = 5;
const N_block_sequences = 16; 
const N_bandits = 3;

const N_trials =  N_pseudo_blocks*N_block_sequences*N_bandits ;
const N_trials_first_part = N_block_sequences*N_bandits*3;

var face_up_points = 5
var high_card_points = 10
var low_card_points = 0

// Define bandit parameters.
const probs  = [0.20, 0.50, 0.80];//[0.20, 0.35, 0.50, 0.50, 0.65, 0.80];

// Define response parameters.
const valid_responses = ['arrowleft', 'arrowright'];

// Define trial timings.
const choice_duration = 4000;
const confirmation_duration = 450;
const feedback_duration = 1300;


const card_position_randomization = 0.5;

const trial_keys = ['0', '1'];
//---------------------------------------//
// Define stimuli.
//---------------------------------------//

// Define card colors.
var orderedArray = [0,1,2,3,4];

var order = jsPsych.randomization.repeat(orderedArray, 1);

var colors =jsPsych.randomization.shuffle([
  jsPsych.randomization.shuffle(['#387da2','#993333','#b19e3c']),
  jsPsych.randomization.shuffle(['#245169','#732626','#8b7c2f']),
  jsPsych.randomization.shuffle(['#538348','#bc6d2f','#6a4173']),
  jsPsych.randomization.shuffle(['#b0783f','#081363','#750606']),
  jsPsych.randomization.shuffle(['#3e6236','#a15417','#4c2f52']),
]);


// Define card suits.

var stimuli = jsPsych.randomization.shuffle([
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/bird-crane-shape.svg',
    '../static/mrst/img/animals/deer-silhouette.svg',
    '../static/mrst/img/animals/seahorse-silhouette.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/fish-shape-of-dragonet.svg', 
    '../static/mrst/img/animals/kangaroo-shape.svg',
    '../static/mrst/img/animals/parrot-shape.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/bear-black-shape.svg',
    '../static/mrst/img/animals/bird-shape.svg',
    '../static/mrst/img/animals/fish-batfish-shape.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/dolphin-mammal-animal-silhouette.svg',
    '../static/mrst/img/animals/moose-shape.svg',
    '../static/mrst/img/animals/swift-bird-shape.svg'
  ]),
  jsPsych.randomization.shuffle([
    '../static/mrst/img/animals/gazelle-running-silhouette.svg',
    '../static/mrst/img/animals/bird-waterfowl-shape.svg',
    '../static/mrst/img/animals/fish-of-triangular-shape.svg'
  ])
])


//------------------------------------//
// Define instructions params.
//------------------------------------//

// ****static**** 
// always rabbit and horse
// always 8, always in that order of outcomes. 
// help msg half way in more than half of the responses are wrong

var PRACTICE_INFO={
  colors: ["#3d85c690", "#6aa84f91", ],
  img:["../static/mrst/img/animals/rabbit-shape.svg",
      "../static/mrst/img/animals/horse-black-shape.svg",
    ],
  face_up_points : 5,
  face_down_points_prob:[.85,.15],
  outcomes_1:[10,0,10,10,10,0,10,10],
  outcomes_2:[0,0,10,0,0,0,10,0],

}

// Define comprehension thresholds. (for quiz)
const max_errors = 0;
const max_loops = 6;

// Define screen size parameters.
var min_width = 480;
var min_height = 295;

// // Define quality assurance parameters.
// var missed_threshold = 12;
// var missed_responses = 0;
// var fast_threshold = 20;
// var fast_responses = 0;

// Define images to preload.
const preload_images = [

  "../static/mrst/img/instructions/instructions02.png",
  "../static/mrst/img/instructions/instructions03.png",
  "../static/mrst/img/instructions/instructions05.png",
  "../static/mrst/img/instructions/instructions06.png",
  stimuli.flat()

];

const preload_audio = ['../static/pgng/audio/coutndown1.mp3']

// Define image scaling CSS.
const style = "width:auto; height:auto; max-width:100%; max-height:450px;";
