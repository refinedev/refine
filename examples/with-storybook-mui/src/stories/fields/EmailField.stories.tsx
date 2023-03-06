import { ComponentStory, ComponentMeta } from "@storybook/react";

import {
    EmailField,
    MarkdownField,
    TextFieldComponent,
    NumberField,
} from "@refinedev/mui";

import { useTheme } from "@mui/material/styles";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Fields",
    component: EmailField,
    argTypes: {
        value: {
            type: "string",
        },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof EmailField>;

export const Email: ComponentStory<typeof EmailField> = (args) => (
    <EmailField value={args.value ?? "melihozkalay@pankod.com"} />
);
export const Text: ComponentStory<typeof TextFieldComponent> = (args) => {
    const theme = useTheme();
    return (
        <div style={{ color: theme.palette.text.primary }}>
            <TextFieldComponent value={args.value ?? "Text Field"} />
        </div>
    );
};
export const MarkDown: ComponentStory<typeof MarkdownField> = (args) => {
    const theme = useTheme();
    return (
        <div style={{ color: theme.palette.text.primary }}>
            <MarkdownField value={args.value ?? "Markdown"} />
        </div>
    );
};

export const Number: ComponentStory<typeof NumberField> = (args) => {
    const theme = useTheme();
    return (
        <div style={{ color: theme.palette.text.primary }}>
            <NumberField value={args.value ?? "1"} />
        </div>
    );
};
