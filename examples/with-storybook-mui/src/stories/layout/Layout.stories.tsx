import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThemedLayout } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / ThemedLayout",
    component: ThemedLayout,
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof ThemedLayout>;

export const LayoutBasicView: ComponentStory<typeof ThemedLayout> = () => {
    return (
        <ThemedLayout>Content of ThemedLayout Basic comes here 🎉</ThemedLayout>
    );
};
