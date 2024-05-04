
function showMap() {
    let place = {
        lat: parseFloat(document.getElementById('lat').value),
        lng: parseFloat(document.getElementById('lng').value)
    };
    
    let propMap = new google.maps.Map(
        document.getElementById('location-map'),
        {
            zoom: 10,
            center: place
        }
    );
    
    let propMark = new google.maps.Marker({position: place, map: propMap});
}
  
