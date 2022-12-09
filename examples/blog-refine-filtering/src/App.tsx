import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { Posts } from "components/Posts";

function App() {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[{ name: "posts", list: Posts }]}
            Layout={({ children }) => (
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <div>{children}</div>
                </div>
            )}
        />
    );
}

export default App;
