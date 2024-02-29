import { useLogin } from "@refinedev/core";
import { useRef, useState } from "react";
import { Alert, Button, Card, Input } from "react-daisyui";
import { supabaseClient } from "../utility";

export const LoginPage = () => {
  const mobileNoRef = useRef<string>();
  const otpRef = useRef<string>();
  const [error, setError] = useState<string>();
  const [formState, setFormState] = useState<"SEND_OTP" | "LOGIN">("SEND_OTP");

  const { mutate: login } = useLogin();

  const onLogin = () => {
    login(
      { mobileNo: mobileNoRef.current, otp: otpRef.current },
      { onError: (error) => setError(error.message) },
    );
  };

  const mobileFormRender = () => (
    <>
      <label className="text-dark font-medium">Enter your mobile mumber</label>
      <Input
        className="border-gray bg-gray text-dark mb-4 text-lg font-medium"
        onChange={(e) => {
          mobileNoRef.current = e.target.value;
        }}
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
      <label className="text-dark font-medium">Enter OTP</label>
      <Input
        className="border-gray bg-gray text-dark mb-4 text-lg font-medium"
        onChange={(e) => {
          otpRef.current = e.target.value;
        }}
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

    const { error } = await supabaseClient.auth.signInWithOtp({
      phone: mobileNo,
    });
    if (error) {
      setError(error.message);
      return;
    }
    setFormState("LOGIN");
  };

  return (
    <div className="bg-primary flex min-h-screen items-center justify-center">
      <Card className="w-1/2 bg-white shadow-lg " bordered={false}>
        <Card.Body>
          {error && (
            <Alert status="error" className="mb-2">
              {error}
            </Alert>
          )}
          <h2 className="text-dark mb-3  text-xl font-bold">Sign In</h2>
          {formState === "SEND_OTP" && mobileFormRender()}
          {formState === "LOGIN" && otpFormRender()}
        </Card.Body>
      </Card>
    </div>
  );
};
