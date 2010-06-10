var GEO = function() {
    // some basic config
    var tivoli = new google.maps.LatLng(38.655750, -90.303367);
  
    var map = null;

    var updateCoordinates = function(position) {
        var coords = position.coords;
        
        // update the server
        //TODO 
        // $.post ...

        // update the user display
        $("#latitude").text(coords.latitude);
        $("#longitude").text(coords.longitude);
        $("#accuracy").text(coords.accuracy);
        $("#altitude").text(coords.altitude);
        $("#altitudeAccuracy").text(coords.altitudeAccuracy);
        $("#heading").text(coords.heading);
        $("#speed").text(coords.speed);

        // update the google map to the user's current location
        var latlog = new google.maps.LatLng(coords.latitude, coords.longitude);
        var markert = new google.maps.Marker({
            position: latlog, 
            map: map, 
            title: "My Position"
        });
        map.setCenter(latlog);

        var infowindow = new google.maps.InfoWindow({
            content: coords.latitude
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    };

    return {
        init: function() {
            // initialize the google map to point at the Tivoli theater
            var mapOptions = {
                zoom: 14,
                center: tivoli,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: true
            };
            map = new google.maps.Map(document.getElementById("mapcanvas"), 
                                      mapOptions);

            new google.maps.Marker({
                position: tivoli, 
                map: map, 
                title: "StrangeLoop @ Landmark Tivoli Theatre"
            });
        },

        // ensure that the web browser has support for HTML5 Geolocation
        checkGeo: function() {
            var supported = !!navigator.geolocation;
            if (!supported) {
                $("#errorBox").html('HTML5 geolocation is not available in this browser. Try again with a ' +
                                    '<a href="http://www.google.com/chrome">modern browser</a>').show();
            }
            return supported;
        },

        // query the browser for the geolocation and notify all interested parties
        findPosition: function() {
            if (this.checkGeo()) {
                var geoOptions = {maximumAge: 75000, enableHighAccuracy: true};
                var geoError = function() {};
                navigator.geolocation.getCurrentPosition(updateCoordinates, 
                                                         geoError, 
                                                         geoOptions);
            }
        },
        

    }
}(); // yahoo module pattern

var TWITTER_OPTIONS = {
    version: 2,
    type: 'search',
    search: '#strangegeo',
    interval: 6000,
    title: 'twitter',
    subject: '#strangegeo',
    width: 200,
    height: 200,
    theme: {
        shell: {
            background: '#282828', //#8ec1da
            color: '#ffffff'
        },
        tweets: {
            background: '#ffffff',
            color: '#444444',
            links: '#1985b5'
        }
    },
    features: {
        scrollbar: false,
        loop: true,
        live: true,
        hashtags: true,
        timestamp: true,
        avatars: true,
        behavior: 'default'
    }
}

$(document).ready(function(){
    GEO.init();
    GEO.findPosition();

});