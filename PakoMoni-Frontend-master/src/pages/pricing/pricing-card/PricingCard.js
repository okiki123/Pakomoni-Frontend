import React from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/button/Button";


const PricingCard = ({ type, perks, className, businessType, amount }) => {
    const btnClass = {
        light: 'Btn-darker-blue',
        dark: 'Btn-orange'
    };

    return (
        <div className={`Pricing__card ${type} d-flex flex-column justify-content-between mx-auto mx-md-3 ${className}`}>
            <div className="flex-grow-1">
                <div className="Pricing__card-title mb-4 text-center font-w600">{businessType} Business</div>
                <div className="Pricing__card-amount mb-4 text-center">
                    {amount ? <span><sup>₦</sup> {amount}</span> : '-'}
                </div>
                {
                    perks.map((perk) => {
                        return (
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <FontAwesomeIcon icon={faCheck} className="mx-4 text-blue" />
                                <div className="flex-grow-1">{perk}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="text-center mt-4">
                <Button link="/signup" className={`${btnClass[type]} Btn-standard`}>
                    Get Started
                </Button>
            </div>
        </div>
    );
};

PricingCard.protoTypes = {
    type: PropTypes.oneOf(['light', 'dark']).isRequired,
    perks: PropTypes.array.isRequired,
    className: PropTypes.string
};

export default pure(PricingCard);
