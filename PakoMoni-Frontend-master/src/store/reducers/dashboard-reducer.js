import DASHBOARD from "../actions/dashboard-actions";

const initialState = {
    businessRegistration: {
        _id: '',
        created_at: '',
        names: [],
        updated_at: '',
        address: null,
        proprietors: [],
        commencementdate: '',
        documents: {},
        category: '',
        subcategory: '',
        description: ''
    },
    bankAccount: {},
    profile: {}
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case DASHBOARD.CHANGE_BUSINESS_REGISTRATION:
            return {
                ...state,
                businessRegistration: action.businessRegistration
            };

        case DASHBOARD.PATCH_BUSINESS_REGISTRATION:
            return {
                ...state,
                businessRegistration: {...state.businessRegistration, ...action.data}
            };

        case DASHBOARD.PATCH_BANK_ACCOUNT:
            return {
                ...state,
                bankAccount: {...state.bankAccount, ...action.data}
            };

        case DASHBOARD.CHANGE_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case DASHBOARD.PATCH_PROFILE:
            return {
                ...state,
                profile: {...state.profile, ...action.data}
            };

        default:
            return state;
    }

};

export default dashboardReducer;
