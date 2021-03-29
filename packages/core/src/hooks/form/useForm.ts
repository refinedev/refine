import { useParams } from "react-router-dom";

import { useCreateForm, useCreateFormProps } from "./useCreateForm";
import { useEditForm, useEditFormProps } from "./useEditForm";

import { ResourceRouterParams } from "../../interfaces";

export type ActionParams = {
    action?: "show" | "edit" | "create";
};

export type useEditFormType = typeof useEditForm;
export type useCreateFormType = typeof useCreateForm;

export type useEditFormReturn = ReturnType<useEditFormType>;
export type useCreateFormReturn = ReturnType<useCreateFormType>;

export type useFormProps = (
    props: ActionParams & (useCreateFormProps | useEditFormProps),
) => Partial<useEditFormReturn & useCreateFormReturn>;

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
