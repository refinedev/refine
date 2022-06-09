import React from "react";
import * as Snack from "notistack";

import { OpenNotificationParams } from "@pankod/refine-core";

import { CircularDeterminate } from "@components/circularDeterminate";

import { notificationProviderHandle } from ".";

const cancelMutationMock = jest.fn();

const mockNotification: OpenNotificationParams = {
    key: "test-notification",
    message: "Test Notification Message",
    type: "success",
};

const mockNotificationUndoable: OpenNotificationParams = {
    key: "test-notification-undoable",
    message: "Undo Test Notification Message",
    type: "progress",
    undoableTimeout: 5,
    cancelMutation: cancelMutationMock,
};

describe("Notistack notificationProvider", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const enqueueSnackbarMock = jest.fn();

    const closeSnackbarMock = jest.fn();

    const useSnackbarEnqueueSnackbar = jest.spyOn(Snack, "useSnackbar");

    useSnackbarEnqueueSnackbar.mockImplementation(
        () =>
            ({
                enqueueSnackbar: enqueueSnackbarMock,
                closeSnackbar: closeSnackbarMock,
            } as any),
    );

    const notificationProvider = notificationProviderHandle();

    // This test cover the case when the type is not "progress" ("success" or "error")

    it("should render notification snack with success type ", () => {
        notificationProvider.open(mockNotification);

        expect(enqueueSnackbarMock).toHaveBeenCalled();
        expect(enqueueSnackbarMock).toHaveBeenCalledWith(
            mockNotification.message,
            {
                variant: "success",
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
                disableWindowBlurListener: true,
            },
        );
    });

    it("should render error notification if type set as error", async () => {
        notificationProvider.open({ ...mockNotification, type: "error" });

        expect(enqueueSnackbarMock).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbarMock).toBeCalledWith(mockNotification.message, {
            variant: "error",
            anchorOrigin: {
                vertical: "top",
                horizontal: "right",
            },
            disableWindowBlurListener: true,
        });
    });

    // This test cover the case when the type is "progress"

    it("should render notification with undoable when type is progress", async () => {
        notificationProvider.open(mockNotificationUndoable);

        expect(enqueueSnackbarMock).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbarMock).toBeCalledWith(
            <>
                <CircularDeterminate
                    undoableTimeout={5}
                    message={"Undo Test Notification Message"}
                />
            </>,
            {
                action: expect.any(Function),
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
                preventDuplicate: true,
                key: "test-notification-undoable",
                autoHideDuration: 5000,
                disableWindowBlurListener: true,
            },
        );
    });

    // This test cover the case when the closeSnackbar is called

    it("should close notification", async () => {
        notificationProvider.close("");

        expect(closeSnackbarMock).toBeCalledTimes(1);
    });
});
