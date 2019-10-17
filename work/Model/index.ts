import {encodeValue, prepareWhereItem} from './Model.helpers';

interface IQueryState {
    type?: 'select' | 'insert' | 'delete' | 'update';

    select?: string[];
    update?: {
        [key: string]: string | number | boolean | null | Array<string | number>;
    } | string;
    where?: {
        [key: string]: string | number | boolean | null | Array<string | number>;
    } | string;
    limit?: number;
    offset?: number;
    order?: string;
    group?: string[];

    single?: string;
}

class Builder<Schema extends object> {
    protected handleBuild: ((q: string) => any) | null = null;
    protected name: string;
    protected state: IQueryState = {};

    public use = (handler: (q: string) => any) => {
        this.handleBuild = handler;
    };

    constructor(name: string) {
        this.name = name;
    }

    public insert = (params: Schema) => {
        const keys = Object.keys(params)
                           .map(key => `${key}`)
                           .join(',');
        const values = Object.values(params)
                             .map(encodeValue)
                             .join(',');

        this.state = {
            type: 'insert',
            single: `INSERT INTO ${this.name} (${keys}) VALUES (${values});`,
        };

        return {
            build: this.build,
        };
    };

    public select = (select: string[] = []) => {
        this.state = {
            type: 'select',
            select,
        } as IQueryState;

        return {
            where: this.where,
            limit: this.limit,
            order: this.order,
            group: this.group,
            offset: this.offset,
            build: this.build,
        };
    };

    public delete = () => {
        this.state = {
            type: 'delete',
        };

        return {
            where: this.where,
            build: this.build,
        }
    };

    public update = (update: Partial<Schema>) => {
        this.state = {
            type: 'update',
            update,
        } as any as IQueryState;

        return {
            where: this.where,
            build: this.build,
        };
    };

    protected where = (where: {
        [key: string]: string | number | boolean | null | Array<string | number>;
    }) => {
        this.state = {
            ...this.state,
            where,
        };

        return {
            limit: this.limit,
            order: this.order,
            group: this.group,
            offset: this.offset,
            build: this.build,
        };
    };

    protected limit = (limit: number) => {
        this.state = {
            ...this.state,
            limit,
        };

        return {
            order: this.order,
            group: this.group,
            offset: this.offset,
            build: this.build,
        };
    };

    protected offset = (offset: number) => {
        this.state = {
            ...this.state,
            offset,
        };

        return {
            order: this.order,
            group: this.group,
            build: this.build,
        };
    };

    protected order = (order: string) => {
        this.state = {
            ...this.state,
            order,
        };

        return {
            group: this.group,
            build: this.build,
        };
    };

    protected group = (group: string[]) => {
        this.state = {
            ...this.state,
            group,
        };

        return {
            build: this.build,
        };
    };

    protected build = () => {
        const state = this.state;

        const params = [];

        if (state.single) {
            return (this.handleBuild ? this.handleBuild(state.single) : state.single);
        }

        if (state.type === 'select') {
            let select = '*';

            if (state.select && state.select.length > 0) {
                select = state.select.join(',');
            }

            params.push(`SELECT ${select}`);
        }
        if (state.type === 'delete') {
            params.push(`DELETE`);
        }

        if (state.type === 'update') {
            params.push(`UPDATE ${this.name}`);
            const update = this.state.update;

            if (!update || Object.keys(update).length === 0) {
                throw new Error('Empty Update params');
            }

            if (update) {
                params.push('SET');

                const str = Object.keys(update).reduce((acc: string[], key: string) => {
                    // @ts-ignore
                    return [...acc, `${key}=${encodeValue(update[key])}`];
                }, []);

                params.push(str.join(','));
            }
        }

        if (state.type !== 'update') {
            params.push(`FROM ${this.name}`);
        }

        const stateWhere = state.where;
        if (stateWhere) {
            if (typeof stateWhere === 'object') {
                const whereParams = Object
                    .keys(stateWhere)
                    .map(key => prepareWhereItem(key, stateWhere[key]))
                    .join(' AND ');
                const where = `WHERE ${whereParams}`;

                params.push(where);
            } else {
                params.push(`WHERE ${stateWhere}`);
            }
        }

        if (state.limit) {
            params.push(`LIMIT ${state.limit}`);
        }

        if (state.offset) {
            params.push(`OFFSET ${state.offset}`);
        }

        if (state.order) {
            params.push(`ORDER BY ${state.order}`);
        }

        if (state.group && state.group.length > 0) {
            params.push(`GROUP BY ${state.group.join(',')}`);
        }

        const query = params.join(' ') + ';';

        return (this.handleBuild ? this.handleBuild(query) : query);
    };
}

function Model<Schema extends object>(name: string) {
    const builder = new Builder<Schema>(name);

    return builder;
}

export default Model;
