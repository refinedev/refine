import { useForm } from "react-hook-form";
import { useLogin } from "@pankod/refine-core";

import { Logo, Button } from "@components/ui";
import { useUI } from "@components/ui/context";
import { Input } from "@components/common";
import { emailRegex } from "@lib/regex";
import { ErrorMessage } from "@hookform/error-message";

type Login = {
    email: string;
    password: string;
    serverError: string;
};

const LoginView: React.FC = () => {
    const {
        setError,
        handleSubmit,
        register,
        formState: { errors, touchedFields },
    } = useForm<Login>({
        reValidateMode: "onChange",
    });

    // Form State
    const { setModalView, closeModal } = useUI();
    const { mutate: login, isLoading } = useLogin();

    const handleLogin = async ({ email, password }: Login) => {
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
                    setError("serverError", {
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
                <ErrorMessage
                    errors={errors}
                    name="serverError"
                    render={({ message }) => {
                        return (
                            <div className="pt-1 text-xs text-rose-500">
                                <span>{message}</span>
                            </div>
                        );
                    }}
                />
                <Input
                    type="email"
                    label="Email"
                    {...register("email", {
                        required: "email is required",
                        pattern: emailRegex,
                    })}
                    errors={errors}
                    touched={touchedFields}
                />
                <Input
                    type="password"
                    label="Password"
                    {...register("password", {
                        required: {
                            message: "password is required",
                            value: true,
                        },
                        minLength: {
                            message:
                                "password is too short (minimum is 7 characters)",
                            value: 7,
                        },
                    })}
                    errors={errors}
                    touched={touchedFields}
                />

                <Button variant="slim" type="submit" loading={isLoading}>
                    Log In
                </Button>
                <div className="pt-1 text-center text-sm">
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
