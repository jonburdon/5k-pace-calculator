
(function() {

    // Make DOM elements available for JavaScript use
    let numInputHrs = document.getElementById('num-input-hrs'),
        numInputMins = document.getElementById('num-input-mins'),
        numInputSecs = document.getElementById('num-input-secs'),
        distanceInputKm = document.getElementById('distance-input'),
        unitsInput = document.getElementById('units-input'),
  // Output to this element
        numSecsInputHrs = document.getElementById('num-secs-hrs'),
    targetPaceSecs = document.getElementById('target-pace-secs'),
    targetPaceMins = document.getElementById('target-pace-mins'),
    unitsSelected = document.getElementById('units-display'),
    unitsSelectedForPace = document.getElementById('units-display-pace'),
    distanceSelected = document.getElementById('distance-display');
    
    // Add event listeners for each number input 
    // Assign appropriate reference function
    
    numInputHrs.addEventListener("change", updateHrsSecs);
    numInputMins.addEventListener("change", updateHrsSecs);
    numInputSecs.addEventListener("change", updateHrsSecs);
    distanceInputKm.addEventListener("change", updateHrsSecs);
    unitsInput = addEventListener("change", updateHrsSecs);

    // Convert inputs to Seconds
    function updateHrsSecs(e) {
      e.preventDefault()
      let hrsMins = getMins(parseInt(numInputHrs.value)),
          hrsMinsToAdd = getMins(parseInt(numInputMins.value)),
          hrsSecs = getSecs(hrsMins);
      let hrsSecsToAdd = parseInt(numInputSecs.value);
      let distanceToRun = distanceInputKm.value;
      hrsSecs = hrsSecs + hrsMinsToAdd + hrsSecsToAdd;
      // Check Units
      let unitsChosen = "km", paceUnitsChosen = "km";
      if (document.getElementById('units-input').checked) {
        unitsChosen = "Miles";
        paceUnitsChosen = "Mile";
        hrsSecs = hrsSecs*1.609;
    } else {
        unitsChosen = "Km";
        paceUnitsChosen = "Km";
    }

      console.log('hrsMins', hrsMins, 'hrsSecs', hrsSecs, 'Extra Mins', hrsMinsToAdd, 'Extra Secs', hrsSecsToAdd, 'Distance: ', distanceToRun);
      numSecsInputHrs.value = roundDownNum(hrsSecs);
      targetPaceMins.innerHTML = roundDownNum((hrsSecs/distanceToRun)/60);
      targetPaceSecs.innerHTML = justSeconds((hrsSecs/distanceToRun)/60);
      distanceSelected.innerHTML = distanceToRun;
      unitsSelected.innerHTML = unitsChosen;
      unitsSelectedForPace.innerHTML = paceUnitsChosen;
    }
  })()

  //Rounds up every time
  function flattenNum(num) {
    return Math.ceil(num);
  }
  // Round down
  function roundDownNum(num) {
    return Math.floor(num);
//      return(num);
  }

  function justSeconds(num) {
    let minutespart = Math.floor(num);
    let secondspart = Math.floor((num - minutespart)*60);
    return secondspart;
  }

  function getMos(num) {
    return num * 12;
  }
  function getDys(num) {
    return num * (365/12); // 30.41666666666667;
  }
  function getHrs(num) {
    return num * 24;
  }
  function getMins(num) {
    return num * 60;
  }
  function getSecs(num) {
    return num * 60;
  }