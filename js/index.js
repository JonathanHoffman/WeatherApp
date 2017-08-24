$(document).ready(function() {
  // app state
  var temp = "--";
  var city = "--";
  var cond = "--";
  var unit = "C";
  updateLabels();
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      var apiUrl = new URL('https://fcc-weather-api.glitch.me/api/current');
      apiUrl.searchParams.append("lon", position.coords.longitude);
      apiUrl.searchParams.append("lat", position.coords.latitude);
      var imgUrl = new URL('https://source.unsplash.com/featured');
      
      $.getJSON(apiUrl, function(data) {
        city = data.name;
        temp = data.main.temp;
        cond = data.weather[0].main;
        updateLabels();
        imgUrl.search = cond;
        console.log(imgUrl.toString());
        $('.background').css('background-image','url(' + imgUrl.toString() + ')');
      });
    });
  } else {
    // what to do if the navigator is not available 
  }
  
  // When the Unit span is clicked
  $('#unit').click(function() {
    if (unit == 'C') {
      unit = 'F'
      temp = temp * 1.8 + 32;
    } else {
      unit = 'C'
      temp = (temp - 32) / 1.8
    }
    updateLabels();
  });
  
  // Helper function for updating labels, keeping the DOM in sync with app state. 
  function updateLabels() {
    $('#city').text(city);
    isNaN(temp) ? $('#temp').text(temp) : $('#temp').text(Math.round(temp));
    $('#cond').text(cond);
    $('#unit').text(unit);
  }
});