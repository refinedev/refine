import { fieldEmailTests } from "@pankod/refine-ui-tests";

import { EmailField } from "./";

describe("EmailField", () => {
    fieldEmailTests.bind(this)(EmailField);
});
