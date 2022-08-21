import request from "supertest";

import { databaseConnection, clearDatabase, closeDatabase } from "../../db";
import { app } from "../../../../app";

describe("Get a user by id controller", () => {
  beforeAll(async () => {
    await databaseConnection("getUserById");
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe("when sending an id", () => {
    it("should respond with a 200 status code and return a user", async () => {
      const user = {
        name: "Pedro",
        email: "jedro@email.com",
        password: "12345678",
        confirmPassword: "12345678",
      };

      let newUser;

      await request(app)
        .post("/api/users/register")
        .send(user)
        .then((res) => {
          newUser = res.body;
        });

      return request(app)
        .get(`/api/users/${newUser._id}`)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200)
        .then((res) => {
          expect(res.body._id).toBe(newUser._id);
          expect(res.body.name).toBe(user.name);
          expect(res.body.email).toBe(user.email);
        });
    });
  });
});
