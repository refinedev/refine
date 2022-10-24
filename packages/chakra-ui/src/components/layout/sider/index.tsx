import React, { useState } from "react";
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
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";

import { Title as DefaultTitle } from "../title";

export const Sider: React.FC<RefineLayoutSiderProps> = ({ render }) => {
    const [collapsed, setCollapsed] = useState(false);

    const { Link } = useRouterContext();
    const { menuItems } = useMenu();
    const Title = useTitle();
    const isExistAuthentication = useIsExistAuthentication();
    const t = useTranslate();
    const { hasDashboard } = useRefineContext();
    const { mutate: mutateLogout } = useLogout();

    const RenderToTitle = Title ?? DefaultTitle;

    const drawerWidth = () => {
        if (collapsed) return "80px";
        return "200px";
    };

    const renderTreeView = (tree: ITreeMenu[]) => {
        return tree.map((item) => {
            const { label, route, name, children } = item;

            const isParent = children.length > 0;

            const linkProps = !isParent
                ? {
                      as: Link,
                      to: route,
                  }
                : undefined;

            return (
                <CanAccess
                    key={route}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <AccordionItem border="none">
                        <AccordionButton px="0">
                            <Button
                                // leftIcon={<HamburgerIcon />}
                                variant="link"
                                color="white"
                                {...linkProps}
                            >
                                {label}
                            </Button>
                            {isParent && <AccordionIcon />}
                        </AccordionButton>

                        {isParent && (
                            <AccordionPanel py="0">
                                <Accordion allowToggle>
                                    {renderTreeView(children)}
                                </Accordion>
                            </AccordionPanel>
                        )}
                    </AccordionItem>
                </CanAccess>
            );
        });
    };

    const items = renderTreeView(menuItems);

    const dashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
            <Tooltip label={t("dashboard.title", "Dashboard")}>
                <Button
                    py="2"
                    // leftIcon={<InfoIcon />}
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
                py="2"
                // leftIcon={<ExternalLinkIcon />}
                variant="link"
                color="white"
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
        <>
            <Box width={drawerWidth()} />
            <Box
                bg="sider.background"
                position="fixed"
                width={drawerWidth()}
                top={0}
                h="100vh"
                display="flex"
                flexDirection="column"
            >
                <Box display="flex" justifyContent="center" p={4}>
                    <RenderToTitle collapsed={collapsed} />
                </Box>
                <VStack
                    mt="2"
                    color="white"
                    alignItems="start"
                    px="3"
                    flexGrow={1}
                >
                    <Accordion allowToggle>{renderSider()}</Accordion>
                </VStack>
                <Button
                    onClick={() => setCollapsed((prev) => !prev)}
                    color="white"
                    bg="sider.collapseButton"
                    borderRadius={0}
                    _hover={{ bg: "sider.collapseButton" }}
                    _active={{
                        bg: "sider.collapseButton",
                        transform: "translateY(1px)",
                    }}
                >
                    {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
                </Button>
            </Box>
        </>
    );
};
