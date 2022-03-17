import { CaretakerAlgorithmEnum } from './caretaker-algorithm-enum';
import { CaretakerTypeEnum } from './caretaker-type-enum';
export interface CaretakerAssessment {
  caretakerAssessmentId: number;
  levelOfNeeds: CaretakerAlgorithmEnum;
  caretakerType: CaretakerTypeEnum;
}
