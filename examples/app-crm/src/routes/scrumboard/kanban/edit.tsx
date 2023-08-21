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

import { KanbanStageForm } from "../../../components/kanban-stage-form";
import { AccordionHeader } from "../../../components/kanban-accordion-header";
import { KanbanDescriptionForm } from "../../../components/kanban-description-form";
import { KanbanDescriptionHeader } from "../../../components/kanban-description-header";
import { KanbanDueDateForm } from "../../../components/kanban-duedate-form";
import { KanbanDueDateHeader } from "../../../components/kanban-duedate-header";
import { KanbanUsersForm } from "../../../components/kanban-users-form";
import { KanbanUsersHeader } from "../../../components/kanban-users-header";
import { KanbanChecklistHeader } from "../../../components/kanban-checklist-header";
import { KanbanCheckListForm } from "../../../components/kanban-checklist-form";
import { KanbanCommentForm } from "../../../components/kanban-comment-form";
import { KanbanCommentList } from "../../../components/kanban-comment-list";
import { KanbanModalFooter } from "../../../components/kanban-modal-footer";
import { KanbanTitleForm } from "../../../components/kanban-title-form";

import { Task } from "../../../interfaces/graphql";

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
                { users: ["id", "name"] },
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
                <KanbanStageForm
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
                    fallback={
                        <KanbanDescriptionHeader description={description} />
                    }
                    isLoading={isLoading}
                >
                    Description
                </AccordionHeader>
            ),
            children: (
                <KanbanDescriptionForm
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
                    fallback={<KanbanDueDateHeader dueData={dueDate} />}
                    isLoading={isLoading}
                >
                    Due date
                </AccordionHeader>
            ),
            children: (
                <KanbanDueDateForm
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
                    fallback={<KanbanUsersHeader users={users} />}
                    isLoading={isLoading}
                >
                    Users
                </AccordionHeader>
            ),
            children: (
                <KanbanUsersForm
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
                <>
                    <KanbanChecklistHeader checklist={checklist} />
                    <KanbanCheckListForm
                        isLoading={isLoading}
                        initialValues={{ checklist }}
                    />
                </>
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
                //TODO: modalProps.onCancel expect an event so, I used close. Actually both of them are same.
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
                <KanbanTitleForm
                    initialValues={{ title }}
                    isLoading={isLoading}
                />
            }
            width={586}
            footer={<KanbanModalFooter />}
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
                <KanbanCommentForm />
                <KanbanCommentList />
            </div>
        </Modal>
    );
};
