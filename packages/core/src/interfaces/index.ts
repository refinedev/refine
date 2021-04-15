// reducers
export * from "./reducers/auth/user";
export * from "./reducers/resource/resource";

// redux state
export * from "./istate";

// contexts
export * from "../contexts/data/IDataContext";
export * from "../contexts/auth/IAuthContext";
export * from "../contexts/translation/ITranslationContext";
export * from "../contexts/components/IComponentsContext";
export * from "../contexts/notification/INotificationContext";
export * from "../contexts/resource/IResourceContext";

// buttons
export { CreateButtonProps } from "../components/buttons/create/index";

export * from "../components/pages/login";

// field
export * from "./field";

// notification
export * from "./notification";

// match
export * from "./match";

// mutationMode
export * from "./mutationMode";

// resourceRouterParams
export * from "./resourceRouterParams";

// redirection
export * from "./redirectionTypes";

// sunflower forms
export * from "./form";

export type Identifier = string | number;

export type BaseRecord = {
    id?: Identifier;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};
export interface Option {
    label: string;
    value: string;
}
