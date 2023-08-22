import { ErrorComponent, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout";
import {
    ProductCreate,
    ProductEdit,
    ProductList,
    ProductShow,
} from "./pages/products";
import {
    CategoryCreate,
    CategoryEdit,
    CategoryList,
    CategoryShow,
} from "./pages/categories";
import { ProductIcon, CategoryIcon } from "./components/icons";
import { Dashboard } from "./pages/dashboard";

function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <RefineKbarProvider>
                <Refine
                    dataProvider={dataProvider(
                        "https://api.finefoods.refine.dev",
                    )}
                    routerProvider={routerBindings}
                    resources={[
                        {
                            name: "products",
                            list: "/products",
                            create: "/products/create",
                            edit: "/products/edit/:id",
                            show: "/products/show/:id",
                            icon: <ProductIcon />,
                            meta: {
                                canDelete: true,
                            },
                        },
                        {
                            name: "categories",
                            list: "/categories",
                            create: "/categories/create",
                            edit: "/categories/edit/:id",
                            show: "/categories/show/:id",
                            icon: <CategoryIcon />,
                            meta: {
                                canDelete: true,
                            },
                        },
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        projectId: "wl4d1W-RmKWNN-721Z9X",
                    }}
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
                                element={<Navigate to="/dashboard" />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/products">
                                <Route index element={<ProductList />} />
                                <Route
                                    path="create"
                                    element={<ProductCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<ProductEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<ProductShow />}
                                />
                            </Route>
                            <Route path="/categories">
                                <Route index element={<CategoryList />} />
                                <Route
                                    path="create"
                                    element={<CategoryCreate />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<CategoryEdit />}
                                />
                                <Route
                                    path="show/:id"
                                    element={<CategoryShow />}
                                />
                            </Route>
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
