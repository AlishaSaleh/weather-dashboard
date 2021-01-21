$(document).ready(function () {
    
    var cityArr = [];
    var searchInput = $("#searchInput");
    

   

    function createText(text, response, string) {
        $("." + text + " ").text(" " + string + " " + response);
    }

    function callAPIs() {
        var city = "";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fb4315cea4eb938c59ecfe1bbed51784&units=metric";
    
    
        console.log(queryURL);
    
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=fb4315cea4eb938c59ecfe1bbed51784&units=metric";
        var lat = "";
        var lon = "";
        
        $("#cityWeather").text("Today's Weather in " + city);
       city = searchInput.val();
       console.log(city);

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
        });

        $.ajax({
            url: queryURL2,
            method: "GET",
        }).then(function (response) {
            console.log(response);
        });
    };

    $("button").on("click", function (event) {
        event.preventDefault();
        city = searchInput.val().trim();
        // pushes city input to an empty array
        cityArr.push(city);
        // shortens array after 8 searches
        if (cityArr.length > 8) {
            cityArr.shift()
        }
        // include a break here??

        callAPIs();

    });

    // Function that stores the "cities" array in local storage
    function storeCities() {
        localStorage.setItem("cityArr".JSON.stringify(cityArr));
    };

    function restoreCities() {
        var cityHistory = JSON.parse(localStorage.getItem("cityArr"));

        if (cityHistory !== null) {
            cityArr = cityHistory;
        }
        //call function that turns the cityHistory into buttons here
    }

});