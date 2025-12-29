import { REFINE_API_URL } from "./constants";

import type { MeResponse, MeUpdateVariables } from "src/interfaces/api";

export const getMe = async () => {
  try {
    const response = await fetch(`${REFINE_API_URL}/users/me`);

    if (response.ok) {
      const data = (await response.json()) as MeResponse;

      return data;
    }

    return null;
  } catch (_) {
    //
  }

  return null;
};

export const updateMe = async (variables: MeUpdateVariables) => {
  try {
    const { status } = await fetch(`${REFINE_API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(variables),
    });

    if (status === 200) {
      return true;
    }
  } catch (_) {
    //
  }

  return false;
};
