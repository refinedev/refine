import { IResourceComponentsProps } from "@refinedev/core";
import { AntdShowInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const BlogPostShow: React.FC<IResourceComponentsProps> = () => {
  return <AntdShowInferencer meta={inferencerPredefinedMeta} />;
};
