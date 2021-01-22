import { combineReducers } from "redux";

import { UserReducer } from "./user";

export default combineReducers({
    user: UserReducer,
});
