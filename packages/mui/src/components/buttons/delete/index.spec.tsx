import { buttonDeleteTests } from "@pankod/refine-ui-tests";
import { DeleteButton } from "./";

describe("Delete Button", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    buttonDeleteTests.bind(this)(DeleteButton);
});
