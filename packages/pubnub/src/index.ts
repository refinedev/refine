import { LiveProvider, LiveEvent, message } from "@pankod/refine";
import PubNub from "pubnub";
import Ably from "ably/promises";
import { Types } from "ably";

const client = new Ably.Realtime(
    "syVQsA.ofJCQg:GvXwhLsJhjMo4onQ_zQKjvb9biBIXMiDd7qLo9ZVA38",
);

interface MessageType extends Types.Message {
    data: LiveEvent;
}

const liveProvider = (): LiveProvider => {
    return {
        subscribe: ({ channel, type, params, callback }) => {
            const channelInstance = client.channels.get(channel);

            const listener = function (message: MessageType) {
                if (type.includes("*") || type.includes(message.data.type)) {
                    if (
                        message.data.type !== "created" &&
                        params?.ids !== undefined &&
                        message.data?.payload?.ids !== undefined
                    ) {
                        if (
                            params.ids.filter((value) =>
                                message.data.payload.ids!.includes(value),
                            ).length > 0
                        ) {
                            callback(message.data as LiveEvent);
                        }
                    } else {
                        callback(message.data);
                    }
                }
            };
            channelInstance.subscribe(listener);

            return { channelInstance, listener };
        },

        unsubscribe: (payload: {
            channelInstance: Types.RealtimeChannelPromise;
            listener: () => void;
        }) => {
            const { channelInstance, listener } = payload;
            channelInstance.unsubscribe(listener);
        },

        publish: (event: LiveEvent) => {
            const channelInstance = client.channels.get(event.channel);

            channelInstance.publish(event.type, event);
        },
    };
};

export { liveProvider, PubNub };

/* 
{
    message,
}: {
    message: { data: { type: string; params: { ids: string[] } } };
} */
