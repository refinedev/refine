import Chip, { ChipProps } from "@mui/material/Chip";
import { useTranslate } from "@refinedev/core";
import { IProduct } from "../../../interfaces";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

type Props = {
  value: IProduct["isActive"];
  size?: ChipProps["size"];
};

export const CategoryStatus = (props: Props) => {
  const t = useTranslate();

  return (
    <Chip
      label={t(`categories.fields.isActive.${props.value}`)}
      color={props.value ? "success" : "default"}
      icon={
        props.value ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />
      }
      variant="outlined"
      size={props.size}
    />
  );
};
