import React from "react";
import { pure } from "recompose";
import PropTypes, {array} from "prop-types";

const Select = ({ name, label, error, className, options, placeholder, ...rest }) => {
    return (
        <div className="form-group">
            {
                label && <label className={`font-size-nm font-weight-bold text-dark-color ${error ? 'text-danger' : ''}`} htmlFor={name}>{label}</label>
            }
            <select name={name}
                   className={`form-control custom-select ${className} ${error ? 'is-invalid' : ''}`}
                   id={name}
                   aria-describedby={name}
                   {...rest}
            >
                <option value="" className="bg-white">{placeholder}</option>
                {
                    options.map((option, index) => <option key={index} value={option.value} className="bg-white">{option.label}</option>)
                }
            </select>
            {
                error && <small id="emailHelp" className="form-text text-danger">{error}</small>
            }
        </div>
    );
};

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func
};

export default pure(Select);
