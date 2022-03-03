import { FormInstance, FormProps, ModalProps } from "./components/antd";

export * from "./hooks";
export * from "./providers";
export * from "./components/antd";
export * from "./components";

export type useModalFormFromSFReturnType<TData, TVariables> = {
    form: FormInstance<TVariables>;
    visible: boolean;
    show: (id?: string) => void;
    close: () => void;
    modalProps: ModalProps;
    formProps: FormProps<TVariables>;
    formLoading: boolean;
    defaultFormValuesLoading: boolean;
    formValues: {};
    initialValues: {};
    formResult: undefined;
    submit: (values?: TVariables) => Promise<TData>;
};

export type useStepsFormFromSFReturnType<TData, TVariables> = {
    current: number;
    gotoStep: (step: number) => void;
    stepsProps: {
        current: number;
        onChange: (currentStep: number) => void;
    };
    formProps: FormProps<TVariables>;
    formLoading: boolean;
    defaultFormValuesLoading: boolean;
    formValues: {};
    initialValues: {};
    formResult: undefined;
    form: FormInstance<TVariables>;
    submit: (values?: TVariables) => Promise<TData>;
};

// antd filterDropDownProps (using for <FilterDropDown> component)
export type { FilterDropdownProps } from "antd/lib/table/interface";
export type { RcFile, UploadFile } from "antd/lib/upload/interface";
export * from "./interfaces";

export {
    getDefaultSortOrder,
    getDefaultFilter,
    mapAntdSorterToCrudSorting,
    mapAntdFilterToCrudFilter,
} from "./definitions/table";
export { getValueFromEvent } from "./definitions/upload";
