import React from "react";

export const AuthContext = React.createContext<{
    accessToken: string | null;
    refreshToken: string | null;
    setAccessToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
}>({
    accessToken: null,
    refreshToken: null,
    setAccessToken: () => 0,
    setRefreshToken: () => 0,
});

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [accessToken, _setAccessToken] = React.useState<string | null>(
        localStorage.getItem("accessToken"),
    );
    const [refreshToken, _setRefreshToken] = React.useState<string | null>(
        localStorage.getItem("refreshToken"),
    );

    const setAccessToken = React.useCallback((token: string | null) => {
        if (token === null) {
            localStorage.removeItem("accessToken");
            _setAccessToken(null);
        } else {
            localStorage.setItem("accessToken", token);
            _setAccessToken(token);
        }
    }, []);

    const setRefreshToken = React.useCallback((token: string | null) => {
        if (token === null) {
            localStorage.removeItem("refreshToken");
            _setRefreshToken(null);
        } else {
            localStorage.setItem("refreshToken", token);
            _setRefreshToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                setAccessToken,
                setRefreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
