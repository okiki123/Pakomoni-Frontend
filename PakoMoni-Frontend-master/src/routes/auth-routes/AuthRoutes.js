import React, {Fragment} from "react";
import { pure } from "recompose";
import GuardedRoute from "../guraded-route/GuardedRoute";
import Login from "../../pages/auth/login/Login";
import SignUp from "../../pages/auth/sign-up/SignUp";
import Verify from "../../pages/auth/verify/Verify";
import VerificationSuccessful from "../../pages/auth/verification-successful/VerificationSuccessful";
import {connect} from "react-redux";
import ForgotPassword from "../../pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "../../pages/auth/reset-password/ResetPassword";

const AuthRoutes = ({user, registration, forgotPassword}) => {
    return (
        <Fragment>
            <GuardedRoute path="/signup" redirect="/dashboard" condition={!user} component={SignUp} exact />
            <GuardedRoute path="/login" redirect="/dashboard" condition={!user} component={Login} exact />
            <GuardedRoute path="/forgot-password" redirect="/dashboard" condition={!user} component={ForgotPassword} exact />
            <GuardedRoute path="/reset-password" redirect="/dashboard" condition={!user && forgotPassword} component={ResetPassword} exact />
            <GuardedRoute path="/verify" redirect="/signup" condition={registration || forgotPassword} component={Verify} exact />
            <GuardedRoute path="/verification-successful" redirect="/signup" condition={registration} component={VerificationSuccessful} exact />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        registration: state.auth.registration,
        forgotPassword: state.auth.forgotPassword
    }
}

export default connect(mapStateToProps)(pure(AuthRoutes));
