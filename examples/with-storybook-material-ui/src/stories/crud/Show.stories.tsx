import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Show } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Basic Views",
    component: Show,
    argTypes: {
        title: {
            type: "string",
        },
        canEdit: { type: "boolean" },
        canDelete: { type: "boolean" },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof Show>;

export const ShowBasicView: ComponentStory<typeof Show> = (args) => {
    return (
        <Show canDelete={args.canDelete} canEdit={args.canEdit}>
            Content of Show Basic View comes here 🤸‍♀️
        </Show>
    );
};
