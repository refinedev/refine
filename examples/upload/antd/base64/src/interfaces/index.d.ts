import { UploadFile } from "@pankod/refine-antd";

export interface IUserAvatar {
    name: string;
    url: string;
    size: number;
    uid: string;
}

export interface IUserVariable {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: UploadFile[];
}

export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: IUserAvatar[];
}
