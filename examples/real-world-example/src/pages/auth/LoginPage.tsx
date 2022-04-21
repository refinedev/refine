import { useNavigation, useLogin } from "@pankod/refine-core";
import { useForm } from "@pankod/refine-react-hook-form";

export const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
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

                        <form
                            onSubmit={handleSubmit((values) => login(values))}
                        >
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
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
