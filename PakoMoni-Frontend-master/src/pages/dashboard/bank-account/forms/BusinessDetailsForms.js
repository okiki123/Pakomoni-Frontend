import React, {Fragment} from "react";
import BaseForm from "../../../../helpers/BaseForm";
import Input from "../../../../components/input/Input";
import Select from "../../../../components/select/Select";
import DatePicker from "../../../../components/date-picker/DatePicker";
import Radio from "@material-ui/core/Radio";
import StaticService from "../../../../services/static-service";

export default class BusinessDetailsForms extends BaseForm {
    state = {
        fields: {
            business_name:  {
                name: 'business_name',
                value: (this.props.data && this.props.data.business_name) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            rc_number:  {
                name: 'rc_number',
                value: (this.props.data && this.props.data.rc_number) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            tin_number: {
                name: 'tin_number',
                value: (this.props.data && this.props.data.tin_number) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            state: {
                name: 'state',
                value: (this.props.data && this.props.data.state) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            lga: {
                name: 'lga',
                value: (this.props.data && this.props.data.lga) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            business_address: {
                name: 'business_address',
                value: (this.props.data && this.props.data.business_address) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            have_tin: {
                name: 'have_tin',
                value: (this.props.data && this.props.data.have_tin) || false,
                error: ''
            },
        },
        states: [],
        lgas: [],
        checked: false
    };

    async componentDidMount() {
        const states = await StaticService.getStates();
        this.setState(prevState => {
            return {
                ...prevState,
                states
            }
        })
        if (this.state.fields.state.value) {

            await this.getLGAs(this.state.fields.state.value)
        }
    }

    handleChange = (e) => {
        this.validate(e.currentTarget || e);
        this.props.onChange({invalid: this.isInvalid(), value: this.getValue()});
    };

    handleSubmit = e => {
        // Call backend
    }

    setChecked = () => {
        const checked = !this.state.fields.have_tin.value;
        const fields = {...this.state.fields};

        if (checked) {
            fields.tin_number.value = "";
            fields.tin_number.validation.required = false;
            fields.tin_number.error = "";
            fields.have_tin.value = true;
        } else {
            fields.tin_number.validation.required = true;
            fields.have_tin.value = false;
        }

        this.props.onChange({invalid: this.isInvalid(), value: this.getValue});
        this.setState({fields});
    }

    getLGAs = async (state) => {
        const lgas = await StaticService.getLGAs(state);
        this.setState(prevState => {
            return {
                ...prevState,
                lgas
            }
        })
    }

    render() {
        const {
            fields: {business_address, business_name, lga, state, tin_number, rc_number, have_tin},
            states,
            lgas
        } = this.state;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} >

                    {/*Business Name*/}
                    <Input
                        name={business_name.name}
                        value={business_name.value}
                        error={business_name.error}
                        placeholder="Business Name"
                        label="Business Name"
                        onChange={this.handleChange}
                    />

                    {/*RC number*/}
                    <Input
                        name={rc_number.name}
                        label="RC Number"
                        value={rc_number.value}
                        error={rc_number.error}
                        placeholder="RC Number"
                        onChange={this.handleChange}
                    />

                    {/*TIN number*/}
                    <Input
                        name={tin_number.name}
                        label="TIN Number"
                        readOnly={have_tin.value}
                        value={tin_number.value}
                        error={tin_number.error}
                        placeholder="TIN Number"
                        onChange={this.handleChange}
                    />

                    <div className="mb-3 d-flex align-items-center">
                        <Radio
                            checked={have_tin.value}
                            onClick={this.setChecked}
                            value="a"
                            color="primary"
                            name={have_tin.name}
                            inputProps={{ 'aria-label': 'A' }}
                            className="mr-2"
                        />
                        <div>I don't have a TIN number</div>
                    </div>

                    {/*Address*/}
                    <Input
                        name={business_address.name}
                        label="Business Address"
                        value={business_address.value}
                        error={business_address.error}
                        placeholder="Business Address"
                        onChange={this.handleChange}
                    />


                    {/* State and LGA */}
                    <div className="row mx-0 align-items-end">
                        <div className="col-md-6 px-md-1">
                            <Select
                                name={state.name}
                                value={state.value}
                                error={state.error}
                                placeholder="State"
                                label="State"
                                options={states}
                                onChange={(e) => {this.handleChange(e); this.getLGAs(e.currentTarget.value)}}
                            />
                        </div>
                        <div className="col-md-6 px-md-1">
                            <Select
                                name={lga.name}
                                value={lga.value}
                                error={lga.error}
                                placeholder="LGA"
                                label="LGA"
                                options={lgas}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </form>
            </Fragment>
        );
    }
}
