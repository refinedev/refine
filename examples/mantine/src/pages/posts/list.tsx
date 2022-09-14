import { useMemo } from "react";
import { useTable } from "@pankod/refine-core";
import {
    Center,
    EditButton,
    List,
    Pagination,
    Table,
    useModalForm,
    Modal,
    Create,
    CreateButton,
    TextInput,
    Select,
    Edit,
} from "@pankod/refine-mantine";

import { Post } from "../../interfaces";

export const PostList: React.FC = () => {
    const { tableQueryResult, current, setCurrent, pageCount } = useTable<Post>(
        {
            resource: "posts",
        },
    );

    const createModalFormReturnValues = useModalForm({
        refineCoreProps: { action: "create" },
    });
    const editModalFormReturnValues = useModalForm({
        refineCoreProps: { action: "edit" },
    });

    const {
        saveButtonProps: createSaveButtonProps,
        modal: {
            show: showCreateModal,
            close: closeCreateModal,
            visible: createModalVisible,
        },
        getInputProps: getCreateInputProps,
    } = createModalFormReturnValues;
    const {
        modal: {
            show: showEditModal,
            close: closeEditModal,
            visible: editModalVisible,
        },
        getInputProps: getEditInputProps,
    } = editModalFormReturnValues;

    const rows = useMemo(() => {
        const data = tableQueryResult?.data?.data || [];

        return data.map((item) => (
            <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.hit}</td>
                <td>{item.status}</td>
                <td>
                    <EditButton hideText size="sm" recordItemId={item.id} />
                    <EditButton
                        size="sm"
                        onClick={() => showEditModal(item.id)}
                    >
                        Edit Modal
                    </EditButton>
                </td>
            </tr>
        ));
    }, [tableQueryResult.data]);

    return (
        <>
            <Modal opened={createModalVisible} onClose={closeCreateModal}>
                <Create saveButtonProps={createSaveButtonProps}>
                    <form>
                        <TextInput
                            label="Title"
                            {...getCreateInputProps("title")}
                        />
                        <Select
                            label="Status"
                            placeholder="Pick one"
                            {...getCreateInputProps("status")}
                            data={[
                                { label: "Published", value: "published" },
                                { label: "Draft", value: "draft" },
                                { label: "Rejected", value: "rejected" },
                            ]}
                        />
                    </form>
                </Create>
            </Modal>
            <Modal opened={editModalVisible} onClose={closeEditModal}>
                <Edit saveButtonProps={createSaveButtonProps}>
                    <form>
                        <TextInput
                            label="Title"
                            {...getEditInputProps("title")}
                        />
                        <Select
                            label="Status"
                            placeholder="Pick one"
                            {...getEditInputProps("status")}
                            data={[
                                { label: "Published", value: "published" },
                                { label: "Draft", value: "draft" },
                                { label: "Rejected", value: "rejected" },
                            ]}
                        />
                    </form>
                </Edit>
            </Modal>
            <List
                headerButtons={
                    <>
                        <CreateButton onClick={() => showCreateModal()}>
                            Modal Create
                        </CreateButton>
                        <CreateButton>Create</CreateButton>
                    </>
                }
            >
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Hit</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>

                <Center mt={16}>
                    {pageCount && (
                        <Pagination
                            total={pageCount}
                            page={current}
                            onChange={setCurrent}
                        />
                    )}
                </Center>
            </List>
        </>
    );
};
