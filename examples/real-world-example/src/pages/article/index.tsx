import {
    useOne,
    useGetIdentity,
    useDelete,
    useNavigation,
    useUpdate,
} from "@pankod/refine-core";
import router from "@pankod/refine-react-router-v6";
import { useForm } from "@pankod/refine-react-hook-form";

import { IArticle } from "interfaces";
import dayjs from "dayjs";

const { useParams } = router;

export const ArticlePage: React.FC = () => {
    const params = useParams();
    const { data: user } = useGetIdentity();
    const { mutateAsync: deleteMutate, isLoading: deleteArticleIsLoading } =
        useDelete();
    const { push } = useNavigation();
    const { mutate: favoriteMutate, isLoading: favoriteIsLoading } =
        useUpdate();
    const { mutate: unFavoriteMutate, isLoading: unFavoriteIsLoading } =
        useDelete();
    const { mutate: followMutate, isLoading: followIsLoading } = useUpdate();
    const { mutate: unFollowMutate, isLoading: unfollowIsLoading } =
        useDelete();

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

    const favoriteUnFavoriteIslLoading =
        isFetchingArticle || favoriteIsLoading || unFavoriteIsLoading;

    const followUnfollowMutationIsLoading =
        isFetchingArticle || followIsLoading || unfollowIsLoading;

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

    const deleteArticle = async () => {
        await deleteMutate({
            resource: `articles`,
            id: params.slug,
        });
        push("/");
    };

    const favArticle = () => {
        favoriteMutate({
            resource: "articles",
            id: params?.slug,
            metaData: {
                resource: "favorite",
            },
            values: "",
        });
    };

    const unFavArticle = () => {
        unFavoriteMutate({
            resource: "articles",
            id: params?.slug,
            metaData: {
                resource: "favorite",
            },
        });
    };

    const followUser = (username: string) => {
        followMutate(
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
        unFollowMutate(
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
                                <a href="">
                                    <img src={article?.data.author.image} />
                                </a>
                                <div className="info">
                                    <a href="" className="author">
                                        {article?.data.author.username}
                                    </a>
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
                                        {}
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
                                                deleteArticleIsLoading
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
                                            } ${
                                                followUnfollowMutationIsLoading
                                                    ? "disabled"
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                article?.data.author.following
                                                    ? unFollowUser(
                                                          article?.data.author
                                                              .username,
                                                      )
                                                    : followUser(
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
                                            } ${
                                                favoriteUnFavoriteIslLoading
                                                    ? "disabled"
                                                    : ""
                                            }`}
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

                    <div className="container page">
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
                                <a href="profile.html">
                                    <img src={article?.data.author.image} />
                                </a>
                                <div className="info">
                                    <a href="" className="author">
                                        {article?.data.author.username}
                                    </a>

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
                                <form
                                    onSubmit={handleSubmit(handleSubmitComment)}
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
                                                            src={
                                                                item?.author
                                                                    .image
                                                            }
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
