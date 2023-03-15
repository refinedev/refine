import React from "react";
import { useResource } from "@refinedev/core";

import { ShowInferencer } from "./show";
import { ListInferencer } from "./list";
import { CreateInferencer } from "./create";
import { EditInferencer } from "./edit";

import type { InferencerComponentProps } from "../../types";

const MantineInferencer: React.FC<InferencerComponentProps> = ({
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

export { MantineInferencer };
export {
    ShowInferencer as MantineShowInferencer,
    renderer as MantineShowRenderer,
} from "./show";
export {
    EditInferencer as MantineEditInferencer,
    renderer as MantineEditRenderer,
} from "./edit";
export {
    ListInferencer as MantineListInferencer,
    renderer as MantineListRenderer,
} from "./list";
export {
    CreateInferencer as MantineCreateInferencer,
    renderer as MantineCreateRenderer,
} from "./create";
export * from "../../types";
