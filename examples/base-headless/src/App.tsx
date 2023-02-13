import { Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import routerBindings, {
    RefineRoutes,
} from "@pankod/refine-react-router-v6/legacy";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PostCreate, PostEdit } from "pages/posts";

import "./App.css";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                router={routerBindings}
                resources={[
                    {
                        name: "posts",
                        list: "posts",
                        create: {
                            path: "posts/:id/create",
                            component: PostCreate,
                        },
                        show: "posts/test/:id",
                        edit: PostEdit,
                    },
                ]}
            >
                <RefineRoutes>
                    {(routes) => (
                        <Routes>
                            {routes}
                            <Route path="posts/test/:id" element={<>test</>} />
                            <Route path="custom-route" element={<>custom</>} />
                            <Route path="posts" element={<>posts list</>} />
                        </Routes>
                    )}
                </RefineRoutes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;
