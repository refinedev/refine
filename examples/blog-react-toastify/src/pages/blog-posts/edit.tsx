import { IResourceComponentsProps } from "@refinedev/core";
import { HeadlessEditInferencer } from "@refinedev/inferencer/headless";

export const BlogPostEdit: React.FC<IResourceComponentsProps> = () => {
  return <HeadlessEditInferencer />;
};
