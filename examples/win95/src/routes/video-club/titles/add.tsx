import { useNavigate } from "react-router-dom";
import { useShow } from "@refinedev/core";
import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import {
  Anchor,
  NumberInput,
  TableDataCell as DefaultTableDataCell,
  TableHeadCell as DefaultTableHeadCell,
  Button,
  TextInput,
  Separator,
  GroupBox,
} from "react95";
import { styled } from "styled-components";
import { VideoClubLayoutSubPage } from "../subpage-layout";
import { IExtendedVideoTitle, IMember, IRental } from "../../../interfaces";

dayjs.extend(durationPlugin);

export const VideoClubPageAddTitle = () => {
  const navigate = useNavigate();

  const {
    queryResult: { data, isLoading },
  } = useShow<
    Omit<IExtendedVideoTitle, "rentals"> & {
      rentals: Array<IRental & { member: IMember }>;
    }
  >({
    resource: "titles",
    meta: {
      select: "*, tapes(*), rentals(*, member:members(*))",
    },
  });

  return (
    <VideoClubLayoutSubPage
      title="Add Title"
      help={"You can add a new title to the video club from TMDB database."}
      onClose={() => navigate("/video-club")}
      containerStyle={{ minWidth: "800px" }}
    >
      <Container>
        <InfoDetails>
          <InfoBubble src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/info-bubble.png" />
          <InfoContent>
            <InfoLine>
              <span>{"Our inventory is provided by "}</span>
              <InfoAnchor href="https://www.themoviedb.org">
                {"The Movie DB "}
                <ExternalAnchorIcon src="https://refine.ams3.cdn.digitaloceanspaces.com/win95/external-icon.png" />
              </InfoAnchor>
            </InfoLine>
            <InfoLine>
              Please find the title from their catalog and paste the URL to the
              input below.
            </InfoLine>
          </InfoContent>
        </InfoDetails>
        <InputContainer>
          <InputLabel>TMDB URL:</InputLabel>
          <TMDBInput placeholder="e.g. https://www.themoviedb.org/movie/105" />
          <GoButton>GO</GoButton>
        </InputContainer>
        <TitleDetails disabled label="Title Details">
          <Poster
            src={`https://image.tmdb.org/t/p/w200${data?.data?.poster_path}`}
          />
          <DetailsContainer>
            <DetailItem>
              <DetailItemLabel>Title:</DetailItemLabel>
              <DetailItemValue style={{ fontWeight: "bold", color: "#000080" }}>
                {data?.data?.title}
              </DetailItemValue>
              {/* TODO: implement video player */}
              {/* <DetailItemTrailerButton>Watch Trailer</DetailItemTrailerButton> */}
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>ID:</DetailItemLabel>
              <DetailItemValue>{data?.data?.id}</DetailItemValue>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Category:</DetailItemLabel>
              <DetailItemValue>{data?.data?.genres.join(", ")}</DetailItemValue>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Year:</DetailItemLabel>
              <DetailItemValue>{data?.data?.year}</DetailItemValue>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Duration:</DetailItemLabel>
              <DetailItemValue>
                {dayjs
                  .duration(data?.data?.duration_minutes ?? 0, "minutes")
                  .format("H[h] m[m]")}
              </DetailItemValue>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Director:</DetailItemLabel>
              <DetailItemValue>{data?.data?.director}</DetailItemValue>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Cast:</DetailItemLabel>
              <DetailItemValue>{data?.data?.cast.join(", ")}</DetailItemValue>
            </DetailItem>
            <DetailItem>
              <DetailItemLabel>Overview:</DetailItemLabel>
              <DetailItemValue>{data?.data?.overview}</DetailItemValue>
            </DetailItem>
          </DetailsContainer>
        </TitleDetails>
        <CopiesContainer>
          <CopiesLabel>Number of Copies:</CopiesLabel>
          <CopiesInput defaultValue={1} />
        </CopiesContainer>
        <Separator />
        <ButtonsContainer>
          <AddButton>Add Title</AddButton>
          <CancelButton onClick={() => navigate("/video-club/titles")}>
            Cancel
          </CancelButton>
        </ButtonsContainer>
      </Container>
    </VideoClubLayoutSubPage>
  );
};

const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoDetails = styled(GroupBox)`
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfoBubble = styled.img`
  width: 64px;
  height: 64px;
`;

const InfoLine = styled.div`
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoAnchor = styled(Anchor)`
    font-weight: bold;
    text-decoration: none;
    color: #0000FF;
`;

const ExternalAnchorIcon = styled.img`
  width: 22px;
  height: 22px;
  display: inline-block;
  margin-bottom: -4px;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const InputLabel = styled.div`
  font-weight: bold;
  width: 88px;
  flex-shrink: 0;
`;

const TMDBInput = styled(TextInput)`
    flex: 1;
`;

const GoButton = styled(Button)`
    width: 72px;
    font-weight: bold;
`;

const TitleDetails = styled(GroupBox)`
  padding-top: 24px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  display: flex;
  gap: 32px;
`;

const Poster = styled.img`
  flex-shrink: 0;
  width: 200px;
  height: 300px;
  object-fit: contain;
  background-color: ${({ theme }) => theme.material};

  &::before {
    content: "";
    background-color: ${({ theme }) => theme.material};
    background-image: url("https://refine.ams3.cdn.digitaloceanspaces.com/win95/movie-poster-placeholder.png");
    background-size: 200px 300px;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 305px;
`;

const DetailItem = styled.div`
  display: flex;
  padding: 8px 0;
  justify-content: flex-start;
`;

const DetailItemLabel = styled.div`
  flex-shrink: 0;
  width: 88px;
  font-weight: bold;
  color: #707070;
`;

const DetailItemValue = styled.div`
  flex: 1;
`;

const CopiesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const CopiesLabel = styled.div``;

const CopiesInput = styled(NumberInput)`
  width: 80px;
  max-width: 80px;
  min-width: unset;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const AddButton = styled(Button)`
  min-width: 158px;
  font-weight: bold;
`;

const CancelButton = styled(Button)`
  width: 110px;
`;
