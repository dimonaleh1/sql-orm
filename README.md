## SQL query builder and connect request middleware

#### Create Handler

```typescript
const SqlRequest = (connection: Connection) => <R extends object>(
  query: string
) =>
  new Promise<R[]>(
    (resolve: (result: R[]) => void, reject: (err: Error) => void) => {
      connection.query(query, (err: Error, result: R[], fields: any[]) => {
        if (err) {
          reject(err);

          return;
        }

        resolve(result);
      });
    }
  );
```

### Create Model

```typescript
interface IUser {
  name: string;
  age: number;
}
const model = Model<IUser>("user");
model.use(SqlRequest(connection));
```

### Use Model

```typescript
# select
model.select(['name', 'age']
     .join("JOIN city ON user.city_id=city.id")
     .where({age: 20})
     .limit(10)
     .offset(20)
     .order('name')
     .group(['name'])
     .build()
     .then(console.log); // return rows

// OR

model.select(['name', 'age']);
model.join("JOIN city ON user.city_id=city.id")
model.where({age: 20});
model.limit(10);
model.offset(20);
model.order('name');
model.group(['name']);
model.build().then(console.log); // return rows

# insert
model
    .insert({name: 'Maxim', age: 20})
    .build()

# delete
model
    .delete()
    .join("JOIN city ON user.city_id=city.id")
    .where({age: 20})
    .build()

# update
model
    .update({age: 20})
    .join("JOIN city ON user.city_id=city.id")
    .where({age: 19})
    .build();
```
