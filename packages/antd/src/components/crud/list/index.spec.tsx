import { crudListTests } from "@pankod/refine-ui-tests";
import { List } from "./index";

describe("<List/>", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    crudListTests.bind(this)(List);
});
