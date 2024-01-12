import React from "react";

/* @ts-expect-error Imports through webpack aliases does not work */
import data from "@tutorial-navigation/tutorial-navigation-data.json";

type Tutorial = {
    label: string;
    defaultParameters: Record<string, string>;
    parameterOptions: Record<
        string,
        Array<{
            label: string;
            value: string;
        }>
    >;
    units: Array<{
        title: string;
        id: string;
        items: Array<string>;
    }>;
};

const { defaultParameters } = data as Tutorial;

type TutorialParameterContextType = {
    parameters?: Record<string, string>;
    options: Record<
        string,
        Array<{ label: string; value: string }> | undefined
    >;
    settled: boolean;
    setParameters: (parameters: Record<string, string>) => void;
};

export const TutorialParameterContext =
    React.createContext<TutorialParameterContextType>({
        parameters: {},
        options: {},
        settled: false,
        setParameters: () => 0,
    });

export const TUTORIAL_PARAMETER_LOCAL_STORAGE_KEY = "tutorial-parameters";

export const TutorialParameterProvider: React.FC = ({ children }) => {
    const [parameters, _setParameters] = React.useState<
        Record<string, string> | undefined
    >(undefined);
    const [settled, setSettled] = React.useState(false);

    React.useEffect(() => {
        // read from local storage
        try {
            const storedParameters = localStorage.getItem(
                TUTORIAL_PARAMETER_LOCAL_STORAGE_KEY,
            );

            if (storedParameters) {
                _setParameters(JSON.parse(storedParameters));
            } else {
                _setParameters(defaultParameters);
            }
        } catch (e) {
            _setParameters(defaultParameters);
            console.error(e);
        }

        setSettled(true);
    }, []);

    const setParameters = React.useCallback((next: Record<string, string>) => {
        _setParameters((p) => {
            try {
                localStorage.setItem(
                    TUTORIAL_PARAMETER_LOCAL_STORAGE_KEY,
                    JSON.stringify({ ...p, ...next }),
                );
            } catch (e) {
                console.error(e);
            }

            return { ...p, ...next };
        });
    }, []);

    return (
        <TutorialParameterContext.Provider
            value={{
                parameters,
                setParameters,
                settled,
                options: data.parameterOptions,
            }}
        >
            {children}
        </TutorialParameterContext.Provider>
    );
};

export const useTutorialParameters = () => {
    const ctx = React.useContext(TutorialParameterContext);

    return ctx;
};
