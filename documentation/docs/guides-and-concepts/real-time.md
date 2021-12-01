---
id: real-time
title: Real Time
---

import realTimeDemo from '@site/static/img/guides-and-concepts/real-time/real-time.gif';
import manualMode from '@site/static/img/guides-and-concepts/real-time/manual-mode.gif';

**refine** lets you add real time support to your app via `liveProvider` prop for [`<Refine>`](api-references/components/refine-config.md). It can be used to update and show data in real time throughout your app. **refine** remains agnostic in its API to allow different solutions([PubNub](https://www.pubnub.com/), [Mercure](https://mercure.rocks/), [supabase](https://supabase.com) etc.) to be integrated.

[Refer to the Live Provider documentation for detailed information. &#8594](api-references/providers/live-provider.md)

We will be using [PubNub](https://www.pubnub.com/) in this guide to provide real time features.

## Installation

We need to install PubNub live provider package from **refine**.

```bash
npm install @pankod/refine-pubnub
```

## Setup

Since we will need `publishKey` and `subscribeKey` from PubNub, you must first register and get these keys from [PubNub](https://www.pubnub.com/).

The app will have one resource: **posts** with [CRUD pages(list, create, edit and show) similar to base example](https://github.com/pankod/refine/tree/master/examples/base/src/pages/posts).

[You can also refer to codesandbox to see final state of the app &#8594](#)

## Adding `liveProvider`

Firstly we create a pubnub client for [`@pankod/refine-pubnub`](#) live provider.

```ts title="src/utility/pubnubClient.ts"
import PubNub from "pubnub";

export const pubnubClient = new PubNub({
    publishKey: "your-publish-key",
    subscribeKey: "your-subscribe-key",
});
```

Then pass `liveProvider` from [`@pankod/refine-pubnub`](#) to `<Refine>`.

```tsx title="src/App.tsx"
// ...

//highlight-next-line
import { liveProvider } from "@pankod/refine-pubnub";

//highlight-next-line
import { pubnubClient } from "./utility";
import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

const App: React.FC = () => {
    return (
        <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            //highlight-start
            liveProvider={liveProvider(pubnubClient)}
            liveMode="auto"
            //highlight-end
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
        />
    );
};

export default App;
```

:::note

For live features to work automatically we also added `liveMode="auto"`.

[Refer to the Live Provider documentation for detailed information. &#8594](api-references/providers/live-provider.md#livemode)
:::

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={realTimeDemo} alt="Real Time Demo" />
</div>

## Configuring `liveMode`

We may not want to make real-time changes instantly in some cases. In these cases we can use `manual` mode to prevent the data changing instantly. Then we can handle the event manually.

For example in an edit page for a record, It would be better to handle real-time data manually to prevent synchronization problems caused by multiple editing sources. We would not want the data changing while we are trying to edit a record.

We will be alerting about changes in an alert box on top of the form instead of changing the data instantly.

```tsx title="src/pages/posts/edit.tsx"
// ...

export const PostEdit: React.FC = () => {
    //highlight-start
    const [deprecated, setDeprecated] =
        useState<"deleted" | "updated" | undefined>();
    //highlight-end

    const { formProps, saveButtonProps, queryResult } = useForm<IPost>({
        //highlight-start
        liveMode: "manual",
        onLiveEvent: (event) => {
            if (event.type === "deleted" || event.type === "updated") {
                setDeprecated(event.type);
            }
        },
        //highlight-end
    });

    //highlight-start
    const handleRefresh = () => {
        queryResult?.refetch();
        setDeprecated(undefined);
    };
    //highlight-end

    // ...

    return (
        <Edit /* ... */>
            //highlight-start
            {deprecated === "deleted" && (
                <Alert
                    message="This post is deleted."
                    type="warning"
                    style={{ marginBottom: 20 }}
                    action={<ListButton size="small" />}
                />
            )}
            //highlight-end 
            
            //highlight-start
            {deprecated === "updated" && (
                <Alert
                    message="This post is updated. Refresh to see changes."
                    type="warning"
                    style={{ marginBottom: 20 }}
                    action={
                        <RefreshButton size="small" onClick={handleRefresh} />
                    }
                />
            )}
            //highlight-end

            <Form {...formProps} layout="vertical">
                // ....
            </Form>
        </Edit>
    );
};
```

:::note

We can also implement similar thing in show page.

[Refer to the codesandbox example for detailed information. &#8594](#)
:::

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={manualMode} alt="Manual Mode Demo" />
</div>

## Live Condesandbox Example
