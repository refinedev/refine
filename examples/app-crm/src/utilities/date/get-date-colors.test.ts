import dayjs from "dayjs";
import { getDateColor } from "./get-date-colors";

describe("getDateColors function", () => {
    it("should return 'error' if the date is before today", () => {
        const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
        expect(getDateColor({ date: yesterday })).toBe("error");
    });

    it("should return 'warning' if the date is before 3 days from today", () => {
        const threeDaysAgo = dayjs().subtract(3, "day").format("YYYY-MM-DD");
        expect(getDateColor({ date: threeDaysAgo })).toBe("warning");
    });

    it("should return 'default' if the date is today or in the future", () => {
        const today = dayjs().format("YYYY-MM-DD");
        const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
        expect(getDateColor({ date: today })).toBe("default");
        expect(getDateColor({ date: tomorrow })).toBe("default");
    });
});
