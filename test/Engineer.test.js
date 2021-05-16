const Engineer = require("../lib/Engineer.js");

describe("Engineer", () => {
  describe("Initialization", () => {
    it("should create and object with a name, Id and email", () => {
      let newEngineer = new Engineer("Jane Doe", 01, "test@test.com");
      expect(newEngineer.name).toEqual("Jane Doe");
      expect(newEngineer.id).toEqual(01);
      expect(newEngineer.email).toEqual("test@test.com");
    });
  });
});
