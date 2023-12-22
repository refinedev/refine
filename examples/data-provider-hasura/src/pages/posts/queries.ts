import gql from "graphql-tag";

export const GET_POSTS_QUERY = gql`
    query GetPosts(
        $where: posts_bool_exp
        $limit: Int
        $offset: Int
        $order_by: [posts_order_by!]
    ) {
        posts(
            where: $where
            limit: $limit
            offset: $offset
            order_by: $order_by
        ) {
            id
            title
            category {
                title
            }
            content
            category_id
            created_at
        }
        posts_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;

export const GET_POST_QUERY = gql`
    query GetPost($id: uuid!) {
        posts_by_pk(id: $id) {
            id
            title
            category {
                title
            }
            content
        }
    }
`;
