import React from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";
import Radio from "@material-ui/core/Radio";

const PaymentCard = ({active, title, texts, amount, onClick}) => {
    return (
        <div
            className={`Payment__card align-items-start align-items-sm-center d-flex py-5 pl-md-3 pr-md-4 pr-3 pl-1 rounded cursor-pointer mt-3
                            ${active ? "text-dark-blue bg-orange" : "text-muted bg-grey"}`}
            onClick={onClick}
        >
            <Radio
                checked={active}
                value="a"
                color="primary"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'A' }}
                className="mr-2"
            />
            <div className="flex-grow-1 d-sm-flex justify-content-between">
                <div className="mr-2 mb-3 mb-sm-0">
                    <div className="font-size-lg  font-w600">{title}</div>
                    {
                        texts.map(item => <div className="font-size-nm">{item}</div>)
                    }
                </div>
                <div className="text-right">
                    <div className="">Total</div>
                    <div className="font-size-xl font-w600">N {amount}</div>
                </div>
            </div>
        </div>
    );
};

PaymentCard.propTypes = {
    active: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    texts: PropTypes.any,
    amount: PropTypes.string
};

export default pure(PaymentCard);
