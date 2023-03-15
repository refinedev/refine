import React, { useState } from "react";
import { useModal } from "@refinedev/antd";
import { Button, ButtonProps, ModalProps } from "antd";
import * as Icons from "@ant-design/icons";
import {
    useRouterContext,
    useTranslate,
    useResourceWithRoute,
    ResourceRouterParams,
    BaseKey,
    useLogList,
    ILog,
    ILogData,
} from "@refinedev/core";
import { ReactDiffViewerProps } from "react-diff-viewer";

import { ModalDiffViewer } from "../modalDiffViewer";

export type LogButtonProps = ButtonProps & {
    recordItemId?: BaseKey;
    resourceName?: string;
    hideText?: boolean;
    reactDiffViewerProps?: ReactDiffViewerProps;
    modalProps?: ModalProps;
};

export const LogButton: React.FC<LogButtonProps> = ({
    resourceName: propResourceName,
    recordItemId,
    hideText = false,
    onClick,
    reactDiffViewerProps,
    modalProps: propModalProps,
    children,
    ...rest
}) => {
    const [selectedLog, setSelectedLog] = useState<ILog>();

    const translate = useTranslate();
    const { modalProps, show } = useModal();

    const { useParams } = useRouterContext();
    const { resource: routeResourceName, id: idFromRoute } =
        useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(routeResourceName);

    const resourceName = propResourceName ?? resource.name;
    const id = recordItemId ?? idFromRoute;

    const logQueryResult = useLogList<ILogData>({
        resource: resourceName,
        meta: { id },
        queryOptions: {
            enabled: modalProps.visible,
            onSuccess: (result) => {
                setSelectedLog(result[0]);
            },
        },
    });

    return (
        <>
            <Button
                onClick={(e): void =>
                    onClick
                        ? onClick(
                              e as React.MouseEvent<
                                  HTMLButtonElement,
                                  MouseEvent
                              >,
                          )
                        : show()
                }
                icon={<Icons.HistoryOutlined />}
                loading={logQueryResult.isLoading}
                {...rest}
            >
                {!hideText &&
                    (children ?? translate("buttons.logs", "Audit Logs"))}
            </Button>
            {selectedLog && (
                <ModalDiffViewer
                    modalProps={{ ...modalProps, ...propModalProps }}
                    showModal={show}
                    selectedLog={selectedLog}
                    setSelectedLog={setSelectedLog}
                    logQueryResult={logQueryResult}
                    reactDiffViewerProps={reactDiffViewerProps}
                />
            )}
        </>
    );
};
