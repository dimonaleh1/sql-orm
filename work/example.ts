import Model from "./Model";

async function handler(query: string) {
  return { query };
}

const model = Model("user");
model.use(handler);

model
  .select(["name", "age"])
  .join("JOIN user ON test=1")
  .where({ w: 1 })
  .limit(10)
  .offset(20)
  .order("test")
  .group("age")
  .execute<{ test: number }>()
  .then(console.log);

model
  .insert({ name: "test", age: 20 })
  .returning(["name"])
  .execute()
  .then(console.log);

model
  .update({ name: "test", age: 20 })
  .join("JOIN user ON test=1")
  .execute()
  .then(console.log);

model
  .delete()
  .join("JOIN user ON test=1")
  .where({ age: 20 })
  .execute()
  .then(console.log);
