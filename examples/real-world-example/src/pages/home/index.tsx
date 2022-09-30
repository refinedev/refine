import { useEffect, useState } from "react";
import {
    useGetIdentity,
    useList,
    useTable,
    useUpdate,
    useDelete,
} from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { ArticleList } from "components/article";

import dayjs from "dayjs";
import { IArticle, ITag } from "interfaces";
import { Tag } from "components/tag";
import { Banner } from "components/home";
import { Pagination } from "components/Pagination";

const { Link } = routerProvider;

export const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"global" | "yourFeed" | "tags">(
        "global",
    );

    const { isSuccess: isLoggedIn, isLoading: isFetching } = useGetIdentity();
    const { mutate: updateMutation, isLoading: updateMutationIsLoading } =
        useUpdate();
    const { mutate: deleteMutation, isLoading: deleteMutationIsLoading } =
        useDelete();

    const tagList = useList<ITag[]>({
        resource: "tags",
    });

    const {
        tableQueryResult,
        current,
        setCurrent,
        filters,
        setFilters,
        pageCount,
    } = useTable<IArticle>({
        resource: activeTab === "yourFeed" ? "articles/feed" : "articles",
        metaData: {
            resource: "articles",
        },
        initialCurrent: 1,
        initialPageSize: 6,
    });

    const favoriteUnFavoriteIslLoading =
        tableQueryResult.isFetching ||
        updateMutationIsLoading ||
        deleteMutationIsLoading;

    const favArticle = (slug: string) => {
        updateMutation({
            resource: "articles",
            id: slug,
            metaData: {
                URLSuffix: "favorite",
            },
            values: {},
        });
    };

    const unFavArticle = (slug: string) => {
        deleteMutation({
            resource: "articles",
            id: slug,
            metaData: {
                URLSuffix: "favorite",
            },
        });
    };

    useEffect(() => {
        if (isLoggedIn) {
            setActiveTab("yourFeed");
        }
    }, [isLoggedIn]);

    useEffect(() => {
        setCurrent(1);
    }, [activeTab]);

    if (isFetching) {
        return null;
    }

    return (
        <div className="home-page">
            {!isLoggedIn && !isFetching && <Banner />}
            <div className="page container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {isLoggedIn && (
                                    <li className="nav-item">
                                        <Link
                                            to={"/"}
                                            className={`nav-link ${
                                                activeTab === "yourFeed"
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                setActiveTab("yourFeed");
                                                setFilters([
                                                    {
                                                        field: "tag",
                                                        operator: "eq",
                                                        value: undefined,
                                                    },
                                                ]);
                                            }}
                                        >
                                            Your Feed
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link
                                        to={"/"}
                                        className={`nav-link ${
                                            activeTab === "global"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            setActiveTab("global");
                                            setFilters([
                                                {
                                                    field: "tag",
                                                    operator: "eq",
                                                    value: undefined,
                                                },
                                            ]);
                                        }}
                                    >
                                        Global Feed
                                    </Link>
                                </li>
                                {filters.map((filter, index) => {
                                    return (
                                        <li className="nav-item" key={index}>
                                            <Link
                                                to="/"
                                                className={`nav-link ${
                                                    activeTab === "tags"
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                # {filter.value}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {tableQueryResult.isLoading && (
                            <div className="article-preview">
                                Loading articles...
                            </div>
                        )}

                        {!tableQueryResult.data?.data?.length &&
                            !tableQueryResult.isFetching && (
                                <div className="article-preview">
                                    No articles are here... yet
                                </div>
                            )}

                        {tableQueryResult?.data?.data.map((item) => {
                            return (
                                <ArticleList
                                    key={item.slug}
                                    slug={item.slug}
                                    author={item.author.username}
                                    image={item.author.image}
                                    title={item.title}
                                    createdAt={dayjs(item.createdAt).format(
                                        "MMM DD, YYYY",
                                    )}
                                    favCount={item.favoritesCount}
                                    description={item.description}
                                    tagList={item.tagList}
                                    favArticle={(slug: string) => {
                                        item.favorited
                                            ? unFavArticle(slug)
                                            : favArticle(slug);
                                    }}
                                    isItemFavorited={item.favorited}
                                    isItemLoading={favoriteUnFavoriteIslLoading}
                                />
                            );
                        })}
                    </div>
                    <Tag
                        tags={tagList.data?.data}
                        setFilter={setFilters}
                        onTagClick={() => {
                            setActiveTab("tags");
                        }}
                    />
                </div>
                <Pagination
                    current={current}
                    setCurrent={setCurrent}
                    total={pageCount}
                />
            </div>
        </div>
    );
};
