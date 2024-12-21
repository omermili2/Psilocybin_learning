


//-------------------------------------------//
// ORIGINAL ATTACHMENT THREE-CATEGORY MEASUR
//-------------------------------------------//
// Hazan, C., & Shaver, P. R. (1987). Romantic love conceptualized as an attachment process.
//  Journal of Personality and Social Psychology, 52, 511-524. 


var attachment_q = {
  type: jsPsychSurveyTemplate,
  items: [
    "בדרך כלל קל לי להיות בקשר עם אנשים",
    "אני מרגיש נוח להתקרב אל אנשים",
    "בדרך כלל קשה לי לסמוך על אחרים שאני בקשר אתם",
    "לעיתים קרובות אחרים רוצים להיות איתי בקשר יותר ממה שאני רוצה",
    "לעיתים קרובות אני פוחד שלא ירצו להישאר איתי",
    "יש חבר שאני רוצה להיות אתו יותר זמן",
    "קשה לי כשאחרים תלויים בי יותר מדי",
    "קשה לי להיות בטוח בחברים שלי כל הזמן",
    "לפעמים אחרים לא כל כך רוצים להיות איתי בקשר",
    "אני חושש שחברים שלי יעזבו אותי",
    "הרבה פעמים אני חושב שאחרים לא אוהבים אותי",
    "אני מאד עצבני כשמישהו מתקרב אלי יותר מידי",
    "קשה לי לסמוך על אנשים שאני מכיר",
    "לפעמים אנשים מתרחקים ממני כאשר אני רוצה להיות חבר שלהם כל הזמן",
    "אני מאד דואג שמישהו יתקרב אלי יותר מדי"
  ],
  scale: [
    "לגמרי לא נכון",
    "לפעמים נכון",
    "נכון מאד",
  ],
  button_label:"המשך",

  instructions: 'קרא את השאלון וסמן את מידת הסכמתך לנאמר בהיגדים לפי הסקלה הבאה:',
  // survey_width: 950,
  // item_width: 40,
  // scale_repeat: 9,
  // randomize_question_order: true,
  // infrequency_items: [7],
  data: {survey: 'attachment_q'},
}




// //-------------------------------------------//
// // Infrequency items
// //-------------------------------------------//

// var none_endorse = jsPsych.randomization.shuffle([
//   "Difficulty remembering my own name",
//   "Worrying about the Canine World Cup",
//   "Feeling afraid of Saturn's moons",
//   "Thinking too much about the viscosity of motor oil"
// ])

// //-------------------------------------------//
// // Generalized Anxiety Disorder Scale (GAD-7)
// //-------------------------------------------//
// // Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B. (2006). A brief measure
// // for assessing generalized anxiety disorder: the GAD-7. Archives of internal
// // medicine, 166(10), 1092-1097.

// var gad7 = {
//   type: jsPsychSurveyTemplate,
//   items: [

//     // Generalized anxiety
//     "Feeling nervous, anxious, or on edge",
//     "Not being able to stop or control worrying",
//     "Worrying too much about different things",
//     "Trouble relaxing",
//     "Being so restless that it's hard to sit still",
//     "Becoming easily annoyed or irritable",
//     "Feeling afraid as if something awful might happen",

//     // Infrequency item
//     none_endorse[0],

//   ],
//   scale: [
//     "Not at all",
//     "Several days",
//     "Over half the days",
//     "Nearly every day"
//   ],
//   reverse: [
//     false, false, false, false, false, false, false, false
//   ],
//   instructions: 'Over the <b>last 2 weeks</b>, how often have you been bothered by the following problems?',
//   survey_width: 950,
//   item_width: 40,
//   scale_repeat: 9,
//   randomize_question_order: true,
//   infrequency_items: [7],
//   data: {survey: 'gad7', infreq: none_endorse[0]},
// }

// //-------------------------------------------//
// // Patient health questionnaire (9-item)
// //-------------------------------------------//
// // Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ‐9: validity of
// // a brief depression severity measure. Journal of general internal medicine,
// // 16(9), 606-613.

// var phq9 = {
//   type: jsPsychSurveyTemplate,
//   items: [

//     // Major depression
//     "Little interest or pleasure in doing things",
//     "Feeling down, depressed, or hopeless",
//     "Trouble falling/staying asleep or sleeping too much",
//     "Feeling tired or having little energy",
//     "Poor appetite or overeating",
//     "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
//     "Trouble concentrating on things, such as reading the newspaper or watching television",
//     "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
//     "Thoughts that you would be better off dead or of hurting yourself in some way",

//     // Infrequency item
//     none_endorse[1],

//   ],
//   scale: [
//     "Not at all",
//     "Several days",
//     "Over half the days",
//     "Nearly every day"
//   ],
//   reverse: [
//     false, false, false, false, false, false, false, false, false, false,
//   ],
//   instructions: 'Over the <b>last 2 weeks</b>, how often have you been bothered by the following problems?',
//   survey_width: 950,
//   item_width: 40,
//   scale_repeat: 10,
//   randomize_question_order: true,
//   infrequency_items: [9],
//   data: {survey: 'phq9', infreq: none_endorse[1]},
// }

// var phq9_difficulty = {
//   type: jsPsychSurveyLikert,
//   questions: [{
//     prompt: "For any of the problems on the previous page, how difficult have these problems made it for you to do your work,<br>take care of things at home, or get along with other people?",
//     labels: [
//       "<div style='font-size: 16px; padding-top: 10px'>Not difficult at all</div>",
//       "<div style='font-size: 16px; padding-top: 10px'>Somewhat difficult</div>",
//       "<div style='font-size: 16px; padding-top: 10px'>Very difficult</div>",
//       "<div style='font-size: 16px; padding-top: 10px'>Extremely difficult</div>"
//     ],
//     name: "PHQ9_diff",
//     required: true
//   }],
// };

// var PHQ9 = {
//   timeline: [
//     phq9,
//     phq9_difficulty
//   ]
// }