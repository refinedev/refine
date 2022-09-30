import { crudListTests } from "@pankod/refine-ui-tests";
import { List } from "./index";

describe("<List/>", () => {
    beforeEach(() => {
        // This is an issue on `mui` side rather than `refine`. Ignoring for now but might need to be fixed.
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.includes?.("validateDOMNesting")) {
                return;
            }

            console.warn(message);
        });
    });

    crudListTests.bind(this)(List);
});
