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

class EditProfileForm extends BaseForm {
    state = {
        fields: {
            business_name:  {
                name: 'business_name',
                value: this.props.data.business_name || '',
                error: '',
                validation: {
                    required: true
                }
            },
            email_address:  {
                name: 'email_address',
                value: this.props.data.email_address || '',
                error: '',
                validation: {
                    required: true
                }
            },
            rc_number:  {
                name: 'rc_number',
                value: this.props.data.rc_number || '',
                error: '',
                validation: {
                    required: true
                }
            },
            tin_number:  {
                name: 'tin_number',
                value: this.props.data.tin_number || '',
                error: '',
                validation: {
                    required: true
                }
            },
            address:  {
                name: 'address',
                value: this.props.data.address || '',
                error: '',
                validation: {
                    required: true
                }
            }
        },
        valid: false
    };

    handleChange = (e) => {
        this.validate(e.currentTarget);
    };

    handleSubmit = e => {
        this.props.onEdit(this.getValue());
    }

    render() {
        const {fields: {business_name,  email_address, rc_number, tin_number, address}} = this.state;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} className="mt-3">

                    {/*Business Name*/}
                    <Input
                        name={business_name.name}
                        label="Business name"
                        value={business_name.value}
                        error={business_name.error}
                        disabled={true}
                        onChange={this.handleChange}
                    />

                    {/*Email Address*/}
                    <Input
                        name={email_address.name}
                        label="Email Address"
                        value={email_address.value}
                        error={email_address.error}
                        disabled={true}
                        onChange={this.handleChange}
                    />

                    {/*RC Number*/}
                    <Input
                        name={rc_number.name}
                        label="RC Number"
                        value={rc_number.value}
                        error={rc_number.error}
                        disabled={true}
                        onChange={this.handleChange}
                    />

                    {/*TIN Number*/}
                    <Input
                        name={tin_number.name}
                        label="TIN Number"
                        value={tin_number.value}
                        error={tin_number.error}
                        disabled={true}
                        onChange={this.handleChange}
                    />

                    {/*Address*/}
                    <Input
                        name={address.name}
                        label="Address"
                        value={address.value}
                        error={address.error}
                        onChange={this.handleChange}
                    />


                    <Button
                        className="btn Btn Btn-orange Btn-h50 btn-block mt-4 font-w600"
                        onClick={this.handleSubmit}
                        type="button"
                    >
                        Save
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

export default connect(null, mapDispatchToProps)(withSnackbar(EditProfileForm));

