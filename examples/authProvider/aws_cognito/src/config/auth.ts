export const AwsConfigAuth = {
    region: process.env.REACT_APP_AUTH_REGION,
    userPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID,
    cookieStorage: {
        domain: process.env.REACT_APP_AUTH_COOKIE_STORAGE_DOMAIN,
        path: "/",
        expires: 365,
        sameSite: "strict",
        secure: true,
    },
    authenticationFlowType: "USER_SRP_AUTH",
};
