import * as React from "react";
import {
    List,
    Table,
    Column,
    FileField,
    UrlField,
    useTranslate,
} from "readmin";

export const FilesList = (props: any) => {
    const translate = useTranslate();
    return (
        <List {...props}>
            <Table
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
                    key="url"
                    dataIndex="url"
                    title={translate("common:columns.url")}
                    render={(value) => (
                        <FileField
                            value={value}
                            title={translate("common:fields.File")}
                        />
                    )}
                />
                <Column
                    key="url"
                    dataIndex="url"
                    title={translate("common:columns.image")}
                    render={(value, record) => (
                        <FileField
                            download
                            record={record}
                            value={value}
                            title={translate("common:forms.title")}
                        />
                    )}
                />

                <Column
                    key="files"
                    dataIndex="files"
                    title={translate("common:forms.imageFiles")}
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
                <Column
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
