import React from "react";
import { ResourceRouterParams, useRouterContext } from "@pankod/refine-core";

import { ShowInferencer } from "./show";
import { ListInferencer } from "./list";
import { CreateInferencer } from "./create";
import { EditInferencer } from "./edit";
import type { InferencerComponentProps } from "@/types";

const MuiInferencer: React.FC<InferencerComponentProps> = ({
    resource,
    name,
}) => {
    const { useParams } = useRouterContext();
    const { action } = useParams<ResourceRouterParams>();

    switch (action) {
        case "show":
            return <ShowInferencer name={name} resource={resource} />;
        case "create":
            return <CreateInferencer name={name} resource={resource} />;
        case "edit":
            return <EditInferencer name={name} resource={resource} />;
        default:
            return <ListInferencer name={name} resource={resource} />;
    }
};

export { MuiInferencer };
export { ShowInferencer as MuiShowInferencer } from "./show";
export { EditInferencer as MuiEditInferencer } from "./edit";
export { ListInferencer as MuiListInferencer } from "./list";
export { CreateInferencer as MuiCreateInferencer } from "./create";
