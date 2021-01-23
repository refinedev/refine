import { Dispatch } from "redux";

import { ActionTypes } from "@redux/actionTypes";

export const UserActions = {
    setIdentity: (data: any) => (dispatch: Dispatch) => {
        dispatch({
            data,
            type: ActionTypes.Auth.User.SetIdentity,
        });
    },
};
