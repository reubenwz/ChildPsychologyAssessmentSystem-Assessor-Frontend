import { Organisation } from './organisation';
import { Assessment } from './assessment';
import { Client } from './client';
import { Certification } from './certification';

export interface Assessor {
  assessorId: number;
  organisation: Organisation;
  email: string;
  name: string;
  root: boolean;
  active: boolean;
  assessments?: Assessment[];
  clients?: Client[];
  supervisee?: Assessor[];
  supervisor?: Assessor;
  certificates?: Certification[];
}