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

export enum Role {
  EMPLOYEE = "employee",
  MANAGER = "manager",
  ADMIN = "admin",
}
