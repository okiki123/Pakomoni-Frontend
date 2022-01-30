import React from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";

const Bank = ({src, value, label, className, onSelect}) => {
    const handleClick = () => {
        onSelect(value)
    }

    return (
        <div className={`Bank d-flex align-items-center ${className}`}>
            <img
                src={src}
                width="180"
                title={label}
                onClick={handleClick}
            />
        </div>
    );
}

Bank.propTypes = {
    src: PropTypes.any,
    value: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    onSelect: PropTypes.func
};

export default pure(Bank);
