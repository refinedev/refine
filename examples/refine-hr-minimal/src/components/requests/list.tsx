import type { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";

type Props = {
  dataLength: number;
  hasMore: boolean;
  scrollableTarget: string;
  loading: boolean;
  noDataText: string;
  noDataIcon: ReactNode;
  children: ReactNode;
  next: () => void;
};

export const RequestsList = (props: Props) => {
  const hasData = props.dataLength > 0 || props.loading;

  if (props.loading) {
    return (
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          height: "calc(100vh - 280px)",
          [theme.breakpoints.up("sm")]: {
            gap: "24px",
          },
        })}
      >
        {[...Array(8)].map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingTop: "8px",
              gap: "12px",

              "& .MuiSkeleton-rectangular": {
                borderRadius: "2px",
              },
            }}
          >
            <Skeleton variant="rectangular" width="64px" height="12px" />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <Skeleton
                variant="circular"
                width={48}
                height={48}
                sx={{
                  flexShrink: 0,
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Skeleton variant="rectangular" width="50%" height="16px" />
                <Skeleton variant="rectangular" width="70%" height="12px" />
              </Box>
              <Button
                size="small"
                color="inherit"
                sx={{
                  alignSelf: "flex-start",
                  flexShrink: 0,
                  marginLeft: "auto",
                }}
              >
                View Request
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (!hasData) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {props.noDataIcon}
        <Typography variant="body2" color="text.secondary">
          {props.noDataText || "No data."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        id={props.scrollableTarget}
        sx={() => ({
          maxHeight: "calc(100vh - 280px)",
          overflow: "auto",
          ...(props.dataLength > 6 && {
            "&::after": {
              pointerEvents: "none",
              content: '""',
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "48px",
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0), #FFFFFF)",
            },
          }),
        })}
      >
        <InfiniteScroll
          dataLength={props.dataLength}
          hasMore={props.hasMore}
          next={props.next}
          scrollableTarget={props.scrollableTarget}
          endMessage={
            !props.loading &&
            props.dataLength > 6 && (
              <Box
                sx={{
                  pt: "40px",
                }}
              />
            )
          }
          loader={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100px",
              }}
            >
              <CircularProgress size={24} />
            </Box>
          }
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              [theme.breakpoints.up("sm")]: {
                gap: "24px",
              },
            })}
          >
            {props.children}
          </Box>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};
