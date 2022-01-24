
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
      var hrsMins = getMins(parseInt(numInputHrs.value)),
          hrsMinsToAdd = getMins(parseInt(numInputMins.value)),
          hrsSecs = getSecs(hrsMins);
      var hrsSecsToAdd = parseInt(numInputSecs.value);
      var distanceToRun = distanceInputKm.value;
      hrsSecs = hrsSecs + hrsMinsToAdd + hrsSecsToAdd;
      var timeForPace = hrsSecs;
      // Check Units
      let unitsChosen = "km", paceUnitsChosen = "km";

      if (document.getElementById('units-input').checked) {
        unitsChosen = "Miles";
        paceUnitsChosen = "Mile";
        timeForPace = timeForPace*1.609;
        
    } else {
        unitsChosen = "Km";
        paceUnitsChosen = "Km";
    }

      // Clear Split Times
      let splitsparent = document.getElementById("split-times-wrapper")
        while (splitsparent.firstChild) {
            splitsparent.firstChild.remove()
        }

      //Add New Split Times to wrapper
      
      // Decide if using km laps or mile maps
      let distanceInMiles = distanceToRun/1.609;
      let numberOfLaps = distanceToRun; 
      if (document.getElementById('units-input').checked) {
        numberOfLaps = distanceInMiles;
        console.log('miles are activated');
    }  


      for (let i = 0; i < numberOfLaps; i++) {
        // let splitTimes = hrsSecs;
        let splitTimes = timeForPace;
        let splittime = document.createElement("p");
        let th = roundDownNum(((splitTimes/3600)/distanceToRun)*(i+1));
        let tm = (roundDownNum((splitTimes/distanceToRun)/60))*(i+1);
        let ts = (justSeconds((splitTimes/distanceToRun)/60))*(i+1);

        // Check for fraction of distance in final lap

        if (i === roundDownNum(numberOfLaps)) {
          console.log('Final Loop!', 'and distance is', distanceToRun);
          // console.log('distance is', distanceToRun);
          // console.log('rounded distance is', roundDownNum(distanceToRun));
          let amountLeftToRun = numberOfLaps-roundDownNum(numberOfLaps);
            console.log('amount left is: ', amountLeftToRun);
          // console.log('th is', th);
          //  console.log('total secs is', hrsSecs);
          console.log('leftover seconds are', hrsSecs/(roundDownNum(numberOfLaps)));
          let remainingSecs = hrsSecs/(roundDownNum(numberOfLaps));
          //console.log('remaining secs are now:',remainingSecs);
          remainingSecs = remainingSecs*amountLeftToRun;
        console.log('remaining secs are finally:',remainingSecs);

          // Just add the value about to ts on the final loop and it should work

        th = roundDownNum(((splitTimes/3600)/distanceToRun)*(i));
        tm = (roundDownNum((splitTimes/distanceToRun)/60))*(i);
        ts = (justSeconds((splitTimes/distanceToRun)/60))*(i)+remainingSecs;
        tm = roundDownNum(tm);
        ts = roundDownNum(ts);
        }
        
        // Adjust seconds if they are over 60
        if (ts > 59) {

          //console.log('ts is over 60: ', ts, 'so tm which was ', tm);
          //console.log('needs to have this added: ' , roundDownNum((ts/60)));
          
          //console.log('tm was: ', tm);
          tm = tm+roundDownNum((ts/60));
          //console.log('tm is now: ', tm);
          //console.log('adjusting seconds... ', ts);
          let secAdjust = ts-(roundDownNum(ts/60)*60);
          //console.log('second adjustment is: ', secAdjust, 'wohoo');
          ts = secAdjust;
          //console.log('ts is now: ', ts);
        }

        // Adjust minutes if they are over 60
        if (tm > 59) {

          // console.log('WARNING: tm is over 60: ', tm, 'so th which was ', th);
          // console.log('needs to have this added: ' , roundDownNum((tm/60)));
          // console.log('th was: ', th);
          th = roundDownNum((tm/60));
          // console.log('th is now: ', th);
          // console.log('adjust minutes');
          // console.log('th is ', th, "and tm is ", tm);
          let minAdjust = th*60;
          // console.log('minAdjust is', minAdjust);
          tm = tm-minAdjust;

        }

        // Display lap info
        let lap = i+1;
        
        splittime.innerText = paceUnitsChosen + " " + lap + " Split: " + th + " h " + tm + " m " + ts + "s";
        document.getElementById("split-times-wrapper").appendChild(splittime);

      }
      // Change Text of last child in Splits
      var lastSplit = document.getElementById("split-times-wrapper").lastChild.innerHTML;
      var finalSplitMessage;
      
      console.log('Last Split: ', lastSplit);
      var selectFinalSplit = document.getElementById('split-times-wrapper');
      console.log('STUFF!!:' + selectFinalSplit.lastChild.innerText);
      lastSplit = "Final "+lastSplit; 
      selectFinalSplit.lastChild.innerText = lastSplit;
      

      console.log('hrsMins', hrsMins, 'hrsSecs', hrsSecs, 'Extra Mins', hrsMinsToAdd, 'Extra Secs', hrsSecsToAdd, 'Distance: ', distanceToRun);
      numSecsInputHrs.value = roundDownNum(hrsSecs);
      targetPaceMins.innerHTML = roundDownNum((timeForPace/distanceToRun)/60);
      targetPaceSecs.innerHTML = justSeconds((timeForPace/distanceToRun)/60);
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