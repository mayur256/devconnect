const validator = require('validator')
const isEmpty = require('./is_empty')

module.exports = function validateExperienceInput(input){
    let errors = {}

    input.title = !isEmpty(input.title) ? input.title : '';
    input.company = !isEmpty(input.company) ? input.company : '';
    input.from = !isEmpty(input.from) ? input.from : '';

    if(validator.isEmpty(input.title)){
        errors.title = "Title field is required";
    }

    if(validator.isEmpty(input.company)){
        errors.company = "Company field is required";
    }

    if(validator.isEmpty(input.from)){
        errors.from = "From Date field is required";
    }

    return{
        errors, isValid: isEmpty(errors)
    }
}   