import { Assessor } from './assessor';
import { Assessment } from './assessment';
import { Caretaker } from './caretaker';

export interface Client {
  clientId: number;
  clientUniqueId: number;
  idNumber: string; // NRIC
  name: string;
  gender: string;
  dob: string;
  address: string;
  ethnicity: string;
  admissionType: string;
  placementType: string;
  accommodationStatus: string;
  accommodationType: string;
  educationLevel: string;
  currentOccupation: string;
  monthlyIncome: number;
  assessor?: Assessor;
  assessment?: Assessment[];
  caretakers?: Caretaker[];
  birthday: string | null;
}
