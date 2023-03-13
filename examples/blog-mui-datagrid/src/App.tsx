import { GitHubBanner, Refine } from "@refinedev/core";
import { LightTheme } from "@refinedev/mui";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import Layout from "./components/Layout";
import EmployeeList from "./pages/employees";

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <GitHubBanner />
            <Refine
                Layout={Layout}
                legacyRouterProvider={routerProvider}
                dataProvider={dataProvider(
                    "https://my-json-server.typicode.com/Mich45/employee-data",
                )}
                resources={[{ name: "employees", list: EmployeeList }]}
            />
        </ThemeProvider>
    );
}

export default App;
