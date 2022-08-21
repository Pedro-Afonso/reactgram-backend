import request from "supertest";

import { databaseConnection, clearDatabase, closeDatabase } from "../../db";
import { app } from "../../../../app";

describe("Insert a photo controller", () => {
  beforeAll(async () => {
    await databaseConnection("insertPhoto");
  });

  /*   afterEach(async () => {
    await clearDatabase();
  }); */

  afterAll(async () => {
    await closeDatabase();
  });

  describe("when sending a file image", () => {
    it("should respond with a 201 status code", async () => {
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
        .post("/api/photos/")
        .set("Authorization", "bearer " + newUser.token)
        .field("title", "Cachorro feliz")
        .attach("image", __dirname + "/Cachorro1.jpg")
        .expect(201);
    });
  });

  describe("When get photos", () => {
    it("should return with a 200 status code", async () => {
      return request(app).get("/api/photos/").expect(200);
    });
  });
});
