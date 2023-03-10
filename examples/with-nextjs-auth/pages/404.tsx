import { ErrorComponent, Layout } from "@refinedev/antd";
import { Authenticated } from "@refinedev/core";

export default function Custom404() {
    return (
        <Authenticated>
            <Layout>
                <ErrorComponent />
            </Layout>
        </Authenticated>
    );
}
