import {
    NextRouteComponent,
    handleRefineParams,
} from "@pankod/refine-nextjs-router/legacy";
import dataProvider from "@pankod/refine-simple-rest";

import { GetServerSideProps } from "next";
import { checkAuthentication } from "src/utils/checkAuthenticated";

import { API_URL } from "../src/constants";

export const getServerSideProps: GetServerSideProps<
    { initialData?: unknown },
    {
        refine: [resource: string, action: string, id: string];
    }
> = async (context) => {
    const { resource, action, id } = handleRefineParams(context.params?.refine);

    const { isAuthenticated, ...props } = await checkAuthentication(context);

    if (!isAuthenticated) {
        return props;
    }

    try {
        if (resource && action === "show" && id) {
            const data = await dataProvider(API_URL).getOne({
                resource: resource.slice(resource.lastIndexOf("/") + 1),
                id,
            });

            return {
                props: {
                    initialData: data,
                },
            };
        } else if (resource && !action && !id) {
            const data = await dataProvider(API_URL).getList({
                resource: resource.slice(resource.lastIndexOf("/") + 1),
            });

            return {
                props: {
                    initialData: data,
                },
            };
        }
    } catch (error) {
        return { props: {} };
    }

    return {
        props: {},
    };
};

export default NextRouteComponent;

/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `NextRouteComponent` like the following:
 *
 * export default NextRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
