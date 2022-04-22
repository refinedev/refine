import {
    useGetIdentity,
    useList,
    useNavigation,
    useDelete,
    useUpdate,
} from "@pankod/refine-core";

import { IArticle, IUser } from "interfaces";
import { ArticleList } from "components/article";
import dayjs from "dayjs";

export const ProfilePage: React.FC = () => {
    const { data: user, isLoading } = useGetIdentity<IUser>();
    const { push } = useNavigation();
    const { mutate } = useUpdate();
    const { mutate: deleteMutate } = useDelete();

    const { data, isLoading: loading } = useList<IArticle>({
        resource: "articles",
        queryOptions: {
            enabled: user !== undefined,
        },
        config: {
            filters: [
                { field: "author", value: user?.username, operator: "eq" },
            ],
        },
    });

    const favArticle = (slug: string) => {
        mutate({
            resource: "articles",
            id: slug,
            metaData: {
                favorite: true,
            },
            values: "",
        });
    };

    const unFavArticle = (slug: string) => {
        deleteMutate({
            resource: "articles",
            id: slug,
            metaData: {
                favorited: true,
            },
            values: "",
        });
    };

    return (
        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img
                                src={isLoading ? "" : user?.image}
                                className="user-img"
                            />
                            <h4>{isLoading ? "loading" : user?.username}</h4>
                            <p>{isLoading ? "loading" : user?.bio}</p>
                            <button
                                className="btn btn-sm btn-outline-secondary action-btn"
                                onClick={() => {
                                    push("/settings");
                                }}
                            >
                                <i className="ion-plus-round"></i>
                                &nbsp; Edit Profile Settings
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
                            user &&
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
