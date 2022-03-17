import {Assessor} from "./assessor";

export interface Certification {
  certificationId: number;
  dateOfCert: string;
  vignette: number;
  recentScore: number;
  noOfTimesRecertified: number;
  assessor?: Assessor;
}
