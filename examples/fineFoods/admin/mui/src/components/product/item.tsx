import { useState } from "react";
import { useTranslate, BaseKey } from "@pankod/refine-core";
import {
    Card,
    CardHeader,
    Box,
    IconButton,
    CardMedia,
    CardContent,
    Typography,
    Tooltip,
    Popover,
    Button,
    Divider,
    Paper,
} from "@pankod/refine-mui";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

import { IProduct } from "interfaces";

type PropductItem = {
    updateStock?: (changedValue: number, clickedProduct: IProduct) => void;
    product: IProduct;
    show: (id: BaseKey) => void;
};

export const ProductItem: React.FC<PropductItem> = ({
    product,
    show,
    updateStock,
}) => {
    const t = useTranslate();
    const { id, name, description, images, price } = product;

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? "simple-popover" : undefined;

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                height: "100%",
            }}
        >
            <CardHeader
                action={
                    <Box component="div">
                        <IconButton
                            aria-describedby={popoverId}
                            onClick={handleClick}
                            sx={{ marginRight: "10px", marginTop: "4px" }}
                            aria-label="settings"
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Popover
                            id={popoverId}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    show(id);
                                    setAnchorEl(null);
                                }}
                                size="small"
                                startIcon={<EditIcon />}
                            >
                                {t("stores.buttons.edit")}
                            </Button>
                        </Popover>
                    </Box>
                }
                sx={{ padding: 0 }}
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        width: { xs: 60, sm: 84, lg: 108, xl: 144 },
                        height: { xs: 60, sm: 84, lg: 108, xl: 144 },
                        borderRadius: "50%",
                    }}
                    alt={name}
                    image={images[0].url}
                />
            </Box>
            <CardContent
                sx={{
                    paddingX: "36px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <Divider />
                <Tooltip title={name}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            fontSize: "24px",
                            color: "text.secondary",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {name}
                    </Typography>
                </Tooltip>
                <Tooltip title={description}>
                    <Typography
                        variant="body1"
                        sx={{
                            mt: 2,
                            overflowWrap: "break-word",
                            color: "text.secondary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                            flex: 1,
                        }}
                    >
                        {description}
                    </Typography>
                </Tooltip>
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: "20px",
                        color: "#999999",
                        my: 1,
                    }}
                >{`#10000${id}`}</Typography>
                <Tooltip title={`${price / 100}$`}>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "24px",
                            color: "text.secondary",
                            overflowWrap: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                        }}
                    >{`${price / 100}$`}</Typography>
                </Tooltip>
                {updateStock && (
                    <Paper
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            height: "32px",
                            alignItems: "center",
                            marginTop: "4px",
                            boxShadow: "none",
                            border: "1px solid #e0e0e0",
                        }}
                    >
                        <input
                            style={{
                                width: "70px",
                                height: "30px",
                                border: "none",
                                borderRadius: "5px",
                                margin: "10px 0",
                                outline: "none",
                            }}
                            type="number"
                            value={product.stock || 0}
                            onChange={(e) => {
                                e.preventDefault();
                                updateStock(
                                    parseInt(e.target.value, 10),
                                    product,
                                );
                            }}
                        />
                    </Paper>
                )}
            </CardContent>
        </Card>
    );
};
