import { ProjectTypes, UIFrameworks } from "@definitions";
import { getDependencies } from "@utils/package";

export const getProjectType = (): ProjectTypes => {
    // read dependencies from package.json
    const dependencies = getDependencies();

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

    throw new Error("Project type not found");
};

export const getUIFramework = (): UIFrameworks => {
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
    if (dependencies.includes("@pankod/refine-chakra")) {
        return UIFrameworks.CHAKRA;
    }

    // check for mantine
    if (dependencies.includes("@pankod/refine-mantine")) {
        return UIFrameworks.MANTINE;
    }

    throw new Error("UI Framework type not found");
};
