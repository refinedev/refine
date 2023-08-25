import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { Collapse, CollapseProps, Modal } from "antd";
import {
    AlignLeftOutlined,
    FieldTimeOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";

import { StageForm } from "../../../components/kanban/stage-form";
import { AccordionHeader } from "../../../components/kanban/accordion-header";
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

import { Task } from "../../../interfaces/graphql";
import { TitleForm } from "../../../components/kanban/title-form";

const panelStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: 0,
};

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

    const items: CollapseProps["items"] = [
        {
            key: "0",
            label: (
                <StageForm
                    initialValues={{ completed: completed ?? false, stage }}
                    isLoading={isLoading}
                />
            ),
            style: panelStyle,
            showArrow: false,
            collapsible: "icon",
        },
        {
            key: "1",
            label: (
                <AccordionHeader
                    icon={<AlignLeftOutlined />}
                    isActive={activeKey === "1"}
                    fallback={<DescriptionHeader description={description} />}
                    isLoading={isLoading}
                >
                    Description
                </AccordionHeader>
            ),
            children: (
                <DescriptionForm
                    initialValues={{ description }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            ),
            style: panelStyle,
            showArrow: false,
        },
        {
            key: "2",
            label: (
                <AccordionHeader
                    icon={<FieldTimeOutlined />}
                    isActive={activeKey === "2"}
                    fallback={<DueDateHeader dueData={dueDate} />}
                    isLoading={isLoading}
                >
                    Due date
                </AccordionHeader>
            ),
            children: (
                <DueDateForm
                    initialValues={{ dueDate: dueDate ?? undefined }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            ),
            style: panelStyle,
            showArrow: false,
        },
        {
            key: "3",
            label: (
                <AccordionHeader
                    icon={<UsergroupAddOutlined />}
                    isActive={activeKey === "3"}
                    fallback={<UsersHeader users={users} />}
                    isLoading={isLoading}
                >
                    Users
                </AccordionHeader>
            ),
            children: (
                <UsersForm
                    initialValues={{
                        userIds: users?.map((user) => ({
                            label: user.name,
                            value: user.id,
                        })),
                    }}
                    cancelForm={() => setActiveKey(undefined)}
                />
            ),
            style: panelStyle,
            showArrow: false,
        },
        {
            key: "4",
            label: (
                <CheckListForm
                    isLoading={isLoading}
                    initialValues={{ checklist }}
                />
            ),
            style: panelStyle,
            showArrow: false,
            collapsible: "icon",
        },
    ];

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
            <Collapse
                accordion
                items={items}
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key[0])}
                style={{ border: "none", borderRadius: 0 }}
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
