import React, { useState } from "react";
import {
    Button,
    ButtonProps,
    Icons,
    ModalProps,
    useModal,
} from "@pankod/refine-antd";
import {
    useRouterContext,
    useTranslate,
    useResourceWithRoute,
    ResourceRouterParams,
    BaseKey,
    useLogList,
} from "@pankod/refine-core";
import { ReactDiffViewerProps } from "react-diff-viewer";
import stableStringify from "json-stable-stringify";
import { UseQueryResult } from "react-query";

import { ModalDiffViewer } from "../modalDiffViewer";

export type LogButtonProps = ButtonProps & {
    logQueryResult?: UseQueryResult<any>;
    recordItemId?: BaseKey;
    resourceName?: string;
    hideText?: boolean;
    reactDiffViewerProps?: ReactDiffViewerProps;
    modalProps?: ModalProps;
};

export const LogButton: React.FC<LogButtonProps> = ({
    logQueryResult: logQueryResultProp,
    resourceName: propResourceName,
    recordItemId,
    hideText = false,
    onClick,
    reactDiffViewerProps,
    modalProps: propModalProps,
    children,
    ...rest
}) => {
    const [selectedLog, setSelectedLog] = useState<BaseKey | undefined>();

    const translate = useTranslate();

    const { useParams } = useRouterContext();
    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(routeResourceName);

    const resourceName = propResourceName ?? resource.name;
    const id = recordItemId ?? idFromRoute;

    const { modalProps, show } = useModal();

    const logQueryResultHook = useLogList({
        resource: resourceName,
        params: { id },
        queryOptions: {
            enabled: logQueryResultProp ? false : modalProps.visible,
            onSuccess: (result) => {
                setSelectedLog(result.data?.[0]?.id);
            },
        },
    });

    const logQueryResult = logQueryResultProp ?? logQueryResultHook;

    const data = logQueryResult?.data?.data;
    const oldData = data?.find(
        (item: any) => item.id === selectedLog,
    )?.previousData;
    const newData = data?.find((item: any) => item.id === selectedLog)?.data;

    return (
        <>
            <Button
                onClick={(e): void => (onClick ? onClick(e) : show())}
                icon={<Icons.HistoryOutlined />}
                {...rest}
            >
                {!hideText &&
                    (children ?? translate("buttons.logs", "Audit Logs"))}
            </Button>
            <ModalDiffViewer
                modalProps={{ ...modalProps, ...propModalProps }}
                showModal={show}
                setSelectedLog={setSelectedLog}
                logQueryResult={logQueryResult}
                reactDiffViewerProps={{
                    oldValue: stableStringify(oldData, { space: " " }),
                    newValue: stableStringify(newData, { space: " " }),
                    ...reactDiffViewerProps,
                }}
            />
        </>
    );
};
