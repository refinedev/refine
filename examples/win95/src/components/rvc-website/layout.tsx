import { PropsWithChildren } from "react";
import styled from "styled-components";
import { RVCWebsiteLinks } from "@/components/rvc-website";
import { getImagesUrl } from "@/utils/get-cdn-url";

export const RVCWebsiteLayout = ({ children }: PropsWithChildren) => {
  return (
    <Page>
      <Container>
        <RVCWebsiteLinks />
        {children}
      </Container>
    </Page>
  );
};

const Page = styled.div`
  background-color: black;
  background-image: url(${getImagesUrl("/stars.gif")});
`;

const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding-top: 16px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
