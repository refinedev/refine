import { ErrorComponent, GitHubBanner, Refine } from "@refinedev/core";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";

import { Posts } from "components/Posts";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                resources={[{ name: "posts", list: "/posts" }]}
            >
                <Routes>
                    <Route
                        element={
                            <div
                                style={{ maxWidth: "1000px", margin: "0 auto" }}
                            >
                                <div>
                                    <Outlet />
                                </div>
                            </div>
                        }
                    >
                        <Route
                            index
                            element={<NavigateToResource resource="posts" />}
                        />
                        <Route path="posts" element={<Posts />} />
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                </Routes>
                <UnsavedChangesNotifier />
            </Refine>
        </BrowserRouter>
    );
}

export default App;
