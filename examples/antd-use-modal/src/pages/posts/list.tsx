import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    useModal,
    Modal,
    Button,
} from "@pankod/refine-antd";

import { IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();
    const { modalProps, show, close } = useModal();

    return (
        <>
            <List
                pageHeaderProps={{
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
