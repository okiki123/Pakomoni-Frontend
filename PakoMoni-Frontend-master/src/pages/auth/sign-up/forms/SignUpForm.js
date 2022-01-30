import React, {Fragment} from "react";
import BaseForm from "../../../../helpers/BaseForm";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import { withSnackbar } from 'notistack';
import authService from "../../../../services/auth-service";
import APP from "../../../../store/actions/app-actions";
import { connect } from "react-redux";
import AUTH from "../../../../store/actions/auth-actions";

class SignUpForm extends BaseForm {
    state = {
        fields: {
            full_name: {
                name: 'full_name',
                value: '',
                error: '',
                validation: {
                    required: true,
                }
            },
            email:  {
                name: 'email',
                value: '',
                error: '',
                validation: {
                    required: true,
                    email: true
                }
            },
            phone:  {
                name: 'phone',
                value: '',
                error: '',
                validation: {
                    required: true,
                    phone: true
                }
            },
            password:  {
                name: 'password',
                value: '',
                error: '',
                validation: {
                    required: true,
                    min: 6
                }
            },
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
            data.pin = data.password;
            delete data.password;

            await authService.signUp(data);

            this.props.hideLoader();

            this.props.changeRegistration(data);

            this.props.history.push('/verify');

        } catch (err) {

            this.props.enqueueSnackbar(err, {
                variant: 'error'
            });

            this.props.hideLoader()

        }
    }

    render() {
        const {fields: {full_name, phone, email,  password}} = this.state;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} >

                    {/*Full Name*/}
                    <Input
                        name={full_name.name}
                        label="Full Name"
                        value={full_name.value}
                        error={full_name.error}
                        onChange={this.handleChange}
                    />

                    {/*Email*/}
                    <Input
                        name={email.name}
                        label="Email"
                        value={email.value}
                        error={email.error}
                        onChange={this.handleChange}
                    />

                    {/*Phone number*/}
                    <Input
                        name={phone.name}
                        label="Phone Number"
                        value={phone.value}
                        error={phone.error}
                        onChange={this.handleChange}
                    />

                    {/*Pin*/}
                    <Input
                        name={password.name}
                        label="Password"
                        value={password.value}
                        error={password.error}
                        onChange={this.handleChange}
                        type="password"
                    />


                    <Button
                        className="btn Btn Btn-orange Btn-h50 btn-block mt-4 font-w600"
                        disabled={this.isInvalid()}
                        onClick={this.handleSubmit}
                        type="button"
                    >
                        Create my account
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
        changeRegistration: (registration) => dispatch({type: AUTH.CHANGE_REGISTRATION, registration})
    }
}

export default connect(null, mapDispatchToProps)(withSnackbar(SignUpForm));
