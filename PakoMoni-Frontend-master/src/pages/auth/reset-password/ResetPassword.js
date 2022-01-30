import React from "react";
import { pure } from "recompose";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import ResetPasswordForm from "./forms/ResetPasswordForm";
import {NavLink} from "react-router-dom";

const ResetPassword = ( { history }) => {

    const extra = (
        <div>
            <div className="font-size-nm text-center">
                <NavLink to="/login" className="text-white font-weight-bold">Login</NavLink>
            </div>
        </div>
    );

    return (
        <AuthLayout title="Reset Password" text="Enter your new password" extra={extra}>
            <ResetPasswordForm history={history} />
        </AuthLayout>
    );
};


export default pure(ResetPassword);
