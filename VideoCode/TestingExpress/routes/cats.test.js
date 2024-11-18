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

describe("", () => {
  test("", () => {
     
  })
});