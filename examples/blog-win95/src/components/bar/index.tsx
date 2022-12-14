import React, { useState } from "react";
import { AppBar, Toolbar, Button, List } from "react95";

type TopMenuProps = {
    children: React.ReactNode[] | React.ReactNode;
};

export const TopMenu: React.FC<TopMenuProps> = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <AppBar style={{ zIndex: 1 }}>
            <Toolbar>
                <Button
                    variant="menu"
                    onClick={() => setOpen(!open)}
                    active={open}
                >
                    File
                </Button>
                <Button variant="menu" disabled>
                    Edit
                </Button>
                <Button variant="menu" disabled>
                    View
                </Button>
                <Button variant="menu" disabled>
                    Format
                </Button>
                <Button variant="menu" disabled>
                    Tools
                </Button>
                <Button variant="menu" disabled>
                    Help
                </Button>
                {open && (
                    <List
                        style={{
                            position: "absolute",
                            left: "0",
                            top: "100%",
                        }}
                        onClick={() => setOpen(false)}
                    >
                        {children}
                    </List>
                )}
            </Toolbar>
        </AppBar>
    );
};
