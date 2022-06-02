import * as React from "react";
import { Stack, Grid, Typography, Button } from "@mui/material";

import logo from "../../../assets/images/refine.svg";

const styles: { [key: string]: React.CSSProperties } = {
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
            "url('https://refine.ams3.cdn.digitaloceanspaces.com/login-background/background.png')",
        backgroundSize: "cover",
    },
    title: {
        color: "white",
        fontWeight: 800,
        fontSize: "64px",
        marginBottom: "8px",
    },
    p1: {
        color: "white",
        marginBottom: 0,
        fontSize: "20px",
        fontWeight: "bold",
    },
    p2: {
        color: "white",
        fontSize: "20px",
    },
    code: {
        backgroundColor: "white",
        color: "#331049",
    },
    logo: {
        display: "flex",
        justifyContent: "center",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
};

export const ReadyPage: React.FC = () => {
    return (
        <Grid
            container
            spacing={2}
            style={styles.root}
            sx={{
                backgroundColor: (theme) => theme.palette.background.default,
            }}
        >
            <div style={styles.content}>
                <div style={styles.logo}>
                    <img
                        style={{ marginBottom: "48px" }}
                        src={logo}
                        alt="Refine Logo"
                    />
                </div>
                <Typography style={styles.title}>Welcome on board</Typography>
                <Typography style={styles.p1}>
                    Your configuration is completed.
                </Typography>
                <Typography style={styles.p2}>
                    Now you can get started by adding your resources to the{" "}
                    <code style={styles.code}>{`resources`}</code> property of{" "}
                    <code style={styles.code}>{`<Refine>`}</code>
                </Typography>
                <Grid item sm={12} mt={12}>
                    <Stack spacing={2} direction="row">
                        <a
                            href="https://refine.dev"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Button variant="outlined">Documentation</Button>
                        </a>
                        <a
                            href="https://refine.dev/docs/examples/tutorial"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Button variant="outlined">Examples</Button>
                        </a>
                        <a
                            href="https://discord.gg/refine"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Button variant="outlined">Community</Button>
                        </a>
                    </Stack>
                </Grid>
            </div>
        </Grid>
    );
};
