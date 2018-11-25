export class CreateInterviewInput {
    interview: {
        subject: {
            name: string;
            date_of_birth: string;
            gender: string;
        };
        interview_template: {
            id: number;
        };
    }
}

export const CreateInterviewInputQl = `
    input CreateInterviewInput_Subject {
        name: String
        date_of_birth: String
        gender: String
    }

    input CreateInterviewInput_InterviewTemplate {
        id: Int
    }

    input CreateInterviewInput {
        id: Int
        subject: CreateInterviewInput_Subject
        interview_template: CreateInterviewInput_InterviewTemplate
    }
`;