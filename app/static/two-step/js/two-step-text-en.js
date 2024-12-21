//
// //colors must be determined to display in the text
//
var continue_label = 'Continue';
//
var next_label = 'Next'; // Next button label
//
var previous_label = 'Prev'; // Previous button label

var reading_dir_left_to_right = true

//---------------------------------------//
// Define langugae parameters.
//---------------------------------------//

var next_key = 'ArrowRight';

var previous_key = 'ArrowLeft';

const color_text = ['green','purple','red','blue'];

var quiz_00 = ["To continue, please answer the questions below:"];


var instructions_00_a = ["<p>We are now beginning the <b>Space Treasure</b> game.</p><p>Use the buttons below, or your keyboard arrow keys, to<br>navigate the instructions.</p>"]

var instructions_00_b = ["<p>The instructions are broken into three short parts.</p><p>There will be a <b>quiz</b> at the end of each part, so please read carefully.</p>"]

var instructions_01 = ["In the <b>Space Treasure</b> game, you will be looking for treasure in outer space."];

var instructions_02 = ["You can look for treasure on two different planets."];

var instructions_03 = ["Each planet has two aliens that live there. When you ask an alien for treasure, it will either give you treasure or give you rocks."];

var instructions_04 = ["This is what treasure will look like!"];

var instructions_05 = ["This is what rocks will look like."];

var instructions_06 = ["How often each alien gives you treasure changes slowly over time."];

var instructions_07 = ["Since each alien is changing how often it gives you treasure, you will have to pay attention to which alien is most likely to give you treasure right now."];

var instructions_08 = ["<b>Your goal is to find out which alien is most likely to give you treasure at the moment.</b><br><br><b>Hint:</b> The aliens might change sides, but it does not matter what side the alien is standing on when you ask it."];
//
var instructions_09 = ["We will practice asking these two aliens for treasure. You can ask the alien on the left by pressing the LEFT ARROW KEY. You can ask the alien on the right by pressing the RIGHT ARROW KEY. <br><br>Press the next button to start practicing!"];

var instructions_14 = ["Before you can ask an alien for some treasure, you will first need to travel to their planet!"];

var instructions_15 = ["To visit a planet, you will pick a rocketship to travel on. <br><br>Each rocketship has a planet it goes to most of the time. Sometimes (though rarely), it will fly to the other planet."];

var instructions_16 = ["If you want to travel to a certain planet, you should pick<br>the rocket ship that is most likely to take you there."];

var instructions_17 = ["To choose a rocket ship to travel on, you will use the</p><p><b>left/right arrow keys</b> on your keyboard"];

var instructions_18 = ["Now we can practice the whole game. You will first choose which rocketship to take. Once you make it to a planet, there will be two aliens. You can only ask one alien for treasure per trip."];

var instructions_19 = ["<b>Remember:</b> a rocket ship will fly mostly to one planet,</p><p>but sometimes it'll take you to the other planet!"];

var instructions_20 =  ["<b>Hint:</b> The rockets will sometimes switch the side of the screen<br>they are on. The side a rocket appears on does not change<br>how likely it is to go to a planet."];

// var instructions_21 = ["At the end of the game, the total amount of treasure you've collected</p><p>will be converted into a <b>performance bonus</b>"];

var instructions_22 = ["Your goal is to try and collect as much treasure as you can!"];

var instructions_23 = ["Here are some helpful hints for treasure hunting with the aliens. Please read each hint carefully."];

var instructions_24 = ["<b>Hint 1:</b> Aliens slowly change how often they give you treasure. So if an alien is giving lots of treasure right now, it will probably keep giving treasure often for a while. If an alien is not giving much treasure right now, it will probably not give you much treasure for a while."];
//
var instructions_25 = ["<b>Hint 2:</b> If one alien is not giving much treasure, that does not mean the other one is giving more treasure. There are no patterns like giving you treasure every other time."];
//

var instructions_26 = ["<p>Great job! You've finished the instructions.</p><p>We'll get started with the real game now.</p>"];
var instructions_27 = ["<p>In the real game, you will see new planets, aliens, and rocket ships.</p><p>However, the rules of the game <b>have not changed</b>.</p>"];
var instructions_28 = ["Get ready to begin <b>Block 1/2</b>. It will take ~8 minutes.<br>Press 'Next' when you're ready to start."];

//
var block_end = ["Take a break! Press 'Next' when you are ready to continue."];

var instructions_29 = ["Get ready to begin <b>Block 2/2</b>. It will take ~8 minutes.<br>Press 'Next' when you're ready to start."];

var game_end = ["<p>Great job! You've finished the task."];
var game_end_pre_survey = ["Before you finish, we have a couple of short questions for you.</p>"];

// var exp_end = ["Exp end test text."];

//***********

// quiz 1
var quiz1_prompt_1 = "To choose an alien to trade with, which keys do you use?";
var quiz1_prompt_2 = "<i>True</i> or <i>False</i>:&nbsp;Your goal is to figure out which aliens are most likely to give treasure.";
var quiz1_prompt_3 = "<i>True</i> or <i>False</i>:&nbsp;Some aliens may be more likely to give me treasue than others.";

// quiz 2
var quiz2_prompt_1 = "To choose a rocket ship to travel on, which keys do you use?";
var quiz2_prompt_2 = "<i>True</i> or <i>False</i>:&nbsp;&nbsp;Rocket ships will always travel to the same planets.";
var quiz2_prompt_3 = "<i>True</i> or <i>False</i>:&nbsp;&nbsp;Each rocket ship has a planet it will travel to most of the time.";

// quiz 3
var quiz3_prompt_1 = "<i>True</i> or <i>False</i>:&nbsp;&nbsp;How likely an alien is to give you treasure changes slowly over time.";
var quiz3_prompt_2 = "<i>True</i> or <i>False</i>:&nbsp;&nbsp;How likely an alien is to give you treasure depends on the rocket ship you choose.";
var quiz3_prompt_3 = "<i>True</i> or <i>False</i>:&nbsp;&nbsp;The treasure you earn will affect your performance bonus.";

// quiz 4
var quiz4_prompt_part_a = "Which rocket ship went mostly to the";
var quiz4_prompt_part_b = "planet?"



var quiz_options_keys = ["a/d keys", "1/0 keys", "left/right arrow keys"];
var quiz_options_true_false = ["True", "False"];


var feedback_alien_practice = ["Great job! You figured out which alien was more likely to give you treasure (even though it may not have given you treasure every time)"]
var feedback_almost_done = ["<p>Good job! We are almost finished with the instructions.</p><p>Before we start the real game, here are some final details.</p>"];


var feedback_err = ["You did not answer all of the quiz questions correctly.</p><p>Please review the following instructions carefully"]
var feedback_trouble = ["Seems like you're having trouble.</p><p>Remember, you are trying to find the alien that  gives you treasure<br><b>most of the time</b>"]
var feedback_tryagain = ["Let's try again.</p><p>On the next screen, use the <b>left/right arrow keys</b> on your keyboard to choose an alien to trade with. You will have 10 more chances to figure out which alien is more likely to give you treasure."]

var timeouterr = ["<p>לא בחרתם בקלף והזמן אזל. אנא נסו לבחור קלף יותר מהר בתור הבא. שימו לב, אם תפספסו יותר מדי תורות, לא נוכל להמשיך את המשחק </p>"]

var early_end_game =["<p> Early termination </p>"];
