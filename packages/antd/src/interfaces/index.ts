import { IResourceItem } from "@refinedev/core";

export type BaseRecord = {
  id?: string;
  [key: string]: any;
};
export interface Option {
  label: string;
  value: string;
}

export type ITreeMenu = IMenuItem & {
  children: ITreeMenu[];
};

export type IMenuItem = IResourceItem & {
  key: string;
  route: string;
};

export * from "./field";
export * from "./upload";
