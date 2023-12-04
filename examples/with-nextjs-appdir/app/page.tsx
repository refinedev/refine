"use client";

import { Authenticated } from "@refinedev/core";
import { NavigateToResource } from "@refinedev/nextjs-router/app";

export default function IndexPage() {
    return (
        <Authenticated
            key="index-page"
            redirectOnFail="/login"
            appendCurrentPathToQuery={false}
        >
            <NavigateToResource />
        </Authenticated>
    );
}
