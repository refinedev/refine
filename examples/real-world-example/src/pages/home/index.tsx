import { useState } from "react";
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

const { Link } = routerProvider;

export const HomePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"global" | "yourFeed">("global");
    const { isSuccess } = useGetIdentity();
    const { mutate: favoriteMutate, isLoading: favoriteIsLoading } =
        useUpdate();
    const { mutate: unFavoriteMutate, isLoading: unFavoriteIsLoading } =
        useDelete();

    const tagList = useList<ITag[]>({
        resource: "tags",
    });

    const { tableQueryResult, pageSize, setPageSize, current, setCurrent } =
        useTable<IArticle>({
            resource: activeTab === "global" ? "articles" : "articles/feed",
            metaData: {
                resource: "articles",
            },
            initialCurrent: 1,
            initialPageSize: 6,
        });

    const favoriteUnFavoriteIslLoading =
        tableQueryResult.isFetching || favoriteIsLoading || unFavoriteIsLoading;

    const favArticle = (slug: string) => {
        favoriteMutate({
            resource: "articles",
            id: slug,
            metaData: {
                resource: "favorite",
            },
            values: "",
        });
    };

    const unFavArticle = (slug: string) => {
        unFavoriteMutate({
            resource: "articles",
            id: slug,
            metaData: {
                resource: "favorite",
            },
            values: "",
        });
    };

    return (
        <div className="home-page">
            {!isSuccess && (
                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>
            )}
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {isSuccess && (
                                    <li className="nav-item">
                                        <Link
                                            to={"/"}
                                            className={`nav-link ${
                                                activeTab === "yourFeed"
                                                    ? "active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setActiveTab("yourFeed")
                                            }
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
                                        onClick={() => setActiveTab("global")}
                                    >
                                        Global Feed
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {!tableQueryResult.data?.data?.length && (
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

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>
                            <div className="tag-list">
                                {tagList.data?.data.map(
                                    (item, index: number) => {
                                        return (
                                            <Link
                                                key={index}
                                                to="/"
                                                className="tag-pill tag-default"
                                            >
                                                {item}
                                            </Link>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pagination">
                    <span>
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={1}
                            onChange={(e) => {
                                const page = e.target.value
                                    ? Number(e.target.value) - 1
                                    : 0;
                                setCurrent(page);
                            }}
                            style={{ width: "100px" }}
                        />
                    </span>{" "}
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[6, 12, 18, 24].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
