import { copySync, mkdirSync, pathExistsSync } from "fs-extra";
import { join } from "path";
import { getProjectType } from "@utils/project";
import { getProviderPath } from "@utils/resource";

export const providerArgs = ["auth", "live", "data"];

export const createProvider = (providers: string[], pathFromArgs?: string) => {
    providers.forEach((arg) => {
        const folderPath = pathFromArgs ?? getDefaultPath();
        const fileName = getFileNameByArg(arg);
        const filePath = join(folderPath, fileName);
        const fullPath = join(process.cwd(), folderPath, fileName);

        if (pathExistsSync(fullPath)) {
            console.error(`Provider (${filePath}) already exist! ❌`);
            return;
        }

        // create destination dir
        mkdirSync(folderPath, { recursive: true });

        // copy template file to destination
        copySync(getTemplatePathByArg(arg), fullPath);

        console.log(`Provider (${filePath}) created successfully!  🎉`);
    });
};

const getTemplatePathByArg = (arg: string) => {
    const dir = `${__dirname}/../templates/provider`;

    switch (arg) {
        case "auth":
            return `${dir}/demo-auth-provider.tsx`;
        case "live":
            return `${dir}/demo-live-provider.tsx`;
        case "data":
            return `${dir}/demo-data-provider.tsx`;
        default:
            throw new Error("Provider template not found");
    }
};

const getDefaultPath = () => {
    const projectType = getProjectType();
    const { path } = getProviderPath(projectType);
    return path;
};

const getFileNameByArg = (arg: string) => {
    switch (arg) {
        case "auth":
            return "auth-provider.tsx";
        case "live":
            return "live-provider.tsx";
        case "data":
            return "data-provider.tsx";
        default:
            throw new Error("Provider file name not found");
    }
};
