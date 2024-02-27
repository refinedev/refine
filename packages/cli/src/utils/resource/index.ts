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

export const getProviderPath = (
  projectType: ProjectTypes,
): { path: string; alias: string } => {
  switch (projectType) {
    case ProjectTypes.NEXTJS:
      return {
        path: "src/providers",
        alias: "../src/providers",
      };
    case ProjectTypes.REMIX:
      return {
        path: "app/providers",
        alias: "~/providers",
      };
  }

  // vite and react
  return {
    path: "src/providers",
    alias: "providers",
  };
};

export const getFilesPathByProject = (projectType?: ProjectTypes) => {
  switch (projectType) {
    case ProjectTypes.REMIX:
      return "./app";
    default:
      return "./src";
  }
};
