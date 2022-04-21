import { useNavigation, useLogin } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

export const RegisterPage: React.FC = () => {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        refineCoreProps: {
            resource: "users",
            redirect: false,
            onMutationSuccess: () => {
                push("/login");
            },
        },
    });

    const { push } = useNavigation();

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a
                                href=""
                                onClick={() => {
                                    push("/login");
                                }}
                            >
                                Have an account?
                            </a>
                        </p>

                        <form onSubmit={handleSubmit(onFinish)}>
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
                                    <span>This field is required</span>
                                )}
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
                                {errors.email && (
                                    <span>This field is required</span>
                                )}
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    {...register("user.password", {
                                        required: true,
                                    })}
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <span>This field is required</span>
                                )}
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right">
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
