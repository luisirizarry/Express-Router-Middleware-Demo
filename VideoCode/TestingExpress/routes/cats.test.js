process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let cats = require("../fakeDb");


let pickles = { name: "Pickles" };

beforeEach(function(){
  cats.push(pickles);
});

afterEach(function(){
  cats.length = 0;
});

describe("Get /cats", () => {
  test("Get all cats", async () => {
    const res = await request(app).get('/cats');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({cats: [pickles]});
  });
});

describe("Get /cat/:name", () => {
  test("Get cat", async () => {
    const res = await request(app).get(`/cats/${pickles.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ cat: { name: "Pickles" } });
  });

  test("If cat doesn't exist", async () => {
    const res = await request(app).get(`/cats/piggles`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Cat not found" });
  })
});

describe("Post /cats", () => {
  test("Create a cat", async () => {
    const res = await request(app).post('/cats').send({ name: "Blue" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ cat: { name: "Blue" } })
  });
});

describe("/PATCH /cats/:name", () => {
  test("Updating cat name", async () => {
    const res = await request(app).patch(`/cats/${pickles.name}`).send({name : "Monster"});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ cat: { name: "Monster" } })
  });

  test("If cat doesn't exist", async () => {
    const res = await request(app).patch(`/cats/1`).send({name : "Monster"});
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Cat not found" });
  });
});

describe("/DELETE /cats:name", () => {
  test("Deleting a cat", async () => {
    const res = await request(app).delete(`/cats/${pickles.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" })
  });

  test("If cat doesn't exist", async () => {
    const res = await request(app).delete(`/cats/1`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Cat not found" });
  })
});