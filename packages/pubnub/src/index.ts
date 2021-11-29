import { LiveProvider, LiveEvent } from "@pankod/refine";
import PubNub, { ListenerParameters } from "pubnub";

const liveProvider = (pubnubClient: PubNub): LiveProvider => {
    return {
        subscribe: ({
            channel,
            type,
            params,
            callback,
        }): [ListenerParameters, string] => {
            const listenerObject: ListenerParameters = {
                message: function (pubnubMessage) {
                    const { message, channel: pubnubChannel } = pubnubMessage;

                    console.log("vvvvvvvvvvvvvv");
                    console.log("message arrived", message);
                    console.log("type", type);
                    console.log(
                        "if",
                        pubnubChannel === channel &&
                            (message?.type === type || type === "*"),
                    );

                    if (
                        pubnubChannel === channel &&
                        (message?.type === type || type === "*")
                    ) {
                        console.log(
                            "id check if",
                            params?.id &&
                                message.payload.id.toString() !== params.id,
                        );

                        if (
                            params?.id &&
                            message.payload.id.toString() !== params.id
                        ) {
                            return;
                        }

                        callback({
                            ...message,
                            date: new Date(),
                        });

                        console.log("processed", pubnubMessage);
                    }

                    console.log("^^^^^^^^^^^^^^");
                },
            };

            pubnubClient.subscribe({ channels: [channel] });
            pubnubClient.addListener(listenerObject);

            console.log("pubnub subscribed to", channel);

            return [listenerObject, channel];
        },

        unsubscribe: ([listenerObject, channel]: [
            ListenerParameters,
            string,
        ]) => {
            pubnubClient.removeListener(listenerObject);

            console.log("pubnub unsubscribed from", channel);
        },

        publish: (event: LiveEvent) => {
            console.log(event);

            try {
                pubnubClient.publish({
                    channel: event.channel,
                    message: event,
                });
            } catch (e) {
                console.log(e);
                console.log("publish failed");
            }
        },
    };
};

export { liveProvider };
