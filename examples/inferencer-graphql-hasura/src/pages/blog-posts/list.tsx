import { IResourceComponentsProps } from "@refinedev/core";
import { AntdListInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  return <AntdListInferencer meta={inferencerPredefinedMeta} />;
};
