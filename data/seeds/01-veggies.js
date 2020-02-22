exports.seed = async knex => {
  await knex("veg").truncate();

  await knex("veg").insert([
    { name: "lettuce" },
    { name: "tomato" },
    { name: "pepper" },
    { name: "kale" },
    { name: "spinach" }
  ]);
};
