import { expect } from "chai";
import { QueryBuilder } from "../index";

describe("Where", function() {
  let Model = QueryBuilder("user");

  beforeEach(() => {
    Model = QueryBuilder("user");
  });

  it("empty", function() {
    const test = Model.select().build();

    expect(test).to.be.equal(`SELECT * FROM user;`);
  });
});
