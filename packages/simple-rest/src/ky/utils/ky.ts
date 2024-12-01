import type { HttpError } from "@refinedev/core";
import ky from "ky";
import type { KyInstance, Options as KyOptions } from "ky";

const handleErrorResponse = async (response: Response): Promise<void> => {
  if (!response.ok) {
    const customError: HttpError = {
      message: response.statusText,
      statusCode: response.status,
    };

    try {
      customError.data = await response.clone().json();
    } catch {
      customError.data = await response.clone().text();
    }

    throw customError;
  }
};

export const kyInstance = ky.create({
  hooks: {
    afterResponse: [
      async (_request, _options, response) => handleErrorResponse(response),
    ],
  },
});

export const createKyInstance = (
  baseUrl?: string,
  options?: KyOptions,
): KyInstance => {
  return ky.create({
    prefixUrl: baseUrl,
    ...options,
    hooks: {
      afterResponse: [
        async (_request, _options, response) => handleErrorResponse(response),
      ],
      ...options?.hooks,
    },
  });
};
