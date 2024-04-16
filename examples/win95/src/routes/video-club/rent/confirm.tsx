import styled from "styled-components";
import { GroupBox, Select, Separator, TextInput } from "react95";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { useList, useMany } from "@refinedev/core";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "../../../components/table";
import {
  IExendedMember,
  IExtendedVideoTitle,
  ITape,
  IVideoTitle,
} from "../../../interfaces";
import { DangerIcon } from "../../../components/icons/danger-icon";
import { ImagePixelated } from "../../../components/image-pixelated";

type Props = {
  member: IExendedMember | null;
  title: IExtendedVideoTitle | null;
};

export const VideoClubPageTapeRentConfirm = ({ member, title }: Props) => {
  return (
    <Container>
      <MemberDetails member={member} />
      <TitleDetails title={title} member={member} />
    </Container>
  );
};

const MemberDetails = ({ member }: { member: IExendedMember | null }) => {
  return (
    <StyledGroupBox label="Member">
      <ImageMember src={member?.photo_url} />
      <ContainerInfo>
        <Grid>
          <Row>
            <Label>Name:</Label>
            <Value>
              {member?.first_name}
              {member?.last_name}
            </Value>
          </Row>
          <Row>
            <Label>Phone:</Label>
            <Value>{member?.phone}</Value>
          </Row>
        </Grid>
        <TableCurrentRentals member={member} />
      </ContainerInfo>
    </StyledGroupBox>
  );
};

const TableCurrentRentals = ({ member }: { member: IExendedMember | null }) => {
  const currentRentals = member?.rentals.filter(
    (rental) => !rental.returned_at,
  );

  const { data } = useMany<IVideoTitle>({
    resource: "titles",
    ids: currentRentals?.map((rental) => rental.title_id) || [],
    queryOptions: {
      enabled: !!currentRentals,
    },
    meta: {
      select: "*",
    },
  });
  const titles = data?.data || [];

  return (
    <>
      <Label
        style={{
          marginTop: "32px",
          marginBottom: "8px",
        }}
      >
        Current Rentals:
      </Label>
      {!currentRentals?.length ? (
        <TextInput
          style={{
            width: "654px",
          }}
          value="No current rentals"
          disabled
        />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell $width={24} $px={5}>
                {""}
              </TableHeadCell>
              <TableHeadCell $width={92}>ID</TableHeadCell>
              <TableHeadCell $width={80}>Tape ID</TableHeadCell>
              <TableHeadCell $width={248}>Movie Title</TableHeadCell>
              <TableHeadCell $width={128}>Return Date</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ maxHeight: "170px" }}>
            {member?.rentals.map((rental) => {
              if (rental.returned_at) return null;
              const isOverdue = dayjs().isAfter(
                dayjs(rental.expected_return_at),
              );

              return (
                <TableRow key={rental.id}>
                  <TableDataCell $px={5} $width={24}>
                    {isOverdue ? <DangerIcon message="Overdue!" /> : null}
                  </TableDataCell>
                  <TableDataCell $width={92}>{rental.id}</TableDataCell>
                  <TableDataCell $width={80}>{rental.tape_id}</TableDataCell>
                  <TableDataCell $width={248}>
                    {
                      titles.find((title) => title.id === rental.title_id)
                        ?.title
                    }
                  </TableDataCell>
                  <TableDataCell $width={128}>
                    {rental.expected_return_at}
                  </TableDataCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

const TitleDetails = ({
  member,
  title,
}: {
  member: IExendedMember | null;
  title: IExtendedVideoTitle | null;
}) => {
  return (
    <StyledGroupBox label="Title">
      <ImageTitle
        src={`https://image.tmdb.org/t/p/w185/${title?.poster_path}`}
      />
      <ContainerInfo>
        <Grid>
          <Row>
            <Label>Title:</Label>
            <Value>{title?.title}</Value>
          </Row>
          <Row>
            <Label>Year:</Label>
            <Value>{title?.year}</Value>
          </Row>
          <Row>
            <Label>Category:</Label>
            <Value>{title?.genres.join(", ")}</Value>
          </Row>
          <Row>
            <Label>Movie ID:</Label>
            <Value>{title?.id}</Value>
          </Row>
        </Grid>
        <Separator
          style={{
            marginTop: "24px",
            marginBottom: "24px",
          }}
        />
        <RentTape member={member} title={title} />
      </ContainerInfo>
    </StyledGroupBox>
  );
};

const RentTape = ({
  member,
  title,
}: {
  member: IExendedMember | null;
  title: IExtendedVideoTitle | null;
}) => {
  const { data: dataTapes } = useList<ITape>({
    resource: "tapes",
    filters: [
      {
        field: "title_id",
        operator: "eq",
        value: title?.id,
      },
      {
        field: "available",
        operator: "eq",
        value: true,
      },
    ],
    meta: {
      select: "*",
    },
  });
  const tapes = dataTapes?.data || [];
  const tapeOptions = tapes.map((tape) => ({
    value: tape.id,
    label: tape.id.toString(),
  }));
  const periodOptions = Array.from({ length: 7 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Nights`,
  }));

  const {
    control,
    watch,
    refineCore: { onFinish },
    handleSubmit,
  } = useForm({
    defaultValues: {
      tape_id: tapeOptions?.[0]?.value,
      period: periodOptions?.[0]?.value,
    },
    refineCoreProps: {
      resource: "rentals",
      action: "create",
    },
  });

  const period = watch<"period">("period");
  const returnDate = dayjs().add(period, "day").format("DD.MM.YYYY");

  return (
    <RentTapeForm
      id="rent-tape-form"
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("submitting form");
      }}
    >
      <Grid>
        <FormRow>
          <FormLabel>Tape ID:</FormLabel>
          <FormValue>
            <Controller
              control={control}
              name="tape_id"
              render={({ field }) => (
                <Select
                  width={"100%"}
                  options={tapeOptions}
                  menuMaxHeight={200}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                />
              )}
            />
          </FormValue>
        </FormRow>
        <FormRow>
          <Label>Nightly Fee:</Label>
          <Value>$5,00</Value>
        </FormRow>
        <FormRow>
          <FormLabel>Period</FormLabel>
          <FormValue>
            <Controller
              control={control}
              name="period"
              render={({ field }) => {
                return (
                  <Select
                    width={"100%"}
                    options={periodOptions}
                    menuMaxHeight={200}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                  />
                );
              }}
            />
          </FormValue>
        </FormRow>
        <FormRow>
          <Label>Return Date:</Label>
          <Value>{returnDate}</Value>
        </FormRow>
      </Grid>
    </RentTapeForm>
  );
};

const RentTapeForm = styled.form``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StyledGroupBox = styled(GroupBox)`
  display: flex;
  padding: 24px 8px;
  gap: 32px;
`;

const ImageMember = styled(ImagePixelated)`
  width: 200px;
  height: 200px;
  aspect-ratio: 200 / 200;
  object-fit: cover;
`;

const ImageTitle = styled(ImagePixelated)`
  width: 200px;
  height: 300px;
  aspect-ratio: 200 / 300;
  object-fit: cover;
`;

const ContainerInfo = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Label = styled.div`
  min-width: 80px;
  white-space: nowrap;
  font-weight: bold;
`;

const Value = styled.div``;

const FormRow = styled(Row)`
  align-items: center;
`;

const FormLabel = styled(Label)``;

const FormValue = styled(Value)`
  width: 104px;
`;
