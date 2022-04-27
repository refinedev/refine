import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Layout } from "@pankod/refine-mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Layout",
    component: Layout,
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof Layout>;

export const LayoutBasicView: ComponentStory<typeof Layout> = () => {
    return <Layout>Content of Layout Basic comes here 🎉</Layout>;
};
