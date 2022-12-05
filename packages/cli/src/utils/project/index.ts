import { ProjectTypes, UIFrameworks } from "@definitions";
import { getDependencies, getDevDependencies } from "@utils/package";

export const getProjectType = (): ProjectTypes => {
    // read dependencies from package.json
    const dependencies = getDependencies();

    // check for craco
    // craco and react-scripts installs together. We need to check for craco first
    if (dependencies.includes("@craco/craco")) {
        return ProjectTypes.CRACO;
    }

    // check for react-scripts
    if (dependencies.includes("react-scripts")) {
        return ProjectTypes.REACT_SCRIPT;
    }

    // check for next
    if (dependencies.includes("next")) {
        return ProjectTypes.NEXTJS;
    }

    // check for remix
    if (dependencies.includes("@remix-run/react")) {
        return ProjectTypes.REMIX;
    }

    // check for vite
    const devDependencies = getDevDependencies();
    if (devDependencies.includes("vite")) {
        return ProjectTypes.VITE;
    }

    throw new Error("Project type not found");
};

export const getUIFramework = (): UIFrameworks | undefined => {
    // read dependencies from package.json
    const dependencies = getDependencies();

    // check for antd
    if (dependencies.includes("@pankod/refine-antd")) {
        return UIFrameworks.ANTD;
    }

    // check for mui
    if (dependencies.includes("@pankod/refine-mui")) {
        return UIFrameworks.MUI;
    }

    // check for chakra
    if (dependencies.includes("@pankod/refine-chakra-ui")) {
        return UIFrameworks.CHAKRA;
    }

    // check for mantine
    if (dependencies.includes("@pankod/refine-mantine")) {
        return UIFrameworks.MANTINE;
    }

    return;
};
