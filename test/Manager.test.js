const Manager = require("../lib/Manager.js");

describe("Manager", () => {
  describe("Initialization", () => {
    it("should create and object with a name, Id and email", () => {
      let newManager = new Manager("Jane Doe", 01, "test@test.com");
      expect(newManager.name).toEqual("Jane Doe");
      expect(newManager.id).toEqual(01);
      expect(newManager.email).toEqual("test@test.com");
    });
  });
});
