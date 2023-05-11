import { GitHubBanner, Refine } from "@refinedev/core";
import { ErrorComponent, RefineThemes } from "@refinedev/mui";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";

import Layout from "./components/Layout";
import EmployeeList from "./pages/employees";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ThemeProvider theme={RefineThemes.Blue}>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://my-json-server.typicode.com/Mich45/employee-data",
                    )}
                    resources={[{ name: "employees", list: "/employees" }]}
                >
                    <Routes>
                        <Route
                            element={
                                <Layout>
                                    <Outlet />
                                </Layout>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="employees" />
                                }
                            />

                            <Route
                                path="/employees"
                                element={<EmployeeList />}
                            />

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
