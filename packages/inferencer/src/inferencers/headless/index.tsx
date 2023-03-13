import React from "react";
import { useResource } from "@refinedev/core";

import { ShowInferencer } from "./show";
import { ListInferencer } from "./list";
import { CreateInferencer } from "./create";
import { EditInferencer } from "./edit";

import type { InferencerComponentProps } from "../../types";

const HeadlessInferencer: React.FC<InferencerComponentProps> = ({
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

export { HeadlessInferencer };
export {
    ListInferencer as HeadlessListInferencer,
    renderer as HeadlessListRenderer,
} from "./list";
export {
    ShowInferencer as HeadlessShowInferencer,
    renderer as HeadlessShowRenderer,
} from "./show";
export {
    EditInferencer as HeadlessEditInferencer,
    renderer as HeadlessEditRenderer,
} from "./edit";
export {
    CreateInferencer as HeadlessCreateInferencer,
    renderer as HeadlessCreateRenderer,
} from "./create";
export * from "../../types";
