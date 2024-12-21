// //colors must be determined to display in the text
//
var continue_label = 'Continue';
//
var next_label = 'Next'; // Next button label
//
var previous_label = 'Prev'; // Previous button label

var reading_dir_left_to_right = true

var next_key = 'ArrowRight';

var previous_key = 'ArrowLeft';


var OUTCOMES_TEXT ={CARD_LOW:'0',
                    CARD_HIGH:'+10',
                    CERTAIN:'+5'};

var instructions01 = [`<p> Welcome to the <b>Double or Nothing</b> game. Use buttons below or the keyboard's arrow keys, to navigate the instructions</p>`];

var instructions02 = [`<p> In this game, on every turn you will choose between two cards, like the cards above </p>`];

var instructions03 = [`<p> One card will always be <b>face up</b>. If you choose it, you will always get ${OUTCOMES_TEXT.CERTAIN} points. </p>`];

var instructions04 = [`<p> One card will always be faced down, showing an animal symbol. If you choose it - there are two possible outcomes </p>`];

var instructions05a = [`<p> There is a chance the card turns over and you win ${OUTCOMES_TEXT.CARD_HIGH} points </p>`];
var instructions05b = [`<p> And there is a chance you win ${OUTCOMES_TEXT.CARD_LOW} points </p>`];

var instructions06 = [`<p> Therefore, on every turn, you have a choice to makeChoose the face-up card and get ${OUTCOMES_TEXT.CERTAIN} points <i>guaranteed</i>, o choose the animal card for <i>a chance</i> of winning ${OUTCOMES_TEXT.CARD_HIGH} points.</p>`];

var instructions07a = [`<p> In this game, there will be many different animal cards. Some cards <b>will be lucky</b>. That is, some cards wilhave a greater chance of giving you ${OUTCOMES_TEXT.CARD_HIGH} points than ${OUTCOMES_TEXT.CARD_LOW} points. </p>`]
var instructions07b = [`<p> Other animal cards <b>will be unlucky</b>. That is, some cards will</p><p>have a greater chance of giving you ${OUTCOMES_TEXT.CARD_LOW} points than ${OUTCOMES_TEXT.CARD_HIGH} points </p>`]

// var instructions07 = [`<p> The colors and pictures are there to help you tell the cards apart - they don't have any special meaning other than that </p>`];

var instructions08 = [`<p> Your goal in this experiment is to win as many points as possible. To do this, you should try to learn which animal cards are lucky or unlucky, and then choose only the lucky cards. </p>`]

var instructions09 = [`<p>To help you learn, we will always flip over the animal card at the end of every turn, even if you did not choose it. <p></p>(Note: You will only receive points for the card you picked) </p>`];

var instructions10 = [`<p> At the end of every turn, the face down card will be returned to the deck and reshuffled </p>`];

var instructions11a = [`<p>Now let's practice some turns with the cards above.</p><p>On the next screen, use the <b>left/right arrow keys</b> on your keyboard to choose between the cards.</p>`];

var instructions11b = [`<p>Try to learn if this animal card is lucky.</p><p>Choose the blue rabbit card if you think it has a greater chance of giving you ${OUTCOMES_TEXT.CARD_HIGH} points than ${OUTCOMES_TEXT.CARD_LOW} points.</p>`];


var instructions12 = [`<p>Nice practice. As you learned, this animal card was lucky and gave you ${OUTCOMES_TEXT.CARD_HIGH} points <i>most</i> of the time you chose it (but not every time).</p>`];

var instructions13 = [`<p>Now let's practice again with a new animal card. On the next screen, use the <b>left/right arrow keys</b> on your keyboard<br>to choose between the cards.</p>`];

var instructions14 = [`<p>Try to learn if this new animal card is lucky. Choose this animal card if you think it has a greater chance of giving you ${OUTCOMES_TEXT.CARD_HIGH} points than ${OUTCOMES_TEXT.CARD_LOW} points.</p>`]

var instructions15 = [`<p><b>Hint:</b> some animal cards will be unlucky. For unlucky cards,</p><p> you will earn more points on average by choosing the card that's facing up.</p>`];

var instructions16 = [`<p>Nice practice. As you learned, this animal card was not so lucky and gave you ${OUTCOMES_TEXT.CARD_LOW} points <i>most</i> of the time you chose it (but not every time).</p>`];

