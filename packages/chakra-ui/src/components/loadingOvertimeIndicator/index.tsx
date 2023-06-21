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

/*
 * The default overtime components to render based on the elapsed time.
 * The key is the number of milliseconds.
 */
export const overtimeComponents = {
    3000: (
        <AlertComponent
            translateKey="loadingOvertimeIndicator.3000"
            message="It's taking a bit longer than expected."
        />
    ),
    5000: (
        <AlertComponent
            translateKey="loadingOvertimeIndicator.5000"
            message="This is taking longer than expected, please hang on."
        />
    ),
};

(LoadingOvertimeIndicator as React.FC).defaultProps = {
    overtimeComponents: overtimeComponents,
};

/**
 * A component that renders children and overtime components based on the elapsed time.
 * The elapsed time is calculated using the `useLoadingOvertime` hook.
 * If the `elapsedTime` prop is provided, the component will not use the `useLoadingOvertime` hook.
 */
export { LoadingOvertimeIndicator };
