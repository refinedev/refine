import { Refine } from "@pankod/refine-core";
import { LightTheme } from "@pankod/refine-mui";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import routerProvider from "@pankod/refine-react-router-v6/legacy";
import dataProvider from "@pankod/refine-simple-rest";
import Layout from "./components/Layout";
import EmployeeList from "./pages/employees";

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
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
