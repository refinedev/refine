import Chip, { ChipProps } from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import MopedOutlined from "@mui/icons-material/MopedOutlined";
import { ICourierStatus } from "../../../interfaces";

type Variant = {
  [key in ICourierStatus["text"]]: {
    icon: ChipProps["icon"];
    tagColor: ChipProps["color"];
  };
};

type Props = {
  value: ICourierStatus;
};

export const CourierStatus = (props: Props) => {
  const variant: Variant = {
    Available: {
      tagColor: "success",
      icon: <CheckCircleIcon />,
    },
    Offline: {
      tagColor: "default",
      icon: <BlockOutlinedIcon />,
    },
    "On delivery": {
      tagColor: "info",
      icon: <MopedOutlined />,
    },
  };

  const text = props?.value?.text || "Offline";

  return (
    <Chip
      label={text}
      icon={variant[text].icon}
      color={variant[text].tagColor}
      variant="outlined"
    />
  );
};
