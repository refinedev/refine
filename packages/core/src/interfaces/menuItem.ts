import { IResourceItem } from "../contexts/resource/IResourceContext";

export type ITreeMenu = IResourceItem & {
    children: ITreeMenu[];
};

export type IMenuItem = IResourceItem & {
    key: string;
    route: string;
};
