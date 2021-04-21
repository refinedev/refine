import React, { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";

import { useCreateForm, useCreateFormProps } from "./useCreateForm";
import { useEditForm, useEditFormProps } from "./useEditForm";
import { useCloneForm, useCloneFormProps } from "./useCloneForm";

import { FormInstance, FormProps } from "@components/antd";
import {
    BaseRecord,
    GetOneResponse,
    ResourceRouterParams,
    UseFormSFFormProps,
} from "../../interfaces";
import { UseUpdateReturnType } from "../data/useUpdate";
import { UseCreateReturnType } from "../data/useCreate";

export type ActionParams = {
    action?: "show" | "edit" | "create";
};

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

// export type useEditFormReturn<T> = useEditForm<T>;
// export type useCreateFormReturn<T> = useCreateForm<T>;
// export type useCloneFormTypeReturn<T> = useCloneForm<T>;

export type useFormProps<T> = ActionParams &
    (useCreateFormProps<T> | useEditFormProps<T> | useCloneFormProps<T>);

export type useForm<T> = {
    form: FormInstance;
    formProps: UseFormSFFormProps & FormProps;
    editId?: string | number;
    setEditId?: Dispatch<SetStateAction<string | number | undefined>>;
    saveButtonProps: SaveButtonProps;
    queryResult?: QueryObserverResult<GetOneResponse<T>>;
    mutationResult: UseUpdateReturnType<T> | UseCreateReturnType<T>;
    formLoading: boolean;
    setCloneId?: Dispatch<SetStateAction<string | number | undefined>>;
    cloneId?: string | number;
};

export const useForm = <RecordType = BaseRecord>({
    action,
    ...rest
}: useFormProps<RecordType>): useForm<RecordType> => {
    // id state is needed to determine selected record in addition to id parameter from route
    // this could be moved to a custom hook that encapsulates both create and clone form hooks.
    const [cloneId, setCloneId] = React.useState<string | number>();

    const editForm = useEditForm<RecordType>(
        rest as useEditFormProps<RecordType>,
    );

    const createForm = useCreateForm<RecordType>(
        rest as useCreateFormProps<RecordType>,
    );

    const cloneForm = useCloneForm<RecordType>({
        ...rest,
        cloneId,
    } as useCloneFormProps<RecordType>);

    const { action: actionFromRoute, id } = useParams<ResourceRouterParams>();

    switch (action || actionFromRoute) {
        case "create":
            // setCloneId and cloneId needs to be returned from both clone and create cases.
            // It is needed to make them accessible in useModalForm to be able to manage id state.

            // clone case
            if (cloneId || id) {
                return { ...cloneForm, setCloneId, cloneId };
            }
            // create case
            return { ...createForm, setCloneId, cloneId };
        case "edit":
            return editForm;
        default:
            return createForm;
    }
};
