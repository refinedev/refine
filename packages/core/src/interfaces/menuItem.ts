import { IResourceItem } from "src";

export type ITreeMenu = IMenuItem & {
    children: ITreeMenu[];
};

export type IMenuItem = IResourceItem & {
    key: string;
    route: string;
};
