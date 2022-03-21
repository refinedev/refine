import React, { useState } from "react";
import { Card, ModalProps, useModal } from "@pankod/refine-antd";
import {
    BaseKey,
    ResourceRouterParams,
    useLogList,
    useResourceWithRoute,
    useRouterContext,
} from "@pankod/refine-core";
import { UseQueryResult } from "react-query";
import stableStringify from "json-stable-stringify";
import { ReactDiffViewerProps } from "react-diff-viewer";

import { ModalDiffViewer } from "../modalDiffViewer";
import { EventList } from "../eventList";
import { ILogs } from "src/interfaces";

export interface LogListProps {
    logQueryResult?: UseQueryResult<ILogs>;
    reactDiffViewerProps?: ReactDiffViewerProps;
    modalProps?: ModalProps;
    resource?: string;
}

export const LogList: React.FC<LogListProps> = ({
    logQueryResult: logQueryResultProp,
    reactDiffViewerProps,
    modalProps: propModalProps,
    resource: propResourceName,
}) => {
    const [selectedLog, setSelectedLog] = useState<BaseKey | undefined>();

    const { useParams } = useRouterContext();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(routeResourceName);

    const resourceName = propResourceName ?? resource.name;

    const logQueryResultHook = useLogList<ILogs>({
        resource: resourceName,
        queryOptions: { enabled: logQueryResultProp ? false : true },
    });

    const logQueryResult = logQueryResultProp ?? logQueryResultHook;

    const { modalProps, show } = useModal();

    const data = logQueryResult?.data;
    const oldData = data?.find(
        (item: any) => item.id === selectedLog,
    )?.previousData;
    const newData = data?.find((item: any) => item.id === selectedLog)?.data;

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
