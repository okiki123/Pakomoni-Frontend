import React from "react";
import { pure } from "recompose";
import {NavLink} from "react-router-dom";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import SignUpForm from "./forms/SignUpForm";

const SignUp = ( { history }) => {
    const extra = (
        <div>
            <div className="font-size-nm text-center">
                Registered? <NavLink to="/login" className="text-white font-weight-bold">Login Here</NavLink>
            </div>
        </div>
    );

    return (
        <AuthLayout extra={extra} title="Create a new account">
            <SignUpForm history={history} />
        </AuthLayout>
    );
};

export default pure(SignUp);
