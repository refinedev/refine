import type * as Types from "./schema.types";

export type GetPostQueryVariables = Types.Exact<{
    id: Types.Scalars["uuid"]["input"];
}>;

export type GetPostQuery = {
    posts_by_pk?: Types.Maybe<
        Pick<Types.Posts, "id" | "title" | "content"> & {
            category?: Types.Maybe<Pick<Types.Categories, "title">>;
        }
    >;
};
