import { useOne, useGetIdentity } from "@pankod/refine-core";
import router from "@pankod/refine-react-router-v6";

import { IArticle } from "interfaces";
import dayjs from "dayjs";

const { useParams } = router;

export const ArticlePage: React.FC = () => {
    const params = useParams();
    const { data: user } = useGetIdentity();

    const { data: item } = useOne<IArticle>({
        resource: "articles",
        id: params.slug,
        metaData: {
            resource: "article",
        },
        queryOptions: {
            enabled: !!params.slug,
        },
    });

    console.log(user);

    const { data: commentData } = useOne({
        resource: "articles",
        id: params.slug,
        metaData: {
            resource: "comments",
            getComments: true,
        },
        queryOptions: {
            enabled: !!params.slug,
        },
    });

    return (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{item?.data.title}</h1>

                    <div className="article-meta">
                        <a href="">
                            <img src={item?.data.author.image} />
                        </a>
                        <div className="info">
                            <a href="" className="author">
                                {item?.data.author.username}
                            </a>
                            <span className="date">
                                {dayjs(item?.data.createdAt).format(
                                    "MMM DD, YYYY",
                                )}
                            </span>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp; Follow {item?.data.author.username}{" "}
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp; Favorite Post{" "}
                            <span className="counter">
                                {item?.data.favoritesCount}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <p>{item?.data.body}</p>
                        <ul className="tag-list">
                            {item?.data.tagList &&
                                item?.data.tagList.map((tag, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="tag-default tag-pill tag-outline"
                                        >
                                            {tag}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>

                <hr />

                <div className="article-actions">
                    <div className="article-meta">
                        <a href="profile.html">
                            <img src={item?.data.author.image} />
                        </a>
                        <div className="info">
                            <a href="" className="author">
                                {item?.data.author.username}
                            </a>
                            <span className="date">January 20th</span>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp; Follow {item?.data.author.username}
                        </button>
                        &nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp; Favorite Post{" "}
                            <span className="counter">
                                {item?.data.favoritesCount}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-8 offset-md-2">
                        <form className="card comment-form">
                            <div className="card-block">
                                <textarea
                                    className="form-control"
                                    placeholder="Write a comment..."
                                    rows={3}
                                ></textarea>
                            </div>
                            <div className="card-footer">
                                <img
                                    src={user?.image}
                                    className="comment-author-img"
                                />
                                <button className="btn btn-sm btn-primary">
                                    Post Comment
                                </button>
                            </div>
                        </form>

                        <div className="card">
                            {commentData?.data.map((item: any) => {
                                return (
                                    <>
                                        <div className="card-block">
                                            <p className="card-text">
                                                {item?.body}
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <a
                                                href=""
                                                className="comment-author"
                                            >
                                                <img
                                                    src={item?.author.image}
                                                    className="comment-author-img"
                                                />
                                            </a>
                                            &nbsp;
                                            <a
                                                href=""
                                                className="comment-author"
                                            >
                                                {item?.author.username}
                                            </a>
                                            <span className="date-posted">
                                                {item?.createdAt}
                                            </span>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
