import Chip, { ChipProps } from "@mui/material/Chip";
import { useTranslate } from "@refinedev/core";
import { IProduct } from "../../../interfaces";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

type Props = {
  value: IProduct["isActive"];
  size?: ChipProps["size"];
};

export const ProductStatus = (props: Props) => {
  const t = useTranslate();

  return (
    <Chip
      label={t(`products.fields.isActive.${props.value}`)}
      color={props.value ? "success" : "default"}
      icon={props.value ? <CheckCircleIcon /> : <BlockOutlinedIcon />}
      variant="outlined"
      size={props.size}
    />
  );
};
