import React from "react";
import { ResourceRouterParams, useRouterContext } from "@pankod/refine-core";

import { ShowInferencer } from "./show";
import { ListInferencer } from "./list";
import { CreateInferencer } from "./create";
import { EditInferencer } from "./edit";
import type { InferencerComponentProps } from "@/types";

const AntdInferencer: React.FC<InferencerComponentProps> = ({
    resource,
    name,
    action: actionFromProps,
    id: idFromProps,
}) => {
    const { useParams } = useRouterContext();
    const { action, id } = useParams<ResourceRouterParams>();

    switch (actionFromProps ?? action) {
        case "show":
            return (
                <ShowInferencer
                    name={name}
                    resource={resource}
                    id={idFromProps ?? id}
                />
            );
        case "create":
            return (
                <CreateInferencer
                    name={name}
                    resource={resource}
                    id={idFromProps ?? id}
                />
            );
        case "edit":
            return (
                <EditInferencer
                    name={name}
                    resource={resource}
                    id={idFromProps ?? id}
                />
            );
        default:
            return (
                <ListInferencer
                    name={name}
                    resource={resource}
                    id={idFromProps ?? id}
                />
            );
    }
};

export { AntdInferencer };
export { ShowInferencer as AntdShowInferencer } from "./show";
export { EditInferencer as AntdEditInferencer } from "./edit";
export { ListInferencer as AntdListInferencer } from "./list";
export { CreateInferencer as AntdCreateInferencer } from "./create";
