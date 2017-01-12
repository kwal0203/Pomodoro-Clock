//functions

function getTimeRemaining(endtime) {
  var t = endtime;
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

function updateClock() {
  if (onBreak === false) {
    var t = getTimeRemaining(deadline);
    var minutes = t.minutes;
    var seconds = t.seconds;
    
    document.getElementById('break').innerHTML = 'TIMER';
    document.getElementById('minutes').innerHTML = ('0' + minutes).slice(-2);
    document.getElementById('seconds').innerHTML = ('0' + seconds).slice(-2);
    document.getElementById('breakTime').innerHTML = ('0' + (y / 1000 / 60)).slice(-2);
    document.getElementById('sessTime').innerHTML = ('0' + (x / 1000 / 60)).slice(-2);
    
    
    if (isRunning) {
      deadline -= 1000;
      deadlineCounter += 1000;
    }

    if (t.total <= 0) {
      playBeep();
      onBreak = true;
      deadline = deadlineCounter - 1000;
    }
    
    filler(deadline);
    
  } else {
    var t = getTimeRemaining(rest);
    var minutes = t.minutes;
    var seconds = t.seconds;
    
    document.getElementById('break').innerHTML = 'BREAK TIME';
    document.getElementById('minutes').innerHTML = ('0' + minutes).slice(-2);
    document.getElementById('seconds').innerHTML = ('0' + seconds).slice(-2);
    document.getElementById('breakTime').innerHTML = ('0' + (y / 1000 / 60)).slice(-2);
    document.getElementById('sessTime').innerHTML = ('0' + (x / 1000 / 60)).slice(-2);
    
    if (isRunning) {
      rest -= 1000;
      restCounter += 1000;
    }

    if (t.total <= 0) {
      playBeep();
      onBreak = false;
      rest = restCounter - 1000;
    }
    
    restFiller(rest);
  }	  
}

function playBeep() {
  document.getElementById('beep').play();
}

function sessTimeDown() {
  if (deadline > 60000) { // one minute in milliseconds = 60000
    deadline -= 60000;
    x -= 60000;
    updateClock();
  } else {
    updateClock();
  }
}

function sessTimeUp() {
  if (deadline < 1800000) {
    deadline += 60000;
    x += 60000;
    updateClock();
  }
}

function breakTimeDown() {
  if (rest > 60000) {
    rest -= 60000;
      y -= 60000;
    updateClock();
  }
}

function breakTimeUp() {
  if (rest < 600000) {
    rest += 60000;
    y += 60000;
    updateClock();
  }	
}

function filler(deadline) {
  if (isRunning) {
    var fillHeight = ((x / 1000) - (deadline / 1000)) * heightOfDiv / (x / 1000);
    document.getElementById('fill').style.height = fillHeight + 'px';  
  }  
}

function restFiller(rest) {
  if (isRunning) {
    var fillHeight = ((y / 1000) - (rest / 1000)) * heightOfDiv / (y / 1000);
    document.getElementById('fill').style.height = fillHeight + 'px';  
  }  
}

// controls

document.getElementById('clock').onclick = function() {
	if (!isRunning) {
  	timeInterval = setInterval(updateClock, 1000);
    isRunning = true;
  } else {
  	clearInterval(timeInterval);
    isRunning = false;
  }
};

document.getElementById('incSession').onclick = function() {
  if (!isRunning) {
    sessTimeUp();
  }
};

document.getElementById('decSession').onclick = function() {
  if (!isRunning) {
    sessTimeDown();
  }  
};

document.getElementById('incBreak').onclick = function() {
  if (!isRunning) {
    breakTimeUp();
  }  
};

document.getElementById('decBreak').onclick = function() {
  if (!isRunning) {
    breakTimeDown();
  }  
};

document.getElementById("reset").onclick = function() {

  if (isRunning) {
    clearInterval(timeInterval);
    deadline = x;
    rest = y;
    restFiller(rest);
    filler(deadline);
    isRunning = false;
  }  
  
  updateClock();
};

// variables

var deadline = 25 * 60 * 1000, //default session length is twenty five minutes.
    rest = 5 * 60 * 1000,     //default rest period is five minutes
    isRunning = false,
    onBreak = false,
    deadlineCounter = 0,
    restCounter = 0,
    x = deadline,
    y = rest;

var clockDiv = document.getElementById('clock');
var heightOfDiv = parseInt(window.getComputedStyle(clockDiv, null).getPropertyValue("height"));

// initialisation

updateClock();