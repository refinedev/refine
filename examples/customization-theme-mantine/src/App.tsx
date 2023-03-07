import { Refine } from "@refinedev/core";

import {
    Layout,
    ErrorComponent,
    ReadyPage,
    notificationProvider,
    LightTheme,
    DarkTheme,
} from "@refinedev/mantine";

import { useLocalStorage } from "@mantine/hooks";
import { ColorSchemeProvider } from "@mantine/styles";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider, ColorScheme, Global } from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";
import { Header } from "./components";

const App: React.FC = () => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: "mantine-color-scheme",
        defaultValue: "light",
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={colorScheme === "dark" ? DarkTheme : LightTheme}
                withNormalizeCSS
                withGlobalStyles
            >
                <Global
                    styles={{ body: { "-webkit-font-smoothing": "auto" } }}
                />
                <NotificationsProvider position="top-right">
                    <Refine
                        legacyRouterProvider={routerProvider}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        notificationProvider={notificationProvider}
                        ReadyPage={ReadyPage}
                        catchAll={<ErrorComponent />}
                        Layout={Layout}
                        Header={Header}
                        resources={[
                            {
                                name: "posts",
                                show: PostShow,
                                list: PostList,
                                edit: PostEdit,
                                create: PostCreate,
                            },
                        ]}
                    />
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default App;
