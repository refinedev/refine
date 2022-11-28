import { ProjectTypes } from "@definitions/projectTypes";

export const getResourcePath = (
    projectType: ProjectTypes,
): { path: string; alias: string } => {
    switch (projectType) {
        case ProjectTypes.NEXTJS:
            return {
                path: "src/components",
                alias: "../src/components",
            };
        case ProjectTypes.REMIX:
            return {
                path: "app/components",
                alias: "~/components",
            };
    }

    // vite and react
    return {
        path: "src/pages",
        alias: "pages",
    };
};
