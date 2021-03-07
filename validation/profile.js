const validator = require('validator')
const isEmpty = require('./is_empty')

module.exports = function validateProfileInput(input){
    let errors = {}

    input.handle = !isEmpty(input.handle) ? input.handle : '';
    input.status = !isEmpty(input.status) ? input.status : '';
    input.skills = !isEmpty(input.skills) ? input.skills : '';

    if(validator.isEmpty(input.handle)){
        errors.handle = "Handle field is required";
    }

    if(!validator.isEmpty(input.handle)){
        if(!validator.isLength(input.handle, {min:2, max:40})){
            errors.handle = "Handle must be atleast 2 character and no longer than 40";
        }
    }

    if(validator.isEmpty(input.status)){
        errors.status = "Status field is required";
    }

    if(validator.isEmpty(input.skills)){
        errors.skills = "Skills field is required";
    }

    if(!validator.isEmpty(input.website)){
        if(!validator.isURL(input.website)){
            errors.website = "Invalid URL";
        }
    }

    if(!validator.isEmpty(input.social.youtube)){
        if(!validator.isURL(input.social.youtube)){
            errors.youtube = "Invalid URL";
        }
    }

    if(!validator.isEmpty(input.social.facebook)){
        if(!validator.isURL(input.social.facebook)){
            errors.facebook = "Invalid URL";
        }
    }

    if(!validator.isEmpty(input.social.instagram)){
        if(!validator.isURL(input.social.instagram)){
            errors.instagram = "Invalid URL";
        }
    }

    if(!validator.isEmpty(input.social.twitter)){
        if(!validator.isURL(input.social.twitter)){
            errors.twitter = "Invalid URL";
        }
    }

    if(!validator.isEmpty(input.social.linkedin)){
        if(!validator.isURL(input.social.linkedin)){
            errors.linkedin = "Invalid URL";
        }
    }

    return{
        errors, isValid: isEmpty(errors)
    }
}   