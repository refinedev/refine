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
                    title={translate("common:resources.files.fields.id")}
                />
                <Column
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
                <Column
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

                <Column
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
