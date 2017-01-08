/**
 * Created by sibi on 1/6/2017.
 */
var app=angular.module("mapsapp",[]);
app.controller("mapsctrl",function ($scope,$http) {
    var location1={};
var location2={};
    //var directionsService={};
    var directionsDisplay={};
    $scope.lat = [];
    $scope.lng = [];
    $scope.name = [];
    $scope.initialize = function () {           //Initializing map with directions
        navigator.geolocation.getCurrentPosition(function (location) {          //Current location method (geolocation)
            map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(37.785636, -122.397119),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 9
            });

            location2 = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)            //Using Users current coordinates
            location1 = new google.maps.LatLng(37.785636, -122.397119);         //ClickTime office coordinates
            var directionsService = new google.maps.DirectionsService();

            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

            var request = {
                origin: location2,
                destination: location1,

                travelMode: google.maps.TravelMode["WALKING"]
            };
            directionsService.route(request, function (response, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(response);          //Directions in map
                    $scope.textdir = response.routes[0].legs[0];
                    //console.log($scope.textdir)
                    for (i = 0; i < $scope.textdir.steps.length; i++) {

                        $("#directions").append("<li>" + $scope.textdir.steps[i].instructions + "</li>");       //Directions in words
                    }

                }
            });


        });
    }
    $scope.initialize();
    $scope.walking = function () {          //Walking mode function
        var checkboxArray = document.getElementById('middle').value;
        //console.log(checkboxArray)
        if (checkboxArray||checkboxArray.value!=null ) {
console.log('a')
            $scope.dir();

    }else{
            console.log('b')
            navigator.geolocation.getCurrentPosition(function (location) {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(37.785636, -122.397119),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 8
                });

                location2 = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
                location1 = new google.maps.LatLng(37.785636, -122.397119);
                var directionsService = new google.maps.DirectionsService();


                directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(map);


                var request = {
                    origin: location2,
                    destination: location1,

                    travelMode: google.maps.TravelMode["WALKING"]
                };
                directionsService.route(request, function (response, status) {
                    if (status == 'OK') {
                        directionsDisplay.setDirections(response);
                        $scope.textdir = response.routes[0].legs[0];
                        //console.log($scope.textdir)
                        for (i = 0; i < $scope.textdir.steps.length; i++) {

                            $("#directions").append("<li>" + $scope.textdir.steps[i].instructions + "</li>");
                        }

                    }
                });


            });   //console.log(data)

        }
    }
    $scope.cycling = function () {          //Cycle mode function
        var checkboxArray = document.getElementById('middle').value;
        //console.log(checkboxArray)
        if (checkboxArray||checkboxArray.value!=null ) {
            console.log('a')
            $scope.dir();

        }else {

            navigator.geolocation.getCurrentPosition(function (location) {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(37.785636, -122.397119),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 8
                });

                location2 = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
                location1 = new google.maps.LatLng(37.785636, -122.397119);
                var directionsService = new google.maps.DirectionsService();


                directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(map);


                var request = {
                    origin: location2,
                    destination: location1,

                    travelMode: google.maps.TravelMode["BICYCLING"]
                };
                directionsService.route(request, function (response, status) {
                    if (status == 'OK') {
                        directionsDisplay.setDirections(response);
                        $scope.textdir = response.routes[0].legs[0];
                        //console.log($scope.textdir)
                        for (i = 0; i < $scope.textdir.steps.length; i++) {

                            $("#directions").append("<li>" + $scope.textdir.steps[i].instructions + "</li>");
                        }

                    }
                });


            });   //console.log(data)

        }
    }
    $scope.transit = function () {          //Transit mode function
        var checkboxArray = document.getElementById('middle').value;
        //console.log(checkboxArray)
        if (checkboxArray||checkboxArray.value!=null ) {
            console.log('a')
            $scope.dir();

        }else {
            navigator.geolocation.getCurrentPosition(function (location) {
                map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(37.785636, -122.397119),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 8
                });

                location2 = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
                location1 = new google.maps.LatLng(37.785636, -122.397119);
                var directionsService = new google.maps.DirectionsService();


                directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(map);


                var request = {
                    origin: location2,
                    destination: location1,

                    travelMode: google.maps.TravelMode["TRANSIT"]
                };
                directionsService.route(request, function (response, status) {
                    if (status == 'OK') {
                        directionsDisplay.setDirections(response);
                        $scope.textdir = response.routes[0].legs[0];
                        //console.log($scope.textdir)
                        for (i = 0; i < $scope.textdir.steps.length; i++) {

                            $("#directions").append("<li>" + $scope.textdir.steps[i].instructions + "</li>");
                        }

                    }
                });


            });   //console.log(data)
        }

    }

