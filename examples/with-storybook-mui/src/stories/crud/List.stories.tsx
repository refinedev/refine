import { ComponentStory, ComponentMeta } from "@storybook/react";
import { List } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Basic Views",
    component: List,
    argTypes: {
        title: {
            type: "string",
        },
        canCreate: { type: "boolean" },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof List>;

export const ListBasicView: ComponentStory<typeof List> = (args) => {
    return (
        <List canCreate={args.canCreate}>
            Content of List Basic View comes here 🎉
        </List>
    );
};
