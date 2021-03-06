
exports.up = function(knex, Promise) {
    return knex.schema.createTable('interviewers', function (table) {
        table.increments('id');
        table.string('name');
        table.timestamps(false, true);
    })
    .then(() => {
        return knex.schema.createTable('interview_templates', function (table) {
            table.increments('id');
            table.string('name');
            table.timestamps(false, true);
        });
    })
    .then(() => {
        return knex.schema.createTable('interviews', function (table) {
            table.increments('id');
            table.integer('interview_template_id').unsigned();
            table.foreign('interview_template_id').references('interview_templates.id');
            table.timestamps(false, true);
        });
    })
    .then(() => {
        return knex.schema.createTable('interview_subjects', function (table) {
            table.increments('id');
            table.string('name');
            table.datetime('date_of_birth');
            table.string('gender');
            table.integer('interview_id').unsigned();
            table.foreign('interview_id').references('interviews.id');
            table.timestamps(false, true);
        });
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('interviewers')
    .then(() => {
        return knex.schema.dropTable('subjects');
    })
    .then(() => {
        return knex.schema.dropTable('interview_templates');
    });;
};
