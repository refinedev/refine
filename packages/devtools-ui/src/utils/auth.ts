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
    await ory.performNativeLogout({
      performNativeLogoutBody: {
        session_token: "",
      },
    });

    return true;
  } catch (_) {
    return false;
  }
};
