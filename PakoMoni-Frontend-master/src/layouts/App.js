import '../stlyes/App.scss';
import React, {Fragment, useEffect, useState} from 'react';
import { pure } from 'recompose';
import LandingPage from "../pages/landing-page/LandingPage";
import { Route} from "react-router-dom";
import Pricing from "../pages/pricing/Pricing";
import AdminBusinessRegistration from "../pages/admin/business-registration/BusinessRegistration";
import ScrollToTop from "../components/scroll-to-top/ScrollToTop";
import Businesses from "../pages/admin/businesses/Businesses";
import Loader from "../components/loader/Loader";
import { SnackbarProvider } from 'notistack';
import {makeStyles} from "@material-ui/core/styles";
import CloseSnackBar from "../components/close-snackbar/CloseSnackBar";
import {connect} from "react-redux";
import AuthRoutes from "../routes/auth-routes/AuthRoutes";
import DashboardRoutes from "../routes/dashboard-routes/DashboardRoutes";
import StorageService from "../services/storage-service";
import AUTH from "../store/actions/auth-actions";
import Skin from "../components/skin/Skin";
import AdminRoutes from "../routes/admin-routes/AdminRoutes";


const App = ({changeUser, reduxUser}) => {
    const [user, setUser] = useState(null);
    const [gotUser, setGotUser] = useState(false);

    useEffect(async () => {
        const data = await StorageService.getItem('user');
        if (!data) changeUser(null);
        else {
            const parsed = parseJwt(data.token);
            const expireDate = new Date(parsed.expire_at * 1000);
            const now = new Date();
            if (now > expireDate) {
                changeUser(null);
                await StorageService.removeItem('user');
            } else {
                changeUser(data);
                setUser(data);
            }
        }
        setGotUser(true);
    }, [])

    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const useStyles = makeStyles(theme => ({
        variantSuccess: {
            backgroundColor: `${theme.palette.success.main} !important`,
            color: '#086343 !important',
            fontWeight: 600,
            fill: "#086343 !important"
        },
        variantError: {
            backgroundColor: `${theme.palette.error.main} !important`,
            color: '#9F1B1F !important',
            fontWeight: 600,
            fill: "#9F1B1F !important"
        },
        variantWarning: {
            backgroundColor: `${theme.palette.warning.main} !important`,
            color: '#AE5700 !important',
            fontWeight: 600,
            fill: "#AE5700 !important"
        },
        variantInfo: {
            backgroundColor: `${theme.palette.info.main} !important`,
            color: '#005AA3 !important',
            fontWeight: 600,
            fill: "#005AA3 !important"
        },
    }))

    const classes = useStyles();

    return (
        <Fragment>
            {
                gotUser ?
                    <SnackbarProvider
                        classes={classes}
                        autoHideDuration={7000}
                        maxSnack={1}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        disableWindowBlurListener={true}
                        action={<CloseSnackBar />}
                    >
                        <ScrollToTop />

                        <Route path="/pricing" component={Pricing} exact />

                        {/*Dashboard*/}
                        <DashboardRoutes user={reduxUser} />

                        {/*Auth*/}
                        <AuthRoutes user={reduxUser} />

                        {/*Admin*/}
                        <AdminRoutes user={reduxUser} />

                        {/*<Route path="/admin" component={AdminHome} exact />*/}
                        <Route path="/admin/business-registration/:id" component={AdminBusinessRegistration} exact />
                        <Route path="/admin/businesses" component={Businesses} exact />
                        <Route path="/admin/businesses/:id" component={Businesses} exact />

                        {/*Landing Page*/}
                        <Route path="/" component={LandingPage} exact />
                        <Loader />
                    </SnackbarProvider> : <Skin />
            }
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        reduxUser: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeUser: (user) => dispatch({type: AUTH.CHANGE_USER, user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(pure(App));
