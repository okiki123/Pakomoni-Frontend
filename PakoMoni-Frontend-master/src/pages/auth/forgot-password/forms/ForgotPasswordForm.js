import React, {Fragment} from "react";
import BaseForm from "../../../../helpers/BaseForm";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import { withSnackbar } from 'notistack';
import authService from "../../../../services/auth-service";
import APP from "../../../../store/actions/app-actions";
import { connect } from "react-redux";
import AUTH from "../../../../store/actions/auth-actions";

class ForgotPasswordForm extends BaseForm {
    state = {
        fields: {
            email:  {
                name: 'email',
                value: '',
                error: '',
                validation: {
                    required: true,
                    email: true
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

            const data = this.getValue();

            await authService.forgotPassword(data);

            this.props.hideLoader();

            this.props.changeForgotPassword(data);

            this.props.history.push('/verify');

        } catch (err) {

            this.props.enqueueSnackbar(err, {
                variant: 'error'
            });

            this.props.hideLoader()

        }
    }

    render() {
        const {fields: {email}} = this.state;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} >

                    {/*Email*/}
                    <Input
                        name={email.name}
                        label="Email"
                        value={email.value}
                        error={email.error}
                        onChange={this.handleChange}
                    />

                    <Button
                        className="btn Btn Btn-orange Btn-h50 btn-block mt-4 font-w600"
                        disabled={this.isInvalid()}
                        onClick={this.handleSubmit}
                        type="button"
                    >
                        Continue
                    </Button>
                </form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        changeForgotPassword: (forgotPassword) => dispatch({type: AUTH.CHANGE_FORGOT_PASSWORD, forgotPassword})
    }
}

export default connect(null, mapDispatchToProps)(withSnackbar(ForgotPasswordForm));
