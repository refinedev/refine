import { GitHubBanner, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";

import { Posts } from "components/Posts";

function App() {
    return (
        <>
            <GitHubBanner />
            <Refine
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[{ name: "posts", list: Posts }]}
                Layout={({ children }) => (
                    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                        <div>{children}</div>
                    </div>
                )}
            />
        </>
    );
}

export default App;
