import { useState } from "react";
import { useLogin } from "@refinedev/core";
import {
    Window,
    WindowHeader,
    WindowContent,
    TextField,
    Button,
} from "react95";

interface ILoginForm {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const [username, setUsername] = useState("info@refine.dev");
    const [password, setPassword] = useState("refine-supabase");

    const { mutate: login } = useLogin<ILoginForm>();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "100vh",
                backgroundColor: "rgb(0, 128, 128)",
            }}
        >
            <Window>
                <WindowHeader active={true} className="window-header">
                    <span> Refine Login</span>
                </WindowHeader>
                <div style={{ marginTop: 8 }}>
                    <img src="./refine.png" alt="refine-logo" width={100} />
                </div>
                <WindowContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login({ username, password });
                        }}
                    >
                        <div style={{ width: 300 }}>
                            <div style={{ display: "flex" }}>
                                <TextField
                                    placeholder="User Name"
                                    fullWidth
                                    value={username}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <br />
                            <TextField
                                placeholder="Password"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <br />
                            <Button type="submit" value="login">
                                Sign in
                            </Button>
                        </div>
                    </form>
                </WindowContent>
            </Window>
        </div>
    );
};
