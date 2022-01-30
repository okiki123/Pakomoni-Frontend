import React from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";

const TextArea = ({ name, label, error, className, rows = 4, ...rest }) => {
    return (
        <div className="form-group">
            {
                label && <label className={`font-size-nm font-weight-bold text-dark-color ${error ? 'text-danger' : ''}`} htmlFor={name}>{label}</label>
            }
            <textarea name={name}
                   className={`form-control ${className} ${error ? 'is-invalid' : ''}`}
                   id={name}
                   aria-describedby={name}
                   rows={rows}
                   style={{resize: "none"}}
                   {...rest}
            ></textarea>
            {
                error && <small className="form-text text-danger">{error}</small>
            }
        </div>
    );
};

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.any,
    error: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func
};

export default pure(TextArea);
