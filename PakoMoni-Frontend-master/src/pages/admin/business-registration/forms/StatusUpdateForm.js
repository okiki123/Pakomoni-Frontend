import React, {Fragment} from "react";
import BaseForm from "../../../../helpers/BaseForm";
import Input from "../../../../components/input/Input";
import Select from "../../../../components/select/Select";
import TextArea from "../../../../components/textarea/TextArea";
import FileInput from "../../../../components/file-input/FileInput";
import Button from "../../../../components/button/Button";
import APP from "../../../../store/actions/app-actions";
import AUTH from "../../../../store/actions/auth-actions";
import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import AdminService from "../../../../services/admin-service";

class StatusUpdateForm extends BaseForm {
    state = {
        fields: {
            name_reservation_status:  {
                name: 'name_reservation_status',
                value: '',
                error: '',
                group: 'name_reservation',
                subGroup: 'head',
                validation: {
                    required: false
                }
            },
            name_reservation_error_reason:  {
                name: 'name_reservation_error_reason',
                value: '',
                error: '',
                show: false,
                group: 'name_reservation',
                subGroup: 'error',
                validation: {
                    required: false
                }
            },
            name_reservation_reserved_name: {
                name: 'name_reservation_reserved_name',
                value: '',
                error: '',
                show: false,
                group: 'name_reservation',
                subGroup: 'other',
                validation: {
                    required: false
                }
            },
            name_registration_status:  {
                name: 'name_registration_status',
                value: '',
                error: '',
                group: 'name_registration',
                subGroup: 'head',
                validation: {
                    required: false
                }
            },
            name_registration_error_reason: {
                name: 'name_registration_error_reason',
                value: '',
                error: '',
                group: 'name_registration',
                subGroup: 'error',
                validation: {
                    required: false
                }
            },
            name_registration_bn_number: {
                name: 'lga',
                value: '',
                error: '',
                group: 'name_registration',
                subGroup: 'other',
                validation: {
                    required: true
                }
            },
            name_registration_status_form: {
                name: 'name_registration_status_form',
                value: '',
                error: '',
                label: 'Upload E-Status Form',
                group: 'name_registration',
                subGroup: 'other',
                validation: {
                    required: false
                }
            },
            name_registration_cac_certificate: {
                name: 'name_registration_cac_certificate',
                value: '',
                error: '',
                label: 'Upload CAC certificate',
                group: 'name_registration',
                subGroup: 'other',
                validation: {
                    required: false
                }
            },
            tin_number_status: {
                name: 'tin_number_status',
                value: '',
                error: '',
                group: 'tin_number',
                subGroup: 'head',
                validation: {
                    required: false
                }
            },
            tin_number_error_reason: {
                name: 'tin_number_error_reason',
                value: '',
                error: '',
                group: 'tin_number',
                subGroup: 'error',
                validation: {
                    required: false
                }
            },
            tin_number_number: {
                name: 'tin_number_number',
                value: '',
                error: '',
                group: 'tin_number',
                subGroup: 'other',
                validation: {
                    required: false
                }
            },
            bank_account_status: {
                name: 'bank_account_status',
                value: '',
                error: '',
                group: 'bank_account',
                subGroup: 'head',
                validation: {
                    required: false
                }
            },
            bank_account_error_reason: {
                name: 'bank_account_error_reason',
                value: '',
                error: '',
                group: 'bank_account',
                subGroup: 'error',
                validation: {
                    required: false
                }
            },
            bank_account_bank: {
                name: 'bank_account_bank',
                value: '',
                error: '',
                group: 'bank_account',
                subGroup: 'other',
                validation: {
                    required: false
                }
            },
            bank_account_account_number: {
                name: 'bank_account_account_number',
                value: '',
                error: '',
                group: 'bank_account',
                subGroup: 'other',
                validation: {
                    required: false
                }
            },
        },
        active: {
            group: 'name_reservation',
            subGroup: ''
        }
    };

    options = [
        {label: 'In-Progress', value: 'in progress'},
        {label: 'Error', value: 'error'},
        {label: 'Completed', value: 'completed'},
    ];

    statuses = {
        'in progress': 'IN PROGRESS',
        'error': 'ERROR',
        'completed': 'COMPLETED'
    }

    errorReasonText = 'Enter reason for error here';

    keyValues = {
        name_reservation: 'Name Reservation Status'
    }

