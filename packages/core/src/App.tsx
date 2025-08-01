import { Refine } from "@refinedev/core";
import { BrowserRouter } from "react-router-dom";
import { RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider, notificationProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import dataProvider from "@refinedev/simple-rest";

const TestDashboard = () => <h2>✅ Custom Dashboard Works!</h2>;

export default function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <RefineSnackbarProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "test",
                custom: [{ path: "dashboard", component: TestDashboard }],
              },
            ]}
          />
        </RefineSnackbarProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}
