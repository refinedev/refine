import { useState } from "react";

import { useModal } from "@refinedev/antd";
import { useNavigation, useShow } from "@refinedev/core";
import { GetFields } from "@refinedev/nestjs-query";

import {
    AlignLeftOutlined,
    FieldTimeOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";

import { KanbanGetTaskQuery } from "@/graphql/types";

import {
    Accordion,
    CheckListForm,
    CommentForm,
    CommentList,
    DescriptionForm,
    DescriptionHeader,
    DueDateForm,
    DueDateHeader,
    ModalFooter,
    StageForm,
    TitleForm,
    UsersForm,
    UsersHeader,
} from "../components";
import { KANBAN_GET_TASK_QUERY } from "./queries";

export const KanbanEditPage = () => {
    const [activeKey, setActiveKey] = useState<string | undefined>();

    const { list } = useNavigation();
    const { modalProps, close } = useModal({
        modalProps: { open: true },
    });

    const {
        queryResult: { data, isLoading },
    } = useShow<GetFields<KanbanGetTaskQuery>>({
        meta: { gqlQuery: KANBAN_GET_TASK_QUERY },
    });

    const { description, completed, stage, dueDate, users, checklist, title } =
        data?.data ?? {};

    return (
        <Modal
            {...modalProps}
            className="kanban-update-modal"
            onCancel={() => {
                close();
                list("tasks", "replace");
            }}
            title={
                <TitleForm
                    initialValues={{ title }}
                    isLoading={isLoading ?? true}
                />
            }
            width={586}
            footer={<ModalFooter />}
        >
            <StageForm
                initialValues={{ completed: completed ?? false, stage }}
                isLoading={isLoading}
            />
            <Accordion
                accordionKey="description"
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<DescriptionHeader description={description} />}
                isLoading={isLoading}
                icon={<AlignLeftOutlined />}
                label="Description"
            >
                <DescriptionForm
                    initialValues={{ description }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>
            <Accordion
                accordionKey="due-date"
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<DueDateHeader dueData={dueDate} />}
                isLoading={isLoading}
                icon={<FieldTimeOutlined />}
                label="Due date"
            >
                <DueDateForm
                    initialValues={{ dueDate: dueDate ?? undefined }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>
            <Accordion
                accordionKey="users"
                activeKey={activeKey}
                setActive={setActiveKey}
                fallback={<UsersHeader users={users} />}
                isLoading={isLoading}
                icon={<UsergroupAddOutlined />}
                label="Users"
            >
                <UsersForm
                    initialValues={{
                        userIds: users?.map((user) => ({
                            label: user.name,
                            value: user.id,
                        })),
                    }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            </Accordion>
            <CheckListForm
                isLoading={isLoading}
                initialValues={{ checklist }}
            />

            <div
                style={{
                    backgroundColor: "#f0f2f5",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "48px",
                    borderBottom: "1px solid #d9d9d9",
                }}
            >
                <CommentForm />
                <CommentList />
            </div>
        </Modal>
    );
};
