const Intern = require("../lib/Intern.js");

describe("Intern", () => {
  describe("Initialization", () => {
    it("should create and object with a name, Id and email", () => {
      let newIntern = new Intern("Jane Doe", 01, "test@test.com");
      expect(newIntern.name).toEqual("Jane Doe");
      expect(newIntern.id).toEqual(01);
      expect(newIntern.email).toEqual("test@test.com");
    });
  });
});
