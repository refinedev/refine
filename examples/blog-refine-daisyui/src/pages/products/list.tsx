import { IResourceComponentsProps } from "@refinedev/core";
import { HeadlessListInferencer } from "@refinedev/inferencer/headless";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    return <HeadlessListInferencer />;
};
