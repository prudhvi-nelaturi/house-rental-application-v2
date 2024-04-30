$(document).ready(()=> {
    let userId = $('#userId').val();
    alert(userId);

    let requestConfig = {
        method: 'GET',
        url: `/user/favorites/${userId}`
    };

    $.ajax(requestConfig).then( (responseData) => {
        console.log(responseData);
        let favCard = $('#favorites-card');

        if(responseData.length > 0) {
            responseData.forEach(x => {
                let content = $(
                    `<div id="favorite-card">
                    <p><strong>House: </strong>${x.address.street}, ${x.address.city}, ${x.address.state}</p>
                    <p><strong>Posted By: </strong>${x.firstName} ${x.lastName}</p>
                    <p><strong>Rent: </strong>${x.price}</p>
                    <p><strong>Type: </strong>${x.details.apartmentType}, ${x.details.propertyType}</p>
                    <p><strong>Area: </strong>${x.details.area}</p>
                    <p><strong>Fovorite Count: </strong>${x.favoriteCount ? `<div> ${x.favoriteCount} </div>` : '<span>0</span>'}</p>
                    <p><a href="/removeFavorite/${x._id}">Remove From Favorites</a></p>
                </div>`
                );

                favCard.append(content);
            })
        }
        else {
            favCard.append($(`<div id="no-favorites-card">No properties liked.</div>
            `))
        }

    });


    //edit form submission
    $('#myForm').submit((e) => {
        e.preventDefault();

        let fName = $('#firstName').val();
        let mName = $('#middleName').val();
        let lName = $('#lastName').val();
        let email = $('#email').val();
        let gender = $('[name="gender"]').val();
        let state = $('[name="state"]').val();
        let age = $('#age').val();
        let password = $('#password').val();
        let confirmPassword = $('#confirmPassword').val();
        let city = $('#city').val();
        let profilePicture = $('#profilePicture').val();

        //do validaitons here
        let data = new FormData(document.getElementById('myForm'));
        if(fName && lName && email && state && age && gender && city && password) {
            if(password != confirmPassword) {
                $('#confirmPassword-error').show();
                $('#confirmPassword-error').html('Passwords did not match');
            }
            else {
                // let requestConfig = {
                //     method: 'POST',
                //     url: `/edit`,
                //     data: data,
                //     contentType: false,
                //     processDate: false
                // }


                // $.ajax(requestConfig).then(function (responseMessage){
                //     console.log(responseMessage);
                //     alert("HI");
                //     showForm();
                // })

                $.ajax({
                    method: 'POST',
                    url: '/edit',
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function(res) {
                        console.log(res);
                        alert('hi');
                        showForm();
                        $('#fn').html(res.firstName+" "+res.lastName);
                        $('#db').html('DOB: '+res.age);
                        $('#ct').html('City: '+res.city);
                        $('#st').html('State: '+res.state);
                        $('#ig').prop('src', `/public/images/${res.profilePicture}`);
                    },
                    error: function(e) {
                        console.log('Can`t edit profile: ', e);
                        alert("Can`t edit profile. Please try again");
                    }
                })
            }
        }

    })

})


const showForm =() => {
    $('#edit-form').toggle();
}