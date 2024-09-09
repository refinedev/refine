import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  Title,
  useMantineColorScheme,
} from "@mantine/core";

import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import {
  HamburgerMenu,
  type RefineThemedLayoutV2HeaderProps,
} from "@refinedev/mantine";
import { IconLanguage, IconMoonStars, IconSun } from "@tabler/icons-react";
import i18n from "i18next";
import React from "react";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { data: user } = useGetIdentity<IUser>();

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Group align="center" justify="normal" wrap="nowrap" py={6} px="sm">
      <HamburgerMenu />
      <Group flex={1} />
      <Group align="flex-end">
        <Menu
          shadow="md"
          data-test-id="language-button"
          aria-label={currentLocale}
        >
          <Menu.Target>
            <ActionIcon variant="outline">
              <IconLanguage size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            {[...(i18n.languages ?? [])].sort().map((lang: string) => (
              <Menu.Item
                key={lang}
                onClick={() => {
                  changeLanguage(lang);
                }}
                value={lang}
                color={lang === currentLocale ? "primary" : undefined}
                leftSection={
                  <Avatar
                    src={`/images/flags/${lang}.svg`}
                    size={18}
                    radius="lg"
                  />
                }
              >
                {lang === "en" ? "English" : "German"}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>

        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "primary"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
      </Group>
      <Group>
        {(user?.name || user?.avatar) && (
          <Group gap="xs">
            {user?.name && <Title order={6}>{user?.name}</Title>}
            <Avatar src={user?.avatar} alt={user?.name} radius="xl" />
          </Group>
        )}
      </Group>
    </Group>
  );
};
