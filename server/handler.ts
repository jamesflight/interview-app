import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { graphql, buildSchema } from "graphql";
import { InterviewerQl } from './src/models/Interviewer';
import { InterviewTemplateQl } from './src/models/InterviewTemplate';
import { interviewersResolver } from './src/resolvers/interviewersResolver';
import { interviewTemplatesResolver } from './src/resolvers/interviewTemplatesResolver';

export const graphqlEndpoint: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context) => {
    var schema = buildSchema(`
        type Query {
            interviewers: [Interviewer]
            interview_templates: [InterviewTemplate]
        }
        ${InterviewerQl}
        ${InterviewTemplateQl}
    `);

    var root = {
        interviewers: interviewersResolver,
        interview_templates: interviewTemplatesResolver
    };

    return await graphql(schema, event.queryStringParameters['query'], root).then((response): APIGatewayProxyResult => {
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        }
    });
}
