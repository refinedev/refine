import { GitHubBanner, Refine } from "@refinedev/core";
import {
    notificationProvider,
    RefineSnackbarProvider,
    RefineThemes,
    WelcomePage,
    ErrorComponent,
} from "@refinedev/mui";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ThemeProvider theme={RefineThemes.Blue}>
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
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route index element={<WelcomePage />} />

                            <Route path="*" element={<ErrorComponent />} />
                        </Routes>
                    </Refine>
                    <UnsavedChangesNotifier />
                </RefineSnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
