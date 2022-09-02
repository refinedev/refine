import React from "react";
import { AuthPage } from "@pankod/refine-core";

export const ExamplePage: React.FC = () => {
    const providers = [
        {
            name: "google",
            icon: (
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
            ),
            label: "Sign in with Google",
        },
        {
            name: "facebook",
            icon: (
                <img src="https://img.icons8.com/color/48/000000/facebook-new.png" />
            ),
            label: "Sign in with Facebook",
        },
        {
            name: "github",
            icon: (
                <img src="https://img.icons8.com/color/48/000000/github.png" />
            ),
            label: "Sign in with GitHub",
        },
    ];
    const Box = ({ children }: any) => (
        <div
            style={{
                padding: "1rem",
                border: "1px solid #ccc",
                marginBottom: "1rem",
            }}
        >
            {children}
        </div>
    );
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Box>
                                <AuthPage
                                    type="login"
                                    loginLink="/auth/login"
                                />
                            </Box>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Box>
                                <AuthPage type="login" providers={providers} />
                            </Box>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Box>
                                <AuthPage
                                    type="register"
                                    loginLink="/auth/login"
                                />
                            </Box>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Box>
                                <AuthPage type="resetPassword" />
                            </Box>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Box>
                                <AuthPage
                                    type="updatePassword"
                                    backLink="/auth/login"
                                />
                            </Box>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};
