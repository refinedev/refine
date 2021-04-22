import * as React from "react";
import {
    List,
    Table,
    FileField,
    UrlField,
    useTranslate,
    useTable,
} from "@pankod/refine";

export const FilesList = (props: any) => {
    const translate = useTranslate();
    const { tableProps } = useTable({
        initialPageSize: 20,
    });
    return (
        <List {...props}>
            <Table
                {...tableProps}
                pagination={{
                    ...tableProps.pagination,
                    position: ["bottomCenter"],
                    size: "small",
                }}
            >
                <Table.Column
                    key="id"
                    dataIndex="id"
                    title={translate("common:resources.files.fields.id")}
                />
                <Table.Column
                    key="url"
                    dataIndex="url"
                    title={translate("common:resources.files.fields.url")}
                    render={(value) => (
                        <FileField
                            value={value}
                            titleKey="name"
                            srcKey="path"
                        />
                    )}
                />
                <Table.Column
                    key="url"
                    dataIndex="url"
                    title={translate("common:resources.files.fields.image")}
                    render={(value) => (
                        <FileField
                            download
                            value={value}
                            titleKey="title"
                            srcKey=""
                        />
                    )}
                />

                <Table.Column
                    key="files"
                    dataIndex="files"
                    title={translate("resources.files.forms.imageFiles")}
                    render={(value) => {
                        return (
                            <FileField
                                value={value}
                                srcKey="url"
                                titleKey="title"
                                target="_blank"
                                rel="noopener"
                            />
                        );
                    }}
                />
                <Table.Column
                    key="url"
                    dataIndex="url"
                    title="Test UrlField"
                    render={(value) => {
                        return (
                            <UrlField
                                value={value}
                                target="_blank"
                                title="test title"
                            />
                        );
                    }}
                />
            </Table>
        </List>
    );
};
