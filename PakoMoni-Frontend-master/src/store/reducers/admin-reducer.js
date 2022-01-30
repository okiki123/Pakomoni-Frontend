import ADMIN from "../actions/admin-actions";

const initialState = {
    businessRegistrations: [],
    businessRegistration: {
    },
    users: [],
    user: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN.CHANGE_BUSINESS_REGISTRATION:
            return {
                ...state,
                businessRegistration: action.businessRegistration
            };

        case ADMIN.CHANGE_BUSINESS_REGISTRATIONS:
            return {
                ...state,
                businessRegistrations: action.businessRegistrations
            };
        case ADMIN.PATCH_BUSINESS_REGISTRATION:
            return {
                ...state,
                businessRegistration: {...state.businessRegistration, ...action.data}
            };

        case ADMIN.CHANGE_USERS:
            return {
                ...state,
                users: action.users
            };

        case ADMIN.CHANGE_USER:
            return {
                ...state,
                user: action.user
            };

        case ADMIN.PATCH_USER:
            return {
                ...state,
                user: {...state.user, ...action.data}
            };

        default:
            return state;
    }

};

export default adminReducer;
