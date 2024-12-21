//------------------------------------//
// Define parameters.
//------------------------------------//
const preload_files = ['../static/pgng/audio/coutndown1.mp3']

// Define comprehension thresholds. (quiz)
const max_comp_loops = 6;
const max_errors = 0;

const N_trials = 240;


// for  - G and NG
// **dynamic** instructions parameters
// if 4 out of last 5 orrect, move on. 
// otherwise, cont until 3*N_practice.
// if more than 4 err - help msg

const n_practice = 10;  
const n_err = 4;

// for  - GW, NGW, NGAL, GAL
// help msg half way in more than half of the responses are wrong
// NEW: *dynamic* min 10, stop after 6 correct in a row, or 20.

// OLD : **static** instructions parameters always 10, always in that order of outcomes. 

//0 is correct feedbcak, 1 is incorrect feedback

const practice_a_outcomes = {
  'G':[0,0,0,0,0,1,0,0,0,0],
  'NG':[0,0,0,0,1,0,0,0,0,0]
}


const practice_b_outcomes= {
'GW':  [0,0,0,0,0,1,0,0,0,0], //,0,0,1,0,1,0,0,0,0,0], 
'NGW': [0,0,0,0,1,0,0,0,0,0], //,0,1,0,0,0,0,0,0,0,1],
'NGAL':[0,0,0,0,0,1,0,0,0,0], //,0,0,0,0,1,0,0,0,0,0], 
'GAL': [0,0,0,0,1,0,0,0,0,0] //,1,0,0,0,0,1,0,0,0,0], 
}



//------------------------------------//
// Define experiment parameters.
//------------------------------------//

const OUTCOMES = {
  WIN:'10+',
  NO_WIN:'0',
  LOSS:'10-',
  NO_LOSS:'0'
}

const outcome_prob = 0.8;
const practice_runes = ['1','2','3','4']

const instruction_runes = {
  star:'&#9733',
  flower:'&#10047',
  web:'&#9784',
  infinity:'&#9776;',
  rows:'&#9776;',//tbd
  diamond:'&#9671;', //tbd
  moon:'&#9776;', //tbd

};

const feedback_signals = {
  'check':'&#10004',
  'x':'&#10007',
}


// Define rune sets.
const rune_sets = ['bacs1','bacs2']; //'elianto' removed to avoid enlgish letters
const rune_prob = [0.50, 0.50];

// Define trial structure.
runsheets = jsPsych.randomization.shuffle(runsheets)

// Randomly select rune set.
const rune_set = jsPsych.randomization.sampleWithReplacement(rune_sets, 1, rune_prob)[0];


// robots colors:
// red has been tested and shown no priming no-go effect UNLESS combined with green.
var color0 = {scanner:'#FFFFF080', //WHITE
             outcome:'#FFFFF080'};
var color1 = {name:BLUE,
             scanner:'#3366ff99',
             outcome:'#1a3ea7'};
var color2 = { name:RED,
              scanner:'#f73b6a7A',
              outcome: '#930a25'};
var color3 = {scanner:'#FFFFF080', //BLACK
              outcome: '#000000' };

// Define aesthetics.
if ( Math.random() < 1 ) {
  var instr_color_win    = color1.name;//'blue';
  var scanner_color_win  = color1.scanner;//'#3366ff99';
  var outcome_color_win  = color1.outcome;//'#1a3ea7';
  var instr_color_lose   = color2.name;//'red';
  var scanner_color_lose = color2.scanner;//'#f73b6a7A';
  var outcome_color_lose = color2.outcome;//'#930a25';
} else {
  var instr_color_win    = color2.name;//'red';
  var scanner_color_win  = color2.scanner;//'#f73b6a7A';
  var outcome_color_win  = color2.outcome;//'#930a25';
  var instr_color_lose   = color1.name;//'blue';
  var scanner_color_lose = color1.scanner;//'#3366ff99';
  var outcome_color_lose = color1.outcome;//'#1a3ea7';
}

// Define go key.
const key_go = " ";
const key_nogo = -1;

// Define timings.
const trial_duration = 1300;         // Duration of trial (response phase)
const feedback_duration = 1200;      // Duration of feedback (minimum)

// Define screen size parameters.
var min_width = 500;
var min_height = 450;

//------------------------------------//
// Define rune order.
//------------------------------------//


// Gather rune orders.
if ( rune_set == 'elianto' ) {
  var runes_a = r_01;
  var runes_b = r_02;
} else if ( rune_set == 'bacs1' ) {
  var runes_a = r_03;
  var runes_b = r_04;
} else if ( rune_set == 'bacs2' ) {
  var runes_a = r_05;
  var runes_b = r_06;
}
// Randomize presentation order.
if ( Math.random() < 0.5 ) { runes_a = runes_a.reverse(); }
if ( Math.random() < 0.5 ) { runes_b = runes_b.reverse(); }
var runes = ( Math.random() < 0.5 ) ? [runes_a, runes_b] : [runes_b, runes_a];

