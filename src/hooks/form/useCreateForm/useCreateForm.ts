import React, { useState } from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form } from "antd";
import { useHistory, useParams } from "react-router-dom";

import {
    useResourceWithRoute,
    useCreate,
    useNotification,
    useWarnAboutChange,
} from "@hooks";

import { BaseRecord, ResourceRouterParams } from "@interfaces";
import { MutationMode } from "../../../interfaces";

export type useCreateFormProps = {
    onMutationSuccess?: (data: any, variables: any, context: any) => void;
    onMutationError?: (error: any, variables: any, context: any) => void;
    mutationModeProp?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
};
export const useCreateForm = ({
    onMutationSuccess,
    onMutationError,
    submitOnEnter = true,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
}: useCreateFormProps) => {
    const [isFormChanged, setIsFormChanged] = useState(false);

    const [formAnt] = Form.useForm();
    const formSF = useFormSF({
        form: formAnt,
    });

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContext,
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContext;

    const history = useHistory();

    const { form } = formSF;

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const { mutate, isLoading } = useCreate(resource.name);

    const notification = useNotification();

    const onFinish = async (values: BaseRecord): Promise<void> => {
        mutate(
            { values },
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

                    if (resource.canEdit) {
                        return history.push(
                            `/resources/${resource.route}/edit/${data.data.id}`,
                        );
                    }

                    return history.push(`/resources/${resource.route}`);
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
        if (changeValues) {
            setIsFormChanged(true);
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
        isFormChanged,
        createProps: {
            saveButtonProps,
            warnWhen: warnWhenUnsavedChanges ? isFormChanged : false,
        },
    };
};
