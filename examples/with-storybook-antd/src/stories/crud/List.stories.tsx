import { ComponentStory, ComponentMeta } from "@storybook/react";
import { List as AntdList } from "@refinedev/antd";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "CRUD",
    component: AntdList,
    argTypes: {
        title: { defaultValue: undefined, type: "string" },
        canCreate: { defaultValue: null, type: "boolean" },
        pageHeaderProps: { defaultValue: null, control: "object" },
    },
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof AntdList>;

export const List: ComponentStory<typeof AntdList> = (args) => {
    return (
        <AntdList
            {...args}
            title={args.title === "" ? undefined : args.title}
        />
    );
};
