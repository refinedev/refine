import gql from "graphl-tag";

export const POSTS_QUERY = gql`
    query GetBlogPosts(
        $offset: Int!
        $limit: Int!
        $where: blog_posts_bool_exp
    ) {
        blog_posts(offset: $offset, limit: $limit, where: $where) {
            id
        }
        blog_posts_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;
