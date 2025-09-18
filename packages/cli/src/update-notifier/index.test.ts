import { vi } from "vitest";
import { ENV } from "@utils/env";
import * as notifier from "./index";

const {
  store,
  isPackagesCacheExpired,
  isUpdateNotifierDisabled,
  shouldUpdatePackagesCache,
} = notifier;

test("Should update packages cache", async () => {
  const testCases = [
    {
      isExpired: true,
      isKeyValid: true,
      output: true,
    },
    {
      isExpired: true,
      isKeyValid: false,
      output: true,
    },
    {
      isExpired: false,
      isKeyValid: false,
      output: true,
    },
    {
      isExpired: false,
      isKeyValid: true,
      output: false,
    },
    {
      isExpired: false,
      isKeyValid: null,
      output: null,
    },
    {
      isExpired: true,
      isKeyValid: null,
      output: null,
    },
  ];

  for (const testCase of testCases) {
    vi.spyOn(notifier, "isPackagesCacheExpired").mockReturnValueOnce(
      testCase.isExpired,
    );

    vi.spyOn(notifier, "validateKey").mockResolvedValue(testCase.isKeyValid);

    const shouldUpdate = await shouldUpdatePackagesCache();
    expect(shouldUpdate).toBe(testCase.output);
  }
});

test("Package cache is expired", () => {
  const testCases = [
    {
      lastUpdated: 1,
      now: 2,
      cacheTTL: "1",
      output: true,
    },
    {
      lastUpdated: 1,
      now: 2,
      cacheTTL: "2",
      output: false,
    },
    {
      lastUpdated: 1,
      now: 2,
      cacheTTL: "1",
      output: true,
    },
  ];

  testCases.forEach((testCase) => {
    ENV.UPDATE_NOTIFIER_CACHE_TTL = testCase.cacheTTL;
    Date.now = vi.fn(() => testCase.now);
    store.get = vi.fn(() => testCase.lastUpdated);

    expect(isPackagesCacheExpired()).toBe(testCase.output);
  });

  store.get = vi.fn(() => undefined);
  expect(isPackagesCacheExpired()).toBe(true);

  store.get = vi.fn(() => null);
  expect(isPackagesCacheExpired()).toBe(true);

  store.get = vi.fn(() => 0);
  expect(isPackagesCacheExpired()).toBe(true);
});

test("Update notifier should not run if env.UPDATE_NOTIFIER_IS_DISABLED is true", () => {
  ENV.UPDATE_NOTIFIER_IS_DISABLED = "true";
  expect(isUpdateNotifierDisabled()).toBe(true);

  ENV.UPDATE_NOTIFIER_IS_DISABLED = "TRUE";
  expect(isUpdateNotifierDisabled()).toBe(true);

  ENV.UPDATE_NOTIFIER_IS_DISABLED = "false";
  expect(isUpdateNotifierDisabled()).toBe(false);

  ENV.UPDATE_NOTIFIER_IS_DISABLED = "1";
  expect(isUpdateNotifierDisabled()).toBe(false);

  ENV.UPDATE_NOTIFIER_IS_DISABLED = "0";
  expect(isUpdateNotifierDisabled()).toBe(false);
});
