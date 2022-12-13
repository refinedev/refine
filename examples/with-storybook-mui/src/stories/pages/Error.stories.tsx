import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ErrorComponent } from "@pankod/refine-mui";

import { RefineWithoutLayout } from "../../../.storybook/preview";

export default {
    title: "Components / Pages / Error",
    component: ErrorComponent,
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof ErrorComponent>;

export const ErrorBasicView: ComponentStory<typeof ErrorComponent> = () => {
    return <ErrorComponent />;
};
