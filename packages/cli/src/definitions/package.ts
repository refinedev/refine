export enum PackageManagerTypes {
  NPM = "npm",
  YARN = "yarn",
  PNPM = "pnpm",
}

export type NpmOutdatedResponse = Record<
  string,
  {
    current: string;
    wanted: string;
    latest: string;
    dependet?: string;
  }
>;

export type RefinePackageInstalledVersionData = {
  name: string;
  current: string;
  wanted: string;
  latest: string;
  changelog?: string;
};
