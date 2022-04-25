import {
    useGetIdentity,
    useList,
    useNavigation,
    useDelete,
    useUpdate,
    useOne,
} from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { IArticle, IProfile, IUser } from "interfaces";
import { ArticleList } from "components/article";
import dayjs from "dayjs";

const { useParams } = routerProvider;

export const ProfilePage: React.FC = () => {
    const { data: user } = useGetIdentity<IUser>();
    const { push } = useNavigation();
    const { mutate: updateMutate } = useUpdate();
    const { mutate: deleteMutate } = useDelete();
    const { mutate: followMutate } = useUpdate();
    const { mutate: unFollowMutate } = useDelete();
    const params = useParams();

    const { data, isLoading: loading } = useList<IArticle>({
        resource: "articles",
        queryOptions: {
            enabled: params?.username !== undefined,
        },
        config: {
            filters: [
                { field: "author", value: params?.username, operator: "eq" },
            ],
        },
    });

    const { data: profileData, isLoading: isLoading } = useOne<IProfile>({
        resource: "profiles",
        id: params?.username,
        metaData: {
            resource: "profile",
        },
    });

    const favArticle = (slug: string) => {
        updateMutate({
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

    const followUser = (username: string) => {
        followMutate({
            resource: "profiles",
            id: username,
            metaData: {
                resource: "follow",
            },
            values: "",
        });
    };

    const unFollowUser = (username: string) => {
        unFollowMutate({
            resource: "profiles",
            id: username,
            metaData: {
                resource: "follow",
            },
        });
    };

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img
                                src={isLoading ? "" : profileData?.data.image}
                                className="user-img"
                            />
                            <h4>
                                {isLoading
                                    ? "loading"
                                    : profileData?.data.username}
                            </h4>
                            <p>
                                {isLoading ? "loading" : profileData?.data.bio}
                            </p>
                            <button
                                className={
                                    profileData?.data.following
                                        ? `btn btn-sm action-btn ng-binding btn-secondary`
                                        : `btn btn-sm action-btn ng-binding btn-outline-secondary`
                                }
                                onClick={() => {
                                    params.username === user?.username
                                        ? push("/settings")
                                        : profileData?.data.following
                                        ? unFollowUser(params?.username)
                                        : followUser(params?.username);
                                }}
                            >
                                <i className="ion-plus-round"></i>
                                &nbsp;
                                {params?.username === user?.username
                                    ? `Edit Profile Settings`
                                    : profileData?.data.following
                                    ? `Unfollow ${profileData?.data.username}`
                                    : `Follow ${profileData?.data.username}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a className="nav-link active" href="">
                                        My Articles
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="">
                                        Favorited Articles
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {!loading &&
                            params?.username &&
                            data?.data?.map((item) => {
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
                </div>
            </div>
        </div>
    );
};
