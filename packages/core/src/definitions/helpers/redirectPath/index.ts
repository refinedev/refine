import { IRefineContextOptions, RedirectionTypes } from "src/interfaces";

type RedirectPathProps = {
    redirectFromProps?: RedirectionTypes;
    action: "edit" | "create" | "clone";
    redirectOptions: IRefineContextOptions["redirect"];
};

export const redirectPath = ({
    redirectFromProps,
    action,
    redirectOptions,
}: RedirectPathProps): RedirectionTypes => {
    if (redirectFromProps) {
        return redirectFromProps;
    }

    return redirectOptions[action];
};
