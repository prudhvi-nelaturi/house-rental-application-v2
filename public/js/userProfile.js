$(document).ready(()=> {
    let userId = $('#userId').val();
    let st = $('#st').val();
    let g = $('#gen').val();
    //alert(userId);

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
                    `<div class="favorite-card">
                    <p><strong>House: </strong>${x.address.street}, ${x.address.city}, ${x.address.state}</p>
                    <p><strong>Posted By: </strong>${x.ownerFullName}</p>
                    <p><strong>Rent: </strong>${x.price}</p>
                    <p><strong>Type: </strong>${x.details.apartmentType}, ${x.details.propertyType}</p>
                    <p><strong>Area: </strong>${x.details.area}</p>
                    <p><strong>Favorite Count: </strong>${x.favouriteCount ? `<div> ${x.favouriteCount} </div>` : '<span>0</span>'}</p>
                    <p><a href="/removeFavorite/${x._id}">Remove From Favorites</a></p>
                    <a href="/search/property/${x._id}" class="f-card">View Property</a
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

        let firstName = $('#firstName').val();
        let middleName = $('#middleName').val();
        let lastName = $('#lastName').val();
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
        let errorFlag = false;

        let fNameError = $('#firstName-error');
        let fFlag = false;
            try {
                validateName(firstName, 'firstName');
            } catch(e) {
                fNameError.show();
                fNameError.html(e);
                errorFlag = true;
                fFlag = true;
            }
            if(!fFlag) fNameError.hide();
    
            let lNameError = $('#lastName-error');
            let lFlag = false;
            try {
                validateName(lastName, 'lastName');
            } catch(e) {
                lNameError.show();
                lNameError.html(e);
                errorFlag = true;
                lFlag = true;
            }
            if(!lFlag) lNameError.hide();

            let mNameError = $('middleName-error');
            if(middleName){
                let mFlag = false;
                try {
                    validateName(middleName, 'middleName');
                } catch(e) {
                    mNameError.show();
                    mNameError.html(e);
                    errorFlag = true;
                    mFlag = true;
                }
                if(!mFlag) mNameError.hide();
            }
            if(!middleName) mNameError.hide();

            let emailError = $('#email-error');
            let eFlag = false;
            try {
                validateEmail(email, 'email');
            } catch(e) {
                emailError.show();
                emailError.html(e);
                errorFlag = true;
                eFlag = true;
            }
            if(!eFlag) emailError.hide();

            let pwError = $('#password-error');
            if(password){
                let pFlag = false;
                try {
                    validatepassword(password, 'password');
                } catch(e) {
                    pwError.show();
                    pwError.html(e);
                    errorFlag = true;
                    pFlag = true;
                }
                if(!pFlag) pwError.hide();
            }
            if(!password) pwError.hide();


            let cityError = $('#city-error');
            let cFlag = false;
            try {
                validateString(city, 'city');
            } catch(e) {
                cityError.show();
                cityError.html(e);
                errorFlag = true;
                cFlag = true;
            }
            if(!cFlag) cityError.hide();

            let stateError = $('#state-error');
            let sFlag = false;
            try {
                validateState(state, 'state');
            } catch(e) {
                stateError.show();
                stateError.html(e);
                errorFlag = true;
                sFlag = true;
            }
            if(!sFlag) stateError.hide();

            let genError = $('#gender-error');
            let gFlag = false;
            try {
                validateGender(gender, 'gender');
            } catch(e) {
                genError.show();
                genError.html(e);
                errorFlag = true;
                gFlag = true;
            }
            if(!gFlag) genError.hide();

            let confirmError = $('#confirmPassword-error');
            let cpFlag = false;
            if(password != confirmPassword) {
                confirmError.show();
                confirmError.html("Both passwwords did not match");
                errorFlag = true;
                cpFlag = true;
            }
            if(!cpFlag) confirmError.hide();

            let ageError = $('#age-error');
            let aFlag = false;

            try {
                validateAge(age, 'age');
            } catch(e) {
                ageError.show();
                ageError.html(e);
                errorFlag = true;
                aFlag = true;
            }
            if(!aFlag) ageError.hide();


        if(!errorFlag) {
            $.ajax({
                method: 'POST',
                url: '/edit',
                data: data,
                contentType: false,
                processData: false,
                success: function(res) {
                    //console.log(res);
                    //alert('hi');
                    $('#errors').hide();
                    showForm();
                    $('#fn').html(res.firstName+" "+res.lastName);
                    $('#db').html('DOB: '+res.age);
                    $('#ct').html('City: '+res.city);
                    $('#stat').html('State: '+res.state);
                    $('#ig').prop('src', `/public/images/${res.profilePicture}`);
                },
                error: function(e) {
                    console.log('Error: Can`t edit profile: ', e.responseJSON.error);
                    //alert("Can`t edit profile. Please try again");
                    $('#errors').html("Can`t Edit profile. Error: "+e.responseJSON.error);
                    $('#errors').show();
                }
            })
        }

        // if(fName && lName && email && state && age && gender && city && password) {
        //     if(password != confirmPassword) {
        //         $('#confirmPassword-error').show();
        //         $('#confirmPassword-error').html('Passwords did not match');
        //     }
        //     else {
        //         // let requestConfig = {
        //         //     method: 'POST',
        //         //     url: `/edit`,
        //         //     data: data,
        //         //     contentType: false,
        //         //     processDate: false
        //         // }


        //         // $.ajax(requestConfig).then(function (responseMessage){
        //         //     console.log(responseMessage);
        //         //     alert("HI");
        //         //     showForm();
        //         // })

        //         $.ajax({
        //             method: 'POST',
        //             url: '/edit',
        //             data: data,
        //             contentType: false,
        //             processData: false,
        //             success: function(res) {
        //                 console.log(res);
        //                 alert('hi');
        //                 showForm();
        //                 $('#fn').html(res.firstName+" "+res.lastName);
        //                 $('#db').html('DOB: '+res.age);
        //                 $('#ct').html('City: '+res.city);
        //                 $('#st').html('State: '+res.state);
        //                 $('#ig').prop('src', `/public/images/${res.profilePicture}`);
        //             },
        //             error: function(e) {
        //                 console.log('Can`t edit profile: ', e);
        //                 alert("Can`t edit profile. Please try again");
        //             }
        //         })
        //     }
        // }

    });

    $('#state').val(st);
    $('#gender').val(g);
    let d = dobFormat($('#dob').text());
    $('#age').attr('value', d);
})


const showForm =() => {
    $('#edit-form').toggle();
}

const dobFormat = (val)=> {
    let age = val.split('/');
    let ans = age[2]+'-'+age[0]+'-'+age[1];
    return ans;
}