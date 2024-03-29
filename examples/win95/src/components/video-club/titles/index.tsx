import { useNavigate } from "react-router-dom";
import { useList, useTable } from "@refinedev/core";
import {
  Hourglass,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "react95";
import { styled } from "styled-components";
import { VideoClubLayoutSubPage } from "../layout-subpage";
import { IVideoTitle } from "../../../interfaces";
import { Link } from "react-router-dom";
import { Pagination } from "../../pagination";

export const VideoClubPageBrowseTitles = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: titlesQueryResult,
    pageCount,
    current,
    setCurrent,
  } = useTable<IVideoTitle>({
    resource: "titles",
  });

  const { data: dataTapes, isLoading: tapesIsLoading } = useList({
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
                          src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/danger-icon.png"
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
