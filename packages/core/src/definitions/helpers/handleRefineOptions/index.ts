import { QueryClient, QueryClientConfig } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { defaultRefineOptions } from "@contexts/refine";
import {
    IRefineContextOptions,
    IRefineOptions,
    LiveModeProps,
    MutationMode,
} from "src/interfaces";

type HandleRefineOptionsProps = {
    options?: IRefineOptions;
    mutationMode?: MutationMode;
    syncWithLocation?: boolean;
    warnWhenUnsavedChanges?: boolean;
    undoableTimeout?: number;
    liveMode?: LiveModeProps["liveMode"];
    disableTelemetry?: boolean;
    reactQueryClientConfig?: QueryClientConfig;
    reactQueryDevtoolConfig?:
        | React.ComponentProps<typeof ReactQueryDevtools>
        | false;
};

type HandleRefineOptionsReturnValues = {
    optionsWithDefaults: IRefineContextOptions;
    disableTelemetryWithDefault: boolean;
    reactQueryWithDefaults: {
        clientConfig: QueryClientConfig | InstanceType<typeof QueryClient>;
        devtoolConfig: false | React.ComponentProps<typeof ReactQueryDevtools>;
    };
};

export const handleRefineOptions = ({
    options,
    disableTelemetry,
    liveMode,
    mutationMode,
    reactQueryClientConfig,
    reactQueryDevtoolConfig,
    syncWithLocation,
    undoableTimeout,
    warnWhenUnsavedChanges,
}: HandleRefineOptionsProps = {}): HandleRefineOptionsReturnValues => {
    const optionsWithDefaults: IRefineContextOptions = {
        breadcrumb: options?.breadcrumb,
        mutationMode:
            options?.mutationMode ??
            mutationMode ??
            defaultRefineOptions.mutationMode,
        undoableTimeout:
            options?.undoableTimeout ??
            undoableTimeout ??
            defaultRefineOptions.undoableTimeout,
        syncWithLocation:
            options?.syncWithLocation ??
            syncWithLocation ??
            defaultRefineOptions.syncWithLocation,
        warnWhenUnsavedChanges:
            options?.warnWhenUnsavedChanges ??
            warnWhenUnsavedChanges ??
            defaultRefineOptions.warnWhenUnsavedChanges,
        liveMode:
            options?.liveMode ?? liveMode ?? defaultRefineOptions.liveMode,
        redirect: {
            afterCreate:
                options?.redirect?.afterCreate ??
                defaultRefineOptions.redirect.afterCreate,
            afterClone:
                options?.redirect?.afterClone ??
                defaultRefineOptions.redirect.afterClone,
            afterEdit:
                options?.redirect?.afterEdit ??
                defaultRefineOptions.redirect.afterEdit,
        },
    };

    const disableTelemetryWithDefault =
        options?.disableTelemetry ?? disableTelemetry ?? false;

    const reactQueryWithDefaults = {
        clientConfig:
            options?.reactQuery?.clientConfig ?? reactQueryClientConfig ?? {},
        devtoolConfig:
            options?.reactQuery?.devtoolConfig ?? reactQueryDevtoolConfig ?? {},
    };

    return {
        optionsWithDefaults,
        disableTelemetryWithDefault,
        reactQueryWithDefaults,
    };
};
