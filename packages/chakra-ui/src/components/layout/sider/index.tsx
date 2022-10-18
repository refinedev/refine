import React from "react";
import {
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useLogout,
    useMenu,
    useRefineContext,
    useRouterContext,
    useTitle,
    useTranslate,
} from "@pankod/refine-core";
import { RefineLayoutSiderProps } from "@pankod/refine-ui-types";
import { Box, Button, Tooltip, VStack } from "@chakra-ui/react";
import { HamburgerIcon, InfoIcon } from "@chakra-ui/icons";

import { Title as DefaultTitle } from "../title";

export const Sider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
    const { Link } = useRouterContext();
    const { menuItems } = useMenu();
    const Title = useTitle();
    const isExistAuthentication = useIsExistAuthentication();
    const t = useTranslate();
    const { hasDashboard } = useRefineContext();
    const { mutate: mutateLogout } = useLogout();

    const RenderToTitle = Title ?? DefaultTitle;

    const renderTreeView = (tree: ITreeMenu[]) => {
        return tree.map((item) => {
            const { label, route, name, children } = item;

            const isParent = children.length > 0;

            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <Tooltip label={label}>
                        <Button
                            leftIcon={<HamburgerIcon />}
                            as={Link}
                            to={route}
                            variant="link"
                            color="white"
                        >
                            {label}
                        </Button>
                    </Tooltip>
                    {isParent && renderTreeView(children)}
                </CanAccess>
            );
        });
    };

    const items = renderTreeView(menuItems);

    const dashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
            <Tooltip label={t("dashboard.title", "Dashboard")}>
                <Button
                    leftIcon={<InfoIcon />}
                    variant="link"
                    color="white"
                    as={Link}
                    to="/"
                >
                    {t("dashboard.title", "Dashboard")}
                </Button>
            </Tooltip>
        </CanAccess>
    ) : null;

    const logout = isExistAuthentication && (
        <Tooltip label={t("buttons.logout", "Logout")}>
            <Button
                variant="link"
                color="white"
                as={Link}
                onClick={() => mutateLogout()}
            >
                {t("buttons.logout", "Logout")}
            </Button>
        </Tooltip>
    );

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                logout,
                items,
                collapsed: false,
            });
        }
        return (
            <>
                {dashboard}
                {items}
                {logout}
            </>
        );
    };

    return (
        <Box bg="sider" width="200px" h="100vh">
            <Box
                paddingX="2"
                paddingY="4"
                display="flex"
                justifyContent="center"
            >
                <RenderToTitle collapsed={false} />
            </Box>
            <VStack mt="2" color="white" alignItems="start" px="3">
                {renderSider()}
            </VStack>
        </Box>
    );
};
