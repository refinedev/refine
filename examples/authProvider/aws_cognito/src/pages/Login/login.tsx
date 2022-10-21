import { AntdLayout, Button } from "@pankod/refine-antd";
import { SignIn } from "./pages/SignIn";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

    return (
        <AntdLayout
            style={{
                background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
                backgroundSize: "cover",
            }}
        >
            <div style={{ height: "100vh", display: "flex" }}>
                <div style={{ maxWidth: "200px", margin: "auto" }}>
                    <div style={{ marginBottom: "28px" }}>
                        <img src="./refine.svg" alt="Refine" />
                    </div>
                    <Button component={Link} to="./SignIn"
                        type="primary"
                        size="large"
                        block
                    >
                        Sign in
                    </Button>
                </div>
            </div>
        </AntdLayout>
    );
};
