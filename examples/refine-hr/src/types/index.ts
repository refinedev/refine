export type ResponseLogin = {
  user: {
    id: number;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    role: string;
    email: string;
    address: string;
    phone: string;
    birthdate: string;
    links: Array<any>;
    customFields: {};
    availableAnnualLeaveDays: number;
  };
  accessToken: string;
  refreshToken: string;
};

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
