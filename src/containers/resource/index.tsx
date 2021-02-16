import React, { ReactNode } from "react";
import { Route, Switch } from "react-router-dom";

export interface OptionsProps {
    label: string;
}
export interface ResourceProps {
    name: string;
    list?: any;
    create?: any;
    edit?: any;
    canDelete?: boolean;
    icon?: ReactNode;
    options?: OptionsProps;
}

export const Resource: React.FC<ResourceProps> = ({
    list,
    create,
    edit,
    name,
    canDelete,
}) => {
    const ListComponent = list;
    const CreateComponent = create;
    const EditComponent = edit;

    const canCreate = !!create;
    const canEdit = !!edit;

    return (
        <>
            <Route exact path={`/resources/${name}`}>
                <ListComponent
                    resourceName={name}
                    canCreate={canCreate}
                    canEdit={canEdit}
                    canDelete={canDelete}
                />
            </Route>
            <Route exact path={`/resources/${name}/create`}>
                <CreateComponent resourceName={name} canEdit={canEdit} />
            </Route>
            <Route exact path={`/resources/${name}/edit/:id`}>
                <EditComponent resourceName={name} />
            </Route>
        </>
    );
};
