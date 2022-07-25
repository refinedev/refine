import { OpenNotificationParams } from ".";

export type SuccessErrorNotification<
    TData = unknown,
    TError = unknown,
    TVariables = unknown,
> = {
    successNotification?:
        | OpenNotificationParams
        | false
        | ((
              data?: TData,
              values?: TVariables,
              resource?: string,
          ) => OpenNotificationParams);
    errorNotification?:
        | OpenNotificationParams
        | false
        | ((
              error?: TError,
              values?: TVariables,
              resource?: string,
          ) => OpenNotificationParams);
};
