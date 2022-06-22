export type ICloudContext = {
    baseUrl?: string;
    clientId?: string;
    resourcesName?: string;
};

export type CloudConfigProvider = Required<ICloudContext>;
