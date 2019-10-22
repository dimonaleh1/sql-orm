import { expect } from "chai";
import Model from "./Model";

describe("With middleware", function() {
  let model = Model("user");

  beforeEach(() => {
    model = Model("user");
  });

  it("async", async function() {
    model.use(async (query: string) => `Query: ${query}`);

    const result = await model
      .select(["name", "age"])
      .where({ name: "Maxim" })
      .execute();

    expect(result).to.be.equal(
      `Query: SELECT name,age FROM user WHERE name='Maxim';`
    );
  });

  it("async", async function() {
    model.use((query: string) => `Query: ${query}`);

    const result = await model
      .select(["name", "age"])
      .where({ name: "Maxim" })
      .execute();

    expect(result).to.be.equal(
      `Query: SELECT name,age FROM user WHERE name='Maxim';`
    );
  });
});
