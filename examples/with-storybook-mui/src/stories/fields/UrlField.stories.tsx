import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FileField, UrlField } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Fields",
    component: UrlField,
    argTypes: {
        value: {
            type: "string",
            defaultValue: "https://placeimg.com/640/680",
        },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof FileField>;

export const Url: ComponentStory<typeof UrlField> = (args) => {
    return <UrlField value={args.value} />;
};
