$(document).ready(function () {

    var cityArr = [];
    var searchInput = $("#searchInput");
    var city = "";

    var lat = "";
    var lon = "";

    function callAPIs() {
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&exclude=hourly&appid=fb4315cea4eb938c59ecfe1bbed51784&units=metric";

        console.log(queryURL);


        // city = searchInput.val().trim();
        console.log(city);

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            
            // Current day 
            $("#cityWeather").text("Today's Weather in " + response.city.name)
            var today = moment().format("L");
            $("#todayDate").text(today);

            // Today's weather info
            $("#weatherIcon").attr("src", "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");
            $("#cityTemp").text("Temperature: " + response.list[0].main.temp + "°C");
            $("#cityHumid").text("Humidity: " + response.list[0].main.humidity + "%");
            $("#cityWind").text("Wind Speed: " + response.list[0].wind.speed + "mph");

            // console.log(response.city.coord.lat);
            // console.log(response.city.coord.lon);
            lat = response.city.coord.lat;
            lon = response.city.coord.lon;

            // Next 5 days
            // dates

            $("#dateDay1").text(moment().add(1, "days").format("L"));
            $("#dateDay2").text(moment().add(2, "days").format("L"));
            $("#dateDay3").text(moment().add(3, "days").format("L"));
            $("#dateDay4").text(moment().add(4, "days").format("L"));
            $("#dateDay5").text(moment().add(5, "days").format("L"));


            var dayNum = 0;

            // for loop to go through the response length
            for (var i = 0; i < response.list.length; i++) {
                $("#tempDay" + dayNum).text("Temperature: " + response.list[i].main.temp + "°C");
                $("#humidDay" + dayNum).text("Humidity: " + response.list[i].main.humidity + "%");
                $("#iconDay" + dayNum).attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                dayNum++;

            }

            var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=fb4315cea4eb938c59ecfe1bbed51784&units=metric";

            $.ajax({
                url: queryURL2,
                method: "GET",
            }).then(function (response2) {
                console.log(response2);
                var uvIndex = response2.current.uvi;
                $("#uvBadge").text("UV index: " + uvIndex);
                // if statement for the UV index colour 
                if (uvIndex < 3) {
                    $("#uvBadge").attr("class", "badge bg-success");
                }
                else if (uvIndex > 3 && uvIndex < 7) {
                    $("#uvBadge").attr("class", "badge bg-warning text-dark");
                }
                else {
                    $("#uvBadge").attr("class", "badge bg-danger");
                }


            });
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
        console.log(cityArr);

        callAPIs();
        storeCities();

    });

    // Function that stores the "cities" array in local storage
    function storeCities() {
        localStorage.setItem("cityArr", JSON.stringify(cityArr));
    };

    function restoreCities() {
        var cityHistory = JSON.parse(localStorage.getItem("cityArr"));

        if (cityHistory) {
            cityArr = cityHistory;
        }
        console.log(cityHistory)
        createHistory(cityHistory)
        //call function that turns the cityHistory into buttons here
        //loop
        // for(var i = 0; i < cityHistory.length; i++) {

        // }
    };

    function createHistory(arr) {
        restoreCities();
        // make the function for creating items
        //bootstrap list groups
        //event listener - wrapped around the list items
        


    }

});