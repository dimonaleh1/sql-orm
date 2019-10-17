function prepareWhereItem(
  key: string,
  value: string | number | null | boolean | Array<string | number>
) {
  switch (typeof value) {
    case "object":
      if (value === null) {
        return `${key} IS NULL`;
      } else {
        return `${key} IN (${value})`;
      }
    case "string":
      return `${key}='${value}'`;
    default:
      return `${key}=${value}`;
  }
}

export { prepareWhereItem };
