import { handleError } from "../../src/utils";
import { PostgrestError } from "@supabase/supabase-js";
import { HttpError } from "@refinedev/core";

describe("handleError", () => {
    it("should transform PostgrestError into HttpError and reject the promise", async () => {
        const postgrestError: PostgrestError = {
            message: "Test error message",
            code: "404",
            details: "Not found",
            hint: "Check your endpoint",
        };

        const expectedHttpError: HttpError = {
            ...postgrestError,
            message: postgrestError.message,
            statusCode: parseInt(postgrestError.code),
        };

        try {
            await handleError(postgrestError);
        } catch (error) {
            expect(error).toEqual(expectedHttpError);
        }
    });
});
