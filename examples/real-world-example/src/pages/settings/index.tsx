import { useGetIdentity, useNavigation } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

import { IUser } from "interfaces";
import axios from "axios";

export const SettingsPage: React.FC = () => {
    const { data: user, isLoading } = useGetIdentity<IUser>();
    const { push } = useNavigation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleOnSubmit = async (values: any) => {
        await axios({
            method: "put",
            url: "https://api.realworld.io/api/user",
            headers: {
                Authorization: `Token ${user?.token}`,
            },
            data: {
                user: values,
            },
        });

        push("/profile");
    };

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                            {isLoading && <div>Loading...</div>}
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("image", {
                                            required: true,
                                        })}
                                        className="form-control"
                                        type="text"
                                        placeholder="URL of profile picture"
                                        defaultValue={user?.image}
                                    />
                                    {errors.image && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("username", {
                                            required: true,
                                        })}
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                        defaultValue={user?.username}
                                    />
                                    {errors.username && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        {...register("title")}
                                        className="form-control form-control-lg"
                                        rows={8}
                                        placeholder="Short bio about you"
                                        defaultValue={user?.bio ? user.bio : ""}
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("email", {
                                            required: true,
                                        })}
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Email"
                                        defaultValue={user?.email}
                                    />
                                    {errors.title && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                {/* <fieldset className="form-group">
                                    <input
                                        {...register("password")}
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </fieldset> */}
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary pull-xs-right"
                                >
                                    Update Settings
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
