import React, { Dispatch, SetStateAction } from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form, FormInstance, FormProps } from "antd";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";

import {
    useMutationMode,
    useOne,
    useUpdate,
    useWarnAboutChange,
    useRedirectionAfterSubmission,
} from "@hooks";
import { UseUpdateReturnType } from "../../data/useUpdate";

import {
    MutationMode,
    FormSF,
    BaseRecord,
    ResourceRouterParams,
    RedirectionTypes,
    GetOneResponse,
    UseFormSFFormProps,
    UpdateResponse,
    IResourceItem,
} from "../../../interfaces";

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useEditForm<T, M> = {
    form: FormInstance;
    formProps: UseFormSFFormProps & FormProps;
    editId?: string | number;
    setEditId?: Dispatch<SetStateAction<string | number | undefined>>;
    saveButtonProps: SaveButtonProps;
    queryResult: QueryObserverResult<GetOneResponse<T>>;
    mutationResult: UseUpdateReturnType<M>;
    formLoading: boolean;
    setCloneId?: Dispatch<SetStateAction<string | number | undefined>>;
    cloneId?: string | number;
};

export type useEditFormProps<M> = {
    onMutationSuccess?: (
        data: UpdateResponse<M>,
        variables: any,
        context: any,
    ) => void;
    onMutationError?: (error: any, variables: any, context: any) => void;
    mutationMode?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
    undoableTimeout?: number;
    resource: IResourceItem;
};

export const useEditForm = <
    RecordType = BaseRecord,
    MutationType extends BaseRecord = RecordType
>({
    onMutationSuccess,
    onMutationError,
    mutationMode: mutationModeProp,
    submitOnEnter = false,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "list",
    undoableTimeout,
    resource,
}: useEditFormProps<MutationType>): useEditForm<RecordType, MutationType> => {
    const [editId, setEditId] = React.useState<string | number>();

    const [formAnt] = Form.useForm();
    const formSF: FormSF = useFormSF({
        form: formAnt,
    });

    const { form } = formSF;

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContext,
        setWarnWhen,
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContext;

    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const { id: idFromRoute, action } = useParams<ResourceRouterParams>();
    const isEdit = !!editId || action === "edit";

    const id = editId?.toString() ?? idFromRoute;

    const queryResult = useOne<RecordType>(resource.name, id, {
        enabled: isEdit,
    });

    const { data, isFetching } = queryResult;

    React.useEffect(() => {
        form.setFieldsValue({
            ...data?.data,
        });
        return () => {
            form.resetFields();
        };
    }, [data, id, isFetching]);

    const mutationResult = useUpdate<MutationType>(
        resource.name,
        mutationMode,
        undoableTimeout,
    );

    const { mutate, isLoading: isLoadingMutation } = mutationResult;

    const formLoading = isFetching || isLoadingMutation;

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinish = async (values: BaseRecord) => {
        setWarnWhen(false);

        // Required to make onSuccess vs callbacks to work if component unmounts i.e. on route change
        setTimeout(() => {
            mutate(
                { id, values },
                {
                    onSuccess: (data, ...rest) => {
                        if (onMutationSuccess) {
                            return onMutationSuccess(data, ...rest);
                        }

                        if (mutationMode === "pessimistic") {
                            setEditId(undefined);
                            handleSubmitWithRedirect({
                                redirect,
                                resource,
                                id: idFromRoute,
                            });
                        }
                    },
                    onError: (error: any, ...rest) => {
                        if (onMutationError) {
                            return onMutationError(error, ...rest);
                        }
                    },
                },
            );
        });

        if (!(mutationMode === "pessimistic")) {
            setEditId(undefined);
            handleSubmitWithRedirect({
                redirect,
                resource,
                id: idFromRoute,
            });
        }
    };

    const onKeyUp = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (submitOnEnter && event.key === "Enter") {
            form.submit();
        }
    };

    const onValuesChange = (changeValues: object) => {
        if (changeValues && warnWhenUnsavedChanges) {
            setWarnWhen(true);
        }
        return changeValues;
    };

    const saveButtonProps: SaveButtonProps = {
        disabled: formLoading,
        onClick: () => {
            form.submit();
        },
        loading: formLoading,
    };

    return {
        ...formSF,
        formProps: {
            ...formSF.formProps,
            onFinish,
            onKeyUp,
            onValuesChange,
        },
        editId,
        setEditId,
        saveButtonProps,
        queryResult,
        mutationResult,
        formLoading,
    };
};
