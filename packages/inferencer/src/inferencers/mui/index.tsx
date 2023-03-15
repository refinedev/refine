import React from "react";
import { useResource } from "@refinedev/core";

import { ShowInferencer } from "./show";
import { ListInferencer } from "./list";
import { CreateInferencer } from "./create";
import { EditInferencer } from "./edit";

import type { InferencerComponentProps } from "../../types";

const MuiInferencer: React.FC<InferencerComponentProps> = ({
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

export { MuiInferencer };
export {
    ShowInferencer as MuiShowInferencer,
    renderer as MuiShowRenderer,
} from "./show";
export {
    EditInferencer as MuiEditInferencer,
    renderer as MuiEditRenderer,
} from "./edit";
export {
    ListInferencer as MuiListInferencer,
    renderer as MuiListRenderer,
} from "./list";
export {
    CreateInferencer as MuiCreateInferencer,
    renderer as MuiCreateRenderer,
} from "./create";
export * from "../../types";
