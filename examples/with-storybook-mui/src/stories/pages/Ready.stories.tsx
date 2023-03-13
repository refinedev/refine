import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ReadyPage } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Pages / Ready",
    component: ReadyPage,
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof ReadyPage>;

export const ReadyBasicView: ComponentStory<typeof ReadyPage> = () => {
    return <ReadyPage />;
};
