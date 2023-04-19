"use client";

import { ThemedLayoutV2 } from "@refinedev/antd";
import { Authenticated } from "@refinedev/core";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Authenticated redirectOnFail="/login">
            <ThemedLayoutV2>{children}</ThemedLayoutV2>
        </Authenticated>
    );
}
