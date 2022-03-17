import { Caretaker } from "src/app/models/caretaker";
import { CareTakerQuestionResponse } from "./CareTakerQuestionResponseInterface";

export interface CareTakerAssessmentResponse {
    caretaker: Caretaker;
    caretakerAssessmentId: number;
    caretakerResponses: any[];
    caretakerType: string;
    levelOfNeeds: string;
}