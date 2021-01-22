import { IAuthUserReducer } from "@interfaces";

export interface IState {
    auth: {
        user: IAuthUserReducer;
    };
}
