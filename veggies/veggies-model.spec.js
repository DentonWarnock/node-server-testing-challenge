const db = require("../data/dbConfig");
const veggiesModel = require("./veggies-model");

// beforeEach(async () => {
//   await db.seed.run();
// });

describe("veggies model", () => {
  test("get", async () => {
    const res = await veggiesModel.get();
    expect(res).toHaveLength(5);
  });

  test("getById", async () => {
    const res = await veggiesModel.getById(1);
    expect(res.name).toMatch(/lettuce/i);
  });

  test("create", async () => {
    await veggiesModel.create({ name: "cucumber" });
    const veggies = await db("veg");
    expect(veggies).toHaveLength(6);
  });

  test("delete", async () => {
    await veggiesModel.del(1);
    const veggies = await db("veg");
    expect(veggies).toHaveLength(4);
  });

  // beforeEach(async () => {
  //   await db("veg").truncate();
  // });

  // test("update", async () => {
  //   const res = await veggiesModel.update(1, {
  //     name: "carrot"
  //   });
  //   expect(res.name).toMatch(/carrot/i);

  //   const veggies = await db("veg");
  //   expect(veggies).toHaveLength(5);
  // });
});
