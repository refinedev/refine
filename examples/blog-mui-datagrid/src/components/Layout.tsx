import React from "react";
import { LayoutProps } from "@refinedev/core";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 80%;
    margin: 50px auto;
    height: 100%;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Wrapper>{children}</Wrapper>
        </>
    );
};

export default Layout;
