export type JobStatus =
  | "applied"
  | "interview"
  | "offer"
  | "rejected"
  | "cold";

export interface JobApplication {
  _id: string;
  company: string;
  role: string;
  status: JobStatus;
  appliedDate: string;
  lastUpdated: string;
  notes?: string;
}