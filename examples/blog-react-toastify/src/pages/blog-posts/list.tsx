import { IResourceComponentsProps } from "@refinedev/core";
import { HeadlessListInferencer } from "@refinedev/inferencer/headless";

export const BlogPostList: React.FC<IResourceComponentsProps> = () => {
  return <HeadlessListInferencer />;
};
