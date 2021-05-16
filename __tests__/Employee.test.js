const Employee = require("../lib/Employee.js");

describe("Employee", () => {
  describe("Initialization", () => {
    it("should create and object with a name, Id and email", () => {
      let newEmployee = new Employee("Jane Doe", "01", "test@test.com");
      expect(newEmployee.name).toEqual("Jane Doe");
      expect(newEmployee.id).toEqual("01");
      expect(newEmployee.email).toEqual("test@test.com");
    });
  });
});
