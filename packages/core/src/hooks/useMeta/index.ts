import { useResource } from "@hooks/resource";
import { useParsed } from "@hooks/router";
import { sanitizeResource } from "@definitions/helpers/sanitize-resource";
import { MetaQuery } from "../../interfaces";

export type UseMetaProps = {
    resource?: string;
    meta?: MetaQuery;
};

/**
 * Hook that returns the meta object.
 * @internal
 */
export const useMeta = ({
    resource: resourceFromProp,
    meta: metaFromProp,
}: UseMetaProps = {}) => {
    const { resource } = useResource(resourceFromProp);

    const { meta } = sanitizeResource(resource ?? {});

    const { params } = useParsed();

    return { ...meta, ...params, ...metaFromProp };
};
