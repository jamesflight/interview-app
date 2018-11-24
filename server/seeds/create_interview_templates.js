
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('interview_templates').del()
    .then(function () {
      // Inserts seed entries
      return knex('interview_templates').insert([
        {id: 1, name: 'Exercise History'},
      ]);
    });
};
