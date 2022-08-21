import request from "supertest";
import mongoose from "mongoose";

import { databaseConnection, clearDatabase, closeDatabase } from "../../db";
import { app } from "../../../../app";

describe("Register user controller", () => {
  beforeAll(async () => {
    databaseConnection("login");
  });

  afterEach(async () => {
    clearDatabase();
  });

  afterAll(async () => {
    closeDatabase();
  });

  describe("when send a body", () => {
    it("should register an new user", async () => {
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
        .post("/api/users/login")
        .send({
          email: "jedro@email.com",
          password: "12345678",
        })
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200)
        .then((res) => {
          expect(res.body._id).toBe(newUser._id);
        });
    });
  });
});
