import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
    CreateButton,
    CloneButton,
    DeleteButton,
    EditButton,
    ExportButton,
    SaveButton,
    RefreshButton,
    ListButton,
    ImportButton,
    ShowButton,
} from "@refinedev/mui";

import { Button } from "@mui/material";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Buttons ",
    component: Button,
    argTypes: {
        disabled: { type: "boolean" },
        fullWidth: { type: "boolean" },
        title: { type: "string" },
        variant: {
            options: ["outlined", "contained", "text"],
            control: { type: "radio" },
        },
        color: {
            options: ["primary", "secondary"],
            control: { type: "radio" },
        },
        size: {
            options: ["small", "medium", "large"],
            control: { type: "radio" },
        },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof Button>;

export const A: ComponentStory<typeof Button> = (args) => {
    return (
        <Button title="default" {...args}>
            {args.title || "default"}
        </Button>
    );
};

A.storyName = "Default";

// Todo : default component name specify as "A" to list first happy hacking

export const Clone: ComponentStory<typeof CloneButton> = (args) => {
    return (
        <CloneButton {...args} title="clone">
            {args.title}
        </CloneButton>
    );
};

export const Create: ComponentStory<typeof CreateButton> = (args) => {
    return <CreateButton {...args}>{args.title || "create"}</CreateButton>;
};

export const Delete: ComponentStory<typeof DeleteButton> = (args) => {
    return <DeleteButton {...args}>{args.title || "delete"}</DeleteButton>;
};

export const Edit: ComponentStory<typeof EditButton> = (args) => {
    return <EditButton {...args}>{args.title || "edit"}</EditButton>;
};

export const Export: ComponentStory<typeof ExportButton> = (args) => {
    return <ExportButton {...args}>{args.title || "export"}</ExportButton>;
};

export const Save: ComponentStory<typeof SaveButton> = (args) => {
    return <SaveButton {...args}>{args.title || "save"}</SaveButton>;
};

export const Refresh: ComponentStory<typeof RefreshButton> = (args) => {
    return <RefreshButton {...args}>{args.title || "refresh"}</RefreshButton>;
};

export const Import: ComponentStory<typeof ImportButton> = (args) => {
    return <ImportButton {...args} />;
};

export const List: ComponentStory<typeof ListButton> = (args) => {
    return <ListButton {...args} />;
};

export const Show: ComponentStory<typeof ShowButton> = (args) => {
    return <ShowButton onClick={() => []} {...args} />;
};
