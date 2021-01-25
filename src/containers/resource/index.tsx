import React from "react";
import { useDispatch } from "react-redux";

import { ResourceActions } from "@actions";
import { IResourceReducer } from "@interfaces";

export interface ResourceProps {
    name: string;
    list: boolean;
    create: boolean;
    edit: boolean;
    show: boolean;
}

export const Resource: React.FC<ResourceProps> = ({
    name,
    list,
    create,
    edit,
    show,
}) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const data: { [name: string]: IResourceReducer } = {
            [name]: {
                props: {
                    name: name,
                    hasCreate: create,
                    hasEdit: edit,
                    hasList: list,
                    hasShow: show,
                },
                data: [],
                list: {
                    params: {
                        page: 1,
                    },
                },
            },
        };
        dispatch(ResourceActions.register(data));
    }, []);

    return <span>resource - {name}</span>;
};
