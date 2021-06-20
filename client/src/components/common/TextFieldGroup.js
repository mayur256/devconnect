import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const TextFieldGroup = ({name, placeholder, value, label, error, info, type,
                        onChange, disabled}) => 
{
    return(
        <div>
            <input 
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                type={type} placeholder={placeholder} disabled={disabled}
                name={name} onChange={onChange} value={value}
            />
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <span className="invalid-feedback">{error}</span>}
        </div>
    );

}
TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;