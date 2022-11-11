export type NpmOutdatedResponse = Record<
    string,
    {
        current: string;
        wanted: string;
        latest: string;
        dependet: string;
    }
>;

export type RefinePackages = {
    name: string;
    current: string;
    wanted: string;
    latest: string;
}[];
