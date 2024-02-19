export const WITH_EXISTING_REACT_ROUTER_SETUP_SOURCE = `
import { Refine, WelcomePage, ErrorComponent } from "@refinedev/core";

import routerProvider from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Refine routerProvider={routerProvider}>
                <Routes>
                    <Route index element={<WelcomePage />} />
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
}

export default App;
`.trim();
