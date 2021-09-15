// import {
//     useHistory,
//     useLocation,
//     useParams,
//     BrowserRouter,
//     Switch,
//     Route,
//     Prompt,
//     Link,
//     Redirect,
// } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";

const RouterProvider = () => ({
    useHistory: () => ({}),
    useLocation: () => ({}),
    useParams: () => ({}),
    BrowserRouter: () => null,
    Switch: () => null,
    Route: () => null,
    Prompt: () => null,
    Link,
    Redirect: () => null,
});

export default RouterProvider;
