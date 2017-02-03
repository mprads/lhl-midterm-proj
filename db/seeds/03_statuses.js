
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('statuses').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('statuses').insert({status_name: 'New'}),
        knex('statuses').insert({status_name: 'In Process'}),
        knex('statuses').insert({status_name: 'Ready'}),
        knex('statuses').insert({status_name: 'Fulfilled'})
      ]);
    });
};
