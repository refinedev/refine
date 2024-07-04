import type { ProjectIdResponse } from "src/interfaces/api";
import { REFINE_API_URL } from "./constants";

const CODES = {
  OK: 0,
  NOT_FOUND: 1,
  ERROR: 2,
};

export const fetchNewProjectId = async () => {
  try {
    const response = await fetch(`${REFINE_API_URL}/projects`, {
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
    const body: { projectId: string | null; status: 0 | 1 | 2 } =
      await response.json();

    if (body.status === CODES.OK) {
      return true;
    }

    if (body.status === CODES.NOT_FOUND) {
      return false;
    }

    if (body.status === CODES.ERROR) {
      return undefined;
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
