import { useParams } from "react-router-dom";

import { useCreateForm, useCreateFormProps } from "./useCreateForm";
import { useEditForm, useEditFormProps } from "./useEditForm";

import { ResourceRouterParams } from "@interfaces";

type useFormProps = useCreateFormProps | useEditFormProps;

export const useForm = (props: useFormProps): any => {
    const editForm = useEditForm(props as useEditFormProps);

    const createForm = useCreateForm(props as useCreateFormProps);

    const { action } = useParams<ResourceRouterParams>();

    switch (action) {
        case "create":
            return createForm;
        case "edit":
            return editForm;
        default:
            return {};
    }
};
