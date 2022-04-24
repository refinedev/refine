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
    const { isSuccess } = useGetIdentity();
    const { mutate } = useUpdate();
    const { mutate: deleteMutate } = useDelete();

    const tagList = useList<ITag[]>({
        resource: "tags",
    });

    const articleList = useList<IArticle>({
        resource: "articles",
    });

    const favArticle = (slug: string) => {
        mutate({
            resource: "articles",
            id: slug,
            metaData: {
                resource: "favorite",
            },
            values: "",
        });
    };

    const unFavArticle = (slug: string) => {
        deleteMutate({
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
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {isSuccess && (
                                    <li className="nav-item">
                                        <a
                                            className="nav-link disabled"
                                            href=""
                                        >
                                            Your Feed
                                        </a>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <a className="nav-link active" href="">
                                        Global Feed
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {articleList.data?.data.map((item) => {
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
