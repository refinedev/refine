import { combineReducers } from "redux";

import auth from "./auth";
import { ResourceReducer } from "./resources";

export default combineReducers({
    auth,
    resources: ResourceReducer,
});
