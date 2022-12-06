import React from "react";
import { ResourceRouterParams, useRouterContext } from "@pankod/refine-core";

import { ShowInferencer } from "./show";
import { ListInferencer } from "./list";
import { CreateInferencer } from "./create";
import { EditInferencer } from "./edit";

import type { InferencerComponentProps } from "@/types";

const ChakraUIInferencer: React.FC<InferencerComponentProps> = ({
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

export { ChakraUIInferencer };
export { ListInferencer as ChakraUIListInferencer } from "./list";
export { ShowInferencer as ChakraUIShowInferencer } from "./show";
export { EditInferencer as ChakraUIEditInferencer } from "./edit";
export { CreateInferencer as ChakraUICreateInferencer } from "./create";
