const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePostInput(input){
    let errors = {};

    input.text = !isEmpty(input.text) ? input.text : '';

    if(validator.isEmpty(input.text)){  
        errors.text = 'Text field is required';
    }

    else if(!validator.isLength(input.text, {min:10, max:200})){
        errors.text = 'Text field must be between 10 to 200 characters'
    }

    return {
        errors, isValid: isEmpty(errors)
    }
}