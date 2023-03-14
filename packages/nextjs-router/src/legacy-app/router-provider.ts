import { IRouterProvider } from "@refinedev/core";

import { useHistory } from "./use-history";
import { useLocation } from "./use-location";
import { useParams } from "./use-params";

import { Prompt } from "./prompt";
import { RefineLink as Link } from "./../legacy-common/refine-link";
import { RouterComponent } from "./router-component";

export function routerProvider(this: {
    params?: Record<string, string | string[]>;
}): IRouterProvider {
    return {
        useHistory,
        useLocation,
        useParams: useParams.bind({
            params: this.params,
        }),
        Prompt,
        Link,
        RouterComponent,
    };
}
