import React from "react";
import { Route, Switch } from "react-router-dom";

export interface ResourceProps {
    name: string;
    list?: any;
    create?: any;
    edit?: any;
    isDelete?: boolean;
}

export const Resource: React.FC<ResourceProps> = ({
    list,
    create,
    edit,
    name,
    isDelete,
}) => {
    const ListComponent = list;
    const CreateComponent = create;
    const EditComponent = edit;

    const isCreate = !!create;
    const isEdit = !!edit;

    return (
        <Switch>
            <Route exact path={`/resources/${name}`}>
                <ListComponent
                    resourceName={name}
                    isCreate={isCreate}
                    isEdit={isEdit}
                    isDelete={isDelete}
                />
            </Route>
            <Route exact path={`/resources/${name}/create`}>
                <CreateComponent resourceName={name} />
            </Route>
            <Route exact path={`/resources/${name}/edit/:id`}>
                <EditComponent resourceName={name} />
            </Route>
        </Switch>
    );
};
