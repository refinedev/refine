import { UploadFile } from "@pankod/refine-antd";

export interface IUserAvatar {
    name: string;
    url: string;
    size: number;
    uid: string;
}

export interface IUserVariable {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar: UploadFile[];
}

export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar: IUserAvatar[];
}
