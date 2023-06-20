import React from "react";
import { LoadingOvertimeIndicator, useTranslate } from "@refinedev/core";
import { Alert, AlertIcon } from "@chakra-ui/react";

type AlertComponentProps = {
    translateKey: string;
    message: string;
};

const AlertComponent = ({ translateKey, message }: AlertComponentProps) => {
    const translate = useTranslate();

    return (
        <Alert status="warning" mb="4">
            <AlertIcon />
            {translate(translateKey, message)}
        </Alert>
    );
};

export const overtimeComponents = {
    5000: (
        <AlertComponent
            translateKey="loadingOvertimeIndicator.5000"
            message="It's taking a bit longer than expected."
        />
    ),
    10000: (
        <AlertComponent
            translateKey="loadingOvertimeIndicator.10000"
            message="This is taking longer than expected, please hang on."
        />
    ),
};

(LoadingOvertimeIndicator as React.FC).defaultProps = {
    overtimeComponents: overtimeComponents,
};

export { LoadingOvertimeIndicator };
