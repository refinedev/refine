import { Dispatch } from "redux";

import { ActionTypes } from "@redux/actionTypes";

export const userActions = {
    login: (data: any) => (dispatch: Dispatch) => {
        dispatch({
            data,
            type: ActionTypes.Auth.User.Login,
        });
    },

    logout: () => (dispatch: Dispatch) => {
        dispatch({
            type: ActionTypes.Auth.User.Logout,
        });
    },
};
