import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const InputGroup = ({name, type, icon, placeholder, value, error, onChange}) => 
{
    return(
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}></i>
                </span>
            </div>
            <input 
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                placeholder={placeholder} name={name} type={type}
                onChange={onChange} value={value}
            />
            {error && <span className="invalid-feedback">{error}</span>}
        </div>
    );

}
InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default InputGroup;