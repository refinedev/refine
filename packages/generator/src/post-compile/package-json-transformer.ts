export type PackageJsonTransformer = (pkg: Record<string, any>) => Record<string, any>;

export const noOpPackageJsonTransformer: PackageJsonTransformer = (pkg) => pkg;

export const replaceName = (packageName: string): PackageJsonTransformer => (pkg) => {
    const newPkg = { ...pkg };
    newPkg.name = packageName;
    return newPkg;
}

export const replaceVersion = (version: string): PackageJsonTransformer => (pkg) => {
    const newPkg = { ...pkg };
    newPkg.version = version;
    return newPkg;
}

export const addScripts = (scripts: Record<string, string | undefined>): PackageJsonTransformer => (pkg) => {
    const newPkg = { ...pkg };
    newPkg.scripts = { ...newPkg.scripts, ...scripts };
    return newPkg;
}

export const updateDependencies = (dependencies: Record<string, string>, type?: "peer" | "dev"): PackageJsonTransformer => (pkg) => {
    const newPkg = { ...pkg };
    const depType = type ? `${type}Dependencies` : "dependencies";
    newPkg[depType] = { ...newPkg[depType], ...dependencies };
    return newPkg;
}
