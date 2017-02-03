
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('food_types').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('food_types').insert({name: 'Small Eats'}),
        knex('food_types').insert({name: 'Big Eats'}),
        knex('food_types').insert({name: 'Sweet Eats'}),
        knex('food_types').insert({name: 'Beverages'})
      ]);
    });
};
