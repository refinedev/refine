import { IResourceItem } from "src/contexts/resource/IResourceContext";

export type ITreeMenu = IResourceItem & {
    children: ITreeMenu[];
};

export type IMenuItem = IResourceItem & {
    key: string;
    route: string;
};
