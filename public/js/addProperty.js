let addPropertyForm = document.querySelector('#add-property-form');
let editPropertyForm = document.querySelector('#edit-property-form');


if(addPropertyForm) {
    addPropertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const files = document.getElementById('images').files;

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

        // let images = document.getElementById('images').value;

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
        let imagesErr = document.getElementById('images-error');
 
        streetErr.hidden = true;
        apartmentNumErr.hidden = true;
        cityErr.hidden = true;
        stateErr.hidden = true;
        zipErr.hidden = true;
        priceErr.hidden = true;
        latitudeErr.hidden = true;
        longitudeErr.hidden = true;
        descriptionErr.hidden = true;
        propertyTypeErr.hidden = true;
        apartmentTypeErr.hidden = true;
        accomodationTypeErr.hidden = true;
        areaErr.hidden = true;
        bedroomCountErr.hidden = true;
        bathroomCountErr.hidden = true;
        nearestLandmarksErr.hidden = true;
        imagesErr.hidden = true;

        let errorFlag = false;

        if (files.length < 2) {
            imagesErr.hidden = false;
            imagesErr.innerHTML = "Upload minimum 2 images";
            errorFlag = true;
        }
        if (files.length > 5) {
            imagesErr.hidden = false;
            imagesErr.innerHTML = "Upload maximum 5 images";
            errorFlag = true;
        }

        try {
            street = validateStringNew(street, 'Street');
        } catch(e) {
            streetErr.hidden = false;
            streetErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            if (apartmentNum.trim() !== "") {
                apartmentNum = validateStringNew(apartmentNum, 'Apartment No.');
            } else {
                apartmentNum = "";
            }
        } catch(e) {
            apartmentNumErr.hidden = false;
            apartmentNumErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            city = validateStringNew(city, 'City');
        } catch(e) {
            cityErr.hidden = false;
            cityErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            state = validateStateName(state, 'State');
        } catch(e) {
            stateErr.hidden = false;
            stateErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            // let z = parseInt(zip)
            // z = validateNumber(z, 'zip', true);
            zip = validateZip(zip, 'Zip Code');
        } catch(e) {
            zipErr.hidden = false;
            zipErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            description = validateStringNew(description, 'Description');
        } catch(e) {
            descriptionErr.hidden = false;
            descriptionErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            propertyType = validatePropertyType(propertyType, 'Property Type');
        } catch(e) {
            propertyTypeErr.hidden = false;
            propertyTypeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            apartmentType = validateApartType(apartmentType, 'Apartment Type');
        } catch(e) {
            apartmentTypeErr.hidden = false;
            apartmentTypeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            accomodationType = validateAccType(accomodationType, 'Accomodation Type');
        } catch(e) {
            accomodationTypeErr.hidden = false;
            accomodationTypeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            if (nearestLandmarks.trim() !== "" && nearestLandmarks !== undefined && nearestLandmarks !== null) {
                nearestLandmarks = validateStringNew(nearestLandmarks, 'Nearest Landmarks');
            } else {
                nearestLandmarks = "";
            }
        } catch(e) {
            nearestLandmarksErr.hidden = false;
            nearestLandmarksErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let a = parseInt(area)
            a = validateNumber(a, 'Area', true);
            if(area <= 0) throw `Area must be greater than 0`
            if(area > 6000) throw `Area must be less than or equal to 6000`
        } catch(e) {
            areaErr.hidden = false;
            areaErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let bedC = parseInt(bedroomCount)
            bedC = validateNumber(bedC, 'No. of Bedrooms', true);
            if(bedC <= 0) throw `Minimum no. of bedrooms should be 1`
            if(bedC > 6) throw `Maximum no. of bedrooms can be 6`
        } catch(e) {
            bedroomCountErr.hidden = false;
            bedroomCountErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let bath = parseInt(bathroomCount)
            bath = validateNumber(bath, 'No. of Bathrooms', true);
            if(bath <= 0) throw `Minimum no. of bathrooms should be 1`
            if(bath > 6) throw `Maximum no. of bathrooms can be 6`
        } catch(e) {
            bathroomCountErr.hidden = false;
            bathroomCountErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let p = parseFloat(price)
            p = validatePrice(p, 'Price');
        } catch(e) {
            priceErr.hidden = false;
            priceErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let lat = parseFloat(latitude)
            lat = validateNumber(lat, 'Latitude', false);
            lat = checkDecimalValue(lat, 'Latitude', 6);
        } catch(e) {
            latitudeErr.hidden = false;
            latitudeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let longi = parseFloat(longitude)
            longi = validateNumber(longi, 'Longitude', false);
            longi = checkDecimalValue(longi, 'Longitude', 6);
        } catch(e) {
            longitudeErr.hidden = false;
            longitudeErr.innerHTML = e;
            errorFlag = true;
        }

        if (!errorFlag) {
            streetErr.hidden = true;
            apartmentNumErr.hidden = true;
            cityErr.hidden = true;
            stateErr.hidden = true;
            zipErr.hidden = true;
            priceErr.hidden = true;
            latitudeErr.hidden = true;
            longitudeErr.hidden = true;
            descriptionErr.hidden = true;
            propertyTypeErr.hidden = true;
            apartmentTypeErr.hidden = true;
            accomodationTypeErr.hidden = true;
            areaErr.hidden = true;
            bedroomCountErr.hidden = true;
            bathroomCountErr.hidden = true;
            imagesErr.hidden = true;
            nearestLandmarksErr.hidden = true;
            addPropertyForm.submit();
        }

    })
}


