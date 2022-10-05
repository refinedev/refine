import { OpenNotificationParams } from ".";

export type SuccessErrorNotification<
    TData = unknown,
    TError = unknown,
    TVariables = unknown,
> = {
    /**
     * Success notification configuration to be displayed when the mutation is successful.
     * @default '"There was an error creating resource (status code: `statusCode`)" or "Error when updating resource (status code: statusCode)"' 

     */
    successNotification?:
        | OpenNotificationParams
        | false
        | ((
              data?: TData,
              values?: TVariables,
              resource?: string,
          ) => OpenNotificationParams);
    /**
     * Error notification configuration to be displayed when the mutation fails.
     * @default '"There was an error creating resource (status code: `statusCode`)" or "Error when updating resource (status code: statusCode)"'
     */
    errorNotification?:
        | OpenNotificationParams
        | false
        | ((
              error?: TError,
              values?: TVariables,
              resource?: string,
          ) => OpenNotificationParams);
};
