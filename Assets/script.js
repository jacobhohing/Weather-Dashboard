
var theKey = '&appid=7186d29486a92674ca72445a6647a5da';
var theURL = 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=';

$('#search-btn').click(function(){
    
    var theCity = $("#search-bar").val();
    var queryURL = theURL + theCity + theKey
    
    $("#holder").html("");

    console.log(queryURL)

    $.ajax({
        url: queryURL,
        method: "GET",
        contentType: "application/json",
        dataType: "json",
      }).then(function (Response) {
            console.log(Response)
      });
    });