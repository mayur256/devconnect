const validator = require('validator')
const isEmpty = require('./is_empty')

module.exports = function validateEducationInput(input){
    let errors = {}

    input.school = !isEmpty(input.school) ? input.school : '';
    input.degree = !isEmpty(input.degree) ? input.degree : '';
    input.from = !isEmpty(input.from) ? input.from : '';
    input.field = !isEmpty(input.field) ? input.field : '';
    
    if(validator.isEmpty(input.school)){
        errors.school = "School field is required";
    }

    if(validator.isEmpty(input.degree)){
        errors.degree = "Degree field is required";
    }

    if(validator.isEmpty(input.from)){
        errors.from = "From date field is required";
    }

    if(validator.isEmpty(input.field)){
        errors.field = "Field of study is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
};