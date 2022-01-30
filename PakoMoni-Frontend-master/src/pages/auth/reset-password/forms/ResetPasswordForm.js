import React, {Fragment} from "react";
import BaseForm from "../../../../helpers/BaseForm";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import { withSnackbar } from 'notistack';
import authService from "../../../../services/auth-service";
import APP from "../../../../store/actions/app-actions";
import { connect } from "react-redux";
import AUTH from "../../../../store/actions/auth-actions";

class ResetPasswordForm extends BaseForm {
    state = {
        fields: {
            password: {
                name: 'password',
                value: '',
                error: '',
                validation: {
                    required: true,
                    min: 6
                }
            },
            password_confirmation: {
                name: 'password_confirmation',
                value: '',
                error: '',
                validation: {
                    required: true,
                    confirm: {
                        check: true,
                        referenceValue: ''
                    }
                }
            }
        },
        valid: false
    };

    handleChange = (e) => {
        this.validate(e.currentTarget);
    };

    handleSubmit = async e => {
        this.props.showLoader();

        try {

            let form = this.getValue();

            const data = {
                email: this.props.email,
                pin: form.password
            }

            await authService.resetPassword(data);

            this.props.hideLoader();

            this.props.changeForgotPassword(null);

            this.props.history.push('/login');

            this.props.enqueueSnackbar('Password changed successfully', {
                variant: 'success'
            });

        } catch (err) {

            this.props.enqueueSnackbar(err, {
                variant: 'error'
            });

            this.props.hideLoader()

        }
    }

    render() {
        const {fields: {password, password_confirmation}} = this.state;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} >

                    {/*Password*/}
                    <Input
                        name={password.name}
                        label="Password"
                        value={password.value}
                        error={password.error}
                        onChange={this.handleChange}
                        type="password"
                    />

                    {/*password_confirmation*/}
                    <Input
                        name={password_confirmation.name}
                        label="Confirm Password"
                        value={password_confirmation.value}
                        error={password_confirmation.error}
                        onChange={this.handleChange}
                        type="password"
                    />


                    <Button
                        className="btn Btn Btn-orange Btn-h50 btn-block mt-4 font-w600"
                        disabled={this.isInvalid()}
                        onClick={this.handleSubmit}
                        type="button"
                    >
                        Reset
                    </Button>
                </form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.forgotPassword.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        changeForgotPassword: (forgotPassword) => dispatch({type: AUTH.CHANGE_FORGOT_PASSWORD, forgotPassword})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(ResetPasswordForm));
