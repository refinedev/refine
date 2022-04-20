import { useEffect } from "react";
import { useNavigation } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

import { TOKEN_KEY } from "../../constants";

export const SettingsPage: React.FC = () => {
    const { push } = useNavigation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish, setId },
    } = useForm({
        refineCoreProps: {
            action: "edit",
            resource: "user",
            redirect: false,
            onMutationSuccess: ({ data }) => {
                localStorage.setItem(TOKEN_KEY, data.user.token);
                push("/profile");
            },
        },
    });

    useEffect(() => {
        setId("");
    }, []);

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form onSubmit={handleSubmit(onFinish)}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("user.image", {
                                            required: true,
                                        })}
                                        className="form-control"
                                        type="text"
                                        placeholder="URL of profile picture"
                                    />
                                    {errors.image && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("user.username", {
                                            required: true,
                                        })}
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                    />
                                    {errors.username && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        {...register("user.bio")}
                                        className="form-control form-control-lg"
                                        rows={8}
                                        placeholder="Short bio about you"
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("user.email", {
                                            required: true,
                                        })}
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Email"
                                    />
                                    {errors.title && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("user.password")}
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </fieldset>
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
