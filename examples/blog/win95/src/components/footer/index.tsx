import React, { useState } from "react";
import { useLogout, useNavigation } from "@pankod/refine-core";
import { AppBar, Toolbar, Button, List, ListItem } from "react95";

export const Footer: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { mutate: logout } = useLogout();
    const { push } = useNavigation();

    return (
        <AppBar style={{ top: "unset", bottom: 0 }}>
            <Toolbar style={{ justifyContent: "space-between" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <Button
                        onClick={() => setOpen(!open)}
                        active={open}
                        style={{ fontWeight: "bold" }}
                    >
                        <img
                            src={"./refine.png"}
                            alt="react95 logo"
                            style={{ height: "20px", marginRight: 4 }}
                        />
                    </Button>
                    {open && (
                        <List
                            style={{
                                position: "absolute",
                                left: "0",
                                bottom: "100%",
                            }}
                            onClick={() => setOpen(false)}
                        >
                            <ListItem
                                onClick={() => {
                                    push("posts");
                                }}
                            >
                                Posts
                            </ListItem>
                            <ListItem
                                onClick={() => {
                                    push("categories");
                                }}
                            >
                                Categories
                            </ListItem>
                            <ListItem
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <span role="img" aria-label="🔙">
                                    🔙
                                </span>
                                Logout
                            </ListItem>
                        </List>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};
