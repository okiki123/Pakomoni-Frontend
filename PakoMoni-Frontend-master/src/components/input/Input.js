import React from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";

const Input = ({ name, label, error, className, ...rest }) => {
    return (
        <div className="form-group">
            {
                label && <label className={`font-size-nm font-weight-bold text-dark-color ${error ? 'text-danger' : ''}`} htmlFor={name}>{label}</label>
            }
            <input name={name}
                   className={`form-control ${className} ${error ? 'is-invalid' : ''}`}
                   id={name}
                   aria-describedby={name}
                   {...rest}
            />
            {
                error && <small id="emailHelp" className="form-text text-danger">{error}</small>
            }
        </div>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func
};

export default pure(Input);
