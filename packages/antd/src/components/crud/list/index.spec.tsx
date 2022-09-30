import { crudListTests } from "@pankod/refine-ui-tests";
import { List } from "./index";

describe("<List/>", () => {
    crudListTests.bind(this)(List);
});
