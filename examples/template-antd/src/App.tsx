import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    WelcomePage,
    ErrorComponent,
} from "@refinedev/antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import "@refinedev/antd/dist/reset.css";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={notificationProvider}
            >
                <Routes>
                    <Route index element={<WelcomePage />} />

                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
}

export default App;
