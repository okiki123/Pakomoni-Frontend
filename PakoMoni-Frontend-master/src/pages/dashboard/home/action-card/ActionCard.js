import React from "react";
import { pure } from  "recompose";
import PropTypes from "prop-types";
import Button from "../../../../components/button/Button";

const ActionCard = (
    {
        icon,
        activeIcon,
        label, disabled = false,
        showButton = false,
        buttonText = "Start Here",
        showStatus = false,
        statusText,
        className,
        link
    }) => {
    return (
        <div className={`bg-white border-main ActionCard py-4 ${className}`}>
            <div className="ActionCard__icon mx-auto mb-3">
                <img src={disabled ? icon : activeIcon} />
            </div>
            <div
                className={`font-weight-bold text-center mb-5 pb-3 ${disabled ? "text-muted" : "text-blue"}`}>
                {label}
            </div>
            <div className="text-center">
                {
                    showButton && <Button link={link} className="btn Btn Btn-orange">{buttonText}</Button>
                }
            </div>
            <div className="text-center mr-2">
                {
                    showStatus && <span className="badge badge-light">{statusText}</span>
                }
            </div>
        </div>
    );
};

ActionCard.propTypes = {
    icon: PropTypes.any.isRequired,
    activeIcon: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    showButton: PropTypes.bool,
    buttonText: PropTypes.string,
    showStatus: PropTypes.bool,
    statusText: PropTypes.string,
    link: PropTypes.string
};

export default pure(ActionCard);
