import request from "supertest";

import { databaseConnection, clearDatabase, closeDatabase } from "../../db";
import { app } from "../../../../app";

describe("Register a user controller", () => {
  beforeAll(async () => {
    await databaseConnection("getCurrentUser");
  });

  afterEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe("when send a token", () => {
    it("should be return a 200 status code and a user", async () => {
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
        .get("/api/users/profile")
        .set("Authorization", "bearer " + newUser.token)
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200)
        .then((res) => {
          expect(res.body._id).toBe(newUser._id);
        });
    });
  });
});
