import React from "react";
import { useForm as useFormSF } from "sunflower-antd";
import { Form } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { useResourceWithRoute, useCreate, useNotification } from "@hooks";

import { BaseRecord, ResourceRouterParams } from "@interfaces";
import { MutationMode } from "../../interfaces";

export type useCreateFormProps = {
    onMutationSuccess?: (data: any) => void; // mutation onSuccess'i ne alıyosa onları almalı
    onMutationError?: (error: any) => void; // onSuccess ile aynı şekilde
    mutationModeProp?: MutationMode;
    canEdit?: boolean;
    submitOnEnter?: boolean;
};
export const useCreateForm = ({
    onMutationSuccess,
    onMutationError,
    canEdit,
    submitOnEnter = true,
}: useCreateFormProps) => {
    const [formAnt] = Form.useForm();
    const formSF = useFormSF({
        form: formAnt,
    });

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
                onSuccess: (data) => {
                    if (onMutationSuccess) {
                        onMutationSuccess(data);
                        return;
                    }

                    notification.success({
                        message: "Successful",
                        description: `New ${resource.name} created!`,
                    });

                    if (canEdit) {
                        return history.push(
                            `/resources/${resource.route}/edit/${data.data.id}`,
                        );
                    }

                    return history.push(`/resources/${resource.route}`);
                },
                onError: (error: any) => {
                    if (onMutationError) {
                        onMutationError(error);
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
        console.log("usecreaform onkeyup event: ", event);
        if (submitOnEnter && event.key === "Enter") {
            form.submit();
        }
    };

    return {
        ...formSF,
        formProps: {
            ...formSF.formProps,
            onFinish,
            onKeyUp,
        },
        isLoading,
    };
};
