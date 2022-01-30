import React, {Fragment} from "react";
import BaseForm from "../../../../../helpers/BaseForm";
import Input from "../../../../../components/input/Input";
import Button from "../../../../../components/button/Button";

export default class ProprietorForm extends BaseForm {
    state = {
        fields: {
            full_name:  {
                name: 'full_name',
                value: null,
                error: '',
                validation: {
                    required: true
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
            phone: {
                name: 'phone',
                value: '',
                error: '',
                validation: {
                    required: true,
                    phone: true
                }
            },
            address:  {
                name: 'address',
                value: '',
                error: '',
                validation: {
                    required: true
                }
            }
        }
    };

    handleChange = (e) => {
        this.validate(e.currentTarget);
    };

    handleAdd = () => {
        this.props.onAdd(this.getValue());
    }

    render() {
        const {fields: {full_name, email, phone, address}} = this.state;
        return (
            <Fragment>
                <form>

                    <div className="row">

                        {/*Names*/}
                        <div className="col-md-6 mb-2">
                            <Input
                                name={full_name.name}
                                label="Name"
                                value={full_name.value}
                                error={full_name.error}
                                placeholder="Name"
                                onChange={this.handleChange}
                            />
                        </div>

                        {/*Email*/}
                        <div className="col-md-6 mb-2">
                            <Input
                                name={email.name}
                                type="email"
                                label="Email"
                                value={email.value}
                                error={email.error}
                                placeholder="Email"
                                onChange={this.handleChange}
                            />
                        </div>

                        {/*Phone number*/}
                        <div className="col-md-6 mb-2">
                            <Input
                                name={phone.name}
                                label="Phone Number"
                                value={phone.value}
                                error={phone.error}
                                placeholder="Phone Number"
                                onChange={this.handleChange}
                            />
                        </div>

                        {/*Address*/}
                        <div className="col-md-6 mb-2">
                            <Input
                                name={address.name}
                                label="Address"
                                value={address.value}
                                error={address.error}
                                placeholder="Address"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex">
                        <Button
                            className="Btn-dark-blue text-white mr-2"
                            type="button"
                            disabled={this.isInvalid()}
                            onClick={this.handleAdd}
                        >
                            Add
                        </Button>

                        <Button
                            className="Btn-outline-dark-blue"
                            onClick={this.props.onCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Fragment>
        );
    }
}
