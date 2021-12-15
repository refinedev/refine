import {
    Create,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
} from "@pankod/refine";
import { ICategory } from "interfaces";

import "react-mde/lib/styles/css/react-mde-all.css";

export const CategoriesCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<ICategory>();

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
