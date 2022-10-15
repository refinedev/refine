import { HttpError, useLogin } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import routerProvider from "@pankod/refine-react-router-v6";

import { Header, ErrorList } from "components";

const { Link } = routerProvider;

type ILoginVariables = {
    user: {
        password: string;
        email: string;
    };
    api: Record<string, string>;
};
export const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<ILoginVariables, HttpError, ILoginVariables>();

    const { mutate: login, isLoading } = useLogin();

    return (
        <>
            <Header />
            <div className="auth-page">
                <div className="page container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign in</h1>
                            <p className="text-xs-center">
                                <Link to={`/register`}>Need an account?</Link>
                            </p>

                            {errors.api && <ErrorList errors={errors.api} />}
                            <form>
                                <fieldset disabled={isLoading}>
                                    <fieldset className="form-group">
                                        <input
                                            {...register("user.email", {
                                                required: true,
                                            })}
                                            className="form-control form-control-lg"
                                            type="text"
                                            placeholder="Email"
                                        />
                                        {errors.user?.email && (
                                            <ul className="error-messages">
                                                <li>This field is required</li>
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
                                            autoComplete=""
                                        />
                                        {errors.user?.password && (
                                            <ul className="error-messages">
                                                <li>This field is required</li>
                                            </ul>
                                        )}
                                    </fieldset>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            clearErrors();
                                            handleSubmit((values) => {
                                                return login(values, {
                                                    // eslint-disable-next-line
                                                    onError: (error: any) => {
                                                        setError(
                                                            "api",
                                                            error?.response
                                                                ?.data.errors,
                                                        );
                                                    },
                                                });
                                            })();
                                        }}
                                        className="btn btn-lg btn-primary pull-xs-right"
                                    >
                                        Submit
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
