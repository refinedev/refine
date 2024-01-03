import type * as Types from "./schema.types";

export type GetBlogPostsQueryVariables = Types.Exact<{
    offset: Types.Scalars["Int"]["input"];
    limit: Types.Scalars["Int"]["input"];
    where?: Types.InputMaybe<Types.Blog_Posts_Bool_Exp>;
}>;

export type GetBlogPostsQuery = {
    blog_posts: Array<Pick<Types.Blog_Posts, "id">>;
    blog_posts_aggregate: {
        aggregate?: Types.Maybe<
            Pick<Types.Blog_Posts_Aggregate_Fields, "count">
        >;
    };
};
