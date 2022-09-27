import { useLogin } from "@pankod/refine-core";
import { useRef, useState } from "react";
import { Alert, Button, Card, Input } from "react-daisyui";
import { supabaseClient } from "utility";

export const LoginPage = () => {
    const mobileNoRef = useRef<string>();
    const otpRef = useRef<string>();
    const [error, setError] = useState<string>();
    const [formState, setFormState] = useState<"SEND_OTP" | "LOGIN">(
        "SEND_OTP",
    );

    const { mutate: login } = useLogin();

    const onLogin = () => {
        login(
            { mobileNo: mobileNoRef.current, otp: otpRef.current },
            { onError: (error: any) => setError(error.message) },
        );
    };

    const mobileFormRender = () => (
        <>
            <label className="font-medium text-dark">
                Enter your mobile mumber
            </label>
            <Input
                className="mb-4 border-gray bg-gray text-dark text-lg font-medium"
                onChange={(e) => (mobileNoRef.current = e.target.value)}
                onFocus={() => setError("")}
                name="mobile"
                type={"tel"}
                defaultValue={mobileNoRef.current}
            />
            <Button color="accent" className="shadow" onClick={onSendOtp}>
                Send OTP
            </Button>
        </>
    );

    const otpFormRender = () => (
        <>
            <label className="font-medium text-dark">Enter OTP</label>
            <Input
                className="mb-4 border-gray bg-gray text-dark text-lg font-medium"
                onChange={(e) => (otpRef.current = e.target.value)}
                onFocus={() => setError("")}
                name="otp"
                value={otpRef.current}
            />
            <Button color="accent" className="shadow" onClick={onLogin}>
                Login
            </Button>
        </>
    );

    const onSendOtp = async () => {
        const mobileNo = mobileNoRef.current || "";
        if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(mobileNo)) {
            setError("Please enter a valid mobile number");
            return;
        }
        const { error } = await supabaseClient.auth.signIn({
            phone: mobileNo,
        });
        if (error) {
            setError(error.message);
            return;
        }
        setFormState("LOGIN");
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center">
            <Card className="bg-white w-1/2 shadow-lg " bordered={false}>
                <Card.Body>
                    {error && (
                        <Alert status="error" className="mb-2">
                            {error}
                        </Alert>
                    )}
                    <h2 className="text-dark text-xl  font-bold mb-3">
                        Sign In
                    </h2>
                    {formState === "SEND_OTP" && mobileFormRender()}
                    {formState === "LOGIN" && otpFormRender()}
                </Card.Body>
            </Card>
        </div>
    );
};
