import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Edit } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Basic Views",
    component: Edit,
    argTypes: {
        title: {
            type: "string",
        },
        canDelete: { type: "boolean" },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof Edit>;

export const EditBasicView: ComponentStory<typeof Edit> = (args) => {
    return (
        <Edit canDelete={args.canDelete}>
            Content of Edit Basic View comes here 🤸‍♀️
        </Edit>
    );
};
