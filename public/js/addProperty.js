let addPropertyForm = document.querySelector('#add-property-form');


if(addPropertyForm) {
    addPropertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // document.getElementById('propertyImages').addEventListener('change', function(event) {
        //     // let propertyImagesErr = document.getElementById('propertyImages-error');
        //     let files = event.target.files;
        //     // let errorMessage = document.getElementById('propertyImages-error');
        //     if (files.length < 2) {
        //         propertyImagesErr.innerHTML = 'Minimum 2 images are required';
        //         propertyImagesErr.hidden = false;
        //     } else if (files.length > 5) {
        //         propertyImagesErr.innerHTML = 'Maximum 5 images are allowed';
        //         propertyImagesErr.hidden = false;
        //     } else {
        //         propertyImagesErr.hidden = true;
        //     }
        // });
        let street = document.getElementById('street').value;
        let apartmentNum = document.getElementById('apartmentNum').value;
        let city = document.getElementById('city').value;
        let state = document.getElementById('state').value;
        let zip = document.getElementById('zip').value;
        let price = document.getElementById('price').value;
        let latitude = document.getElementById('latitude').value;
        let longitude = document.getElementById('longitude').value;
        let description = document.getElementById('description').value;
        let propertyType = document.getElementById('propertyType').value;
        let apartmentType = document.getElementById('apartmentType').value;
        let accomodationType = document.getElementById('accomodationType').value;
        let area = document.getElementById('area').value;
        let bedroomCount = document.getElementById('bedroomCount').value;
        let bathroomCount = document.getElementById('bathroomCount').value;
        let nearestLandmarks = document.getElementById('nearestLandmarks').value;

        let propertyImages = document.getElementById('propertyImages').value;

        let streetErr = document.getElementById('street-error');
        let apartmentNumErr = document.getElementById('apartmentNum-error');
        let cityErr = document.getElementById('city-error');
        let stateErr = document.getElementById('state-error');
        let zipErr = document.getElementById('zip-error');
        let priceErr = document.getElementById('price-error');
        let latitudeErr = document.getElementById('latitude-error');
        let longitudeErr = document.getElementById('longitude-error');
        let descriptionErr = document.getElementById('description-error');
        let propertyTypeErr = document.getElementById('propertyType-error');
        let apartmentTypeErr = document.getElementById('apartmentType-error');
        let accomodationTypeErr = document.getElementById('accomodationType-error');
        let areaErr = document.getElementById('area-error');
        let bedroomCountErr = document.getElementById('bedroomCount-error');
        let bathroomCountErr = document.getElementById('bathroomCount-error');
        let nearestLandmarksErr = document.getElementById('nearestLandmarks-error');
        let propertyImagesErr = document.getElementById('propertyImages-error');
 
        let errorFlag = false;

        try {
            street = validateStringNew(street, 'street');
        } catch(e) {
            streetErr.hidden = false;
            streetErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            if (apartmentNum.trim() !== "") {
                apartmentNum = validateStringNew(apartmentNum, 'apartmentNum');
            } else {
                apartmentNum = "";
            }
        } catch(e) {
            apartmentNumErr.hidden = false;
            apartmentNumErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            city = validateStringNew(city, 'city');
        } catch(e) {
            cityErr.hidden = false;
            cityErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            state = validateStateName(state, 'state');
        } catch(e) {
            stateErr.hidden = false;
            stateErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let z = parseInt(zip)
            z = validateNumber(z, 'zip', true);
        } catch(e) {
            zipErr.hidden = false;
            zipErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            description = validateStringNew(description, 'description');
        } catch(e) {
            descriptionErr.hidden = false;
            descriptionErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            propertyType = validateStringNew(propertyType, 'propertyType');
        } catch(e) {
            propertyTypeErr.hidden = false;
            propertyTypeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            apartmentType = validateStringNew(apartmentType, 'apartmentType');
        } catch(e) {
            apartmentTypeErr.hidden = false;
            apartmentTypeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            accomodationType = validateStringNew(accomodationType, 'accomodationType');
        } catch(e) {
            accomodationTypeErr.hidden = false;
            accomodationTypeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            nearestLandmarks = validateStringNew(nearestLandmarks, 'nearestLandmarks');
        } catch(e) {
            nearestLandmarksErr.hidden = false;
            nearestLandmarksErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let a = parseInt(area)
            a = validateNumber(a, 'area', true);
        } catch(e) {
            areaErr.hidden = false;
            areaErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let bedC = parseInt(bedroomCount)
            bedC = validateNumber(bedC, 'bedroomCount', true);
        } catch(e) {
            bedroomCountErr.hidden = false;
            bedroomCountErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let bath = parseInt(bathroomCount)
            bath = validateNumber(bath, 'bathroomCount', true);
        } catch(e) {
            bathroomCountErr.hidden = false;
            bathroomCountErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let p = parseFloat(price)
            p = validatePrice(p, 'price');
        } catch(e) {
            priceErr.hidden = false;
            priceErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let lat = parseFloat(latitude)
            lat = validateNumber(lat, 'latitude', false);
            lat = checkDecimalValue(lat, 'latitude', 6);
        } catch(e) {
            latitudeErr.hidden = false;
            latitudeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let longi = parseFloat(longitude)
            longi = validateNumber(longi, 'longitude', false);
            longi = checkDecimalValue(longi, 'longitude', 6);
        } catch(e) {
            longitudeErr.hidden = false;
            longitudeErr.innerHTML = e;
            errorFlag = true;
        }

        if (!errorFlag) {
            streetErr.hidden = false;
            apartmentNumErr.hidden = false;
            cityErr.hidden = false;
            stateErr.hidden = false;
            zipErr.hidden = false;
            priceErr.hidden = false;
            latitudeErr.hidden = false;
            longitudeErr.hidden = false;
            descriptionErr.hidden = false;
            propertyTypeErr.hidden = false;
            apartmentTypeErr.hidden = false;
            accomodationTypeErr.hidden = false;
            areaErr.hidden = false;
            bedroomCountErr.hidden = false;
            bathroomCountErr.hidden = false;
            propertyImagesErr.hidden = false;
            addPropertyForm.submit();
        }

    })
}