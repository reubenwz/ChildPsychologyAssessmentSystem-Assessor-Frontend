import { AssessmentStatusEnum } from './assessment-status-enum';
import { AssessmentReasonEnum } from './assessment-reason-enum';
import { Assessor } from './assessor';
import { Client } from './client';

export interface AssessmentStripped {
  assessmentId: number;
  assessmentUniqueId: number;
  assessmentDate: string;
  status?: AssessmentStatusEnum;
  reason?: AssessmentReasonEnum;
  approvedDate?: string;
  loc?: number;
  assessor: Assessor;
  client: Client;
}
