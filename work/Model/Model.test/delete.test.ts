import { expect } from "chai";
import Model from "../";

describe("Delete", function() {
  let model = Model("user");

  beforeEach(() => {
    model = Model("user");
  });

  it("empty", function() {
    const test = model.delete().query();

    expect(test).to.be.equal(`DELETE FROM user;`);
  });

  it("where", function() {
    const test = model
      .delete()
      .join("JOIN user ON test=1")
      .where({ age: 20 })
      .query();

    expect(test).to.be.equal(
      `DELETE FROM user JOIN user ON test=1 WHERE age=20;`
    );
  });
});
