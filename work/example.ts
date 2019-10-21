import Model from "./Model";

interface IUser {
  name: string;
  age: number;
}

const model = Model<IUser>("user");
model.use(async (query: string) => "Query: " + query);

model
  .select(["name", "age"])
  .join("JOIN user ON test=1")
  .where({ w: 1 })
  .limit(10)
  .offset(20)
  .order("test")
  .group("age")
  .build()
  .then(console.log);

model
  .insert({ name: "test", age: 20 })
  .build()
  .then(console.log);

model
  .update({ name: "test", age: 20 })
  .join("JOIN user ON test=1")
  .build()
  .then(console.log);

model
  .delete()
  .join("JOIN user ON test=1")
  .where({ age: 20 })
  .build()
  .then(console.log);
