import request from "supertest";

import {
  databaseConnection,
  clearDatabase,
  closeDatabase,
  seedDatabase,
} from "../../db";
import { app } from "../../../../app";

describe("Register a user controller", () => {
  beforeAll(async () => {
    await databaseConnection("register");
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe("when send a body with name, email, password and confirmPassword", () => {
    it("should return a new user", async () => {
      const user = {
        name: "Pedro",
        email: "jedro@email.com",
        password: "12345678",
        confirmPassword: "12345678",
      };
      return request(app)
        .post("/api/users/register")
        .send(user)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(201)
        .then((res) => {
          expect(res.body._id).toBeDefined();
          expect(res.body.token).toBeDefined();
        });
    });
  });
  describe("when send a body with an already register  user ", () => {
    it("should be return a 422 status code with a error message", async () => {
      const user = {
        name: "Jose",
        email: "jose@email.com",
        password: "jose12345",
        confirmPassword: "jose12345",
      };
      return request(app)
        .post("/api/users/register")
        .send(user)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(422)
        .then((res) => {
          expect(res.body.errors).toBeDefined();
        });
    });
  });
});
