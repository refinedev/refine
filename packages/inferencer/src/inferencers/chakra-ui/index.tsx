import React from "react";
import { useResource } from "@refinedev/core";

import { ShowInferencer } from "./show";
import { ListInferencer } from "./list";
import { CreateInferencer } from "./create";
import { EditInferencer } from "./edit";

import type { InferencerComponentProps } from "../../types";

const ChakraUIInferencer: React.FC<InferencerComponentProps> = ({
    action: actionFromProps,
    id: idFromProps,
    ...props
}) => {
    const { action, id } = useResource();

    switch (actionFromProps ?? action) {
        case "show":
            return <ShowInferencer {...props} id={idFromProps ?? id} />;
        case "create":
            return <CreateInferencer {...props} id={idFromProps ?? id} />;
        case "edit":
            return <EditInferencer {...props} id={idFromProps ?? id} />;
        default:
            return <ListInferencer {...props} id={idFromProps ?? id} />;
    }
};

export { ChakraUIInferencer };
export {
    ListInferencer as ChakraUIListInferencer,
    renderer as ChakraUIListRenderer,
} from "./list";
export {
    ShowInferencer as ChakraUIShowInferencer,
    renderer as ChakraUIShowRenderer,
} from "./show";
export {
    EditInferencer as ChakraUIEditInferencer,
    renderer as ChakraUIEditRenderer,
} from "./edit";
export {
    CreateInferencer as ChakraUICreateInferencer,
    renderer as ChakraUICreateRenderer,
} from "./create";
export * from "../../types";
