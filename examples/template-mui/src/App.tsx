import { Refine } from "@refinedev/core";
import {
    notificationProvider,
    RefineSnackbarProvider,
    LightTheme,
    WelcomePage,
    ErrorComponent,
} from "@refinedev/mui";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={LightTheme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <RefineSnackbarProvider>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        notificationProvider={notificationProvider}
                    >
                        <Routes>
                            <Route index element={<WelcomePage />} />

                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                    </Refine>
                </RefineSnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
