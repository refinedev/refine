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

const RouterProvider = () => ({
    useHistory: () => ({}),
    useLocation: () => ({}),
    useParams: () => ({}),
    BrowserRouter: () => ({}),
    Switch: () => ({}),
    Route: () => ({}),
    Prompt: () => ({}),
    Link: () => ({}),
    Redirect: () => ({}),
});

export default RouterProvider;
