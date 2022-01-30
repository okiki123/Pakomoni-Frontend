import AUTH from "../actions/auth-actions";

const initialState = {
    loggedIn: false,
    user: null,
    registration: null,
    forgotPassword: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.CHANGE_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.loggedIn
            };

        case AUTH.CHANGE_USER:
            return {
                ...state,
                user: action.user
            };

        case AUTH.CHANGE_REGISTRATION:
            return {
                ...state,
                registration: action.registration
            };

        case AUTH.CHANGE_FORGOT_PASSWORD:
            return {
                ...state,
                forgotPassword: action.forgotPassword
            };

        case AUTH.PATCH_USER:
            return {
                ...state,
                user: {...state.user, ...action.data}
            };

        default:
            return state;
    }

};

export default authReducer;
