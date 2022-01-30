import React, {Fragment} from "react";
import BaseForm from "../../../../helpers/BaseForm";
import Input from "../../../../components/input/Input";
import Select from "../../../../components/select/Select";
import TextArea from "../../../../components/textarea/TextArea";
import DatePicker from "../../../../components/date-picker/DatePicker";
import utils from "../../../../helpers/utils";
import StaticService from "../../../../services/static-service";

export default class BusinessDetailsForm extends BaseForm {
    state = {
        fields: {
            date:  {
                name: 'date',
                value: (this.props.data?.commencementdate) || null,
                error: '',
                validation: {
                    required: true
                }
            },
            no:  {
                name: 'no',
                value: (this.props.data?.address?.number) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            street: {
                name: 'street',
                value: (this.props.data?.address?.street) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            city:  {
                name: 'city',
                value: (this.props.data?.address?.city) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            state: {
                name: 'state',
                value: (this.props.data?.address?.state) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            lga: {
                name: 'lga',
                value: (this.props.data?.address?.lga) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            category: {
                name: 'category',
                value: (this.props.data?.category) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            subCategory: {
                name: 'subCategory',
                value: (this.props.data?.subcategory) || '',
                error: '',
                validation: {
                    required: true
                }
            },
            businessDescription: {
                name: 'businessDescription',
                value: (this.props.data?.description) || '',
                error: '',
                validation: {
                    required: true,
                    min: 70
                }
            },
        },
        states: [],
        lgas: [],
        categories: [],
        sub_categories: []
    };

    async componentDidMount() {
        const states = await StaticService.getStates();
        const categories = await StaticService.getCategories();
        this.setState(prevState => {
            return {
                ...prevState,
                states,
                categories
            }
        })
        if (this.state.fields.state.value) {

            await this.getLGAs(this.state.fields.state.value)
        }
        if (this.state.fields.category.value) {
            await this.getSubCategories(this.state.fields.category.value)
        }
        this.props.onLoad({value: this.getValue(), invalid: this.isInvalid()});
    }

    handleChange = (e) => {
        this.validate(e.currentTarget || e);
        this.props.onChange({invalid: this.isInvalid(), value: this.getValue()});
    };

    getLGAs = async (state) => {
        const lgas = await StaticService.getLGAs(state);
        this.setState(prevState => {
            return {
                ...prevState,
                lgas
            }
        })
    }

    getSubCategories = async (category) => {
        const sub_categories = await StaticService.getSubCategories(category);
        this.setState(prevState => {
            return {
                ...prevState,
                sub_categories
            }
        })
    }

    handleDateChange = (e) => {
        this.handleChange({name: this.state.fields.date.name, value: utils.setDate(e)})
    }

    handleSubmit = e => {
        // Call backend
    }

    render() {
        const {
            fields: {no, state, street, city, lga, category, subCategory, businessDescription, date},
            states,
            lgas,
            categories,
            sub_categories
        } = this.state;
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} >

                    {/*DatePicker*/}
                    <DatePicker
                        name={date.name}
                        error={date.error}
                        value={date.value}
                        label="Business Commencement Date *"
                        onDateChange={this.handleDateChange}
                        placeholder="DD/MM/YYYY" />

                    {/* Address */}
                    <div className="row mx-0 align-items-end">
                        <div className="col-md-2 px-1">
                            <Input
                                type="number"
                                name={no.name}
                                label="Address *"
                                value={no.value}
                                error={no.error}
                                placeholder="No"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-md-6 px-1">
                            <Input
                                name={street.name}
                                value={street.value}
                                error={street.error}
                                placeholder="Street Name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-md-4 px-1">
                            <Input
                                name={city.name}
                                value={city.value}
                                error={city.error}
                                placeholder="City"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="col-md-6 px-1">
                            <Select
                                name={state.name}
                                value={state.value}
                                error={state.error}
                                placeholder="State"
                                options={states}
                                onChange={(e) => {this.handleChange(e); this.getLGAs(e.currentTarget.value)}}
                            />
                        </div>
                        <div className="col-md-6 px-1">
                            <Select
                                name={lga.name}
                                value={lga.value}
                                error={lga.error}
                                placeholder="LGA"
                                options={lgas}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    {/*Category*/}
                    <Select
                        name={category.name}
                        value={category.value}
                        label="Category *"
                        error={category.error}
                        placeholder="Select Category"
                        options={categories}
                        onChange={(e) => {this.handleChange(e); this.getSubCategories(e.currentTarget.value)}}
                    />

                    {/*Subcategory*/}
                    <Select
                        name={subCategory.name}
                        value={subCategory.value}
                        label="Sub-Category *"
                        error={subCategory.error}
                        placeholder="Select Sub-Category"
                        options={sub_categories}
                        onChange={this.handleChange}
                    />

                    {/*Business Description*/}
                    <TextArea
                        name={businessDescription.name}
                        value={businessDescription.value}
                        label="Business Description *"
                        error={businessDescription.error}
                        placeholder="Describe what your business does here"
                        onChange={this.handleChange}
                    />
                </form>
            </Fragment>
        );
    }
}
