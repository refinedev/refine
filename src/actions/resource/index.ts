import { Dispatch } from "redux";
import { ActionTypes } from "@redux/actionTypes";

import { IResourceReducer } from "@interfaces";

export const ResourceActions = {
    register: (data: { [name: string]: IResourceReducer }) => (
        dispatch: Dispatch,
    ) => {
        dispatch({
            data,
            type: ActionTypes.Resource.Register,
        });
    },
};
