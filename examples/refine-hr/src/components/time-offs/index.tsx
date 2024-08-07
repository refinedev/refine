import { Avatar, AvatarGroup, Box, Tooltip, Typography } from "@mui/material";
import { Frame } from "@/components/frame";
import { TimeOffIcon } from "@/icons";
import { useList } from "@refinedev/core";
import { TimeOffStatus, type Employee, type TimeOff } from "@/types";
import dayjs from "dayjs";
import { useMemo } from "react";

const todayDayjs = dayjs();

export const TimeOffs = () => {
  const today = todayDayjs.utcOffset(0);
  const tomorrow = today.add(1, "day");
  const afterTomorrow = today.add(2, "day");

  const todayStart = today.startOf("day").toISOString();
  const todayEnd = today.endOf("day").toISOString();
  const tomorrowStart = tomorrow.startOf("day").toISOString();
  const tomorrowEnd = tomorrow.endOf("day").toISOString();
  const afterTomorrowStart = afterTomorrow.startOf("day").toISOString();
  const afterTomorrowEnd = afterTomorrow.endOf("day").toISOString();

  const afterTomorrowDateText = afterTomorrow.format("dddd, MMM mm");

  const { data } = useList<TimeOff & { employee: Employee }>({
    resource: "time-offs",
    pagination: { pageSize: 20000 },
    filters: [
      {
        field: "status",
        operator: "eq",
        value: TimeOffStatus.APPROVED,
      },
      // today time offs
      // {
      //   operator: "and",
      //   value: [
      //     {
      //       field: "startsAt",
      //       operator: "gte",
      //       value: todayStart,
      //     },
      //     {
      //       field: "endsAt",
      //       operator: "lte",
      //       value: afterTomorrowEnd,
      //     },
      //   ],
      // },
    ],
    meta: {
      join: ["employee"],
    },
  });

  const timeOffs = mockData || [];

  // const { afterTomorrowTimeOffs, todayTimeOffs, tomorrowTimeOffs } =
  //   useMemo(() => {
  //     const todayTimeOffs = timeOffs.filter(
  //       (timeOff) =>
  //         dayjs(timeOff.startsAt).isBetween(todayStart, todayEnd) ||
  //         dayjs(timeOff.endsAt).isBetween(todayStart, todayEnd),
  //     );

  //     const tomorrowTimeOffs = timeOffs.filter(
  //       (timeOff) =>
  //         dayjs(timeOff.startsAt).isBetween(tomorrowStart, tomorrowEnd) ||
  //         dayjs(timeOff.endsAt).isBetween(tomorrowStart, tomorrowEnd),
  //     );

  //     const afterTomorrowTimeOffs = timeOffs.filter(
  //       (timeOff) =>
  //         dayjs(timeOff.startsAt).isBetween(
  //           afterTomorrowStart,
  //           afterTomorrowEnd,
  //         ) ||
  //         dayjs(timeOff.endsAt).isBetween(afterTomorrowStart, afterTomorrowEnd),
  //     );

  //     return {
  //       todayTimeOffs,
  //       tomorrowTimeOffs,
  //       afterTomorrowTimeOffs,
  //     };
  //   }, [timeOffs]);

  const { afterTomorrowTimeOffs, todayTimeOffs, tomorrowTimeOffs } =
    useMemo(() => {
      const todayTimeOffs = mockData.slice(0, 16);

      const tomorrowTimeOffs = mockData.slice(0, 5);

      const afterTomorrowTimeOffs = timeOffs.slice(0, 2);

      return {
        todayTimeOffs,
        tomorrowTimeOffs,
        afterTomorrowTimeOffs,
      };
    }, [timeOffs]);

  return (
    <Frame title="Time Offs" icon={<TimeOffIcon />}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Today <span>({todayTimeOffs.length})</span>
        </Typography>
        <AvatarGroup
          max={10}
          sx={{
            marginTop: "8px",
          }}
        >
          {todayTimeOffs.map((timeOff) => (
            <Tooltip
              key={timeOff.id}
              title={`${timeOff.employee.firstName} ${timeOff.employee.lastName}`}
            >
              <Avatar src={timeOff.employee.avatarUrl} />
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "24px",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Tomorrow <span>({tomorrowTimeOffs.length})</span>
        </Typography>
        <AvatarGroup
          max={10}
          sx={{
            marginTop: "8px",
          }}
        >
          {tomorrowTimeOffs.map((timeOff) => (
            <Tooltip
              key={timeOff.id}
              title={`${timeOff.employee.firstName} ${timeOff.employee.lastName}`}
            >
              <Avatar src={timeOff.employee.avatarUrl} />
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "24px",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {afterTomorrowDateText} <span>({afterTomorrowTimeOffs.length})</span>
        </Typography>
        <AvatarGroup
          max={10}
          sx={{
            marginTop: "8px",
          }}
        >
          {afterTomorrowTimeOffs.map((timeOff) => (
            <Tooltip
              key={timeOff.id}
              title={`${timeOff.employee.firstName} ${timeOff.employee.lastName}`}
            >
              <Avatar src={timeOff.employee.avatarUrl} />
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>
    </Frame>
  );
};

const mockData = [
  {
    id: 104,
    createdAt: "2024-08-06T08:30:00.000Z",
    updatedAt: "2024-08-07T10:00:00.000Z",
    timeOffType: "Sick",
    startsAt: "2024-08-07",
    endsAt: "2024-08-07",
    notes: null,
    status: "Approved",
    employee: {
      id: 10,
      createdAt: "2023-09-01T08:00:00.000Z",
      updatedAt: "2024-08-07T11:30:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Angela-Martin.png",
      firstName: "Angela",
      lastName: "Martin",
      jobTitle: "Accountant",
      role: "Employee",
      email: "angela.martin@dundermifflin.com",
      address: "123 Paper Street, Scranton, PA",
      phone: "555-0122",
      birthdate: "1971-06-25",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 28,
    },
  },
  {
    id: 105,
    createdAt: "2024-08-06T09:00:00.000Z",
    updatedAt: "2024-08-07T11:00:00.000Z",
    timeOffType: "Sick",
    startsAt: "2024-08-07",
    endsAt: "2024-08-07",
    notes: null,
    status: "Approved",
    employee: {
      id: 11,
      createdAt: "2023-10-15T09:00:00.000Z",
      updatedAt: "2024-08-07T12:00:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Kevin-Malone.png",
      firstName: "Kevin",
      lastName: "Malone",
      jobTitle: "Accountant",
      role: "Employee",
      email: "kevin.malone@dundermifflin.com",
      address: "456 Beet Lane, Scranton, PA",
      phone: "555-0144",
      birthdate: "1968-06-01",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 29,
    },
  },
  {
    id: 106,
    createdAt: "2024-08-06T09:30:00.000Z",
    updatedAt: "2024-08-07T12:00:00.000Z",
    timeOffType: "Sick",
    startsAt: "2024-08-07",
    endsAt: "2024-08-07",
    notes: null,
    status: "Approved",
    employee: {
      id: 12,
      createdAt: "2023-11-25T09:30:00.000Z",
      updatedAt: "2024-08-07T12:30:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Pam-Beesly.png",
      firstName: "Pam",
      lastName: "Beesly",
      jobTitle: "Receptionist",
      role: "Employee",
      email: "pam.beesly@dundermifflin.com",
      address: "789 Jim Ave, Scranton, PA",
      phone: "555-0133",
      birthdate: "1979-03-25",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 25,
    },
  },
  {
    id: 107,
    createdAt: "2024-08-06T10:00:00.000Z",
    updatedAt: "2024-08-07T13:00:00.000Z",
    timeOffType: "Sick",
    startsAt: "2024-08-07",
    endsAt: "2024-08-07",
    notes: null,
    status: "Approved",
    employee: {
      id: 13,
      createdAt: "2023-12-05T10:00:00.000Z",
      updatedAt: "2024-08-07T13:30:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Jim-Halpert.png",
      firstName: "Jim",
      lastName: "Halpert",
      jobTitle: "Salesman",
      role: "Employee",
      email: "jim.halpert@dundermifflin.com",
      address: "111 Dwight St, Scranton, PA",
      phone: "555-0155",
      birthdate: "1978-10-01",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 27,
    },
  },
  {
    id: 108,
    createdAt: "2024-08-06T10:30:00.000Z",
    updatedAt: "2024-08-07T14:00:00.000Z",
    timeOffType: "Sick",
    startsAt: "2024-08-07",
    endsAt: "2024-08-07",
    notes: null,
    status: "Approved",
    employee: {
      id: 14,
      createdAt: "2024-01-15T10:30:00.000Z",
      updatedAt: "2024-08-07T14:30:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Stanley-Hudson.png",
      firstName: "Stanley",
      lastName: "Hudson",
      jobTitle: "Salesman",
      role: "Employee",
      email: "stanley.hudson@dundermifflin.com",
      address: "222 Ream Rd, Scranton, PA",
      phone: "555-0166",
      birthdate: "1958-02-19",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 30,
    },
  },
  {
    id: 109,
    createdAt: "2024-08-06T11:00:00.000Z",
    updatedAt: "2024-08-07T15:00:00.000Z",
    timeOffType: "Sick",
    startsAt: "2024-08-07",
    endsAt: "2024-08-07",
    notes: null,
    status: "Approved",
    employee: {
      id: 15,
      createdAt: "2024-02-20T11:00:00.000Z",
      updatedAt: "2024-08-07T15:30:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Phyllis-Vance.png",
      firstName: "Phyllis",
      lastName: "Vance",
      jobTitle: "Salesman",
      role: "Employee",
      email: "phyllis.vance@dundermifflin.com",
      address: "333 Grove St, Scranton, PA",
      phone: "555-0177",
      birthdate: "1961-07-10",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 29,
    },
  },
  {
    id: 110,
    createdAt: "2024-08-05T11:30:00.000Z",
    updatedAt: "2024-08-07T09:00:00.000Z",
    timeOffType: "Vacation",
    startsAt: "2024-08-07",
    endsAt: "2024-08-08",
    notes: null,
    status: "Approved",
    employee: {
      id: 16,
      createdAt: "2024-03-05T11:30:00.000Z",
      updatedAt: "2024-08-07T15:45:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Dwight-Schrute.png",
      firstName: "Dwight",
      lastName: "Schrute",
      jobTitle: "Salesman",
      role: "Assistant Regional Manager",
      email: "dwight.schrute@dundermifflin.com",
      address: "444 Farm Rd, Scranton, PA",
      phone: "555-0188",
      birthdate: "1970-01-20",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 28,
    },
  },
  {
    id: 111,
    createdAt: "2024-08-05T12:00:00.000Z",
    updatedAt: "2024-08-07T09:30:00.000Z",
    timeOffType: "Vacation",
    startsAt: "2024-08-07",
    endsAt: "2024-08-08",
    notes: null,
    status: "Approved",
    employee: {
      id: 17,
      createdAt: "2024-03-20T12:00:00.000Z",
      updatedAt: "2024-08-07T16:00:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Ryan-Howard.png",
      firstName: "Ryan",
      lastName: "Howard",
      jobTitle: "Temp",
      role: "Employee",
      email: "ryan.howard@dundermifflin.com",
      address: "555 Mobile Ave, Scranton, PA",
      phone: "555-0199",
      birthdate: "1985-03-05",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 30,
    },
  },
  {
    id: 112,
    createdAt: "2024-08-05T12:30:00.000Z",
    updatedAt: "2024-08-07T10:00:00.000Z",
    timeOffType: "Vacation",
    startsAt: "2024-08-07",
    endsAt: "2024-08-08",
    notes: null,
    status: "Approved",
    employee: {
      id: 18,
      createdAt: "2024-04-10T12:30:00.000Z",
      updatedAt: "2024-08-07T16:30:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Meredith-Palmer.png",
      firstName: "Meredith",
      lastName: "Palmer",
      jobTitle: "Supplier Relations",
      role: "Employee",
      email: "meredith.palmer@dundermifflin.com",
      address: "666 Front St, Scranton, PA",
      phone: "555-0200",
      birthdate: "1964-12-11",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 27,
    },
  },
  {
    id: 113,
    createdAt: "2024-08-05T13:00:00.000Z",
    updatedAt: "2024-08-07T10:30:00.000Z",
    timeOffType: "Vacation",
    startsAt: "2024-08-07",
    endsAt: "2024-08-08",
    notes: null,
    status: "Approved",
    employee: {
      id: 19,
      createdAt: "2024-04-25T13:00:00.000Z",
      updatedAt: "2024-08-07T17:00:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Kelly-Kapoor.png",
      firstName: "Kelly",
      lastName: "Kapoor",
      jobTitle: "Customer Service",
      role: "Employee",
      email: "kelly.kapoor@dundermifflin.com",
      address: "777 Service Ln, Scranton, PA",
      phone: "555-0211",
      birthdate: "1980-06-24",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 26,
    },
  },
  {
    id: 114,
    createdAt: "2024-08-05T13:30:00.000Z",
    updatedAt: "2024-08-07T11:00:00.000Z",
    timeOffType: "Sick",
    startsAt: "2024-08-07",
    endsAt: "2024-08-09",
    notes: null,
    status: "Approved",
    employee: {
      id: 20,
      createdAt: "2024-05-10T13:30:00.000Z",
      updatedAt: "2024-08-07T17:30:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Creed-Bratton.png",
      firstName: "Creed",
      lastName: "Bratton",
      jobTitle: "Quality Assurance",
      role: "Employee",
      email: "creed.bratton@dundermifflin.com",
      address: "888 Mystery St, Scranton, PA",
      phone: "555-0222",
      birthdate: "1943-02-08",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 24,
    },
  },
  {
    id: 115,
    createdAt: "2024-08-05T14:00:00.000Z",
    updatedAt: "2024-08-07T11:30:00.000Z",
    timeOffType: "Vacation",
    startsAt: "2024-08-08",
    endsAt: "2024-08-08",
    notes: null,
    status: "Approved",
    employee: {
      id: 21,
      createdAt: "2024-05-25T14:00:00.000Z",
      updatedAt: "2024-08-07T18:00:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Darryl-Philbin.png",
      firstName: "Darryl",
      lastName: "Philbin",
      jobTitle: "Warehouse Manager",
      role: "Employee",
      email: "darryl.philbin@dundermifflin.com",
      address: "999 Warehouse Way, Scranton, PA",
      phone: "555-0233",
      birthdate: "1971-06-15",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 30,
    },
  },
  {
    id: 116,
    createdAt: "2024-08-05T14:30:00.000Z",
    updatedAt: "2024-08-07T12:00:00.000Z",
    timeOffType: "Vacation",
    startsAt: "2024-08-08",
    endsAt: "2024-08-08",
    notes: null,
    status: "Approved",
    employee: {
      id: 22,
      createdAt: "2024-06-10T14:30:00.000Z",
      updatedAt: "2024-08-07T18:30:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Toby-Flenderson.png",
      firstName: "Toby",
      lastName: "Flenderson",
      jobTitle: "HR Representative",
      role: "Employee",
      email: "toby.flenderson@dundermifflin.com",
      address: "123 HR Ave, Scranton, PA",
      phone: "555-0244",
      birthdate: "1973-04-22",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 28,
    },
  },
  {
    id: 117,
    createdAt: "2024-08-05T15:00:00.000Z",
    updatedAt: "2024-08-07T12:30:00.000Z",
    timeOffType: "Vacation",
    startsAt: "2024-08-08",
    endsAt: "2024-08-08",
    notes: null,
    status: "Approved",
    employee: {
      id: 23,
      createdAt: "2024-06-25T15:00:00.000Z",
      updatedAt: "2024-08-07T19:00:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Holly-Flax.png",
      firstName: "Holly",
      lastName: "Flax",
      jobTitle: "HR Manager",
      role: "Manager",
      email: "holly.flax@dundermifflin.com",
      address: "456 HR Blvd, Scranton, PA",
      phone: "555-0255",
      birthdate: "1975-06-13",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 29,
    },
  },
  {
    id: 118,
    createdAt: "2024-08-05T15:30:00.000Z",
    updatedAt: "2024-08-07T13:00:00.000Z",
    timeOffType: "Vacation",
    startsAt: "2024-08-08",
    endsAt: "2024-08-08",
    notes: null,
    status: "Approved",
    employee: {
      id: 24,
      createdAt: "2024-07-10T15:30:00.000Z",
      updatedAt: "2024-08-07T19:30:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Jan-Levinson.png",
      firstName: "Jan",
      lastName: "Levinson",
      jobTitle: "Corporate Executive",
      role: "Manager",
      email: "jan.levinson@dundermifflin.com",
      address: "789 Corporate Rd, Scranton, PA",
      phone: "555-0266",
      birthdate: "1967-05-11",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 27,
    },
  },
  {
    id: 119,
    createdAt: "2024-08-05T16:00:00.000Z",
    updatedAt: "2024-08-07T13:30:00.000Z",
    timeOffType: "Sick",
    startsAt: "2024-08-05",
    endsAt: "2024-08-07",
    notes: null,
    status: "Approved",
    employee: {
      id: 25,
      createdAt: "2024-07-25T16:00:00.000Z",
      updatedAt: "2024-08-07T20:00:00.000Z",
      avatarUrl:
        "https://refine-hr-example.s3.eu-west-1.amazonaws.com/avatars/Michael-Scott.png",
      firstName: "Michael",
      lastName: "Scott",
      jobTitle: "Regional Manager",
      role: "Manager",
      email: "michael.scott@dundermifflin.com",
      address: "111 Managerial Ln, Scranton, PA",
      phone: "555-0277",
      birthdate: "1964-03-15",
      links: [],
      customFields: {},
      availableAnnualLeaveDays: 26,
    },
  },
];