$scope.coffeeshops=function () {            //Nearby coffee shops function

        navigator.geolocation.getCurrentPosition(function (location) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 10
            });
            var coffee = $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
                "location=" + location.coords.latitude + "," + location.coords.longitude + "&radius=50000&keyword=coffee&key=AIzaSyAsM05Ht2GXfjRyiYNnamdYZyhW3_M_dZk")
            coffee.success(function (data) {
                for (var i = 0; i < data.results.length; i++) {
                    $scope.lat = data.results[i].geometry.location.lat;
                    $scope.lng = data.results[i].geometry.location.lng;
                    $scope.name = data.results[i].name+'<br>'+data.results[i].vicinity;
                    var location = new google.maps.LatLng($scope.lat, $scope.lng);
                    addMarker(map, name, location);
                }
                function addMarker() {
                    var marker = new google.maps.Marker({
                        position: location,
                        title: $scope.name,
                        animation: google.maps.Animation.DROP,
                        map: map

                    })
                    var infowindow = new google.maps.InfoWindow({
                        content: $scope.name

                    })
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });
                }
            })
        });

    }


    $scope.donutshops=function () {             //Nearby donut shops function

        navigator.geolocation.getCurrentPosition(function (location) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 10
            });
            var donut = $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
                "location=" + location.coords.latitude + "," + location.coords.longitude + "&radius=50000&keyword=donut&key=AIzaSyAsM05Ht2GXfjRyiYNnamdYZyhW3_M_dZk")
            donut.success(function (data) {
                for (var i = 0; i < data.results.length; i++) {
                    $scope.lat = data.results[i].geometry.location.lat;
                    $scope.lng = data.results[i].geometry.location.lng;
                    $scope.name = data.results[i].name+'<br>'+data.results[i].vicinity;
                    var location = new google.maps.LatLng($scope.lat, $scope.lng);
                    addMarker(map, name, location);
                }
                function addMarker() {
                    var marker = new google.maps.Marker({
                        position: location,
                        title: $scope.name,
                        animation: google.maps.Animation.DROP,
                        map: map

                    })
                    var infowindow = new google.maps.InfoWindow({
                        content: $scope.name

                    })
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });
                }
            })
        });

    }

$scope.dir=function () {            //Adding third location (waypoint)
    navigator.geolocation.getCurrentPosition(function (location) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(37.785636, -122.397119),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 8
        });

        location2 = new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
        location1 = new google.maps.LatLng(37.785636, -122.397119);
        var directionsService = new google.maps.DirectionsService();

        var directionsDisplay = new google.maps.DirectionsRenderer();

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: {lat: 37.785636, lng: -122.397119}
        });
        directionsDisplay.setMap(map);
        var waypts = [];
        var checkboxArray = document.getElementById('middle').value;
console.log(checkboxArray)
        if (checkboxArray != null) {

            waypts.push({
                location: checkboxArray,
                stopover: true
            });
        }
var type1=document.getElementById("walk");
        var type2=document.getElementById("cycle");
        var type3=document.getElementById("bus");
        if(type1.checked){
        directionsService.route({
            origin: location2,
            destination: location1,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: type1.value
        }, function (response, status) {
            $scope.arr = [];
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                $scope.textdir = response.routes[0].legs[0];
                //console.log($scope.textdir)
                for (i = 0; i < $scope.textdir.steps.length; i++) {

                    $("#directions").append("<li>" + $scope.textdir.steps[i].instructions + "</li>");
                }
                //console.log($scope.arr)
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });}
        else if(type2.checked){
            directionsService.route({
                origin: location2,
                destination: location1,
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: type2.value
            }, function (response, status) {
                $scope.arr = [];
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    $scope.textdir = response.routes[0].legs[0];
                    //console.log($scope.textdir)
                    for (i = 0; i < $scope.textdir.steps.length; i++) {

                        $("#directions").append("<li>" + $scope.textdir.steps[i].instructions + "</li>");
                    }
                    //console.log($scope.arr)
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });}
        else if(type3.checked){
            directionsService.route({
                origin: location2,
                destination: location1,
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: type3.value
            }, function (response, status) {
                $scope.arr = [];
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    $scope.textdir = response.routes[0].legs[0];
                    //console.log($scope.textdir)
                    for (i = 0; i < $scope.textdir.steps.length; i++) {

                        $("#directions").append("<li>" + $scope.textdir.steps[i].instructions + "</li>");
                    }
                    //console.log($scope.arr)
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });}else{           //default is WALKING
            directionsService.route({
                origin: location2,
                destination: location1,
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: "WALKING"
            }, function (response, status) {
                $scope.arr = [];
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    $scope.textdir = response.routes[0].legs[0];
                    //console.log($scope.textdir)
                    for (i = 0; i < $scope.textdir.steps.length; i++) {

                        $("#directions").append("<li>" + $scope.textdir.steps[i].instructions + "</li>");
                    }
                    //console.log($scope.arr)
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
    });
}
$scope.reload=function () {         //Reset function
    location.reload();
}

})

