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

export const raffle = async () => {
    try {
        const response = await fetch(
            // TODO: Change to real endpoint
            "/api/.refine/users/me/ruffle?result=true",
        );

        const data = (await response.json()) as RaffleResponse;

        return Boolean(data?.ruffle);
    } catch (_) {
        //
    }
    return false;
};
