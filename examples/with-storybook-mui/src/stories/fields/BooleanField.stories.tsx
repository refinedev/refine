import { ComponentStory, ComponentMeta } from "@storybook/react";

import { BooleanField } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Fields",
    component: BooleanField,
    argTypes: {
        value: {
            type: "boolean",
        },
        valueLabelTrue: {
            type: "string",
        },
        valueLabelFalse: {
            type: "string",
        },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof BooleanField>;

export const Boolean: ComponentStory<typeof BooleanField> = (args) => (
    <BooleanField
        value={args.value}
        valueLabelTrue={args.valueLabelTrue}
        valueLabelFalse={args.valueLabelFalse}
    />
);
