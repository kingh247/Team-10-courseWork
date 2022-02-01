

$(document).ready(function(){
 $('.header').height($(window).height());
})


function initMap() {
	
    const derry = { lat: 54.9966, lng: -7.3086 };
    
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: derry,
    });

    const zone3 = new google.maps.Circle({

        center: new google.maps.LatLng(54.9966, -7.3086),
        map: map,
        strokeColor: "000000",
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: "#f6ff00",
        fillOpacity: 0.2,
        radius: 10000// in meters

    });

    const zone2 = new google.maps.Circle({

        center: new google.maps.LatLng(54.9966, -7.3086),
        map: map,
        strokeColor: "000000",
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: "#2bff00",
        fillOpacity: 0.2,
        radius: 7000// in meters

    });

    const zone1 = new google.maps.Circle({

        center: new google.maps.LatLng(54.9966, -7.3086),
        map: map,
        strokeColor: "000000",
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: "#00c3ff",
        fillOpacity: 0.2,
        radius: 3000// in meters

    });

    
    


    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");
  
    locationButton.textContent = "Check Delivery Cost";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            infoWindow.setPosition(pos);

            if(zone1.getBounds().contains( new google.maps.LatLng(pos))){
                infoWindow.setContent("Delivery is free");
            }else if(zone2.getBounds().contains( new google.maps.LatLng(pos))){
                infoWindow.setContent("Delivery is £3");
            }else if(zone3.getBounds().contains( new google.maps.LatLng(pos))){
                infoWindow.setContent("Delivery is £5");
            }else{
                infoWindow.setContent("Delivery is not available");
            }
            
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
    
}



