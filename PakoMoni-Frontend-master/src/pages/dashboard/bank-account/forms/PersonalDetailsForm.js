import React, {Fragment} from "react";
import BaseForm from "../../../../helpers/BaseForm";
import Input from "../../../../components/input/Input";
import Select from "../../../../components/select/Select";
import DatePicker from "../../../../components/date-picker/DatePicker";
import utils from "../../../../helpers/utils";
import StaticService from "../../../../services/static-service";

export default class PersonalDetailsForm extends BaseForm {
    state = {
        fields: {
            title:  {
                name: 'title',
                value: (this.props.data && this.props.data.title) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            name:  {
                name: 'name',
                value: (this.props.data && this.props.data.name) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            gender: {
                name: 'gender',
                value: (this.props.data && this.props.data.gender) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            dateOfBirth:  {
                name: 'dateOfBirth',
                value: (this.props.data && this.props.data.dateOfBirth) || null,
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
            address: {
                name: 'address',
                value: (this.props.data && this.props.data.address) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            bvn: {
                name: 'bvn',
                value: (this.props.data && this.props.data.bvn) || '',
                error: '',
                validation: {
                    required: true,
                    bvn: true
                }
            }
        },
        states: [],
        lgas: [],
        genders: [],
        titles: []
    };

    async componentDidMount() {
        const states = await StaticService.getStates();
        const titles = await StaticService.getTitles();
        const genders = await StaticService.getGenders();

        this.setState(prevState => {
            return {...prevState, states, genders, titles}
        });

        if (this.state.fields.state.value) {
            await this.getLGAs(this.state.fields.state.value)
        }
    }

    handleChange = (e) => {
        this.validate(e.currentTarget || e);
        this.props.onChange({invalid: this.isInvalid(), value: this.getValue()});
    };

    handleDateChange = (e) => {
        this.handleChange({name: this.state.fields.dateOfBirth.name, value: utils.setDate(e)})
    }

    handleSubmit = e => {
        // Call backend
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
            fields: {name, address, lga, dateOfBirth, state, gender, title, bvn},
            states, lgas, genders, titles
        } = this.state;

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} >

                    {/*Title*/}
                    <Select
                        name={title.name}
                        value={title.value}
                        error={title.error}
                        placeholder="Title"
                        label="Title"
                        options={titles}
                        onChange={this.handleChange}
                    />

                    {/*Name*/}
                    <Input
                        name={name.name}
                        label="Name"
                        value={name.value}
                        error={name.error}
                        placeholder="Name"
                        onChange={this.handleChange}
                    />

                    {/*Gender*/}
                    <Select
                        name={gender.name}
                        value={gender.value}
                        error={gender.error}
                        placeholder="Gender"
                        label="Gender"
                        options={genders}
                        onChange={this.handleChange}
                    />


                    {/*Date of birth*/}
                    <DatePicker
                        name={dateOfBirth.name}
                        error={dateOfBirth.error}
                        value={dateOfBirth.value}
                        label="Date of birth"
                        onDateChange={this.handleDateChange}
                        placeholder="DD/MM/YYYY"
                    />

                    {/*Address*/}
                    <Input
                        name={address.name}
                        label="Address"
                        value={address.value}
                        error={address.error}
                        placeholder="Address"
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

                    {/*BVN*/}
                    <Input
                        name={bvn.name}
                        label="BVN"
                        value={bvn.value}
                        error={bvn.error}
                        placeholder="BVN"
                        onChange={this.handleChange}
                    />
                </form>
            </Fragment>
        );
    }
}
