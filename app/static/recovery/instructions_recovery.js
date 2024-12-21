// -----------------------------------------------------------------------------
// INSTRUCTIONS


// // go into full screen
// const full_screen = {
// 	type: 'fullscreen',
// 	fullscreen_mode: true
// };

// First page welcoming participant to experiment
const recoveryIntroduction = {
	type: jsPsychInstructions,
	pages: [
		`<h1>קלפים צועקים 2</h1>
    <br><p style="padding:0 200px">בדומה למשחק הראשון, בכל סבב ייחשף בפנייכם קלף עם ציור של נרות או ירח.
    <br><br>ייתכן וקלפי הנרות והכוכבים ישמיעו קולות שונים. 
    <br><br>עלייכם להעריך מה הסיכוי שצעקה תשמע לאחר הקלף.
    <br><br>בכדי לשמוע את קול הקלפים לחצו על מקש הרווח.<br><br></p>`
	],
	allow_backward: false,
	button_label_next: "המשך",
  button_label_previous: "הקודם",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

// Keyboard response instructions 
const recoveryKeyboardResponseInstructions = {
	type: jsPsychInstructions,
	pages: [
    `<p style="padding:0 200px">מדי פעם נשאל אתכם איזה קול אתם חושבים שקלף מסויים ישמיע .
    <br><br>ומדי פעם, נבקש ממכם לדרג את הרגשות שמעורר בכם קלף הירח או קלף הכוכבים.
    <br><br></p>`,
    `<p style="padding: 0 200px">אנא זכרו להרכיב את האוזניות. הווליום אמור היה להישאר באותה העוצמה כמו בחלק הראשון של הניסוי.
    <br><br>`
	],
	allow_backward: false,
	button_label_next: "המשך",
  button_label_previous: "הקודם",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

// Trigger Warning
const triggerWarning = {
	type: jsPsychInstructions,
	pages: [
		`<h3>אזהרת טריגר</h3>
    <p style="padding:0 200px">שימו לב שגם חלק זה של הניסוי כולל צעקות שעלולות להיות לא נעימות .
    <br><br>
    שמעת חלק מהצעקות בחלק הקודם, הנה דוגמא נוספת:
    <br>
    <div id="player"><audio controls><source src=${aversive2} type="audio/mpeg"></audio></div>
    <br><br>
    <p style="padding:0 200px">אם תרצו להמשיך בניסוי אנא לחצו על ׳המשך׳ ואם תרצו להפסיק את הניסוי כעת תודיעו לנסיינית. </p>`
	],
	allow_backward: false,
	button_label_next: "המשך",
  button_label_previous: "הקודם",
	post_trial_gap: 300,
	show_clickable_nav: true,
}

// Instructions to remain at volume
const recoveryAudioInstructions = {
	type: jsPsychInstructions,
	pages: [
		`<h3 style="padding: 0 200px">אנא נסו לשמור על עוצמת השמע קבועה לכל אורך הניסוי.</h3>
		<p style="padding: 0 200px">עוצמת הווליום אמורה להיות זהה לחלק הראשון. במידה ושיניתם את עוצמת הווליום אנא כוונו אותה בשנית לפי ההוראות.
    <br>אנא וודאו שאתם יכולים לשמוע בבירור את המשפט המושמע.
    <br>
    <div id="player"><audio controls><source src=${letterG} type="audio/mpeg"></audio></div>
    <br>כעת וודאו שאתם לא שומעים את הצעקה בעוצמה גבוהה מדי. (שימו לב שהצעקה נועדה להיות לא נעימה אך לא בלתי נסבלת).
    <br>
    <div id="player"><audio controls><source src=${aversive2} type="audio/mpeg"></audio></div>
    <br><br>
    לחצו על התחל כשאתם מוכנים<br><br></p>`
	],
	button_label: "התחל",
  button_label_next: "התחל",
  button_label_previous: "הקודם",
	post_trial_gap: 300,
	show_clickable_nav: true,
};

const recoveryBeginTask = {
  type: jsPsychInstructions,
  pages: [
    `<h3>בואו נתחיל!</h3><br><br>`
  ],
  button_label: "המשך",
  button_label_next: "המשך",
  button_label_previous: "הקודם",
  post_trial_gap: 300,
  show_clickable_nav: true,
};

const recoveryTaskInstructions = {
  timeline: [
    recoveryIntroduction,
    recoveryKeyboardResponseInstructions,
    triggerWarning,
    recoveryAudioInstructions,
  ]
}

const responseStyleInstructions = {
	type: jsPsychInstructions,
	pages: [`
    <br><p style="padding:0 200px">בכמה העמודים הבאים תקראו על הגירויים שאחרים שמעו וראו. 
    <br><br>ונשאל אותכם כיצד אתם חושב שהיה עליהם להגיב.<br><br></p>`
	],
	allow_backward: false,
	button_label_next: "המשך",
  button_label_previous: "הקודם",
	post_trial_gap: 300,
	show_clickable_nav: true,
}


// task end
const contentDebrief = {
  type: jsPsychInstructions,
  pages: [
    "<h1>Study Debrief</h1>" +
    "<p>תודה על השתתפותך!" +
    "<p>ניסוי זה נועד לבדוק כיצד אנשים לומדים לקשר גירויים ניטרליים לגירויים טעונים רגשית." +
    "</br>אנחנו מתעניינים במיוחד כיצד זה מתרחש ברמות מפורשות ומרומזות, וכיצד זה משתנה לאורך זמן ומצבים"+
    "</br>אנו מקווים שהממצאים הללו, כשהם משולבים במחקר אחר, יעזרו לנו להבין את האופן שבו אנשים יכולים ללמוד להתמודד עם אתגרים רגשיים."+
    "</br>" +
    "</p>"
  ],
  button_label_previous: "הקודם",
  button_label_next: "המשך",
  show_clickable_nav: true,
}