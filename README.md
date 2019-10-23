## SQL query builder and connect request middleware

### Create Model

```typescript
const model = Model("user");
model.use(async (query: string) => {
  // todo
  return [] as Rows;
});
```

### Use Model

```typescript
model
    .select(['name', 'age']
    .where({age: 20})
    .execute<Array<{ test: number }>>()
    .then(rows=>{});

----- OR -----

const select = model.select(['name', 'age'];
select.where({age: 20});
select
    .execute<Array<{ test: number }>>()
    .then(rows=>{});

----- OR -----

const sqlQuery = model
    .select(['name', 'age']
    .where({age: 20})
    .query();
```

## insert

```typescript
model
  .insert({ name: "Maxim", age: 20 })
  .execute()
  .then(rows);
```

## select

```typescript
model
    .select(['name', 'age']
     .join("JOIN city ON user.city_id=city.id")
     .where({age: 20})
     .limit(10)
     .offset(20)
     .order('name')
     .group(['name'])
     .execute()
     .then(rows=>{});
```

## update

```typescript
model
  .update({ age: 20 })
  .join("JOIN city ON user.city_id=city.id")
  .where({ age: 19 })
  .execute()
  .then(rows => {});
```

## delete

```typescript
model
  .delete()
  .join("JOIN city ON user.city_id=city.id")
  .where({ age: 20 })
  .execute()
  .then(rows => {});
```
