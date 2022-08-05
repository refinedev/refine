import { crudCreateTests } from "@pankod/refine-ui-tests";
import { Create } from "./";

describe("Create", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    crudCreateTests.bind(this)(Create);
});
