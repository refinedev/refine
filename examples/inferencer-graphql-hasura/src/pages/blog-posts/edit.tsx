import { IResourceComponentsProps } from "@refinedev/core";
import { AntdEditInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const BlogPostEdit: React.FC<IResourceComponentsProps> = () => {
  return <AntdEditInferencer meta={inferencerPredefinedMeta} />;
};
