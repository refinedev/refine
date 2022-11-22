import { ENV } from "@utils/env";
import { shouldUpdatePackages, store, isUpdateNotifierDisabled } from ".";

test("Should update packages cache", () => {
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
        Date.now = jest.fn(() => testCase.now);
        store.get = jest.fn(() => testCase.lastUpdated);

        expect(shouldUpdatePackages()).toBe(testCase.output);
    });

    store.get = jest.fn(() => undefined);
    expect(shouldUpdatePackages()).toBe(true);

    store.get = jest.fn(() => null);
    expect(shouldUpdatePackages()).toBe(true);

    store.get = jest.fn(() => 0);
    expect(shouldUpdatePackages()).toBe(true);
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
