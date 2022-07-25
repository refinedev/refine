import { GetOneResponse, useNavigation } from "@pankod/refine-core";

import { IProfile, IUser } from "interfaces";

type UserInfoProps = {
    loading: boolean;
    profile: GetOneResponse<IProfile> | undefined;
    params: IUser;
    user: IUser | undefined;
    followUser: (userName: string) => void;
    unFollowUser: (userName: string) => void;
};

export const UserInfo: React.FC<UserInfoProps> = ({
    loading,
    profile,
    params,
    user,
    followUser,
    unFollowUser,
}) => {
    const { push } = useNavigation();

    return (
        <div className="user-info">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        {loading ? null : (
                            <img
                                src={loading ? "" : profile?.data.image}
                                className="user-img"
                            />
                        )}

                        <h4>{loading ? "loading" : profile?.data.username}</h4>
                        <p>{loading ? "loading" : profile?.data.bio}</p>
                        <button
                            className={
                                profile?.data.following
                                    ? `btn btn-sm action-btn ng-binding btn-secondary`
                                    : `btn btn-sm action-btn ng-binding btn-outline-secondary`
                            }
                            onClick={() => {
                                params.username === user?.username
                                    ? push("/settings")
                                    : profile?.data.following
                                    ? unFollowUser(params?.username)
                                    : followUser(params?.username);
                            }}
                        >
                            <i className="ion-plus-round"></i>
                            &nbsp;
                            {params?.username === user?.username
                                ? `Edit Profile Settings`
                                : profile?.data.following
                                ? `Unfollow ${profile?.data.username}`
                                : `Follow ${profile?.data.username}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
