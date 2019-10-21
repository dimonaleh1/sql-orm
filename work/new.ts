// type Model = { name: string, fields: object };
//
// const Model = function <ARR extends Model[]>(...rootArgs: ARR) {
//     const select = <A extends Model[]>(...args: { [K in keyof A]: (param: A[K] extends { name: string, fields: infer C } ? { [K in keyof C]: string } : never) => string }) => {
//         const rootModel = rootArgs[0];
//
//         const arr = args.map((el, i) => {
//             const model = rootArgs[i];
//             const map = Object.keys(model.fields).reduce((acc, key) => ({
//                 ...acc,
//                 [key]: `${model.name}.${key}`
//             }), {});
//
//             return el(map);
//         });
//
//         return `SELECT ${arr.join(',')} FROM ${rootModel.name};`;
//     };
//
//     return {
//         join: (model: Model) => {
//             return {
//                 select,
//             };
//         },
//         select: () => select<ARR>(),
//     };
// };
//
// const userModel = {
//     name: 'user',
//     fields: {
//         name: true,
//     },
//     joins: {
//         city: 'JOIN city ON city.user_id=user.id',
//     },
// };
// const cityModel = {
//     name: 'city',
//     fields: {
//         index: true,
//         name: true,
//     },
// };
//
// const m = Model(userModel);
// const query = m
//     .join(cityModel)
//     .select(ob => ob.name);
