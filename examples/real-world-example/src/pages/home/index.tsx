import { useState } from "react";
import {
    useGetIdentity,
    useList,
    useUpdate,
    useDelete,
} from "@pankod/refine-core";
import { ArticleList } from "components/article";

import dayjs from "dayjs";
import { IArticle, ITag } from "interfaces";

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

    const { data: articleList, isFetching: isFetchingArticle } =
        useList<IArticle>({
            resource: activeTab === "global" ? "articles" : "articles/feed",
            metaData: {
                resource: "articles",
            },
        });

    const favoriteUnFavoriteIslLoading =
        isFetchingArticle || favoriteIsLoading || unFavoriteIsLoading;

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
                                        <a
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
                                        </a>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${
                                            activeTab === "global"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => setActiveTab("global")}
                                    >
                                        Global Feed
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {!articleList?.total && (
                            <div className="article-preview">
                                No articles are here... yet
                            </div>
                        )}

                        {articleList?.data?.map((item) => {
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
                                            <a
                                                key={index}
                                                href=""
                                                className="tag-pill tag-default"
                                            >
                                                {item}
                                            </a>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
