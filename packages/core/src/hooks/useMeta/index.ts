import { useParsed } from "@hooks/router";
import { sanitizeResource } from "@definitions/helpers/sanitize-resource";
import { IResourceItem, MetaQuery } from "../../interfaces";

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
        const { meta } = sanitizeResource(resource ?? {});

        return { ...meta, ...params, ...metaFromProp };
    };

    return getMetaFn;
};
