import * as React from "react";
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
) => Partial<
    useEditFormReturn &
        useCreateFormReturn &
        useCloneFormTypeReturn & {
            setCloneId: Function;
            cloneId: string | number;
        }
>;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// TODO: use-create-form'dan mutationResult döndüğümüz için tip hatası geldi. buna bakalım
export const useForm: useFormProps = (props) => {
    const { action: actionFromProp } = props;

    // id state is needed to determine selected record in addition to id parameter from route
    // this could be moved to a custom hook that encapsulates both create and clone form hooks.
    const [cloneId, setCloneId] = React.useState<string | number>();

    const editForm = useEditForm(props as useEditFormProps);

    const createForm = useCreateForm(props as useCreateFormProps);

    const cloneForm = useCloneForm({ ...props, cloneId } as useCloneFormProps);

    const { action: actionFromRoute, id } = useParams<ResourceRouterParams>();

    switch (actionFromProp || actionFromRoute) {
        case "create":
            // setCloneId and cloneId needs to be returned from both clone and create cases.
            // It is needed to make them accessible in useModalForm to be able to manage id state.

            // clone case
            if (cloneId || id) {
                return { ...cloneForm, setCloneId, cloneId };
                // create case
            } else {
                return { ...createForm, setCloneId, cloneId };
            }
        case "edit":
            return editForm;
        default:
            return createForm;
    }
};
