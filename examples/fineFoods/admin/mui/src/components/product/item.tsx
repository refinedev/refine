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
} from "@pankod/refine-mui";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

import { IProduct } from "interfaces";

type PropductItem = {
    product: IProduct;
    show: (id: BaseKey) => void;
};

export const ProductItem: React.FC<PropductItem> = ({ product, show }) => {
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
                        width: "160px",
                        height: "160px",
                        borderRadius: "50%",
                    }}
                    alt={name}
                    image={images[0].url}
                />
            </Box>
            <CardContent sx={{ paddingX: "36px" }}>
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
                <Typography
                    sx={{
                        fontWeight: 800,
                        fontSize: "32px",
                        color: "text.secondary",
                    }}
                >{`${price / 100}$`}</Typography>
            </CardContent>
        </Card>
    );
};
