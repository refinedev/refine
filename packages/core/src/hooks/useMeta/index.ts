import { useResource } from "@hooks/resource";
import { useParsed } from "@hooks/router";
import { sanitizeResource } from "@definitions/helpers/sanitize-resource";
import { pickResource } from "@definitions/helpers/pick-resource";
import { MetaQuery } from "../../interfaces";

/**
 * Hook that returns the meta object.
 * @internal
 */
export const useMeta = () => {
    const { resources } = useResource();
    const { params } = useParsed();

    const getMetaFn = ({
        resource: resourceFromProp,
        meta: metaFromProp,
    }: {
        resource?: string;
        meta?: MetaQuery;
    } = {}) => {
        const resource = pickResource(resourceFromProp, resources);

        const { meta } = sanitizeResource(resource ?? {});

        return { ...meta, ...params, ...metaFromProp };
    };

    return getMetaFn;
};
