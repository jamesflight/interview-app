import { GraphQLResolveInfo } from "graphql";

export const interviewersResolver = (obj, context) => {
    return context.knex.select('id', 'name').from('interviewers')
        .then((results) => {
            return results;
        });
};