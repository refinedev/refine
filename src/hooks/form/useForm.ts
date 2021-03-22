import { useParams } from "react-router-dom";

import { useCreateForm, useCreateFormProps } from "./useCreateForm";
import { useEditForm, useEditFormProps } from "./useEditForm";

import { ResourceRouterParams } from "@interfaces";

type ActionParams = {
    action?: "show" | "edit" | "create";
};

type useFormProps = (
    props: ActionParams & (useCreateFormProps | useEditFormProps),
) => Partial<ReturnType<typeof useEditForm> & ReturnType<typeof useCreateForm>>;

export const useForm: useFormProps = (props) => {
    const { action: actionFromProp } = props;
    const editForm = useEditForm(props as useEditFormProps);

    const createForm = useCreateForm(props as useCreateFormProps);

    const { action: actionFromRoute } = useParams<ResourceRouterParams>();

    switch (actionFromProp || actionFromRoute) {
        case "create":
            return createForm;
        case "edit":
            return editForm;
        default:
            return createForm;
    }
};
