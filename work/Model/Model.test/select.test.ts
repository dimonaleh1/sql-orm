import { expect } from "chai";
import Model from "../";

interface IUser {
  name: string;
  age: number;
}

describe("Select", function() {
  let model = Model<IUser>("user");

  beforeEach(() => {
    model = Model<IUser>("user");
  });

  it("empty", function() {
    const test = model.select().build();

    expect(test).to.be.equal(`SELECT * FROM user;`);
  });

  it("one column", function() {
    const test = model.select(["name"]).build();

    expect(test).to.be.equal(`SELECT name FROM user;`);
  });

  it("one column", function() {
    const test = model.select(["name"]).build();

    expect(test).to.be.equal(`SELECT name FROM user;`);
  });

  it("partial build", function() {
    const test = model.select();
    test.join("JOIN user ON test=1");
    test.where({ age: 20 });
    test.limit(10);
    test.offset(20);
    test.order("name");
    test.group(["name"]);

    expect(test.build()).to.be.equal(
      `SELECT * FROM user JOIN user ON test=1 WHERE age=20 LIMIT 10 OFFSET 20 ORDER BY name GROUP BY name;`
    );
  });

  it("full", function() {
    const test = model
      .select()
      .join("JOIN user ON test=1")
      .where({ age: 20 })
      .limit(10)
      .offset(20)
      .order("name")
      .group(["name"])
      .build();

    expect(test).to.be.equal(
      `SELECT * FROM user JOIN user ON test=1 WHERE age=20 LIMIT 10 OFFSET 20 ORDER BY name GROUP BY name;`
    );
  });
});
