import { sanitizeResource } from "@definitions/helpers/sanitize-resource";
import { useParsed } from "@hooks/router";

import { MetaQuery } from "../../contexts/data/types";
import { IResourceItem } from "../../contexts/resource/types";

/**
 * Hook that returns a function to get meta.
 * The meta is a combination of the resource meta, hook meta and query params.
 * @internal
 */
export const useMeta = () => {
  const { params } = useParsed();

  const getMetaFn = ({
    resource,
    meta: metaFromProp,
  }: {
    resource?: IResourceItem;
    meta?: MetaQuery;
  } = {}) => {
    const { meta } = sanitizeResource(resource) ?? { meta: {} };

    // this fields came from the query params and should be removed from the meta because they are not part of the meta.
    const {
      filters: _filters,
      sorters: _sorters,
      current: _current,
      pageSize: _pageSize,
      ...additionalParams
    } = params ?? {};

    return { ...meta, ...additionalParams, ...metaFromProp };
  };

  return getMetaFn;
};
