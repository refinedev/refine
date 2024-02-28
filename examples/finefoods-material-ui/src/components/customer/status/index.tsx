import Chip, { ChipProps } from "@mui/material/Chip";
import { useTranslate } from "@refinedev/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import { IUser } from "../../../interfaces";

type Props = {
  value: IUser["isActive"];
} & ChipProps;

export const CustomerStatus = ({ value, ...rest }: Props) => {
  const t = useTranslate();

  const color: ChipProps["color"] = value ? "success" : "default";
  const icon: ChipProps["icon"] = value ? (
    <CheckCircleIcon />
  ) : (
    <PauseCircleOutlineOutlinedIcon color="inherit" />
  );

  return (
    <Chip
      {...rest}
      label={t(`users.fields.isActive.${value}`)}
      color={color}
      icon={icon}
      variant="outlined"
    />
  );
};
