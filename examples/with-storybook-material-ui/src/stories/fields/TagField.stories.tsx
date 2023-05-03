import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TagField } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Fields",
    component: TagField,
    argTypes: {
        value: {
            type: "string",
        },
        color: {
            options: ["primary", "secondary"],
            control: { type: "radio" },
        },
        variant: {
            options: ["outlined", "filled"],
            control: { type: "radio" },
        },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof TagField>;

export const Tag: ComponentStory<typeof TagField> = (args) => (
    <TagField
        variant={args.variant}
        color={args.color}
        value={args.value ?? "tag"}
    />
);
