function initMap() {
  let map;
  let myPosition = { lat: 0, lng: 0 };
  let start = document.getElementById('start');
  let finish = document.getElementById('finish');

  //  Autocompletado
  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(finish);

  //  Direccciones
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;

  document.getElementById('find').addEventListener('click', findMe);

  //  Mapa de inicio
  map = new google.maps.Map(document.getElementById('map'), {
    center: myPosition,
    zoom: 2
  });

  function findMe() {
    let success = ({ coords }) => {
      myPosition = { lat: coords.latitude, lng: coords.longitude };
      let image = 'assets/images/bike.png';
      let marker = new google.maps.Marker({
        position: myPosition,
        map,
        icon: image
      });
      map.setZoom(18);
      map.setCenter(myPosition);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    }
  }

  //  Imprimir ruta
  let trackRoute = () => {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    map = new google.maps.Map(document.getElementById('map')); 0
    directionsDisplay.setMap(map);
    start.value = '';
    finish.value = '';
  };

  document.getElementById('track').addEventListener('click', trackRoute);

  let calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
    directionsService.route({
      origin: start.value,
      destination: finish.value,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert(status);
      }
    });
  }
}