import { Dispatch, SetStateAction, useState } from "react";
import { Button, Frame, TextInput } from "react95";
import styled from "styled-components";

type Props = {
  total: number;
  pageSize: number;
  pageCount: number;
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
};

export const Pagination = ({
  current,
  pageSize,
  pageCount,
  total,
  setCurrent,
}: Props) => {
  const handleCurrentValueChange = (value: string) => {
    // is number
    if (!value.trim() || Number.isNaN(Number(value))) {
      return;
    }

    setCurrent(Number(value));
  };

  return (
    <Container>
      Page:
      <div>
        <StyledButton
          onClick={() => {
            setCurrent(1);
          }}
        >
          First
        </StyledButton>
        <StyledButton
          onClick={() => {
            setCurrent((prev) => prev - 1);
          }}
        >
          Prev
        </StyledButton>
      </div>
      <TextInput
        style={{
          width: 48,
          textAlign: "end",
        }}
        value={current}
        onChange={(e) => handleCurrentValueChange(e.target.value)}
      />
      <div>
        <StyledButton
          onClick={() => {
            setCurrent((prev) => prev + 1);
          }}
        >
          Next
        </StyledButton>
        <StyledButton
          onClick={() => {
            setCurrent(total);
          }}
        >
          Last
        </StyledButton>
      </div>
      <div>
        <span>of {pageCount}</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  &:active {
    padding-top: 0 !important;
  }
`;
