import { loadingOvertimeTests } from "@refinedev/ui-tests";

import { LoadingOvertime } from "./";

describe("LoadingOvertime", () => {
    loadingOvertimeTests.bind(this)(LoadingOvertime as any);
});
