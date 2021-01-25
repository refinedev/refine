import { ActionTypes } from "@redux/actionTypes";

export const ResourceReducer = (state = {}, action: any) => {
    switch (action.type) {
        case ActionTypes.Resource.Register:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
};
