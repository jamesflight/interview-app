import * as knex from 'knex';
import { CreateInterviewInput } from '../input/CreateInterviewInput';
import { merge } from 'ramda';

export const createInterview = async (knex: knex, input: CreateInterviewInput ) => {
    return await knex('interviews').insert({ interview_template_id: input.interview.interview_template.id })
    .returning('id')
    .then((ids: number[]) =>  {
        return knex('interview_subjects').insert(merge(input.interview.subject, { interview_id: ids[0] }))
        .then(() => {
            return { id: ids[0] };
        });
    });
};
