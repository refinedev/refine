import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";
import { Hourglass, Window } from "react95";
import { AppLayout, AppLayoutHeader } from "../../layout";

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
    <Overlay>
      {isLoading ? (
        <Hourglass size={64} />
      ) : (
        <Container>
          <AppLayoutHeader title={title} help={help} onClose={onClose} />
          {children}
        </Container>
      )}
    </Overlay>
  );
};

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-image: linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%);
  background-size: 10px 10px;
  background-position: bottom right, bottom 5px right 0, bottom 5px right -5px, bottom 0px right 5px;
`;

const Container = styled(Window)`
  z-index: 3;
  max-width: 960px;
  width: 100%;
  height: max-content;
`;
