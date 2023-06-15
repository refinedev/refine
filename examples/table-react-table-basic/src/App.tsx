import { GitHubBanner, Refine, ErrorComponent } from "@refinedev/core";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";
import "./App.css";

import { PostList } from "pages/posts";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                resources={[{ name: "blog_posts", list: "/blog-posts" }]}
                options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                }}
            >
                <Routes>
                    <Route index element={<NavigateToResource />} />

                    <Route path="/blog-posts" element={<PostList />} />

                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
            </Refine>
        </BrowserRouter>
    );
};

export default App;
