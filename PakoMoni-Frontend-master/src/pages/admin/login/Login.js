import React from "react";
import { pure } from "recompose";
import LoginForm from "../../auth/login/forms/LoginForm";
import {NavLink} from "react-router-dom";
import AuthLayout from "../../../layouts/auth/AuthLayout";

const Login = ( { history }) => {
    const extra = (
        <div>
            <div className="font-size-nm text-center">
                <NavLink to="/forgot-password" className="text-white font-weight-bold">Forgot your password?</NavLink>
            </div>
        </div>
    );

    return (
        <AuthLayout extra={extra} title="Admin Login">
            <LoginForm history={history} redirectTo="/admin" />
        </AuthLayout>
    );
};

export default pure(Login);
