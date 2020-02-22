exports.up = async knex => {
  await knex.schema.createTable("veg", table => {
    table.increments();
    table.string("name", 128).notNullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists("veg");
};
