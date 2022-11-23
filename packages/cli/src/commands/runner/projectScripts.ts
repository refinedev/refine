import { ProjectTypes } from "@definitions/projectTypes";

const binPath = `${process.cwd()}/node_modules/.bin`;

/**
 * Map `refine` cli commands to project script
 */
export const projectScripts = {
    [ProjectTypes.REACT_SCRIPT]: {
        dev: ["start"],
        start: ["start"],
        build: ["build"],
        getBin: () => `${binPath}/react-scripts`,
    },
    [ProjectTypes.VITE]: {
        dev: ["start"],
        start: ["preview"],
        build: ["build"],
        getBin: () => `${binPath}/vite`,
    },
    [ProjectTypes.NEXTJS]: {
        dev: ["dev"],
        start: ["start"],
        build: ["build"],
        getBin: () => `${binPath}/next`,
    },
    [ProjectTypes.REMIX]: {
        dev: ["dev"],
        start: ["build"],
        build: ["build"],
        getBin: (type: "dev" | "start" | "build") => {
            const binName = type === "start" ? "remix-serve" : "remix";
            return `${binPath}/${binName}`;
        },
    },
    [ProjectTypes.CRACO]: {
        dev: ["start"],
        start: ["start"],
        build: ["build"],
        getBin: () => `${binPath}/craco`,
    },
};
