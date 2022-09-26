import { crudCreateTests } from "@pankod/refine-ui-tests";
import { Create } from "./";

describe("Create", () => {
    crudCreateTests.bind(this)(Create);
});
