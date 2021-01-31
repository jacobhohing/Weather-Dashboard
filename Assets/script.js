
var theKey = '&appid=7186d29486a92674ca72445a6647a5da&units=imperial';
var forecastKey = '&appid=02030ca0eb5b5e7aaff9dd68df90090b&units=imperial'

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

            var today = moment().toString() 
            var theTemp = Response.main.temp
            var theHumid = Response.main.humidity
            var theWind = Response.wind.speed
            
            var todayWeather = Response.weather[0].main
            var weatherIcon = $("<i>");

            console.log(todayWeather)

            if (todayWeather == 'Snow')
            {
                weatherIcon.addClass("far fa-snowflake")
            }
            else if (todayWeather == 'Clouds')
            {                        
                weatherIcon.addClass("fas fa-cloud")
            }
            else if (todayWeather == 'Rain')
            {
                weatherIcon.addClass("fas fa-cloud-rain")
            }
            else if (todayWeather == 'Clear')
            {
                weatherIcon.addClass("fas fa-sun")
            }
            else
            {
                weatherIcon.addClass("fas fa-sun")
            }           
            
            $('#theTitle').text(' ' + Response.name + ' ( ' + today + ' ) '); 
            $('#theTitle').prepend(weatherIcon);
            $('#Temp').text('Temperature ' + theTemp + ' F°');
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
                
                var UVBadge = $("<span>");
                
                if (forecast.current.uvi <= 2)
                {
                    UVBadge.addClass("badge bg-primary")
                }
                else if (todayWeather <= 5)
                {                        
                    UVBadge.addClass("badge bg-warning")
                }
                else
                {
                    UVBadge.addClass("badge bg-danger")
                }

                UVBadge.text('UV: ' + forecast.current.uvi);
                $('#UV').append(UVBadge);
               
                for(var i = 0;i < 5;i++)
                {
                    var theDay = moment().add(dayCounter, 'days').format('L');
                    
                    var weather = forecast.daily[i].weather[0].main;
                    var weatherIcon = $("<i>");
                    var castTemp = forecast.daily[i].temp.day;
                    var castHumid = forecast.daily[i].humidity;

                    var currentUV = forecast.daily[i].humidity;

                    console.log(forecast)
                   

                    if (weather == 'Snow')
                    {
                        weatherIcon.addClass("far fa-snowflake")
                    }
                    else if (weather == 'Clouds')
                    {                        
                        weatherIcon.addClass("fas fa-cloud")
                    }
                    else if (weather == 'Rain')
                    {
                        weatherIcon.addClass("fas fa-cloud-rain")
                    }
                    else if (weather == 'Clear')
                    {
                        weatherIcon.addClass("fas fa-sun")
                    }
                    
                   

                    $('#day-' + dayCounter + '-title').text(theDay);
                    $('#day-' + dayCounter + '-weather').append(weatherIcon);
                    $('#day-' + dayCounter + '-temp').text('Temperature: ' + castTemp  + ' F°');
                    $('#day-' + dayCounter + '-humidity').text('Humidity: ' + castHumid);




                    dayCounter++
                }
                
            });
      });


    });