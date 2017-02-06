
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.table('orders', function (table) {
      table.integer('estimates').defaultTo('30');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([

    knex.schema.table('orders', function (table) {
      table.dropColumn('estimates');
    })
  ])
};
