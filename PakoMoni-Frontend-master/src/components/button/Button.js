import React from "react";
import { pure } from "recompose";
import {Fragment} from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

const Button = ({children, className, link, ...rest}) => {
    return (
        <Fragment>
        {
            link ?
                <NavLink className={`Btn btn ${className}`}
                   to={link}
                   {...rest}
                >
                    {children}
                </NavLink> :
                <button className={`Btn btn ${className}`}
                        {...rest}
                >
                    {children}
                </button>
        }
        </Fragment>
    );
}

Button.propTypes = {
    link: PropTypes.string,
    className: PropTypes.string
}

export default pure(Button);
