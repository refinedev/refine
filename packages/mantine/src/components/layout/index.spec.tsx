import { layoutLayoutTests } from "@pankod/refine-ui-tests";
import { Layout } from "./index";

describe("Layout", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    layoutLayoutTests.bind(this)(Layout);
});
