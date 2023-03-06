import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FileField } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Fields",
    component: FileField,
    argTypes: {
        title: {
            type: "string",
        },
        src: {
            type: "string",
        },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof FileField>;

export const File: ComponentStory<typeof FileField> = (args) => {
    return (
        <FileField
            title={args.title}
            src={args.src ?? "https://placeimg.com/640/680"}
        />
    );
};
