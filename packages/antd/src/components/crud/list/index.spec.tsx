import { crudListTests } from "@refinedev/ui-tests";
import { List } from "./index";

describe("<List/>", () => {
    crudListTests.bind(this)(List);
});
