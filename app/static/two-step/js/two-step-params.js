

//---------------------------------------//
// Define instructions parameters
//---------------------------------------//

// Define comprehension thresholds.
const max_errors = 0;
const max_loops = 3;

// instructions parameters
const n_practice_choose_alien = 5; // if n_practice_min correct trials reached, move on.
const n_practice_get_outcome = 10; // if n_practice_min correct trials reached, move on.
const n_practice_choose_2_aliens = 10;
const n_practice_both_steps = 10;

const n_practice_blocks = 4; // if n_practice_min correct trials reached, move on.

const n_err = 3; // if n_practice_max incorrect trials reached, load help


const practice_alien_outcomes = [[1,1], [1,0], [0,1], [0,1], [0,1], [0,1], [1,1], [0,0], [0,1], [0,1]];
// const practice_2_outcomes = [[0,1], [1,0], [0,1], [0,1], [0,1], [0,1], [1,1], [0,0], [0,1], [0,1]];


// const one_alien_good_outcomes = Array(n_practice_get_outcome).
//                                 fill(1).
//                                 map(x => (Math.random() < 0.8  ? 1 :0));

const one_alien_good_outcomes = [1,1,1,1,0,1,0,1,1,1];

one_alien_good_outcomes[0] = 1; //start with Reward

//make sure not all outcomes are rewards
if (one_alien_good_outcomes.includes(0) == false){
  one_alien_good_outcomes[n_practice_get_outcome/2] = 0;
}

const trial_keys = ['1', '0']

// instructions navigatin keys
var next_key = 'ArrowLeft';
var previous_key = 'ArrowRight';
//---------------------------------------//
// Define experiment parameters.
//---------------------------------------//

// Define transition probabilities.
const trans_probs  = [0.7, 0.3];         // [common, uncommon]
const trans_bounds = [0.6, 0.8];         // bounds around common

// Define timing parameters.
const choice_duration = 3000;
const feedback_duration = 1200;

// Define randomization parameters.
const randomize_s1 = false;            // randomize left/right position of state 1 bandits
const randomize_s2 = false;            // randomize left/right position of state 2 bandits

// Define quality assurance parameters.
var missed_threshold = 6;
var missed_responses = 0;

//---------------------------------------//
// Define stimulus features.
//---------------------------------------//
// The indices of the rocket and planet colors are mapped.
// That is, the first rocket will lead to the first planet
// under the common transition.

// Define stimulus constants.
const planet_colors = ['#5b7c65','#706081','#7f5d5d','#5f6f81'];
const rocket_colors = ['#48a782','#955db9','#a75248','#486ea7'];
const font_colors = ['#398667','#754198','#aa5349','#416598'];
const color_names = ['green','purple','red','blue'];

const static_aliens = [1,2,3,4].map(function (i) {
  return '../static/two-step/img/aliens_svg/P'+i+'-'+color_names[i]+'.svg';
});

// Define stimulus assignments.

// Define task stimuli.
const task_info = {
  planet_colors: mapping.slice(0,2).map(function(i) {return planet_colors[i]} ),
  font_colors: mapping.map(function(i) {return font_colors[i]} ),
  planet_names: mapping.slice(0,2).map(function(i) {return color_names[i]} ),
  planet_names_text: mapping.slice(0,2).map(function(i) {return color_text[i]} ),
  rocket_colors: mapping.slice(2,4).map(function(i) {return rocket_colors[i]} ),
  rocket_names: mapping.slice(2,4).map(function(i) {return color_names[i]} ),
  rocket_names_text: mapping.slice(2,4).map(function(i) {return color_text[i]} ),

  aliens: jsPsych.randomization.shuffle([1,2,3,4]).map((j,i) => {
    return '../static/two-step/img/aliens_svg/A'+j+'-'+color_names[mapping[i<2?0:1]]+'.svg'
  })
}

// Define practice stimuli.
const practice_info = {
  planet_colors: mapping.slice(2,4).map(function(i) {return planet_colors[i]} ),
  font_colors: mapping.map(function(i) {return font_colors[i]} ),
  planet_names: mapping.slice(2,4).map(function(i) {return color_names[i]} ),
  planet_names_text: mapping.slice(2,4).map(function(i) {return color_text[i]} ),
  rocket_colors: mapping.slice(0,2).map(function(i) {return rocket_colors[i]} ),
  rocket_names: mapping.slice(0,2).map(function(i) {return color_names[i]} ),
  rocket_names_text: mapping.slice(0,2).map(function(i) {return color_text[i]} ),
  aliens: jsPsych.randomization.shuffle([1,2,3,4]).map((j,i) => {
    return '../static/two-step/img/aliens_svg/P'+j+'-'+color_names[mapping[i<2?2:3]]+'.svg'
  })
}


// Define images to preload.
const preload_images = task_info['aliens'].concat(practice_info['aliens']);
const audio_files = ['../static/pgng/audio/coutndown1.mp3'];
//---------------------------------------//
// Define reward outcomes.
//---------------------------------------//

// Randomly choose the drifting outcome probabilities for the task.
// Drifts are chosen from a standalone file pre-generated Gaussian random walks.
const drift_ix = jsPsych.randomization.sampleWithoutReplacement([0,1,2,3], 1)[0];
const drifts = [drifts_01, drifts_02, drifts_03, drifts_04][drift_ix];

// Define outcomes.
// Evaluate outcomes to define the trial-by-trial outcomes for each bandit.
const outcomes = [];
for (let i=0; i<drifts.length; i++) {
  outcomes.push( drifts[i].map(p => Math.random() < p ? 1 : 0) )
}

//---------------------------------------//
// Define transition probabilities.
//---------------------------------------//
// Generate the trial-by-trial state transitions (common or uncommon) using
// the transition probabilities defined above. The while loop ensures that
// the sequence contains a fraction of common transitions within bounds.

while (true) {

  // Generate transition events.
  var transitions = jsPsych.randomization.sampleWithReplacement([1,0], drifts.length, trans_probs);

  // Compute average.
  const avg = transitions.reduce(function(a,b){return a+b}, 0) / transitions.length;

  // Assert average transition probability close to 0.7.
  if (avg > trans_bounds[0] && avg < trans_bounds[1]) { break; }

}
