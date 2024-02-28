import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { CustomTooltip } from "../../customTooltip";
import { IOrder } from "../../../interfaces";
import { getUniqueListWithCount } from "../../../utils";

type Props = {
  order: IOrder;
};

export const OrderTableColumnProducts = ({ order }: Props) => {
  const uniqueProducts = getUniqueListWithCount({
    list: order?.products || [],
    field: "id",
  });
  const visibleProducts = uniqueProducts.slice(0, 3);
  const unvisibleProducts = uniqueProducts.slice(3);

  return (
    <Box display="flex" gap="12px">
      {visibleProducts.map((product) => {
        const image = product.images?.[0];
        return (
          <CustomTooltip key={product.id} title={product.name}>
            <Avatar
              variant="square"
              sx={{
                width: 32,
                height: 32,
              }}
              src={image?.thumbnailUrl || image?.url}
              alt={image?.name}
            />
          </CustomTooltip>
        );
      })}
      {!!unvisibleProducts.length && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="gray"
          width="32px"
          height="32px"
        >
          <Typography color="revert">+{unvisibleProducts.length}</Typography>
        </Box>
      )}
    </Box>
  );
};
