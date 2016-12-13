var countDown,
    start,
    intervalId,
    sessionCountDown,
    breakCountDown,
    sessionBool,
    originalBreakLength,
    originalSessionLength,
    breakLength = 5,
    sessionLength = 25;

$("#stop").css("display", "none");
$("#reset").css("display", "none");
$("#resume").css("display", "none");
$("#timer").css("display", "none");

function decrementBreak() {

  if (breakLength === 1) {
    return;
  }

  breakLength--;
  $("#break").text(breakLength);

}

function incrementBreak() {

  breakLength++;
  $("#break").text(breakLength);

}

function decrementSession() {

  if (sessionLength === 1) {
    return;
  }

  sessionLength--;
  $("#session").text(sessionLength);

}

function incrementSession() {

  sessionLength++;
  $("#session").html(sessionLength);

}

// Sets up event listeners for session and break length buttons. Increments and decrements session and break lengths. Returns from decrement functions when length equals 1.
$("#setters").on("click", "#decrementBreak", decrementBreak)
             .on("click", "#incrementBreak", incrementBreak)
             .on("click", "#decrementSession", decrementSession)
             .on("click", "#incrementSession", incrementSession);

$("#start").on("click", function() {

  $("#start").css("display", "none");
  $("#stop").css("display", "inline-block");
  $("#timer").css("display", "inline-block").text(clockFormat(totalSeconds(sessionLength)));

  originalBreakLength = breakLength;
  originalSessionLength = sessionLength;

  start = true;
  sessionBool = true;

  startSessionCountDown();

});

$("#stop").on("click", function() {

  $("#stop").css("display", "none");
  $("#resume").css("display", "inline-block");
  $("#reset").css("display", "inline-block");

  clearInterval(intervalId);

});

$("#resume").on("click", function() {

  $("#stop").css("display", "inline-block");
  $("#resume").css("display", "none");
  $("#reset").css("display", "none");

  if (sessionBool) {
    resumeSessionCountDown();
  } else {
    resumeBreakCountDown();
  }

});

$("#reset").on("click", function() {

  $("#resume").css("display", "none");
  $("#reset").css("display", "none");
  $("#start").css("display", "inline-block");
  $("#timer").text(clockFormat(totalSeconds(sessionLength)));

});

function resumeBreakCountDown() {

  intervalId = setInterval(function() {

    $("#timer").text(clockFormat(breakCountDown));
    breakCountDown--;

    if (breakCountDown === -1) {
      clearInterval(intervalId);
      sessionBool = true;
      startSessionCountDown();
    }
  }, 1000);

}

function resumeSessionCountDown() {

  intervalId = setInterval(function() {

    $("#timer").text(clockFormat(sessionCountDown));
    sessionCountDown--;

    if (sessionCountDown === -1) {
      clearInterval(intervalId);
      var wav = 'http://soundbible.com/grab.php?id=1377&type=mp3';
      var audio = new Audio(wav);
			audio.play();
      sessionBool = false;
      startBreakCountDown();
    }
  }, 1000);

}

function totalSeconds(minutes) {
  return minutes * 60;
}

function clockFormat(seconds) {

  var timeSeconds = seconds % 60;
  timeSeconds = timeSeconds < 10 ? "0" + timeSeconds : timeSeconds;
  var minutes = Math.floor(seconds / 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return minutes + ":" + timeSeconds;

}

function startSessionCountDown() {

  sessionCountDown = totalSeconds(originalSessionLength);

  if (start) {
    sessionCountDown--;
    start = false;
  }

  intervalId = setInterval(function() {

    $("#timer").text(clockFormat(sessionCountDown));
    sessionCountDown--;

    if (sessionCountDown === -1) {
      clearInterval(intervalId);
      var wav = 'http://soundbible.com/grab.php?id=1377&type=mp3';
      var audio = new Audio(wav);
			audio.play();
      sessionBool = false;
      startBreakCountDown();
    }

  }, 1000);

}

function startBreakCountDown() {

  breakCountDown = totalSeconds(originalBreakLength);

  intervalId = setInterval(function() {

    $("#timer").text(clockFormat(breakCountDown));
    breakCountDown--;

    if (breakCountDown === -1) {
      clearInterval(intervalId);
      sessionBool = true;
      startSessionCountDown();
    }

  }, 1000);

}
