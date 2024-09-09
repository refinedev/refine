import { ory } from "./ory";

export const isAuthenticated = async () => {
  try {
    const response = await ory.toSession();
    const authenticatedHeader = response.headers["refine-is-authenticated"];
    if (authenticatedHeader === "false") {
      return false;
    }
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
