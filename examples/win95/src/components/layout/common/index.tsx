import { PropsWithChildren } from "react";
import styled from "styled-components";
import { ScrollView } from "react95";
import { TaskBar } from "@/components/taskbar";

export const CommonLayout = ({ children }: PropsWithChildren) => {
  return (
    <Screen>
      <Container>
        {children}
        <TaskBar />
      </Container>
    </Screen>
  );
};

const Screen = styled(ScrollView)`
  overflow: auto;
  padding: 0 !important;
  border: 0;
  &::before {
    content: unset;
  }

  & > div {
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 1280px;
  min-height: 780px;
  height: 100dvh;
  width: 100%;
  padding: 0;
`;