if(editPropertyForm) {
    let pType = document.getElementById('pType').value;
    let aType = document.getElementById('aType').value;
    document.getElementById('propertyType').value = pType;
    document.getElementById('accomodationType').value = aType;
    editPropertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let price = document.getElementById('price').value;
        let description = document.getElementById('description').value;
        let propertyType = document.getElementById('propertyType').value;
        let accomodationType = document.getElementById('accomodationType').value;
        let nearestLandmarks = document.getElementById('nearestLandmarks').value;

        let images = document.getElementById('images').value;

        let priceErr = document.getElementById('price-error');
        let descriptionErr = document.getElementById('description-error');
        let propertyTypeErr = document.getElementById('propertyType-error');
        let accomodationTypeErr = document.getElementById('accomodationType-error');
        let nearestLandmarksErr = document.getElementById('nearestLandmarks-error');

        let imagesErr = document.getElementById('images-error');
 
        priceErr.hidden = true;
        descriptionErr.hidden = true;
        propertyTypeErr.hidden = true;
        accomodationTypeErr.hidden = true;
        nearestLandmarksErr.hidden = true;
        imagesErr.hidden = true;

        let errorFlag = false;
       
        try {
            description = validateStringNew(description, 'Description');
        } catch(e) {
            descriptionErr.hidden = false;
            descriptionErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            propertyType = validatePropertyType(propertyType, 'Property Type');
        } catch(e) {
            propertyTypeErr.hidden = false;
            propertyTypeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            accomodationType = validateAccType(accomodationType, 'Accomodation Type');
        } catch(e) {
            accomodationTypeErr.hidden = false;
            accomodationTypeErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            if (nearestLandmarks.trim() !== "" && nearestLandmarks !== undefined && nearestLandmarks !== null) {
                nearestLandmarks = validateStringNew(nearestLandmarks, 'Nearest Landmarks');
            } else {
                nearestLandmarks = "";
            }
        } catch(e) {
            nearestLandmarksErr.hidden = false;
            nearestLandmarksErr.innerHTML = e;
            errorFlag = true;
        }

        try {
            let p = parseFloat(price)
            p = validatePrice(p, 'Price');
        } catch(e) {
            priceErr.hidden = false;
            priceErr.innerHTML = e;
            errorFlag = true;
        }

        if (!errorFlag) {
            priceErr.hidden = true;
            descriptionErr.hidden = true;
            propertyTypeErr.hidden = true;
            accomodationTypeErr.hidden = true;
            imagesErr.hidden = true;
            nearestLandmarksErr.hidden = true;
            editPropertyForm.submit();
        }

    })
}