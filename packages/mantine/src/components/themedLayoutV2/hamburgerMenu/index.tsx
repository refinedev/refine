import React from "react";
import { ActionIcon, MediaQuery } from "@mantine/core";
import {
    IconMenu2,
    IconIndentDecrease,
    IconIndentIncrease,
} from "@tabler/icons";

import { useSiderVisible } from "@hooks";

export const HamburgerMenu: React.FC = () => {
    const {
        siderVisible,
        setSiderVisible,
        drawerSiderVisible,
        setDrawerSiderVisible,
    } = useSiderVisible();

    return (
        <>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <ActionIcon
                    variant="subtle"
                    color="gray"
                    sx={{
                        border: "none",
                    }}
                    size="lg"
                    onClick={() => setDrawerSiderVisible?.(!drawerSiderVisible)}
                >
                    {drawerSiderVisible ? (
                        <IconIndentIncrease size={20} />
                    ) : (
                        <IconIndentDecrease size={20} />
                    )}
                </ActionIcon>
            </MediaQuery>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
                <ActionIcon
                    variant="subtle"
                    color="gray"
                    sx={{
                        border: "none",
                    }}
                    size="lg"
                    onClick={() => setSiderVisible?.(!siderVisible)}
                >
                    <IconMenu2 size={20} />
                </ActionIcon>
            </MediaQuery>
        </>
    );
};
