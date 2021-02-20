const validator = require('validator')
const isEmpty = require('./is_empty')

module.exports = function validateLoginInput(input){
    let errors = {}

    input.email = !isEmpty(input.email) ? input.email : '';
    input.password = !isEmpty(input.password) ? input.password : '';


    if(validator.isEmpty(input.email)){
        errors.email = "Email field is required";
    }

    if(!validator.isEmail(input.email)){
        errors.name = "Email is invalid";
    }

    if(validator.isEmpty(input.password)){
        errors.password = "Password field is required";
    }

    if(!validator.isLength(input.password, {min:6, max:30})){
        errors.password = "Password must be atleast 6 character and no longer than 30";
    }

    return{
        errors, isValid: isEmpty(errors)
    }
}   