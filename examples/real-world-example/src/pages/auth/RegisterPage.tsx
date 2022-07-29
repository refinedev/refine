import { HttpError, useLogin } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import routerProvider from "@pankod/refine-react-router-v6";

import { ErrorList } from "components";

const { Link } = routerProvider;

type IRegisterVariables = {
    user: {
        password: string;
        username: string;
        email: string;
    };
    api: Record<string, string>;
};
export const RegisterPage: React.FC = () => {
    const { mutate: login, isLoading: isLoadingLogin } = useLogin();

    const {
        refineCore: {
            onFinish,
            mutationResult: { isLoading: isLoadingRegister },
        },
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<IRegisterVariables, HttpError, IRegisterVariables>({
        refineCoreProps: {
            resource: "users",
            redirect: false,
            onMutationError: (error) => {
                setError("api", error.response.data.errors);
            },
        },
    });

    return (
        <div className="auth-page">
            <div className="page container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <Link to={"/login"}>Have an account?</Link>
                        </p>

                        {errors.api && <ErrorList errors={errors.api} />}

                        <form>
                            <fieldset
                                disabled={isLoadingLogin || isLoadingRegister}
                            >
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
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        clearErrors();
                                        handleSubmit(async (values) => {
                                            await onFinish(values);
                                            login(values);
                                        })();
                                    }}
                                >
                                    Sign up
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
