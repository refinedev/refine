import React, { Dispatch, SetStateAction } from "react";
import { useForm as useFormSF } from "sunflower-antd";
import {} from "sunflower-antd/es/";
import { Form, FormInstance, FormProps } from "antd";
import { useParams } from "react-router-dom";
import { QueryObserverResult } from "react-query";

import {
    useMutationMode,
    useResourceWithRoute,
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
} from "../../../interfaces";

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useEditForm<T> = {
    form: FormInstance;
    formProps: UseFormSFFormProps & FormProps;
    editId?: string | number;
    setEditId?: Dispatch<SetStateAction<string | number | undefined>>;
    saveButtonProps: SaveButtonProps;
    queryResult: QueryObserverResult<GetOneResponse<T>>;
    mutationResult: UseUpdateReturnType<T>;
    formLoading: boolean;
    setCloneId?: Dispatch<SetStateAction<string | number | undefined>>;
    cloneId?: string | number;
};

export type useEditFormProps<T> = {
    onMutationSuccess?: (data: T) => void;
    onMutationError?: (error: any) => void;
    mutationMode?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
    undoableTimeout?: number;
};

export const useEditForm = <RecordType = BaseRecord>({
    onMutationSuccess,
    onMutationError,
    mutationMode: mutationModeProp,
    submitOnEnter = true,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "list",
    undoableTimeout,
}: useEditFormProps<RecordType>): useEditForm<RecordType> => {
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

    const {
        resource: routeResourceName,
        id: idFromRoute,
        action,
    } = useParams<ResourceRouterParams>();
    const isEdit = !!editId || action === "edit";

    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(routeResourceName);

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

    const mutationResult = useUpdate<RecordType>(
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
                    onSuccess: ({ data }) => {
                        if (onMutationSuccess) {
                            return onMutationSuccess(data);
                        }

                        if (mutationMode === "pessimistic") {
                            setEditId(undefined);
                            handleSubmitWithRedirect({
                                redirect,
                                resource,
                                idFromRoute,
                            });
                        }
                    },
                    onError: (error: any) => {
                        if (onMutationError) {
                            return onMutationError(error);
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
                idFromRoute,
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
