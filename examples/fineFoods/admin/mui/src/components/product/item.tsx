import {
    Card,
    CardHeader,
    Box,
    IconButton,
    CardMedia,
    CardContent,
    Typography,
    padding,
} from "@pankod/refine-mui";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
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
                        width: "192px",
                        height: "192px",
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
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            fontSize: "24px",
                            lineHeight: "27px",
                            color: "text.secondary",
                            mb: "12px",
                            marginTop: "18px",
                            minHeight: "60px",
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "20px",
                            color: "text.secondary",
                            letterSpacing: "-0.02em",
                            mb: "12px",
                            minHeight: "100px",
                        }}
                    >
                        {description}
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "20px",
                            lineHeight: "18px",
                            color: "#999999",
                            letterSpacing: "-0.02em",
                            mb: "17px",
                        }}
                    >{`#10000${id}`}</Typography>
                    <Typography
                        sx={{
                            fontWeight: 800,
                            fontSize: "32px",
                            lineHeight: "32px",
                            color: "text.secondary",
                            letterSpacing: "-0.02em",
                        }}
                    >{`${price / 100}$`}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};
