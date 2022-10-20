import dayjs from "dayjs";
import {
    useOne,
    useGetIdentity,
    useDelete,
    useNavigation,
    useUpdate,
} from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import { useForm } from "@pankod/refine-react-hook-form";

import { IArticle } from "interfaces";

const { useParams, Link } = routerProvider;

export const ArticlePage: React.FC = () => {
    const params = useParams();
    const { data: user, isFetching: userIsFetching } = useGetIdentity();

    const { push } = useNavigation();

    const { mutate: updateMutate, isLoading: updateIsLoading } = useUpdate();
    const { mutate: deleteMutate, isLoading: deleteIsLoading } = useDelete();

    const {
        data: article,
        refetch: refetchArticle,
        isFetching: isFetchingArticle,
        isLoading: isLoadingArticle,
    } = useOne<IArticle>({
        resource: "articles",
        id: params?.slug,
        metaData: {
            resource: "article",
        },
        queryOptions: {
            enabled: !!params.slug,
        },
    });

    const isLoading = isFetchingArticle || updateIsLoading || deleteIsLoading;

    const { data: commentData, refetch: refetchArticleComments } = useOne({
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

    const {
        register,
        handleSubmit,
        refineCore: { onFinish },
        reset,
    } = useForm({
        refineCoreProps: {
            resource: `articles/${params.slug}/comments`,
            redirect: false,
            onMutationSuccess: () => {
                refetchArticleComments();
                reset();
            },
        },
    });

    const handleSubmitComment = (data: {}) => {
        onFinish({ comment: data });
    };

    const deleteArticle = () => {
        deleteMutate(
            {
                resource: `articles`,
                id: params.slug,
            },
            {
                onSuccess: () => {
                    push("/");
                },
            },
        );
    };

    const favArticle = () => {
        updateMutate({
            resource: "articles",
            id: params?.slug,
            metaData: {
                URLSuffix: "favorite",
            },
            values: "",
        });
    };

    const unFavArticle = () => {
        deleteMutate({
            resource: "articles",
            id: params?.slug,
            metaData: {
                URLSuffix: "favorite",
            },
        });
    };

    const followUser = (username: string) => {
        updateMutate(
            {
                resource: "profiles",
                id: username,
                metaData: {
                    resource: "follow",
                },
                values: "",
            },
            {
                onSuccess: () => {
                    refetchArticle();
                },
            },
        );
    };

    const unFollowUser = (username: string) => {
        deleteMutate(
            {
                resource: "profiles",
                id: username,
                metaData: {
                    resource: "follow",
                },
            },
            {
                onSuccess: () => {
                    refetchArticle();
                },
            },
        );
    };

    return (
        <div className="article-page">
            {isLoadingArticle ? null : (
                <>
                    <div className="banner">
                        <div className="container">
                            <h1>{article?.data.title}</h1>

                            <div className="article-meta">
                                <Link
                                    to={`/profile/@${article?.data.author.username}`}
                                >
                                    <img src={article?.data.author.image} />
                                </Link>
                                <div className="info">
                                    <Link
                                        to={`/profile/@${article?.data.author.username}`}
                                        className="author"
                                    >
                                        {article?.data.author.username}
                                    </Link>
                                    <span className="date">
                                        {dayjs(article?.data.createdAt).format(
                                            "MMM DD, YYYY",
                                        )}
                                    </span>
                                </div>

                                {user &&
                                user?.username ===
                                    article?.data.author.username ? (
                                    <>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => {
                                                push(
                                                    `/editor/${article?.data.slug}`,
                                                );
                                            }}
                                        >
                                            <i className="ion-edit"></i>
                                            &nbsp; Edit Article
                                        </button>
                                        &nbsp;
                                        <button
                                            className={`${
                                                deleteIsLoading
                                                    ? "btn btn-outline-danger btn-sm disabled"
                                                    : "btn btn-outline-danger btn-sm"
                                            }`}
                                            onClick={() => {
                                                deleteArticle();
                                            }}
                                        >
                                            <i className="ion-trash-a"></i>
                                            &nbsp; Delete Article
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className={`${
                                                article?.data.author.following
                                                    ? "btn btn-sm action-btn ng-binding btn-secondary"
                                                    : "btn btn-sm btn-outline-secondary"
                                            } ${isLoading ? "disabled" : ""}`}
                                            onClick={() => {
                                                article?.data.author.following
                                                    ? unFollowUser(
                                                          article?.data.author
                                                              .username,
                                                      )
                                                    : followUser(
                                                          // eslint-disable-next-line
                                                          article!.data.author
                                                              .username,
                                                      );
                                            }}
                                        >
                                            <i className="ion-plus-round"></i>
                                            &nbsp;{" "}
                                            {article?.data.author.following
                                                ? `Unfollow ${article?.data.author.username}`
                                                : `Follow ${article?.data.author.username}`}
                                        </button>
                                        &nbsp;
                                        <button
                                            className={`${
                                                article?.data.favorited
                                                    ? "btn btn-sm btn-primary"
                                                    : "btn btn-sm btn-outline-primary"
                                            } ${isLoading ? "disabled" : ""}`}
                                            onClick={() => {
                                                article?.data.favorited
                                                    ? unFavArticle()
                                                    : favArticle();
                                            }}
                                        >
                                            <i className="ion-heart"></i>
                                            &nbsp;{" "}
                                            {article?.data.favorited
                                                ? "Unfavorite Article"
                                                : "Favorite Article"}{" "}
                                            <span className="counter">
                                                {article?.data.favoritesCount}
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="page container">
                        <div className="row article-content">
                            <div className="col-md-12">
                                <p>{article?.data.body}</p>
                                <ul className="tag-list">
                                    {article?.data.tagList &&
                                        article?.data.tagList.map(
                                            (tag, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className="tag-default tag-pill tag-outline"
                                                    >
                                                        {tag}
                                                    </li>
                                                );
                                            },
                                        )}
                                </ul>
                            </div>
                        </div>

                        <hr />

                        <div className="article-actions">
                            <div className="article-meta">
                                <Link
                                    to={`/profile/@${article?.data.author.username}`}
                                >
                                    <img src={article?.data.author.image} />
                                </Link>
                                <div className="info">
                                    <Link
                                        to={`/profile/@${article?.data.author.username}`}
                                        className="author"
                                    >
                                        {article?.data.author.username}
                                    </Link>

                                    <span className="date">
                                        {dayjs(article?.data.createdAt).format(
                                            "MMM DD, YYYY",
                                        )}
                                    </span>
                                </div>

                                {user?.username ===
                                article?.data.author.username ? (
                                    <>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => {
                                                push(
                                                    `/editor/${article?.data.slug}`,
                                                );
                                            }}
                                        >
                                            <i className="ion-edit"></i>
                                            &nbsp; Edit Article
                                        </button>
                                        &nbsp;
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => {
                                                deleteArticle();
                                            }}
                                        >
                                            <i className="ion-trash-a"></i>
                                            &nbsp; Delete Article
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className={
                                                article?.data.author.following
                                                    ? "btn btn-sm action-btn ng-binding btn-secondary"
                                                    : "btn btn-sm btn-outline-secondary"
                                            }
                                            onClick={() => {
                                                article?.data.author.following
                                                    ? unFollowUser(
                                                          article?.data.author
                                                              .username,
                                                      )
                                                    : followUser(
                                                          // eslint-disable-next-line
                                                          article!.data.author
                                                              .username,
                                                      );
                                            }}
                                        >
                                            <i className="ion-plus-round"></i>
                                            &nbsp;{" "}
                                            {article?.data.author.following
                                                ? `Unfollow ${article?.data.author.username}`
                                                : `Follow ${article?.data.author.username}`}
                                        </button>
                                        &nbsp;
                                        <button
                                            className={
                                                article?.data.favorited
                                                    ? "btn btn-sm btn-primary"
                                                    : "btn btn-sm btn-outline-primary"
                                            }
                                            onClick={() => {
                                                article?.data.favorited
                                                    ? unFavArticle()
                                                    : favArticle();
                                            }}
                                        >
                                            <i className="ion-heart"></i>
                                            &nbsp;{" "}
                                            {article?.data.favorited
                                                ? "Unfavorite Article"
                                                : "Favorite Article"}{" "}
                                            <span className="counter">
                                                {article?.data.favoritesCount}
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-md-8 offset-md-2">
                                {user && (
                                    <form
                                        onSubmit={handleSubmit(
                                            handleSubmitComment,
                                        )}
                                        className="card comment-form"
                                    >
                                        <div className="card-block">
                                            <textarea
                                                {...register("body")}
                                                className="form-control"
                                                placeholder="Write a comment..."
                                                rows={3}
                                            ></textarea>
                                        </div>
                                        <div className="card-footer">
                                            <img
                                                src={
                                                    user?.image ??
                                                    "https://api.realworld.io/images/smiley-cyrus.jpeg"
                                                }
                                                className="comment-author-img"
                                            />
                                            <button className="btn btn-sm btn-primary">
                                                Post Comment
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {!user && !userIsFetching && (
                                    <div>
                                        <Link to="/login">Sign in</Link> or{" "}
                                        <Link to="/register">sign up</Link> to
                                        add comments on this article.
                                    </div>
                                )}
                                <br />

                                <div className="card">
                                    {commentData?.data.map((item: any) => { // eslint-disable-line 
                                        return (
                                            <>
                                                <div className="card-block">
                                                    <p className="card-text">
                                                        {item?.body}
                                                    </p>
                                                </div>
                                                <div className="card-footer">
                                                    <Link
                                                        to={`/profile/@${article?.data.author.username}`}
                                                        className="comment-author"
                                                    >
                                                        <img
                                                            src={
                                                                item?.author
                                                                    .image
                                                            }
                                                            className="comment-author-img"
                                                        />
                                                    </Link>
                                                    &nbsp;
                                                    <Link
                                                        to={`/profile/@${article?.data.author.username}`}
                                                        className="comment-author"
                                                    >
                                                        {item?.author.username}
                                                    </Link>
                                                    <span className="date-posted">
                                                        {dayjs(
                                                            item.createdAt,
                                                        ).format(
                                                            "MMM DD, YYYY",
                                                        )}
                                                    </span>
                                                    {item.author.username ===
                                                        user?.username && (
                                                        <span className="mod-options">
                                                            <i
                                                                className="ion-trash-a"
                                                                onClick={async () => {
                                                                    await deleteMutate(
                                                                        {
                                                                            resource: `articles/${params.slug}/comments`,
                                                                            id: item.id,
                                                                        },
                                                                    );
                                                                    refetchArticleComments();
                                                                }}
                                                            />
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
