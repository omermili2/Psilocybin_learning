/*
* RATING SCALES: Expectancy and Affective Ratings
*
* - Defining the affective and expectancy rating scale variables
* - Defining the sequence for when expectancy ratings are presented:
*   CURRENT DESIGN: on average, every FOUR trials; 
*   with one before trial #1 and the next at trial #4
* - Custom plugins located in: 
*    app/static/lib/jsPsych/plugins/custom/
*     - jspsych-affective-rating.js
*     - jspsych-expectancy-rating.js
*/

// practice expectancy rating
// expectancy rating default shows both CS images
const practiceExpectancy = {
  type: jsPsychExpectancyRating,
  imageCSminus: stim, // candle
  prompt: "מה הסיכוי לדעתכם שאחרי הציור הזה יושמע קול?",
  background_colour: "White",
  font_colour: "Black",
};

// expectancy rating default shows both CS images
const expectancyRating = {
  type: jsPsychExpectancyRating,
  imageCSminus: csMinus, // candle
  imageCSplus: csPlus, // moon
  prompt: "מה הסיכוי לדעתכם שאחרי הציור הזה תושמע צעקה מפחידה?"
};

// define the array for when the expectancy rating is presented
const expectancyAcqA = [ // 4 (1 pushed at beginning of phase)
  0, 0, 0, 1, 0,
  0, 1, 0, 0, 1,
  0, 1, 0
];

const expectancyAcqB = [ // 5
  0, 0, 0, 1, 0,
  0, 1, 1, 0, 1,
  0, 0, 1
];

const expectancyExtA = [ // 3
  0, 0, 0, 1,
  0, 0, 0, 1,
  1, 0, 
];

const expectancyExtB = [ // 3
  0, 0, 0, 1,
  0, 1, 0, 1,
  0, 0,  
];

const expectancyRec = [ // every 4
  0, 0, 0, 1,
  0, 0, 0, 1, 
];

const expectancyRelA = [ // every 4
  0, 0, 0, 1,
  0, 0, 0, 1,
  0, 0 
];

const expectancyRelB = [ // every 4
  0, 1, 0, 0,
  0, 1, 0, 0,
  0, 1 
];


// affective rating you need to specify which image

const practiceAffectiveRating = {
  type: jsPsychAffectiveRating,
  CSimage: stim, // orange image
  background_colour: "White",
  font_colour: "Black",
};

const csPlusAffectiveRating = {
  type: jsPsychAffectiveRating,
  CSimage: csPlus, // moon image
};

const csMinusAffectiveRating = {
  type: jsPsychAffectiveRating,
  CSimage: csMinus, // candle image
};

const csPlusMinusOrder = {
  timeline: [
    csPlusAffectiveRating,
    csMinusAffectiveRating,
  ]
}

const csMinusPlusOrder = {
  timeline: [
    csMinusAffectiveRating,
    csPlusAffectiveRating
  ]
}