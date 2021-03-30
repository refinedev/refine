import React from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form } from "antd";
import { useParams } from "react-router-dom";

import {
    useResourceWithRoute,
    useCreate,
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
} from "../../../interfaces";

export type useCreateFormProps = {
    onMutationSuccess?: (data: any, variables: any, context: any) => void;
    onMutationError?: (error: any, variables: any, context: any) => void;
    mutationModeProp?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
};
export const useCreateForm = ({
    onMutationSuccess,
    onMutationError,
    submitOnEnter = true,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "edit",
}: useCreateFormProps) => {
    const [formAnt] = Form.useForm();
    const formSF: FormSF = useFormSF({
        form: formAnt,
    });

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContext,
        setWarnWhen,
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContext;

    const { form } = formSF;

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const { mutate, isLoading } = useCreate();

    const notification = useNotification();

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinish = (values: BaseRecord) => {
        setWarnWhen(false);
        mutate(
            { values, resource: resource.name },
            {
                onSuccess: (data, ...rest) => {
                    if (onMutationSuccess) {
                        onMutationSuccess(data, ...rest);
                        return;
                    }

                    notification.success({
                        message: "Successful",
                        description: `New ${resource.name} created!`,
                    });

                    const idFromRoute = data.data.id!;

                    handleSubmitWithRedirect({
                        redirect,
                        resource,
                        idFromRoute,
                    });
                },
                onError: (error: any, ...rest) => {
                    if (onMutationError) {
                        onMutationError(error, ...rest);
                        return;
                    }

                    notification.error({
                        message: `There was an error creating it ${resource.name}!`,
                        description: error.message,
                    });
                },
            },
        );
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

    const saveButtonProps = {
        disabled: isLoading,
        onClick: () => {
            form.submit();
        },
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
        saveButtonProps,
    };
};
