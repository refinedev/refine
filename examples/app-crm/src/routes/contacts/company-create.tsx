import { useNavigate } from "react-router-dom";
import { useGetIdentity, useGetToPath } from "@refinedev/core";
import { useForm, useSelect } from "@refinedev/antd";
import { Button, Form, Input, Modal, Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { Company, User } from "../../interfaces/graphql";
import { SelectOptionWithAvatar } from "../../components/select-option-with-avatar";

export const ContactCompanyCreatePage = () => {
    const navigate = useNavigate();
    const getToPath = useGetToPath();
    const { data: user } = useGetIdentity<User>();
    const { formProps, saveButtonProps, onFinish } = useForm({
        redirect: "list",
    });
    const { selectProps, queryResult } = useSelect<Company>({
        resource: "companies",
        optionLabel: "name",
        meta: {
            fields: ["id", "name", "avatarUrl"],
        },
    });

    return (
        <Modal
            open
            title="Create Company"
            onCancel={() => {
                navigate(
                    getToPath({
                        action: "list",
                    }) ?? "",
                    {
                        replace: true,
                    },
                );
            }}
            okText="Save"
            okButtonProps={{
                ...saveButtonProps,
            }}
            width={560}
        >
            comapny create form
        </Modal>
    );
};
