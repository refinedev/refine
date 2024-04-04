import { useNavigate } from "react-router-dom";
import { useList, useTable } from "@refinedev/core";
import {
  Hourglass,
  Select,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "react95";
import { styled } from "styled-components";
import { VideoClubLayoutSubPage } from "../subpage-layout";
import { ITape, IVideoTitle } from "../../../interfaces";
import { Link } from "react-router-dom";
import { Pagination } from "../../../components/pagination";
import { findFilterFromCrudFilters } from "../../../utils/find-filter-from-crud-filters";

// fill with years from 1980 to current year
const OPTIONS_YEAR = Array.from(
  { length: new Date().getFullYear() - 1980 + 1 },
  (_, i) => 1980 + i,
).map((year) => ({
  label: year.toString(),
  value: year.toString(),
}));

export const VideoClubPageBrowseTitles = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: titlesQueryResult,
    pageCount,
    current,
    setCurrent,
    filters,
    setFilters,
  } = useTable<IVideoTitle>({
    resource: "titles",
  });

  const { data: dataTapes, isLoading: tapesIsLoading } = useList<ITape>({
    resource: "tapes",
    pagination: {
      mode: "off",
    },
  });

  const titles = titlesQueryResult?.data?.data || [];
  const titlesIsLoading = titlesQueryResult?.isLoading || false;
  const tapes = dataTapes?.data || [];
  const isLoading = titlesIsLoading || tapesIsLoading;

  return (
    <VideoClubLayoutSubPage
      isLoading={isLoading}
      title="Browse Titles"
      help={"You can browse all the titles in the Refine Video Club."}
      onClose={() => navigate("/video-club")}
    >
      <Container>
        <FilterContainer>
          <FilterInputContainer>
            <FilterInputLabel>Title:</FilterInputLabel>
            <FilterInputText
              defaultValue={
                findFilterFromCrudFilters({
                  field: "title",
                  filters,
                })?.value
              }
              onChange={(e) => {
                setFilters([
                  {
                    field: "title",
                    value: e.target.value,
                    operator: "contains",
                  },
                ]);
              }}
            />
          </FilterInputContainer>
          <FilterInputContainer>
            <FilterInputLabel>Movie ID:</FilterInputLabel>
            <FilterInputText
              defaultValue={
                findFilterFromCrudFilters({
                  field: "id",
                  filters,
                })?.value
              }
              onChange={(e) => {
                const value = e.target?.value?.trim();

                setFilters([
                  {
                    field: "id",
                    value: value ? Number(value) : null,
                    operator: "eq",
                  },
                ]);
              }}
            />
          </FilterInputContainer>
          <FilterInputContainer>
            <FilterInputLabel>Category:</FilterInputLabel>
            <FilterInputText />
          </FilterInputContainer>
          <FilterInputContainer>
            <FilterInputLabel>Year:</FilterInputLabel>
            <FilterInputSelect
              menuMaxHeight={160}
              defaultValue={
                findFilterFromCrudFilters({
                  field: "year",
                  filters,
                })?.value
              }
              onChange={(option) => {
                setFilters([
                  { field: "year", value: option?.value, operator: "eq" },
                ]);
              }}
              options={[{ label: "All", value: null }, ...OPTIONS_YEAR]}
            />
          </FilterInputContainer>
        </FilterContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>{""}</TableHeadCell>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Year</TableHeadCell>
              <TableHeadCell>Copies</TableHeadCell>
              <TableHeadCell>Earnings</TableHeadCell>
              <TableHeadCell>{}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              titles.map((title) => {
                const copies = tapes.filter(
                  (tape) => tape.title_id === title.id,
                );
                const atleastOneCopyAvailable = copies.some(
                  (copy) => copy.available,
                );

                return (
                  <TableRow key={title.id}>
                    <TableDataCell>
                      {atleastOneCopyAvailable ? (
                        ""
                      ) : (
                        <OutOfStockIcon
                          src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/error-icon.png"
                          alt="Out of Stock"
                          aria-label="out of stock"
                        />
                      )}
                    </TableDataCell>
                    <TableDataCell>{title.id}</TableDataCell>
                    <TableDataCell>{title.title}</TableDataCell>
                    <TableDataCell>{title.genres.join(", ")}</TableDataCell>
                    <TableDataCell>{title.year}</TableDataCell>
                    <TableDataCell>{copies.length}</TableDataCell>
                    <TableDataCell>$-1</TableDataCell>
                    <TableDataCell>
                      <Link to={`/video-club/titles/${title.id}`}>View</Link>
                    </TableDataCell>
                  </TableRow>
                );
              })}
            {isLoading && <Hourglass size={32} style={{}} />}
          </TableBody>
        </Table>
        <Pagination
          pageCount={pageCount}
          current={current}
          setCurrent={setCurrent}
        />
      </Container>
    </VideoClubLayoutSubPage>
  );
};

const Container = styled.div`
  padding: 16px 24px;
`;

const OutOfStockIcon = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: sub;
`;

const FilterContainer = styled.div`
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 372px 200px;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px 32px;
`;

const FilterInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterInputLabel = styled.div`
  width: 104px;
`;

const FilterInputText = styled(TextInput)`
    flex: 1;
`;

const FilterInputSelect = styled(Select)`
  flex: 1;
`;
