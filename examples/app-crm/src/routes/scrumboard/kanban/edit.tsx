import { useNavigate } from "react-router-dom";
import { useGetToPath } from "@refinedev/core";
import { useModalForm } from "@refinedev/antd";
import { Collapse, CollapseProps, Modal } from "antd";
import { KanbanStageForm } from "../../../components/kanban-stage-form";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const panelStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: 0,
};

const items: CollapseProps["items"] = [
    {
        key: "1",
        label: "This is panel header 1",
        children: <p>{text}</p>,
        style: panelStyle,
    },
    {
        key: "2",
        label: "This is panel header 2",
        children: <p>{text}</p>,
        style: panelStyle,
    },
    {
        key: "3",
        label: "This is panel header 3",
        children: <p>{text}</p>,
        style: panelStyle,
    },
];

export const KanbanEditPage = () => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const { modalProps, close, queryResult } = useModalForm({
        action: "edit",
        defaultVisible: true,
        meta: {
            fields: ["title"],
        },
    });

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
        >
            <KanbanStageForm />
            <Collapse
                accordion
                items={items}
                style={{ border: "none", borderRadius: 0 }}
            />
        </Modal>
    );
};
