import { BoxProps } from "@chakra-ui/react";

export const layoutProps: BoxProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `radial-gradient(50% 50% at 50% 50%, #6813CB 0%, #2A2A42 100%)`,
    backgroundSize: "cover",
    minHeight: "100vh",
};

export const cardProps: BoxProps = {
    width: "400px",
    padding: "20px",
    borderRadius: "10px",
};

export const titleProps: BoxProps = {
    textAlign: "center",
    fontSize: "24px",
};
