import {expect} from 'chai';
import Model from './Model';

interface IUser {
    name: string;
    age: number;
}

describe('With middleware', function () {
    let model =  Model<IUser>('user');

    beforeEach(() => {
        model = Model<IUser>('user');
    });

    it('async', async function () {
       model.use(async (query: string) => `Query: ${query}`);

       const result = await model
            .select(['name', 'age'])
            .where({name: 'Maxim'})
            .build();

       expect(result).to.be.equal(`Query: SELECT name,age FROM user WHERE name='Maxim';`);
    });

    it('async', async function () {
        model.use((query: string) => `Query: ${query}`);

        const result = await model
            .select(['name', 'age'])
            .where({name: 'Maxim'})
            .build();

        expect(result).to.be.equal(`Query: SELECT name,age FROM user WHERE name='Maxim';`);
    });
});
