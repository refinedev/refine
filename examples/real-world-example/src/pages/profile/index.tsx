import { useGetIdentity, useCustom } from "@pankod/refine-core";

import { IUser } from "interfaces";
import { ArticleList } from "components/article";

import dayjs from "dayjs";

export const ProfilePage: React.FC = () => {
    const { data: user, isLoading } = useGetIdentity<IUser>();

    // const userArticleList = useList({
    //   resource: "articles?author=mlh&limit=5&offset=0",
    //   // config: {
    //   //   filters: [{ field: "author", value: user?.username, operator: "eq" }],
    //   // }
    // });

    const { data, isLoading: loading } = useCustom<{ articles: [] }>({
        url: `https://api.realworld.io/api/articles?author=${user?.username}&limit=5&offset=0`,
        method: "get",
        config: {
            headers: {
                Authorization: `Token ${user?.token}`,
            },
        },
    });

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
                            <button className="btn btn-sm btn-outline-secondary action-btn">
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
                            data?.data?.articles.map((item: any) => {
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
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};
