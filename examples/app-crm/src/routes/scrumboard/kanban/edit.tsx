import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { Modal } from "antd";
import {
    AlignLeftOutlined,
    FieldTimeOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";

import { StageForm } from "../../../components/kanban/stage-form";
import { DescriptionForm } from "../../../components/kanban/description-form";
import { DescriptionHeader } from "../../../components/kanban/description-header";
import { DueDateForm } from "../../../components/kanban/duedate-form";
import { DueDateHeader } from "../../../components/kanban/duedate-header";
import { UsersForm } from "../../../components/kanban/users-form";
import { UsersHeader } from "../../../components/kanban/users-header";
import { CheckListForm } from "../../../components/kanban/checklist-form";
import { CommentForm } from "../../../components/kanban/comment-form";
import { CommentList } from "../../../components/kanban/comment-list";
import { ModalFooter } from "../../../components/kanban/modal-footer";
import { TitleForm } from "../../../components/kanban/title-form";
import { Accordion } from "../../../components/kanban/accordion";

import { Task } from "../../../interfaces/graphql";

export const KanbanEditPage = () => {
    const [activeKey, setActiveKey] = useState<string | undefined>();

    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const { modalProps, close, queryResult } = useModalForm<Task>({
        action: "edit",
        defaultVisible: true,
        meta: {
            fields: [
                "id",
                "title",
                "completed",
                "description",
                "dueDate",
                { stage: ["id", "title"] },
                { users: ["id", "name", "avatarUrl"] },
                { checklist: ["title", "checked"] },
            ],
        },
    });

    const { description, completed, stage, dueDate, users, checklist, title } =
        queryResult?.data?.data ?? {};
    const isLoading = queryResult?.isLoading ?? true;

    return (
        <Modal
            {...modalProps}
            className="kanban-update-modal"
            onCancel={() => {
                close();
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            }}
            title={
                <TitleForm initialValues={{ title }} isLoading={isLoading} />
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
