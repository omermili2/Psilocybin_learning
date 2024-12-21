/*
TASK DESIGN
- stimuli + audio file paths
- Acquisition+Extinction, and Recovery+Relearning trial + reinforcement sequence
*/

/* Note: CS- and non-reinforced trials do not have sounds in this version */

// Audio Stimuli


// aversive - screams
const aversive1 = "../static/fctask_shared/audio/fctask-shared/scream1-2s.mp3";
const aversive2 = "../static/fctask_shared/audio/fctask-shared/scream2-2s.mp3";
const aversive3 = "../static/fctask_shared/audio/fctask-shared/scream3-2s.mp3";

const neutral = null;

// Visual Stimuli
const csPlus = "../static/fctask_shared/images/fctask-shared/moon-stimuli.png"; // moon
const csMinus = "../static/fctask_shared/images/fctask-shared/candle-stimuli.png"; // candle

// Practice Stimuli
const stim = "../static/fctask_shared/images/fctask-shared/csOrange.png";
const ambient = "../static/fctask_shared/audio/fctask-shared/neutral1.mp3";

// Practice Block audio sequence
const practiceAudio = [
  neutral, neutral, ambient, ambient, ambient, neutral
]

// Number of blocks and block design
let blocks = 2;
let nTrialsBlock = 13;

/*
Acquisition Blocks
- 26 total
- 16 CS+ of which 8 are reinforced and 10 CS- during acquisition
- 2 blocks: 8 CS+ (4 reinforced), 5 CS-
*/

// Acquisition Block 1
const acqOneImage = [ // 8 CS+ moon (4 reinforced), 5 CS- candle
  csMinus,
  csPlus, 
  csMinus, 
  csPlus, 
  csPlus, 
  csMinus,
  csPlus, 
  csPlus, 
  csPlus, 
  csMinus, 
  csPlus,
  csMinus,
  csPlus
];

const acqOneAudio = [ // CS+ (moon) is reinforced 4 times
  neutral,       // csMinus,
  neutral,       // csPlus, 
  neutral,       // csMinus, 
  aversive1,  // csPlus, 
  aversive2,  // csPlus, 
  neutral,       // csMinus,
  neutral,       // csPlus, 
  neutral,       // csPlus, 
  neutral,       // csPlus, 
  neutral,       // csMinus, 
  aversive3,  // csPlus,
  neutral,       // csMinus,
  aversive2,  // csPlus
];

// Acquisition Block 2
const acqTwoImage = [ // 8 CS+ moon (4 reinforced), 5 CS- candle
csPlus,
csMinus, 
csMinus, 
csPlus, 
csPlus, 
csMinus,
csPlus, 
csPlus, 
csPlus, 
csMinus, 
csPlus,
csMinus,
csPlus
];

const acqTwoAudio = [ // CS+ (moon) is reinforced 50/50
  aversive1,  // csPlus,
  neutral,       // csMinus, 
  neutral,       // csMinus, 
  aversive2,  // csPlus, 
  neutral,       // csPlus, 
  neutral,       // csMinus,
  neutral,       // csPlus, 
  aversive3,  // csPlus, 
  neutral,       // csPlus, 
  neutral,       // csMinus, 
  aversive1,  // csPlus,
  neutral,       // csMinus,
  neutral,       // csPlus
];


/*
Extinction Blocks
- three blocks of 10 trials each
- array of image stimuli
- 4 CS-, 6 CS+
- 0% reinforced
*/

const extinctionOne = [ // 4 CS- (candle), 6 CS+ (moon)
  csPlus, 
  csMinus, 
  csPlus, 
  csPlus, 
  csMinus,
  csPlus, 
  csMinus, 
  csPlus, 
  csMinus, 
  csPlus
];


const extinctionTwo = [ // 4 CS- (candle), 6 CS+ (moon)
  csPlus, 
  csMinus, 
  csMinus, 
  csPlus, 
  csMinus, 
  csPlus, 
  csPlus, 
  csMinus, 
  csPlus,
  csPlus 
];

const extinctionThree = [ // 4 CS- (candle), 6 CS+ (moon)
  csMinus, 
  csPlus, 
  csPlus, 
  csMinus, 
  csMinus,
  csPlus, 
  csMinus, 
  csPlus, 
  csPlus, 
  csPlus   
];

/*
Recovery Blocks
- two blocks of 8 trials each (16 trials total)
- array of image stimuli
- 3 CS-, 5 CS+
- 0% reinforced
*/


const recoveryOne = [ // 3 CS- (candle), 5 CS+ (moon)
  csMinus, 
  csPlus, 
  csMinus, 
  csPlus, 
  csPlus,
  csPlus, 
  csMinus, 
  csPlus
];


const recoveryTwo = [ // 3 CS- (candle), 5 CS+ (moon)
  csPlus, 
  csPlus, 
  csMinus, 
  csPlus, 
  csMinus, 
  csPlus, 
  csPlus, 
  csMinus
];

/*
Relearning Blocks
- 12 CS+ with 6 reinforced trials and 8 CS- trials in relearning
- 2 blocks of 10 trials each (20 trials total)
- 4 CS-, 6 CS+
*/

// Relearn Block 1
const relearnOne = [ // 4 CS- (candle), 6 CS+ (moon)
  csPlus,
  csMinus, 
  csPlus,
  csMinus,  
  csPlus, 
  csMinus,
  csPlus, 
  csPlus,
  csMinus, 
  csPlus
];

const relearnOneAudio = [ // CS+ (moon) is reinforced 3
  neutral,     // csPlus,
  neutral,     // csMinus, 
  aversive2, // csPlus, 
  neutral,     // csMinus, 
  aversive3, // csPlus, 
  neutral,     // csMinus,
  neutral,     // csPlus, 
  neutral,     // csPlus,
  neutral,     // csMinus, 
  aversive1, // csPlus
];

// Relearn Block 2
const relearnTwo = [ // 4 CS- (candle), 6 CS+ (moon)
  csMinus,
  csPlus, 
  csMinus, 
  csPlus, 
  csPlus, 
  csMinus,
  csPlus, 
  csPlus,
  csMinus, 
  csPlus
];

const relearnTwoAudio = [ // CS+ (moon) is reinforced 3
  neutral,     // csMinus,
  aversive3, // csPlus, 
  neutral,     // csMinus, 
  neutral,     // csPlus, 
  aversive1, // csPlus, 
  neutral,     // csMinus,
  neutral,     // csMinus, 
  neutral,     // csPlus,
  aversive2, // csPlus, 
  neutral,     // csPlus
  ];

