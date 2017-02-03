const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    knex
      .select("name", "description", "price")
      .from("items")
      .where("food_type_id", req.params.id)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}