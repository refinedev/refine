import { handleRefineOptions } from ".";
import { defaultRefineOptions } from "@contexts/refine";
import { IRefineOptions } from "src/interfaces";

describe("handleRefineOptions", () => {
    it("should return the default options if no options are provided", () => {
        const { optionsWithDefaults } = handleRefineOptions();

        expect(optionsWithDefaults).toEqual(defaultRefineOptions);
    });

    it("should return the options if they are provided", () => {
        const options: IRefineOptions = {
            mutationMode: "optimistic",
            disableTelemetry: true,
            liveMode: "auto",
            reactQuery: {
                clientConfig: {
                    defaultOptions: { queries: { enabled: false } },
                },
                devtoolConfig: false,
            },
            undoableTimeout: 1000,
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            redirect: {
                afterClone: "show",
                afterCreate: "edit",
                afterEdit: "show",
            },
        };

        const {
            optionsWithDefaults,
            disableTelemetryWithDefault,
            reactQueryWithDefaults,
        } = handleRefineOptions({ options });

        expect(optionsWithDefaults).toEqual({
            liveMode: "auto",
            mutationMode: "optimistic",
            syncWithLocation: true,
            undoableTimeout: 1000,
            warnWhenUnsavedChanges: true,
            redirect: {
                afterClone: "show",
                afterCreate: "edit",
                afterEdit: "show",
            },
        });
        expect(disableTelemetryWithDefault).toBe(true);
        expect(reactQueryWithDefaults).toEqual({
            clientConfig: {
                defaultOptions: { queries: { enabled: false } },
            },
            devtoolConfig: false,
        });
    });

    it("should return the options if they are provided both in options and passed directly <Refine>", () => {
        const options: IRefineOptions = {
            mutationMode: "optimistic",
            disableTelemetry: true,
            liveMode: "auto",
            reactQuery: {
                clientConfig: {
                    defaultOptions: { queries: { enabled: false } },
                },
                devtoolConfig: false,
            },
            undoableTimeout: 1000,
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
        };

        const {
            optionsWithDefaults,
            disableTelemetryWithDefault,
            reactQueryWithDefaults,
        } = handleRefineOptions({
            options,
            mutationMode: "pessimistic",
            disableTelemetry: false,
            liveMode: "manual",
            reactQueryClientConfig: {
                defaultOptions: { queries: { enabled: true } },
            },
            reactQueryDevtoolConfig: {
                position: "bottom-left",
            },
            syncWithLocation: false,
            undoableTimeout: 2000,
            warnWhenUnsavedChanges: false,
        });

        expect(optionsWithDefaults).toEqual({
            liveMode: "auto",
            mutationMode: "optimistic",
            syncWithLocation: true,
            undoableTimeout: 1000,
            warnWhenUnsavedChanges: true,
            redirect: {
                afterClone: "list",
                afterCreate: "list",
                afterEdit: "list",
            },
        });
        expect(disableTelemetryWithDefault).toBe(true);
        expect(reactQueryWithDefaults).toEqual({
            clientConfig: {
                defaultOptions: { queries: { enabled: false } },
            },
            devtoolConfig: false,
        });
    });

    it("should return directly passed <Refine> options if options are not provided", () => {
        const {
            optionsWithDefaults,
            disableTelemetryWithDefault,
            reactQueryWithDefaults,
        } = handleRefineOptions({
            mutationMode: "pessimistic",
            disableTelemetry: true,
            liveMode: "manual",
            reactQueryClientConfig: {
                defaultOptions: { queries: { enabled: false } },
            },
            reactQueryDevtoolConfig: {
                position: "bottom-right",
            },
            syncWithLocation: false,
            undoableTimeout: 2000,
            warnWhenUnsavedChanges: false,
        });

        expect(optionsWithDefaults).toEqual({
            liveMode: "manual",
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 2000,
            warnWhenUnsavedChanges: false,
            redirect: {
                afterClone: "list",
                afterCreate: "list",
                afterEdit: "list",
            },
        });
        expect(disableTelemetryWithDefault).toBe(true);
        expect(reactQueryWithDefaults).toEqual({
            clientConfig: {
                defaultOptions: { queries: { enabled: false } },
            },
            devtoolConfig: {
                position: "bottom-right",
            },
        });
    });

    it("if some of the redirect options are not provided, should return the default ones for those options", () => {
        const { optionsWithDefaults } = handleRefineOptions({
            options: {
                redirect: {
                    afterClone: "show",
                },
            },
        });

        expect(optionsWithDefaults.redirect).toEqual({
            afterClone: "show",
            afterCreate: "list",
            afterEdit: "list",
        });
    });
});
