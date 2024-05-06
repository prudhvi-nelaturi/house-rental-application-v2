
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

let flag = false;
document.getElementById('leasePdf').addEventListener('click', (e)=>{
    // window.location = '/property/leasePdf';
    // document.getElementById('leasePdf').disabled = true;
    // document.getElementById('leasePdf').textContent = "Downloaded";
    let pdf = document.getElementById('leasePdf');
    if(!flag){
        pdf.disabled = true;
        window.location = '/property/leasePdf';
        flag= true;
        pdf.textContent = "Downloaded";
    }
});
