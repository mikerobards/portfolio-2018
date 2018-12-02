$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            $.ajax({
                url: "https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat,
                dataType: "jsonp",
                success: function(parsed_json) {
                    var cityName = parsed_json["name"];
                    var temp_C =
                        parsed_json["main"]["temp"].toFixed(1);
                    var temp_F = (temp_C * 1.8 + 32).toFixed(1);
                    var icon =
                        parsed_json["weather"][1]["icon"];
                    var desc = parsed_json["weather"][0]["description"];
                    console.log(icon);

                    $("#cityName").html(cityName);
                    $("#weatherDes").html(desc);
                    $("#weatherIcon").prepend("<img src = 'https://openweathermap.org/img/w/" + icon + ".png'>");

                    var tempSwitch = true;
                    $("#farh").html(temp_F + " &#8457");
                    $("#farh").click(function() {
                        if (tempSwitch === false) {
                            $("#farh").html(temp_F + " &#8457");
                            tempSwitch = true;
                        } else {
                            $("#farh").html(temp_C + " &#8451");
                            tempSwitch = false;
                        }
                    });

                }

            });
        });
    }
});