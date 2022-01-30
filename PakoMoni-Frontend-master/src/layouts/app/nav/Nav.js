import React, {useState} from "react";
import { pure } from "recompose";
import { NavLink } from "react-router-dom";
import Logo from "../../../components/logo/Logo";
import Button from "../../../components/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    const [isNavOpened, setIsNavOpened] = useState(false);

    const toggleNav = () => {
        setIsNavOpened(!isNavOpened);
    }

    return (
        <div className="Nav">
            <div className="mxw-1200">
                <nav className="navbar navbar-expand-lg">
                    <NavLink exact className="navbar-brand mr-lg-5" to="/">
                        <Logo scale={1.5} />
                    </NavLink>

                    <button className="navbar-toggler text-blue Btn" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation" onClick={toggleNav}>
                        {
                            isNavOpened ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />
                        }
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto order-2 order-lg-1">
                            <li className="nav-item">
                                <NavLink className="nav-link mx-lg-2" exact to="/faqs" >FAQs</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link mx-lg-2" exact to="/pricing" >Pricing</NavLink>
                            </li>
                        </ul>
                        <div className="d-lg-flex my-2 my-lg-0 order-1 order-lg-2">
                            <NavLink exact className="nav-link mx-lg-2 px-0 d-lg-none" to="/signup" >Get Started</NavLink>
                            <NavLink exact className="nav-link mx-lg-2 px-0 px-lg-3" to="/login" >Login</NavLink>
                            <Button link="/signup" className="Btn-orange Btn-standard d-none d-lg-block">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default pure(Nav);
