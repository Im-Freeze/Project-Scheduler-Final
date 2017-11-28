var minimumDays = 25,
player = GetPlayer(),
end,
days,
stageDuration = [],
stageDates,
percentageArray = [.3, .2, .4, .1];


function projectSchedule() {
  assignValues();
  dateDifference();
  if (!longEnough()) {
    player.SetVar('wrongDates', 'true');
    return alert('Your date range is either too short or out of order');
  } else {
    player.SetVar('wrongDates', 'false');
    setDays();
    setDates();
    adjustDates();
  }
}


function assignValues () {
  startDate = new Date (player.GetVar("startDate"));
  if (startDate.getDay() === 6) {
    startDate.setDate(startDate.getDate() + 2);
  } else if (startDate.getDay() === 0) {
    startDate.setDate(startDate.getDate() + 1);
  }
  end = player.GetVar("end");
  stageDates = [new Date(startDate)];
}

function dateDifference() {
  var s = new Date(startDate),
  e = new Date(end);

  s.setHours(12,0,0,0);
  e.setHours(12,0,0,0);

  var totalDays = Math.round((e - s) / 8.64e7),
  wholeWeeks = totalDays / 7 | 0;

  days= wholeWeeks * 5;

  if (totalDays % 7) {
    s.setDate(s.getDate() + wholeWeeks * 7);

    while (s < e) {
      s.setDate(s.getDate() + 1);

      if (s.getDay() != 0 && s.getDay() != 6) {
        ++days;
      }
    }
  }
  player.SetVar('workingDays', days);
  return days;
}

function longEnough() {
  if (days < minimumDays) {
    return false;
  } else {
    return true;
  }
}

function setDays () {
  for (var i = 0; i < percentageArray.length; i++) {
    stageDuration[i] = Math.round(days * percentageArray[i]);
  }
  return stageDuration;
}


  function setDates () {
    for (var k = 1, m = 0; k < stageDuration.length; k++, m++) {
      stageDates[k] = findEnd(stageDates[m], stageDuration[m]);
      }
    return stageDates;
  }

  function adjustDates() {
    for (var n = 0; n < stageDates.length; n++) {
      stageDates[n] = stageDates[n].toDateString();
    }
    player.SetVar('stage1', stageDates[0]);
    player.SetVar('stage2', stageDates[1]);
    player.SetVar('stage3', stageDates[2]);
    player.SetVar('stage4', stageDates[3]);
    return stageDates;
  }


function findEnd(begin, duration) {
  var newDate = new Date(begin);
  newDate.setHours(12, 0, 0, 0);
  for (var j = 0; j < duration; j++) {
    newDate.setDate(newDate.getDate() + 1);
    if (newDate.getDay() === 0 || newDate.getDay() === 6) {
      j--;
    }
  }
  return newDate;
}
