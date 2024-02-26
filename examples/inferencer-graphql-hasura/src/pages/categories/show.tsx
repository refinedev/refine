import { IResourceComponentsProps } from "@refinedev/core";
import { AntdShowInferencer } from "@refinedev/inferencer/antd";

import { inferencerPredefinedMeta } from "../../inferencerPredefinedMeta";

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
  return <AntdShowInferencer meta={inferencerPredefinedMeta} />;
};
