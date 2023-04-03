"use client";

import { ThemedLayout } from "@refinedev/antd";
import { Authenticated } from "@refinedev/core";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Authenticated redirectOnFail="/login">
            <ThemedLayout>{children}</ThemedLayout>
        </Authenticated>
    );
}
