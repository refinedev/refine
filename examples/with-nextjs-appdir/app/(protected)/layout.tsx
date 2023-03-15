"use client";

import { Layout } from "@refinedev/antd";
import { Authenticated } from "@refinedev/core";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Authenticated redirectOnFail="/login">
            <Layout>{children}</Layout>
        </Authenticated>
    );
}
