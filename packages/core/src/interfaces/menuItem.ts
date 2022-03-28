import { IResourceItem } from "src";

export type ITreeMenu = IResourceItem & {
    children: ITreeMenu[];
};

export type IMenuItem = IResourceItem & {
    key: string;
    route: string;
};
