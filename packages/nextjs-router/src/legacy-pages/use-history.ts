import { useRouter } from "next/router";

import type { IRouterProvider } from "@pankod/refine-core";

export const useHistory: IRouterProvider["useHistory"] = () => {
    const router = useRouter();
    const { push, replace, back } = router;
    return {
        push,
        replace,
        goBack: back,
    };
};
