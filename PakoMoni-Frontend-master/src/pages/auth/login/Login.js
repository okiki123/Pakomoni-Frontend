import React from "react";
import { pure } from "recompose";
import LoginForm from "./forms/LoginForm";
import {NavLink} from "react-router-dom";
import AuthLayout from "../../../layouts/auth/AuthLayout";

const Login = ( { history }) => {

    const extra = (
        <div>
            <div className="font-size-nm text-center">
                Not yet registered? <NavLink to="/signup" className="text-white font-weight-bold">Register Here</NavLink>
            </div>
            <div className="font-size-nm text-center">
                <NavLink to="/forgot-password" className="text-white font-weight-bold">Forgot your password?</NavLink>
            </div>
        </div>
    );

    return (
        <AuthLayout extra={extra} title="Login to your account">
            <LoginForm history={history} />
        </AuthLayout>
    );
};

export default pure(Login);
