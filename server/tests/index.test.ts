import request from "request";
import { expect } from "chai";
import { PrismaClient } from "@prisma/client";

const baseRequest = request.defaults({
  baseUrl: 'http://localhost:5000/api',
  headers: {
    'X-UserId': "12345678",
  }
});

const prisma = new PrismaClient();
describe("Status and Response", () => {
  beforeEach(async function () {
    this.timeout(20000);

    try {
      await prisma.testUser.deleteMany({});
    } catch (error) {
      console.log(error)
    }
  });

  describe("Home Route", function () {
    it("everything is good", (done) => {
      baseRequest.get('/',
        function (error: Error, response: any, body: any) {
          if (error) done(error);
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).message).to.equal("Everything is good!");
          done();
        });
    })
  });

  describe("Auth Routes", function () {
    this.timeout(20000);

    it("stores a user's detail in the database and create's a wallet", function (done) {
      const body_params = { name: "Akolade Oluwafemi", email: "brandaka@gmail.com" };

      baseRequest.post('/createWallet', { form: body_params },
        function (error: Error, response: any, body: any) {
          if (error) done(error);
          expect(response.statusCode).to.equal(201);
          expect(JSON.parse(body).success).to.equal(true);
          expect(JSON.parse(body).message).to.equal("New account has been created!");
          done();
        }
      )
    })

    it("logs in a user with there credentials", function (done) {
      const userEmail = { email: "brandaka@gmail.com" };

      baseRequest.post('/login', { form: userEmail },
        function (error: Error, response: any, body: any) {
          if (error) done(error);
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body).success).to.equal(true);
          expect(JSON.parse(body).message).to.equal("user logged in successfully!");
          done();
        }
      )
    })
  });
});


