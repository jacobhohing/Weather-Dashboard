
var theKey = '&appid=7186d29486a92674ca72445a6647a5da&units=imperial';
var forecastKey = '&appid=02030ca0eb5b5e7aaff9dd68df90090b&units=imperial'

var theURL = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=';
var theMultiURL = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/onecall?';

var dayCounter = 1;
var searches = [];
var searchCount = 0
var refreshCheck = 0

renderSearch()

function renderSearch() {
    
    var searchList = document.querySelector("#prev-searches"); 
    searchList.innerHTML = '';
    
    var storedSearches = JSON.parse(localStorage.getItem("searches"));
    if (storedSearches !== null) {
        
        searches = storedSearches;

        if (refreshCheck == 0)
        {
            var thePos = searches.length - 1
            
    
            var theLast = searches[thePos]   
            render(theLast);
            refreshCheck = 1
        }


      }

      for (var i = 0; i < searches.length; i++) {
        var theSearch = searches[i];
    
        var li = document.createElement("li");
        li.textContent = theSearch;
        li.className = "list-group-item";
        searchList.appendChild(li);

      }
  }

$('#search-btn').click(function(){
    var theType = 'Search'
    refreshCheck = 1

    render(theType);

})

$(document).on('click', 'li', function(){

    refreshCheck = 1
    
    var theType = $(this).text()
    render(theType);
})

function render(type) {
    
    if (type == 'Search')
    {
        var theCity = $("#search-bar").val();
    }
    else
    {
        var theCity = type;
    }

    $('#UV').empty();
    var queryURL = theURL + theCity + theKey

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
            
            
            // var theSearchNumber = parseInt(searchCount) + 1

            if (type == 'Search')
            {
                searches.push(Response.name);
                localStorage.setItem("searches", JSON.stringify(searches));
                renderSearch()
            }
           
        
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
                    $('#day-' + dayCounter + '-weather').empty();

                    var theDay = moment().add(dayCounter, 'days').format('L');
                    
                    var weather = forecast.daily[i].weather[0].main;
                    var weatherIcon = $("<i>");
                    var castTemp = forecast.daily[i].temp.day;
                    var castHumid = forecast.daily[i].humidity;

      
                   

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
                    else
                    {
                        weatherIcon.addClass("fas fa-sun")
                    }
                    
                   

                    $('#day-' + dayCounter + '-title').text(theDay);
                    $('#day-' + dayCounter + '-weather').append(weatherIcon);
                    $('#day-' + dayCounter + '-temp').text('Temperature: ' + castTemp  + ' F°');
                    $('#day-' + dayCounter + '-humidity').text('Humidity: ' + castHumid);




                    dayCounter++
                }

                dayCounter = 1
                
            });
      });


    };