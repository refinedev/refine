import React from "react";
import { Route, Switch } from "react-router-dom";

export interface ResourceProps {
    name: string;
    list?: any;
    create?: any;
    edit?: boolean;
    show?: boolean;
}

export const Resource: React.FC<ResourceProps> = ({ list, create, name }) => {
    const ListComponent = list;
    const CreateComponent = create;

    const isCreate = !!create;

    return (
        <Switch>
            <Route exact path={`/resources/${name}`}>
                <ListComponent resourceName={name} isCreate={isCreate} />
            </Route>
            <Route exact path={`/resources/${name}/create`}>
                <CreateComponent resourceName={name} />
            </Route>
            <Route exact path={`/resources/${name}/edit/:id`}>
                <span>{`${name}->edit`}</span>
            </Route>
            <Route exact path={`/resources/${name}/show/:id`}>
                <span>{`${name}->show`}</span>
            </Route>
        </Switch>
    );
};
