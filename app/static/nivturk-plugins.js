// Pass message from jsPsych to NivTurk
function pass_message(filename, mode, msg) {
  $.ajax({
    url: "/experiment?fout=" + filename +"&mode="+mode,
    method: 'POST',
    data: JSON.stringify(msg),
    contentType: "application/json; charset=utf-8",
  }).done(function(data, textStatus, jqXHR) {
    // do nothing on success
  }).fail(function(error) {
    console.log(error);
  });

}

  // Save an incomplete dataset.
  function incomplete_save(filename) {

    $.ajax({
      url: "/incomplete_save?fout=" + filename,
      method: 'POST',
      data: JSON.stringify(jsPsych.data.get().json()),
      contentType: "application/json; charset=utf-8",
    }).done(function(data, textStatus, jqXHR) {
      // do nothing
    }).fail(function(error) {
      // do nothing
    });

  }



// Successful completion of experiment: redirect with filename
function interim_redirect_success(filename) {

  var url = "/half";
  $.ajax({
    url: "/redirect_success?fout=" + filename,
    method: 'POST',
    data: JSON.stringify(jsPsych.data.get().json()),
    contentType: "application/json; charset=utf-8",
  }).done(function(data, textStatus, jqXHR) {
    window.location.replace(url);
    // window.alert("חצי ראשון נשמר בהצלחה");
    console.log('saved!');
  }).fail(function(error) {
    console.log(error);
  });

}



// Successful completion of experiment: redirect with filename
function redirect_success(filename) {

  // Concatenate metadata into complete URL (returned on success).
  var url = "/complete";

  $.ajax({
    url: "/redirect_success?fout=" + filename,
    method: 'POST',
    data: JSON.stringify(jsPsych.data.get().json()),
    contentType: "application/json; charset=utf-8",
  }).done(function(data, textStatus, jqXHR) {
    window.location.replace(url);
  }).fail(function(error) {
    console.log(error);
  });

}


// Unsuccessful completion of experiment: redirect to error page.
function redirect_error(error) {

  // error is the error number to redirect to.
  var url = "/error/" + error;

  $.ajax({
    url: "/redirect_error",
    method: 'POST',
    data: JSON.stringify(jsPsych.data.get().json()),
    contentType: "application/json; charset=utf-8",
  }).done(function(data, textStatus, jqXHR) {
    window.location.replace(url);
  }).fail(function(error) {
    console.log(error);
  });

}

// Return datetime
function get_datetime() {
  const date = new Date();
  return String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate()) + String(date.getHours()) + String(date.getMinutes()) + String(date.getSeconds());
}


var GETSUBJECTID = {
  type: jsPsychSurveyText,
  button_label: 'המשך',
  questions: [
    {prompt: 'נא להכניס מספר נבדק כאן', required: true}
  ],
  on_finish: function(data){
    // Extract metadata
    workerId  = JSON.parse(data.response["Q0"]);
    task = data.task;
    timestamp = get_datetime();

    // Define parameters.
    fout = 's' + workerId + '_' + task + '_' + timestamp;
    msg = 'task started'
    mode='w'

    console.log(fout, mode, msg);

    //log statrt
    pass_message(fout, mode, msg);


    // Append metadata
    jsPsych.data.addProperties({
      sub: workerId,
      timestamp: timestamp,
      fout: fout
    });
  }

}
