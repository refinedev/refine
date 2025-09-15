import { Breadcrumb } from "./";
import { breadcrumbTests } from "@refinedev/ui-tests";

describe("Breadcrumb", () => {
  beforeAll(() => {
    jest.spyOn(console, "warn").mockImplementation(jest.fn());
  });

  breadcrumbTests.bind(this)(Breadcrumb);
});
