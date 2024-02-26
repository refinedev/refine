import {
  MeResponse,
  MeUpdateVariables,
  RaffleResponse,
} from "src/interfaces/api";

export const getMe = async () => {
  try {
    const response = await fetch("/api/.refine/users/me");

    const data = (await response.json()) as MeResponse;

    return data;
  } catch (_) {
    //
  }

  return null;
};

export const updateMe = async (variables: MeUpdateVariables) => {
  try {
    const { status } = await fetch("/api/.refine/users/me", {
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

export const raffle = async (): Promise<RaffleResponse> => {
  try {
    const response = await fetch(
      // TODO: Change to real endpoint
      "/api/.refine/users/me/raffle",
    );

    const data = (await response.json()) as RaffleResponse;

    return data;
  } catch (_) {
    //
  }
  return { raffle: false };
};

export const acknowledgeRaffle = async () => {
  try {
    await fetch("/api/.refine/users/me/raffle/acknowledge");
  } catch (_) {
    //
  }
};
