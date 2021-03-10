import React from "react"
import {useForm as useFormSF} from "sunflower-antd"
import {Form} from "antd"
import { useHistory, useParams } from "react-router-dom";

import {
    useMutationMode,
    useResourceWithRoute,
    useOne,
    useUpdate,
    useTranslate,
    useNotification
} from "@hooks"

import { BaseRecord, ResourceRouterParams } from "@interfaces";
import { MutationMode } from "../../interfaces";

type useFormProps = {
    onMutationSuccess?: () => void; // mutation onSuccess'i ne alıyosa onları almalı
    onMutationError?: () => void; // onSuccess ile aynı şekilde
    mutationModeProp?: MutationMode;
}
export const useForm = ({
    onMutationSuccess,
    onMutationError,
    mutationModeProp
}: useFormProps) => {
    const [formAnt] = Form.useForm()
    const formSF = useFormSF({
        form: formAnt
    })

    const {form} = formSF

    const history = useHistory();
    const { mutationMode: mutationModeContext } = useMutationMode();

    const mutationMode = mutationModeProp ?? mutationModeContext;

    const {
        resource: routeResourceName,
        id: idFromRoute,
        action,
    } = useParams<ResourceRouterParams>();

    const resource = useResourceWithRoute(routeResourceName);

    const { data, isLoading } = useOne(resource.name, idFromRoute);

    React.useEffect(() => {
        form.setFieldsValue({
            ...data?.data,
        });
    }, [data]);

    const { mutate } = useUpdate(resource.name, mutationMode);
    const translate = useTranslate();
    const notification = useNotification();

    const onFinish = async (values: BaseRecord): Promise<void> => {
        mutate(
            { id: idFromRoute, values },
            {
                onSuccess: () => {
                    if (onMutationSuccess) {
                        return onMutationSuccess();
                    }

                    notification.success({
                        message: "Successful",
                        description: `Id:${idFromRoute} ${resource.name} edited`,
                    });

                    if (mutationMode === "pessimistic") {
                        return history.push(`/resources/${resource.route}`);
                    }
                },
                onError: (err: any) => {
                    if (onMutationError) {
                        return onMutationError();
                    }

                    notification.error({
                        message: `There was an error updating it ${resource.name}!`,
                        description: err.message,
                    });
                },
            },
        );
        !(mutationMode === "pessimistic") &&
            history.push(`/resources/${resource.route}`);
    };

    return {
        ...formSF,
        onFinish,
        isLoadingData: isLoading,
    }
}