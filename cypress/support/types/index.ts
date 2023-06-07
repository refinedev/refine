import posts from "../../fixtures/posts.json";
import categories from "../../fixtures/categories.json";

export type IPost = (typeof posts)[number];
export type ICategory = (typeof categories)[number];
