import * as React from "react";
import {
    List,
    Table,
    Column,
    EmailField,
    TagField,
    BooleanField,
    DateField,
    Show,
    ShowTab,
    Tab,
    TextField,
    useTranslate,
} from "readmin";

import { Aside } from "../aside";

export const UserList = (props: any) => {
    const translate = useTranslate();
    return (
        <List {...props} aside={Aside}>
            <Table
                rowKey="id"
                pagination={{
                    pageSize: 20,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Column
                    key="id"
                    dataIndex="id"
                    title={translate("common:resources.users.fields.id")}
                />
                <Column
                    key="firstName"
                    dataIndex="firstName"
                    title={translate("common:resources.users.fields.firstName")}
                />
                <Column
                    key="lastName"
                    dataIndex="lastName"
                    title={translate("common:resources.users.fields.lastName")}
                />
                <Column
                    dataIndex="status"
                    title={translate("common:resources.users.fields.status")}
                    key="status"
                    render={(value) => <TagField value={value} />}
                />
                <Column
                    key="email"
                    dataIndex="email"
                    title={translate("common:resources.users.fields.email")}
                    render={(value) => <EmailField value={value} />}
                />
                <Column
                    dataIndex="status"
                    title={translate("common:resources.users.fields.status")}
                    key="boolean"
                    render={(value) => <BooleanField value={value} />}
                />
                <Column
                    key="birthday"
                    dataIndex="birthday"
                    title={translate("common:resources.users.fields.birthday")}
                    render={(value) => <DateField value={value} />}
                />
            </Table>
        </List>
    );
};

export const UserShow = (props: any) => {
    return (
        <Show {...props}>
            <ShowTab>
                <Tab tab="Summary">
                    <TextField renderRecordKey="id" />
                    <TextField renderRecordKey="firstName" />
                    <TextField renderRecordKey="lastName" />
                </Tab>
                <Tab tab="Detail">
                    <EmailField renderRecordKey="email" />
                    <DateField renderRecordKey="birthday" />
                </Tab>
            </ShowTab>
        </Show>
    );
};
