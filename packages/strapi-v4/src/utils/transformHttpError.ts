import { HttpError } from "@refinedev/core";
import { transformErrorMessages } from "./transformErrorMessages";

export const transformHttpError = (error: any): HttpError => {
    const message = error.response.data.error.message;
    const statusCode = error.response.data.error.status;
    const errorMessages = error.response.data.error.details.errors;

    const errors = transformErrorMessages(errorMessages);

    const httpError: HttpError = {
        statusCode,
        message,
        errors,
    };

    return httpError;
};
