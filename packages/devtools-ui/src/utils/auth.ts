import { ory } from "./ory";

export const isAuthenticated = async () => {
    try {
        await ory.toSession();
        return true;
    } catch (error: any) {
        return false;
    }
};

export const logoutUser = async () => {
    try {
        const {
            data: { logout_token },
        } = await ory.createBrowserLogoutFlow();

        await ory.updateLogoutFlow({ token: logout_token });

        return true;
    } catch (_) {
        return false;
    }
};
