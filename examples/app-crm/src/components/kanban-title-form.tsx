import { useForm } from "@refinedev/antd";
import { Form } from "antd";

import { Text } from "../components/text";
import { Task } from "../interfaces/graphql";

const KanbanTitleInput = ({
    value,
    onChange,
}: {
    value?: string;
    onChange?: (value: string) => void;
}) => {
    const onTitleChange = (newTitle: string) => {
        onChange?.(newTitle);
    };

    return (
        <Text
            editable={{
                onChange: onTitleChange,
            }}
            style={{ width: "98%" }}
        >
            {value}
        </Text>
    );
};

type Props = {
    initialValues: {
        title?: Task["title"];
    };
};

export const KanbanTitleForm = ({ initialValues }: Props) => {
    const { formProps } = useForm({
        queryOptions: {
            enabled: false,
        },
        redirect: false,
        warnWhenUnsavedChanges: false,
        autoSave: {
            enabled: true,
            debounce: 0,
        },
    });

    return (
        <Form {...formProps} initialValues={initialValues}>
            <Form.Item noStyle name="title">
                <KanbanTitleInput />
            </Form.Item>
        </Form>
    );
};
