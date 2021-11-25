import { LiveProvider, LiveEvent } from "@pankod/refine";
import PubNub, { ListenerParameters } from "pubnub";

const liveProvider = (pubnubClient: PubNub): LiveProvider => {
    return {
        subscribe: ({
            channel,
            type,
            params: { id },
            callback,
        }): [ListenerParameters, string] => {
            const listenerObject: ListenerParameters = {
                message: function (pubnubMessage) {
                    const { message, channel: pubnubChannel } = pubnubMessage;

                    if (
                        pubnubChannel === channel &&
                        (message?.type === type || type === "*")
                    ) {
                        if (id && message?.id !== id) {
                            return;
                        }

                        callback({
                            ...message,
                            date: new Date(),
                        });
                    }
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
            pubnubClient.publish({
                channel: event.channel,
                message: event,
            });
        },
    };
};

export { liveProvider };
