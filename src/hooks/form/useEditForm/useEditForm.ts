import React from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form } from "antd";
import { useHistory, useParams } from "react-router-dom";

import {
    useMutationMode,
    useResourceWithRoute,
    useOne,
    useUpdate,
    useNotification,
    useWarnAboutChange,
} from "@hooks";

import { BaseRecord, ResourceRouterParams } from "@interfaces";
import { MutationMode } from "../../../interfaces";

export type useEditFormProps = {
    onMutationSuccess?: (data: any, variables: any, context: any) => void;
    onMutationError?: (error: any, variables: any, context: any) => void;
    mutationModeProp?: MutationMode;
    submitOnEnter?: boolean;
    warnWhenUnsavedChanges?: boolean;
    redirect?: "show" | "list" | "edit" | false;
};
export const useEditForm = ({
    onMutationSuccess,
    onMutationError,
    mutationModeProp,
    submitOnEnter = true,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "list",
}: useEditFormProps) => {
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

    const history = useHistory();
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const {
        resource: routeResourceName,
        id: idFromRoute,
        action,
    } = useParams<ResourceRouterParams>();

    const isEdit = action === "edit";

    const resource = useResourceWithRoute(routeResourceName);

    const { data, isLoading } = useOne(resource.name, idFromRoute, {
        enabled: isEdit,
    });

    React.useEffect(() => {
        form.setFieldsValue({
            ...data?.data,
        });
    }, [data]);

    const { mutate } = useUpdate(resource.name, mutationMode);
    const notification = useNotification();

    const onFinish = async (values: BaseRecord): Promise<void> => {
        setWarnWhen(false);
        mutate(
            { id: idFromRoute, values },
            {
                onSuccess: (...args) => {
                    if (onMutationSuccess) {
                        return onMutationSuccess(...args);
                    }

                    notification.success({
                        message: "Successful",
                        description: `Id:${idFromRoute} ${resource.name} edited`,
                    });

                    if (mutationMode === "pessimistic") {
                        if (redirect) {
                            if (resource.canShow && redirect === "show") {
                                return history.push(
                                    `/resources/${resource.route}/show/${idFromRoute}`,
                                );
                            }
                            return history.push(`/resources/${resource.route}`);
                        } else {
                            return;
                        }
                    }
                },
                onError: (error: any, ...rest) => {
                    if (onMutationError) {
                        return onMutationError(error, ...rest);
                    }

                    notification.error({
                        message: `There was an error updating it ${resource.name}!`,
                        description: error.message,
                    });
                },
            },
        );
        if (mutationMode !== "pessimistic") {
            if (redirect) {
                if (resource.canShow && redirect === "show") {
                    return history.push(
                        `/resources/${resource.route}/show/${idFromRoute}`,
                    );
                }
                return history.push(`/resources/${resource.route}`);
            } else {
                return;
            }
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
