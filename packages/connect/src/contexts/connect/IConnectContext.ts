export type IConnectContext = {
    baseUrl?: string;
    clientId?: string;
    resourcesName?: string;
};

export type ConnectConfigProvider = Required<IConnectContext>;
