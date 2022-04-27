import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DateField, useTheme } from "@pankod/refine-mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Fields",
    component: DateField,
    argTypes: {
        value: {
            type: "string",
        },
        format: {
            type: "string",
        },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof DateField>;

export const Date: ComponentStory<typeof DateField> = (args) => {
    const theme = useTheme();
    return (
        <div style={{ color: theme.palette.text.primary }}>
            <DateField
                format={args.format ?? "L"}
                value={args.value ?? "12112022"}
            />
        </div>
    );
};
