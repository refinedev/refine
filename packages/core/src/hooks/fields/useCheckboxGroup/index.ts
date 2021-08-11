import React from "react";
import { CheckboxGroupProps } from "antd/lib/checkbox";
import { QueryObserverResult } from "react-query";

import { useList } from "@hooks";
import {
    CrudSorting,
    Option,
    BaseRecord,
    GetListResponse,
    CrudFilters,
    SuccessErrorNotification,
} from "../../../interfaces";

export type useCheckboxGroupProps = {
    resource: string;
    optionLabel?: string;
    optionValue?: string;
    sort?: CrudSorting;
    filters?: CrudFilters;
} & SuccessErrorNotification;

export type UseCheckboxGroupReturnType<TData extends BaseRecord = BaseRecord> =
    {
        checkboxGroupProps: CheckboxGroupProps;
        queryResult: QueryObserverResult<GetListResponse<TData>>;
    };

/**
 * `useCheckboxGroup` hook allows you to manage an Ant Design {@link https://ant.design/components/checkbox/#components-checkbox-demo-group Checkbox.Group} component when records in a resource needs to be used as checkbox options.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/field/useCheckboxGroup} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 *
 */
export const useCheckboxGroup = <TData extends BaseRecord = BaseRecord>({
    resource,
    sort,
    filters,
    optionLabel = "title",
    optionValue = "id",
    successNotification,
    errorNotification,
}: useCheckboxGroupProps): UseCheckboxGroupReturnType<TData> => {
    const [options, setOptions] = React.useState<Option[]>([]);

    const queryResult = useList<TData>(
        resource,
        {
            sort,
            filters,
        },
        {
            onSuccess: (data) => {
                setOptions(
                    data.data.map((item) => ({
                        label: item[optionLabel],
                        value: item[optionValue],
                    })),
                );
            },
        },
        successNotification,
        errorNotification,
    );
    return {
        checkboxGroupProps: {
            options,
        },
        queryResult,
    };
};
