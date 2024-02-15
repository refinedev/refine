import React from "react";

export const TutorialLayoutContext = React.createContext<{
    contentPercentage: number;
    editorPercenage: number;
    setContentPercentage: (percentage: number) => void;
    setEditorPercentage: (percentage: number) => void;
}>({
    contentPercentage: 45,
    editorPercenage: 50,
    setContentPercentage: () => 0,
    setEditorPercentage: () => 0,
});

export const TutorialLayoutProvider: React.FC = ({ children }) => {
    const [contentPercentage, setContentPercentage] = React.useState(() => {
        const storedValue = localStorage.getItem(
            "refine-tutorial-content-percentage",
        );
        if (storedValue) {
            return Number(storedValue);
        }
        return 45;
    });
    const [editorPercenage, setEditorPercentage] = React.useState(() => {
        const storedValue = localStorage.getItem(
            "refine-tutorial-editor-percenage",
        );
        if (storedValue) {
            return Number(storedValue);
        }
        return 50;
    });

    React.useEffect(() => {
        localStorage.setItem(
            "refine-tutorial-content-percentage",
            contentPercentage.toString(),
        );
    }, [contentPercentage]);

    React.useEffect(() => {
        localStorage.setItem(
            "refine-tutorial-editor-percenage",
            editorPercenage.toString(),
        );
    }, [editorPercenage]);

    return (
        <TutorialLayoutContext.Provider
            value={{
                contentPercentage,
                editorPercenage,
                setContentPercentage,
                setEditorPercentage,
            }}
        >
            {children}
        </TutorialLayoutContext.Provider>
    );
};

export const useTutorialLayout = () => {
    return React.useContext(TutorialLayoutContext);
};
