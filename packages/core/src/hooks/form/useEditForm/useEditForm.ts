import React from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form } from "antd";
import { useParams } from "react-router-dom";

import {
    useMutationMode,
    useResourceWithRoute,
    useOne,
    useUpdate,
    useNotification,
    useWarnAboutChange,
    useRedirectionAfterSubmission,
} from "@hooks";

import {
    MutationMode,
    FormSF,
    BaseRecord,
    ResourceRouterParams,
    RedirectionTypes,
    GetOneResponse,
} from "../../../interfaces";

import { QueryObserverResult } from "react-query";

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useEditFormProps = {
    onMutationSuccess?: (data: any, variables: any, context: any) => void;
    onMutationError?: (error: any, variables: any, context: any) => void;
    mutationMode?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
    undoableTimeout?: number;
};

export const useEditForm = ({
    onMutationSuccess,
    onMutationError,
    mutationMode: mutationModeProp,
    submitOnEnter = true,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "list",
    undoableTimeout,
}: useEditFormProps) => {
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

    const queryResult = useOne(resource.name, id, {
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

    const mutationResult = useUpdate(
        resource.name,
        mutationMode,
        undoableTimeout,
    );

    const { mutate, isLoading: isLoadingMutation } = mutationResult;

    const formLoading = isFetching || isLoadingMutation;

    const notification = useNotification();

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinish = (values: BaseRecord) => {
        setWarnWhen(false);

        // Required to make onSuccess vs callbacks to work if component unmounts i.e. on route change
        setTimeout(() => {
            mutate(
                { id, values },
                {
                    onSuccess: (...args) => {
                        if (onMutationSuccess) {
                            return onMutationSuccess(...args);
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
        queryResult: queryResult as QueryObserverResult<
            GetOneResponse<BaseRecord>
        >,
        mutationResult,
        formLoading,
    };
};
