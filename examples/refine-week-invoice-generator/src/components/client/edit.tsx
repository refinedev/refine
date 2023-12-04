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
import { IContact } from "../../interfaces";

type EditClientProps = {
    drawerProps: DrawerProps;
    formProps: FormProps;
    saveButtonProps: ButtonProps;
};

export const EditClient: React.FC<EditClientProps> = ({
    drawerProps,
    formProps,
    saveButtonProps,
}) => {
    const breakpoint = Grid.useBreakpoint();

    const { selectProps } = useSelect<IContact>({
        resource: "contacts",
        optionLabel: "first_name",
        pagination: {
            mode: "server",
        },
    });

    return (
        <Drawer
            {...drawerProps}
            width={breakpoint.sm ? "500px" : "100%"}
            styles={{ body: { padding: 0 } }}
        >
            <Edit
                saveButtonProps={saveButtonProps}
                title={
                    <h4 style={{ padding: "0 24px", fontWeight: "bold" }}>
                        Edit Client
                    </h4>
                }
            >
                <Form
                    {...formProps}
                    layout="vertical"
                    initialValues={{
                        isActive: true,
                        ...formProps.initialValues,
                        contacts: formProps.initialValues?.contacts?.map(
                            (c: IContact) => ({
                                label: c.first_name,
                                value: c.id,
                            }),
                        ),
                    }}
                >
                    <Form.Item
                        label="Client Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Select Contacts" name={["contacts"]}>
                        <Select {...selectProps} mode="multiple" />
                    </Form.Item>
                </Form>
            </Edit>
        </Drawer>
    );
};
