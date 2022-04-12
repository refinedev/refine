import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
    useNavigate,
    useParams,
} from "@remix-run/react";

import { IRouterProvider, Refine } from "@pankod/refine-core";
import dataProvider from "@pankod/refine-simple-rest";
import { PostCreate, PostList } from "./pages";

const API_URL = "https://api.fake-rest.refine.dev";

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
});

export default function App() {
    return (
        <Document>
            <Outlet />
        </Document>
    );
}

interface DocumentProps {
    children: React.ReactNode;
}

export const RouterProvider: IRouterProvider = {
    useHistory: () => {
        const navigate = useNavigate();

        return {
            push: navigate,
            replace: (path: string) => {
                navigate(path, { replace: true });
            },
            goBack: () => {
                navigate(-1);
            },
        };
    },
    useLocation,
    useParams: () => {
        const params = useParams();
        return params as any;
    },
    Prompt: () => null,
    Link: () => null,
};

export function Document({ children }: DocumentProps) {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>

            <body>
                <Refine
                    dataProvider={dataProvider(API_URL)}
                    routerProvider={RouterProvider}
                    resources={[
                        {
                            name: "posts",
                            list: PostList,
                            create: PostCreate,
                        },
                    ]}
                >
                    {children}
                </Refine>

                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
