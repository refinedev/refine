import React from "react";
import { useInfinityGetList } from "@pankod/refine-core";

import { IProduct } from "interfaces";

export const PostList: React.FC = () => {
    const {
        data,
        error,
        hasNextPage,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfinityGetList<IProduct>({
        resource: "products",
    });

    if (isLoading) {
        return <p>Loading</p>;
    }
    if (error) {
        return <p>ERROR</p>;
    }

    return (
        <div>
            {data?.pages.map((page) =>
                page.data.map((product) => (
                    <li key={product.id}>
                        {product.id}-{product.name}
                    </li>
                )),
            )}

            <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"}
            </button>
        </div>
    );
};
