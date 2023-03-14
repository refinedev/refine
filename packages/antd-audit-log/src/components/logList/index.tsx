import React, { useState } from "react";
import { useModal } from "@refinedev/antd";
import { Card, ModalProps } from "antd";
import {
    BaseKey,
    ILog,
    ILogData,
    pickNotDeprecated,
    ResourceRouterParams,
    useLogList,
    useResourceWithRoute,
    useRouterContext,
} from "@refinedev/core";
import { ReactDiffViewerProps } from "react-diff-viewer";

import { ModalDiffViewer } from "../modalDiffViewer";
import { EventList } from "../eventList";

export interface LogListProps {
    recordItemId?: BaseKey;
    reactDiffViewerProps?: ReactDiffViewerProps;
    modalProps?: ModalProps;
    resource?: string;
}

export const LogList: React.FC<LogListProps> = ({
    recordItemId,
    reactDiffViewerProps,
    modalProps: propModalProps,
    resource: propResourceName,
}) => {
    const [selectedLog, setSelectedLog] = useState<ILog>();

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
        metaData: pickNotDeprecated(resource.meta, resource.options),
    });

    return (
        <>
            <Card
                loading={logQueryResult?.isLoading}
                bodyStyle={{ padding: 0 }}
            >
                <EventList
                    logQueryResult={logQueryResult}
                    setSelectedLog={setSelectedLog}
                    showModal={show}
                />
            </Card>
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
