import Model from './Model';

interface IUser {
    name: string;
    age: number;
}

const model = Model<IUser>('user');
model.use((query: string) => 'Query: ' + query);

model
    .select(['name', 'age'])
    .where({w: 1})
    .build()
    .then(console.log);

model
    .insert({name: 'test', age: 20})
    .build()
    .then(console.log);

model
    .update({name: 'test', age: 20})
    .build()
    .then(console.log);
