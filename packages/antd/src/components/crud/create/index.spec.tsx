import { crudCreateTests } from "@refinedev/ui-tests";
import { Create } from "./";

describe("Create", () => {
    crudCreateTests.bind(this)(Create);
});
