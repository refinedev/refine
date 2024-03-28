import { useNavigate } from "react-router-dom";
import { useList, useTable } from "@refinedev/core";
import {
  Anchor,
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
  const { tableQueryResult, pageCount, pageSize, current, setCurrent } =
    useTable<IVideoTitle>({
      resource: "titles",
    });
  const titles = tableQueryResult?.data?.data || [];
  const titleCount = tableQueryResult?.data?.total || 0;
  const isLoading = tableQueryResult?.isLoading || false;

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
                return (
                  <TableRow key={title.id}>
                    <TableDataCell>{}</TableDataCell>
                    <TableDataCell>{title.id}</TableDataCell>
                    <TableDataCell>{title.title}</TableDataCell>
                    <TableDataCell>{title.genres.join(", ")}</TableDataCell>
                    <TableDataCell>{title.year}</TableDataCell>
                    <TableDataCell>5</TableDataCell>
                    <TableDataCell>$100</TableDataCell>
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
          total={titleCount}
          pageSize={pageSize}
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
