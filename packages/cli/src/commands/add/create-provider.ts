import { copySync, mkdirSync, pathExistsSync } from "fs-extra";
import { join } from "path";
import { getProjectType } from "@utils/project";
import { getProviderPath } from "@utils/resource";

const templatePath = `${__dirname}/../templates/provider`;

export type Provider =
    | "auth"
    | "live"
    | "data"
    | "access-control"
    | "notification"
    | "i18n"
    | "audit-log";

export const providerArgs: Provider[] = [
    "auth",
    "live",
    "data",
    "access-control",
    "notification",
    "i18n",
    "audit-log",
];

export const createProvider = (providers: string[], pathFromArgs?: string) => {
    providers.forEach((arg) => {
        const { fileName, templatePath } = getProviderOptions(arg as Provider);
        const folderPath = pathFromArgs ?? getDefaultPath();
        const filePath = join(folderPath, fileName);
        const fullPath = join(process.cwd(), folderPath, fileName);

        if (pathExistsSync(fullPath)) {
            console.error(`❌ Provider (${filePath}) already exist!`);
            return;
        }

        // create destination dir
        mkdirSync(folderPath, { recursive: true });

        // copy template file to destination
        copySync(templatePath, fullPath);

        console.log(`🎉 Provider (${filePath}) created successfully!`);
    });
};

export const providerOptions: {
    [key in Provider]: {
        fileName: string;
        templatePath: string;
    };
} = {
    auth: {
        fileName: "auth-provider.tsx",
        templatePath: `${templatePath}/demo-auth-provider.tsx`,
    },
    live: {
        fileName: "live-provider.tsx",
        templatePath: `${templatePath}/demo-live-provider.tsx`,
    },
    data: {
        fileName: "data-provider.tsx",
        templatePath: `${templatePath}/demo-data-provider.tsx`,
    },
    "access-control": {
        fileName: "access-control-provider.tsx",
        templatePath: `${templatePath}/demo-access-control-provider.tsx`,
    },
    notification: {
        fileName: "notification-provider.tsx",
        templatePath: `${templatePath}/demo-notification-provider.tsx`,
    },
    i18n: {
        fileName: "i18n-provider.tsx",
        templatePath: `${templatePath}/demo-i18n-provider.tsx`,
    },
    "audit-log": {
        fileName: "audit-log-provider.tsx",
        templatePath: `${templatePath}/demo-audit-log-provider.tsx`,
    },
};

export const getProviderOptions = (provider: Provider) => {
    if (!providerOptions?.[provider]) {
        throw new Error(`Invalid provider: ${provider}`);
    }

    return providerOptions[provider];
};

export const getDefaultPath = () => {
    const projectType = getProjectType();
    const { path } = getProviderPath(projectType);
    return path;
};
