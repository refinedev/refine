import React from "react";

export interface AuthContextProps {
    login?: (params: any) => Promise<any>;
    checkAuth?: () => Promise<any>;
    userIdentity?: () => Promise<any>;
    logout?: () => Promise<any>;
}

export const AuthContext = React.createContext<AuthContextProps>({});

export const AuthContextProvider: React.FC<AuthContextProps> = ({
    login,
    checkAuth,
    userIdentity,
    logout,
    children,
}) => {
    return (
        <AuthContext.Provider
            value={{ login, checkAuth, userIdentity, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
