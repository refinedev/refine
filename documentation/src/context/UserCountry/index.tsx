import React, { createContext, useEffect, useState } from "react";

interface IUserCountryContext {
    country: string;
}

export const UserCountryContext = createContext<
    IUserCountryContext | undefined
>(undefined);

export const UserCountryProvider: React.FC = ({ children }) => {
    const [country, setCountry] = useState<string>("");

    useEffect(() => {
        (async () => {
            const response = await fetch(
                "https://telemetry.refine.dev/location",
            );
            const data = await response.json();

            if (data?.country === "TR") {
                setCountry("tr");
            }
        })();
    }, []);

    return (
        <UserCountryContext.Provider value={{ country }}>
            {children}
        </UserCountryContext.Provider>
    );
};

export const useUserCountry = () => {
    const context = React.useContext(UserCountryContext);

    if (context === undefined) {
        throw new Error(
            "useUserCountry must be used within a UserCountryProvider",
        );
    }

    return context;
};
