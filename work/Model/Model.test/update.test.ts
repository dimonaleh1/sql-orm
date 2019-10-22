import { expect } from "chai";
import Model from "../";

describe("Update", function() {
  let model = Model("user");

  beforeEach(() => {
    model = Model("user");
  });

  it("empty", function() {
    const test = model.update({});

    expect(test.query).to.be.throw("Empty Update params");
  });

  it("one column", function() {
    const test = model.update({ age: 20 }).query();

    expect(test).to.be.equal(`UPDATE user SET age=20;`);
  });

  it("partial execute", function() {
    const test = model.update({ age: 21 });
    test.join("JOIN user ON test=1");
    test.where({ age: 20 });

    expect(test.query()).to.be.equal(
      `UPDATE user JOIN user ON test=1 SET age=21 WHERE age=20;`
    );
  });

  it("full", function() {
    const test = model
      .update({ age: 21 })
      .join("JOIN user ON test=1")
      .where({ age: 20 })
      .query();

    expect(test).to.be.equal(
      `UPDATE user JOIN user ON test=1 SET age=21 WHERE age=20;`
    );
  });
});
