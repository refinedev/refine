import { IRefineContextOptions, RedirectionTypes } from "src/interfaces";

type RedirectPageProps = {
    redirectFromProps?: RedirectionTypes;
    action: "edit" | "create" | "clone";
    redirectOptions: IRefineContextOptions["redirect"];
};

export const redirectPage = ({
    redirectFromProps,
    action,
    redirectOptions,
}: RedirectPageProps): RedirectionTypes => {
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
