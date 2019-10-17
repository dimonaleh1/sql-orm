import { prepareWhereItem } from "./QueryBuilder.helpers";

interface IQueryState {
  name: string;
  type: "select";

  select?: string[];
  where?: {
    [key: string]: string | number | boolean | null | Array<string | number>;
  };
  limit?: number;
  offset?: number;
  order?: string;
  group?: string[];
}

class Map {
  public static insert<Schema extends object>(name: string) {
    return (params: Schema) => {
      const keys = Object.keys(params)
        .map(key => `${key}`)
        .join(",");
      const values = Object.values(params)
        .map(value => (typeof value === "string" ? `'${value}'` : value))
        .join(",");

      return `INSERT INTO ${name} (${keys}) VALUES (${values});`;
    };
  }

  public static select<Schema extends object>(state: IQueryState) {
    return (list: Array<keyof Schema> = []) => {
      const newState = {
        ...state,
        select: list
      } as IQueryState;

      return {
        where: Map.where(newState),
        limit: Map.limit(newState),
        order: Map.order(newState),
        group: Map.group(newState),
        offset: Map.offset(newState),
        build: Map.build(newState)
      };
    };
  }

  public static where(state: IQueryState) {
    return (params: {
      [key: string]: string | number | boolean | null | Array<string | number>;
    }) => {
      const newState = {
        ...state,
        where: params
      };

      return {
        build: Map.build(newState),
        limit: Map.limit(newState),
        order: Map.order(newState),
        group: Map.group(newState),
        offset: Map.offset(newState)
      };
    };
  }

  public static limit(state: IQueryState) {
    return (value: number) => {
      const newState = {
        ...state,
        limit: value
      };

      return {
        build: Map.build(newState),
        order: Map.order(newState),
        group: Map.group(newState),
        offset: Map.offset(newState)
      };
    };
  }

  public static offset(state: IQueryState) {
    return (value: number) => {
      const newState = {
        ...state,
        offset: value
      };

      return {
        build: () => Map.build(newState),
        order: Map.order(newState),
        group: Map.group(newState)
      };
    };
  }

  public static order(state: IQueryState) {
    return (str: string) => {
      const newState = {
        ...state,
        order: str
      };

      return {
        build: Map.build(newState),
        group: Map.group(newState)
      };
    };
  }

  public static group(state: IQueryState) {
    return (list: string[]) => {
      const newState = {
        ...state,
        group: list
      };

      return {
        build: Map.build(newState)
      };
    };
  }

  public static build(state: IQueryState) {
    return () => {
      const params = [];

      if (state.type === "select") {
        let select = "*";

        if (state.select && state.select.length > 0) {
          select = state.select.map(t => `${state.name}.${t}`).join(",");
        }

        params.push(`SELECT ${select}`);
      }

      params.push(`FROM ${state.name}`);

      const stateWhere = state.where;
      if (stateWhere) {
        const where = `WHERE ${Object.keys(stateWhere)
          .map(key => `${state.name}.${prepareWhereItem(key, stateWhere[key])}`)
          .join(" AND ")}`;

        params.push(where);
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
        params.push(`GROUP BY ${state.group.join(",")}`);
      }

      return params.join(" ") + ";";
    };
  }
}

function QueryBuilder<Schema extends object>(name: string) {
  const state = {
    insert: Map.insert<Schema>(name),
    select: Map.select<Schema>({ name, type: "select" })
  };

  return state;
}

interface IUser {
  name: string;
  age: number;
}
const user = QueryBuilder<IUser>("user");
user.insert({ name: "te", age: 42 });
console.log(user.select(["name"]).build());

export { QueryBuilder };
