import { useList } from "@refinedev/core";
import dayjs from "dayjs";
import { Frame } from "../frame";
import {
  AnniversaryIcon,
  BirthdayIcon,
  CelebrationIcon,
  NewEmployeeIcon,
} from "@/icons";
import { Avatar, Box, Typography } from "@mui/material";
import { indigo, green, pink } from "@/providers/theme-provider/colors";

const todayDayjs = dayjs();

export const Celebrations = () => {
  const today = todayDayjs.utcOffset(0);
  const todayStart = today.startOf("day").toISOString();
  const todayEnd = today.endOf("day").toISOString();

  const { data: dataCreatedAtToday } = useList({
    resource: "employees",
    pagination: { mode: "off" },
    filters: [
      {
        operator: "and",
        value: [
          {
            field: "createdAt",
            operator: "gte",
            value: todayStart,
          },
          {
            field: "createdAt",
            operator: "lte",
            value: todayEnd,
          },
        ],
      },
    ],
  });

  return (
    <Frame
      title="Celebrations"
      icon={<CelebrationIcon width={24} height={24} />}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "24px",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            marginBottom: "8px",
          }}
        >
          Today
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <EmployeItem
            name="John Doe"
            avatarUrl="https://avatar.iran.liara.run/public"
            variant="birthday"
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            marginTop: "24px",
            marginBottom: "8px",
          }}
        >
          Tomorrow
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <EmployeItem
            name="John Doe"
            avatarUrl="https://avatar.iran.liara.run/public"
            variant="new"
          />
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            marginTop: "24px",
            marginBottom: "8px",
          }}
        >
          Tomorrow
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <EmployeItem
            name="John Doe"
            avatarUrl="https://avatar.iran.liara.run/public"
            variant="anniversary"
          />
        </Box>
      </Box>
    </Frame>
  );
};

const EmployeItem = (props: {
  name: string;
  avatarUrl: string;
  variant: "birthday" | "anniversary" | "new";
}) => {
  const variantMap = {
    birthday: {
      icon: <BirthdayIcon />,
      iconBgColor: pink[50],
      iconColor: pink[700],
      textColor: pink[700],
      text: "Happy Birthday",
    },
    anniversary: {
      icon: <AnniversaryIcon />,
      iconBgColor: indigo[50],
      iconColor: indigo[700],
      textColor: indigo[700],
      text: "Work Anniversary",
    },
    new: {
      icon: <NewEmployeeIcon />,
      iconBgColor: green[50],
      iconColor: green[700],
      textColor: green[700],
      text: "Welcome onboard",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar
        src={props.avatarUrl}
        sx={{
          marginRight: "8px",
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: variantMap[props.variant].textColor,
          marginRight: "4px",
        }}
      >
        {variantMap[props.variant].text}
      </Typography>
      <Typography
        variant="body2"
        color="text.primary"
        sx={{
          fontWeight: 500,
          marginRight: "8px",
        }}
      >
        {props.name}!
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: variantMap[props.variant].iconColor,
          backgroundColor: variantMap[props.variant].iconBgColor,
          borderRadius: "100%",
          width: "40px",
          height: "40px",
        }}
      >
        {variantMap[props.variant].icon}
      </Box>
    </Box>
  );
};
