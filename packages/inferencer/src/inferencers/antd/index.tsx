import React from "react";
import { useResource } from "@refinedev/core";

import { ShowInferencer } from "./show.tsx";
import { ListInferencer } from "./list.tsx";
import { CreateInferencer } from "./create.tsx";
import { EditInferencer } from "./edit.tsx";

import type { InferencerComponentProps } from "../../types/index.ts";

const AntdInferencer: React.FC<InferencerComponentProps> = ({
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

export { AntdInferencer };
export {
  ShowInferencer as AntdShowInferencer,
  renderer as AntdShowRenderer,
} from "./show.tsx";
export {
  EditInferencer as AntdEditInferencer,
  renderer as AntdEditRenderer,
} from "./edit.tsx";
export {
  ListInferencer as AntdListInferencer,
  renderer as AntdListRenderer,
} from "./list.tsx";
export {
  CreateInferencer as AntdCreateInferencer,
  renderer as AntdCreateRenderer,
} from "./create.tsx";
export * from "../../types/index.ts";
