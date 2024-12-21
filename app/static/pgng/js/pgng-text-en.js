//////// OUTDATED //////////
// //colors must be determined to display in the text
//
var continue_label = 'Continue';
//
var next_label = 'Next'; // Next button label
//
var previous_label = 'Prev'; // Previous button label

var reading_dir_left_to_right = true

var BLUE = `blue`
var RED = `red`

var OUTCOMES_TEXT ={
  WIN:'+10',
  NO_WIN:'+1',
  LOSS:'-10',
  NO_LOSS:'-1'
}
//---------------------------------------//
// Define langugae parameters.
//---------------------------------------//

var next_key = 'ArrowRight';

var previous_key = 'ArrowLeft';


var SAFE =[` SAFE `];
var DANGEROUS =[` DANGEROUS `];


var instructions_00 = [`Welcome to the <b>Robot Factory</b> game!`];

var instructions_01 = [`In this game, you will be inspecting robots as they move down the assembly line into the <b>scanner</b>.`];

var instructions_02 = [`Sometimes a robot in the factory will need repair.<br>How often a robot will need repair <b>depends on its type.</b>`];

var instructions_03 = [`There are many different types of robots. Each type of robot<br>can be identified by the <b>unique symbol</b> on its chestplate.`];

var instructions_04 = [`When a robot enters the scanner, you must decide whether to:<br><b>Repair</b> the robot (press SPACE) <br><b>Ignore</b> the robot (do nothing)`];

var instructions_05 = [`You will earn the most points by fixing robots that need repair and ignoring robots that do not.`];


var instructions_06_a =[`Importantly, how many points you can win or lose depends<br>on whether the robot is `];
var instructions_06_c =[`or`];



var instructions_07_a = [`If the scanner is `];
var instructions_07_b = [`the robot is `];
var instructions_07_d = [`You will earn ${OUTCOMES_TEXT.WIN} points for correctly repairing or ignoring<br>a safe robot. You will earn only ${OUTCOMES_TEXT.NO_WIN} point for incorrect actions.`];

var instructions_08 = [`Now let's practice with a safe robot. Try to learn if<br>you should repair (press SPACE) or ignore it (do nothing).<br><b>Remember:</b> you will earn ${OUTCOMES_TEXT.WIN} points for the correct action.`];

var instructions_09 = [`<b>HINT:</b> Only press once the robot is in the scanner<br>and the scanner light comes on.`];


var instructions_10 = [`Now let's practice for another type of safe robot.<br>Try to learn if you should repair this robot (press SPACE)<br>or ignore it (do nothing).`];

var instructions_11 = [`<b>Remember:</b> not every robot will need repair, and<br>you will earn ${OUTCOMES_TEXT.WIN} points for the correct action.`];

var instructions_12_a = [`If the scanner is `];

var instructions_12_b = [`the robot is`];

var instructions_12_d = [`You will lose only ${OUTCOMES_TEXT.NO_LOSS} point for correctly repairing or ignoring<br>a dangeorus robot. You will lose ${OUTCOMES_TEXT.LOSS} points for incorrect actions.`];

var instructions_13 = [`Now let's practice for a dangerous robot. Try to learn if<br>you should repair it (press SPACE) or ignore it (do nothing).<br><b>Remember:</b> you will lose only ${OUTCOMES_TEXT.NO_LOSS} points for the correct action.`];

var instructions_14 = [`Now let's practice for another type of dangerous robot.<br>Try to learn if you should repair this robot (press SPACE)<br>or ignore it (do nothing).`];

var instructions_15 = [`<b>Remember:</b> some dangerous robots need repair, and<br>you will lose only ${OUTCOMES_TEXT.NO_LOSS} points for the correct action.`];

var instructions_16 = [`Great job! We're almost ready to begin the game.`];

var instructions_17 = [`<b>Remember:</b> Not all robots of the same type will need repair, but<br>some types of robots will need repair more often than others.`];

var instructions_18 = [`Pay close attention to the robot's symbol as it will help you<br>decide whether to repair the robot (press SPACE)<br>or ignore the robot (do nothing).`];

var instructions_19 = [`Try to earn, and avoid losing, as many points as you can.`];

// var instructions_20 = [`At the end of the task, the total number of points you've<br>earned will be converted into a <b>performance bonus.</b>`];

var instructions_21 =  [`Next, we will ask you some questions about the task.`];


// // quiz 1
var quiz1_prompt_1 = `To <b>repair</b> a robot, what do you do?`;
var quiz1_prompt_2a = `When the scanner light is `
var quiz1_prompt_2b = `how many points will you earn for a correct action?`
var quiz1_prompt_3a = `When the scanner light is `
var quiz1_prompt_3b = `how many points will you earn for a correct action?`
var quiz1_prompt_4 = `<i>True</i> or <i>False</i>: Some robots will need repair more often than others.`;
var quiz1_prompt_5 = `<i>True</i> or <i>False</i>: The points I earn will affect my performance bonus.`


var quiz_options_keys = [`Press SPACE`, `Do nothing`, `Press ENTER`];
var quiz_options_outcomes = [OUTCOMES_TEXT.WIN, OUTCOMES_TEXT.NO_WIN,
                        OUTCOMES_TEXT.NO_LOSS, UTCOMES_TEXT.LOSS];
var quiz_options_true_false = [`True`, `False`];




var instructions_22 = [`<p>You did not answer all of the quiz questions correctly.</p><p>Please review the following instructions carefully.`];
var instructions_23 = [`When a robot enters the scanner, you must decide whether to:<br><b>Repair</b> the robot (press SPACE) <br><b>Ignore</b> the robot (do nothing)`];
var instructions_24 = [`<b>Remember:</b> Not all robots of the same type will need repair, but<br>some types of robots will need repair more often than others.`];
var instructions_25 = [`You will earn the most points by fixing robots that need repair and ignoring robots that do not.`];

var instructions_26a =[`Importantly, how many points you can win or lose depends<br>on whether the robot is`];
var instructions_26c =[` or `]

var instructions_27a = [`If the scanner is `];
var instructions_27b = [`the robot is `];

var instructions_27c = [`You will earn ${OUTCOMES_TEXT.WIN} points for correctly repairing or ignoring<br>a safe robot. You will earn only ${OUTCOMES_TEXT.NO_WIN} point for incorrect actions.`];
var instructions_28c = [`You will lose only ${OUTCOMES_TEXT.NO_LOSS} point for correctly repairing or ignoring<br>a dangeorus robot. You will lose ${OUTCOMES_TEXT.LOSS} points for incorrect actions`];

var ready_00 = [`Great job! You've passed the comprehension check.`];
var ready_01 = [`Get ready to begin the game.<br>Press next when you're ready to start.`];

var quiz_00 = [`To continue, please answer the questions below:`];

var feedback_trouble_go = [`Seems like you're having trouble.`,];
var feedback_tryagain_go = [`Try repairing this robot (press SPACE).<br>For a safe robot, you will earn ${OUTCOMES_TEXT.WIN} points<br>if you make the correct action.`];

var feedback_trouble_nogo = [`Seems like you're having trouble.<br>Remember, not every robot will need repair.`];
var feedback_tryagain_nogo = [`Try ignoring this robot (do nothing).<br>For a safe robot, you will earn ${OUTCOMES_TEXT.WIN} points<br>if you make the correct action.`]
