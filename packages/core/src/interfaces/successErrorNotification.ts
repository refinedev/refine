import { OpenNotificationParams } from ".";

export type SuccessErrorNotification = {
    successNotification?: OpenNotificationParams | false;
    errorNotification?: OpenNotificationParams | false;
};
