$(document).ready(()=>{
    let ads = $('#ads');
    let reqConfig = {
        method: 'GET',
        url: '/adsRandom'
    }

    $.ajax(reqConfig).then((resMsg)=>{
        if(resMsg && resMsg.propLen == 0) {
            ads.html("");
        }
        else {
            showAd(resMsg, ads);
        }
    })

    //2nd ad
    let ads2 = $('#ads2');
    let reqConfig2 = {
        method: 'GET',
        url: '/adsLastProp'
    }

    $.ajax(reqConfig2).then((resMsg2)=>{
        if(resMsg2 && resMsg2.propLen == 0) {
            ads2.html("");
        }
        else {
            showAd(resMsg2, ads2);
        }
    })
});

function showAd(resMsg, propAd) {
    let x = resMsg;
            let content = $(
                `<p><strong>Sponsored Ads: </strong></p>
                <img src="/uploads/images/${x.images[0]}" alt="Property Image" class="ads-image">
                <p><strong>House: </strong>${x.address.street}, ${x.address.city}, ${x.address.state}</p>
                <p><strong>Posted By: </strong>${x.ownerFullName}</p>
                <p><strong>Rent: </strong>${x.price}$</p>
                <p><strong>Type: </strong>${x.details.apartmentType}, ${x.details.propertyType}</p>
                <a href="/search/property/${x._id}">Go To Property</a>`
            );
            propAd.append(content);
            propAd.show();
}