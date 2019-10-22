import { expect } from "chai";
import Model from "../";

interface IUser {
  name: string;
  age: number;
}

describe("Insert", function() {
  let model = Model<IUser>("user");

  beforeEach(() => {
    model = Model<IUser>("user");
  });

  it("work", function() {
    const test = model.insert({ name: "Maxim", age: 20 }).query();

    expect(test).to.be.equal(
      `INSERT INTO user (name,age) VALUES ('Maxim',20);`
    );
  });
});
