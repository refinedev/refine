import React from "react";

export interface AuthContextProps {
    login: (params: any) => Promise<any>;
    logout: (params: any) => Promise<void | false | string>;
    checkAuth: (params: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params: any) => Promise<any>;
    getIdentity?: () => Promise<{
        id: string | number;
        fullName?: string;
        avatar?: string;
        [key: string]: any;
    }>;
    [key: string]: any;
}

const defaultProvider: AuthContextProps = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getIdentity: () =>
        Promise.resolve({
            id: 1,
        }),
};

export const AuthContext = React.createContext<AuthContextProps>(
    defaultProvider,
);

export const AuthContextProvider: React.FC<AuthContextProps> = ({
    login,
    logout,
    checkAuth,
    checkError,
    getPermissions,
    getIdentity,
    children,
}) => {
    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                checkAuth,
                checkError,
                getPermissions,
                getIdentity,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
