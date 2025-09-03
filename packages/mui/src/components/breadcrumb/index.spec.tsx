import { breadcrumbTests } from "@refinedev/ui-tests";

import { Breadcrumb } from "./";

describe("Breadcrumb", () => {
  beforeAll(() => {
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
  });

  breadcrumbTests.bind(this)(Breadcrumb);
});
