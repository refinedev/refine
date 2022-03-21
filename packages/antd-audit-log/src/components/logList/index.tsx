import React, { useEffect, useRef, useState } from "react";
import { Card, ModalProps, useModal } from "@pankod/refine-antd";
import {
    BaseKey,
    ResourceRouterParams,
    useResourceWithRoute,
    useRouterContext,
} from "@pankod/refine-core";
import { UseQueryResult } from "react-query";
import stableStringify from "json-stable-stringify";
import ReactDiffViewer, { ReactDiffViewerProps } from "react-diff-viewer";

import { ModalDiffViewer } from "../modalDiffViewer";
import { EventList } from "../eventList";

export interface LogListProps {
    logQueryResult?: UseQueryResult<any>;
    reactDiffViewerProps?: ReactDiffViewerProps;
    modalProps?: ModalProps;
    resource: string;
}

export const LogList: React.FC<LogListProps> = ({
    logQueryResult,
    reactDiffViewerProps,
    modalProps: propModalProps,
    resource: propResourceName,
}) => {
    const diffViewerRef = useRef<ReactDiffViewer>(null);
    const [selectedLog, setSelectedLog] = useState<BaseKey | undefined>();

    const { useParams } = useRouterContext();
    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resourceWithRoute = useResourceWithRoute();
    const resource = resourceWithRoute(routeResourceName);

    const resourceName = propResourceName ?? resource.name;

    const { modalProps, show } = useModal({
        modalProps: {
            onCancel: () => {
                diffViewerRef.current?.resetCodeBlocks();
            },
        },
    });

    useEffect(() => {
        diffViewerRef.current?.resetCodeBlocks();
    }, [selectedLog]);

    const data = logQueryResult?.data?.data;
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
                ref={diffViewerRef}
                modalProps={{ ...modalProps, ...propModalProps }}
                showModal={show}
                resource={resourceName}
                selectedLog={selectedLog}
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
