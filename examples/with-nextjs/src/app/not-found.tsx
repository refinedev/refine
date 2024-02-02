import { ErrorComponent } from "@refinedev/antd";
import { Suspense } from "react";

export default function NotFound() {
    return (
        <Suspense>
            <ErrorComponent />
        </Suspense>
    );
}
