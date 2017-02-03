
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('items').insert({food_type_id: 1, name: 'Biscuits and Gravy', description: 'fSoft dough biscuits covered in house-made gravy', price: 7.99}),
        knex('items').insert({food_type_id: 1, name: 'Biscuits and Gravy', description: 'Soft dough biscuits covered in house-made gravy', price: 7.99}),
        knex('items').insert({food_type_id: 1, name: 'Hush Puppies', description: 'Savory, deep-fried ball made with cornmeal batter', price: 7.99}),
        knex('items').insert({food_type_id: 1, name: 'Fried Green Tomatoes', description: 'Fried green tomatoes battered in cornmeal', price: 8.99}),
        knex('items').insert({food_type_id: 1, name: 'Coleslaw', description: 'Tart, sweet, creamy, crunchy', price: 5.00}),
        knex('items').insert({food_type_id: 1, name: 'Potato Salad', description: 'Good old fashioned southern potato salad', price: 5}),
        knex('items').insert({food_type_id: 1, name: 'Creamed Corn', description: 'Fresh corn, stewed down in bacon drippings and cream, finished with butter.', price: 4.50}),
        knex('items').insert({food_type_id: 2, name: 'Chicken and Waffles', description: 'Our famous fried chicken on sweet waffles drizzled with maple syrup and a side of butter', price: 16.99}),
        knex('items').insert({food_type_id: 2, name: 'Chicken and Grits Casseroles', description: 'Cheesy grits topped with bbq chicken, bacon and cheddar', price: 14.99}),
        knex('items').insert({food_type_id: 2, name: 'Baked Mac’ n Cheese', description: 'Cheesy sauce with a golden crunchy top', price: 18.99}),
        knex('items').insert({food_type_id: 2, name: 'Southern Pulled Pork Sandwich w/ Coleslaw', description: 'Slow cooked pork shoulder in our trade secret Southern bbq sauce, served with our house slaw', price: 15.99}),
        knex('items').insert({food_type_id: 2, name: 'Fried Chicken Sandwich w/ Coleslaw', description: 'Our famous fried chicken served with sriracha mayo, smoked bacon on our house made ciabatta bun and side slaw', price: 15.99}),
        knex('items').insert({food_type_id: 2, name: 'Sticky Pork Ribs', description: 'Slow cooked pork ribs glazed in our secret sweet sauce', price: 19.50}),
        knex('items').insert({food_type_id: 2, name: 'Beef Brisket Sandwich w/ Coleslaw', description: 'Oven roasted brisket served on a toasted ciabatta bun and side slaw', price: 15.99}),
        knex('items').insert({food_type_id: 3, name: 'Pound cake', description: 'Mand in house and from scratch', price: 6.00}),
        knex('items').insert({food_type_id: 3, name: 'Pecan pie', description: 'a wonderfully rich Southern pie', price: 6.00}),
        knex('items').insert({food_type_id: 4, name: 'Sweet Tea', description: 'Sweetened tea', price: 2.50}),
        knex('items').insert({food_type_id: 4, name: 'Cherry Cola', description: 'Cherry flavored Cola', price: 1.99})
      ]);
    });
};
