import { encodeValue, prepareWhereItem } from "./Model.helpers";

interface IQueryState {
  type?: "select" | "insert" | "delete" | "update";

  select?: string[] | string;
  update?:
    | {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | Array<string | number>;
      }
    | string;
  join?: string[] | string;
  where?:
    | {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | Array<string | number>;
      }
    | string;
  limit?: number;
  offset?: number;
  order?: string;
  group?: string[] | string;

  insert?: string;
  returning?: string[];
}

class Builder {
  protected handleBuild:
    | (<Rows = any>(q: string) => Promise<Rows>)
    | null = null;
  protected name: string;
  protected state: IQueryState = {};

  public use = (handler: (q: string) => any) => {
    this.handleBuild = handler;
  };

  constructor(name: string) {
    this.name = name;
  }

  public insert = (params: object) => {
    const keys = Object.keys(params)
      .map(key => `${key}`)
      .join(",");
    const values = Object.values(params)
      .map(encodeValue)
      .join(",");

    this.state = {
      type: "insert",
      insert: `INSERT INTO ${this.name} (${keys}) VALUES (${values})`
    };

    return {
      returning: this.returning,
      execute: this.execute,
      query: this.query
    };
  };

  protected returning = (returning: string[]) => {
    this.state = {
      ...this.state,
      returning: returning as string[]
    };

    return {
      execute: this.execute,
      query: this.query
    };
  };

  public select = (select: string[] | string = "*") => {
    this.state = {
      type: "select",
      select
    } as IQueryState;

    return {
      join: this.join,
      where: this.where,
      limit: this.limit,
      order: this.order,
      group: this.group,
      offset: this.offset,
      execute: this.execute,
      query: this.query
    };
  };

  public delete = () => {
    this.state = {
      type: "delete"
    };

    return {
      join: this.join,
      where: this.where,
      execute: this.execute,
      query: this.query
    };
  };

  public update = (update: object | string) => {
    this.state = ({
      type: "update",
      update
    } as any) as IQueryState;

    return {
      join: this.join,
      where: this.where,
      execute: this.execute,
      query: this.query
    };
  };

  protected join = (join: string[] | string) => {
    this.state = {
      ...this.state,
      join
    };

    return {
      where: this.where,
      limit: this.limit,
      order: this.order,
      group: this.group,
      offset: this.offset,
      execute: this.execute,
      query: this.query
    };
  };

  protected where = (
    where:
      | {
          [key: string]:
            | string
            | number
            | boolean
            | null
            | Array<string | number>;
        }
      | string
  ) => {
    this.state = {
      ...this.state,
      where
    };

    return {
      limit: this.limit,
      order: this.order,
      group: this.group,
      offset: this.offset,
      execute: this.execute,
      query: this.query
    };
  };

  protected limit = (limit: number) => {
    this.state = {
      ...this.state,
      limit
    };

    return {
      order: this.order,
      group: this.group,
      offset: this.offset,
      execute: this.execute,
      query: this.query
    };
  };

  protected offset = (offset: number) => {
    this.state = {
      ...this.state,
      offset
    };

    return {
      order: this.order,
      group: this.group,
      execute: this.execute,
      query: this.query
    };
  };

  protected order = (order: string) => {
    this.state = {
      ...this.state,
      order
    };

    return {
      group: this.group,
      execute: this.execute,
      query: this.query
    };
  };

  protected group = (group: string[] | string) => {
    this.state = {
      ...this.state,
      group
    };

    return {
      execute: this.execute,
      query: this.query
    };
  };

  protected execute = <Rows>() => {
    const state = this.state;

    if (!this.handleBuild) {
      throw new Error(
        `Model ${this.name} need execute handler, example: model.use(async(query: string)=>Rows);`
      );
    }

    const query = this.buildQuery(state);

    return this.handleBuild<Rows>(query);
  };

  protected query = () => {
    const state = this.state;

    return this.buildQuery(state);
  };

  protected buildQuery = (state: IQueryState) => {
    const params = [];

    if (state.type === "insert") {
      params.push(state.insert);

      if (state.returning) {
        params.push("returning");
        params.push(state.returning.join(","));
      }
    }

    if (state.type === "select") {
      let select = "*";

      if (typeof state.select === "string") {
        select = state.select;
      } else {
        if (state.select && state.select.length > 0) {
          select = state.select.join(",");
        }
      }

      params.push(`SELECT ${select}`);
    }

    if (state.type === "delete") {
      params.push(`DELETE`);
    }

    if (state.type !== "update" && state.type !== "insert") {
      params.push(`FROM ${this.name}`);
    }

    if (state.type === "update") {
      params.push(`UPDATE ${this.name}`);
    }

    if (state.join) {
      params.push(
        typeof state.join === "object" ? state.join.join(" ") : state.join
      );
    }

    if (state.type === "update") {
      const update = this.state.update;

      if (!update || Object.keys(update).length === 0) {
        throw new Error("Empty Update params");
      }

      if (update) {
        params.push("SET");

        if (typeof update === "string") {
          params.push(update);
        } else {
          const str = Object.keys(update).reduce(
            (acc: string[], key: string) => {
              // @ts-ignore
              return [...acc, `${key}=${encodeValue(update[key])}`];
            },
            []
          );

          params.push(str.join(","));
        }
      }
    }

    const stateWhere = state.where;
    if (stateWhere) {
      if (typeof stateWhere === "object") {
        const whereParams = Object.keys(stateWhere)
          .map(key => prepareWhereItem(key, stateWhere[key]))
          .join(" AND ");
        const where = `WHERE ${whereParams}`;

        params.push(where);
      } else {
        params.push(`WHERE ${stateWhere}`);
      }
    }

    if (state.order) {
      params.push(`ORDER BY ${state.order}`);
    }

    if (state.limit) {
      params.push(`LIMIT ${state.limit}`);
    }

    if (state.offset) {
      params.push(`OFFSET ${state.offset}`);
    }

    if (state.group && state.group.length > 0) {
      params.push(
        `GROUP BY ${
          typeof state.group === "object" ? state.group.join(",") : state.group
        }`
      );
    }

    const query = params.join(" ") + ";";

    return query;
  };
}

function Model(name: string) {
  const builder = new Builder(name);

  return builder;
}

export default Model;
