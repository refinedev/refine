import { useResourceWithRoute, useRouterContext } from "@hooks";
import { ResourceRouterParams, IResourceItem, BaseKey } from "../../interfaces";

type UseButtonProps = {
    propResourceName?: string;
    resourceNameOrRouteName?: string;
    recordItemId?: BaseKey;
};

type UseButtonReturnType = {
    resource: IResourceItem;
    resourceName: string;
    id?: BaseKey;
};

export const useButton = ({
    propResourceName,
    resourceNameOrRouteName,
    recordItemId,
}: UseButtonProps = {}): UseButtonReturnType => {
    const resourceWithRoute = useResourceWithRoute();

    const { useParams } = useRouterContext();

    const params = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(
        resourceNameOrRouteName ?? params.resource,
    );

    const resourceName = propResourceName ?? resource.name;

    const id = recordItemId ?? params.id;

    return {
        resource,
        resourceName,
        id,
    };
};
