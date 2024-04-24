import React from "react";
import { useResource } from "@refinedev/core";

import { ShowInferencer } from "./show.tsx";
import { ListInferencer } from "./list.tsx";
import { CreateInferencer } from "./create.tsx";
import { EditInferencer } from "./edit.tsx";

import type { InferencerComponentProps } from "../../types/index.ts";

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
} from "./show.tsx";
export {
  EditInferencer as MantineEditInferencer,
  renderer as MantineEditRenderer,
} from "./edit.tsx";
export {
  ListInferencer as MantineListInferencer,
  renderer as MantineListRenderer,
} from "./list.tsx";
export {
  CreateInferencer as MantineCreateInferencer,
  renderer as MantineCreateRenderer,
} from "./create.tsx";
export * from "../../types/index.ts";
