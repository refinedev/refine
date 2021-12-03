import { LiveProvider, LiveEvent, message } from "@pankod/refine";
import PubNub, { ListenerParameters } from "pubnub";
import Ably from "ably/promises";
import { Types } from "ably";

const client = new Ably.Realtime(
    "syVQsA.ofJCQg:GvXwhLsJhjMo4onQ_zQKjvb9biBIXMiDd7qLo9ZVA38",
);

const liveProvider = (): LiveProvider => {
    return {
        subscribe: ({ channel, type, params, callback }) => {
            const channelInstance = client.channels.get(channel);

            console.log("First console :", { params, channel, type });

            channelInstance.subscribe(function (message) {
                console.log("Girdi: ", { message, type });

                if (type === "*" || message.data.type === type) {
                    console.log("Girdi 2");
                    callback(message.data);
                }
            });

            return channelInstance;
        },

        unsubscribe: (channelInstance: Types.RealtimeChannelPromise) => {
            console.log("unsubscribe", { channelInstance });
            channelInstance.unsubscribe();
        },

        publish: (event: LiveEvent) => {
            const channelInstance = client.channels.get(event.channel);

            console.log("publish :", { event });
            channelInstance.publish(event);
        },
    };
};

export { liveProvider, PubNub };
