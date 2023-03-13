import { GitHubBanner, Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { notificationProvider } from "providers/notificationProvider";
import { PostList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    return (
        <>
            <GitHubBanner />
            <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                legacyRouterProvider={routerProvider}
                notificationProvider={notificationProvider}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        create: PostCreate,
                        edit: PostEdit,
                    },
                ]}
                Layout={({ children }) => (
                    <div>
                        {children}
                        <ToastContainer />
                    </div>
                )}
            />
        </>
    );
};

export default App;
