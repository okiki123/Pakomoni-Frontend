import React, {Fragment} from "react";
import BaseForm from "../../../../../helpers/BaseForm";
import Input from "../../../../../components/input/Input";
import Button from "../../../../../components/button/Button";
import AdminService from "../../../../../services/admin-service";
import APP from "../../../../../store/actions/app-actions";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import ADMIN from "../../../../../store/actions/admin-actions";
import Select from "../../../../../components/select/Select";

class UserForm extends BaseForm {
    state = {
        fields: {
            first_name:  {
                name: 'first_name',
                value: (this.props.user && this.props.user.full_name.split(' ')[0]) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            last_name:  {
                name: 'last_name',
                value: (this.props.user && this.props.user.full_name.split(' ')[1]) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            phone_number:  {
                name: 'phone_number',
                value: (this.props.user && this.props.user.phone) || '',
                error: '',
                validation: {
                    required: true,
                    phone: true
                }
            },
            role:  {
                name: 'role',
                value: (this.props.user && this.props.user.role) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            email_address:  {
                name: 'email_address',
                value: (this.props.user && this.props.user.email) || '',
                error: '',
                validation: {
                    required: true,
                    email: true
                }
            },
        }
    };

    handleChange = (e) => {
        this.validate(e.currentTarget);
    };

    handleSubmit = async e => {
        const formValue = this.getValue();
        const data = {
            full_name: formValue.first_name + ' ' + formValue.last_name,
            email: formValue.email_address,
            phone: formValue.phone_number,
            role: formValue.role
        }
        try {

            const action = this.props.edit ? 'updated' : 'created';

            this.props.showLoader();

            const response = this.props.edit ?
                await AdminService.patchUser(data, this.props.user._id) :
                await AdminService.createUser(data);

            this.props.patchUser(data);

            this.props.hideLoader();

            this.props.enqueueSnackbar(`User ${action} successfully`, {
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
        const {fields: {email_address, first_name, last_name, phone_number, role}} = this.state;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} >

                    <div className="row mx-0">

                        {/*First Name*/}
                        <div className="col-md-6">
                            <Input
                                name={first_name.name}
                                label="First Name"
                                value={first_name.value}
                                error={first_name.error}
                                onChange={this.handleChange}
                            />
                        </div>

                        {/*Last Name*/}
                        <div className="col-md-6">
                            <Input
                                name={last_name.name}
                                label="Last Name"
                                value={last_name.value}
                                error={last_name.error}
                                onChange={this.handleChange}
                            />
                        </div>

                        {/*Email Address*/}
                        <div className="col-md-6">
                            <Input
                                name={email_address.name}
                                label="Email Address"
                                value={email_address.value}
                                error={email_address.error}
                                disabled={this.props.edit}
                                onChange={this.handleChange}
                            />
                        </div>

                        {/*Phone number*/}
                        <div className="col-md-6">
                            <Input
                                name={phone_number.name}
                                label="Phone Number"
                                value={phone_number.value}
                                error={phone_number.error}
                                onChange={this.handleChange}
                            />
                        </div>

                        {/* Role */}
                        <div className="col-md-6">
                            <Select
                                name={role.name}
                                label="Role"
                                placeholder="Select Role"
                                options={[{label: 'Handler', value: 'Handler'}, {label: 'Admin', value: 'Admin'}]}
                                value={role.value}
                                error={role.error}
                                onChange={this.handleChange}
                            />
                        </div>

                    </div>

                    <div className="d-flex justify-content-end">
                        <Button
                            className="Btn-blue Btn-h50 font-w100 text-white Btn-standard"
                            disabled={this.isInvalid()}
                            onClick={this.handleSubmit}
                            type="button"
                        >
                            Submit
                        </Button>
                    </div>

                </form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        patchUser: (data) => dispatch({type: ADMIN.PATCH_USER, data})
    }
}

export default connect(null, mapDispatchToProps)(withSnackbar(UserForm));
