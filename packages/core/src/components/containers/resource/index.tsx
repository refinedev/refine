import React, { ReactNode } from "react";
import { IResourceComponents } from "../../../interfaces";

export interface OptionsProps {
    label?: string;
    route?: string;
}

export interface ResourceProps extends IResourceComponents {
    name: string;
    canDelete?: boolean;
    icon?: ReactNode;
    options?: OptionsProps;
}

/**
 * `<Resource>` is the main building block of a **refine** app.
 * A `<Resource>` represents an entity in an endpoint in the API (e.g. {@link https://refine.dev/docs/api-references/components/resource}).
 * It serves as a bridge between the data from the API and the pages in the app, allowing pages to interact with the data from the API.
 *
 * @see {@link https://refine.dev/docs/api-references/components/resource} for more details.
 */
export const Resource: React.FC<ResourceProps> = () => null;
