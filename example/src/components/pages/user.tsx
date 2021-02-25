import * as React from "react";
import {
    List,
    Table,
    Column,
    EmailField,
    TagField,
    DateField,
    useTranslate,
} from "readmin";

export const UserList = (props: any) => {
    const translate = useTranslate();
    return (
        <List {...props}>
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
                    title={translate("common:columns.id")}
                />
                <Column
                    key="firstName"
                    dataIndex="firstName"
                    title={translate("common:columns.firstName")}
                />
                <Column
                    key="lastName"
                    dataIndex="lastName"
                    title={translate("common:columns.lastName")}
                />
                <Column
                    dataIndex="status"
                    title={translate("common:columns.status")}
                    key="status"
                    render={(value) => <TagField value={value} />}
                />
                <Column
                    key="email"
                    dataIndex="email"
                    title={translate("common:columns.email")}
                    render={(value) => <EmailField value={value} />}
                />

                <Column
                    key="birthday"
                    dataIndex="birthday"
                    title={translate("common:columns.birthday")}
                    render={(value) => <DateField value={value} />}
                />
            </Table>
        </List>
    );
};
