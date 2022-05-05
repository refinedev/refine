import {
    useGetIdentity,
    useTable,
    useNavigation,
    useDelete,
    useUpdate,
    useOne,
} from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

import { IArticle, IProfile, IUser } from "interfaces";
import { ArticleList } from "components/article";
import dayjs from "dayjs";
import { Pagination } from "components/Pagination";
import { UserInfo, ProfileNav } from "components/profile";

const { useParams, Link } = routerProvider;

export const ProfilePage: React.FC = () => {
    const { data: user } = useGetIdentity<IUser>();
    const { push } = useNavigation();
    const { mutate: updateMutate } = useUpdate();
    const { mutate: deleteMutate } = useDelete();
    const { mutate: followMutate } = useUpdate();
    const { mutate: unFollowMutate } = useDelete();
    const params = useParams();

    const {
        tableQueryResult,
        pageSize,
        current,
        setCurrent,
        setFilters,
        filters,
    } = useTable<IArticle>({
        resource: "articles",
        queryOptions: {
            enabled: params?.username !== undefined,
        },
    });

    console.log("filters", filters);

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

    console.log(params);

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
                            filters={() => {
                                // this is a temp fix the filters are not getting reset
                                params?.page
                                    ? setFilters([
                                          {
                                              field: "favorited",
                                              value: undefined,
                                              operator: "eq",
                                          },
                                          {
                                              field: "author",
                                              value: params?.username,
                                              operator: "eq",
                                          },
                                      ])
                                    : setFilters([
                                          {
                                              field: "author",
                                              value: undefined,
                                              operator: "eq",
                                          },
                                          {
                                              field: "favorited",
                                              value: params?.username,
                                              operator: "eq",
                                          },
                                      ]);
                            }}
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
