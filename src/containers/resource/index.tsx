import React from "react";
import { Route, Switch } from "react-router-dom";

import { BaseList } from "@components";
export interface ResourceProps {
    name: string;
    list?: any;
    create?: boolean;
    edit?: boolean;
    show?: boolean;
}

export const Resource: React.FC<ResourceProps> = ({ list, name }) => {
    const ListComponent = list;

    return (
        <Switch>
            <Route exact path={`/resources/${name}`}>
                <BaseList resourceName={name}>
                    <ListComponent />
                </BaseList>
            </Route>
            <Route exact path={`/resources/${name}/create`}>
                <span>{`${name}->create`}</span>
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
