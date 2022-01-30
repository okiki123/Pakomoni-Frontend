export const REGEX = {
    EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    PHONE: /^[0]\d{10}$/,
    BVN: /^[0-9]{11}$/
};

export const validate = (value, validation = {}, fieldName = '') => {
    const defaultValidation = {
        required: false,
        email: false,
        min: 0,
        confirm: {
            check: false,
            referenceValue: ''
        }
    };

    const rules = {...defaultValidation, ...validation};

    if (!value) {
        return rules.required ? `This field is required` : null;
    }

    if (rules.email) {
        return REGEX.EMAIL.test(value) ? null : `${fieldName} is not a valid email`;
    }

    if (rules.phone) {
        return REGEX.PHONE.test(value) ? null : `${fieldName} is not a valid phone number`;
    }

    if (rules.bvn) {
        return REGEX.BVN.test(value) ? null : 'Enter a valid BVN';
    }

    if (rules.confirm.check) {
        return value === rules.confirm.referenceValue ? null : `password do not match`;
    }

    if (rules.min) {
        return value.length >= rules.min ? null : `${fieldName} must contain min of ${rules.min} characters`;
    }
};
