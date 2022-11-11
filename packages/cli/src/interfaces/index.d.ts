export type NpmOutdatedResponse = Record<
    string,
    {
        current: string;
        wanted: string;
        latest: string;
        dependet: "antd";
    }
>;

export type RefinePackages = {
    name: string;
    current: string;
    wanted: string;
    latest: string;
}[];
