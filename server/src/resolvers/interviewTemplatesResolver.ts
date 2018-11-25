export const interviewTemplatesResolver = (obj, context) => {
    return context.knex.select('id', 'name').from('interview_templates')
        .then((results) => {
            return results;
        });
};