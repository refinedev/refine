import { useNavigation, useLogout } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

import { TOKEN_KEY } from "../../constants";

export const SettingsPage: React.FC = () => {
    const { push } = useNavigation();
    const { mutate: logout } = useLogout();

    const {
        register,
        handleSubmit,
        formState: { errors },
        refineCore: { onFinish, formLoading },
    } = useForm({
        refineCoreProps: {
            id: "",
            action: "edit",
            resource: "user",
            redirect: false,
            onMutationSuccess: ({ data }) => {
                localStorage.setItem(TOKEN_KEY, data.user.token);
                push(`/profile/@${data.user.username}`);
            },
        },
    });

    const onSubmit = (data: Record<string, string>) => {
        onFinish({ user: data });
    };

    return (
        <div className="settings-page">
            <div className="page container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form onSubmit={handleSubmit(onFinish)}>
                            <fieldset disabled={formLoading}>
                                <fieldset className="form-group">
                                    <input
                                        {...register("image", {
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
                                        {...register("username", {
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
                                        {...register("bio")}
                                        className="form-control form-control-lg"
                                        rows={8}
                                        placeholder="Short bio about you"
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
                                    />
                                    {errors.title && (
                                        <ul className="error-messages">
                                            <li>This field is required</li>
                                        </ul>
                                    )}
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        {...register("password")}
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </fieldset>
                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit"
                                    disabled={formLoading}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit(onSubmit)();
                                    }}
                                >
                                    Update Settings
                                </button>
                            </fieldset>
                        </form>
                        <hr />
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => logout()}
                        >
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
