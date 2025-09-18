import type { HttpError } from "@refinedev/core";
import { transformHttpError } from "../../src/utils/transformHttpError";
import * as _transformErrorMessages from "../../src/utils/transformErrorMessages";

describe("transformHttpError", () => {
  it("should transform an error object", () => {
    vi.mock("../../src/utils/transformErrorMessages", () => ({
      transformErrorMessages: vi.fn().mockImplementationOnce(() => {
        return {
          email: ["Email is required"],
        };
      }),
    }));

    const mockError = {
      response: {
        data: {
          error: {
            message: "Something went wrong",
            status: 400,
            details: {
              errors: [
                {
                  path: ["email"],
                  message: "Email is required",
                  name: "ValidationError",
                },
              ],
            },
          },
        },
      },
    };

    const expectedHttpError: HttpError = {
      statusCode: 400,
      message: "Something went wrong",
      errors: {
        email: ["Email is required"],
      },
    };

    expect(transformHttpError(mockError)).toEqual(expectedHttpError);
  });

  it("should handle undefined values", () => {
    vi.mock("../../src/utils/transformErrorMessages", () => ({
      transformErrorMessages: vi.fn().mockImplementationOnce(() => {
        return {};
      }),
    }));

    const mockError = {
      response: {
        data: {
          error: {
            message: undefined,
            status: undefined,
            details: {},
          },
        },
      },
    };

    const expectedHttpError = {
      statusCode: undefined,
      message: undefined,
      errors: {},
    };

    expect(transformHttpError(mockError)).toEqual(expectedHttpError);
  });
});
