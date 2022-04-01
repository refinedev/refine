import { ComponentStory, ComponentMeta } from "@storybook/react";
import { List } from "@pankod/refine-antd";

export default {
    title: "Example/List",
    component: List,
    argTypes: {},
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const CanCreate = Template.bind({});
CanCreate.args = {
    canCreate: true,
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
    pageHeaderProps: {
        subTitle: "subtitle",
    },
};
