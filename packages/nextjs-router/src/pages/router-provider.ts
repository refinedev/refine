import { IRouterProvider } from "@pankod/refine-core";

import { Prompt } from "./prompt";
import { RefineLink as Link } from "src/common/refine-link";
import { useParams } from "./use-params";
import { useLocation } from "./use-location";
import { useHistory } from "./use-history";

export const routerProvider: IRouterProvider = {
    useHistory,
    useLocation,
    useParams,
    Prompt,
    Link,
};