    constructor(props) {
        super(props);
        const state = {
            fields: {
                name_reservation_status:  {
                    name: 'name_reservation_status',
                    value: '',
                    error: '',
                    group: 'name_reservation',
                    subGroup: 'head',
                    validation: {
                        required: false
                    }
                },
                name_reservation_error_reason:  {
                    name: 'name_reservation_error_reason',
                    value: '',
                    error: '',
                    show: false,
                    group: 'name_reservation',
                    subGroup: 'error',
                    validation: {
                        required: false
                    }
                },
                name_reservation_reserved_name: {
                    name: 'name_reservation_reserved_name',
                    value: '',
                    error: '',
                    show: false,
                    group: 'name_reservation',
                    subGroup: 'other',
                    validation: {
                        required: false
                    }
                },
                name_registration_status:  {
                    name: 'name_registration_status',
                    value: '',
                    error: '',
                    group: 'name_registration',
                    subGroup: 'head',
                    validation: {
                        required: false
                    }
                },
                name_registration_error_reason: {
                    name: 'name_registration_error_reason',
                    value: '',
                    error: '',
                    group: 'name_registration',
                    subGroup: 'error',
                    validation: {
                        required: false
                    }
                },
                name_registration_bn_number: {
                    name: 'lga',
                    value: '',
                    error: '',
                    group: 'name_registration',
                    subGroup: 'other',
                    validation: {
                        required: true
                    }
                },
                name_registration_status_form: {
                    name: 'name_registration_status_form',
                    value: '',
                    error: '',
                    label: 'Upload E-Status Form',
                    group: 'name_registration',
                    subGroup: 'other',
                    validation: {
                        required: false
                    }
                },
                name_registration_cac_certificate: {
                    name: 'name_registration_cac_certificate',
                    value: '',
                    error: '',
                    label: 'Upload CAC certificate',
                    group: 'name_registration',
                    subGroup: 'other',
                    validation: {
                        required: false
                    }
                },
                tin_number_status: {
                    name: 'tin_number_status',
                    value: '',
                    error: '',
                    group: 'tin_number',
                    subGroup: 'head',
                    validation: {
                        required: false
                    }
                },
                tin_number_error_reason: {
                    name: 'tin_number_error_reason',
                    value: '',
                    error: '',
                    group: 'tin_number',
                    subGroup: 'error',
                    validation: {
                        required: false
                    }
                },
                tin_number_number: {
                    name: 'tin_number_number',
                    value: '',
                    error: '',
                    group: 'tin_number',
                    subGroup: 'other',
                    validation: {
                        required: false
                    }
                },
                bank_account_status: {
                    name: 'bank_account_status',
                    value: '',
                    error: '',
                    group: 'bank_account',
                    subGroup: 'head',
                    validation: {
                        required: false
                    }
                },
                bank_account_error_reason: {
                    name: 'bank_account_error_reason',
                    value: '',
                    error: '',
                    group: 'bank_account',
                    subGroup: 'error',
                    validation: {
                        required: false
                    }
                },
                bank_account_bank: {
                    name: 'bank_account_bank',
                    value: '',
                    error: '',
                    group: 'bank_account',
                    subGroup: 'other',
                    validation: {
                        required: false
                    }
                },
                bank_account_account_number: {
                    name: 'bank_account_account_number',
                    value: '',
                    error: '',
                    group: 'bank_account',
                    subGroup: 'other',
                    validation: {
                        required: false
                    }
                },
            },
            active: {
                group: 'name_reservation',
                subGroup: ''
            }
        };
        const {fields, active} = state;
        if (props.progress.length) {
            const name_reservation_status = props.progress.find(item => item.name === 'name_reservation_status');
            const name_registration_status = props.progress.find(item => item.name === 'name_registration_status');
            const tin_number_status = props.progress.find(item => item.name === 'tin_number_status');
            const bank_account_status = props.progress.find(item => item.name === 'bank_account_status');

            if (name_reservation_status) fields.name_reservation_status.value = name_reservation_status.status;
            if (name_registration_status) fields.name_registration_status.value = name_registration_status.status;
            if (tin_number_status) fields.tin_number_status.value = tin_number_status.status;
            if (bank_account_status) fields.bank_account_status.value = bank_account_status.status;

            if (!name_reservation_status) active.group = 'name_reservation';
            else if (
                (!name_registration_status && name_reservation_status?.status === 'completed') ||
                (name_registration_status && name_registration_status?.status !== 'completed')
            ) {
                active.group = 'name_registration';
            }
            else if (
                (!tin_number_status && name_registration_status?.status === 'completed') ||
                (tin_number_status && tin_number_status?.status !== 'completed')
            ) {
                active.group = 'tin_number';
            }
            else if (
                (!bank_account_status && tin_number_status?.status === 'completed') ||
                (bank_account_status && bank_account_status?.status !== 'completed')
            ) {
                active.group = 'bank_account';
            }

            state.fields = fields;
            state.active = active;

            this.state = state;
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (JSON.stringify(nextProps.progress) !== JSON.stringify(this.props.progress)) {
            const {fields, active} = this.state;
            if (nextProps.progress.length) {
                const name_reservation_status = nextProps.progress.find(item => item.name === 'name_reservation_status');
                const name_registration_status = nextProps.progress.find(item => item.name === 'name_registration_status');
                const tin_number_status = nextProps.progress.find(item => item.name === 'tin_number_status');
                const bank_account_status = nextProps.progress.find(item => item.name === 'bank_account_status');

                if (name_reservation_status) fields.name_reservation_status.value = name_reservation_status.status;
                if (name_registration_status) fields.name_registration_status.value = name_registration_status.status;
                if (tin_number_status) fields.tin_number_status.value = tin_number_status.status;
                if (bank_account_status) fields.bank_account_status.value = bank_account_status.status;


                if (!name_reservation_status) active.group = 'name_reservation';
                else if (
                    (!name_registration_status && name_reservation_status?.status === 'completed') ||
                    (name_registration_status && name_registration_status?.status !== 'completed')
                ) {
                    active.group = 'name_registration';
                    active.subGroup = '';
                }
                else if (
                    (!tin_number_status && name_registration_status?.status === 'completed') ||
                    (tin_number_status && tin_number_status?.status !== 'completed')
                ) {
                    active.group = 'tin_number';
                    active.subGroup = '';
                }
                else if (
                    (!bank_account_status && tin_number_status?.status === 'completed') ||
                    (bank_account_status && bank_account_status?.status !== 'completed')
                ){
                    active.group = 'bank_account';
                    active.subGroup = '';
                }

                this.setState({fields, active});
            }
        }
    }

    handleChange = (e, main = null) => {
        this.validate(e.currentTarget || e);

        if (main) {
            const active = {...this.state.active};
            active.subGroup = main.value === "error" ? 'error' : main.value === "completed" ? "other" : "";
            active.group = main.group;
            this.setState({active});
        }

    };

    handleFileChange = (e) => {
        const file = e.target.files[0];
        const name = e.currentTarget.name;
        const fields = {...this.state.fields};
        fields[name].label = file.name;
        this.setState({fields});
    }

    handleSubmit = async e => {
        e.preventDefault();
        let data;

        try {
            if (this.state.active.group === 'name_reservation') data = this.processNameReservation();

            if (this.state.active.group === 'name_registration') data = this.processNameRegistration();

            if (this.state.active.group === 'tin_number') data = this.processTinNumber();

            if (this.state.active.group === 'bank_account') data = this.processBankAccount();

            if (data) {
                this.props.showLoader();
                await AdminService.setBusinessStatus(data, this.props.id);
                this.props.hideLoader();
                this.props.onUpdate();
            }
        } catch (err) {
            this.props.enqueueSnackbar(err, {
                variant: 'error'
            });
            this.props.hideLoader();
        }
    }

    processNameReservation = () => {
        const {
            name_reservation_status,
            name_reservation_reserved_name,
            name_reservation_error_reason
        } = this.state.fields;

        if (name_reservation_status.value === 'error' && name_reservation_error_reason.value) {
            return {
                name: name_reservation_status.name,
                type: this.statuses[name_reservation_status.value],
                status: true,
                error: name_reservation_error_reason.value
            }
        }
        else if (name_reservation_status.value === 'completed' && name_reservation_reserved_name) {
            return {
                name: name_reservation_status.name,
                type: this.statuses[name_reservation_status.value],
                status: true,
                reserved_name: name_reservation_reserved_name.value
            }
        }
        else if (name_reservation_status.value === 'in progress') {
            return {
                name: name_reservation_status.name,
                type: this.statuses[name_reservation_status.value],
                status: true
            }
        }
        else return false;

    }

    processNameRegistration = () => {
        const {
            name_registration_status,
            name_registration_bn_number,
            name_registration_error_reason,
            name_registration_cac_certificate,
            name_registration_status_form
        } = this.state.fields;

        if (name_registration_status.value === 'error' && name_registration_error_reason.value) {
            return {
                name: name_registration_status.name,
                type: this.statuses[name_registration_status.value],
                status: true,
                error: name_registration_error_reason.value
            }
        }
        else if (
            name_registration_status.value === 'completed' &&
            name_registration_bn_number &&
            name_registration_status_form &&
            name_registration_cac_certificate
        ) {
            return {
                name: name_registration_status.name,
                type: this.statuses[name_registration_status.value],
                status: true,
                bn_number: name_registration_bn_number.value
            }
        }
        else if (name_registration_status.value === 'in progress') {
            return {
                name: name_registration_status.name,
                type: this.statuses[name_registration_status.value],
                status: true
            }
        }
        else return false;

    }

    processTinNumber = () => {
        const {
            tin_number_status,
            tin_number_number,
            tin_number_error_reason
        } = this.state.fields;

        if (tin_number_status.value === 'error' && tin_number_error_reason.value) {
            return {
                name: tin_number_status.name,
                type: this.statuses[tin_number_status.value],
                status: true,
                error: tin_number_error_reason.value
            }
        }
        else if (
            tin_number_status.value === 'completed' &&
            tin_number_number
        ) {
            return {
                name: tin_number_status.name,
                type: this.statuses[tin_number_status.value],
                status: true,
                tin_number: tin_number_number.value
            }
        }
        else if (tin_number_status.value === 'in progress') {
            return {
                name: tin_number_status.name,
                type: this.statuses[tin_number_status.value],
                status: true
            }
        }
        else return false;

    }

    processBankAccount = () => {
        const {
            bank_account_status,
            bank_account_bank,
            bank_account_error_reason
        } = this.state.fields;

        if (bank_account_status.value === 'error' && bank_account_error_reason.value) {
            return {
                name: bank_account_status.name,
                type: this.statuses[bank_account_status.value],
                status: true,
                error: bank_account_error_reason.value
            }
        }
        else if (
            bank_account_status.value === 'completed' &&
            bank_account_bank
        ) {
            return {
                name: bank_account_status.name,
                type: this.statuses[bank_account_status.value],
                status: true,
                tin_number: bank_account_bank.value
            }
        }
        else if (bank_account_status.value === 'in progress') {
            return {
                name: bank_account_status.name,
                type: this.statuses[bank_account_status.value],
                status: true
            }
        }
        else return false;

    }

    render() {
        const {
            fields: {
                name_reservation_status, name_reservation_error_reason, name_reservation_reserved_name,
                name_registration_status, name_registration_error_reason, name_registration_bn_number,
                name_registration_cac_certificate, name_registration_status_form, tin_number_status, tin_number_error_reason,
                tin_number_number, bank_account_status, bank_account_account_number, bank_account_bank, bank_account_error_reason
            },
            active: {
                group, subGroup
            }
        } = this.state;

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} >

                    {/* Name Reservation */}
                    <div className="row mx-0">
                        <div className="col-md-5">
                            Name Reservation
                        </div>
                        <div className="col-md-7">
                            <Select
                                name={name_reservation_status.name}
                                value={name_reservation_status.value}
                                error={name_reservation_status.error}
                                options={this.options}
                                disabled={group !== name_reservation_status.group || name_reservation_status.value === 'completed'}
                                placeholder="Select Status"
                                onChange={(e) => this.handleChange(e, name_reservation_status)}
                            />

                            {
                                group === name_reservation_error_reason.group &&
                                subGroup === name_reservation_error_reason.subGroup &&
                                <TextArea
                                    name={name_reservation_error_reason.name}
                                    value={name_reservation_error_reason.value}
                                    error={name_reservation_error_reason.error}
                                    placeholder={this.errorReasonText}
                                    onChange={this.handleChange}
                                />
                            }

                            {
                                group === name_reservation_reserved_name.group &&
                                subGroup === name_reservation_reserved_name.subGroup &&
                                <Input
                                    name={name_reservation_reserved_name.name}
                                    value={name_reservation_reserved_name.value}
                                    error={name_reservation_reserved_name.error}
                                    placeholder="Enter reserved name here"
                                    onChange={this.handleChange}
                                />
                            }
                        </div>
                    </div>

                    {/* Name Registration */}
                    <div className="row mx-0">
                        <div className="col-md-5">
                            Name Registration
                        </div>
                        <div className="col-md-7">
                            <Select
                                name={name_registration_status.name}
                                value={name_registration_status.value}
                                error={name_registration_status.error}
                                options={this.options}
                                disabled={group !== name_registration_status.group}
                                placeholder="Select Status"
                                onChange={(e) => this.handleChange(e, name_registration_status)}
                            />

                            {
                                group === name_registration_error_reason.group &&
                                subGroup === name_registration_error_reason.subGroup &&
                                <TextArea
                                    name={name_registration_error_reason.name}
                                    value={name_registration_error_reason.value}
                                    error={name_registration_error_reason.error}
                                    placeholder={this.errorReasonText}
                                    onChange={this.handleChange}
                                />
                            }

                            {/*{*/}
                            {/*    group === name_registration_bn_number.group &&*/}
                            {/*    subGroup === name_registration_bn_number.subGroup &&*/}
                            {/*    <Input*/}
                            {/*        name={name_registration_bn_number.name}*/}
                            {/*        value={name_registration_bn_number.value}*/}
                            {/*        error={name_registration_bn_number.error}*/}
                            {/*        placeholder="Enter the"*/}
                            {/*        onChange={this.handleChange}*/}
                            {/*    />*/}
                            {/*}*/}

                            {
                                group === name_registration_status_form.group &&
                                subGroup === name_registration_status_form.subGroup &&
                                <FileInput
                                    name={name_registration_status_form.name}
                                    value={name_registration_status_form.value}
                                    error={name_registration_status_form.error}
                                    placeholder={name_registration_status_form.label}
                                    onChange={this.handleFileChange}
                                />
                            }

                            {
                                group === name_registration_cac_certificate.group &&
                                subGroup === name_registration_cac_certificate.subGroup &&
                                <FileInput
                                    name={name_registration_cac_certificate.name}
                                    value={name_registration_cac_certificate.value}
                                    error={name_registration_cac_certificate.error}
                                    placeholder={name_registration_cac_certificate.label}
                                    onChange={this.handleFileChange}
                                />
                            }
                        </div>
                    </div>

                    {/*TIN Number*/}
                    <div className="row mx-0">
                        <div className="col-md-5">
                            TIN Number
                        </div>
                        <div className="col-md-7">
                            <Select
                                name={tin_number_status.name}
                                value={tin_number_status.value}
                                error={tin_number_status.error}
                                options={this.options}
                                disabled={group !== tin_number_status.group}
                                placeholder="Select Status"
                                onChange={(e) => this.handleChange(e, tin_number_status)}
                            />

                            {
                                group === tin_number_error_reason.group &&
                                subGroup === tin_number_error_reason.subGroup &&
                                <TextArea
                                    name={tin_number_error_reason.name}
                                    value={tin_number_error_reason.value}
                                    error={tin_number_error_reason.error}
                                    placeholder={this.errorReasonText}
                                    onChange={this.handleChange}
                                />
                            }

                            {
                                group === tin_number_number.group &&
                                subGroup === tin_number_number.subGroup &&
                                <Input
                                    name={tin_number_number.name}
                                    value={tin_number_number.value}
                                    error={tin_number_number.error}
                                    placeholder="Enter TIN Number here"
                                    onChange={this.handleChange}
                                />
                            }
                        </div>
                    </div>

                    {/* Bank Account */}
                    <div className="row mx-0">
                        <div className="col-md-5">
                            Bank Account
                        </div>
                        <div className="col-md-7">
                            <Select
                                name={bank_account_status.name}
                                value={bank_account_status.value}
                                error={bank_account_status.error}
                                options={this.options}
                                disabled={group !== bank_account_status.group || bank_account_status.value === 'completed'}
                                placeholder="Select Status"
                                onChange={(e) => this.handleChange(e, bank_account_status)}
                            />

                            {
                                group === bank_account_error_reason.group &&
                                subGroup === bank_account_error_reason.subGroup &&
                                <TextArea
                                    name={bank_account_error_reason.name}
                                    value={bank_account_error_reason.value}
                                    error={bank_account_error_reason.error}
                                    placeholder={this.errorReasonText}
                                    onChange={this.handleChange}
                                />
                            }

                            {
                                group === bank_account_bank.group &&
                                subGroup === bank_account_bank.subGroup &&
                                <Select
                                    name={bank_account_bank.name}
                                    value={bank_account_bank.value}
                                    error={bank_account_bank.error}
                                    placeholder="Bank"
                                    options={[{label: 'First Bank', value: 'first bank'}]}
                                    onChange={this.handleChange}
                                />
                            }

                            {
                                group === bank_account_account_number.group &&
                                subGroup === bank_account_account_number.subGroup &&
                                <Input
                                    name={bank_account_account_number.name}
                                    value={bank_account_account_number.value}
                                    error={bank_account_account_number.error}
                                    placeholder="Account Number"
                                    onChange={this.handleChange}
                                />
                            }
                        </div>
                    </div>

                    <div style={{padding: '15px'}} className="d-flex justify-content-end">
                        <Button className="Btn-blue text-white Btn-standard">
                            Update
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
        changeUser: (user) => dispatch({type: AUTH.CHANGE_USER, user})
    }
}

export default connect(null, mapDispatchToProps)(withSnackbar(StatusUpdateForm))
