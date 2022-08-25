import { IRefineContextOptions } from "../../../../src/interfaces";
import { redirectPath } from ".";

describe("redirectPath", () => {
    it("should return redirectFromProps if it is provided", () => {
        const redirectFromProps = "edit";
        const action = "create";
        const redirectOptions: IRefineContextOptions["redirect"] = {
            clone: "edit",
            create: "list",
            edit: "show",
        };

        const result = redirectPath({
            redirectFromProps,
            action,
            redirectOptions,
        });
        expect(result).toEqual(redirectFromProps);
    });

    it.each(["edit", "create", "clone"] as const)(
        "should return redirect option according to action %s",
        (action) => {
            const redirectOptions: IRefineContextOptions["redirect"] = {
                clone: "edit",
                create: "list",
                edit: "show",
            };

            const result = redirectPath({
                action,
                redirectOptions,
            });
            expect(result).toEqual(redirectOptions[action]);
        },
    );
});
