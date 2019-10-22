!(function(e, t) {
  for (var r in t) e[r] = t[r];
})(
  exports,
  (function(e) {
    var t = {};
    function r(u) {
      if (t[u]) return t[u].exports;
      var n = (t[u] = { i: u, l: !1, exports: {} });
      return e[u].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
    }
    return (
      (r.m = e),
      (r.c = t),
      (r.d = function(e, t, u) {
        r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: u });
      }),
      (r.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (r.t = function(e, t) {
        if ((1 & t && (e = r(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var u = Object.create(null);
        if (
          (r.r(u),
          Object.defineProperty(u, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var n in e)
            r.d(
              u,
              n,
              function(t) {
                return e[t];
              }.bind(null, n)
            );
        return u;
      }),
      (r.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return r.d(t, "a", t), t;
      }),
      (r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.p = ""),
      r((r.s = 0))
    );
  })([
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var u = r(1);
      t.Model = u.default;
    },
    function(e, t, r) {
      "use strict";
      var u =
          (this && this.__assign) ||
          function() {
            return (u =
              Object.assign ||
              function(e) {
                for (var t, r = 1, u = arguments.length; r < u; r++)
                  for (var n in (t = arguments[r]))
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e;
              }).apply(this, arguments);
          },
        n =
          (this && this.__spreadArrays) ||
          function() {
            for (var e = 0, t = 0, r = arguments.length; t < r; t++)
              e += arguments[t].length;
            var u = Array(e),
              n = 0;
            for (t = 0; t < r; t++)
              for (var o = arguments[t], i = 0, s = o.length; i < s; i++, n++)
                u[n] = o[i];
            return u;
          };
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = r(2),
        i = (function() {
          return function(e) {
            var t = this;
            (this.handleBuild = null),
              (this.state = {}),
              (this.use = function(e) {
                t.handleBuild = e;
              }),
              (this.insert = function(e) {
                var r = Object.keys(e)
                    .map(function(e) {
                      return "" + e;
                    })
                    .join(","),
                  u = Object.values(e)
                    .map(o.encodeValue)
                    .join(",");
                return (
                  (t.state = {
                    type: "insert",
                    insert:
                      "INSERT INTO " +
                      t.name +
                      " (" +
                      r +
                      ") VALUES (" +
                      u +
                      ")"
                  }),
                  { returning: t.returning, execute: t.execute, query: t.query }
                );
              }),
              (this.returning = function(e) {
                return (
                  (t.state = u(u({}, t.state), { returning: e })),
                  { execute: t.execute, query: t.query }
                );
              }),
              (this.select = function(e) {
                return (
                  void 0 === e && (e = "*"),
                  (t.state = { type: "select", select: e }),
                  {
                    join: t.join,
                    where: t.where,
                    limit: t.limit,
                    order: t.order,
                    group: t.group,
                    offset: t.offset,
                    execute: t.execute,
                    query: t.query
                  }
                );
              }),
              (this.delete = function() {
                return (
                  (t.state = { type: "delete" }),
                  {
                    join: t.join,
                    where: t.where,
                    execute: t.execute,
                    query: t.query
                  }
                );
              }),
              (this.update = function(e) {
                return (
                  (t.state = { type: "update", update: e }),
                  {
                    join: t.join,
                    where: t.where,
                    execute: t.execute,
                    query: t.query
                  }
                );
              }),
              (this.join = function(e) {
                return (
                  (t.state = u(u({}, t.state), { join: e })),
                  {
                    where: t.where,
                    limit: t.limit,
                    order: t.order,
                    group: t.group,
                    offset: t.offset,
                    execute: t.execute,
                    query: t.query
                  }
                );
              }),
              (this.where = function(e) {
                return (
                  (t.state = u(u({}, t.state), { where: e })),
                  {
                    limit: t.limit,
                    order: t.order,
                    group: t.group,
                    offset: t.offset,
                    execute: t.execute,
                    query: t.query
                  }
                );
              }),
              (this.limit = function(e) {
                return (
                  (t.state = u(u({}, t.state), { limit: e })),
                  {
                    order: t.order,
                    group: t.group,
                    offset: t.offset,
                    execute: t.execute,
                    query: t.query
                  }
                );
              }),
              (this.offset = function(e) {
                return (
                  (t.state = u(u({}, t.state), { offset: e })),
                  {
                    order: t.order,
                    group: t.group,
                    execute: t.execute,
                    query: t.query
                  }
                );
              }),
              (this.order = function(e) {
                return (
                  (t.state = u(u({}, t.state), { order: e })),
                  { group: t.group, execute: t.execute, query: t.query }
                );
              }),
              (this.group = function(e) {
                return (
                  (t.state = u(u({}, t.state), { group: e })),
                  { execute: t.execute, query: t.query }
                );
              }),
              (this.execute = function() {
                var e = t.state;
                if (!t.handleBuild)
                  throw new Error(
                    "Model " +
                      t.name +
                      " need execute handler, example: model.use(async(query: string)=>Rows);"
                  );
                var r = t.buildQuery(e);
                return t.handleBuild(r);
              }),
              (this.query = function() {
                var e = t.state;
                return t.buildQuery(e);
              }),
              (this.buildQuery = function(e) {
                var r = [];
                if (
                  ("insert" === e.type &&
                    (r.push(e.insert),
                    e.returning &&
                      (r.push("returning"), r.push(e.returning.join(",")))),
                  "select" === e.type)
                ) {
                  var u = "*";
                  "string" == typeof e.select
                    ? (u = e.select)
                    : e.select &&
                      e.select.length > 0 &&
                      (u = e.select.join(",")),
                    r.push("SELECT " + u);
                }
                if (
                  ("delete" === e.type && r.push("DELETE"),
                  "update" !== e.type &&
                    "insert" !== e.type &&
                    r.push("FROM " + t.name),
                  "update" === e.type && r.push("UPDATE " + t.name),
                  e.join &&
                    r.push(
                      "object" == typeof e.join ? e.join.join(" ") : e.join
                    ),
                  "update" === e.type)
                ) {
                  var i = t.state.update;
                  if (!i || 0 === Object.keys(i).length)
                    throw new Error("Empty Update params");
                  if (i)
                    if ((r.push("SET"), "string" == typeof i)) r.push(i);
                    else {
                      var s = Object.keys(i).reduce(function(e, t) {
                        return n(e, [t + "=" + o.encodeValue(i[t])]);
                      }, []);
                      r.push(s.join(","));
                    }
                }
                var c = e.where;
                if (c)
                  if ("object" == typeof c) {
                    var a =
                      "WHERE " +
                      Object.keys(c)
                        .map(function(e) {
                          return o.prepareWhereItem(e, c[e]);
                        })
                        .join(" AND ");
                    r.push(a);
                  } else r.push("WHERE " + c);
                return (
                  e.limit && r.push("LIMIT " + e.limit),
                  e.offset && r.push("OFFSET " + e.offset),
                  e.order && r.push("ORDER BY " + e.order),
                  e.group &&
                    e.group.length > 0 &&
                    r.push(
                      "GROUP BY " +
                        ("object" == typeof e.group
                          ? e.group.join(",")
                          : e.group)
                    ),
                  r.join(" ") + ";"
                );
              }),
              (this.name = e);
          };
        })();
      t.default = function(e) {
        return new i(e);
      };
    },
    function(e, t, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.prepareWhereItem = function(e, t) {
          switch (typeof t) {
            case "object":
              return null === t ? e + " IS NULL" : e + " IN (" + t + ")";
            case "string":
              return e + "='" + t + "'";
            default:
              return e + "=" + t;
          }
        }),
        (t.encodeValue = function(e) {
          return "string" == typeof e ? "'" + e + "'" : e;
        });
    }
  ])
);
