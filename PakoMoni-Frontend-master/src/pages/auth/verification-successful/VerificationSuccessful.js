import React, {useEffect, useState} from "react";
import { pure } from "recompose";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import {NavLink} from "react-router-dom";
import checkIcon from "../../../assets/images/icons/check.svg";

const VerificationSuccessful = ({history}) => {
    const [countDown, setCountDown] = useState(5);

    useEffect(() => {

        const counter = setInterval(() => {
            setCountDown((prevState => prevState - 1));
        }, 1000);

        if (countDown === 0) {
            history.push('/dashboard');
        }

        return () => {
            clearInterval(counter);
        }

    }, [countDown]);

    return (
        <AuthLayout title="Verification Successful">
            <div className="text-center mb-4">
                You will now be redirected to your account dashboard
            </div>

            <div className="mb-4 text-center">
                <img src={checkIcon} alt="Icon with a check" width={150} />
            </div>

            <div className="font-size-nm text-center text-dark-color">
                Click <NavLink to="/dashboard" className="text-dark-color">here</NavLink> if you are not redirected in {countDown} seconds
            </div>
        </AuthLayout>
    );
};

export default pure(VerificationSuccessful);
