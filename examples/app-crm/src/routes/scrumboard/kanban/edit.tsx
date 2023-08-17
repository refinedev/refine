import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { Collapse, CollapseProps, Modal } from "antd";
import {
    AlignLeftOutlined,
    FieldTimeOutlined,
    UsergroupAddOutlined,
    CheckSquareOutlined,
} from "@ant-design/icons";

import { KanbanStageForm } from "../../../components/kanban-stage-form";
import { AccordionHeader } from "../../../components/kanban-accordion-header";
import { KanbanDescriptionForm } from "../../../components/kanban-description-form";
import { KanbanDueDateForm } from "../../../components/kanban-due-date-form";
import { KanbanUsersForm } from "../../../components/kanban-users-form";
import { KanbanCheckListForm } from "../../../components/kanban-checklist-form";
import { KanbanCommentForm } from "../../../components/kanban-comment-form";
import { KanbanCommentList } from "../../../components/kanban-comment-list";
import { KanbanModalFooter } from "../../../components/kanban-modal-footer";

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

    const kanbanStageInitialValues = {
        completed: queryResult?.data?.data.completed ?? false,
        stage: queryResult?.data?.data.stage,
    };

    const descriptionInitialValues = {
        description: queryResult?.data?.data.description,
    };

    const dueDateInitialValues = {
        dueDate: queryResult?.data?.data.dueDate,
    };

    const usersInitialValues = {
        userIds: queryResult?.data?.data.users.map((user) => ({
            label: user.name,
            value: user.id,
        })),
    };

    const checkListInitialValues = {
        checklist: queryResult?.data?.data.checklist,
    };

    const items: CollapseProps["items"] = [
        {
            key: "0",
            label: <KanbanStageForm initialValues={kanbanStageInitialValues} />,
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
                    fallback="Add card description"
                >
                    Description
                </AccordionHeader>
            ),
            children: (
                <KanbanDescriptionForm
                    initialValues={descriptionInitialValues}
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
                    fallback="Add due date"
                >
                    Due date
                </AccordionHeader>
            ),
            children: (
                <KanbanDueDateForm
                    initialValues={dueDateInitialValues}
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
                    fallback="Assign to users"
                >
                    Users
                </AccordionHeader>
            ),
            children: (
                <KanbanUsersForm
                    initialValues={usersInitialValues}
                    cancelForm={() => setActiveKey(undefined)}
                />
            ),
            style: panelStyle,
            showArrow: false,
        },
        {
            key: "4",
            label: (
                <AccordionHeader
                    icon={<CheckSquareOutlined />}
                    isActive={activeKey === "4"}
                    fallback="Add checklist"
                >
                    Checklist
                </AccordionHeader>
            ),
            children: (
                <KanbanCheckListForm initialValues={checkListInitialValues} />
            ),
            style: panelStyle,
            showArrow: false,
        },
    ];

    if (queryResult?.isLoading) {
        //TODO: add skeleton inside the modal
        return <div>Loading</div>;
    }

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
            title={queryResult?.data?.data.title}
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
