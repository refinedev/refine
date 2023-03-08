import { ErrorComponent, Refine } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";

import { DummyList } from "pages/posts";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                resources={[{ name: "posts", list: "/posts" }]}
            >
                <Routes>
                    <Route
                        index
                        element={<NavigateToResource resource="posts" />}
                    />
                    <Route path="/posts" element={<DummyList />} />
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;
