import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const SelectFieldGroup = ({name, value, error, info, onChange, options}) => 
{
    const SelectOptions = options.map(option => {
        return (<option key={option.key} value={option.value}>
            {option.value}
        </option>)
    });
    
    return(
        <div>
            <select 
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                name={name} onChange={onChange} value={value}
            >
                {SelectOptions}
            </select>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <span className="invalid-feedback">{error}</span>}
        </div>
    );

}
SelectFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default SelectFieldGroup;