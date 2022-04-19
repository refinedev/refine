import { useGetIdentity, useList } from "@pankod/refine-core";
import { ArticleList } from "components/article";

import dayjs from "dayjs";

export const HomePage: React.FC = () => {
    const { isSuccess } = useGetIdentity();

    const tagList: any = useList({
        resource: "tags",
    });

    const articleList: any = useList({
        resource: "articles",
    });

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

                        {articleList.data?.data.articles.map((item: any) => {
                            return (
                                <ArticleList
                                    key={item.slug}
                                    author={item.author.username}
                                    image={item.author.image}
                                    title={item.title}
                                    createdAt={dayjs(item.createdAt).format(
                                        "MMM DD, YYYY",
                                    )}
                                    favCount={item.favoritesCount}
                                    description={item.description}
                                    tagList={item.tagList}
                                />
                            );
                        })}
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>
                            <div className="tag-list">
                                {tagList.data?.data.tags?.map(
                                    (item: any, index: number) => {
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
