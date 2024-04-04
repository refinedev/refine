import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";
import { Hourglass, Window } from "react95";
import { AppLayoutHeader } from "../../components/layout";

type Props = {
  title?: ReactNode;
  help?: ReactNode;
  isLoading?: boolean;
  onClose?: () => void;
};

export const VideoClubLayoutSubPage = ({
  title,
  help,
  onClose,
  isLoading,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <OverlayContainer>
      <Overlay />
      <Container>
        <AppLayoutHeader title={title} help={help} onClose={onClose} />
        <WindowContent>
          <LoaderContainer isLoading={isLoading}>
            <Hourglass size={64} style={{ zIndex: 2 }} />
          </LoaderContainer>
          {children}
        </WindowContent>
      </Container>
    </OverlayContainer>
  );
};

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

const LoaderContainer = styled.div<{ isLoading?: boolean }>`
  background: ${({ theme }) => theme.material};
  user-select: ${({ isLoading }) => (isLoading ? "auto" : "none")};
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
  transition: opacity 0.2s linear;
  z-index: 3;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled(Window)`
  padding: 2px 2px;
  z-index: 3;
  max-width: 960px;
  width: 100%;
  height: auto;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`;

const WindowContent = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;
  margin-right: 3px;
  margin-bottom: 2px;
`;
