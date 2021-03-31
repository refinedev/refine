import { useParams } from "react-router-dom";

import { useCreateForm, useCreateFormProps } from "./useCreateForm";
import { useEditForm, useEditFormProps } from "./useEditForm";
import { useCloneForm, useCloneFormProps } from "./useCloneForm";

import { ResourceRouterParams } from "../../interfaces";

export type ActionParams = {
    action?: "show" | "edit" | "create";
};

export type useEditFormType = typeof useEditForm;
export type useCreateFormType = typeof useCreateForm;
export type useCloneFormType = typeof useCloneForm;

export type useEditFormReturn = ReturnType<useEditFormType>;
export type useCreateFormReturn = ReturnType<useCreateFormType>;
export type useCloneFormTypeReturn = ReturnType<useCloneFormType>;

export type useFormProps = (
    props: ActionParams &
        (useCreateFormProps | useEditFormProps | useCloneFormProps),
) => Partial<useEditFormReturn & useCreateFormReturn & useCloneFormTypeReturn>;

export const useForm: useFormProps = (props) => {
    const { action: actionFromProp } = props;
    const editForm = useEditForm(props as useEditFormProps);

    const createForm = useCreateForm(props as useCreateFormProps);

    const cloneForm = useCloneForm(props as useCloneFormProps);

    const { action: actionFromRoute, id } = useParams<ResourceRouterParams>();

    switch (actionFromProp || actionFromRoute) {
        case "create":
            return id ? cloneForm : createForm;
        case "edit":
            return editForm;
        default:
            return createForm;
    }
};
