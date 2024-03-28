import { MantineProvider } from "@mantine/core";
import { buttonRefreshTests } from "@refinedev/ui-tests";
import { RefreshButton } from "./";

describe("Refresh Button", () => {
  buttonRefreshTests.bind(this)(RefreshButton);
});
