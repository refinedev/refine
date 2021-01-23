import { ActionTypes } from "@redux/actionTypes";

import { IAuthUserReducer } from "@interfaces";

export const INITIAL_STATE: IAuthUserReducer = {};

export const UserReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case ActionTypes.Auth.User.SetIdentity:
            return {
                ...state,
                ...action.data,
            };

        default:
            return state;
    }
};
