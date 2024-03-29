import { Dispatch, SetStateAction, useState } from "react";
import { Button, Frame, TextInput } from "react95";
import styled from "styled-components";
import { IconPaginationGoToFirst } from "../icons/pagination-go-to-first";
import { IconPaginationPrev } from "../icons/pagination-prev";
import { IconPaginationNext } from "../icons/pagination-next";
import { IconPaginationGoToLast } from "../icons/pagination-go-to-last";
import { theme } from "../../providers/theme-provider";

type Props = {
  pageCount: number;
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
};

export const Pagination = ({ current, pageCount, setCurrent }: Props) => {
  const handleCurrentValueChange = (value: string) => {
    // is number
    if (!value.trim() || Number.isNaN(Number(value))) {
      return;
    }

    setCurrent(Number(value));
  };

  const isPrevDisabled = current === 1;
  const isGoToFirstDisabled = isPrevDisabled;
  const isNextDisabled = current === pageCount;
  const isGoToLastDisabled = isNextDisabled;

  return (
    <Container>
      Page:
      <div>
        <StyledButton
          disabled={isGoToFirstDisabled}
          onClick={() => {
            setCurrent(1);
          }}
        >
          <IconPaginationGoToFirst />
        </StyledButton>
        <StyledButton
          disabled={isPrevDisabled}
          onClick={() => {
            setCurrent((prev) => prev - 1);
          }}
        >
          <IconPaginationPrev />
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
          disabled={isNextDisabled}
          onClick={() => {
            setCurrent((prev) => prev + 1);
          }}
        >
          <IconPaginationNext />
        </StyledButton>
        <StyledButton
          disabled={isGoToLastDisabled}
          onClick={() => {
            setCurrent(pageCount);
          }}
        >
          <IconPaginationGoToLast />
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
