const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Employee = require("../src/models/employee");
const { default: mongoose } = require("mongoose");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Employee Management API", () => {
  // Set up a test employee
  let testEmployeeId;
  // Setup newly created employee Id
  let newEmployeeId;

  before((done) => {
    app.on("ready", () => {
      done();
    });
  });

  before(async () => {
    const testEmployee = new Employee({
      first_name: "Chamikara",
      last_name: "Nayanajith",
      email: "connect.chamikara@gmail.com",
      number: "+94715122893",
      gender: "M",
      photo: "https://randomuser.me/api/portraits/men/30.jpg",
    });
    const savedEmployee = await testEmployee.save();
    testEmployeeId = savedEmployee._id;
  });

  describe("Root Endpoint", function () {
    it("Should return status 200 and a message", function (done) {
      chai
        .request(app)
        .get("/")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.equal("Hey this is my API running 🥳");
          done();
        });
    });
  });

  describe("/POST employee", function () {
    it("Should create a new employee", function (done) {
      const newEmployee = {
        first_name: "Chamikara",
        last_name: "Nayanajith",
        email: "connect.chamikara@gmail.com",
        number: "+94715122893",
        gender: "M",
      };

      chai
        .request(app)
        .post("/api/v1/employee")
        .send(newEmployee)
        .end(function (err, res) {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(mongoose.Types.ObjectId.isValid(res.body._id)).to.be.true;
          expect(res.body).to.have.property("first_name", "Chamikara");
          expect(res.body).to.have.property("last_name", "Nayanajith");
          expect(res.body).to.have.property(
            "email",
            "connect.chamikara@gmail.com"
          );
          expect(res.body).to.have.property("number", "+94715122893");
          expect(res.body).to.have.property("gender", "M");
          // Check that the response body does not contain any fields that were not sent in the request.
          expect(res.body).to.not.have.property("password");

          // Save the new employee ID to the global variable
          newEmployeeId = res.body._id;

          done();
        });
    });

    it("Should return validation errors for invalid input", function (done) {
      const invalidEmployee = {
        first_name: "Chamikara123", // invalid first name
        last_name: "Nayanajith",
        email: "connect.chamikara", // invalid email address
        number: "+9471", // invalid phone number
        gender: "X", // invalid gender
      };

      chai
        .request(app)
        .post("/api/v1/employee")
        .send(invalidEmployee)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          // Check for validation errors
          expect(res.body).to.have.property("first_name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("number");
          expect(res.body).to.have.property("gender");

          done();
        });
    });
  });

  describe("/GET employees", function () {
    it("Should GET all the employees", function (done) {
      chai
        .request(app)
        .get("/api/v1/employee")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });
  });

  describe("/PUT employee/:id", function () {
    it("Should update an existing employee by Id", function (done) {
      const updatedEmployee = {
        first_name: "ChamiEdit",
        last_name: "NayaEdit",
        email: "connect.chamikara.edit@gmail.com",
        number: "+94715122896",
        gender: "F",
      };

      chai
        .request(app)
        .put(`/api/v1/employee/${testEmployeeId}`)
        .send(updatedEmployee)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body._id).to.equal(testEmployeeId.toString());
          expect(res.body).to.have.property(
            "first_name",
            updatedEmployee.first_name
          );
          expect(res.body).to.have.property(
            "last_name",
            updatedEmployee.last_name
          );
          expect(res.body).to.have.property("email", updatedEmployee.email);
          expect(res.body).to.have.property("number", updatedEmployee.number);
          expect(res.body).to.have.property("gender", updatedEmployee.gender);
          done();
        });
    });

    it("Should return a error if employee Id is invalid", function (done) {
      const updatedEmployee = {
        first_name: "ChamiEdit",
        last_name: "NayaEdit",
        email: "connect.chamikara.edit@gmail.com",
        number: "+94715122896",
        gender: "M",
      };

      chai
        .request(app)
        .put("/api/v1/employee/invalid-id")
        .send(updatedEmployee)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("Should return a error if input fields are invalid", function (done) {
      const invalidEmployee = {
        first_name: "Chamikara123", // invalid first name
        last_name: "Nayanajith",
        email: "connect.chamikara", // invalid email address
        number: "+9471", // invalid phone number
        gender: "X", // invalid gender
      };

      chai
        .request(app)
        .put(`/api/v1/employee/${testEmployeeId}`)
        .send(invalidEmployee)
        .end(function (err, res) {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("first_name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("number");
          expect(res.body).to.have.property("gender");
          done();
        });
    });
  });

  describe("/DELETE employee/:id", () => {
    it("should delete an employee by Id", (done) => {
      chai
        .request(app)
        .delete(`/api/v1/employee/${testEmployeeId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal("Employee deleted successfully");
          done();
        });
    });

    it("should return an error if employee Id is invalid", (done) => {
      chai
        .request(app)
        .delete(`/api/v1/employee/invalid_id`)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.text).to.equal(
            'Cast to ObjectId failed for value "invalid_id" (type string) at path "_id" for model "employees"'
          );
          done();
        });
    });

    it("should return an error if employee is not found", (done) => {
      const nonExistentId = "123456789012345678901234"; // An ID that does not exist in the database
      chai
        .request(app)
        .delete(`/api/v1/employee/${nonExistentId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.equal("Employee not found");
          done();
        });
    });
  });

  // Clean up test data after tests complete
  after(async () => {
    // Delete the employee created in before
    await Employee.findByIdAndDelete(newEmployeeId);
  });
});
