
var theKey = '&appid=7186d29486a92674ca72445a6647a5da';
var forecastKey = '&appid=02030ca0eb5b5e7aaff9dd68df90090b'
var theURL = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=';
var theMultiURL = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/onecall?';

var dayCounter = 1;



$('#search-btn').click(function(){
    
    var theCity = $("#search-bar").val();
    var queryURL = theURL + theCity + theKey
    
    
    console.log(queryURL)

    $.ajax({
        url: queryURL,
        crossDomain: true,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
            }
      }).then(function (Response) {
            
            var long = Response.coord.lon;
            var lat = Response.coord.lat;   

            var theCoord = 'lat=' + lat + '&lon=' + long;
            var queryMultiURL = theMultiURL + theCoord + forecastKey;

            var theTemp = Response.main.temp
            var theHumid = Response.main.humidity
            var theWind = Response.wind.speed
            
            $('#Temp').text('Temperature ' + theTemp);
            $('#Humid').text('Humidity ' + theHumid);
            $('#Wind').text('Wind Speed ' + theWind);


            
            $.ajax({
                url: queryMultiURL,
                crossDomain: true,
                method: "GET",
                contentType: "application/json",
                dataType: "json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin":"*"
                    }
            }).then(function (forecast) {
                
                for(var i = 0;i < 5;i++)
                {
                    var theDay = moment().add(dayCounter, 'days').format('L');

                    $('#day-' + dayCounter + '-title').text(theDay);
                    

                    dayCounter++
                }
                console.log(forecast)
            });
      });


    });