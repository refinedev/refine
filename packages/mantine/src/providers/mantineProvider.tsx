import React, { PropsWithChildren } from "react";
import {
    MantineProvider as MantineBaseProvider,
    MantineProviderProps as MantineBaseProviderProps,
} from "@mantine/core";
import {
    NotificationsProvider,
    NotificationProviderProps,
} from "@mantine/notifications";

export type MantineProviderProps = MantineBaseProviderProps & {
    notificationProps?: NotificationProviderProps;
};

export const MantineProvider = ({
    notificationProps,
    children,
    ...props
}: PropsWithChildren<MantineProviderProps>): JSX.Element => {
    return (
        <MantineBaseProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme: "light" }}
            {...props}
        >
            <NotificationsProvider {...(notificationProps ?? {})}>
                {children}
            </NotificationsProvider>
        </MantineBaseProvider>
    );
};
