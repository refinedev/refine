import React from "react";
import { TutorialParameterProvider } from "../context/tutorial-parameter-context";
import { TutorialVisitProvider } from "../context/tutorial-visit-context";

type Props = React.PropsWithChildren<{}>;

export const TutorialPageLayout = ({ children }: Props) => {
    return (
        <TutorialVisitProvider>
            <TutorialParameterProvider>{children}</TutorialParameterProvider>
        </TutorialVisitProvider>
    );
};
