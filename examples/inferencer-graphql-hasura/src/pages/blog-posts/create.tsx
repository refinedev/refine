import { IResourceComponentsProps } from "@refinedev/core";
import { AntdCreateInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {
  return <AntdCreateInferencer meta={inferencerPredefinedMeta} />;
};
