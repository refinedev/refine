import { OpenNotificationParams } from ".";

export type SuccessErrorNotification<
    TData = unknown,
    TError = unknown,
    TVariables = unknown,
> = {
    /**
     * Success notification configuration to be displayed when the mutation is successful.
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
