import React, {Fragment} from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";

const FileInput = ({ name, label, error, className, placeholder, ...rest }) => {
    return (
        <div className="mb-4">
            <div className="custom-file">
                <input name={name}
                       className={`custom-file-input form-control ${className} ${error ? 'is-invalid' : ''}`}
                       id={name}
                       type="file"
                       aria-describedby={name}
                       {...rest}
                />
                <label className="custom-file-label" htmlFor="customFile">{placeholder}</label>
            </div>
            {
                error && <small id="emailHelp" className="form-text text-danger">{error}</small>
            }
        </div>
    );
};

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func
};

export default pure(FileInput);
