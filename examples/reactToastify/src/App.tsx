import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { notificationProvider } from "providers/notificationProvider";
import { PostList, PostCreate, PostEdit } from "pages/posts";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerProvider}
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
            options={{ disableTelemetry: true }}
        />
    );
};

export default App;
