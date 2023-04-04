import React from "react";
import cn from "clsx";
import Link from "next/link";
import { useList } from "@refinedev/core";
import { useRouter } from "next/router";
import { ProductCollection } from "@medusajs/medusa";

import { ProductCard } from "@components/product";
import { Container, Skeleton } from "@components/ui";
import ClickOutside from "@lib/click-outside";
import rangeMap from "@lib/range-map";

import { MedusaProduct } from "./product/helpers";

export default function Search({ products }: { products?: MedusaProduct[] }) {
    const [filtersVisible, setFiltersVisible] = React.useState(false);
    const { data: categories } = useList<ProductCollection>({
        resource: "collections",
    });

    const router = useRouter();
    const { handle, q } = router.query;
    // `q` can be included but because categories and designers can't be searched
    // in the same way of products, it's better to ignore the search input if one
    // of those is selected

    const activeCategory = categories?.data?.find(
        (cat: ProductCollection) => cat.handle === handle,
    );
    /*     const activeBrand = brands?.find(
        (b: any) => getSlug(b.node.path) === `brands/${brand}`,
    )?.node; */

    return (
        <Container>
            <div className="mb-20 mt-3 grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="order-1 col-span-8 lg:order-none lg:col-span-2">
                    <div className="relative inline-block w-full">
                        <div className="lg:hidden">
                            <span className="rounded-md shadow-sm">
                                <button
                                    type="button"
                                    onClick={() => setFiltersVisible((p) => !p)}
                                    className="border-accent-3 bg-accent-0 text-accent-4 hover:text-accent-5 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8 flex w-full justify-between rounded-sm border px-4 py-3 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none"
                                    id="options-menu"
                                    aria-haspopup="true"
                                    aria-expanded="true"
                                >
                                    {activeCategory?.title
                                        ? `Category: ${activeCategory?.title}`
                                        : "All Categories"}
                                    <svg
                                        className="-mr-1 ml-2 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </div>
                        <ClickOutside
                            active={filtersVisible}
                            onClick={() => setFiltersVisible(false)}
                        >
                            <div
                                className={`absolute left-0 z-10 mb-10 mt-2 w-full origin-top-left rounded-md shadow-lg lg:relative lg:block lg:shadow-none ${
                                    filtersVisible !== true ? "hidden" : ""
                                }`}
                            >
                                <div className="bg-accent-0 shadow-xs rounded-sm lg:bg-none lg:shadow-none">
                                    <div
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <ul>
                                            <li
                                                className={cn(
                                                    "text-accent-4 hover:bg-accent-1 hover:text-accent-8 focus:bg-accent-1 focus:text-accent-8 block text-sm leading-5 focus:outline-none lg:text-base lg:font-bold lg:tracking-wide lg:no-underline lg:hover:bg-transparent",
                                                    // {
                                                    //     underline:
                                                    //         !activeCategory?.name,
                                                    // },
                                                )}
                                            >
                                                <Link
                                                    href="/search"
                                                    className={
                                                        "block px-4 py-2 lg:mx-4 lg:my-2 lg:inline-block lg:p-0"
                                                    }
                                                >
                                                    All Categories
                                                </Link>
                                            </li>
                                            {categories?.data.map((cat) => (
                                                <li
                                                    key={cat.handle}
                                                    className={cn(
                                                        "text-accent-4 hover:bg-accent-1 hover:text-accent-8 focus:bg-accent-1 focus:text-accent-8 block text-sm leading-5 focus:outline-none lg:hover:bg-transparent",
                                                        {
                                                            underline:
                                                                activeCategory?.id ===
                                                                cat.id,
                                                        },
                                                    )}
                                                >
                                                    <Link
                                                        href={{
                                                            pathname:
                                                                "/search/[handle]",
                                                            query: {
                                                                handle: cat.handle,
                                                            },
                                                        }}
                                                        className={
                                                            "block px-4 py-2 lg:mx-4 lg:my-2 lg:inline-block lg:p-0"
                                                        }
                                                    >
                                                        {cat.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ClickOutside>
                    </div>
                </div>
                {/* Products */}
                <div className="order-3 col-span-8 lg:order-none">
                    {q && ( //|| activeCategory || activeBrand
                        <div className="mb-12 transition duration-75 ease-in">
                            {products ? (
                                <>
                                    <span
                                        className={cn("animated", {
                                            fadeIn: products.length > 0,
                                            hidden: products.length === 0,
                                        })}
                                    >
                                        Showing {products.length} results{" "}
                                        {q && (
                                            <>
                                                for <strong>{` ${q}`}</strong>
                                            </>
                                        )}
                                    </span>
                                    <span
                                        className={cn("animated", {
                                            fadeIn: products.length > 0,
                                        })}
                                    >
                                        {q && products.length === 0 && (
                                            <>
                                                There are no products that match
                                                <strong>{` ${q}`}</strong>
                                            </>
                                        )}
                                    </span>
                                </>
                            ) : q ? (
                                <>
                                    Searching for: <strong>{q}</strong>
                                </>
                            ) : (
                                <>Searching...</>
                            )}
                        </div>
                    )}
                    {products ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <ProductCard
                                    variant="simple"
                                    key={product.id}
                                    className="animated fadeIn"
                                    product={product}
                                    imgProps={{
                                        width: 480,
                                        height: 480,
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {rangeMap(12, (i) => (
                                <Skeleton key={i}>
                                    <div className="h-60 w-60" />
                                </Skeleton>
                            ))}
                        </div>
                    )}{" "}
                </div>
            </div>
        </Container>
    );
}
