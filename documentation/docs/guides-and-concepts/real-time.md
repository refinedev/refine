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

## Custom Subscriptions

You can subscribe to events emitted within **refine** in any place in your app with `useSubscription`.

For example, we can subscribe to **_create_** event for **_posts_** resource and we can show a badge for number of events in the sider menu.

Firstly, let's implement a custom sider like in [this example](/examples/customization/customSider.md).

<details>
<summary>Custom Sider Menu</summary>

```tsx title="src/components/sider.tsx"
import React, { useState } from "react";
import {
    AntdLayout,
    Menu,
    useMenu,
    useTitle,
    useNavigation,
    Grid,
    Icons,
} from "@pankod/refine";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

export const CustomSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const { push } = useNavigation();

    const isMobile = !breakpoint.lg;

    return (
        <AntdLayout.Sider
            collapsible
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <Title collapsed={collapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={({ key }) => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }

                    push(key as string);
                }}
            >
                {menuItems.map(({ icon, label, route }) => {
                    const isSelected = route === selectedKey;
                    return (
                        <Menu.Item
                            style={{
                                fontWeight: isSelected ? "bold" : "normal",
                            }}
                            key={route}
                            icon={icon}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                {label}
                                {!collapsed && isSelected && (
                                    <Icons.RightOutlined />
                                )}
                            </div>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </AntdLayout.Sider>
    );
};
```

</details>

Now, let's add a badge for number of create event for **_posts_** menu item.

```tsx
import React, { useState } from "react";
import {
    AntdLayout,
    Menu,
    useMenu,
    useTitle,
    useNavigation,
    Grid,
    Icons,
    //highlight-start
    Badge,
    useSubscription,
    //highlight-end
} from "@pankod/refine";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

export const CustomSider: React.FC = () => {
    const [subscriptionCount, setSubscriptionCount] = useState(0);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const Title = useTitle();
    const { menuItems, selectedKey } = useMenu();
    const breakpoint = Grid.useBreakpoint();
    const { push } = useNavigation();

    const isMobile = !breakpoint.lg;

    //highlight-start
    useSubscription({
        channel: "resources/posts",
        type: "created",
        onLiveEvent: () => setSubscriptionCount((prev) => prev + 1),
    });
    //highlight-end

    return (
        <AntdLayout.Sider
            collapsible
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
            style={isMobile ? antLayoutSiderMobile : antLayoutSider}
        >
            <Title collapsed={collapsed} />
            <Menu
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={({ key }) => {
                    if (!breakpoint.lg) {
                        setCollapsed(true);
                    }

                    //highlight-start
                    if (key === "/posts") {
                        setSubscriptionCount(0);
                    }
                    //highlight-end

                    push(key as string);
                }}
            >
                {menuItems.map(({ icon, label, route }) => {
                    const isSelected = route === selectedKey;
                    return (
                        <Menu.Item
                            style={{
                                fontWeight: isSelected ? "bold" : "normal",
                            }}
                            key={route}
                            icon={icon}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                //highlight-start
                                <div>
                                    {label}
                                    {label === "Posts" && (
                                        <Badge
                                            size="small"
                                            count={subscriptionCount}
                                            offset={[2, -15]}
                                        />
                                    )}
                                </div>
                                //highlight-end
                                {!collapsed && isSelected && (
                                    <Icons.RightOutlined />
                                )}
                            </div>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </AntdLayout.Sider>
    );
};
```

[Gif]!

## Live Condesandbox Example
