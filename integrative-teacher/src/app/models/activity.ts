export interface Activity {
  id?: string;
  integrativeTeacher?: string;
  description: string;
  goal: string;
  createdAt?: Date;
  startDate: Date;
  endDate: Date;
  executedDate?: Date;
  evidence: string;
  indicator: string;
  status?: string;
}
