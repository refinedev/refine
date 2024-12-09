import {
  ActionIcon,
  Avatar,
  Group,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useGetIdentity } from "@refinedev/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity<IUser>();

  const theme = useMantineTheme();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const borderColor = dark ? theme.colors.dark[6] : theme.colors.gray[2];

  return (
    <Group py={6} px="sm">
      <Group
        align="right"
        style={{
          height: "100%",
        }}
      >
        <ActionIcon
          variant="outline"
          color={dark ? "yellow" : "primary"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
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
