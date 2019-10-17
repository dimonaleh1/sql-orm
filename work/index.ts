// root file
const queryFn = (connection: any) => <Result>(
  query: string,
  values: any[] = []
) => {
  return new Promise<Result>(
    (resolve: (result: Result) => void, reject: (err: Error) => void) => {
      connection.query(
        query,
        values,
        (err: Error, result: Result, fields: any[]) => {
          if (err) {
            reject(err);

            return;
          }

          resolve(result);
        }
      );
    }
  );
};

function db() {}
