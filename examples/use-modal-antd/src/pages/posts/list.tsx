import { IResourceComponentsProps } from "@refinedev/core";

import { List, useTable, useModal } from "@refinedev/antd";

import { Table, Modal, Button } from "antd";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();
    const { modalProps, show, close } = useModal();

    return (
        <>
            <List
                headerProps={{
                    extra: <Button onClick={show}>Show Dummy Modal</Button>,
                }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column dataIndex="content" title="Content" />
                </Table>
            </List>
            <Modal onOk={close} {...modalProps}>
                Dummy Modal Content
            </Modal>
        </>
    );
};
