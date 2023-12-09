// Initialize and add the map
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");


  
  var dublin = new google.maps.LatLng(53.33306, -6.24889);

  map = new google.maps.Map(document.getElementById('map'), {
      center: dublin,
      zoom: 10,
      mapId: "DEMO_MAP_ID",
    });

    var request = {
        location: dublin,
        radius: '1500000',
        type: ['gym']
    };


    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

async function callback(results, status) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        const lat = results[i].geometry.location.lat()
        const long = results[i].geometry.location.lng()

        var place = new google.maps.LatLng(lat, long);

        const marker = new AdvancedMarkerElement({
            map: map,
            position: place,
            title: results[i].name,
          });

        
      }
    }
  }