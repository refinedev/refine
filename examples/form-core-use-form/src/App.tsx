import { Refine, ErrorComponent } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                        clone: "/posts/clone/:id",
                        edit: "/posts/edit/:id",
                        show: "/posts/show/:id",
                    },
                ]}
            >
                <Routes>
                    <Route
                        index
                        element={<NavigateToResource resource="posts" />}
                    />
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/posts/create" element={<PostCreate />} />
                    <Route path="/posts/clone/:id" element={<PostCreate />} />
                    <Route path="/posts/edit/:id" element={<PostEdit />} />
                    <Route path="/posts/show/:id" element={<PostShow />} />
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;
