/*
INSTRUCTIONS: Acquisition + Extinction

Note: Includes trigger warning and extra page for participants to adjust volume one final time before experiment begins.
*/

// First page welcoming participant to experiment
const introduction = {
	type: jsPsychInstructions,
	pages: [
		`<h1>קלפים צועקים</h1>
    <br><p style="padding:0 200px">בכל סבב ייחשף בפנייכם קלף עם ציור של נרות או ציור של ירח.
    <br><br>קלפי הירח וקלפי הנרות עלולים להשמיע קולות שונים.
    <br><br>המשימה שלכם היא לנסות להבין איזה קלף משמיע קול צעקה.
    <br><br>כדי לשמוע את הקול שהקלף משמיע לחצו על מקש הרווח<br><br></p>`
	],
	allow_backward: false,
	button_label_next: "המשך",
  button_label_previous: "הקודם",
	post_trial_gap: 300,
	show_clickable_nav: true,
  key_forward:'ArrowLeft',
  key_backward:'ArrowRight'
}

// Keyboard response instructions 
const keyboardResponseInstructions = {
	type: jsPsychInstructions,
	pages: [
		`<p style="padding:0 200px">מדי פעם נשאל אתכם איזה קול אתם חושבים שקלף מסויים ישמיע .
    ומדי פעם, נבקש ממכם לדרג את הרגשות שמעורר בכם קלף הירח או קלף הכוכבים.<br><br></p>`,
    `<p style="padding: 0 200px">כעת עלייכם לשים אוזניות בכדי להמשיך.
    וודאו שהנחתם את האוזניות כראוי, אוזניה ימין על אוזן ימין ואוזניה שמאל על אוזן שמאל.
    <br><br>`
	],
	allow_backward: false,
	button_label_next: "המשך",
  button_label_previous: "הקודם",
	post_trial_gap: 300,
	show_clickable_nav: true,
  key_forward:'ArrowLeft',
  key_backward:'ArrowRight'
}

const audioWord = "../static/fctask_shared/audio/fctask-shared/leftChannelGirl.mp3";
const audioLoudness = "../static/fctask_shared/audio/fctask-shared/loudnessCheck.mp3"

const audioPreTest = {
	type: jsPsychComprehensionsCheck,
	instruction_pages: [
	  `<h3>לפני שנמשיך נבצע בדיקת שמע.</h3>
	  <br><p style="padding: 0 200px">להלן, שני קטעי שמע שיעזרו לכם לכוון את עוצמת השמע.
    <br><br>בקטע הראשון, כוונו את הווליום כך שתוכלו לשמוע מישהו מדבר אבל מבלי להבין מה הוא אומר:
    <br>
	  <div id="player"><audio controls><source src=${audioLoudness} type="audio/mpeg"></audio></div>
    <br><br>בקטע השני, תבדקו שאתם שומעים את מה המילה שנאמרת בבירור. אם אינכם שומעים בבירור אנא הגבירו את הווליום.
    <br>
	  <div id="player"><audio controls><source src=${audioWord} type="audio/mpeg"></audio></div>
	  <br><br>כשאתם מוכנים, אנא לחצו ׳המשך׳.
    <br><br></p>`
 	 ],
	  // Here are the questions for the above audio pretest
	questions: [
    {
      prompt: `<p style="padding: 0 200px">איזה מילה שמעת בקטע השמע השני?`,
      options: ["אגדה", "ילדה", "בית", "עכבר"],
      correct_answer: "ילדה",
      required: true,
      horizontal: false
      },
    {
      prompt: `<p style="padding: 0 200px">באחד מקטעי השמע, הקול נשמע רק בצד אחד של האוזניות. באיזה צד שמעת את הקול?`,
      options: ["ימין ", "שמאל "],
      correct_answer: "שמאל ",
      required: true,
      horizontal: false
      },
	],
	show_clickable_nav: true,
	show_page_number: false,
	randomize_question_order: false,
  button_label: "המשך",
  button_label_next: "המשך",
  button_label_previous: "הקודם",
  key_forward:'ArrowLeft',
  key_backward:'ArrowRight',
	failure_text: "לצערנו לא ענית נכון על השאלות. אנא קראו את ההוראות, כוונו את הווליום, ונסו לענות על השאלות שוב.",
	data: {
		test_type: "comprehension-check-audio-channel",
	},
	on_finish(data){
		data.comp_check_response = jsPsych.data.getLastTrialData().select("responses").values;
	}
};

