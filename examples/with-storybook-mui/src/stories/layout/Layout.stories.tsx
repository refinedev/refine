import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemedLayoutV2 } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / ThemedLayoutV2",
    component: ThemedLayoutV2,
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof ThemedLayoutV2>;

export const LayoutBasicView: ComponentStory<typeof ThemedLayoutV2> = () => {
    return (
        <ThemedLayoutV2>
            Content of ThemedLayoutV2 Basic comes here 🎉
        </ThemedLayoutV2>
    );
};
