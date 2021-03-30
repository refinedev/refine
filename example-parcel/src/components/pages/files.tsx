import * as React from "react";
import {
    List,
    Table,
    FileField,
    UrlField,
    useTranslate,
    useTable,
} from "readmin";

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
                            title={translate(
                                "common:resources.files.fields.file",
                            )}
                        />
                    )}
                />
                <Table.Column
                    key="url"
                    dataIndex="url"
                    title={translate("common:resources.files.fields.image")}
                    render={(value, record) => (
                        <FileField
                            download
                            record={record}
                            value={value}
                            title={translate(
                                "common:resources.files.forms.title",
                            )}
                        />
                    )}
                />

                <Table.Column
                    key="files"
                    dataIndex="files"
                    title={translate("resources.files.forms.imageFiles")}
                    render={(value, record) => {
                        return (
                            <FileField
                                record={record}
                                value={value}
                                src="url"
                                title="title"
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
