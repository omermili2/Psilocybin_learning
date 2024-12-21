/*
* Expectancy Rating
*
* Author(s): Jamie Chiu
*
* TO 7.2.1 GILI KARNI
*
* Purves, K. L., et al. “Validating the Use of a Smartphone App for Remote
* Administration of a Fear Conditioning Paradigm.” Behaviour Research and
* Therapy, vol. 123, 2019, p. 103475.
*
*
*/

function noenter() {
  return !(window.event && window.event.keyCode == 13);
}

var jsPsychExpectancyRatingResponsestyle = (function (jspsych) {
'use strict';

const info = {
    name: "expectancy-rating-responsestyle",
    parameters: {
      useimage: {
        type: jspsych.ParameterType.BOOL, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: false,
        description: "if display image on left side of scale"
      },
      imageCSminus: {
        type: jspsych.ParameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: "../static/lib/images/acqext/candle-stimuli.png",
        description: "first CS image"
      },
      imageCSplus: {
        type: jspsych.ParameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: null,
        description: "second CS image"
      },
      context: {
        type: jspsych.ParameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: "Describe context for prompt",
        description: "Text that shows on top of page."
      },
      prompt: {
        type: jspsych.ParameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
        default: "מה הסיכוי שכל אחת מהתמונות תגרור אחריה צעקה מפחידה?",
        description: "General prompt that shows on top of page."
      },
      background_colour: {
        type: jspsych.ParameterType.STRING,
        default: "MidnightBlue",
        description: "Changes the background colour."
      },
      font_colour: {
        type: jspsych.ParameterType.STRING,
        default: "White",
        description: "Changes the font colour of the prompt."
      },

    }
  };

  class ExpectancyRatingResponsestylePlugin {
    constructor(jsPsych) {
        this.jsPsych = jsPsych;
    }
    trial(display_element, trial, on_load) {    
    //-------------------------------------------//
    // Display + Presentation
    //-------------------------------------------//

    let newHTML = "";

    // insert CSS
    const style = `
      <style>
      .jspsych-display-element {
        background: ${trial.background_colour};
      }
      .jspsych-content-wrapper {
        background: ${trial.background_colour};
        padding-bottom: 50px
      }
      body {
        background: ${trial.background_colour};
      }
      p {
        margin-block-start: 0px;
        margin-block-end: 0px;
      }

      .page-container {
        display: flex;
        flex-direction: column; /* top-to-bottom layout */
        justify-content: center; /* aligned on x axis */
        row-gap: 15px;
      }

      .trial-container {
        display: flex;
        flex-direction: row; /* left-to-right layout */
        align-items: center; /* aligned on y axis*/
        justify-content: center;
        gap: 0px;
        border: 2px solid black;
        padding: 15px;
        background-color: white;

      }
      button[type="trial"] {
        width: 200px;
        border-radius: 4px;
        text-align: center;
        margin: auto;
        background: white;
        color: black;
        border: black 1px solid;
        opacity: 0.8;
        transition: 0.3s
      }
      button[type="trial"]:hover:enabled {
        opacity: 1
      }
      button[type="trial"]:active {
        background-color: gray;
        transform: translateY(2px);
      }
      button[type="trial"]:hover + .hide {
        display: block;
        color: red;
      }
      
      </style>
    `;

    newHTML += style;
  
    let startValOne = Math.floor(Math.random()*100);
    let startValTwo = Math.floor(Math.random()*100);

    let csminusimagehtml = ``;
    let csplusimagehtml = ``;
    if (trial.useimage){
      csminusimagehtml= `<img src=${trial.imageCSminus} style="width:90%">`;
      csplusimagehtml = `<img src=${trial.imageCSplus} style="width:90%">`;
    }

    let csMinusHTML = `
    <div style="display:flex; flex-direction: column">  
      <div class="trial-container">  
        <div class="left-icon" style="width:18%; margin-right:50px">`+csminusimagehtml+`
        </div>
        <div style="display:flex; flex-direction: row; align-items:stretch; gap:10px">
          <p style="font-size:16px">0%<br>אף פעם</p>
          <div class="slidecontainer">
            <input type="range" min="0" max="100" value="${startValOne}" step= "1" class="slider" id="slider-csminus">
            <p style="font-size:16px">50% <br>אולי חצי מהפעמים</p>
          </div>
          <p style="font-size:16px">100%<br>תמיד</p>
        </div>
      </div>
    </div>
    `

    let csPlusHTML = `
    <div style="display:flex; flex-direction: column"> 
      <div class="trial-container">
        <div class="left-icon" style="width:18%; margin-right:50px">`+csplusimagehtml+`
        </div>
        <div style="display:flex; flex-direction: row; align-items:center; gap:10px">
          <p style="font-size:16px">0%<br>אף פעם</p>
          <div class="slidecontainer">
            <input type="range" min="0" max="100" value="${startValTwo}" step="1" class="slider" id="slider-csplus">
            <p style="font-size:16px">50% <br>אולי חצי מהפעמים<</p>
          </div>
          <p style="font-size:16px">100%<br>תמיד</p>
        </div>
      </div>
    </div>
    `

    let contextHTML = `
    <div style="font-size: 20px; padding-bottom: 20px; color: ${trial.font_colour}">${trial.context}</div>
    `;

    const instructionsHTML = `
      <h3 style="font-size: 20px; padding-bottom: 20px; color: ${trial.font_colour}">${trial.prompt}</h3>
    `
    let buttonHTML = `
      <button type="trial" id="button-el" style="margin-top:0px" title="Please respond to each scale">שלח</button>
      <div class="hide" id="hide">בבקשה ענו על כל השאלות על המסך.</div>
    `;

    // Randomise + save the presentation order
    let sequenceHTML;
    let sequence;
    
    if (trial.imageCSplus !== null){
      console.log("Yes");
      if (Math.random() > 0.5) {
        sequenceHTML = csMinusHTML + csPlusHTML;
        sequence = ["CS-", "CS+"]
      } else {
        sequenceHTML = csPlusHTML + csMinusHTML;
        sequence = ["CS+", "CS-"]
      };
    } else {
      sequenceHTML = csMinusHTML;
      sequence = ["CS"]
    }
    

    newHTML += `
    <div class="page-container">
    ${contextHTML}
    ${instructionsHTML}
    ${sequenceHTML}
    ${buttonHTML}
    </div>
    `

    display_element.innerHTML = newHTML;



    //-------------------------------------------//
    // Handling + Saving Responses
    //-------------------------------------------//

    // DOM elements
    const sliderCSminus = document.getElementById("slider-csminus");
    const buttonEl = document.getElementById("button-el");
  
    
    // saving decision times (RT) and responses
    const startTime = performance.now();
    let csMinusResponses = [];
    let csMinusRTs = [];
    let csPlusResponses = [];
    let csPlusRTs = [];
    

    // save the random initial value of each scale
    csMinusResponses.push(startValTwo);
    if (trial.imageCSplus !== null){
      csPlusResponses.push(startValOne);
    }

    
    function logResponseCSplus() {
      if (trial.imageCSplus !== null) {
        let sliderCSplus = document.getElementById("slider-csplus");
        csPlusResponses.push(sliderCSplus.value);
        csPlusRTs.push(performance.now());
      }
    }
  
    function logResponseCSminus() {
      csMinusResponses.push(sliderCSminus.value);
      csMinusRTs.push(performance.now());
    }
    // button is disabled until both slider is moved once
    buttonEl.disabled = true;

    function enableButton() {
      if (trial.imageCSplus !== null) {
        if(csPlusResponses.length > 1 && csMinusResponses.length > 1){
          document.getElementById("hide").innerHTML = " ";
          buttonEl.disabled = false;
        }
      } else {
        if (csMinusResponses.length > 1) {
          document.getElementById("hide").innerHTML = " ";
          buttonEl.disabled = false;
        }
      }
    }

    if (trial.imageCSplus !== null) {
      let sliderCSplus = document.getElementById("slider-csplus");
      sliderCSplus.addEventListener("click", () => {
        logResponseCSplus();
        enableButton();
      });
    };
    
    sliderCSminus.addEventListener("click", () => {
      logResponseCSminus();
      enableButton();
    });
  

    // trial ends when submit button is clicked
    function endTrial() {
      const endTime = performance.now();
      const  totalTime = endTime - startTime;

      if (trial.imageCSplus !== null) {
        var trial_data = {
          sequence: sequence,
          responseStyleCsPlusRating: document.getElementById("slider-csplus").value,
          responseStyleCsMinusRating: sliderCSminus.value,
          totalTime: totalTime,

          // slider specific responses
          responseStyleCsPlusResponses: csPlusResponses,
          responseStyleCsPlusRTs: csPlusRTs,
          responseStyleCsMinusResponses: csMinusResponses,
          responseStyleCsMinusRTs: csMinusRTs
        }
      } else {
        var trial_data = {
          sequence: sequence,
          responseStyleCsRating: sliderCSminus.value,
          totalTime: totalTime,

          // slider specific responses
          responseStyleCsResponses: csMinusResponses,
          responseStyleCsRTs: csMinusRTs
        }
      }
      console.log("response logged");
      // add slight delay before trial ends
      setTimeout(() => {
        display_element.innerHTML = " ";
        jsPsych.finishTrial(trial_data);
      }, 500);
    }

    // trial ends when submit button is clicked
    buttonEl.addEventListener("click", endTrial);

  };
}
ExpectancyRatingResponsestylePlugin.info = info;

return ExpectancyRatingResponsestylePlugin;

})(jsPsychModule);
