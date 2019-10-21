import { expect } from "chai";
import Model from "../";

interface IUser {
  name: string;
  age: number;
}

describe("Update", function() {
  let model = Model<IUser>("user");

  beforeEach(() => {
    model = Model<IUser>("user");
  });

  it("empty", function() {
    const test = model.update({}).build;

    expect(test).to.be.throw("Empty Update params");
  });

  it("one column", function() {
    const test = model.update({ age: 20 }).build();

    expect(test).to.be.equal(`UPDATE user SET age=20;`);
  });

  it("partial build", function() {
    const test = model.update({ age: 21 });
    test.join("JOIN user ON test=1");
    test.where({ age: 20 });

    expect(test.build()).to.be.equal(
      `UPDATE user JOIN user ON test=1 SET age=21 WHERE age=20;`
    );
  });

  it("full", function() {
    const test = model
      .update({ age: 21 })
      .join("JOIN user ON test=1")
      .where({ age: 20 })
      .build();

    expect(test).to.be.equal(
      `UPDATE user JOIN user ON test=1 SET age=21 WHERE age=20;`
    );
  });
});
