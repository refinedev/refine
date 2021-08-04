import * as React from "react";
import { act } from "@test";
import { renderHook } from "@testing-library/react-hooks";

import { notificationReducer } from "./notificationContext";

describe("Notification Reducer", () => {
    const notificationDispatch = jest.fn();

    const providerProps = {
        notifications: [
            {
                id: "1",
                resource: "posts",
                seconds: 5000,
                isRunning: true,
            },
        ],
        notificationDispatch: notificationDispatch,
    };

    it("should render notification item with ADD action", () => {
        act(async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                React.useReducer(notificationReducer, []),
            );
            const [, dispatch] = result.current;

            dispatch({ type: "ADD", payload: providerProps.notifications[0] });

            await waitForNextUpdate();
            const [state] = result.current;

            expect(state).toEqual([
                {
                    id: "1",
                    resource: "posts",
                    seconds: 5000,
                    isRunning: true,
                },
            ]);
        });
    });

    it("remove notification item with DELETE action", () => {
        act(async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                React.useReducer(
                    notificationReducer,
                    providerProps.notifications,
                ),
            );
            const [, dispatch] = result.current;

            dispatch({
                type: "DELETE",
                payload: providerProps.notifications[0],
            });

            await waitForNextUpdate();
            const [state] = result.current;

            expect(state).toEqual([]);
        });
    });

    it("decrease notification item by 1 second with DECREASE_NOTIFICATION_SECOND action", () => {
        act(async () => {
            const { result, waitForNextUpdate } = renderHook(() =>
                React.useReducer(
                    notificationReducer,
                    providerProps.notifications,
                ),
            );
            const [, dispatch] = result.current;

            dispatch({
                type: "DECREASE_NOTIFICATION_SECOND",
                payload: {
                    id: providerProps.notifications[0].id,
                    seconds: providerProps.notifications[0].seconds,
                    resource: providerProps.notifications[0].resource,
                },
            });

            await waitForNextUpdate();
            const [state] = result.current;

            expect(state[0].seconds).toEqual(
                providerProps.notifications[0].seconds - 1000,
            );
        });
    });
});
