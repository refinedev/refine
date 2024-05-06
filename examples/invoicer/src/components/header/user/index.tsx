import { useGetIdentity, useLogout } from "@refinedev/core";
import { IUser } from "../../../interfaces";
import { useStyles } from "./styled";
import { Button, Dropdown, Flex, Skeleton, Typography } from "antd";
import { CustomAvatar } from "../../avatar";

export const User = () => {
  const { styles } = useStyles();

  const { mutate: logout } = useLogout();
  const { data: user, isLoading } = useGetIdentity<IUser>();

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "logout",
            label: (
              <Button
                style={{
                  width: "100%",
                }}
                onClick={() => logout()}
              >
                Logout
              </Button>
            ),
          },
        ],
      }}
      placement="bottom"
      arrow
    >
      <Flex align="center" gap={16}>
        <div
          style={{
            width: "114px",
          }}
        >
          <Typography.Text ellipsis className={styles.userName}>
            {isLoading ? (
              <Skeleton.Input
                style={{
                  width: "100px",
                  height: "32px",
                  borderRadius: "4px",
                }}
              />
            ) : (
              user?.username
            )}
          </Typography.Text>
        </div>
        <CustomAvatar
          size={32}
          src={"https://randomuser.me/api/portraits/lego/5.jpg"}
          alt={user?.username}
        />
      </Flex>
    </Dropdown>
  );
};
