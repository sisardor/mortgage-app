import { Applicant } from "./Applicant";

export type Application = {
  readonly id: string;
  token: string;
  type: "NEW" | "RENEWAL" | "REFINANCE";
  applicants: Applicant[];
  productId?: number;
  readonly createdAt: string;
};