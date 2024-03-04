import React from "react";
import { BaseKey } from "../../interfaces";
import { useResource } from "../resource";

type UseIdProps = {
  id?: BaseKey;
  resource?: string;
};

type UseIdResponse = [
  BaseKey | undefined,
  React.Dispatch<React.SetStateAction<BaseKey | undefined>>,
];

/**
 * This hook is used in `useForm` to determine the `id` of the record.
 *
 * Inference of `id` is done with couple of rules and the inferred `id` might not always be used in the form to avoid faulty requests.
 */
export function useId({
  id: idFromProps,
  resource: resourceFromProps,
}: UseIdProps = {}): UseIdResponse {
  const { id: idFromRoute, identifier } = useResource(resourceFromProps);
  const { identifier: inferredIdentifier } = useResource();

  /** We only accept `id` from URL params if `resource` is not explicitly passed. */
  /** This is done to avoid sending wrong requests for custom `resource` and an async `id` */
  const getDefaultId = React.useCallback(() => {
    const idFromPropsOrRoute = idFromProps ?? idFromRoute;

    if (identifier !== inferredIdentifier) {
      return idFromProps;
    }

    return idFromPropsOrRoute;
  }, [idFromProps, idFromRoute, inferredIdentifier, identifier]);

  const defaultId = getDefaultId();

  // id state is needed to determine selected record in a context for example useModal
  const [id, setId] = React.useState<BaseKey | undefined>(defaultId);

  /**
   * In some cases, `id` from the router params is not available at the first render.
   *
   * (e.g. when using `Next.js` and client-side-rendering, `router` is not ready to use at the first render)
   *
   * We're watching for `defaultId` changes and setting `id` state if it's not equal to `defaultId`.
   */
  React.useEffect(() => {
    setId(defaultId);
  }, [defaultId]);

  return [id, setId];
}
