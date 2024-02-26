import { ProjectIdResponse } from "src/interfaces/api";

export const fetchNewProjectId = async () => {
  try {
    const response = await fetch("/api/.refine/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = (await response.json()) as ProjectIdResponse;

    if (data?.projectId) {
      return data.projectId;
    }
  } catch (_) {
    //
  }

  return null;
};

export const getCurrentProjectIdStatus = async () => {
  try {
    const response = await fetch("/api/project-id/status");

    if (response.status === 400) {
      return undefined;
    }

    if (response.status === 404) {
      return false;
    }

    if (response.status === 200) {
      return true;
    }
  } catch (_) {
    //
  }

  return undefined;
};

export const updateProjectId = async (projectId: string) => {
  const response = await fetch("/api/project-id/update", {
    body: JSON.stringify({ projectId }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (response.status === 200) {
    return true;
  }

  return false;
};
