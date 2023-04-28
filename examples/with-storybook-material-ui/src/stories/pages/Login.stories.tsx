import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LoginPage } from "@refinedev/mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Pages / Login",
    component: LoginPage,
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof LoginPage>;

export const LoginBasicView: ComponentStory<typeof LoginPage> = () => {
    return <LoginPage />;
};
