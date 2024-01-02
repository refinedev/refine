import React, { createContext, useEffect, useMemo, useState } from "react";
import { IDocSurveyContext, Survey } from "./types";

export const DocSurveyContext = createContext<IDocSurveyContext | undefined>(
    undefined,
);

export const DocSurveyContextProvider: React.FC = ({ children }) => {
    const [survey, setSurvey] = useState<Survey | null>(null);

    useEffect(() => {
        fetch(
            "https://develop.cloud.refine.dev/.refine/surveys/documentation-pages-survey",
        ).then(async (res) => {
            const data = await res.json();
            setSurvey(data);
        });
    }, []);

    const value = useMemo(() => {
        return {
            survey,
        };
    }, [survey]);

    return (
        <DocSurveyContext.Provider value={value}>
            {children}
        </DocSurveyContext.Provider>
    );
};

export const useDocSurveyContext = () => {
    const context = React.useContext(DocSurveyContext);

    if (context === undefined) {
        throw new Error(
            "useDocSurveyContext must be used within a DocSurveyContextProvider",
        );
    }

    return context;
};

export * from "./types";
