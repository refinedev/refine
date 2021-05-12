import React, { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";
import { FormInstance, FormProps } from "antd";

import { useResourceWithRoute } from "@hooks";

import { useCreateForm, useCreateFormProps } from "./useCreateForm";
import { useEditForm, useEditFormProps } from "./useEditForm";
import { useCloneForm, useCloneFormProps } from "./useCloneForm";

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

type ActionFormProps<M> = useCreateFormProps<M> &
    useEditFormProps<M> &
    useCloneFormProps<M>;

type ResourcelessActionFormProps<M> = Omit<ActionFormProps<M>, "resource">;

export type useFormProps<M> = ActionParams & {
    resource?: string;
} & ResourcelessActionFormProps<M>;

export type useForm<T, M> = {
    form: FormInstance;
    formProps: UseFormSFFormProps & FormProps;
    editId?: string | number;
    setEditId?: Dispatch<SetStateAction<string | number | undefined>>;
    saveButtonProps: SaveButtonProps;
    queryResult?: QueryObserverResult<GetOneResponse<T>>;
    mutationResult: UseUpdateReturnType<M> | UseCreateReturnType<M>;
    formLoading: boolean;
    setCloneId?: Dispatch<SetStateAction<string | number | undefined>>;
    cloneId?: string | number;
};

export const useForm = <
    RecordType = BaseRecord,
    MutationType extends BaseRecord = RecordType
>({
    action,
    resource: resourceFromProps,
    ...rest
}: useFormProps<MutationType> = {}): useForm<RecordType, MutationType> => {
    // id state is needed to determine selected record in addition to id parameter from route
    // this could be moved to a custom hook that encapsulates both create and clone form hooks.
    const [cloneId, setCloneId] = React.useState<string | number>();

    const resourceWithRoute = useResourceWithRoute();

    const { resource: resourceFromParams } = useParams<ResourceRouterParams>();

    const resourceType = resourceFromProps ?? resourceFromParams;

    const resource = resourceWithRoute(resourceType);

    const editForm = useEditForm<RecordType, MutationType>({
        ...rest,
        resource,
    } as useEditFormProps<MutationType>);

    const createForm = useCreateForm<RecordType, MutationType>({
        ...rest,
        resource,
    } as useCreateFormProps<MutationType>);

    const cloneForm = useCloneForm<RecordType, MutationType>({
        ...rest,
        resource,
        cloneId,
    } as useCloneFormProps<MutationType>);

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
