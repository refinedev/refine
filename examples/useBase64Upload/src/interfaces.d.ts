import { UploadedFile } from "@pankod/refine";

export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar: UploadedFile[];
}
