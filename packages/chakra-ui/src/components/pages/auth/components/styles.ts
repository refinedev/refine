import { BoxProps } from "@chakra-ui/react";

export const layoutProps: BoxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    minHeight: "100vh",
};

export const cardProps: BoxProps = {
    width: "400px",
    borderRadius: "12px",
    padding: "32px",
};

export const titleProps: BoxProps = {
    textAlign: "center",
    fontSize: "24px",
};
