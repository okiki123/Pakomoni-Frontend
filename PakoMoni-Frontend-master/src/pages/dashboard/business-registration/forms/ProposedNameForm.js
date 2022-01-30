import React, {Fragment} from "react";
import BaseForm from "../../../../helpers/BaseForm";
import Input from "../../../../components/input/Input";

export default class ProposedNameForm extends BaseForm {
    state = {
        fields: {
            option1:  {
                name: 'option1',
                value: this.props.data && this.props.data[0] || '',
                error: '',
                validation: {
                    required: true
                }
            },
            option2: {
                name: 'option2',
                value: this.props.data && this.props.data[1] || '',
                error: '',
                validation: {
                    required: true
                }
            },
            option3:  {
                name: 'option3',
                value: this.props.data && this.props.data[2] || '',
                error: '',
                validation: {
                    required: true
                }
            },
            option4: {
                name: 'option4',
                value: this.props.data && this.props.data[3] || '',
                error: '',
                validation: {
                    required: true
                }
            },
        }
    };

    componentDidMount() {
        this.props.onLoad({value: this.getValue(), invalid: this.isInvalid()});
    }

    handleChange = (e) => {
        this.validate(e.currentTarget);
        this.props.onChange({value: this.getValue(), invalid: this.isInvalid() || !this.isDistinctNames()});
    };

    isDistinctNames = () => {
        let names = this.getValue();
        names = Object.values(names);
        const distinctNames = [...new Set(names)];
        return distinctNames.length === 4;
    }

    render() {
        const {fields: {option1, option2, option3, option4}} = this.state;
        return (
            <Fragment>
                <form>

                    {/* Option 1 */}
                    <Input
                        name={option1.name}
                        label="Option 1"
                        value={option1.value}
                        error={option1.error}
                        onChange={this.handleChange}
                    />

                    {/* Option 2 */}
                    <Input
                        name={option2.name}
                        label="Option 2"
                        value={option2.value}
                        error={option2.error}
                        onChange={this.handleChange}
                    />

                    {/* Option 3 */}
                    <Input
                        name={option3.name}
                        label="Option 3"
                        value={option3.value}
                        error={option3.error}
                        onChange={this.handleChange}
                    />

                    {/* Option 4 */}
                    <Input
                        name={option4.name}
                        label="Option 4"
                        value={option4.value}
                        error={option4.error}
                        onChange={this.handleChange}
                    />
                </form>
            </Fragment>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const previousProps = JSON.stringify(prevProps);
        const presentProps = JSON.stringify(this.props)

        if (this.props.data.length && previousProps !== presentProps) {
            const data = this.props.data;
            const fields = {...this.state.fields};
            fields.option1.value = data[0];
            fields.option2.value = data[1];
            fields.option3.value = data[2];
            fields.option4.value = data[3];

            this.setState({fields});
            this.props.onChange({value: this.getValue(), invalid: this.isInvalid()});
        }
    }
}
