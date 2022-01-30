import React, {PureComponent} from "react";
import {validate} from "./validator";

export default class BaseForm extends PureComponent {
    isInvalid = () => {
        const fields = this.state.fields;
        const keys = Object.keys(fields);
        return keys.some(field => {
            return (fields[field].validation?.required && fields[field].value === '') || fields[field].error;
        });
    };

    getValue = () => {
        const value = {};
        const fields = this.state.fields;
        for (const key in fields) {
            value[key] = fields[key].value;
        }

        return value;
    };

    validate = ({name, value}) => {
        const fields = {...this.state.fields};
        fields[name].value = value;
        fields[name].error = validate(value, fields[name].validation, fields[name].name);
        if ( name === 'password' && fields.password_confirmation) {
            fields.password_confirmation.validation.confirm.referenceValue = value;
            if (fields.password_confirmation.value) {
                fields.password_confirmation.error = validate(
                    fields.password_confirmation.value,
                    fields.password_confirmation.validation,
                    fields.password_confirmation.name
                )
            }
        }
        this.setState({fields});
    }
}
