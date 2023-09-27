import { Edit, useSelect } from "@refinedev/antd";

import {
    Drawer,
    DrawerProps,
    Form,
    FormProps,
    Input,
    ButtonProps,
    Grid,
    Select,
} from "antd";
import { IClient } from "interfaces";

type EditClientProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    currentClient: IClient;
    saveButtonProps: ButtonProps;
};

export const EditClient: React.FC<EditClientProps> = ({
    drawerProps,
    formProps,
    currentClient,
    saveButtonProps,
}) => {
    const breakpoint = Grid.useBreakpoint();

    const { selectProps } = useSelect({
        resource: "contacts",
        optionLabel: "first_name",
        optionValue: "id",
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            bodyStyle={{ padding: 0 }}
        >
            <Edit
                saveButtonProps={saveButtonProps}
                title={
                    <h3
                        style={{
                            fontSize: "20px",
                            padding: "0 24px",
                            fontWeight: "bold",
                        }}
                    >
                        Edit Client
                    </h3>
                }
            >
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                        ...formProps.initialValues,
                    }}
                >
                    <Form.Item
                        label="Client Company Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Select Contact"
                        name={["first_name", "id"]}
                    >
                        <Select
                            {...selectProps}
                            mode="multiple"
                            defaultValue={
                                currentClient?.contacts?.map(
                                    (contact) => contact?.first_name,
                                ) as any
                            }
                        />
                    </Form.Item>
                </Form>
            </Edit>
        </Drawer>
    );
};
