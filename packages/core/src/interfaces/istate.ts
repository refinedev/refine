import { IAuthUserReducer } from "../interfaces";
import { IResourceReducer } from "./reducers/resource/resource";

export interface IState {
    auth: {
        user: IAuthUserReducer;
    };
    resources: {
        [name: string]: IResourceReducer;
    };
}
