import { ErrorComponent } from "@refinedev/antd";
import { Authenticated } from "@refinedev/core";

export default function Custom404() {
    return (
        <Authenticated>
            <ErrorComponent />
        </Authenticated>
    );
}
