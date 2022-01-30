import APP from "../actions/app-actions";

const initialState = {
    showLoader: false,
    auth: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP.SHOW_LOADER:
            return {
                ...state,
                showLoader: true
            };

        case APP.HIDE_LOADER:
            return {
                ...state,
                showLoader: false
            };

        default:
            return state;
    }
}

export default appReducer;
