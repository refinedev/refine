import { useForm } from "@refinedev/antd";
import { Form, Skeleton } from "antd";

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
    isLoading?: boolean;
};

export const KanbanTitleForm = ({ initialValues, isLoading }: Props) => {
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

    if (isLoading) {
        return (
            <Skeleton.Input
                size="small"
                style={{ width: "95%", height: "22px" }}
                block
            />
        );
    }

    return (
        <Form {...formProps} initialValues={initialValues}>
            <Form.Item noStyle name="title">
                <KanbanTitleInput />
            </Form.Item>
        </Form>
    );
};
