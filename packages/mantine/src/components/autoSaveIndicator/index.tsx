import React from "react";
import {
    AutoSaveIndicatorProps,
    useTranslate,
    AutoSaveIndicator as AutoSaveIndicatorCore,
} from "@refinedev/core";
import { Text } from "@mantine/core";
import {
    IconDots,
    IconRefresh,
    IconCircleCheck,
    IconExclamationCircle,
} from "@tabler/icons";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
    status,
    elements: {
        success = (
            <Message
                key="autoSave.success"
                defaultMessage="saved"
                icon={<IconCircleCheck size="18px" />}
            />
        ),
        error = (
            <Message
                key="autoSave.error"
                defaultMessage="auto save failure"
                icon={<IconExclamationCircle size="18px" />}
            />
        ),
        loading = (
            <Message
                key="autoSave.loading"
                defaultMessage="saving..."
                icon={<IconRefresh size="18px" />}
            />
        ),
        idle = (
            <Message
                key="autoSave.idle"
                defaultMessage="waiting for changes"
                icon={<IconDots size="18px" />}
            />
        ),
    } = {},
}) => {
    return (
        <AutoSaveIndicatorCore
            status={status}
            elements={{
                success,
                error,
                loading,
                idle,
            }}
        />
    );
};

const Message = ({
    key,
    defaultMessage,
    icon,
}: {
    key: string;
    defaultMessage: string;
    icon: React.ReactNode;
}) => {
    const translate = useTranslate();

    return (
        <Text size="sm" display="flex" align="center" mr="2" color="gray">
            {translate(key, defaultMessage)}
            <span
                style={{ position: "relative", top: "3px", marginLeft: "3px" }}
            >
                {icon}
            </span>
        </Text>
    );
};
