$(document).ready(function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            $.ajax({
                url: 'https://api.wunderground.com/api/e29bbac600195f5f/geolookup/q/autoip.json',
                dataType: "jsonp",
                success: function(parsed_json) {
                    var city = parsed_json['location']['city'];
                    var state = parsed_json['location']['state'];
                    var cityWU = city.replace(/\s/g, '_');

                    $.ajax({
                        url: 'https://api.wunderground.com/api/e29bbac600195f5f/geolookup/conditions/forecast/q/' +
                            lat + ',' + lon + '.json',
                        dataType: "jsonp",
                        success: function(parsed_json) {
                            var temp_F = parsed_json['current_observation']['temp_f'];
                            var temp_C = parsed_json['current_observation']['temp_c'];
                            var icon = parsed_json['current_observation']['icon_url'];
                            var desc = parsed_json['current_observation']['weather'];
                            var cityName = parsed_json['current_observation']['display_location']['full'];

                            $("#cityName").html(cityName);
                            $("#weatherDes").html(desc);
                            $("#weatherIcon").html("<img src = '" + icon + "'>");

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

                }
            });
        });
    }
});