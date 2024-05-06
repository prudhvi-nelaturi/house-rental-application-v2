let regForm = document.querySelector('#register-form');
let loginForm = document.querySelector('#login-form');

if(regForm) {
    let sType = document.getElementById('stateTag').value;
    let pType = document.getElementById('genderTag').value;
    document.getElementById('stateTag').value = sType;
    document.getElementById('genderTag').value = pType;
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let firstName = document.getElementById('firstName').value;
        let middleName = document.getElementById('middleName').value;
        let lastName = document.getElementById('lastName').value;
        let email = document.getElementById('email').value;
        let age = document.getElementById('age').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmPassword').value;
        let city = document.getElementById('city').value;
        let profilePicture = document.getElementById('profilePicture').value;
        let gender = document.getElementById('gender').value;
        let state = document.getElementById('state').value;


        let errorFlag = false;

        if(!firstName || !lastName || !email || !age || !password || !confirmPassword || !city || !state  || !gender){
            let errorsDiv = document.getElementById('errors');
            errorsDiv.innerHTML = "Please provide all mandatory fields";
            errorsDiv.hidden = false;
        } 
        else {
            let fNameError = document.getElementById('firstName-error');
            let fFlag = false;
            try {
                validateName(firstName, 'firstName');
            } catch(e) {
                fNameError.hidden = false;
                fNameError.innerHTML = e;
                errorFlag = true;
                fFlag = true;
            }
            if(!fFlag) fNameError.hidden = true;
    
            let lNameError = document.getElementById('lastName-error');
            let lFlag = false;
            try {
                validateName(lastName, 'lastName');
            } catch(e) {
                lNameError.hidden = false;
                lNameError.innerHTML = e;
                errorFlag = true;
                lFlag = true;
            }
            if(!lFlag) lNameError.hidden = true;

            let mNameError = document.getElementById('middleName-error');
            if(middleName){
                let mFlag = false;
                try {
                    validateName(middleName, 'middleName');
                } catch(e) {
                    mNameError.hidden = false;
                    mNameError.innerHTML = e;
                    errorFlag = true;
                    mFlag = true;
                }
                if(!mFlag) mNameError.hidden = true;
            }
            if(!middleName) mNameError.hidden = true;

            let emailError = document.getElementById('email-error');
            let eFlag = false;
            try {
                validateEmail(email, 'email');
            } catch(e) {
                emailError.hidden = false;
                emailError.innerHTML = e;
                errorFlag = true;
                eFlag = true;
            }
            if(!eFlag) emailError.hidden = true;

            let pwError = document.getElementById('password-error');
            let pFlag = false;
            try {
                validatepassword(password, 'password');
            } catch(e) {
                pwError.hidden = false;
                pwError.innerHTML = e;
                errorFlag = true;
                pFlag = true;
            }
            if(!pFlag) pwError.hidden = true;

            let cityError = document.getElementById('city-error');
            let cFlag = false;
            try {
                validateString(city, 'city');
            } catch(e) {
                cityError.hidden = false;
                cityError.innerHTML = e;
                errorFlag = true;
                cFlag = true;
            }
            if(!cFlag) cityError.hidden = true;

            let stateError = document.getElementById('state-error');
            let sFlag = false;
            try {
                validateState(state, 'state');
            } catch(e) {
                stateError.hidden = false;
                stateError.innerHTML = e;
                errorFlag = true;
                sFlag = true;
            }
            if(!sFlag) stateError.hidden = true;

            let genError = document.getElementById('gender-error');
            let gFlag = false;
            try {
                validateGender(gender, 'gender');
            } catch(e) {
                genError.hidden = false;
                genError.innerHTML = e;
                errorFlag = true;
                gFlag = true;
            }
            if(!gFlag) genError.hidden = true;

            let confirmError = document.getElementById('confirmPassword-error');
            let cpFlag = false;
            if(password != confirmPassword) {
                confirmError.hidden = false;
                confirmError.innerHTML = "Both passwwords did not match";
                errorFlag = true;
                cpFlag = true;
            }
            if(!cpFlag) confirmError.hidden = true;

            let ageError = document.getElementById('age-error');
            let aFlag = false;

            try {
                validateAge(age, 'age');
            } catch(e) {
                ageError.hidden = false;
                ageError.innerHTML = e;
                errorFlag = true;
                aFlag = true;
            }
            if(!aFlag) ageError.hidden = true;
        }
       
        if(!errorFlag){
            // lNameError.hidden = false;
            // fNameError.hidden = false;
            // mNameError.hidden = false;
            // emailError.hidden = false;
            // pwError.hidden = false;
            // cityError.hidden = false;
            // stateError.hidden = false;
            // genError.hidden = false;
            // confirmError.hidden = false;

            firstName = firstName.trim();
            if(middleName) middleName = middleName.trim();
            lastName = lastName.trim();
            email = email.trim().toLowerCase();
            //regForm.elements['age'].value = formatAge(age);
            city = city.trim();

            regForm.submit();
        }
    })
};

if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let errMsg = "";
        let flag =false;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if(email == '' || password == '') {
            errMsg = "All fields must be supplied!";
            flag = true;
        }
        else {
            try{
                validateEmail(email ,'email');
                validatepassword(password, 'password');
              } catch(e) {
                errMsg = e;
                flag = true;
              }
        }

        if(flag) {
            let errorsDiv = document.getElementById('errors');
            errorsDiv.innerHTML = errMsg;
            errorsDiv.hidden = false;
        }
        else {
            email = email.trim().toLowerCase();

            document.getElementById('errors').hidden = true;
            loginForm.submit();
        }
    })
}