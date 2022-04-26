import { useNavigation, useLogin } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import { ErrorList } from "components/Error";

export const RegisterPage: React.FC = () => {
    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({
        refineCoreProps: {
            resource: "users",
            redirect: false,
            onMutationError: (error) => {
                setError("api", error.response.data.errors);
            },
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

                        {errors.api && <ErrorList errors={errors.api} />}

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
                                {errors?.user?.username && (
                                    <ul className="error-messages">
                                        <span>This field is required</span>
                                    </ul>
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
                                {errors?.user?.email && (
                                    <ul className="error-messages">
                                        <span>This field is required</span>
                                    </ul>
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
                                {errors?.user?.password && (
                                    <ul className="error-messages">
                                        <span>This field is required</span>
                                    </ul>
                                )}
                            </fieldset>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary pull-xs-right"
                                onClick={() => {
                                    clearErrors();
                                    handleSubmit(onFinish);
                                }}
                            >
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
