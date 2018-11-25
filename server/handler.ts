import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { graphql, buildSchema, Source } from "graphql";
import { InterviewerQl } from './src/models/Interviewer';
import { InterviewTemplateQl } from './src/models/InterviewTemplate';
import { interviewersResolver } from './src/resolvers/interviewersResolver';
import { interviewTemplatesResolver } from './src/resolvers/interviewTemplatesResolver';
import { getKnex } from './src/util/getKnex';
import { createInterviewMutationQl, createInterviewMutation } from './src/mutations/createInterview';
import { CreateInterviewInputQl } from './src/input/CreateInterviewInput';
import { InterviewQl } from './src/models/Interview';

export const graphqlEndpoint: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context) => {
    var schema = buildSchema(`
        type Query {
            interviewers: [Interviewer]
            interview_templates: [InterviewTemplate]
        }
        ${InterviewerQl}
        ${InterviewTemplateQl}
        ${InterviewQl}
        ${CreateInterviewInputQl}
        ${createInterviewMutationQl}
    `);
        
    var root = {
        interviewers: interviewersResolver,
        interview_templates: interviewTemplatesResolver,
        createInterview: createInterviewMutation
    };

    const body = JSON.parse(event.body);
    const vars = body && body.hasOwnProperty('variables') ? body['variables'] : {};
    
    return await graphql(schema, event.httpMethod === 'GET' ? event.queryStringParameters['query'] : body['query'], root, { knex: getKnex() }, vars).then((response): APIGatewayProxyResult => {
        console.log(response);
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        }
    });
}
