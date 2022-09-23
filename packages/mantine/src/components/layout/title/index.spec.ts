import { layoutTitleTests } from "@pankod/refine-ui-tests";
import { Title } from "./index";

describe("Layout", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    layoutTitleTests.bind(this)(Title);
});
