import { Window, Button, WindowHeader, Separator, Anchor } from "react95";
import { IconClose } from "../icons/close";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useGo } from "@refinedev/core";

export const AboutWindow = () => {
  const { hash } = useLocation();
  const go = useGo();

  const onClose = () => {
    go({
      to: "",
      hash: undefined,
      type: "replace",
      options: {
        keepHash: false,
        keepQuery: true,
      },
    });
  };

  if (hash !== "#about") {
    return null;
  }

  return (
    <OverlayContainer>
      <Overlay />
      <Container>
        <Header>
          <TitleWrapper>
            <h2>About</h2>
          </TitleWrapper>
          <HeaderActions>
            <Button onClick={onClose}>
              <IconClose />
            </Button>
          </HeaderActions>
        </Header>
        <WindowContent>
          <AboutContent>
            <AboutLogoContainer>
              <AboutLogo src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/about-refine-logo.png" />
            </AboutLogoContainer>
            <AboutRightColumn>
              <AboutLabelContainer>
                <AboutLabelLogo src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/about-refine-label.png" />
                <AboutLabelCopyright>
                  {"Copyright (c) 1980 - 1995"}
                </AboutLabelCopyright>
              </AboutLabelContainer>
              <Separator />
              <InfoContainer>
                <InfoItem>
                  <InfoItemIcon src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/about-webpage.png" />

                  <InfoItemLabel>Website:</InfoItemLabel>
                  <div>
                    <Anchor href="mailto:info@refine.dev" target="_blank">
                      info@refine.dev
                    </Anchor>
                  </div>
                </InfoItem>
                <InfoItem>
                  <InfoItemIcon src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/about-email.png" />

                  <InfoItemLabel>Website:</InfoItemLabel>
                  <div>
                    <Anchor href="https://refine.dev" target="_blank">
                      https://refine.dev
                    </Anchor>
                  </div>
                </InfoItem>
                <InfoItem>
                  <InfoItemIcon src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/about-globe.png" />

                  <InfoItemLabel>Address:</InfoItemLabel>
                  <InfoItemParagraph>
                    <p>256 Chapman Road STE</p>
                    <p>105-4 Newark, DE 19702</p>
                  </InfoItemParagraph>
                </InfoItem>
              </InfoContainer>
              <CloseContainer>
                <CloseButton onClick={onClose}>Close</CloseButton>
              </CloseContainer>
            </AboutRightColumn>
          </AboutContent>
        </WindowContent>
      </Container>
    </OverlayContainer>
  );
};

const Header = styled(WindowHeader)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: -2px;
`;

const OverlayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  box-sizing: border-box;
  padding: 16px;
`;

const Overlay = styled.div`
position: absolute;
inset: 0;
z-index: 0;
width: 100%;
height: 100%;
opacity: 0.5;
background-image: linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%);
background-size: 8px 8px;
background-position: bottom right, bottom 4px right 0, bottom 4px right -4px, bottom 0px right 4px;
`;

const Container = styled(Window)`
  padding: 2px 2px;
  z-index: 3;
  max-width: 744px;
  width: 100%;
  height: auto;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`;

const WindowContent = styled.div`
  flex: 1;
  overflow: auto;
  margin-right: 3px;
  margin-bottom: 2px;
`;

const AboutContent = styled.div`
  display: flex;
  padding: 18px;
  gap: 48px;
`;

const AboutLogoContainer = styled.div`
  flex-shrink: 0;
`;

const AboutLogo = styled.img`
  width: 240px;
  height: 240px;
`;

const AboutRightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 32px;
`;

const AboutLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AboutLabelLogo = styled.img`
  width: 288px;
  height: 96px;
`;

const AboutLabelCopyright = styled.span`
  font-size: 16px;
  line-height: 20px;
  color: #707070;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoItemIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const InfoItemLabel = styled.div`
  width: 64px;
`;

const InfoItemParagraph = styled.div`
  height: 17.5px;
`;

const CloseContainer = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CloseButton = styled(Button)`
  width: 110px;
`;
