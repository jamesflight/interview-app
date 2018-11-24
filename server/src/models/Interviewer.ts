export class Interviewer {
    id: number;
    name: string;
}

export const InterviewerQl = `
    type Interviewer {
        id: Int
        name: String
    }
`;