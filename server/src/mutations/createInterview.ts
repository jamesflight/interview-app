import { CreateInterviewInput } from "../input/CreateInterviewInput";
import { createInterview } from "../repository/createInterview";

export const createInterviewMutation = async (input: CreateInterviewInput , context) => {
    return await createInterview(context.knex, input);
};

export const createInterviewMutationQl = `
    type Mutation {
        createInterview(interview: CreateInterviewInput): Interview
    }
`;