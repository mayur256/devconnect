import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const TextAreaFieldGroup = ({name, placeholder, value, error, info, onChange}) => 
{
    return(
        <div>
            <textarea 
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                placeholder={placeholder} name={name} 
                onChange={onChange} value={value}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <span className="invalid-feedback">{error}</span>}
        </div>
    );

}
TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;