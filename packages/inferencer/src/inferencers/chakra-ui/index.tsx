import React from "react";
import { useResource } from "@refinedev/core";

import { ShowInferencer } from "./show.tsx";
import { ListInferencer } from "./list.tsx";
import { CreateInferencer } from "./create.tsx";
import { EditInferencer } from "./edit.tsx";

import type { InferencerComponentProps } from "../../types/index.ts";

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
} from "./list.tsx";
export {
  ShowInferencer as ChakraUIShowInferencer,
  renderer as ChakraUIShowRenderer,
} from "./show.tsx";
export {
  EditInferencer as ChakraUIEditInferencer,
  renderer as ChakraUIEditRenderer,
} from "./edit.tsx";
export {
  CreateInferencer as ChakraUICreateInferencer,
  renderer as ChakraUICreateRenderer,
} from "./create.tsx";
export * from "../../types/index.ts";
