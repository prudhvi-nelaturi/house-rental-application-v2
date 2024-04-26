let regForm = document.querySelector('#register-form');

if(regForm) {
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let firstName = document.getElementById('firstName').value;
        let middleName = document.getElementById('middleName').value;
        let lastName = document.getElementById('lastName').value;
        let email = document.getElementById('email').value;
        let age = document.getElementById('age').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
        //let state = document.getElementsByName('state').value;
        let city = document.getElementById('city').value;
        //let gender = document.getElementsByName('gender').value;
        let profilePicture = document.getElementById('profilePicture').value;

        let errorFlag = false;


        let fNameError = document.getElementById('firstName-error');
        try {
            validateString(firstName, 'firstName');
        } catch(e) {
            fNameError.hidden = false;
            fNameError.innerHTML = e;
            errorFlag = true;
        }

        let lNameError = document.getElementById('lastName-error');
        try {
            validateString(lastName, 'lastName');
        } catch(e) {
            lNameError.hidden = false;
            lNameError.innerHTML = e;
            errorFlag = true;
        }

        if(!errorFlag){
            lNameError.hidden = false;
            fNameError.hidden = false;

            firstName = firstName.trim();
            middleName = middleName.trim();
            lastName = lastName.trim();
            email = email.trim().toLowerCase();
            age = age.trim();
            city = city.trim();

            regForm.submit();
        }


        //add more validations here 


    })
}