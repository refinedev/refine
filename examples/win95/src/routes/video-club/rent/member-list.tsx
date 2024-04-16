import { useTable } from "@refinedev/core";
import { IExendedMember } from "../../../interfaces";
import { Pagination } from "../../../components/pagination";
import { findFilterFromCrudFilters } from "../../../utils/find-filter-from-crud-filters";
import { DangerIcon } from "../../../components/icons/danger-icon";
import { hasMemberUnreturnedTape } from "../../../utils/has-member-unreturned-tabes";
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
} from "../../../components/table";

type Props = {
  selectedMember?: IExendedMember | null;
  onMemberSelect: (member: IExendedMember) => void;
};

export const VideoClubPageTapeRentMemberList = ({
  selectedMember,
  onMemberSelect,
}: Props) => {
  const {
    tableQueryResult: membersQueryResult,
    pageCount,
    current,
    setCurrent,
    filters,
    setFilters,
  } = useTable<IExendedMember>({
    syncWithLocation: false,
    resource: "members",
    meta: {
      select: "*, rentals(*)",
    },
  });

  const members = membersQueryResult?.data?.data || [];

  return (
    <TableContainer>
      <TableFilterContainer>
        <TableFilterInputContainer>
          <TableFilterInputLabel>First Name:</TableFilterInputLabel>
          <TableFilterInputText
            defaultValue={
              findFilterFromCrudFilters({
                field: "first_name",
                filters,
              })?.value
            }
            onChange={(e) => {
              setCurrent(1);
              setFilters([
                {
                  field: "first_name",
                  value: e.target.value,
                  operator: "contains",
                },
              ]);
            }}
          />
        </TableFilterInputContainer>
        <TableFilterInputContainer>
          <TableFilterInputLabel>Last Name:</TableFilterInputLabel>
          <TableFilterInputText
            defaultValue={
              findFilterFromCrudFilters({
                field: "last_name",
                filters,
              })?.value
            }
            onChange={(e) => {
              setCurrent(1);
              setFilters([
                {
                  field: "last_name",
                  value: e.target.value,
                  operator: "contains",
                },
              ]);
            }}
          />
        </TableFilterInputContainer>
        <TableFilterInputContainer>
          <TableFilterInputLabel>Member ID:</TableFilterInputLabel>
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
          <TableFilterInputLabel>Phone Number:</TableFilterInputLabel>
          <TableFilterInputText
            defaultValue={
              findFilterFromCrudFilters({
                field: "phone",
                filters,
              })?.value
            }
            onChange={(e) => {
              setCurrent(1);
              setFilters([
                {
                  field: "phone",
                  value: e.target.value,
                  operator: "contains",
                },
              ]);
            }}
          />
        </TableFilterInputContainer>
      </TableFilterContainer>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell $width={24} $px={5}>
              {""}
            </TableHeadCell>
            <TableHeadCell $width={64}>ID</TableHeadCell>
            <TableHeadCell $width={190}>Firt Name</TableHeadCell>
            <TableHeadCell $width={190}>Last Name</TableHeadCell>
            <TableHeadCell $width={140}>Phone</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ height: "340px" }}>
          {members.map((member) => {
            return (
              <TableRow
                key={member.id}
                $selected={selectedMember?.id === member.id}
                onClick={() => onMemberSelect(member)}
              >
                <TableDataCell $px={5} $width={24}>
                  {hasMemberUnreturnedTape({
                    member,
                  }) ? (
                    <DangerIcon message="Member has unreturned tape(s)" />
                  ) : null}
                </TableDataCell>
                <TableDataCell $width={64}>{member.id}</TableDataCell>
                <TableDataCell $width={190}>{member.first_name}</TableDataCell>
                <TableDataCell $width={190}>{member.last_name}</TableDataCell>
                <TableDataCell $width={140}>{member.phone}</TableDataCell>
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
