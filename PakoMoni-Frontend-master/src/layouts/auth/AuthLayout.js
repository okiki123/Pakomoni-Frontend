import React from "react";
import { pure } from "recompose";
import Logo from "../../components/logo/Logo";
import PropTypes from "prop-types";

const AuthLayout = ({ children, extra, title, text }) => {
    return (
        <div className="Auth d-sm-flex justify-content-sm-center">
            <div>
                <div className="Auth__logo text-center">
                    <Logo link="/" type="white-orange" scale={1.7} />
                </div>

                <div className="Auth__card shadow-sm mb-3">
                    <div className="Auth__card-title">
                        <div className="">{title}</div>
                        <div className="text-muted font-size-md font-weight-light">{text}</div>
                    </div>

                    {children}
                </div>

                {extra}
            </div>
        </div>
    );
};

AuthLayout.propTypes = {
    extra: PropTypes.any,
    title: PropTypes.string.isRequired,
    text: PropTypes.string
};

export default pure(AuthLayout);