var instructions17 = [`<p>Now you know how to play the game. Before we start the real game, here are some final details.</p>`];



var instructions18 = [`<p>The total number of points you've earned by the end of the game<br>will be converted into a <b>performance bonus.</b></p><p>Therefore, you should try to earn as many points as possible.</p>`];

var instructions19 = [`<p>To help you earn as many points as possible, here are <b>2 hints.</b></p><p>Please read each hint carefully.</p>`];

var instructions20 = [`<p><b>Hint #1:</b> How lucky or unlucky an animal card is does not change over time.</p><p> This means the luckiness of a card stays the same throughout the game.</p>`];

var instructions21 = [`<p><b>Hint #2:</b> Cards can appear on the left or the right side of the screen totally at random.</p> <p> Position does not change how lucky or unlucky a card is.</p>`];

var instructions22 = [`<p>Next, we will ask you some questions about the game.</p><p>You need to answer all questions correctly to proceed.`];

// var instructions12 = [`<p> Great job! Now you know how the game works </p>`];
//
// var instructions13 = [`<p> At the end of the task, the total number of points you have earned will be converted into performece bonus </p>`];
//
// var instructions14 = [`<p> Rememeber, try earn as many points as you can </p>`];
//
// var instructions15 = [`<p> Next we will ask you some questions about the game. You need to answer all questions correctly to continue. </p>`];


var instructions23 = [`<p> Great job! You've answered all the questions correctly.</p>`];
var instructions24 = [`<p> We will now begin the game.</p><p>The game has three parts.</p>`];
var instructions25 = [`<p> You will be able to take a break between each of the parts.</p><p>However, please give your undivided attention while playing the game.</p>`];
var instructions26 = [`<p> Get ready to begin <b>Part 1</b>. This part will take about 3 minutes.</p><p>Press 'Next' when you're ready to start.</p>`];

var instructions27 = [`<p> Take a break for a few moments and press any button when you are ready to continue.</p>`];
var instructions28 = [`<p> Get ready to begin <b>Part 2</b>. This part will take about 3 minutes.</p><p>Press next when you're ready to start.</p>`];
//
//
var instructions29 = [`<p> Take a break for a few moments and press any button when you are ready to continue.</p>`];
var instructions30 = [`<p> Get ready to begin <b>Part 3</b>. This part will take about 3 minutes.</p><p>Press next when you're ready to start.</p>`];
//
var instructions31 = [`<p> Great job! You've completed the game. </p>`];



var quiz_00 = [`<p> To continue, please answer the questions below: </p>`];

var comprehension_prompt_1 = [`<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;Some animal cards are luckier than others.`];
var comprehension_prompt_2 = [`<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;I will earn points even for the cards I <i>don't</i> choose.`];
var comprehension_prompt_3 = [`<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;How lucky a card is does <u>not</u> change over time.`];
var comprehension_prompt_4 = [`<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;How lucky a card is changes if it is on the left or the right side of the screen.`];
var comprehension_prompt_5 = [`<b><i>True</i> or <i>False</i>:</b>&nbsp;&nbsp;The points I earn <u>will</u> affect my performance bonus.`];


var comprehension_options =  [`True`, `False`];

var comprehension_review_0 = [`<p>You did not answer all of the quiz questions correctly.</p><p>Please review the following instructions carefully.`];
var comprehension_review_1 = [`Remember, some animal cards will have a greater chance of giving you 10 points than 0 points.`];
var comprehension_review_2 = [`You will only get points for cards that you choose`];
var comprehension_review_3 = [`Cards have the same chances of being lucky throughout the game`];
var comprehension_review_4 = [`The location on the screen does not change how lucky a card is.`];
var comprehension_review_5 = [`How much money you will get at the end of the experiment is affected by the number of points you earn.`];


var help_00 = ["<p>Seems like you're having trouble with selecting the better option.</p>"];
var help_01 = ["<p>Try to learn which card (the rabbit card or the face-up card) gives you more points on average.</p><p>Choose the card that you think gives you more points!</p>"];


var timeouterr = ["<p>You did not respond within the allotted time. Please pay more attention on the next trial.<br><br><b>Warning:</b> If you miss too many trials, we may end the experiment early and reject your work.< /p>"]
var early_end_game =["<p> Early termination </p>"]
