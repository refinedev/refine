import { useTable } from "@refinedev/core";
import styled from "styled-components";
import { Pagination } from "../../../components/pagination";
import { DangerIcon } from "../../../components/icons/danger-icon";
import {
  Table,
  TableBody,
  TableContainer,
  TableHeadCell,
  TableRow,
  TableDataCell,
  TableHead,
  TableFilterContainer,
  TableFilterInputContainer,
  TableFilterInputLabel,
  TableFilterInputText,
  TableFilterInputSelect,
} from "../../../components/table";
import { OPTIONS_YEAR } from "../../../utils/options-year";
import { findFilterFromCrudFilters } from "../../../utils/find-filter-from-crud-filters";
import { IExtendedVideoTitle } from "../../../interfaces";

type Props = {
  selectedTitle?: IExtendedVideoTitle | null;
  onTitleSelect: (title: IExtendedVideoTitle) => void;
};

export const VideoClubPageTapeRentTitleList = ({
  onTitleSelect,
  selectedTitle,
}: Props) => {
  const {
    tableQueryResult: titlesQueryResult,
    pageCount,
    current,
    setCurrent,
    filters,
    setFilters,
  } = useTable<IExtendedVideoTitle>({
    syncWithLocation: false,
    resource: "titles",
    meta: {
      select: "*, tapes(*), rentals(*)",
    },
  });

  const titles = titlesQueryResult?.data?.data || [];

  return (
    <TableContainer>
      <StyledTableFilterContainer>
        <TableFilterInputContainer>
          <TableFilterInputLabel>Title:</TableFilterInputLabel>
          <TableFilterInputText
            defaultValue={
              findFilterFromCrudFilters({
                field: "title",
                filters,
              })?.value
            }
            onChange={(e) => {
              setCurrent(1);
              setFilters([
                {
                  field: "title",
                  value: e.target.value,
                  operator: "contains",
                },
              ]);
            }}
          />
        </TableFilterInputContainer>
        <TableFilterInputContainer>
          <TableFilterInputLabel>Movie ID:</TableFilterInputLabel>
          <TableFilterInputText
            defaultValue={
              findFilterFromCrudFilters({
                field: "id",
                filters,
              })?.value
            }
            onChange={(e) => {
              const value = e.target?.value?.trim();
              setCurrent(1);
              setFilters([
                {
                  field: "id",
                  value: value ? Number(value) : null,
                  operator: "eq",
                },
              ]);
            }}
          />
        </TableFilterInputContainer>
        <TableFilterInputContainer>
          <TableFilterInputLabel>Category:</TableFilterInputLabel>
          <TableFilterInputText
            defaultValue={
              findFilterFromCrudFilters({
                field: "genres",
                filters,
              })?.value
            }
            onChange={(e) => {
              const value = e.target?.value?.trim();
              setCurrent(1);
              setFilters([
                {
                  field: "genres",
                  value: value.split(",").map((v) => v.trim()),
                  operator: "contains",
                },
              ]);
            }}
          />
        </TableFilterInputContainer>
        <TableFilterInputContainer>
          <TableFilterInputLabel>Year:</TableFilterInputLabel>
          <TableFilterInputSelect
            menuMaxHeight={160}
            defaultValue={
              findFilterFromCrudFilters({
                field: "year",
                filters,
              })?.value
            }
            onChange={(option) => {
              setCurrent(1);
              setFilters([
                { field: "year", value: option?.value, operator: "eq" },
              ]);
            }}
            options={[{ label: "All", value: null }, ...OPTIONS_YEAR]}
          />
        </TableFilterInputContainer>
      </StyledTableFilterContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell $width={24} $px={5}>
              {""}
            </TableHeadCell>
            <TableHeadCell $width={64}>ID</TableHeadCell>
            <TableHeadCell $width={240}>Title</TableHeadCell>
            <TableHeadCell $width={220}>Category</TableHeadCell>
            <TableHeadCell $width={60}>Year</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ height: "340px" }}>
          {titles.map((title) => {
            const atleastOneCopyAvailable = title.tapes.some(
              (copy) => copy.available,
            );

            return (
              <TableRow
                key={title.id}
                $selected={selectedTitle?.id === title.id}
                onClick={() => onTitleSelect(title)}
              >
                <TableDataCell $px={5} $width={24}>
                  {atleastOneCopyAvailable ? (
                    ""
                  ) : (
                    <DangerIcon message="Out of Stock" />
                  )}
                </TableDataCell>
                <TableDataCell $width={64}>{title.id}</TableDataCell>
                <TableDataCell $width={240}>{title.title}</TableDataCell>
                <TableDataCell $width={220} title={title.genres.join(", ")}>
                  {title.genres.join(", ")}
                </TableDataCell>
                <TableDataCell $width={60}>{title.year}</TableDataCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination
        pageCount={pageCount}
        current={current}
        setCurrent={setCurrent}
      />
    </TableContainer>
  );
};

const StyledTableFilterContainer = styled(TableFilterContainer)`
  grid-template-columns: 372px 200px;
`;
