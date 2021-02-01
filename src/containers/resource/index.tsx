import React from "react";
import { Route, Switch } from "react-router-dom";

export interface ResourceProps {
    name: string;
    list?: any;
    create?: any;
    edit?: any;
    show?: boolean;
}

export const Resource: React.FC<ResourceProps> = ({
    list,
    create,
    edit,
    name,
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
                />
            </Route>
            <Route exact path={`/resources/${name}/create`}>
                <CreateComponent resourceName={name} />
            </Route>
            <Route exact path={`/resources/${name}/edit/:id`}>
                <EditComponent resourceName={name} />
            </Route>
            <Route exact path={`/resources/${name}/show/:id`}>
                <span>{`${name}->show`}</span>
            </Route>
        </Switch>
    );
};
