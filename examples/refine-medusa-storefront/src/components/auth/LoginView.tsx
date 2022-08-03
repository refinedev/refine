import { Logo, Button, Input } from "@components/ui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import { HttpError, useLogin } from "@pankod/refine-core";

import { useUI } from "@components/ui/context";

type Login = {
    email: string;
    password: string;
};

const LoginView: React.FC = () => {
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors },
    } = useForm<Login, HttpError, Login>({
        refineCoreProps: {
            redirect: false,
        },
    });

    // Form State
    const { setModalView, closeModal } = useUI();
    const { mutate: login, isLoading } = useLogin();

    const handleLogin = async ({ email, password }: Login) => {
        console.log({ email, password });
        await login(
            {
                username: email,
                password,
            },
            {
                onSuccess: () => {
                    closeModal();
                },
                onError: () => {
                    setError("email", {
                        message: "The email or password is invalid",
                    });
                },
            },
        );
    };

    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex w-80 flex-col justify-between p-3"
        >
            <div className="flex justify-center pb-12 ">
                <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-3">
                {Object.keys(errors).length > 0 && (
                    <div className="text-red border-red border p-3">
                        <ul>
                            {Object.keys(errors).map((key: any) => (
                                <li key={key}>
                                    {(errors as any)[key as any].message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        /* pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/, */
                        required: {
                            message: "email is required",
                            value: true,
                        },
                    }}
                    render={({ field }) => (
                        <Input type="email" placeholder="Email" {...field} />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: {
                            message: "password is required",
                            value: true,
                        },
                        minLength: {
                            message:
                                "Password is too short (minimum is 7 characters)",
                            value: 7,
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                        />
                    )}
                />

                <Button variant="slim" type="submit" loading={isLoading}>
                    Log In
                </Button>
                <div className="pt-1 text-center text-sm">
                    {/* <span className="text-accent-7">
                        Don't have an account?
                    </span> */}
                    <a
                        className="text-accent-9 cursor-pointer font-bold hover:underline"
                        onClick={() => setModalView("SIGNUP_VIEW")}
                    >
                        Sign Up
                    </a>
                </div>
            </div>
        </form>
    );
};

export default LoginView;
