const db = require("../data/dbConfig");

function get() {
  return db("veg");
}

function getById(id) {
  return db("veg")
    .where({ id })
    .first();
}

async function create(veggie) {
  const [id] = await db("veg").insert(veggie);

  return db("veg")
    .where({ id })
    .first();
}

async function update(id, changes) {
  await db("veg")
    .where({ id })
    .update(changes);

  return getById(id);
}

function del(id) {
  return db("veg")
    .where({ id })
    .del();
}

module.exports = {
  get,
  getById,
  create,
  update,
  del
};
