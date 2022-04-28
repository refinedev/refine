import { useState } from "react";

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
} from "@pankod/refine-mui";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

import { IProduct } from "interfaces";

export const ProductItem: React.FC<IProduct> = ({
    id,
    name,
    isActive,
    description,
    images,
    createdAt,
    price,
    category,
    stock,
}) => {
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
                                onClick={() => console.log("edit drawer open")} // gonna open edit drawer
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    outline: "none",
                                    margin: "5px",
                                }}
                                size="small"
                                startIcon={<EditIcon />}
                            >
                                <Typography>Edit Product</Typography>
                            </Button>
                        </Popover>
                    </Box>
                }
                sx={{ padding: 0 }}
            />
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    component="div"
                    sx={{
                        width: "160px",
                        height: "160px",
                    }}
                >
                    <CardMedia
                        component="img"
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        alt={name}
                        image={images[0].url}
                    />
                </Box>
            </Box>

            <CardContent sx={{ paddingX: "36px" }}>
                <Box
                    sx={{
                        borderTop: "1px solid #999999",
                    }}
                >
                    <Tooltip title={name}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                fontSize: "24px",
                                lineHeight: "27px",
                                color: "text.secondary",
                                marginTop: "18px",
                                height: "54px",
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
                            component="div"
                            sx={{
                                overflowWrap: "break-word",
                                fontWeight: 500,
                                fontSize: "16px",
                                lineHeight: "20px",
                                color: "text.secondary",
                                letterSpacing: "-0.02em",
                                mb: "12px",
                                maxHeight: "70px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "3",
                                WebkitBoxOrient: "vertical",
                                height: "60px",
                            }}
                        >
                            {description}
                        </Typography>
                    </Tooltip>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "20px",
                            lineHeight: "18px",
                            color: "#999999",
                            letterSpacing: "-0.02em",
                            mb: "17px",
                            mt: "17px",
                        }}
                    >{`#10000${id}`}</Typography>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "32px",
                            lineHeight: "32px",
                            color: "text.secondary",
                            letterSpacing: "-0.02em",
                            marginBottom: "17px",
                        }}
                    >{`${price / 100}$`}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
