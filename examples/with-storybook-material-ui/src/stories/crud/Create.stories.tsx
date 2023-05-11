import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Create } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Basic Views",
    component: Create,
    argTypes: {
        title: {
            type: "string",
        },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof Create>;

export const CreateBasicView: ComponentStory<typeof Create> = () => {
    return <Create>Content of Create Basic View comes here 🎉</Create>;
};
