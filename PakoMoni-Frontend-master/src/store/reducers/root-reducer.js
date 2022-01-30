import { combineReducers } from "redux";
import appReducer from "./app-reducer";
import authReducer from "./auth-reducer";
import dashboardReducer from "./dashboard-reducer";
import adminReducer from "./admin-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    admin: adminReducer
});

export default rootReducer;
