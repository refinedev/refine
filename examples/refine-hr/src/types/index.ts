export type ResponseLogin = {
  user: Employee;
  accessToken: string;
  refreshToken: string;
};

export type Employee = {
  id: number;
  createdAt: string;
  updatedAt: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  role: string;
  email: string;
  address: string;
  phone: string;
  birthdate: string;
  links: UserLinks;
  customFields: CustomFields;
  availableAnnualLeaveDays: number;
};

export type UserLinks = Array<any>;

export type CustomFields = {};

export type Notification = {
  id: number;
  createdAt: string;
  updatedAt: string;
  message: string;
  source: NotificationSource;
  status: NotificationStatus;
};

export type TimeOff = {
  id: number;
  createdAt: string;
  updatedAt: string;
  timeOffType: string;
  startsAt: string;
  endsAt: string;
  notes: string | null;
  status: TimeOffStatus;
};

export type Poll = {
  id: number;
  createdAt: string;
  updatedAt: string;
  question: string;
  options: PollOption[];
  status: PollStatus;
  endedAt: string | null;
  highestVotedAnswer: string | null;
};

export type PollOption = {
  id: number;
  order: number;
  text: string;
};

export type PollAnswer = {
  id: number;
  createdAt: string;
  updatedAt: string;
  optionId: PollOption["id"];
};

export enum Role {
  MANAGER = "Manager",
  EMPLOYEE = "Employee",
}

export enum NotificationSource {
  TIME_OFF = "time_off",
  ASSET = "asset",
  EXPENSE = "expense",
}

export enum NotificationStatus {
  SUCCESS = "Success",
  FAILURE = "Failure",
}

export enum TimeOffStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export enum timeOffType {
  ANNUAL = "Annual",
  SICK = "Sick",
  CASUAL = "Casual",
}

export enum PollStatus {
  ACTIVE = "Active",
  ENDED = "Ended",
}

export enum ExpenseStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  DECLINED = "Declined",
}

export enum AssetStatus {
  AVAILABLE = "Available",
  ASSIGNED = "Assigned",
}
