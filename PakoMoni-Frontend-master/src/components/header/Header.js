import React, {Fragment, useState} from "react";
import { pure } from "recompose";
import { NavLink } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faUser} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import AuthService from "../../services/auth-service";
import APP from "../../store/actions/app-actions";
import AUTH from "../../store/actions/auth-actions";
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core";

const Header = ({ title, type, headerType = 'white', history, showLoader, hideLoader, changeUser, onExpand }) => {
    const headerClasses = headerType === 'white' ? "bg-white border-main-bottom py-4" : "bg-dark-blue py-2";

    const useStyles = makeStyles({
        paper: {
            width: "200px"
        },
        list: {
            width: "200px"
        }
    });

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(prevState => event.currentTarget);
    };

    const handleClose = () => {
        console.log('close');
        setAnchorEl(prevState => null);
    };

    const logout = async () => {
        showLoader();

        await AuthService.logout();

        changeUser(null); // Set Redux user to null

        hideLoader();

        history.push('/login')
    }

    return (
        <div className="Header bg-white">

            <IconButton onClick={onExpand} className="mr-2 d-inline-block d-lg-none" style={{width: "50px"}}>
                <MenuIcon />
            </IconButton>

            <div className={`px-3 d-flex ${headerClasses}`}>
                <div className="Header__title mr-auto text-muted font-size-lg">
                    {title}
                </div>
                <div className="Header__links d-flex mr-4">
                    {
                        type !== 'admin' &&
                        <div className="mx-3 cursor-pointer" onClick={handleClick}>
                            <Fragment>
                                <FontAwesomeIcon className="text-muted" icon={faBell} />
                            </Fragment>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                keepMounted
                                className={classes.paper}
                                open={!!(anchorEl)}
                                onClose={handleClose}
                            >
                                {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                                {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                <MenuItem onClick={handleClose}>No Notifications for you</MenuItem>
                            </Menu>
                        </div>
                    }
                    <div className="mx-3">
                        <button type="button" className="btn Btn p-0" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            {
                                type === 'admin' ?
                                    <div className="bg-light-blue rounded-circle p-2 d-flex justify-content-center align-items-center">
                                        <FontAwesomeIcon className="text-blue font-size-nm" icon={faUser} />
                                    </div>
                                    :
                                    <FontAwesomeIcon className="text-muted" icon={faUser} />
                            }
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" type="button" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    headerType: PropTypes.string,
    history: PropTypes.any,
    onExpand: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        changeUser: (user) => dispatch({type: AUTH.CHANGE_USER, user})
    }
}

export default connect(null, mapDispatchToProps)(pure(Header));
