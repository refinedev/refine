import { useNavigation, useLogin } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";
import { ErrorList } from "components/Error";

export const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const { push } = useNavigation();
    const { mutate: login } = useLogin<any>();

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a
                                href=""
                                onClick={() => {
                                    push("/register");
                                }}
                            >
                                Need an account?
                            </a>
                        </p>

                        {errors.api && <ErrorList errors={errors.api} />}
                        <form>
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
                            <input
                                onClick={() => {
                                    clearErrors();
                                    handleSubmit((values) => {
                                        login(values, {
                                            onError: (error: any) => {
                                                setError(
                                                    "api",
                                                    error?.response?.data
                                                        .errors,
                                                );
                                            },
                                        });
                                    })();
                                }}
                                className="btn btn-lg btn-primary pull-xs-right"
                                value="Submit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