// Practice Rounds
const practiceInstructions = {
  type: jsPsychInstructions,
  pages: [
    `<h3>כעת נבצע כמה סבבי תרגול.</h3><br>
    <p style="padding:0 200px">הציורים על הקלפים והקול שישמיעו בזמן התרגול יהיו שונים מהציורים והקולות שיושמעו במהלך הניסוי.<br>
    <br> התרגול נועד כדי להראות לכם מה תצטרכו לעשות בניסוי האמיתי. למשל, ללחוץ על מקש הרווח בכדי להמשיך ולהבין איך עלייכם לדרג.<br>
    <br>לחצו ׳התחל׳ כשאתם מוכנים</p><br><br>`
  ],
  button_label: "התחל",
  button_label_next: "התחל",
  button_label_previous: "הקודם",
  key_forward:'ArrowLeft',
  key_backward:'ArrowRight',
  post_trial_gap: 300,
  show_clickable_nav: true,
};

// End Practice
const endPractice = {
  type: jsPsychInstructions,
  pages: [
    `<h3>תרגול מצוין!</h3><br>
    יש רק עוד כמה שלבים לפני שנתחיל.<br><br>`
  ],
  button_label: "המשך",
  button_label_next: "המשך",
  button_label_previous: "הקודם",
  key_forward:'ArrowLeft',
  key_backward:'ArrowRight',
  post_trial_gap: 300,
  show_clickable_nav: true,
};

// Trigger Warning
const triggerWarning = {
	type: jsPsychInstructions,
	pages: [
		`<h3>אזהרת טריגר</h3>
    <p style="padding:0 200px">במחקר זה תשמע צעקות שעשויות להיות לא נעימות . 
    <br><br>
    לדוגמא:
    <br>
    <div id="player"><audio controls><source src=${aversive3} type="audio/mpeg"></audio></div>
    <br><br>
    <p style="padding:0 200px">אם תרצו להמשיך בניסוי אנא לחצו על ׳המשך׳, ואם תרצו להפסיק את הניסוי כעת- אנא קראו לנסיינית.</p><br><br>`
	],
	allow_backward: false,
	button_label_next: "המשך",
  button_label_previous: "הקודם",
  key_forward:'ArrowLeft',
  key_backward:'ArrowRight',
	post_trial_gap: 300,
	show_clickable_nav: true,
}

// Instructions to remain at volume
const audioInstructions = {
	type: jsPsychInstructions,
	pages: [
		`<h3 style="padding: 0 200px">אנא שמרו על עוצמת שמע קבועה לכל אורך הניסוי.</h3>
		<p style="padding: 0 200px">אתם מוזמנים לכוון את הווליום בפעם האחרונה לפני שנתחיל.
    <br>אנא וודאו שאתם יכולים לשמוע בבירור את המשפט המושמע.<br>
    <div id="player"><audio controls><source src=${letterG} type="audio/mpeg"></audio></div>
    <br>כעת תוודאו שאתם לא שומעים את הצעקה בעוצמה גבוהה מדי. (שימו לב שהצעקה נועדה להיות לא נעימה אך לא בלתי נסבלת).
    <br>
    <div id="player"><audio controls><source src=${aversive3} type="audio/mpeg"></audio></div>
    <br><br>
    תודה על התרגול, כעת נתחיל בניסוי!</p><br><br>`
	],
	button_label: "התחל",
  button_label_next: "התחל",
  button_label_previous: "הקודם",
  key_forward:'ArrowLeft',
  key_backward:'ArrowRight',
	post_trial_gap: 300,
	show_clickable_nav: true,
};

const beginTask = {
  type: jsPsychInstructions,
  pages: [
    `<h3>בואו נתחיל!</h3><br><br>`
  ],
  button_label: "המשך",
  button_label_next: "המשך",
  button_label_previous: "הקודם",
  key_forward:'ArrowLeft',
  key_backward:'ArrowRight',
  post_trial_gap: 300,
  show_clickable_nav: true,
};



// Instructions Timeline
const taskInstructions = {
  timeline: [
    introduction,
    keyboardResponseInstructions,
    audioPreTest,
  ]
}

const triggerWarnings = {
  timeline: [
    triggerWarning,
    audioInstructions,
  ]
}


const breakReminder = {
	type: jsPsychInstructions,
	pages: [
	  "<h1>תזכרות לגבי ההפסקות:</h1>" +
	  "<p>כעת תצאו מהמטלה ותעברו לעמוד הראשי.</p>" +
	  "</br>אם אתם מרגישים שאתם זקוקים להפסקה, אתם מוזמנים לקחת הפסקה קצרה לפני שתעברו לעמוד הבא."
	],
	//key_forward: 'j',
  button_label: "המשך",
  button_label_next: "המשך",
  button_label_previous: "הקודם",
	show_clickable_nav: true,
  key_forward:'ArrowLeft',
  key_backward:'ArrowRight',
};
