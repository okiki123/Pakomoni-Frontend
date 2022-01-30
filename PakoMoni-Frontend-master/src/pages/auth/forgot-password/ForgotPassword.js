import React from "react";
import { pure } from "recompose";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import ForgotPasswordForm from "./forms/ForgotPasswordForm";
import {NavLink} from "react-router-dom";

const ForgotPassword = ( { history }) => {

    const extra = (
        <div>
            <div className="font-size-nm text-center">
                <NavLink to="/login" className="text-white font-weight-bold">Login</NavLink>
            </div>
        </div>
    );

    return (
        <AuthLayout extra={extra} title="Forgot Password?" text="Enter your email and let us help you reset your password">
            <ForgotPasswordForm history={history} />
        </AuthLayout>
    );
};


export default pure(ForgotPassword);
