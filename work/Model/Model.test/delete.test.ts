import { expect } from "chai";
import Model from "../";

interface IUser {
  name: string;
  age: number;
}

describe("Delete", function() {
  let model = Model<IUser>("user");

  beforeEach(() => {
    model = Model<IUser>("user");
  });

  it("empty", function() {
    const test = model.delete().build();

    expect(test).to.be.equal(`DELETE FROM user;`);
  });

  it("where", function() {
    const test = model
      .delete()
      .join("JOIN user ON test=1")
      .where({ age: 20 })
      .build();

    expect(test).to.be.equal(
      `DELETE FROM user JOIN user ON test=1 WHERE age=20;`
    );
  });
});
