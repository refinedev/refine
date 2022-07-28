import { buttonImportTests } from "@pankod/refine-ui-tests";

import { ImportButton } from "./index";

describe("<ImportButton /> usage with useImport", () => {
    buttonImportTests.bind(this)(ImportButton);
});
