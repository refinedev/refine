import {
  GitHubBanner,
  Refine,
  WelcomePage,
  ErrorComponent,
} from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route index element={<WelcomePage />} />

          <Route path="*" element={<ErrorComponent />} />
        </Routes>
        <UnsavedChangesNotifier />
        <DocumentTitleHandler />
      </Refine>
    </BrowserRouter>
  );
}

export default App;
