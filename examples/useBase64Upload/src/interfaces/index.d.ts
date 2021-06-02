import { UploadedFile, UploadFile } from "@pankod/refine";

export interface Upload extends UploadedFile, UploadFile {}

export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar: Upload[];
}
