import { loadingOvertimeIndicatorTests } from "@refinedev/ui-tests";

import { LoadingOvertimeIndicator } from "./";

describe("LoadingOvertimeIndicator", () => {
    loadingOvertimeIndicatorTests.bind(this)(LoadingOvertimeIndicator as any);
});
