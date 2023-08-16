import { Checkbox, Input, Space } from "antd";

import { CheckListItem } from "../interfaces/graphql";

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
        <Space direction="horizontal" size={0}>
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
                style={{ backgroundColor: "#fff" }}
            />
        </Space>
    );
};
