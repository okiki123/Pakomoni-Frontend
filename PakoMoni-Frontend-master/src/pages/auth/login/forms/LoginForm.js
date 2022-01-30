import React, {Fragment} from "react";
import BaseForm from "../../../../helpers/BaseForm";
import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import authService from "../../../../services/auth-service";
import storageService from "../../../../services/storage-service";
import APP from "../../../../store/actions/app-actions";
import AUTH from "../../../../store/actions/auth-actions";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";

class LoginForm extends BaseForm {
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
            },
            password: {
                name: 'password',
                value: '',
                error: '',
                validation: {
                    required: true,
                }
            },
        },
        valid: false
    };

    handleChange = (e) => {
        this.validate(e.currentTarget);
    };

    handleSubmit = async e => {
        // Call backend
        const redirectTo = this.props.redirectTo || '/dashboard';

        this.props.showLoader();

        try {

            let data = this.getValue();

            data = {email: data.email, pin: data.password};

            const isAdmin = redirectTo === '/admin';

            const response = await authService.login(data, isAdmin);

            const user = {...response.data.user, token: response.data.token};

            await storageService.setItem('user', user);

            this.props.changeUser(user);

            this.props.hideLoader();

            this.props.history.push(redirectTo);

        } catch (err) {

            this.props.enqueueSnackbar(err, {
                variant: 'error'
            });

            this.props.hideLoader()

        }
    }

    render() {
        const {fields: {email,  password}} = this.state;
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

                    {/*Password*/}
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
                        Login to your account
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
        changeUser: (user) => dispatch({type: AUTH.CHANGE_USER, user})
    }
}

export default connect(null, mapDispatchToProps)(withSnackbar(LoginForm));

