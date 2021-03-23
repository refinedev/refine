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
    BaseRecord,
    ResourceRouterParams,
    RedirectionTypes,
} from "@interfaces";
import { MutationMode } from "../../../interfaces";

type SaveButtonProps = {
    disabled: boolean;
    onClick: () => void;
    loading?: boolean;
};

export type useEditFormProps = {
    onMutationSuccess?: (data: any, variables: any, context: any) => void;
    onMutationError?: (error: any, variables: any, context: any) => void;
    mutationModeProp?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
};
export const useEditForm = ({
    onMutationSuccess,
    onMutationError,
    mutationModeProp,
    submitOnEnter = true,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "list",
}: useEditFormProps) => {
    const [editId, setEditId] = React.useState<string | number>();

    const [formAnt] = Form.useForm();
    const formSF = useFormSF({
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

    const resource = useResourceWithRoute(routeResourceName);

    const id = editId?.toString() ?? idFromRoute;

    const { data, isLoading } = useOne(resource.name, id, {
        enabled: isEdit,
    });

    React.useEffect(() => {
        form.setFieldsValue({
            ...data?.data,
        });
        return () => {
            form.resetFields();
        };
    }, [data, id]);

    const {
        mutate,
        isLoading: isLoadingMutation,
        isSuccess: isSuccessMutation,
        reset: resetMutation,
    } = useUpdate(resource.name, mutationMode);
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

                        notification.success({
                            message: "Successful",
                            description: `Id:${id} ${resource.name} edited`,
                        });

                        if (mutationMode === "pessimistic") {
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

                        if (error !== "mutation cancelled") {
                            notification.error({
                                message: `There was an error updating it ${resource.name}!`,
                                description: error.message,
                            });
                        }
                    },
                },
            );
        });

        setEditId(undefined);
        !(mutationMode === "pessimistic") &&
            handleSubmitWithRedirect({
                redirect,
                resource,
                idFromRoute,
            });
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
        disabled: isLoading,
        onClick: () => {
            form.submit();
        },
        loading: isLoadingMutation,
    };

    return {
        ...formSF,
        formProps: {
            ...formSF.formProps,
            onFinish,
            onKeyUp,
            onValuesChange,
        },
        isLoading,
        editId,
        setEditId,
        saveButtonProps,
        isLoadingMutation,
        isSuccessMutation,
        resetMutation,
    };
};
