
(function() {

    // Make DOM elements available for JavaScript use
    let numInputHrs = document.getElementById('num-input-hrs'),
        numInputMins = document.getElementById('num-input-mins'),
        numInputSecs = document.getElementById('num-input-secs'),
  // Output to this element
        numSecsInputHrs = document.getElementById('num-secs-hrs'),
    targetPaceSecs = document.getElementById('target-pace-secs'),
    targetPaceMins = document.getElementById('target-pace-mins')    
        ;
    
   
    // Add event listeners for each number input 
    // Assign appropriate reference function
    
    numInputHrs.addEventListener("change", updateHrsSecs);
    numInputMins.addEventListener("change", updateHrsSecs);
    numInputSecs.addEventListener("change", updateHrsSecs);
  
    
    // Convert inputs to Seconds
    function updateHrsSecs(e) {
      e.preventDefault()
      let hrsMins = getMins(parseInt(numInputHrs.value)),
          hrsMinsToAdd = getMins(parseInt(numInputMins.value)),
          hrsSecs = getSecs(hrsMins);
      let hrsSecsToAdd = parseInt(numInputSecs.value);
      hrsSecs = hrsSecs + hrsMinsToAdd + hrsSecsToAdd;
      console.log('hrsMins', hrsMins, 'hrsSecs', hrsSecs, 'Extra Mins', hrsMinsToAdd, 'Extra Secs', hrsSecsToAdd);
      numSecsInputHrs.value = flattenNum(hrsSecs);
      targetPaceSecs.innerHTML = flattenNum(hrsSecs);
      targetPaceMins.innerHTML = flattenNum(hrsSecs);
    }
  })()
  
  
  //Rounds up every time
  function flattenNum(num) {
    return Math.ceil(num)
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