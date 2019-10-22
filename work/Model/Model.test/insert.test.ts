import { expect } from "chai";
import Model from "../";

describe("Insert", function() {
  let model = Model("user");

  beforeEach(() => {
    model = Model("user");
  });

  it("work", function() {
    const test = model.insert({ name: "Maxim", age: 20 }).query();

    expect(test).to.be.equal(
      `INSERT INTO user (name,age) VALUES ('Maxim',20);`
    );
  });
});
