import { IResourceItem } from "./bindings/resource";

// contexts
export * from "../contexts/resource/IResourceContext";

// custom components
export * from "./customComponents";

// mapData
export * from "./mapDataFn";

/* Backward compatible version of 'TreeMenuItem' */
export type ITreeMenu = IResourceItem & {
  key?: string;
  children: ITreeMenu[];
};

export type IMenuItem = IResourceItem & {
  key: string;
  route: string;
};

export * from "./bindings";

export * from "./prettify";
