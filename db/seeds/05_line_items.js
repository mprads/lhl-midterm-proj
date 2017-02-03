
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('line_items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('line_items').insert({order_id: 1, item_id: 1, quantity: 2}),
        knex('line_items').insert({order_id: 1, item_id: 2, quantity: 1}),
        knex('line_items').insert({order_id: 1, item_id: 3, quantity: 3}),
        knex('line_items').insert({order_id: 1, item_id: 4, quantity: 4}),
        knex('line_items').insert({order_id: 1, item_id: 5, quantity: 1}),
        knex('line_items').insert({order_id: 1, item_id: 6, quantity: 3}),
        knex('line_items').insert({order_id: 1, item_id: 7, quantity: 4}),
        knex('line_items').insert({order_id: 2, item_id: 8, quantity: 5}),
        knex('line_items').insert({order_id: 2, item_id: 9, quantity: 6}),
        knex('line_items').insert({order_id: 2, item_id: 10, quantity: 3}),
        knex('line_items').insert({order_id: 3, item_id: 11, quantity: 2}),
        knex('line_items').insert({order_id: 3, item_id: 12, quantity: 1}),
        knex('line_items').insert({order_id: 3, item_id: 13, quantity: 1}),
        knex('line_items').insert({order_id: 3, item_id: 14, quantity: 1}),
        knex('line_items').insert({order_id: 3, item_id: 15, quantity: 1}),
        knex('line_items').insert({order_id: 3, item_id: 16, quantity: 2}),
        knex('line_items').insert({order_id: 3, item_id: 17, quantity: 3}),
        knex('line_items').insert({order_id: 3, item_id: 2, quantity: 4}),
        knex('line_items').insert({order_id: 4, item_id: 4, quantity: 2}),
        knex('line_items').insert({order_id: 4, item_id: 6, quantity: 1}),
        knex('line_items').insert({order_id: 4, item_id: 8, quantity: 1}),
        knex('line_items').insert({order_id: 4, item_id: 10, quantity: 3}),
        knex('line_items').insert({order_id: 4, item_id: 12, quantity: 4}),
        knex('line_items').insert({order_id: 4, item_id: 14, quantity: 5}),
        knex('line_items').insert({order_id: 4, item_id: 16, quantity: 3}),
        knex('line_items').insert({order_id: 4, item_id: 1, quantity: 1})
      ]);
    });
};
