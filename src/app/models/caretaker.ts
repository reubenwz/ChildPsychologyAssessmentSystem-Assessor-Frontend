import { Client } from './client';

export interface Caretaker {
  caretakerId: number;
  caretakerUniqueId: number;
  name: string;
  idNumber: string;
  gender: string;
  dob: string;
  relationshipToClient: string;
  address: string;
  educationLevel: string;
  currentOccupation: string;
  monthlyIncome: number;
  accommodationStatus: string;
  accommodationType: string;
  active: boolean;
  client?: Client;
}
