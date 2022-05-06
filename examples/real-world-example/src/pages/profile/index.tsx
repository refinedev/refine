import { useEffect } from "react";
import {
    useGetIdentity,
    useTable,
    useDelete,
    useUpdate,
    useOne,
} from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dayjs from "dayjs";

import { ArticleList } from "components/article";
import { Pagination } from "components/Pagination";
import { UserInfo, ProfileNav } from "components/profile";

import { IArticle, IProfile, IUser } from "interfaces";

const { useParams } = routerProvider;

export const ProfilePage: React.FC = () => {
    const { data: user } = useGetIdentity<IUser>();
    const { mutate: updateMutate } = useUpdate();
    const { mutate: deleteMutate } = useDelete();

    const params = useParams();

    const { tableQueryResult, pageSize, current, setCurrent, setFilters } =
        useTable<IArticle>({
            resource: "articles",
            queryOptions: {
                enabled: params?.username !== undefined,
            },
        });

    useEffect(() => {
        setFilters([
            {
                field: "author",
                value: params?.username,
                operator: "eq",
            },
            {
                field: "favorited",
                value: undefined,
                operator: "eq",
            },
        ]);
    }, [params?.username]);

    useEffect(() => {
        setCurrent(1);
    }, [params?.username, params?.page]);

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
        updateMutate({
            resource: "profiles",
            id: username,
            metaData: {
                resource: "follow",
            },
            values: "",
        });
    };

    const unFollowUser = (username: string) => {
        deleteMutate({
            resource: "profiles",
            id: username,
            metaData: {
                resource: "follow",
            },
        });
    };

    return (
        <div className="profile-page">
            <UserInfo
                loading={isLoading}
                profile={profileData}
                params={params}
                user={user}
                followUser={(userName) => {
                    followUser(userName);
                }}
                unFollowUser={(userName) => {
                    unFollowUser(userName);
                }}
            />

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <ProfileNav
                            params={params}
                            profileData={profileData}
                            setFilters={setFilters}
                        />

                        {!tableQueryResult.data?.total && (
                            <div className="article-preview">
                                No articles are here... yet.
                            </div>
                        )}

                        {!tableQueryResult.isLoading &&
                            params?.username &&
                            tableQueryResult?.data?.data?.map((item) => {
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
                        <Pagination
                            total={tableQueryResult.data?.total}
                            pageSize={pageSize}
                            current={current}
                            setCurrent={setCurrent}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
