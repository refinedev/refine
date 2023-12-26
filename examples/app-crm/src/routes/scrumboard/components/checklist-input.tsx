import { Checkbox, Input } from "antd";

import { CheckListItem } from "@/graphql/schema.types";

type Props = {
    value?: CheckListItem;
    onChange?: (value: CheckListItem) => void;
};

export const CheckListInput = ({
    value = {
        title: "",
        checked: false,
    },
    onChange,
}: Props) => {
    const triggerChange = (changedValue: {
        title?: string;
        checked?: boolean;
    }) => {
        onChange?.({ ...value, ...changedValue });
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;

        triggerChange({ title: newTitle });
    };

    return (
        <div
            style={{
                display: "flex",
                flex: 1,
            }}
        >
            <Checkbox
                checked={value?.checked}
                onChange={(e) => {
                    const newChecked = e.target.checked;

                    triggerChange({ checked: newChecked });
                }}
            />
            <Input
                bordered={false}
                value={value?.title}
                onChange={onTitleChange}
                placeholder="Please enter item title"
                style={{
                    backgroundColor: "#fff",
                    textDecoration: value.checked ? "line-through" : "none",
                }}
            />
        </div>
    );
};
