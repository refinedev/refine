import { ActionTypes } from "@redux/actionTypes";

import { IAuthUserReducer } from "@interfaces";

export const INITIAL_STATE: IAuthUserReducer = {
    isLogin: false,
};

export const UserReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.Auth.User.Me:
        case ActionTypes.Auth.User.Login:
            return {
                ...state,
                isLogin: true,
                ...action.data,
            };

        case ActionTypes.Auth.User.Logout:
            return INITIAL_STATE;

        default:
            return state;
    }
};
