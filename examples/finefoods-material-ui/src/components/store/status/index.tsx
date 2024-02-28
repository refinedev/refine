import Chip, { ChipProps } from "@mui/material/Chip";
import { useTranslate } from "@refinedev/core";
import { IStore } from "../../../interfaces";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

type Props = {
  value: IStore["isActive"];
  size?: ChipProps["size"];
  label?: string;
};

export const StoreStatus = (props: Props) => {
  const t = useTranslate();

  return (
    <Chip
      label={props?.label ?? t(`stores.fields.isActive.${props.value}`)}
      color={props.value ? "success" : "default"}
      icon={props.value ? <CheckCircleIcon /> : <BlockOutlinedIcon />}
      variant="outlined"
      size={props.size}
    />
  );
};
