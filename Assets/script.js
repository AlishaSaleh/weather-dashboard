$(document).ready(function () {



    var cityArr = [];
    var searchInput = $("#searchInput");
    var city = "london";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&exclude=hourly&appid=fb4315cea4eb938c59ecfe1bbed51784&units=metric";

    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=fb4315cea4eb938c59ecfe1bbed51784&units=metric";
    var lat = "";
    var lon = "";

    console.log(queryURL);



    function callAPIs() {




        // city = searchInput.val().trim();
        console.log(city);

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            console.log(response.city.name);
            // Current day 
            $("#cityWeather").text("Today's Weather in " + response.city.name)
            var today = moment().format("L");
            $("#todayDate").text(today);

            console.log(response.list[0].weather[0].icon);
            $("#weatherIcon").attr("src", "http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png");

            console.log(response.list[0].main.temp);
            $("#cityTemp").text("Temperature: " + response.list[0].main.temp + "°C");

            console.log(response.list[0].main.humidity);
            $("#cityHumid").text("Humidity: " + response.list[0].main.humidity + "%");

            console.log(response.list[0].wind.speed);
            $("#cityWind").text("Wind Speed: " + response.list[0].wind.speed + "mph");

            console.log(response.city.coord.lat);
            console.log(response.city.coord.lon);
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

            //iterate through the 40 weather data sets
            for (var i = 0; i < response.list.length; i++) {
                $("#tempDay" + dayNum).text("Temperature: " + response.list[i].main.temp + "°C");
                $("#humidDay"+ dayNum).text("Humidity: " + response.list[i].main.humidity + "%");
                $("#iconDay" + dayNum).attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                dayNum++;

            }


                $.ajax({
                    url: queryURL2,
                    method: "GET",
                }).then(function (response2) {
                    console.log(response2);

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