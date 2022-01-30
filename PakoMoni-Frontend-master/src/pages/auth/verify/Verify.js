import React, {Fragment, useState} from "react";
import { pure } from "recompose";
import AuthLayout from "../../../layouts/auth/AuthLayout";
import Button from "../../../components/button/Button";
import OtpInput from "react-otp-input";
import APP from "../../../store/actions/app-actions";
import { connect } from 'react-redux';
import authService from "../../../services/auth-service";
import {withSnackbar} from "notistack";
import storageService from "../../../services/storage-service";
import AUTH from "../../../store/actions/auth-actions";

const Verify = ({ history, registration, forgotPassword, showLoader, hideLoader, changeUser, enqueueSnackbar }) => {

    const [otp, setOtp] = useState();

    const [invalidOtp, setInvalidOtp] = useState(true);

    const otpLength = 5;

    const [email, setEmail] = useState((registration && registration.email) || (forgotPassword && forgotPassword.email));

    const style =  {
        borderRadius: "4px",
        minHeight: "40px",
        minWidth: "40px",
        margin: "0 5px"
    }

    const handleChange = (e) => {

        setOtp(e);

        const isOtpInvalid = e.length !== otpLength;

        setInvalidOtp(isOtpInvalid);

    }

    const handleSubmit = async () => {

        if (!invalidOtp) {

            showLoader();

            try {

                const data = {
                    email: email,
                    code: otp
                };

                const response = await authService.verify(data);

                if (registration) {

                    const user = {...response.data.user, token: response.data.token};

                    await storageService.setItem('user', user);

                    changeUser(user);

                    history.push('/verification-successful'); // navigate

                }

                else if (forgotPassword) {

                    console.log(response);
                    sessionStorage.setItem('user_password_token', response.data.token);

                    history.push('/reset-password');

                    enqueueSnackbar('Code verified successfully', {
                        variant: 'success'
                    });

                }

                hideLoader();

            } catch (err) {

                enqueueSnackbar(err, {
                    variant: 'error'
                });

                hideLoader()

            }

        }

    }

    return (
        <AuthLayout title="Please verify your account">
            <div className="text-center mb-5">
                A {otpLength} digit code has been sent to your email address {email}
                {
                    registration &&
                    <Fragment>and your phone number, {registration.phone}</Fragment>
                }
            </div>

            <div className="text-center mb-3">
                Please enter the {otpLength} digit code below
            </div>

            <div className="d-flex justify-content-center mb-4 flex-wrap">
                <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={otpLength}
                    separator={<span>-</span>}
                    inputStyle={style}
                />
            </div>

            <Button
                className="btn Btn Btn-orange Btn-h50 btn-block mt-4 font-w600"
                disabled={invalidOtp}
                type="button"
                onClick={handleSubmit}
            >
                Complete verification
            </Button>
        </AuthLayout>
    );
};

const mapStateToProps = state => {
    return {
        registration: state.auth.registration,
        forgotPassword: state.auth.forgotPassword
    }
};

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        changeUser: (user) => dispatch({type: AUTH.CHANGE_USER, user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(pure(Verify)));
