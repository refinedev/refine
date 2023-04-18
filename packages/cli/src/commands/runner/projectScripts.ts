import { ProjectTypes } from "@definitions/projectTypes";

/**
 * Map `refine` cli commands to project script
 */
export const projectScripts = {
    [ProjectTypes.REACT_SCRIPT]: {
        dev: ["start"],
        start: ["start"],
        build: ["build"],
        getBin: () => require.resolve(".bin/react-scripts"),
    },
    [ProjectTypes.VITE]: {
        dev: ["dev"],
        start: ["preview"],
        build: ["build"],
        getBin: () => require.resolve(".bin/vite"),
    },
    [ProjectTypes.NEXTJS]: {
        dev: ["dev"],
        start: ["start"],
        build: ["build"],
        getBin: () => require.resolve(".bin/next"),
    },
    [ProjectTypes.REMIX]: {
        dev: ["dev"],
        start: ["build"],
        build: ["build"],
        getBin: (type: "dev" | "start" | "build") => {
            const binName = type === "start" ? "remix-serve" : "remix";
            return require.resolve(`.bin/${binName}`);
        },
    },
    [ProjectTypes.CRACO]: {
        dev: ["start"],
        start: ["start"],
        build: ["build"],
        getBin: () => require.resolve(".bin/craco"),
    },
    [ProjectTypes.PARCEL]: {
        dev: ["start"],
        start: ["start"],
        build: ["build"],
        getBin: () => require.resolve(".bin/parcel"),
    },
    [ProjectTypes.UNKNOWN]: {
        dev: [],
        start: [],
        build: [],
        getBin: () => {
            return "unknown";
        },
    },
};
