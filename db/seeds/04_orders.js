
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('orders').insert({cus_name: 'John Doe', phone: '6042383872', status_id: 1, created_at: '2017-01-30T16:49:19.278Z'}),
        knex('orders').insert({cus_name: 'Ben Glory', phone: '6048932715', status_id: 1, created_at: '2017-01-30T16:49:19.278Z'}),
        knex('orders').insert({cus_name: 'Kimberly Oldname', phone: '7781234567', status_id: 2, created_at: '2017-01-30T16:49:19.278Z'}),
        knex('orders').insert({cus_name: 'Tobias Gravity', phone: '6042383872', status_id: 3, created_at: '2017-01-30T16:49:19.278Z'}),
        knex('orders').insert({cus_name: 'You Funman', phone: '7782832909', status_id: 4, created_at: '2017-01-30T16:49:19.278Z'})
      ]);
    });
};
