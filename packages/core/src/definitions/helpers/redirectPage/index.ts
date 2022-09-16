import {
    FormAction,
    IRefineContextOptions,
    RedirectAction,
} from "src/interfaces";

type RedirectPageProps = {
    redirectFromProps?: RedirectAction;
    action: FormAction;
    redirectOptions: IRefineContextOptions["redirect"];
};

export const redirectPage = ({
    redirectFromProps,
    action,
    redirectOptions,
}: RedirectPageProps): RedirectAction => {
    if (redirectFromProps || redirectFromProps === false) {
        return redirectFromProps;
    }

    switch (action) {
        case "clone":
            return redirectOptions.afterClone;
        case "create":
            return redirectOptions.afterCreate;
        case "edit":
            return redirectOptions.afterEdit;
    }
};
