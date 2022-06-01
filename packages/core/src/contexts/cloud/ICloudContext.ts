import { Client } from "@pankod/refine-sdk";

export type ICloudContext =
    | {
          sdk: Client | undefined;
      }
    | undefined;

export type IContextContextProvider =
    | {
          cloudConfig?: ICloudConfig;
      }
    | undefined;

export type ICloudConfig = {
    baseUrl: string;
    clientId: string;
};
