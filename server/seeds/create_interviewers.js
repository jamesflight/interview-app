
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('interviewers').del()
    .then(function () {
      // Inserts seed entries
      return knex('interviewers').insert([
        {id: 1, name: 'James Flight'},
      ]);
    });
};
