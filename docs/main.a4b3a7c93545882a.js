"use strict";
(self.webpackChunkangular_poject = self.webpackChunkangular_poject || []).push([
  [179],
  {
    287: () => {
      function X(e) {
        return "function" == typeof e;
      }
      function Vr(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Qi = Vr(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Br(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class Je {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._teardowns = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const o of n) o.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (X(r))
              try {
                r();
              } catch (o) {
                t = o instanceof Qi ? o.errors : [o];
              }
            const { _teardowns: i } = this;
            if (i) {
              this._teardowns = null;
              for (const o of i)
                try {
                  Sc(o);
                } catch (s) {
                  (t = null != t ? t : []),
                    s instanceof Qi ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Qi(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Sc(t);
            else {
              if (t instanceof Je) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._teardowns =
                null !== (n = this._teardowns) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Br(n, t);
        }
        remove(t) {
          const { _teardowns: n } = this;
          n && Br(n, t), t instanceof Je && t._removeParent(this);
        }
      }
      Je.EMPTY = (() => {
        const e = new Je();
        return (e.closed = !0), e;
      })();
      const Mc = Je.EMPTY;
      function Ic(e) {
        return (
          e instanceof Je ||
          (e && "closed" in e && X(e.remove) && X(e.add) && X(e.unsubscribe))
        );
      }
      function Sc(e) {
        X(e) ? e() : e.unsubscribe();
      }
      const yn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Zi = {
          setTimeout(...e) {
            const { delegate: t } = Zi;
            return ((null == t ? void 0 : t.setTimeout) || setTimeout)(...e);
          },
          clearTimeout(e) {
            const { delegate: t } = Zi;
            return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Tc(e) {
        Zi.setTimeout(() => {
          const { onUnhandledError: t } = yn;
          if (!t) throw e;
          t(e);
        });
      }
      function Ac() {}
      const Dv = Bs("C", void 0, void 0);
      function Bs(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let vn = null;
      function Yi(e) {
        if (yn.useDeprecatedSynchronousErrorHandling) {
          const t = !vn;
          if ((t && (vn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = vn;
            if (((vn = null), n)) throw r;
          }
        } else e();
      }
      class Hs extends Je {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Ic(t) && t.add(this))
              : (this.destination = Iv);
        }
        static create(t, n, r) {
          return new Ki(t, n, r);
        }
        next(t) {
          this.isStopped
            ? $s(
                (function _v(e) {
                  return Bs("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? $s(
                (function Cv(e) {
                  return Bs("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? $s(Dv, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Ev = Function.prototype.bind;
      function Us(e, t) {
        return Ev.call(e, t);
      }
      class bv {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Ji(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Ji(r);
            }
          else Ji(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Ji(n);
            }
        }
      }
      class Ki extends Hs {
        constructor(t, n, r) {
          let i;
          if ((super(), X(t) || !t))
            i = {
              next: null != t ? t : void 0,
              error: null != n ? n : void 0,
              complete: null != r ? r : void 0,
            };
          else {
            let o;
            this && yn.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: t.next && Us(t.next, o),
                  error: t.error && Us(t.error, o),
                  complete: t.complete && Us(t.complete, o),
                }))
              : (i = t);
          }
          this.destination = new bv(i);
        }
      }
      function Ji(e) {
        yn.useDeprecatedSynchronousErrorHandling
          ? (function wv(e) {
              yn.useDeprecatedSynchronousErrorHandling &&
                vn &&
                ((vn.errorThrown = !0), (vn.error = e));
            })(e)
          : Tc(e);
      }
      function $s(e, t) {
        const { onStoppedNotification: n } = yn;
        n && Zi.setTimeout(() => n(e, t));
      }
      const Iv = {
          closed: !0,
          next: Ac,
          error: function Mv(e) {
            throw e;
          },
          complete: Ac,
        },
        qs =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Dn(e) {
        return e;
      }
      let ie = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const o = (function Tv(e) {
              return (
                (e && e instanceof Hs) ||
                ((function Sv(e) {
                  return e && X(e.next) && X(e.error) && X(e.complete);
                })(e) &&
                  Ic(e))
              );
            })(n)
              ? n
              : new Ki(n, r, i);
            return (
              Yi(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Rc(r))((i, o) => {
              const s = new Ki({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    o(u), s.unsubscribe();
                  }
                },
                error: o,
                complete: i,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [qs]() {
            return this;
          }
          pipe(...n) {
            return (function xc(e) {
              return 0 === e.length
                ? Dn
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, i) => i(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = Rc(n))((r, i) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => r(o)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Rc(e) {
        var t;
        return null !== (t = null != e ? e : yn.Promise) && void 0 !== t
          ? t
          : Promise;
      }
      const Av = Vr(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Lt = (() => {
        class e extends ie {
          constructor() {
            super(),
              (this.closed = !1),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Pc(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Av();
          }
          next(n) {
            Yi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                const r = this.observers.slice();
                for (const i of r) i.next(n);
              }
            });
          }
          error(n) {
            Yi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Yi(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: o } = this;
            return r || i ? Mc : (o.push(n), new Je(() => Br(o, n)));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: o } = this;
            r ? n.error(i) : o && n.complete();
          }
          asObservable() {
            const n = new ie();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Pc(t, n)), e;
      })();
      class Pc extends Lt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Mc;
        }
      }
      function Nc(e) {
        return X(null == e ? void 0 : e.lift);
      }
      function we(e) {
        return (t) => {
          if (Nc(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Ee(e, t, n, r, i) {
        return new xv(e, t, n, r, i);
      }
      class xv extends Hs {
        constructor(t, n, r, i, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function ee(e, t) {
        return we((n, r) => {
          let i = 0;
          n.subscribe(
            Ee(r, (o) => {
              r.next(e.call(t, o, i++));
            })
          );
        });
      }
      function Cn(e) {
        return this instanceof Cn ? ((this.v = e), this) : new Cn(e);
      }
      function Nv(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var i,
          r = n.apply(e, t || []),
          o = [];
        return (
          (i = {}),
          s("next"),
          s("throw"),
          s("return"),
          (i[Symbol.asyncIterator] = function () {
            return this;
          }),
          i
        );
        function s(f) {
          r[f] &&
            (i[f] = function (h) {
              return new Promise(function (p, m) {
                o.push([f, h, p, m]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function u(f) {
              f.value instanceof Cn
                ? Promise.resolve(f.value.v).then(l, c)
                : d(o[0][2], f);
            })(r[f](h));
          } catch (p) {
            d(o[0][3], p);
          }
        }
        function l(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
        }
      }
      function Ov(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function kc(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(o) {
          n[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function i(o, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    o({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      const Lc = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function jc(e) {
        return X(null == e ? void 0 : e.then);
      }
      function Vc(e) {
        return X(e[qs]);
      }
      function Bc(e) {
        return (
          Symbol.asyncIterator &&
          X(null == e ? void 0 : e[Symbol.asyncIterator])
        );
      }
      function Hc(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Uc = (function kv() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function $c(e) {
        return X(null == e ? void 0 : e[Uc]);
      }
      function qc(e) {
        return Nv(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield Cn(n.read());
              if (i) return yield Cn(void 0);
              yield yield Cn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Gc(e) {
        return X(null == e ? void 0 : e.getReader);
      }
      function jt(e) {
        if (e instanceof ie) return e;
        if (null != e) {
          if (Vc(e))
            return (function Lv(e) {
              return new ie((t) => {
                const n = e[qs]();
                if (X(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Lc(e))
            return (function jv(e) {
              return new ie((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (jc(e))
            return (function Vv(e) {
              return new ie((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Tc);
              });
            })(e);
          if (Bc(e)) return zc(e);
          if ($c(e))
            return (function Bv(e) {
              return new ie((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Gc(e))
            return (function Hv(e) {
              return zc(qc(e));
            })(e);
        }
        throw Hc(e);
      }
      function zc(e) {
        return new ie((t) => {
          (function Uv(e, t) {
            var n, r, i, o;
            return (function Rv(e, t, n, r) {
              return new (n || (n = Promise))(function (o, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? o(c.value)
                    : (function i(o) {
                        return o instanceof n
                          ? o
                          : new n(function (s) {
                              s(o);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Ov(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                i = { error: s };
              } finally {
                try {
                  r && !r.done && (o = n.return) && (yield o.call(n));
                } finally {
                  if (i) throw i.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Vt(e, t, n, r = 0, i = !1) {
        const o = t.schedule(function () {
          n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(o), !i)) return o;
      }
      function Ce(e, t, n = 1 / 0) {
        return X(t)
          ? Ce((r, i) => ee((o, s) => t(r, o, i, s))(jt(e(r, i))), n)
          : ("number" == typeof t && (n = t),
            we((r, i) =>
              (function $v(e, t, n, r, i, o, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (m) => (l < r ? p(m) : u.push(m)),
                  p = (m) => {
                    o && t.next(m), l++;
                    let v = !1;
                    jt(n(m, c++)).subscribe(
                      Ee(
                        t,
                        (D) => {
                          null == i || i(D), o ? h(D) : t.next(D);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (l--; u.length && l < r; ) {
                                const D = u.shift();
                                s ? Vt(t, s, () => p(D)) : p(D);
                              }
                              f();
                            } catch (D) {
                              t.error(D);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Ee(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(r, i, e, n)
            ));
      }
      function Hr(e = 1 / 0) {
        return Ce(Dn, e);
      }
      const Bt = new ie((e) => e.complete());
      function zs(e) {
        return e[e.length - 1];
      }
      function Ur(e) {
        return (function Gv(e) {
          return e && X(e.schedule);
        })(zs(e))
          ? e.pop()
          : void 0;
      }
      function Wc(e, t = 0) {
        return we((n, r) => {
          n.subscribe(
            Ee(
              r,
              (i) => Vt(r, e, () => r.next(i), t),
              () => Vt(r, e, () => r.complete(), t),
              (i) => Vt(r, e, () => r.error(i), t)
            )
          );
        });
      }
      function Qc(e, t = 0) {
        return we((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Zc(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ie((n) => {
          Vt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Vt(
              n,
              t,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function be(e, t) {
        return t
          ? (function Xv(e, t) {
              if (null != e) {
                if (Vc(e))
                  return (function Qv(e, t) {
                    return jt(e).pipe(Qc(t), Wc(t));
                  })(e, t);
                if (Lc(e))
                  return (function Yv(e, t) {
                    return new ie((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (jc(e))
                  return (function Zv(e, t) {
                    return jt(e).pipe(Qc(t), Wc(t));
                  })(e, t);
                if (Bc(e)) return Zc(e, t);
                if ($c(e))
                  return (function Kv(e, t) {
                    return new ie((n) => {
                      let r;
                      return (
                        Vt(n, t, () => {
                          (r = e[Uc]()),
                            Vt(
                              n,
                              t,
                              () => {
                                let i, o;
                                try {
                                  ({ value: i, done: o } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                o ? n.complete() : n.next(i);
                              },
                              0,
                              !0
                            );
                        }),
                        () => X(null == r ? void 0 : r.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Gc(e))
                  return (function Jv(e, t) {
                    return Zc(qc(e), t);
                  })(e, t);
              }
              throw Hc(e);
            })(e, t)
          : jt(e);
      }
      function Xi(e) {
        return e <= 0
          ? () => Bt
          : we((t, n) => {
              let r = 0;
              t.subscribe(
                Ee(n, (i) => {
                  ++r <= e && (n.next(i), e <= r && n.complete());
                })
              );
            });
      }
      function Ws(e, t, ...n) {
        return !0 === t
          ? (e(), null)
          : !1 === t
          ? null
          : t(...n)
              .pipe(Xi(1))
              .subscribe(() => e());
      }
      function Z(e) {
        for (let t in e) if (e[t] === Z) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function W(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(W).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Zs(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const nD = Z({ __forward_ref__: Z });
      function Ys(e) {
        return (
          (e.__forward_ref__ = Ys),
          (e.toString = function () {
            return W(this());
          }),
          e
        );
      }
      function O(e) {
        return (function Yc(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(nD) &&
            e.__forward_ref__ === Ys
          );
        })(e)
          ? e()
          : e;
      }
      class z extends Error {
        constructor(t, n) {
          super(
            (function Ks(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function Pe(e) {
        return "function" == typeof e
          ? e.name || e.toString()
          : "object" == typeof e && null != e && "function" == typeof e.type
          ? e.type.name || e.type.toString()
          : (function R(e) {
              return "string" == typeof e ? e : null == e ? "" : String(e);
            })(e);
      }
      function eo(e, t) {
        const n = t ? ` in ${t}` : "";
        throw new z(-201, `No provider for ${Pe(e)} found${n}`);
      }
      function $e(e, t) {
        null == e &&
          (function te(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function q(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function en(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Js(e) {
        return Kc(e, to) || Kc(e, Xc);
      }
      function Kc(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Jc(e) {
        return e && (e.hasOwnProperty(Xs) || e.hasOwnProperty(lD))
          ? e[Xs]
          : null;
      }
      const to = Z({ ɵprov: Z }),
        Xs = Z({ ɵinj: Z }),
        Xc = Z({ ngInjectableDef: Z }),
        lD = Z({ ngInjectorDef: Z });
      var N = (() => (
        ((N = N || {})[(N.Default = 0)] = "Default"),
        (N[(N.Host = 1)] = "Host"),
        (N[(N.Self = 2)] = "Self"),
        (N[(N.SkipSelf = 4)] = "SkipSelf"),
        (N[(N.Optional = 8)] = "Optional"),
        N
      ))();
      let ea;
      function tn(e) {
        const t = ea;
        return (ea = e), t;
      }
      function ed(e, t, n) {
        const r = Js(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & N.Optional
          ? null
          : void 0 !== t
          ? t
          : void eo(W(e), "Injector");
      }
      function nn(e) {
        return { toString: e }.toString();
      }
      var ct = (() => (
          ((ct = ct || {})[(ct.OnPush = 0)] = "OnPush"),
          (ct[(ct.Default = 1)] = "Default"),
          ct
        ))(),
        bt = (() => {
          return (
            ((e = bt || (bt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            bt
          );
          var e;
        })();
      const dD = "undefined" != typeof globalThis && globalThis,
        fD = "undefined" != typeof window && window,
        hD =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Q = dD || ("undefined" != typeof global && global) || fD || hD,
        Vn = {},
        Y = [],
        no = Z({ ɵcmp: Z }),
        ta = Z({ ɵdir: Z }),
        na = Z({ ɵpipe: Z }),
        td = Z({ ɵmod: Z }),
        Ut = Z({ ɵfac: Z }),
        $r = Z({ __NG_ELEMENT_ID__: Z });
      let pD = 0;
      function $t(e) {
        return nn(() => {
          const n = {},
            r = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === ct.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || Y,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || bt.Emulated,
              id: "c",
              styles: e.styles || Y,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            i = e.directives,
            o = e.features,
            s = e.pipes;
          return (
            (r.id += pD++),
            (r.inputs = od(e.inputs, n)),
            (r.outputs = od(e.outputs)),
            o && o.forEach((a) => a(r)),
            (r.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(nd)
              : null),
            (r.pipeDefs = s
              ? () => ("function" == typeof s ? s() : s).map(rd)
              : null),
            r
          );
        });
      }
      function nd(e) {
        return (
          Se(e) ||
          (function rn(e) {
            return e[ta] || null;
          })(e)
        );
      }
      function rd(e) {
        return (function wn(e) {
          return e[na] || null;
        })(e);
      }
      const id = {};
      function _n(e) {
        return nn(() => {
          const t = {
            type: e.type,
            bootstrap: e.bootstrap || Y,
            declarations: e.declarations || Y,
            imports: e.imports || Y,
            exports: e.exports || Y,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          };
          return null != e.id && (id[e.id] = e.type), t;
        });
      }
      function od(e, t) {
        if (null == e) return Vn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (n[i] = r),
              t && (t[i] = o);
          }
        return n;
      }
      const Ie = $t;
      function Se(e) {
        return e[no] || null;
      }
      function Xe(e, t) {
        const n = e[td] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${W(e)} does not have '\u0275mod' property.`);
        return n;
      }
      const F = 11,
        K = 20;
      function Mt(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function ft(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function oa(e) {
        return 0 != (8 & e.flags);
      }
      function so(e) {
        return 2 == (2 & e.flags);
      }
      function ao(e) {
        return 1 == (1 & e.flags);
      }
      function ht(e) {
        return null !== e.template;
      }
      function CD(e) {
        return 0 != (512 & e[2]);
      }
      function In(e, t) {
        return e.hasOwnProperty(Ut) ? e[Ut] : null;
      }
      class ED {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ad(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = MD), bD;
      }
      function bD() {
        const e = ld(this),
          t = null == e ? void 0 : e.current;
        if (t) {
          const n = e.previous;
          if (n === Vn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function MD(e, t, n, r) {
        const i =
            ld(e) ||
            (function ID(e, t) {
              return (e[ud] = t);
            })(e, { previous: Vn, current: null }),
          o = i.current || (i.current = {}),
          s = i.previous,
          a = this.declaredInputs[n],
          u = s[a];
        (o[a] = new ED(u && u.currentValue, t, s === Vn)), (e[r] = t);
      }
      const ud = "__ngSimpleChanges__";
      function ld(e) {
        return e[ud] || null;
      }
      let ca;
      function oe(e) {
        return !!e.listen;
      }
      const cd = {
        createRenderer: (e, t) =>
          (function da() {
            return void 0 !== ca
              ? ca
              : "undefined" != typeof document
              ? document
              : void 0;
          })(),
      };
      function ce(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function nt(e, t) {
        return ce(t[e.index]);
      }
      function fa(e, t) {
        return e.data[t];
      }
      function Ge(e, t) {
        const n = t[e];
        return Mt(n) ? n : n[0];
      }
      function ha(e) {
        return 128 == (128 & e[2]);
      }
      function on(e, t) {
        return null == t ? null : e[t];
      }
      function fd(e) {
        e[18] = 0;
      }
      function pa(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const x = {
        lFrame: Cd(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function hd() {
        return x.bindingsEnabled;
      }
      function y() {
        return x.lFrame.lView;
      }
      function $() {
        return x.lFrame.tView;
      }
      function pe() {
        let e = pd();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function pd() {
        return x.lFrame.currentTNode;
      }
      function It(e, t) {
        const n = x.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function ga() {
        return x.lFrame.isParent;
      }
      function lo() {
        return x.isInCheckNoChangesMode;
      }
      function co(e) {
        x.isInCheckNoChangesMode = e;
      }
      function qD(e, t) {
        const n = x.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), ya(t);
      }
      function ya(e) {
        x.lFrame.currentDirectiveIndex = e;
      }
      function Da(e) {
        x.lFrame.currentQueryIndex = e;
      }
      function zD(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function vd(e, t, n) {
        if (n & N.SkipSelf) {
          let i = t,
            o = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & N.Host ||
              ((i = zD(o)), null === i || ((o = o[15]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = o);
        }
        const r = (x.lFrame = Dd());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function fo(e) {
        const t = Dd(),
          n = e[1];
        (x.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Dd() {
        const e = x.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Cd(e) : t;
      }
      function Cd(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function _d() {
        const e = x.lFrame;
        return (
          (x.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const wd = _d;
      function ho() {
        const e = _d();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Oe() {
        return x.lFrame.selectedIndex;
      }
      function sn(e) {
        x.lFrame.selectedIndex = e;
      }
      function po(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const o = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = o;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks || (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function go(e, t, n) {
        Ed(e, t, 3, n);
      }
      function mo(e, t, n, r) {
        (3 & e[2]) === n && Ed(e, t, n, r);
      }
      function Ca(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Ed(e, t, n, r) {
        const o = null != r ? r : -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[18] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[18] += 65536),
              (a < o || -1 == o) &&
                (tC(e, n, t, u), (e[18] = (4294901760 & e[18]) + u + 2)),
              u++;
      }
      function tC(e, t, n, r) {
        const i = n[r] < 0,
          o = n[r + 1],
          a = e[i ? -n[r] : n[r]];
        if (i) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              o.call(a);
            } finally {
            }
          }
        } else
          try {
            o.call(a);
          } finally {
          }
      }
      class Qr {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function yo(e, t, n) {
        const r = oe(e);
        let i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if ("number" == typeof o) {
            if (0 !== o) break;
            i++;
            const s = n[i++],
              a = n[i++],
              u = n[i++];
            r ? e.setAttribute(t, a, u, s) : t.setAttributeNS(s, a, u);
          } else {
            const s = o,
              a = n[++i];
            wa(s)
              ? r && e.setProperty(t, s, a)
              : r
              ? e.setAttribute(t, s, a)
              : t.setAttribute(s, a),
              i++;
          }
        }
        return i;
      }
      function bd(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function wa(e) {
        return 64 === e.charCodeAt(0);
      }
      function vo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const i = t[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  Md(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Md(e, t, n, r, i) {
        let o = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== i && (e[o + 1] = i));
            if (r === e[o + 1]) return void (e[o + 2] = i);
          }
          o++, null !== r && o++, null !== i && o++;
        }
        -1 !== s && (e.splice(s, 0, t), (o = s + 1)),
          e.splice(o++, 0, n),
          null !== r && e.splice(o++, 0, r),
          null !== i && e.splice(o++, 0, i);
      }
      function Id(e) {
        return -1 !== e;
      }
      function zn(e) {
        return 32767 & e;
      }
      function Wn(e, t) {
        let n = (function sC(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Ea = !0;
      function Do(e) {
        const t = Ea;
        return (Ea = e), t;
      }
      let aC = 0;
      function Yr(e, t) {
        const n = Ma(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          ba(r.data, e),
          ba(t, null),
          ba(r.blueprint, null));
        const i = Co(e, t),
          o = e.injectorIndex;
        if (Id(i)) {
          const s = zn(i),
            a = Wn(i, t),
            u = a[1].data;
          for (let l = 0; l < 8; l++) t[o + l] = a[s + l] | u[s + l];
        }
        return (t[o + 8] = i), o;
      }
      function ba(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Ma(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Co(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          i = t;
        for (; null !== i; ) {
          const o = i[1],
            s = o.type;
          if (((r = 2 === s ? o.declTNode : 1 === s ? i[6] : null), null === r))
            return -1;
          if ((n++, (i = i[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function _o(e, t, n) {
        !(function uC(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty($r) && (r = n[$r]),
            null == r && (r = n[$r] = aC++);
          const i = 255 & r;
          t.data[e + (i >> 5)] |= 1 << i;
        })(e, t, n);
      }
      function Ad(e, t, n) {
        if (n & N.Optional) return e;
        eo(t, "NodeInjector");
      }
      function xd(e, t, n, r) {
        if (
          (n & N.Optional && void 0 === r && (r = null),
          0 == (n & (N.Self | N.Host)))
        ) {
          const i = e[9],
            o = tn(void 0);
          try {
            return i ? i.get(t, r, n & N.Optional) : ed(t, r, n & N.Optional);
          } finally {
            tn(o);
          }
        }
        return Ad(r, t, n);
      }
      function Rd(e, t, n, r = N.Default, i) {
        if (null !== e) {
          const o = (function fC(e) {
            if ("string" == typeof e) return e.charCodeAt(0) || 0;
            const t = e.hasOwnProperty($r) ? e[$r] : void 0;
            return "number" == typeof t ? (t >= 0 ? 255 & t : cC) : t;
          })(n);
          if ("function" == typeof o) {
            if (!vd(t, e, r)) return r & N.Host ? Ad(i, n, r) : xd(t, n, r, i);
            try {
              const s = o(r);
              if (null != s || r & N.Optional) return s;
              eo(n);
            } finally {
              wd();
            }
          } else if ("number" == typeof o) {
            let s = null,
              a = Ma(e, t),
              u = -1,
              l = r & N.Host ? t[16][6] : null;
            for (
              (-1 === a || r & N.SkipSelf) &&
              ((u = -1 === a ? Co(e, t) : t[a + 8]),
              -1 !== u && Od(r, !1)
                ? ((s = t[1]), (a = zn(u)), (t = Wn(u, t)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = t[1];
              if (Nd(o, a, c.data)) {
                const d = dC(a, t, n, s, r, l);
                if (d !== Pd) return d;
              }
              (u = t[a + 8]),
                -1 !== u && Od(r, t[1].data[a + 8] === l) && Nd(o, a, t)
                  ? ((s = c), (a = zn(u)), (t = Wn(u, t)))
                  : (a = -1);
            }
          }
        }
        return xd(t, n, r, i);
      }
      const Pd = {};
      function cC() {
        return new Qn(pe(), y());
      }
      function dC(e, t, n, r, i, o) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function wo(e, t, n, r, i) {
            const o = e.providerIndexes,
              s = t.data,
              a = 1048575 & o,
              u = e.directiveStart,
              c = o >> 20,
              f = i ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (i) {
              const h = s[u];
              if (h && ht(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? so(a) && Ea : r != s && 0 != (3 & a.type),
            i & N.Host && o === a
          );
        return null !== c ? Kr(t, s, c, a) : Pd;
      }
      function Kr(e, t, n, r) {
        let i = e[n];
        const o = t.data;
        if (
          (function nC(e) {
            return e instanceof Qr;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function rD(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new z(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(Pe(o[n]));
          const a = Do(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? tn(s.injectImpl) : null;
          vd(e, r, N.Default);
          try {
            (i = e[n] = s.factory(void 0, o, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function eC(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = t.type.prototype;
                  if (r) {
                    const s = ad(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  i &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, i),
                    o &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, o));
                })(n, o[n], t);
          } finally {
            null !== u && tn(u), Do(a), (s.resolving = !1), wd();
          }
        }
        return i;
      }
      function Nd(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Od(e, t) {
        return !(e & N.Self || (e & N.Host && t));
      }
      class Qn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Rd(this._tNode, this._lView, t, r, n);
        }
      }
      const Yn = "__parameters__";
      function Jn(e, t, n) {
        return nn(() => {
          const r = (function Sa(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(t);
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this;
            const s = new i(...o);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(Yn)
                ? u[Yn]
                : Object.defineProperty(u, Yn, { value: [] })[Yn];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      class G {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = q({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const gC = new G("AnalyzeForEntryComponents");
      function St(e, t) {
        e.forEach((n) => (Array.isArray(n) ? St(n, t) : t(n)));
      }
      function kd(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Eo(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function ze(e, t, n) {
        let r = Xn(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function vC(e, t, n, r) {
                let i = e.length;
                if (i == t) e.push(n, r);
                else if (1 === i) e.push(r, e[0]), (e[0] = n);
                else {
                  for (i--, e.push(e[i - 1], e[i]); i > t; )
                    (e[i] = e[i - 2]), i--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Aa(e, t) {
        const n = Xn(e, t);
        if (n >= 0) return e[1 | n];
      }
      function Xn(e, t) {
        return (function Vd(e, t, n) {
          let r = 0,
            i = e.length >> n;
          for (; i !== r; ) {
            const o = r + ((i - r) >> 1),
              s = e[o << n];
            if (t === s) return o << n;
            s > t ? (i = o) : (r = o + 1);
          }
          return ~(i << n);
        })(e, t, 1);
      }
      const ni = {},
        Ra = "__NG_DI_FLAG__",
        Mo = "ngTempTokenPath",
        MC = /\n/gm,
        Hd = "__source",
        SC = Z({ provide: String, useValue: Z });
      let ri;
      function Ud(e) {
        const t = ri;
        return (ri = e), t;
      }
      function TC(e, t = N.Default) {
        if (void 0 === ri) throw new z(203, "");
        return null === ri
          ? ed(e, void 0, t)
          : ri.get(e, t & N.Optional ? null : void 0, t);
      }
      function A(e, t = N.Default) {
        return (
          (function cD() {
            return ea;
          })() || TC
        )(O(e), t);
      }
      function Pa(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = O(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new z(900, "");
            let i,
              o = N.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = AC(a);
              "number" == typeof u
                ? -1 === u
                  ? (i = a.token)
                  : (o |= u)
                : (i = a);
            }
            t.push(A(i, o));
          } else t.push(A(r));
        }
        return t;
      }
      function ii(e, t) {
        return (e[Ra] = t), (e.prototype[Ra] = t), e;
      }
      function AC(e) {
        return e[Ra];
      }
      const oi = ii(
          Jn("Inject", (e) => ({ token: e })),
          -1
        ),
        Tt = ii(Jn("Optional"), 8),
        er = ii(Jn("SkipSelf"), 4);
      const uf = "__ngContext__";
      function Ae(e, t) {
        e[uf] = t;
      }
      function Ua(e) {
        const t = (function ci(e) {
          return e[uf] || null;
        })(e);
        return t ? (Array.isArray(t) ? t : t.lView) : null;
      }
      function qa(e) {
        return e.ngOriginalError;
      }
      function __(e, ...t) {
        e.error(...t);
      }
      class rr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t),
            r = (function C_(e) {
              return (e && e.ngErrorLogger) || __;
            })(t);
          r(this._console, "ERROR", t),
            n && r(this._console, "ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && qa(t);
          for (; n && qa(n); ) n = qa(n);
          return n || null;
        }
      }
      const hf = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Q))();
      function xt(e) {
        return e instanceof Function ? e() : e;
      }
      var We = (() => (
        ((We = We || {})[(We.Important = 1)] = "Important"),
        (We[(We.DashCase = 2)] = "DashCase"),
        We
      ))();
      function za(e, t) {
        return undefined(e, t);
      }
      function di(e) {
        const t = e[3];
        return ft(t) ? t[3] : t;
      }
      function Wa(e) {
        return vf(e[13]);
      }
      function Qa(e) {
        return vf(e[4]);
      }
      function vf(e) {
        for (; null !== e && !ft(e); ) e = e[4];
        return e;
      }
      function or(e, t, n, r, i) {
        if (null != r) {
          let o,
            s = !1;
          ft(r) ? (o = r) : Mt(r) && ((s = !0), (r = r[0]));
          const a = ce(r);
          0 === e && null !== n
            ? null == i
              ? bf(t, n, a)
              : Tn(t, n, a, i || null, !0)
            : 1 === e && null !== n
            ? Tn(t, n, a, i || null, !0)
            : 2 === e
            ? (function Rf(e, t, n) {
                const r = Ro(e, t);
                r &&
                  (function q_(e, t, n, r) {
                    oe(e) ? e.removeChild(t, n, r) : t.removeChild(n);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != o &&
              (function W_(e, t, n, r, i) {
                const o = n[7];
                o !== ce(n) && or(t, e, r, o, i);
                for (let a = 10; a < n.length; a++) {
                  const u = n[a];
                  fi(u[1], u, e, t, r, o);
                }
              })(t, e, o, n, i);
        }
      }
      function Ya(e, t, n) {
        if (oe(e)) return e.createElement(t, n);
        {
          const r =
            null !== n
              ? (function xD(e) {
                  const t = e.toLowerCase();
                  return "svg" === t
                    ? "http://www.w3.org/2000/svg"
                    : "math" === t
                    ? "http://www.w3.org/1998/MathML/"
                    : null;
                })(n)
              : null;
          return null === r ? e.createElement(t) : e.createElementNS(r, t);
        }
      }
      function Cf(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          i = t[3];
        1024 & t[2] && ((t[2] &= -1025), pa(i, -1)), n.splice(r, 1);
      }
      function Ka(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const i = r[17];
          null !== i && i !== e && Cf(i, r), t > 0 && (e[n - 1][4] = r[4]);
          const o = Eo(e, 10 + t);
          !(function k_(e, t) {
            fi(e, t, t[F], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = o[19];
          null !== s && s.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function _f(e, t) {
        if (!(256 & t[2])) {
          const n = t[F];
          oe(n) && n.destroyNode && fi(e, t, n, 3, null, null),
            (function V_(e) {
              let t = e[13];
              if (!t) return Ja(e[1], e);
              for (; t; ) {
                let n = null;
                if (Mt(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    Mt(t) && Ja(t[1], t), (t = t[3]);
                  null === t && (t = e), Mt(t) && Ja(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Ja(e, t) {
        if (!(256 & t[2])) {
          (t[2] &= -129),
            (t[2] |= 256),
            (function $_(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = t[n[r]];
                  if (!(i instanceof Qr)) {
                    const o = n[r + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          u = o[s + 1];
                        try {
                          u.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        o.call(i);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function U_(e, t) {
              const n = e.cleanup,
                r = t[7];
              let i = -1;
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ("string" == typeof n[o]) {
                    const s = n[o + 1],
                      a = "function" == typeof s ? s(t) : ce(t[s]),
                      u = r[(i = n[o + 2])],
                      l = n[o + 3];
                    "boolean" == typeof l
                      ? a.removeEventListener(n[o], u, l)
                      : l >= 0
                      ? r[(i = l)]()
                      : r[(i = -l)].unsubscribe(),
                      (o += 2);
                  } else {
                    const s = r[(i = n[o + 1])];
                    n[o].call(s);
                  }
              if (null !== r) {
                for (let o = i + 1; o < r.length; o++) r[o]();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && oe(t[F]) && t[F].destroy();
          const n = t[17];
          if (null !== n && ft(t[3])) {
            n !== t[3] && Cf(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
        }
      }
      function wf(e, t, n) {
        return (function Ef(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const i = e.data[r.directiveStart].encapsulation;
            if (i === bt.None || i === bt.Emulated) return null;
          }
          return nt(r, n);
        })(e, t.parent, n);
      }
      function Tn(e, t, n, r, i) {
        oe(e) ? e.insertBefore(t, n, r, i) : t.insertBefore(n, r, i);
      }
      function bf(e, t, n) {
        oe(e) ? e.appendChild(t, n) : t.appendChild(n);
      }
      function Mf(e, t, n, r, i) {
        null !== r ? Tn(e, t, n, r, i) : bf(e, t, n);
      }
      function Ro(e, t) {
        return oe(e) ? e.parentNode(t) : t.parentNode;
      }
      let Tf = function Sf(e, t, n) {
        return 40 & e.type ? nt(e, n) : null;
      };
      function Po(e, t, n, r) {
        const i = wf(e, r, t),
          o = t[F],
          a = (function If(e, t, n) {
            return Tf(e, t, n);
          })(r.parent || t[6], r, t);
        if (null != i)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Mf(o, i, n[u], a, !1);
          else Mf(o, i, n, a, !1);
      }
      function No(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return nt(t, e);
          if (4 & n) return eu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return No(e, r);
            {
              const i = e[t.index];
              return ft(i) ? eu(-1, i) : ce(i);
            }
          }
          if (32 & n) return za(t, e)() || ce(e[t.index]);
          {
            const r = xf(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : No(di(e[16]), r)
              : No(e, t.next);
          }
        }
        return null;
      }
      function xf(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function eu(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            i = r[1].firstChild;
          if (null !== i) return No(r, i);
        }
        return t[7];
      }
      function tu(e, t, n, r, i, o, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && Ae(ce(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & u) tu(e, t, n.child, r, i, o, !1), or(t, e, i, a, o);
            else if (32 & u) {
              const l = za(n, r);
              let c;
              for (; (c = l()); ) or(t, e, i, c, o);
              or(t, e, i, a, o);
            } else 16 & u ? Pf(e, t, r, n, i, o) : or(t, e, i, a, o);
          n = s ? n.projectionNext : n.next;
        }
      }
      function fi(e, t, n, r, i, o) {
        tu(n, r, e.firstChild, t, i, o, !1);
      }
      function Pf(e, t, n, r, i, o) {
        const s = n[16],
          u = s[6].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) or(t, e, i, u[l], o);
        else tu(e, t, u, s[3], i, o, !0);
      }
      function Nf(e, t, n) {
        oe(e) ? e.setAttribute(t, "style", n) : (t.style.cssText = n);
      }
      function nu(e, t, n) {
        oe(e)
          ? "" === n
            ? e.removeAttribute(t, "class")
            : e.setAttribute(t, "class", n)
          : (t.className = n);
      }
      function Of(e, t, n) {
        let r = e.length;
        for (;;) {
          const i = e.indexOf(t, n);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = t.length;
            if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
          }
          n = i + 1;
        }
      }
      const Ff = "ng-template";
      function Z_(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let i = e[r++];
          if (n && "class" === i) {
            if (((i = e[r]), -1 !== Of(i.toLowerCase(), t, 0))) return !0;
          } else if (1 === i) {
            for (; r < e.length && "string" == typeof (i = e[r++]); )
              if (i.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function kf(e) {
        return 4 === e.type && e.value !== Ff;
      }
      function Y_(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Ff);
      }
      function K_(e, t, n) {
        let r = 4;
        const i = e.attrs || [],
          o = (function ew(e) {
            for (let t = 0; t < e.length; t++) if (bd(e[t])) return t;
            return e.length;
          })(i);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !Y_(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (pt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!Z_(e.attrs, l, n)) {
                    if (pt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = J_(8 & r ? "class" : u, i, kf(e), n);
                if (-1 === d) {
                  if (pt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > o ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Of(h, l, 0)) || (2 & r && l !== f)) {
                    if (pt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !pt(r) && !pt(u)) return !1;
            if (s && pt(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return pt(r) || s;
      }
      function pt(e) {
        return 0 == (1 & e);
      }
      function J_(e, t, n, r) {
        if (null === t) return -1;
        let i = 0;
        if (r || !n) {
          let o = !1;
          for (; i < t.length; ) {
            const s = t[i];
            if (s === e) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++i];
                for (; "string" == typeof a; ) a = t[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function tw(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Lf(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (K_(e, t[r], n)) return !0;
        return !1;
      }
      function jf(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function rw(e) {
        let t = e[0],
          n = 1,
          r = 2,
          i = "",
          o = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
          else
            "" !== i && !pt(s) && ((t += jf(o, i)), (i = "")),
              (r = s),
              (o = o || !pt(r));
          n++;
        }
        return "" !== i && (t += jf(o, i)), t;
      }
      const P = {};
      function hi(e) {
        Vf($(), y(), Oe() + e, lo());
      }
      function Vf(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const o = e.preOrderCheckHooks;
            null !== o && go(t, o, n);
          } else {
            const o = e.preOrderHooks;
            null !== o && mo(t, o, 0, n);
          }
        sn(n);
      }
      function Oo(e, t) {
        return (e << 17) | (t << 2);
      }
      function gt(e) {
        return (e >> 17) & 32767;
      }
      function ru(e) {
        return 2 | e;
      }
      function zt(e) {
        return (131068 & e) >> 2;
      }
      function iu(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function ou(e) {
        return 1 | e;
      }
      function Yf(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r],
              o = n[r + 1];
            if (-1 !== o) {
              const s = e.data[o];
              Da(i), s.contentQueries(2, t[o], o);
            }
          }
      }
      function pi(e, t, n, r, i, o, s, a, u, l) {
        const c = t.blueprint.slice();
        return (
          (c[0] = i),
          (c[2] = 140 | r),
          fd(c),
          (c[3] = c[15] = e),
          (c[8] = n),
          (c[10] = s || (e && e[10])),
          (c[F] = a || (e && e[F])),
          (c[12] = u || (e && e[12]) || null),
          (c[9] = l || (e && e[9]) || null),
          (c[6] = o),
          (c[16] = 2 == t.type ? e[16] : c),
          c
        );
      }
      function sr(e, t, n, r, i) {
        let o = e.data[t];
        if (null === o)
          (o = (function pu(e, t, n, r, i) {
            const o = pd(),
              s = ga(),
              u = (e.data[t] = (function _w(e, t, n, r, i, o) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: i,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? o : o && o.parent, n, t, r, i));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== o &&
                (s
                  ? null == o.child && null !== u.parent && (o.child = u)
                  : null === o.next && (o.next = u)),
              u
            );
          })(e, t, n, r, i)),
            (function $D() {
              return x.lFrame.inI18n;
            })() && (o.flags |= 64);
        else if (64 & o.type) {
          (o.type = n), (o.value = r), (o.attrs = i);
          const s = (function Wr() {
            const e = x.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return It(o, !0), o;
      }
      function ar(e, t, n, r) {
        if (0 === n) return -1;
        const i = t.length;
        for (let o = 0; o < n; o++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function gi(e, t, n) {
        fo(t);
        try {
          const r = e.viewQuery;
          null !== r && Eu(1, r, n);
          const i = e.template;
          null !== i && Kf(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Yf(e, t),
            e.staticViewQueries && Eu(2, e.viewQuery, n);
          const o = e.components;
          null !== o &&
            (function vw(e, t) {
              for (let n = 0; n < t.length; n++) Vw(e, t[n]);
            })(t, o);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), ho();
        }
      }
      function ur(e, t, n, r) {
        const i = t[2];
        if (256 == (256 & i)) return;
        fo(t);
        const o = lo();
        try {
          fd(t),
            (function gd(e) {
              return (x.lFrame.bindingIndex = e);
            })(e.bindingStartIndex),
            null !== n && Kf(e, t, n, 2, r);
          const s = 3 == (3 & i);
          if (!o)
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && go(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && mo(t, l, 0, null), Ca(t, 0);
            }
          if (
            ((function Lw(e) {
              for (let t = Wa(e); null !== t; t = Qa(t)) {
                if (!t[2]) continue;
                const n = t[9];
                for (let r = 0; r < n.length; r++) {
                  const i = n[r],
                    o = i[3];
                  0 == (1024 & i[2]) && pa(o, 1), (i[2] |= 1024);
                }
              }
            })(t),
            (function kw(e) {
              for (let t = Wa(e); null !== t; t = Qa(t))
                for (let n = 10; n < t.length; n++) {
                  const r = t[n],
                    i = r[1];
                  ha(r) && ur(i, r, i.template, r[8]);
                }
            })(t),
            null !== e.contentQueries && Yf(e, t),
            !o)
          )
            if (s) {
              const l = e.contentCheckHooks;
              null !== l && go(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && mo(t, l, 1), Ca(t, 1);
            }
          !(function mw(e, t) {
            const n = e.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const i = n[r];
                  if (i < 0) sn(~i);
                  else {
                    const o = i,
                      s = n[++r],
                      a = n[++r];
                    qD(s, o), a(2, t[o]);
                  }
                }
              } finally {
                sn(-1);
              }
          })(e, t);
          const a = e.components;
          null !== a &&
            (function yw(e, t) {
              for (let n = 0; n < t.length; n++) jw(e, t[n]);
            })(t, a);
          const u = e.viewQuery;
          if ((null !== u && Eu(2, u, r), !o))
            if (s) {
              const l = e.viewCheckHooks;
              null !== l && go(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && mo(t, l, 2), Ca(t, 2);
            }
          !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
            o || (t[2] &= -73),
            1024 & t[2] && ((t[2] &= -1025), pa(t[3], -1));
        } finally {
          ho();
        }
      }
      function Dw(e, t, n, r) {
        const i = t[10],
          o = !lo(),
          s = (function dd(e) {
            return 4 == (4 & e[2]);
          })(t);
        try {
          o && !s && i.begin && i.begin(), s && gi(e, t, r), ur(e, t, n, r);
        } finally {
          o && !s && i.end && i.end();
        }
      }
      function Kf(e, t, n, r, i) {
        const o = Oe(),
          s = 2 & r;
        try {
          sn(-1), s && t.length > K && Vf(e, t, K, lo()), n(r, i);
        } finally {
          sn(o);
        }
      }
      function gu(e, t, n) {
        !hd() ||
          ((function Tw(e, t, n, r) {
            const i = n.directiveStart,
              o = n.directiveEnd;
            e.firstCreatePass || Yr(n, t), Ae(r, t);
            const s = n.initialInputs;
            for (let a = i; a < o; a++) {
              const u = e.data[a],
                l = ht(u);
              l && Nw(t, n, u);
              const c = Kr(t, e, a, n);
              Ae(c, t),
                null !== s && Ow(0, a - i, c, u, 0, s),
                l && (Ge(n.index, t)[8] = c);
            }
          })(e, t, n, nt(n, t)),
          128 == (128 & n.flags) &&
            (function Aw(e, t, n) {
              const r = n.directiveStart,
                i = n.directiveEnd,
                s = n.index,
                a = (function GD() {
                  return x.lFrame.currentDirectiveIndex;
                })();
              try {
                sn(s);
                for (let u = r; u < i; u++) {
                  const l = e.data[u],
                    c = t[u];
                  ya(u),
                    (null !== l.hostBindings ||
                      0 !== l.hostVars ||
                      null !== l.hostAttrs) &&
                      sh(l, c);
                }
              } finally {
                sn(-1), ya(a);
              }
            })(e, t, n));
      }
      function mu(e, t, n = nt) {
        const r = t.localNames;
        if (null !== r) {
          let i = t.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[i++] = a;
          }
        }
      }
      function Xf(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Lo(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Lo(e, t, n, r, i, o, s, a, u, l) {
        const c = K + r,
          d = c + i,
          f = (function Cw(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : P);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function rh(e, t, n) {
        for (let r in e)
          if (e.hasOwnProperty(r)) {
            const i = e[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(t, i)
              : (n[r] = [t, i]);
          }
        return n;
      }
      function yu(e, t, n, r) {
        let i = !1;
        if (hd()) {
          const o = (function xw(e, t, n) {
              const r = e.directiveRegistry;
              let i = null;
              if (r)
                for (let o = 0; o < r.length; o++) {
                  const s = r[o];
                  Lf(n, s.selectors, !1) &&
                    (i || (i = []),
                    _o(Yr(n, t), e, s.type),
                    ht(s) ? (ah(e, n), i.unshift(s)) : i.push(s));
                }
              return i;
            })(e, t, n),
            s = null === r ? null : { "": -1 };
          if (null !== o) {
            (i = !0), uh(n, e.data.length, o.length);
            for (let c = 0; c < o.length; c++) {
              const d = o[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              u = !1,
              l = ar(e, t, o.length, null);
            for (let c = 0; c < o.length; c++) {
              const d = o[c];
              (n.mergedAttrs = vo(n.mergedAttrs, d.hostAttrs)),
                lh(e, n, t, l, d),
                Pw(l, d, s),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !u &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (u = !0)),
                l++;
            }
            !(function ww(e, t) {
              const r = t.directiveEnd,
                i = e.data,
                o = t.attrs,
                s = [];
              let a = null,
                u = null;
              for (let l = t.directiveStart; l < r; l++) {
                const c = i[l],
                  d = c.inputs,
                  f = null === o || kf(t) ? null : Fw(d, o);
                s.push(f), (a = rh(d, l, a)), (u = rh(c.outputs, l, u));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (t.flags |= 16),
                a.hasOwnProperty("style") && (t.flags |= 32)),
                (t.initialInputs = s),
                (t.inputs = a),
                (t.outputs = u);
            })(e, n);
          }
          s &&
            (function Rw(e, t, n) {
              if (t) {
                const r = (e.localNames = []);
                for (let i = 0; i < t.length; i += 2) {
                  const o = n[t[i + 1]];
                  if (null == o) throw new z(-301, !1);
                  r.push(t[i], o);
                }
              }
            })(n, r, s);
        }
        return (n.mergedAttrs = vo(n.mergedAttrs, n.attrs)), i;
      }
      function oh(e, t, n, r, i, o) {
        const s = o.hostBindings;
        if (s) {
          let a = e.hostBindingOpCodes;
          null === a && (a = e.hostBindingOpCodes = []);
          const u = ~t.index;
          (function Sw(e) {
            let t = e.length;
            for (; t > 0; ) {
              const n = e[--t];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != u && a.push(u),
            a.push(r, i, s);
        }
      }
      function sh(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function ah(e, t) {
        (t.flags |= 2), (e.components || (e.components = [])).push(t.index);
      }
      function Pw(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          ht(t) && (n[""] = e);
        }
      }
      function uh(e, t, n) {
        (e.flags |= 1),
          (e.directiveStart = t),
          (e.directiveEnd = t + n),
          (e.providerIndexes = t);
      }
      function lh(e, t, n, r, i) {
        e.data[r] = i;
        const o = i.factory || (i.factory = In(i.type)),
          s = new Qr(o, ht(i), null);
        (e.blueprint[r] = s),
          (n[r] = s),
          oh(e, t, 0, r, ar(e, n, i.hostVars, P), i);
      }
      function Nw(e, t, n) {
        const r = nt(t, e),
          i = Xf(n),
          o = e[10],
          s = jo(
            e,
            pi(
              e,
              i,
              null,
              n.onPush ? 64 : 16,
              r,
              t,
              o,
              o.createRenderer(r, n),
              null,
              null
            )
          );
        e[t.index] = s;
      }
      function Ow(e, t, n, r, i, o) {
        const s = o[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function Fw(e, t) {
        let n = null,
          r = 0;
        for (; r < t.length; ) {
          const i = t[r];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              e.hasOwnProperty(i) &&
                (null === n && (n = []), n.push(i, e[i], t[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function ch(e, t, n, r) {
        return new Array(e, !0, !1, t, null, 0, r, n, null, null);
      }
      function jw(e, t) {
        const n = Ge(t, e);
        if (ha(n)) {
          const r = n[1];
          80 & n[2] ? ur(r, n, r.template, n[8]) : n[5] > 0 && Du(n);
        }
      }
      function Du(e) {
        for (let r = Wa(e); null !== r; r = Qa(r))
          for (let i = 10; i < r.length; i++) {
            const o = r[i];
            if (1024 & o[2]) {
              const s = o[1];
              ur(s, o, s.template, o[8]);
            } else o[5] > 0 && Du(o);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = Ge(n[r], e);
            ha(i) && i[5] > 0 && Du(i);
          }
      }
      function Vw(e, t) {
        const n = Ge(t, e),
          r = n[1];
        (function Bw(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          gi(r, n, n[8]);
      }
      function jo(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Cu(e) {
        for (; e; ) {
          e[2] |= 64;
          const t = di(e);
          if (CD(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function wu(e, t, n) {
        const r = t[10];
        r.begin && r.begin();
        try {
          ur(e, t, e.template, n);
        } catch (i) {
          throw (gh(t, i), i);
        } finally {
          r.end && r.end();
        }
      }
      function dh(e) {
        !(function _u(e) {
          for (let t = 0; t < e.components.length; t++) {
            const n = e.components[t],
              r = Ua(n),
              i = r[1];
            Dw(i, r, i.template, n);
          }
        })(e[8]);
      }
      function Eu(e, t, n) {
        Da(0), t(e, n);
      }
      const qw = (() => Promise.resolve(null))();
      function fh(e) {
        return e[7] || (e[7] = []);
      }
      function hh(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function gh(e, t) {
        const n = e[9],
          r = n ? n.get(rr, null) : null;
        r && r.handleError(t);
      }
      function mh(e, t, n, r, i) {
        for (let o = 0; o < n.length; ) {
          const s = n[o++],
            a = n[o++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, i, r, a) : (u[a] = i);
        }
      }
      function Vo(e, t, n) {
        let r = n ? e.styles : null,
          i = n ? e.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (i = Zs(i, a))
              : 2 == o && (r = Zs(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      const bu = new G("INJECTOR", -1);
      class yh {
        get(t, n = ni) {
          if (n === ni) {
            const r = new Error(`NullInjectorError: No provider for ${W(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const Mu = new G("Set Injector scope."),
        mi = {},
        Ww = {};
      let Iu;
      function vh() {
        return void 0 === Iu && (Iu = new yh()), Iu;
      }
      function Dh(e, t = null, n = null, r) {
        const i = Ch(e, t, n, r);
        return i._resolveInjectorDefTypes(), i;
      }
      function Ch(e, t = null, n = null, r) {
        return new Qw(e, n, t || vh(), r);
      }
      class Qw {
        constructor(t, n, r, i = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const o = [];
          n && St(n, (a) => this.processProvider(a, t, n)),
            St([t], (a) => this.processInjectorType(a, [], o)),
            this.records.set(bu, lr(void 0, this));
          const s = this.records.get(Mu);
          (this.scope = null != s ? s.value : null),
            (this.source = i || ("object" == typeof t ? null : W(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, n = ni, r = N.Default) {
          this.assertNotDestroyed();
          const i = Ud(this),
            o = tn(void 0);
          try {
            if (!(r & N.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function nE(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof G)
                    );
                  })(t) && Js(t);
                (a = u && this.injectableDefInScope(u) ? lr(Su(t), mi) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & N.Self ? vh() : this.parent).get(
              t,
              (n = r & N.Optional && n === ni ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Mo] = s[Mo] || []).unshift(W(t)), i)) throw s;
              return (function xC(e, t, n, r) {
                const i = e[Mo];
                throw (
                  (t[Hd] && i.unshift(t[Hd]),
                  (e.message = (function RC(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.substr(2)
                        : e;
                    let i = W(t);
                    if (Array.isArray(t)) i = t.map(W).join(" -> ");
                    else if ("object" == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : W(a))
                          );
                        }
                      i = `{${o.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
                      MC,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[Mo] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            tn(o), Ud(i);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((r, i) => t.push(W(i))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new z(205, !1);
        }
        processInjectorType(t, n, r) {
          if (!(t = O(t))) return !1;
          let i = Jc(t);
          const o = (null == i && t.ngModule) || void 0,
            s = void 0 === o ? t : o,
            a = -1 !== r.indexOf(s);
          if ((void 0 !== o && (i = Jc(o)), null == i)) return !1;
          if (null != i.imports && !a) {
            let c;
            r.push(s);
            try {
              St(i.imports, (d) => {
                this.processInjectorType(d, n, r) &&
                  (void 0 === c && (c = []), c.push(d));
              });
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d];
                St(h, (p) => this.processProvider(p, f, h || Y));
              }
          }
          this.injectorDefTypes.add(s);
          const u = In(s) || (() => new s());
          this.records.set(s, lr(u, mi));
          const l = i.providers;
          if (null != l && !a) {
            const c = t;
            St(l, (d) => this.processProvider(d, c, l));
          }
          return void 0 !== o && void 0 !== t.providers;
        }
        processProvider(t, n, r) {
          let i = cr((t = O(t))) ? t : O(t && t.provide);
          const o = (function Yw(e, t, n) {
            return wh(e)
              ? lr(void 0, e.useValue)
              : lr(
                  (function _h(e, t, n) {
                    let r;
                    if (cr(e)) {
                      const i = O(e);
                      return In(i) || Su(i);
                    }
                    if (wh(e)) r = () => O(e.useValue);
                    else if (
                      (function Jw(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...Pa(e.deps || []));
                    else if (
                      (function Kw(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => A(O(e.useExisting));
                    else {
                      const i = O(e && (e.useClass || e.provide));
                      if (
                        !(function eE(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return In(i) || Su(i);
                      r = () => new i(...Pa(e.deps));
                    }
                    return r;
                  })(e),
                  mi
                );
          })(t);
          if (cr(t) || !0 !== t.multi) this.records.get(i);
          else {
            let s = this.records.get(i);
            s ||
              ((s = lr(void 0, mi, !0)),
              (s.factory = () => Pa(s.multi)),
              this.records.set(i, s)),
              (i = t),
              s.multi.push(t);
          }
          this.records.set(i, o);
        }
        hydrate(t, n) {
          return (
            n.value === mi && ((n.value = Ww), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function tE(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = O(t.providedIn);
          return "string" == typeof n
            ? "any" === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function Su(e) {
        const t = Js(e),
          n = null !== t ? t.factory : In(e);
        if (null !== n) return n;
        if (e instanceof G) throw new z(204, !1);
        if (e instanceof Function)
          return (function Zw(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function ti(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new z(204, !1))
              );
            const n = (function aD(e) {
              const t = e && (e[to] || e[Xc]);
              if (t) {
                const n = (function uD(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new z(204, !1);
      }
      function lr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function wh(e) {
        return null !== e && "object" == typeof e && SC in e;
      }
      function cr(e) {
        return "function" == typeof e;
      }
      let ke = (() => {
        class e {
          static create(n, r) {
            var i;
            if (Array.isArray(n)) return Dh({ name: "" }, r, n, "");
            {
              const o = null !== (i = n.name) && void 0 !== i ? i : "";
              return Dh({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = ni),
          (e.NULL = new yh()),
          (e.ɵprov = q({ token: e, providedIn: "any", factory: () => A(bu) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function cE(e, t) {
        po(Ua(e)[1], pe());
      }
      let Bo = null;
      function dr() {
        if (!Bo) {
          const e = Q.Symbol;
          if (e && e.iterator) Bo = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (Bo = r);
            }
          }
        }
        return Bo;
      }
      function yi(e) {
        return (
          !!Ru(e) && (Array.isArray(e) || (!(e instanceof Map) && dr() in e))
        );
      }
      function Ru(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function xe(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function E(e, t = N.Default) {
        const n = y();
        return null === n ? A(e, t) : Rd(pe(), n, O(e), t);
      }
      function Lu() {
        throw new Error("invalid");
      }
      function $o(e, t, n) {
        const r = y();
        return (
          xe(
            r,
            (function Gn() {
              return x.lFrame.bindingIndex++;
            })(),
            t
          ) &&
            (function Qe(e, t, n, r, i, o, s, a) {
              const u = nt(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (mh(e, n, c, r, i),
                  so(t) &&
                    (function bw(e, t) {
                      const n = Ge(t, e);
                      16 & n[2] || (n[2] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function Ew(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (i = null != s ? s(i, t.value || "", r) : i),
                  oe(o)
                    ? o.setProperty(u, r, i)
                    : wa(r) ||
                      (u.setProperty ? u.setProperty(r, i) : (u[r] = i)));
            })(
              $(),
              (function se() {
                const e = x.lFrame;
                return fa(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[F],
              n,
              !1
            ),
          $o
        );
      }
      function ju(e, t, n, r, i) {
        const s = i ? "class" : "style";
        mh(e, n, t.inputs[s], s, r);
      }
      function M(e, t, n, r) {
        const i = y(),
          o = $(),
          s = K + e,
          a = i[F],
          u = (i[s] = Ya(
            a,
            t,
            (function XD() {
              return x.lFrame.currentNamespace;
            })()
          )),
          l = o.firstCreatePass
            ? (function $E(e, t, n, r, i, o, s) {
                const a = t.consts,
                  l = sr(t, e, 2, i, on(a, o));
                return (
                  yu(t, n, l, on(a, s)),
                  null !== l.attrs && Vo(l, l.attrs, !1),
                  null !== l.mergedAttrs && Vo(l, l.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, l),
                  l
                );
              })(s, o, i, 0, t, n, r)
            : o.data[s];
        It(l, !0);
        const c = l.mergedAttrs;
        null !== c && yo(a, u, c);
        const d = l.classes;
        null !== d && nu(a, u, d);
        const f = l.styles;
        null !== f && Nf(a, u, f),
          64 != (64 & l.flags) && Po(o, i, u, l),
          0 ===
            (function kD() {
              return x.lFrame.elementDepthCount;
            })() && Ae(u, i),
          (function LD() {
            x.lFrame.elementDepthCount++;
          })(),
          ao(l) &&
            (gu(o, i, l),
            (function Jf(e, t, n) {
              if (oa(t)) {
                const i = t.directiveEnd;
                for (let o = t.directiveStart; o < i; o++) {
                  const s = e.data[o];
                  s.contentQueries && s.contentQueries(1, n[o], o);
                }
              }
            })(o, l, i)),
          null !== r && mu(i, l);
      }
      function I() {
        let e = pe();
        ga()
          ? (function ma() {
              x.lFrame.isParent = !1;
            })()
          : ((e = e.parent), It(e, !1));
        const t = e;
        !(function jD() {
          x.lFrame.elementDepthCount--;
        })();
        const n = $();
        n.firstCreatePass && (po(n, e), oa(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function iC(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            ju(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function oC(e) {
              return 0 != (32 & e.flags);
            })(t) &&
            ju(n, t, y(), t.stylesWithoutHost, !1);
      }
      function ot(e, t, n, r) {
        M(e, t, n, r), I();
      }
      function qo(e) {
        return !!e && "function" == typeof e.then;
      }
      const op = function ip(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function wr(e, t, n, r) {
        const i = y(),
          o = $(),
          s = pe();
        return (
          (function ap(e, t, n, r, i, o, s, a) {
            const u = ao(r),
              c = e.firstCreatePass && hh(e),
              d = t[8],
              f = fh(t);
            let h = !0;
            if (3 & r.type || a) {
              const v = nt(r, t),
                D = a ? a(v) : v,
                g = f.length,
                w = a ? (T) => a(ce(T[r.index])) : r.index;
              if (oe(n)) {
                let T = null;
                if (
                  (!a &&
                    u &&
                    (T = (function WE(e, t, n, r) {
                      const i = e.cleanup;
                      if (null != i)
                        for (let o = 0; o < i.length - 1; o += 2) {
                          const s = i[o];
                          if (s === n && i[o + 1] === r) {
                            const a = t[7],
                              u = i[o + 2];
                            return a.length > u ? a[u] : null;
                          }
                          "string" == typeof s && (o += 2);
                        }
                      return null;
                    })(e, t, i, r.index)),
                  null !== T)
                )
                  ((T.__ngLastListenerFn__ || T).__ngNextListenerFn__ = o),
                    (T.__ngLastListenerFn__ = o),
                    (h = !1);
                else {
                  o = Vu(r, t, d, o, !1);
                  const U = n.listen(D, i, o);
                  f.push(o, U), c && c.push(i, w, g, g + 1);
                }
              } else
                (o = Vu(r, t, d, o, !0)),
                  D.addEventListener(i, o, s),
                  f.push(o),
                  c && c.push(i, w, g, s);
            } else o = Vu(r, t, d, o, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[i])) {
              const v = m.length;
              if (v)
                for (let D = 0; D < v; D += 2) {
                  const Ke = t[m[D]][m[D + 1]].subscribe(o),
                    jn = f.length;
                  f.push(o, Ke), c && c.push(i, r.index, jn, -(jn + 1));
                }
            }
          })(o, i, i[F], s, e, t, !!n, r),
          wr
        );
      }
      function up(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (i) {
          return gh(e, i), !1;
        }
      }
      function Vu(e, t, n, r, i) {
        return function o(s) {
          if (s === Function) return r;
          const a = 2 & e.flags ? Ge(e.index, t) : t;
          0 == (32 & t[2]) && Cu(a);
          let u = up(t, 0, r, s),
            l = o.__ngNextListenerFn__;
          for (; l; ) (u = up(t, 0, l, s) && u), (l = l.__ngNextListenerFn__);
          return i && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function vp(e, t, n, r, i) {
        const o = e[n + 1],
          s = null === t;
        let a = r ? gt(o) : zt(o),
          u = !1;
        for (; 0 !== a && (!1 === u || s); ) {
          const c = e[a + 1];
          e0(e[a], t) && ((u = !0), (e[a + 1] = r ? ou(c) : ru(c))),
            (a = r ? gt(c) : zt(c));
        }
        u && (e[n + 1] = r ? ru(o) : ou(o));
      }
      function e0(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && Xn(e, t) >= 0)
        );
      }
      function Di(e, t) {
        return (
          (function yt(e, t, n, r) {
            const i = y(),
              o = $(),
              s = (function Gt(e) {
                const t = x.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            o.firstUpdatePass &&
              (function Sp(e, t, n, r) {
                const i = e.data;
                if (null === i[n + 1]) {
                  const o = i[Oe()],
                    s = (function Ip(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function Rp(e, t) {
                    return 0 != (e.flags & (t ? 16 : 32));
                  })(o, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function c0(e, t, n, r) {
                      const i = (function va(e) {
                        const t = x.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let o = r ? t.residualClasses : t.residualStyles;
                      if (null === i)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = Ci((n = Hu(null, e, t, n, r)), t.attrs, r)),
                          (o = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== i)
                          if (((n = Hu(i, e, t, n, r)), null === o)) {
                            let u = (function d0(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== zt(r)) return e[gt(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = Hu(null, e, t, u[1], r)),
                              (u = Ci(u, t.attrs, r)),
                              (function f0(e, t, n, r) {
                                e[gt(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            o = (function h0(e, t, n) {
                              let r;
                              const i = t.directiveEnd;
                              for (
                                let o = 1 + t.directiveStylingLast;
                                o < i;
                                o++
                              )
                                r = Ci(r, e[o].hostAttrs, n);
                              return Ci(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== o &&
                          (r
                            ? (t.residualClasses = o)
                            : (t.residualStyles = o)),
                        n
                      );
                    })(i, o, t, r)),
                    (function JE(e, t, n, r, i, o) {
                      let s = o ? t.classBindings : t.styleBindings,
                        a = gt(s),
                        u = zt(s);
                      e[r] = n;
                      let c,
                        l = !1;
                      if (Array.isArray(n)) {
                        const d = n;
                        (c = d[1]), (null === c || Xn(d, c) > 0) && (l = !0);
                      } else c = n;
                      if (i)
                        if (0 !== u) {
                          const f = gt(e[a + 1]);
                          (e[r + 1] = Oo(f, a)),
                            0 !== f && (e[f + 1] = iu(e[f + 1], r)),
                            (e[a + 1] = (function sw(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = Oo(a, 0)),
                            0 !== a && (e[a + 1] = iu(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = Oo(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = iu(e[u + 1], r)),
                          (u = r);
                      l && (e[r + 1] = ru(e[r + 1])),
                        vp(e, c, r, !0),
                        vp(e, c, r, !1),
                        (function XE(e, t, n, r, i) {
                          const o = i ? e.residualClasses : e.residualStyles;
                          null != o &&
                            "string" == typeof t &&
                            Xn(o, t) >= 0 &&
                            (n[r + 1] = ou(n[r + 1]));
                        })(t, c, e, r, o),
                        (s = Oo(a, u)),
                        o ? (t.classBindings = s) : (t.styleBindings = s);
                    })(i, o, t, n, s, r);
                }
              })(o, e, s, r),
              t !== P &&
                xe(i, s, t) &&
                (function Ap(e, t, n, r, i, o, s, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    l = u[a + 1];
                  Go(
                    (function Uf(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? xp(u, t, n, i, zt(l), s)
                      : void 0
                  ) ||
                    (Go(o) ||
                      ((function Hf(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (o = xp(u, null, n, i, a, s))),
                    (function Q_(e, t, n, r, i) {
                      const o = oe(e);
                      if (t)
                        i
                          ? o
                            ? e.addClass(n, r)
                            : n.classList.add(r)
                          : o
                          ? e.removeClass(n, r)
                          : n.classList.remove(r);
                      else {
                        let s = -1 === r.indexOf("-") ? void 0 : We.DashCase;
                        if (null == i)
                          o
                            ? e.removeStyle(n, r, s)
                            : n.style.removeProperty(r);
                        else {
                          const a =
                            "string" == typeof i && i.endsWith("!important");
                          a && ((i = i.slice(0, -10)), (s |= We.Important)),
                            o
                              ? e.setStyle(n, r, i, s)
                              : n.style.setProperty(r, i, a ? "important" : "");
                        }
                      }
                    })(
                      r,
                      s,
                      (function uo(e, t) {
                        return ce(t[e]);
                      })(Oe(), n),
                      i,
                      o
                    ));
                })(
                  o,
                  o.data[Oe()],
                  i,
                  i[F],
                  e,
                  (i[s + 1] = (function m0(e, t) {
                    return (
                      null == e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e &&
                            (e = W(
                              (function un(e) {
                                return e instanceof
                                  class Kd {
                                    constructor(t) {
                                      this.changingThisBreaksApplicationSecurity =
                                        t;
                                    }
                                    toString() {
                                      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
                                    }
                                  }
                                  ? e.changingThisBreaksApplicationSecurity
                                  : e;
                              })(e)
                            ))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Di
        );
      }
      function Hu(e, t, n, r, i) {
        let o = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((o = t[a]), (r = Ci(r, o.hostAttrs, i)), o !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function Ci(e, t, n) {
        const r = n ? 1 : 2;
        let i = -1;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const s = t[o];
            "number" == typeof s
              ? (i = s)
              : i === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                ze(e, s, !!n || t[++o]));
          }
        return void 0 === e ? null : e;
      }
      function xp(e, t, n, r, i, o) {
        const s = null === t;
        let a;
        for (; i > 0; ) {
          const u = e[i],
            l = Array.isArray(u),
            c = l ? u[1] : u,
            d = null === c;
          let f = n[i + 1];
          f === P && (f = d ? Y : void 0);
          let h = d ? Aa(f, r) : c === r ? f : void 0;
          if ((l && !Go(h) && (h = Aa(u, r)), Go(h) && ((a = h), s))) return a;
          const p = e[i + 1];
          i = s ? gt(p) : zt(p);
        }
        if (null !== t) {
          let u = o ? t.residualClasses : t.residualStyles;
          null != u && (a = Aa(u, r));
        }
        return a;
      }
      function Go(e) {
        return void 0 !== e;
      }
      function ye(e, t = "") {
        const n = y(),
          r = $(),
          i = e + K,
          o = r.firstCreatePass ? sr(r, i, 1, t, null) : r.data[i],
          s = (n[i] = (function Za(e, t) {
            return oe(e) ? e.createText(t) : e.createTextNode(t);
          })(n[F], t));
        Po(r, n, s, o), It(o, !1);
      }
      const xn = void 0;
      var k0 = [
        "en",
        [["a", "p"], ["AM", "PM"], xn],
        [["AM", "PM"], xn, xn],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        xn,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        xn,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", xn, "{1} 'at' {0}", xn],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function F0(e) {
          const n = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === n && 0 === r ? 1 : 5;
        },
      ];
      let br = {};
      function Xp(e) {
        return (
          e in br ||
            (br[e] =
              Q.ng &&
              Q.ng.common &&
              Q.ng.common.locales &&
              Q.ng.common.locales[e]),
          br[e]
        );
      }
      var _ = (() => (
        ((_ = _ || {})[(_.LocaleId = 0)] = "LocaleId"),
        (_[(_.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (_[(_.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (_[(_.DaysFormat = 3)] = "DaysFormat"),
        (_[(_.DaysStandalone = 4)] = "DaysStandalone"),
        (_[(_.MonthsFormat = 5)] = "MonthsFormat"),
        (_[(_.MonthsStandalone = 6)] = "MonthsStandalone"),
        (_[(_.Eras = 7)] = "Eras"),
        (_[(_.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (_[(_.WeekendRange = 9)] = "WeekendRange"),
        (_[(_.DateFormat = 10)] = "DateFormat"),
        (_[(_.TimeFormat = 11)] = "TimeFormat"),
        (_[(_.DateTimeFormat = 12)] = "DateTimeFormat"),
        (_[(_.NumberSymbols = 13)] = "NumberSymbols"),
        (_[(_.NumberFormats = 14)] = "NumberFormats"),
        (_[(_.CurrencyCode = 15)] = "CurrencyCode"),
        (_[(_.CurrencySymbol = 16)] = "CurrencySymbol"),
        (_[(_.CurrencyName = 17)] = "CurrencyName"),
        (_[(_.Currencies = 18)] = "Currencies"),
        (_[(_.Directionality = 19)] = "Directionality"),
        (_[(_.PluralCase = 20)] = "PluralCase"),
        (_[(_.ExtraData = 21)] = "ExtraData"),
        _
      ))();
      const zo = "en-US";
      let eg = zo;
      class Mg {}
      class Vb {
        resolveComponentFactory(t) {
          throw (function jb(e) {
            const t = Error(
              `No component factory found for ${W(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Ir = (() => {
        class e {}
        return (e.NULL = new Vb()), e;
      })();
      function Bb() {
        return Sr(pe(), y());
      }
      function Sr(e, t) {
        return new dn(nt(e, t));
      }
      let dn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = Bb), e;
      })();
      class Sg {}
      let qb = (() => {
        class e {}
        return (
          (e.ɵprov = q({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class Jo {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Gb = new Jo("13.2.2"),
        Zu = {};
      function Xo(e, t, n, r, i = !1) {
        for (; null !== n; ) {
          const o = t[n.index];
          if ((null !== o && r.push(ce(o)), ft(o)))
            for (let a = 10; a < o.length; a++) {
              const u = o[a],
                l = u[1].firstChild;
              null !== l && Xo(u[1], u, l, r);
            }
          const s = n.type;
          if (8 & s) Xo(e, t, n.child, r);
          else if (32 & s) {
            const a = za(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = xf(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = di(t[16]);
              Xo(u[1], u, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      class Mi {
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return Xo(n, t, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (ft(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Ka(t, r), Eo(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          _f(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function nh(e, t, n, r) {
            const i = fh(t);
            null === n
              ? i.push(r)
              : (i.push(n), e.firstCreatePass && hh(e).push(r, i.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Cu(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          wu(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function Uw(e, t, n) {
            co(!0);
            try {
              wu(e, t, n);
            } finally {
              co(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new z(902, "");
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function j_(e, t) {
              fi(e, t, t[F], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new z(902, "");
          this._appRef = t;
        }
      }
      class zb extends Mi {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          dh(this._view);
        }
        checkNoChanges() {
          !(function $w(e) {
            co(!0);
            try {
              dh(e);
            } finally {
              co(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      class Tg extends Ir {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = Se(t);
          return new Yu(n, this.ngModule);
        }
      }
      function Ag(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      const Qb = new G("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => hf,
      });
      class Yu extends Mg {
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function iw(e) {
              return e.map(rw).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return Ag(this.componentDef.inputs);
        }
        get outputs() {
          return Ag(this.componentDef.outputs);
        }
        create(t, n, r, i) {
          const o = (i = i || this.ngModule)
              ? (function Zb(e, t) {
                  return {
                    get: (n, r, i) => {
                      const o = e.get(n, Zu, i);
                      return o !== Zu || r === Zu ? o : t.get(n, r, i);
                    },
                  };
                })(t, i.injector)
              : t,
            s = o.get(Sg, cd),
            a = o.get(qb, null),
            u = s.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = r
              ? (function th(e, t, n) {
                  if (oe(e)) return e.selectRootElement(t, n === bt.ShadowDom);
                  let r = "string" == typeof t ? e.querySelector(t) : t;
                  return (r.textContent = ""), r;
                })(u, r, this.componentDef.encapsulation)
              : Ya(
                  s.createRenderer(null, this.componentDef),
                  l,
                  (function Wb(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(l)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function Nh(e, t) {
              return {
                components: [],
                scheduler: e || hf,
                clean: qw,
                playerHandler: t || null,
                flags: 0,
              };
            })(),
            h = Lo(0, null, null, 1, 0, null, null, null, null, null),
            p = pi(null, h, f, d, null, null, s, u, a, o);
          let m, v;
          fo(p);
          try {
            const D = (function Rh(e, t, n, r, i, o) {
              const s = n[1];
              n[20] = e;
              const u = sr(s, 20, 2, "#host", null),
                l = (u.mergedAttrs = t.hostAttrs);
              null !== l &&
                (Vo(u, l, !0),
                null !== e &&
                  (yo(i, e, l),
                  null !== u.classes && nu(i, e, u.classes),
                  null !== u.styles && Nf(i, e, u.styles)));
              const c = r.createRenderer(e, t),
                d = pi(
                  n,
                  Xf(t),
                  null,
                  t.onPush ? 64 : 16,
                  n[20],
                  u,
                  r,
                  c,
                  o || null,
                  null
                );
              return (
                s.firstCreatePass &&
                  (_o(Yr(u, n), s, t.type), ah(s, u), uh(u, n.length, 1)),
                jo(n, d),
                (n[20] = d)
              );
            })(c, this.componentDef, p, s, u);
            if (c)
              if (r) yo(u, c, ["ng-version", Gb.full]);
              else {
                const { attrs: g, classes: w } = (function ow(e) {
                  const t = [],
                    n = [];
                  let r = 1,
                    i = 2;
                  for (; r < e.length; ) {
                    let o = e[r];
                    if ("string" == typeof o)
                      2 === i
                        ? "" !== o && t.push(o, e[++r])
                        : 8 === i && n.push(o);
                    else {
                      if (!pt(i)) break;
                      i = o;
                    }
                    r++;
                  }
                  return { attrs: t, classes: n };
                })(this.componentDef.selectors[0]);
                g && yo(u, c, g), w && w.length > 0 && nu(u, c, w.join(" "));
              }
            if (((v = fa(h, K)), void 0 !== n)) {
              const g = (v.projection = []);
              for (let w = 0; w < this.ngContentSelectors.length; w++) {
                const T = n[w];
                g.push(null != T ? Array.from(T) : null);
              }
            }
            (m = (function Ph(e, t, n, r, i) {
              const o = n[1],
                s = (function Iw(e, t, n) {
                  const r = pe();
                  e.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    lh(e, r, t, ar(e, t, 1, null), n));
                  const i = Kr(t, e, r.directiveStart, r);
                  Ae(i, t);
                  const o = nt(r, t);
                  return o && Ae(o, t), i;
                })(o, n, t);
              if (
                (r.components.push(s),
                (e[8] = s),
                i && i.forEach((u) => u(s, t)),
                t.contentQueries)
              ) {
                const u = pe();
                t.contentQueries(1, s, u.directiveStart);
              }
              const a = pe();
              return (
                !o.firstCreatePass ||
                  (null === t.hostBindings && null === t.hostAttrs) ||
                  (sn(a.index),
                  oh(n[1], a, 0, a.directiveStart, a.directiveEnd, t),
                  sh(t, s)),
                s
              );
            })(D, this.componentDef, p, f, [cE])),
              gi(h, p, null);
          } finally {
            ho();
          }
          return new Kb(this.componentType, m, Sr(v, p), p, v);
        }
      }
      class Kb extends class Lb {} {
        constructor(t, n, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new zb(i)),
            (this.componentType = t);
        }
        get injector() {
          return new Qn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      class Qt {}
      class xg {}
      const Tr = new Map();
      class Ng extends Qt {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Tg(this));
          const r = Xe(t);
          (this._bootstrapComponents = xt(r.bootstrap)),
            (this._r3Injector = Ch(
              t,
              n,
              [
                { provide: Qt, useValue: this },
                { provide: Ir, useValue: this.componentFactoryResolver },
              ],
              W(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, n = ke.THROW_IF_NOT_FOUND, r = N.Default) {
          return t === ke || t === Qt || t === bu
            ? this
            : this._r3Injector.get(t, n, r);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Ku extends xg {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Xe(t) &&
              (function Xb(e) {
                const t = new Set();
                !(function n(r) {
                  const i = Xe(r, !0),
                    o = i.id;
                  null !== o &&
                    ((function Rg(e, t, n) {
                      if (t && t !== n)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${W(
                            t
                          )} vs ${W(t.name)}`
                        );
                    })(o, Tr.get(o), r),
                    Tr.set(o, r));
                  const s = xt(i.imports);
                  for (const a of s) t.has(a) || (t.add(a), n(a));
                })(e);
              })(t);
        }
        create(t) {
          return new Ng(this.moduleType, t);
        }
      }
      function Ju(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Re = class yM extends Lt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          var i, o, s;
          let a = t,
            u = n || (() => null),
            l = r;
          if (t && "object" == typeof t) {
            const d = t;
            (a = null === (i = d.next) || void 0 === i ? void 0 : i.bind(d)),
              (u = null === (o = d.error) || void 0 === o ? void 0 : o.bind(d)),
              (l =
                null === (s = d.complete) || void 0 === s ? void 0 : s.bind(d));
          }
          this.__isAsync && ((u = Ju(u)), a && (a = Ju(a)), l && (l = Ju(l)));
          const c = super.subscribe({ next: a, error: u, complete: l });
          return t instanceof Je && t.add(c), c;
        }
      };
      Symbol;
      let Zt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = _M), e;
      })();
      const DM = Zt,
        CM = class extends DM {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t) {
            const n = this._declarationTContainer.tViews,
              r = pi(
                this._declarationLView,
                n,
                t,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const o = this._declarationLView[19];
            return (
              null !== o && (r[19] = o.createEmbeddedView(n)),
              gi(n, r, t),
              new Mi(r)
            );
          }
        };
      function _M() {
        return (function es(e, t) {
          return 4 & e.type ? new CM(t, e, Sr(e, t)) : null;
        })(pe(), y());
      }
      let Dt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = wM), e;
      })();
      function wM() {
        return (function Hg(e, t) {
          let n;
          const r = t[e.index];
          if (ft(r)) n = r;
          else {
            let i;
            if (8 & e.type) i = ce(r);
            else {
              const o = t[F];
              i = o.createComment("");
              const s = nt(e, t);
              Tn(
                o,
                Ro(o, s),
                i,
                (function G_(e, t) {
                  return oe(e) ? e.nextSibling(t) : t.nextSibling;
                })(o, s),
                !1
              );
            }
            (t[e.index] = n = ch(r, t, i, e)), jo(t, n);
          }
          return new Vg(n, e, t);
        })(pe(), y());
      }
      const EM = Dt,
        Vg = class extends EM {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Sr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Qn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Co(this._hostTNode, this._hostLView);
            if (Id(t)) {
              const n = Wn(t, this._hostLView),
                r = zn(t);
              return new Qn(n[1].data[r + 8], n);
            }
            return new Qn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Bg(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            const i = t.createEmbeddedView(n || {});
            return this.insert(i, r), i;
          }
          createComponent(t, n, r, i, o) {
            const s =
              t &&
              !(function ei(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (i = d.projectableNodes),
                (o = d.ngModuleRef);
            }
            const u = s ? t : new Yu(Se(t)),
              l = r || this.parentInjector;
            if (!o && null == u.ngModule && l) {
              const d = l.get(Qt, null);
              d && (o = d);
            }
            const c = u.create(l, i, void 0, o);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              i = r[1];
            if (
              (function FD(e) {
                return ft(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new Vg(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const o = this._adjustIndex(n),
              s = this._lContainer;
            !(function B_(e, t, n, r) {
              const i = 10 + r,
                o = n.length;
              r > 0 && (n[i - 1][4] = t),
                r < o - 10
                  ? ((t[4] = n[i]), kd(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function H_(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 128);
            })(i, r, s, o);
            const a = eu(o, s),
              u = r[F],
              l = Ro(u, s[7]);
            return (
              null !== l &&
                (function L_(e, t, n, r, i, o) {
                  (r[0] = i), (r[6] = t), fi(e, r, n, 1, i, o);
                })(i, s[6], u, r, l, a),
              t.attachToViewContainerRef(),
              kd(el(s), o, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Bg(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Ka(this._lContainer, n);
            r && (Eo(el(this._lContainer), n), _f(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Ka(this._lContainer, n);
            return r && null != Eo(el(this._lContainer), n) ? new Mi(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return null == t ? this.length + n : t;
          }
        };
      function Bg(e) {
        return e[8];
      }
      function el(e) {
        return e[8] || (e[8] = []);
      }
      function rs(...e) {}
      const is = new G("Application Initializer");
      let xr = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = rs),
              (this.reject = rs),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, i) => {
                (this.resolve = r), (this.reject = i);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let i = 0; i < this.appInits.length; i++) {
                const o = this.appInits[i]();
                if (qo(o)) n.push(o);
                else if (op(o)) {
                  const s = new Promise((a, u) => {
                    o.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(is, 8));
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ai = new G("AppId"),
        KM = {
          provide: Ai,
          useFactory: function YM() {
            return `${pl()}${pl()}${pl()}`;
          },
          deps: [],
        };
      function pl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const lm = new G("Platform Initializer"),
        gl = new G("Platform ID"),
        cm = new G("appBootstrapListener");
      let dm = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const fn = new G("LocaleId"),
        fm = new G("DefaultCurrencyCode");
      class JM {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let os = (() => {
        class e {
          compileModuleSync(n) {
            return new Ku(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              o = xt(Xe(n).declarations).reduce((s, a) => {
                const u = Se(a);
                return u && s.push(new Yu(u)), s;
              }, []);
            return new JM(r, o);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const eI = (() => Promise.resolve(0))();
      function ml(e) {
        "undefined" == typeof Zone
          ? eI.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class ve {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Re(!1)),
            (this.onMicrotaskEmpty = new Re(!1)),
            (this.onStable = new Re(!1)),
            (this.onError = new Re(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function tI() {
              let e = Q.requestAnimationFrame,
                t = Q.cancelAnimationFrame;
              if ("undefined" != typeof Zone && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function iI(e) {
              const t = () => {
                !(function rI(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Q, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                vl(e),
                                (e.isCheckStableRunning = !0),
                                yl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    vl(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, o, s, a) => {
                  try {
                    return hm(e), n.invokeTask(i, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      pm(e);
                  }
                },
                onInvoke: (n, r, i, o, s, a, u) => {
                  try {
                    return hm(e), n.invoke(i, o, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), pm(e);
                  }
                },
                onHasTask: (n, r, i, o) => {
                  n.hasTask(i, o),
                    r === i &&
                      ("microTask" == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          vl(e),
                          yl(e))
                        : "macroTask" == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (n, r, i, o) => (
                  n.handleError(i, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return (
            "undefined" != typeof Zone &&
            !0 === Zone.current.get("isAngularZone")
          );
        }
        static assertInAngularZone() {
          if (!ve.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (ve.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + i, t, nI, rs, rs);
          try {
            return o.runTask(s, n, r);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const nI = {};
      function yl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function vl(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function hm(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function pm(e) {
        e._nesting--, yl(e);
      }
      class oI {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Re()),
            (this.onMicrotaskEmpty = new Re()),
            (this.onStable = new Re()),
            (this.onError = new Re());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, i) {
          return t.apply(n, r);
        }
      }
      let Dl = (() => {
          class e {
            constructor(n) {
              (this._ngZone = n),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ve.assertNotInAngularZone(),
                        ml(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                ml(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let o = -1;
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, i) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(ve));
            }),
            (e.ɵprov = q({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        gm = (() => {
          class e {
            constructor() {
              (this._applications = new Map()), Cl.addToWindow(this);
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Cl.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = q({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      class sI {
        addToWindow(t) {}
        findTestabilityInTree(t, n, r) {
          return null;
        }
      }
      let Ct,
        Cl = new sI();
      const mm = new G("AllowMultipleToken");
      class ym {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function vm(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new G(r);
        return (o = []) => {
          let s = Dm();
          if (!s || s.injector.get(mm, !1))
            if (e) e(n.concat(o).concat({ provide: i, useValue: !0 }));
            else {
              const a = n
                .concat(o)
                .concat(
                  { provide: i, useValue: !0 },
                  { provide: Mu, useValue: "platform" }
                );
              !(function cI(e) {
                if (Ct && !Ct.destroyed && !Ct.injector.get(mm, !1))
                  throw new z(400, "");
                Ct = e.get(Cm);
                const t = e.get(lm, null);
                t && t.forEach((n) => n());
              })(ke.create({ providers: a, name: r }));
            }
          return (function dI(e) {
            const t = Dm();
            if (!t) throw new z(401, "");
            return t;
          })();
        };
      }
      function Dm() {
        return Ct && !Ct.destroyed ? Ct : null;
      }
      let Cm = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function fI(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new oI()
                      : ("zone.js" === e ? void 0 : e) ||
                        new ve({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == t
                            ? void 0
                            : t.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              u = [{ provide: ve, useValue: a }];
            return a.run(() => {
              const l = ke.create({
                  providers: u,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(l),
                d = c.injector.get(rr, null);
              if (!d) throw new z(402, "");
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    _l(this._modules, c), f.unsubscribe();
                  });
                }),
                (function hI(e, t, n) {
                  try {
                    const r = n();
                    return qo(r)
                      ? r.catch((i) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(d, a, () => {
                  const f = c.injector.get(xr);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function H0(e) {
                          $e(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (eg = e.toLowerCase().replace(/_/g, "-"));
                        })(c.injector.get(fn, zo) || zo),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = _m({}, r);
            return (function uI(e, t, n) {
              const r = new Ku(n);
              return Promise.resolve(r);
            })(0, 0, n).then((o) => this.bootstrapModuleFactory(o, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(xi);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new z(403, "");
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new z(404, "");
            this._modules.slice().forEach((n) => n.destroy()),
              this._destroyListeners.forEach((n) => n()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(ke));
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function _m(e, t) {
        return Array.isArray(t)
          ? t.reduce(_m, e)
          : Object.assign(Object.assign({}, e), t);
      }
      let xi = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = i),
              (this._componentFactoryResolver = o),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const a = new ie((l) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    l.next(this._stable), l.complete();
                  });
              }),
              u = new ie((l) => {
                let c;
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    ve.assertNotInAngularZone(),
                      ml(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), l.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  ve.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        l.next(!1);
                      }));
                });
                return () => {
                  c.unsubscribe(), d.unsubscribe();
                };
              });
            this.isStable = (function eD(...e) {
              const t = Ur(e),
                n = (function Wv(e, t) {
                  return "number" == typeof zs(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? jt(r[0])
                  : Hr(n)(be(r, t))
                : Bt;
            })(
              a,
              u.pipe(
                (function tD(e = {}) {
                  const {
                    connector: t = () => new Lt(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: i = !0,
                  } = e;
                  return (o) => {
                    let s = null,
                      a = null,
                      u = null,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        null == a || a.unsubscribe(), (a = null);
                      },
                      h = () => {
                        f(), (s = u = null), (c = d = !1);
                      },
                      p = () => {
                        const m = s;
                        h(), null == m || m.unsubscribe();
                      };
                    return we((m, v) => {
                      l++, !d && !c && f();
                      const D = (u = null != u ? u : t());
                      v.add(() => {
                        l--, 0 === l && !d && !c && (a = Ws(p, i));
                      }),
                        D.subscribe(v),
                        s ||
                          ((s = new Ki({
                            next: (g) => D.next(g),
                            error: (g) => {
                              (d = !0), f(), (a = Ws(h, n, g)), D.error(g);
                            },
                            complete: () => {
                              (c = !0), f(), (a = Ws(h, r)), D.complete();
                            },
                          })),
                          be(m).subscribe(s));
                    })(o);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            if (!this._initStatus.done) throw new z(405, "");
            let i;
            (i =
              n instanceof Mg
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(i.componentType);
            const o = (function lI(e) {
                return e.isBoundToModule;
              })(i)
                ? void 0
                : this._injector.get(Qt),
              a = i.create(ke.NULL, [], r || i.selector, o),
              u = a.location.nativeElement,
              l = a.injector.get(Dl, null),
              c = l && a.injector.get(gm);
            return (
              l && c && c.registerApplication(u, l),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  _l(this.components, a),
                  c && c.unregisterApplication(u);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick) throw new z(101, "");
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            _l(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(cm, [])
                .concat(this._bootstrapListeners)
                .forEach((i) => i(n));
          }
          ngOnDestroy() {
            this._views.slice().forEach((n) => n.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(ve), A(ke), A(rr), A(Ir), A(xr));
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function _l(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Em = !0,
        wl = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = mI), e;
        })();
      function mI(e) {
        return (function yI(e, t, n) {
          if (so(e) && !n) {
            const r = Ge(e.index, t);
            return new Mi(r, r);
          }
          return 47 & e.type ? new Mi(t[16], t) : null;
        })(pe(), y(), 16 == (16 & e));
      }
      class Tm {
        constructor() {}
        supports(t) {
          return yi(t);
        }
        create(t) {
          return new EI(t);
        }
      }
      const wI = (e, t) => t;
      class EI {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || wI);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            o = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < xm(r, i, o)) ? n : r,
              a = xm(s, i, o),
              u = s.currentIndex;
            if (s === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const l = a - i,
                c = u - i;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  c <= p && p < l && (o[f] = h + 1);
                }
                o[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !yi(t))) throw new z(900, "");
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let i,
            o,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, o, s, a)),
                    Object.is(n.item, o) || this._addIdentityChange(n, o))
                  : ((n = this._mismatch(n, o, s, a)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function CE(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[dr()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(i, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, i)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, i) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, o, i))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, o, i))
              : (t = this._addAfter(new bI(n, r), o, i)),
            t
          );
        }
        _verifyReinsertion(t, n, r, i) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (t._next = i),
            (t._prev = n),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Am()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Am()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class bI {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class MI {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Am {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new MI()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const i = this.map.get(t);
          return i ? i.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function xm(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + t + i;
      }
      class Rm {
        constructor() {}
        supports(t) {
          return t instanceof Map || Ru(t);
        }
        create() {
          return new II();
        }
      }
      class II {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Ru(t))) throw new z(900, "");
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, i) => {
              if (n && n.key === i)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const o = this._getOrCreateRecordForKey(i, r);
                n = this._insertBeforeOrAppend(n, o);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const i = this._records.get(t);
            this._maybeAddToChanges(i, n);
            const o = i._prev,
              s = i._next;
            return (
              o && (o._next = s),
              s && (s._prev = o),
              (i._next = null),
              (i._prev = null),
              i
            );
          }
          const r = new SI(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class SI {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Pm() {
        return new Ri([new Tm()]);
      }
      let Ri = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Pm()),
              deps: [[e, new er(), new Tt()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new z(901, "");
          }
        }
        return (e.ɵprov = q({ token: e, providedIn: "root", factory: Pm })), e;
      })();
      function Nm() {
        return new Rr([new Rm()]);
      }
      let Rr = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Nm()),
              deps: [[e, new er(), new Tt()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new z(901, "");
          }
        }
        return (e.ɵprov = q({ token: e, providedIn: "root", factory: Nm })), e;
      })();
      const TI = [new Rm()],
        xI = new Ri([new Tm()]),
        RI = new Rr(TI),
        PI = vm(null, "core", [
          { provide: gl, useValue: "unknown" },
          { provide: Cm, deps: [ke] },
          { provide: gm, deps: [] },
          { provide: dm, deps: [] },
        ]),
        LI = [
          { provide: xi, useClass: xi, deps: [ve, ke, rr, Ir, xr] },
          {
            provide: Qb,
            deps: [ve],
            useFactory: function jI(e) {
              let t = [];
              return (
                e.onStable.subscribe(() => {
                  for (; t.length; ) t.pop()();
                }),
                function (n) {
                  t.push(n);
                }
              );
            },
          },
          { provide: xr, useClass: xr, deps: [[new Tt(), is]] },
          { provide: os, useClass: os, deps: [] },
          KM,
          {
            provide: Ri,
            useFactory: function NI() {
              return xI;
            },
            deps: [],
          },
          {
            provide: Rr,
            useFactory: function OI() {
              return RI;
            },
            deps: [],
          },
          {
            provide: fn,
            useFactory: function FI(e) {
              return (
                e ||
                (function kI() {
                  return (
                    ("undefined" != typeof $localize && $localize.locale) || zo
                  );
                })()
              );
            },
            deps: [[new oi(fn), new Tt(), new er()]],
          },
          { provide: fm, useValue: "USD" },
        ];
      let VI = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(xi));
            }),
            (e.ɵmod = _n({ type: e })),
            (e.ɵinj = en({ providers: LI })),
            e
          );
        })(),
        us = null;
      function hn() {
        return us;
      }
      const st = new G("DocumentToken");
      let Pn = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = q({
            token: e,
            factory: function () {
              return (function $I() {
                return A(Om);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const qI = new G("Location Initialized");
      let Om = (() => {
        class e extends Pn {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return hn().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = hn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = hn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, i) {
            Fm() ? this._history.pushState(n, r, i) : (this.location.hash = i);
          }
          replaceState(n, r, i) {
            Fm()
              ? this._history.replaceState(n, r, i)
              : (this.location.hash = i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(st));
          }),
          (e.ɵprov = q({
            token: e,
            factory: function () {
              return (function GI() {
                return new Om(A(st));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Fm() {
        return !!window.history.pushState;
      }
      function Sl(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function km(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function Yt(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Pr = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = q({
            token: e,
            factory: function () {
              return (function zI(e) {
                const t = A(st).location;
                return new Lm(A(Pn), (t && t.origin) || "");
              })();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const ls = new G("appBaseHref");
      let Lm = (() => {
          class e extends Pr {
            constructor(n, r) {
              if (
                (super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = r;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Sl(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Yt(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && n ? `${r}${i}` : r;
            }
            pushState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + Yt(o));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + Yt(o));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, i;
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(Pn), A(ls, 8));
            }),
            (e.ɵprov = q({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        WI = (() => {
          class e extends Pr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Sl(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + Yt(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + Yt(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, i;
              null === (i = (r = this._platformLocation).historyGo) ||
                void 0 === i ||
                i.call(r, n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(Pn), A(ls, 8));
            }),
            (e.ɵprov = q({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Tl = (() => {
          class e {
            constructor(n, r) {
              (this._subject = new Re()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = n);
              const i = this._platformStrategy.getBaseHref();
              (this._platformLocation = r),
                (this._baseHref = km(jm(i))),
                this._platformStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            path(n = !1) {
              return this.normalize(this._platformStrategy.path(n));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Yt(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function ZI(e, t) {
                  return e && t.startsWith(e) ? t.substring(e.length) : t;
                })(this._baseHref, jm(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._platformStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", i = null) {
              this._platformStrategy.pushState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Yt(r)),
                  i
                );
            }
            replaceState(n, r = "", i = null) {
              this._platformStrategy.replaceState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Yt(r)),
                  i
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(n = 0) {
              var r, i;
              null === (i = (r = this._platformStrategy).historyGo) ||
                void 0 === i ||
                i.call(r, n);
            }
            onUrlChange(n) {
              this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  }));
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((i) => i(n, r));
            }
            subscribe(n, r, i) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: i,
              });
            }
          }
          return (
            (e.normalizeQueryParams = Yt),
            (e.joinWithSlash = Sl),
            (e.stripTrailingSlash = km),
            (e.ɵfac = function (n) {
              return new (n || e)(A(Pr), A(Pn));
            }),
            (e.ɵprov = q({
              token: e,
              factory: function () {
                return (function QI() {
                  return new Tl(A(Pr), A(Pn));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function jm(e) {
        return e.replace(/\/index.html$/, "");
      }
      var fe = (() => (
        ((fe = fe || {})[(fe.Zero = 0)] = "Zero"),
        (fe[(fe.One = 1)] = "One"),
        (fe[(fe.Two = 2)] = "Two"),
        (fe[(fe.Few = 3)] = "Few"),
        (fe[(fe.Many = 4)] = "Many"),
        (fe[(fe.Other = 5)] = "Other"),
        fe
      ))();
      const nS = function Jp(e) {
        return (function Le(e) {
          const t = (function L0(e) {
            return e.toLowerCase().replace(/_/g, "-");
          })(e);
          let n = Xp(t);
          if (n) return n;
          const r = t.split("-")[0];
          if (((n = Xp(r)), n)) return n;
          if ("en" === r) return k0;
          throw new Error(`Missing locale data for the locale "${e}".`);
        })(e)[_.PluralCase];
      };
      class Ds {}
      let RS = (() => {
          class e extends Ds {
            constructor(n) {
              super(), (this.locale = n);
            }
            getPluralCategory(n, r) {
              switch (nS(r || this.locale)(n)) {
                case fe.Zero:
                  return "zero";
                case fe.One:
                  return "one";
                case fe.Two:
                  return "two";
                case fe.Few:
                  return "few";
                case fe.Many:
                  return "many";
                default:
                  return "other";
              }
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(fn));
            }),
            (e.ɵprov = q({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Qm = (() => {
          class e {
            constructor(n, r) {
              (this._viewContainer = n),
                (this._context = new LS()),
                (this._thenTemplateRef = null),
                (this._elseTemplateRef = null),
                (this._thenViewRef = null),
                (this._elseViewRef = null),
                (this._thenTemplateRef = r);
            }
            set ngIf(n) {
              (this._context.$implicit = this._context.ngIf = n),
                this._updateView();
            }
            set ngIfThen(n) {
              Zm("ngIfThen", n),
                (this._thenTemplateRef = n),
                (this._thenViewRef = null),
                this._updateView();
            }
            set ngIfElse(n) {
              Zm("ngIfElse", n),
                (this._elseTemplateRef = n),
                (this._elseViewRef = null),
                this._updateView();
            }
            _updateView() {
              this._context.$implicit
                ? this._thenViewRef ||
                  (this._viewContainer.clear(),
                  (this._elseViewRef = null),
                  this._thenTemplateRef &&
                    (this._thenViewRef = this._viewContainer.createEmbeddedView(
                      this._thenTemplateRef,
                      this._context
                    )))
                : this._elseViewRef ||
                  (this._viewContainer.clear(),
                  (this._thenViewRef = null),
                  this._elseTemplateRef &&
                    (this._elseViewRef = this._viewContainer.createEmbeddedView(
                      this._elseTemplateRef,
                      this._context
                    )));
            }
            static ngTemplateContextGuard(n, r) {
              return !0;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(E(Dt), E(Zt));
            }),
            (e.ɵdir = Ie({
              type: e,
              selectors: [["", "ngIf", ""]],
              inputs: {
                ngIf: "ngIf",
                ngIfThen: "ngIfThen",
                ngIfElse: "ngIfElse",
              },
            })),
            e
          );
        })();
      class LS {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Zm(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${W(t)}'.`
          );
      }
      let cT = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = _n({ type: e })),
          (e.ɵinj = en({ providers: [{ provide: Ds, useClass: RS }] })),
          e
        );
      })();
      let pT = (() => {
        class e {}
        return (
          (e.ɵprov = q({
            token: e,
            providedIn: "root",
            factory: () => new gT(A(st), window),
          })),
          e
        );
      })();
      class gT {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function mT(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const o = i.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            i = n.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(r - o[0], i - o[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Xm(this.window.history) ||
              Xm(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (t) {
            return !1;
          }
        }
      }
      function Xm(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class Hl extends class vT extends class UI {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function HI(e) {
            us || (us = e);
          })(new Hl());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function DT() {
            return (
              (Oi = Oi || document.querySelector("base")),
              Oi ? Oi.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function CT(e) {
                (Cs = Cs || document.createElement("a")),
                  Cs.setAttribute("href", e);
                const t = Cs.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Oi = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function PS(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [i, o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (i.trim() === t) return decodeURIComponent(o);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Cs,
        Oi = null;
      const ey = new G("TRANSITION_ID"),
        wT = [
          {
            provide: is,
            useFactory: function _T(e, t, n) {
              return () => {
                n.get(xr).donePromise.then(() => {
                  const r = hn(),
                    i = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let o = 0; o < i.length; o++) r.remove(i[o]);
                });
              };
            },
            deps: [ey, st, ke],
            multi: !0,
          },
        ];
      class Ul {
        static init() {
          !(function aI(e) {
            Cl = e;
          })(new Ul());
        }
        addToWindow(t) {
          (Q.getAngularTestability = (r, i = !0) => {
            const o = t.findTestabilityInTree(r, i);
            if (null == o)
              throw new Error("Could not find testability for element.");
            return o;
          }),
            (Q.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Q.getAllAngularRootElements = () => t.getAllRootElements()),
            Q.frameworkStabilizers || (Q.frameworkStabilizers = []),
            Q.frameworkStabilizers.push((r) => {
              const i = Q.getAllAngularTestabilities();
              let o = i.length,
                s = !1;
              const a = function (u) {
                (s = s || u), o--, 0 == o && r(s);
              };
              i.forEach(function (u) {
                u.whenStable(a);
              });
            });
        }
        findTestabilityInTree(t, n, r) {
          if (null == n) return null;
          const i = t.getTestability(n);
          return null != i
            ? i
            : r
            ? hn().isShadowRoot(n)
              ? this.findTestabilityInTree(t, n.host, !0)
              : this.findTestabilityInTree(t, n.parentElement, !0)
            : null;
        }
      }
      let ET = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const _s = new G("EventManagerPlugins");
      let ws = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => (i.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          addGlobalEventListener(n, r, i) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const i = this._plugins;
            for (let o = 0; o < i.length; o++) {
              const s = i[o];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(_s), A(ve));
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class ty {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const i = hn().getGlobalEventTarget(this._doc, t);
          if (!i)
            throw new Error(`Unsupported event target ${i} for event ${n}`);
          return this.addEventListener(i, n, r);
        }
      }
      let ny = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((i) => {
                this._stylesSet.has(i) || (this._stylesSet.add(i), r.add(i));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = q({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Fi = (() => {
          class e extends ny {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, i) {
              n.forEach((o) => {
                const s = this._doc.createElement("style");
                (s.textContent = o), i.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(ry), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, i) => {
                this._addStylesToHost(n, i, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(ry));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(st));
            }),
            (e.ɵprov = q({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function ry(e) {
        hn().remove(e);
      }
      const $l = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        ql = /%COMP%/g;
      function Es(e, t, n) {
        for (let r = 0; r < t.length; r++) {
          let i = t[r];
          Array.isArray(i) ? Es(e, i, n) : ((i = i.replace(ql, e)), n.push(i));
        }
        return n;
      }
      function sy(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Gl = (() => {
        class e {
          constructor(n, r, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new zl(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case bt.Emulated: {
                let i = this.rendererByCompId.get(r.id);
                return (
                  i ||
                    ((i = new AT(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, i)),
                  i.applyToHost(n),
                  i
                );
              }
              case 1:
              case bt.ShadowDom:
                return new xT(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const i = Es(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(i),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(ws), A(Fi), A(Ai));
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class zl {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS($l[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          t.appendChild(n);
        }
        insertBefore(t, n, r) {
          t && t.insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const o = $l[i];
            o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const i = $l[r];
            i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, i) {
          i & (We.DashCase | We.Important)
            ? t.style.setProperty(n, r, i & We.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & We.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, sy(r))
            : this.eventManager.addEventListener(t, n, sy(r));
        }
      }
      class AT extends zl {
        constructor(t, n, r, i) {
          super(t), (this.component = r);
          const o = Es(i + "-" + r.id, r.styles, []);
          n.addStyles(o),
            (this.contentAttr = (function IT(e) {
              return "_ngcontent-%COMP%".replace(ql, e);
            })(i + "-" + r.id)),
            (this.hostAttr = (function ST(e) {
              return "_nghost-%COMP%".replace(ql, e);
            })(i + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class xT extends zl {
        constructor(t, n, r, i) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const o = Es(i.id, i.styles, []);
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement("style");
            (a.textContent = o[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let RT = (() => {
        class e extends ty {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(st));
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const uy = ["alt", "control", "meta", "shift"],
        NT = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        ly = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        OT = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let FT = (() => {
        class e extends ty {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const o = e.parseEventName(r),
              s = e.eventCallback(o.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => hn().onAndCancel(n, o.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const o = e._normalizeKey(r.pop());
            let s = "";
            if (
              (uy.forEach((u) => {
                const l = r.indexOf(u);
                l > -1 && (r.splice(l, 1), (s += u + "."));
              }),
              (s += o),
              0 != r.length || 0 === o.length)
            )
              return null;
            const a = {};
            return (a.domEventName = i), (a.fullKey = s), a;
          }
          static getEventFullKey(n) {
            let r = "",
              i = (function kT(e) {
                let t = e.key;
                if (null == t) {
                  if (((t = e.keyIdentifier), null == t)) return "Unidentified";
                  t.startsWith("U+") &&
                    ((t = String.fromCharCode(parseInt(t.substring(2), 16))),
                    3 === e.location && ly.hasOwnProperty(t) && (t = ly[t]));
                }
                return NT[t] || t;
              })(n);
            return (
              (i = i.toLowerCase()),
              " " === i ? (i = "space") : "." === i && (i = "dot"),
              uy.forEach((o) => {
                o != i && OT[o](n) && (r += o + ".");
              }),
              (r += i),
              r
            );
          }
          static eventCallback(n, r, i) {
            return (o) => {
              e.getEventFullKey(o) === n && i.runGuarded(() => r(o));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(st));
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const BT = vm(PI, "browser", [
          { provide: gl, useValue: "browser" },
          {
            provide: lm,
            useValue: function LT() {
              Hl.makeCurrent(), Ul.init();
            },
            multi: !0,
          },
          {
            provide: st,
            useFactory: function VT() {
              return (
                (function RD(e) {
                  ca = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        HT = [
          { provide: Mu, useValue: "root" },
          {
            provide: rr,
            useFactory: function jT() {
              return new rr();
            },
            deps: [],
          },
          { provide: _s, useClass: RT, multi: !0, deps: [st, ve, gl] },
          { provide: _s, useClass: FT, multi: !0, deps: [st] },
          { provide: Gl, useClass: Gl, deps: [ws, Fi, Ai] },
          { provide: Sg, useExisting: Gl },
          { provide: ny, useExisting: Fi },
          { provide: Fi, useClass: Fi, deps: [st] },
          { provide: Dl, useClass: Dl, deps: [ve] },
          { provide: ws, useClass: ws, deps: [_s, ve] },
          { provide: class yT {}, useClass: ET, deps: [] },
        ];
      let UT = (() => {
        class e {
          constructor(n) {
            if (n)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                { provide: Ai, useValue: n.appId },
                { provide: ey, useExisting: Ai },
                wT,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(e, 12));
          }),
          (e.ɵmod = _n({ type: e })),
          (e.ɵinj = en({ providers: HT, imports: [cT, VI] })),
          e
        );
      })();
      function XT(e, t) {
        1 & e &&
          (M(0, "div", 1),
          M(1, "div"),
          ot(2, "img", 2),
          M(3, "p"),
          ye(4, "Loading"),
          I(),
          I(),
          I());
      }
      "undefined" != typeof window && window;
      let eA = (() => {
          class e {
            constructor() {
              this.dataReady = !1;
            }
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = $t({
              type: e,
              selectors: [["app-loader"]],
              inputs: { dataReady: "dataReady" },
              decls: 1,
              vars: 1,
              consts: [
                ["class", "loader-wrapper", 4, "ngIf"],
                [1, "loader-wrapper"],
                [
                  "src",
                  "/angular-theme/assets/loader/basic.png",
                  "alt",
                  "loading",
                  1,
                  "loader",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (function Gh(e, t, n, r, i, o, s, a) {
                    const u = y(),
                      l = $(),
                      c = e + K,
                      d = l.firstCreatePass
                        ? (function _E(e, t, n, r, i, o, s, a, u) {
                            const l = t.consts,
                              c = sr(t, e, 4, s || null, on(l, a));
                            yu(t, n, c, on(l, u)), po(t, c);
                            const d = (c.tViews = Lo(
                              2,
                              c,
                              r,
                              i,
                              o,
                              t.directiveRegistry,
                              t.pipeRegistry,
                              null,
                              t.schemas,
                              l
                            ));
                            return (
                              null !== t.queries &&
                                (t.queries.template(t, c),
                                (d.queries = t.queries.embeddedTView(c))),
                              c
                            );
                          })(c, l, u, t, n, r, i, o, s)
                        : l.data[c];
                    It(d, !1);
                    const f = u[F].createComment("");
                    Po(l, u, f, d),
                      Ae(f, u),
                      jo(u, (u[c] = ch(f, u, f, d))),
                      ao(d) && gu(l, u, d),
                      null != s && mu(u, d, a);
                  })(0, XT, 5, 0, "div", 0),
                  2 & n && $o("ngIf", !r.dataReady);
              },
              directives: [Qm],
              styles: [
                ".loader-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:100%;height:100%;flex-wrap:wrap;position:fixed;top:0;left:0;z-index:9999;background:#ffffff}.loader-wrapper[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{text-align:center}.loader-wrapper[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:100%}.loader[_ngcontent-%COMP%]{animation:loader 4s ease infinite}@keyframes loader{50%{transform:rotate(180deg)}to{transform:rotate(360deg)}}",
              ],
            })),
            e
          );
        })(),
        tA = (() => {
          class e {
            constructor() {
              (this.toggleClass = !1), (this.toggleClassStatus = new Re());
            }
            ngOnInit() {}
            changebg() {
              (this.toggleClass = !0),
                this.toggleClassStatus.emit(this.toggleClass);
            }
            backtobg() {
              (this.toggleClass = !1),
                this.toggleClassStatus.emit(this.toggleClass);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = $t({
              type: e,
              selectors: [["app-banner"]],
              outputs: { toggleClassStatus: "toggleClassStatus" },
              decls: 15,
              vars: 4,
              consts: [
                [1, "banner"],
                [1, "upper-layout"],
                [1, "container"],
                [1, "hero-header", 3, "mouseover", "mouseleave"],
                [1, "shadow-copy"],
                [1, "hero-buttons"],
                ["href", "", 1, "btn", "btn-black"],
                ["href", "", 1, "link", "link-normal"],
                [1, "hero-banner-image"],
                [
                  "src",
                  "/angular-theme/assets/banner-image.png",
                  "alt",
                  "Banner Image",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0),
                  ot(1, "div", 1),
                  M(2, "div", 2),
                  M(3, "div", 3),
                  wr("mouseover", function () {
                    return r.changebg();
                  })("mouseleave", function () {
                    return r.backtobg();
                  }),
                  M(4, "h1"),
                  ye(5, "DIGITAL MARKETING LEADERS"),
                  I(),
                  M(6, "h1", 4),
                  ye(7, "DIGITAL MARKETING LEADERS"),
                  I(),
                  I(),
                  M(8, "div", 5),
                  M(9, "a", 6),
                  ye(10, "Request A Call"),
                  I(),
                  M(11, "a", 7),
                  ye(12, "What We Do?"),
                  I(),
                  I(),
                  M(13, "div", 8),
                  ot(14, "img", 9),
                  I(),
                  I(),
                  I()),
                  2 & n &&
                    (hi(1),
                    Di("active", r.toggleClass),
                    hi(1),
                    Di("active", r.toggleClass));
              },
              styles: [
                ".banner[_ngcontent-%COMP%]{height:640px;width:100%;background:#ffde3c;padding-top:150px;position:relative}.hero-header[_ngcontent-%COMP%]{position:relative}.hero-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-family:Raleway,sans-serif;max-width:400px;margin-top:0;position:relative;z-index:2;font-weight:800;letter-spacing:7px;line-height:50px;opacity:0;animation:ln-grow .5s ease 3.6s forwards;transition:color 1s ease}.hero-header[_ngcontent-%COMP%]   .shadow-copy[_ngcontent-%COMP%]{position:absolute;top:4px;left:7px;color:#fff;z-index:1;opacity:0;animation:ln-grow .5s ease 3.6s forwards,sh-show 1s ease forwards 4s}@media screen and (min-width: 1281px){.active[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#ffde3c!important;transition:color 1s ease}.active[_ngcontent-%COMP%]   .shadow-copy[_ngcontent-%COMP%]{opacity:0!important}}.hero-buttons[_ngcontent-%COMP%]{margin-top:75px;opacity:0;animation:op-grow 1s ease 3.8s forwards}.hero-buttons[_ngcontent-%COMP%]   .link-normal[_ngcontent-%COMP%]{margin-left:50px}.hero-banner-image[_ngcontent-%COMP%]{position:absolute;right:15px;top:-50px;transform:skew(10deg);opacity:0;animation:sk-grow 1s ease 4s forwards}@keyframes ln-grow{50%{opacity:1}to{opacity:1;line-height:100px}}@keyframes op-grow{to{opacity:1}}@keyframes sk-grow{50%{opacity:1}to{opacity:1;transform:skew(0)}}@keyframes sh-show{to{opacity:1}}.upper-layout[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:0;height:100%;background:#000000;transition:all .4s ease}@media screen and (min-width: 1281px){.upper-layout.active[_ngcontent-%COMP%]{width:55%}}",
              ],
            })),
            e
          );
        })(),
        nA = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = $t({
              type: e,
              selectors: [["app-secondary-banner"]],
              decls: 15,
              vars: 0,
              consts: [
                [1, "secondary-banner"],
                [1, "container"],
                [1, "secondary-banner-content"],
                [1, "left-block"],
                [1, "right-block"],
                ["href", "", 1, "btn", "btn-white", "btn-normal"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0),
                  M(1, "div", 1),
                  M(2, "div", 2),
                  M(3, "div", 3),
                  M(4, "div"),
                  M(5, "p"),
                  ye(
                    6,
                    " Lorem Ipsum dollor Free tek, this is a demo providing for an interview "
                  ),
                  I(),
                  I(),
                  M(7, "div"),
                  M(8, "p"),
                  ye(
                    9,
                    " Lorem Ipsum dollor Free tek, this is a demo providing for an interview "
                  ),
                  I(),
                  I(),
                  I(),
                  M(10, "div", 4),
                  M(11, "a", 5),
                  ye(12, "Request A Demo"),
                  I(),
                  M(13, "a", 5),
                  ye(14, "Download"),
                  I(),
                  I(),
                  I(),
                  I(),
                  I());
              },
              styles: [
                ".secondary-banner[_ngcontent-%COMP%]{background:#000000;padding:45px 0}.secondary-banner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff}.secondary-banner-content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;width:100%;padding:0}.left-block[_ngcontent-%COMP%], .right-block[_ngcontent-%COMP%]{display:flex;align-items:center}.left-block[_ngcontent-%COMP%]{width:45%}.left-block[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{margin-right:50px}.left-block[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{margin-right:0}.right-block[_ngcontent-%COMP%]{width:60%;justify-content:flex-end}.right-block[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{margin-right:20px}.right-block[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:last-child{margin-right:0}",
              ],
            })),
            e
          );
        })(),
        rA = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = $t({
              type: e,
              selectors: [["app-newsletter"]],
              decls: 12,
              vars: 0,
              consts: [
                [1, "newsletter"],
                [1, "container"],
                [1, "newsletter-content"],
                [1, "newsletter-input"],
                ["type", "text", "placeholder", "Enter your Email ID"],
                ["type", "submit", "value", "Send"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0),
                  M(1, "div", 1),
                  M(2, "div", 2),
                  M(3, "h2"),
                  ye(4, "We need your permission?"),
                  I(),
                  M(5, "p"),
                  ye(
                    6,
                    " Its our responsibility to update you the sleeky features on time. Lorem ipsum dollor sentiy and geeil of the heart cloning sector. "
                  ),
                  I(),
                  I(),
                  M(7, "div", 3),
                  M(8, "div"),
                  M(9, "form"),
                  ot(10, "input", 4),
                  ot(11, "input", 5),
                  I(),
                  I(),
                  I(),
                  I(),
                  I());
              },
              styles: [
                ".newsletter[_ngcontent-%COMP%]{padding:20px 0 40px;width:100%;background:#f0f0f0}.newsletter-content[_ngcontent-%COMP%]{max-width:490px}.newsletter-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{max-width:400px;margin-bottom:50px}.newsletter-input[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{position:relative;width:100%}.newsletter-input[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{width:100%;height:60px;font-size:27px;background:#ffffff;border:1px solid #dcdcdc;padding:35px}input[type=submit][_ngcontent-%COMP%]{background:#000000;padding:10px 20px;color:#fff;border-radius:20px}.newsletter-input[_ngcontent-%COMP%]   input[type=submit][_ngcontent-%COMP%]{position:absolute;top:15px;right:15px}.newsletter-input[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]::placeholder{color:#979797}",
              ],
            })),
            e
          );
        })(),
        iA = (() => {
          class e {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = $t({
              type: e,
              selectors: [["app-footer"]],
              decls: 4,
              vars: 0,
              consts: [
                [1, "footer"],
                [1, "container"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0),
                  M(1, "div", 1),
                  M(2, "p"),
                  ye(3, "Design & Development by Muhammed Saifudeen N I"),
                  I(),
                  I(),
                  I());
              },
              styles: [
                ".footer[_ngcontent-%COMP%]{width:100%;background:#000000;padding:10px}.footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center;color:#fff}",
              ],
            })),
            e
          );
        })(),
        oA = (() => {
          class e {
            constructor() {
              (this.title = "angular-poject"),
                (this.dataReady = !1),
                (this.clickToggle = !1),
                (this.timer = setTimeout(() => {
                  this.dataReady = !0;
                }, 3e3));
            }
            checkHoverStatus(n) {
              this.clickToggle = n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = $t({
              type: e,
              selectors: [["app-root"]],
              decls: 24,
              vars: 3,
              consts: [
                [1, "mobile-alert"],
                [1, "body-content"],
                [3, "dataReady"],
                [3, "toggleClassStatus"],
                [1, "nav-bar"],
                [1, "container", "navbar-container"],
                ["href", "/", 1, "logo-link"],
                ["src", "/angular-theme/assets/logo.png"],
                ["route-link", "/home"],
                ["route-link", "/news"],
                ["route-link", "/About the author"],
                [1, "rest-content"],
              ],
              template: function (n, r) {
                1 & n &&
                  (M(0, "div", 0),
                  ye(1, "This is a test project for desktop"),
                  I(),
                  M(2, "div", 1),
                  ot(3, "app-loader", 2),
                  M(4, "app-banner", 3),
                  wr("toggleClassStatus", function (o) {
                    return r.checkHoverStatus(o);
                  }),
                  I(),
                  M(5, "div", 4),
                  M(6, "div", 5),
                  M(7, "a", 6),
                  ot(8, "img", 7),
                  I(),
                  M(9, "nav"),
                  M(10, "a", 8),
                  ye(11, "Home"),
                  I(),
                  M(12, "a", 9),
                  ye(13, "Production"),
                  I(),
                  M(14, "a", 10),
                  ye(15, "Resources"),
                  I(),
                  M(16, "a", 10),
                  ye(17, "Community"),
                  I(),
                  M(18, "a", 10),
                  ye(19, "Meet Us"),
                  I(),
                  I(),
                  I(),
                  I(),
                  M(20, "div", 11),
                  ot(21, "app-secondary-banner"),
                  ot(22, "app-newsletter"),
                  ot(23, "app-footer"),
                  I(),
                  I()),
                  2 & n &&
                    (hi(3),
                    $o("dataReady", r.dataReady),
                    hi(2),
                    Di("active", r.clickToggle));
              },
              directives: [eA, tA, nA, rA, iA],
              styles: [
                ".navbar-container{display:flex;align-items:center}.nav-bar{display:flex;justify-content:flex-start;position:absolute;top:0;left:0;width:100%;align-items:center}.nav-bar a{padding:0 20px;display:inline-block;font-family:Raleway,sans-serif;font-size:20px;font-weight:400}.nav-bar nav{transform:translateY(-100px);animation:tr-down .4s ease 3.3s forwards}.nav-bar .logo-link{transform:translateY(-100px);animation:tr-down .4s ease 3s forwards;padding-left:0}@media screen and (min-width: 1281px){.nav-bar.active{transform:translate(-80px)!important;transition:all .5s ease}.nav-bar.active a{transition:color 1s ease;color:#fff}}@keyframes tr-down{to{transform:translateY(0)}}\n",
              ],
              encapsulation: 2,
            })),
            e
          );
        })();
      function L(...e) {
        return be(e, Ur(e));
      }
      class Et extends Lt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const { isArray: sA } = Array,
        { getPrototypeOf: aA, prototype: uA, keys: lA } = Object;
      const { isArray: fA } = Array;
      function mA(...e) {
        const t = Ur(e),
          n = (function zv(e) {
            return X(zs(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: i } = (function cA(e) {
            if (1 === e.length) {
              const t = e[0];
              if (sA(t)) return { args: t, keys: null };
              if (
                (function dA(e) {
                  return e && "object" == typeof e && aA(e) === uA;
                })(t)
              ) {
                const n = lA(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return be([], t);
        const o = new ie(
          (function yA(e, t, n = Dn) {
            return (r) => {
              fy(
                t,
                () => {
                  const { length: i } = e,
                    o = new Array(i);
                  let s = i,
                    a = i;
                  for (let u = 0; u < i; u++)
                    fy(
                      t,
                      () => {
                        const l = be(e[u], t);
                        let c = !1;
                        l.subscribe(
                          Ee(
                            r,
                            (d) => {
                              (o[u] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(o.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            i
              ? (s) =>
                  (function gA(e, t) {
                    return e.reduce((n, r, i) => ((n[r] = t[i]), n), {});
                  })(i, s)
              : Dn
          )
        );
        return n
          ? o.pipe(
              (function pA(e) {
                return ee((t) =>
                  (function hA(e, t) {
                    return fA(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : o;
      }
      function fy(e, t, n) {
        e ? Vt(n, e, t) : t();
      }
      const bs = Vr(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function Ql(...e) {
        return (function vA() {
          return Hr(1);
        })()(be(e, Ur(e)));
      }
      function hy(e) {
        return new ie((t) => {
          jt(e()).subscribe(t);
        });
      }
      function py() {
        return we((e, t) => {
          let n = null;
          e._refCount++;
          const r = Ee(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const i = e._connection,
              o = n;
            (n = null),
              i && (!o || i === o) && i.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class DA extends ie {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Nc(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null),
            null == t || t.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new Je();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                Ee(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = Je.EMPTY));
          }
          return t;
        }
        refCount() {
          return py()(this);
        }
      }
      function Nn(e, t) {
        return we((n, r) => {
          let i = null,
            o = 0,
            s = !1;
          const a = () => s && !i && r.complete();
          n.subscribe(
            Ee(
              r,
              (u) => {
                null == i || i.unsubscribe();
                let l = 0;
                const c = o++;
                jt(e(u, c)).subscribe(
                  (i = Ee(
                    r,
                    (d) => r.next(t ? t(u, d, c, l++) : d),
                    () => {
                      (i = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function _A(e, t, n, r, i) {
        return (o, s) => {
          let a = n,
            u = t,
            l = 0;
          o.subscribe(
            Ee(
              s,
              (c) => {
                const d = l++;
                (u = a ? e(u, c, d) : ((a = !0), c)), r && s.next(u);
              },
              i &&
                (() => {
                  a && s.next(u), s.complete();
                })
            )
          );
        };
      }
      function gy(e, t) {
        return we(_A(e, t, arguments.length >= 2, !0));
      }
      function Nr(e, t) {
        return we((n, r) => {
          let i = 0;
          n.subscribe(Ee(r, (o) => e.call(t, o, i++) && r.next(o)));
        });
      }
      function gn(e) {
        return we((t, n) => {
          let o,
            r = null,
            i = !1;
          (r = t.subscribe(
            Ee(n, void 0, void 0, (s) => {
              (o = jt(e(s, gn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), o.subscribe(n)) : (i = !0);
            })
          )),
            i && (r.unsubscribe(), (r = null), o.subscribe(n));
        });
      }
      function ki(e, t) {
        return X(t) ? Ce(e, t, 1) : Ce(e, 1);
      }
      function Zl(e) {
        return e <= 0
          ? () => Bt
          : we((t, n) => {
              let r = [];
              t.subscribe(
                Ee(
                  n,
                  (i) => {
                    r.push(i), e < r.length && r.shift();
                  },
                  () => {
                    for (const i of r) n.next(i);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function my(e = wA) {
        return we((t, n) => {
          let r = !1;
          t.subscribe(
            Ee(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function wA() {
        return new bs();
      }
      function yy(e) {
        return we((t, n) => {
          let r = !1;
          t.subscribe(
            Ee(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function Or(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Nr((i, o) => e(i, o, r)) : Dn,
            Xi(1),
            n ? yy(t) : my(() => new bs())
          );
      }
      function Ze(e, t, n) {
        const r = X(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? we((i, o) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              i.subscribe(
                Ee(
                  o,
                  (u) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, u),
                      o.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      o.complete();
                  },
                  (u) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, u),
                      o.error(u);
                  },
                  () => {
                    var u, l;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : Dn;
      }
      class Jt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Yl extends Jt {
        constructor(t, n, r = "imperative", i = null) {
          super(t, n), (this.navigationTrigger = r), (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Li extends Jt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class vy extends Jt {
        constructor(t, n, r) {
          super(t, n), (this.reason = r);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class MA extends Jt {
        constructor(t, n, r) {
          super(t, n), (this.error = r);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class IA extends Jt {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class SA extends Jt {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class TA extends Jt {
        constructor(t, n, r, i, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = o);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class AA extends Jt {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class xA extends Jt {
        constructor(t, n, r, i) {
          super(t, n), (this.urlAfterRedirects = r), (this.state = i);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Dy {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Cy {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class RA {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class PA {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class NA {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class OA {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class _y {
        constructor(t, n, r) {
          (this.routerEvent = t), (this.position = n), (this.anchor = r);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const V = "primary";
      class FA {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Fr(e) {
        return new FA(e);
      }
      const wy = "ngNavigationCancelingError";
      function Kl(e) {
        const t = Error("NavigationCancelingError: " + e);
        return (t[wy] = !0), t;
      }
      function LA(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const i = {};
        for (let o = 0; o < r.length; o++) {
          const s = r[o],
            a = e[o];
          if (s.startsWith(":")) i[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: i };
      }
      function Ft(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let o = 0; o < n.length; o++)
          if (((i = n[o]), !Ey(e[i], t[i]))) return !1;
        return !0;
      }
      function Ey(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((i, o) => r[o] === i);
        }
        return e === t;
      }
      function by(e) {
        return Array.prototype.concat.apply([], e);
      }
      function My(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Me(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function kt(e) {
        return op(e) ? e : qo(e) ? be(Promise.resolve(e)) : L(e);
      }
      const BA = {
          exact: function Ty(e, t, n) {
            if (
              !Fn(e.segments, t.segments) ||
              !Ms(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !Ty(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Ay,
        },
        Iy = {
          exact: function HA(e, t) {
            return Ft(e, t);
          },
          subset: function UA(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Ey(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Sy(e, t, n) {
        return (
          BA[n.paths](e.root, t.root, n.matrixParams) &&
          Iy[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Ay(e, t, n) {
        return xy(e, t, t.segments, n);
      }
      function xy(e, t, n, r) {
        if (e.segments.length > n.length) {
          const i = e.segments.slice(0, n.length);
          return !(!Fn(i, n) || t.hasChildren() || !Ms(i, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Fn(e.segments, n) || !Ms(e.segments, n, r)) return !1;
          for (const i in t.children)
            if (!e.children[i] || !Ay(e.children[i], t.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = n.slice(0, e.segments.length),
            o = n.slice(e.segments.length);
          return (
            !!(Fn(e.segments, i) && Ms(e.segments, i, r) && e.children[V]) &&
            xy(e.children[V], t, o, r)
          );
        }
      }
      function Ms(e, t, n) {
        return t.every((r, i) => Iy[n](e[i].parameters, r.parameters));
      }
      class On {
        constructor(t, n, r) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Fr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return GA.serialize(this);
        }
      }
      class H {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Me(n, (r, i) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Is(this);
        }
      }
      class ji {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Fr(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Fy(this);
        }
      }
      function Fn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      class Ry {}
      class Py {
        parse(t) {
          const n = new ex(t);
          return new On(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Vi(t.root, !0)}`,
            r = (function QA(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((i) => `${Ss(n)}=${Ss(i)}`).join("&")
                    : `${Ss(n)}=${Ss(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function zA(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const GA = new Py();
      function Is(e) {
        return e.segments.map((t) => Fy(t)).join("/");
      }
      function Vi(e, t) {
        if (!e.hasChildren()) return Is(e);
        if (t) {
          const n = e.children[V] ? Vi(e.children[V], !1) : "",
            r = [];
          return (
            Me(e.children, (i, o) => {
              o !== V && r.push(`${o}:${Vi(i, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function qA(e, t) {
            let n = [];
            return (
              Me(e.children, (r, i) => {
                i === V && (n = n.concat(t(r, i)));
              }),
              Me(e.children, (r, i) => {
                i !== V && (n = n.concat(t(r, i)));
              }),
              n
            );
          })(e, (r, i) =>
            i === V ? [Vi(e.children[V], !1)] : [`${i}:${Vi(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[V]
            ? `${Is(e)}/${n[0]}`
            : `${Is(e)}/(${n.join("//")})`;
        }
      }
      function Ny(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ss(e) {
        return Ny(e).replace(/%3B/gi, ";");
      }
      function Jl(e) {
        return Ny(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Ts(e) {
        return decodeURIComponent(e);
      }
      function Oy(e) {
        return Ts(e.replace(/\+/g, "%20"));
      }
      function Fy(e) {
        return `${Jl(e.path)}${(function WA(e) {
          return Object.keys(e)
            .map((t) => `;${Jl(t)}=${Jl(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const ZA = /^[^\/()?;=#]+/;
      function As(e) {
        const t = e.match(ZA);
        return t ? t[0] : "";
      }
      const YA = /^[^=?&#]+/,
        JA = /^[^&#]+/;
      class ex {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new H([], {})
              : new H([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[V] = new H(t, n)),
            r
          );
        }
        parseSegment() {
          const t = As(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new ji(Ts(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = As(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = As(this.remaining);
            i && ((r = i), this.capture(r));
          }
          t[Ts(n)] = Ts(r);
        }
        parseQueryParam(t) {
          const n = (function KA(e) {
            const t = e.match(YA);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function XA(e) {
              const t = e.match(JA);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const i = Oy(n),
            o = Oy(r);
          if (t.hasOwnProperty(i)) {
            let s = t[i];
            Array.isArray(s) || ((s = [s]), (t[i] = s)), s.push(o);
          } else t[i] = o;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = As(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i)
              throw new Error(`Cannot parse url '${this.url}'`);
            let o;
            r.indexOf(":") > -1
              ? ((o = r.substr(0, r.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : t && (o = V);
            const s = this.parseChildren();
            (n[o] = 1 === Object.keys(s).length ? s[V] : new H([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class ky {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Xl(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Xl(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = ec(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t);
        }
        pathFromRoot(t) {
          return ec(t, this._root).map((n) => n.value);
        }
      }
      function Xl(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Xl(e, n);
          if (r) return r;
        }
        return null;
      }
      function ec(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = ec(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class Xt {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function kr(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Ly extends ky {
        constructor(t, n) {
          super(t), (this.snapshot = n), tc(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function jy(e, t) {
        const n = (function tx(e, t) {
            const s = new xs([], {}, {}, "", {}, V, t, null, e.root, -1, {});
            return new By("", new Xt(s, []));
          })(e, t),
          r = new Et([new ji("", {})]),
          i = new Et({}),
          o = new Et({}),
          s = new Et({}),
          a = new Et(""),
          u = new Lr(r, i, s, a, o, V, t, n.root);
        return (u.snapshot = n.root), new Ly(new Xt(u, []), n);
      }
      class Lr {
        constructor(t, n, r, i, o, s, a, u) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = u);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(ee((t) => Fr(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(ee((t) => Fr(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Vy(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const i = n[r],
              o = n[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (o.component) break;
              r--;
            }
          }
        return (function nx(e) {
          return e.reduce(
            (t, n) => ({
              params: Object.assign(Object.assign({}, t.params), n.params),
              data: Object.assign(Object.assign({}, t.data), n.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                n._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class xs {
        constructor(t, n, r, i, o, s, a, u, l, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = u),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Fr(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Fr(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class By extends ky {
        constructor(t, n) {
          super(n), (this.url = t), tc(this, n);
        }
        toString() {
          return Hy(this._root);
        }
      }
      function tc(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => tc(e, n));
      }
      function Hy(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Hy).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function nc(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Ft(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Ft(t.params, n.params) || e.params.next(n.params),
            (function jA(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Ft(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Ft(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function rc(e, t) {
        const n =
          Ft(e.params, t.params) &&
          (function $A(e, t) {
            return (
              Fn(e, t) && e.every((n, r) => Ft(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || rc(e.parent, t.parent))
        );
      }
      function Bi(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const i = (function ix(e, t, n) {
            return t.children.map((r) => {
              for (const i of n.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return Bi(e, r, i);
              return Bi(e, r);
            });
          })(e, t, n);
          return new Xt(r, i);
        }
        {
          if (e.shouldAttach(t.value)) {
            const o = e.retrieve(t.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Bi(e, a))),
                s
              );
            }
          }
          const r = (function ox(e) {
              return new Lr(
                new Et(e.url),
                new Et(e.params),
                new Et(e.queryParams),
                new Et(e.fragment),
                new Et(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            i = t.children.map((o) => Bi(e, o));
          return new Xt(r, i);
        }
      }
      function Rs(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Hi(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function ic(e, t, n, r, i) {
        let o = {};
        return (
          r &&
            Me(r, (s, a) => {
              o[a] = Array.isArray(s) ? s.map((u) => `${u}`) : `${s}`;
            }),
          new On(n.root === e ? t : Uy(n.root, e, t), o, i)
        );
      }
      function Uy(e, t, n) {
        const r = {};
        return (
          Me(e.children, (i, o) => {
            r[o] = i === t ? n : Uy(i, t, n);
          }),
          new H(e.segments, r)
        );
      }
      class $y {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Rs(r[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const i = r.find(Hi);
          if (i && i !== My(r))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class oc {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function qy(e, t, n) {
        if (
          (e || (e = new H([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Ps(e, t, n);
        const r = (function dx(e, t, n) {
            let r = 0,
              i = t;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (r >= n.length) return o;
              const s = e.segments[i],
                a = n[r];
              if (Hi(a)) break;
              const u = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === u) break;
              if (u && l && "object" == typeof l && void 0 === l.outlets) {
                if (!zy(u, l, s)) return o;
                r += 2;
              } else {
                if (!zy(u, {}, s)) return o;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(e, t, n),
          i = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const o = new H(e.segments.slice(0, r.pathIndex), {});
          return (
            (o.children[V] = new H(e.segments.slice(r.pathIndex), e.children)),
            Ps(o, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new H(e.segments, {})
          : r.match && !e.hasChildren()
          ? sc(e, t, n)
          : r.match
          ? Ps(e, 0, i)
          : sc(e, t, n);
      }
      function Ps(e, t, n) {
        if (0 === n.length) return new H(e.segments, {});
        {
          const r = (function cx(e) {
              return Hi(e[0]) ? e[0].outlets : { [V]: e };
            })(n),
            i = {};
          return (
            Me(r, (o, s) => {
              "string" == typeof o && (o = [o]),
                null !== o && (i[s] = qy(e.children[s], t, o));
            }),
            Me(e.children, (o, s) => {
              void 0 === r[s] && (i[s] = o);
            }),
            new H(e.segments, i)
          );
        }
      }
      function sc(e, t, n) {
        const r = e.segments.slice(0, t);
        let i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (Hi(o)) {
            const u = fx(o.outlets);
            return new H(r, u);
          }
          if (0 === i && Rs(n[0])) {
            r.push(new ji(e.segments[t].path, Gy(n[0]))), i++;
            continue;
          }
          const s = Hi(o) ? o.outlets[V] : `${o}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          s && a && Rs(a)
            ? (r.push(new ji(s, Gy(a))), (i += 2))
            : (r.push(new ji(s, {})), i++);
        }
        return new H(r, {});
      }
      function fx(e) {
        const t = {};
        return (
          Me(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = sc(new H([], {}), 0, n));
          }),
          t
        );
      }
      function Gy(e) {
        const t = {};
        return Me(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function zy(e, t, n) {
        return e == n.path && Ft(t, n.parameters);
      }
      class px {
        constructor(t, n, r, i) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = i);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            nc(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const i = kr(n);
          t.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, i[s], r), delete i[s];
          }),
            Me(i, (o, s) => {
              this.deactivateRouteAndItsChildren(o, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if (i === o)
            if (i.component) {
              const s = r.getContext(i.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else o && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = kr(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = kr(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const i = kr(n);
          t.children.forEach((o) => {
            this.activateRoutes(o, i[o.value.outlet], r),
              this.forwardEvent(new OA(o.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new PA(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if ((nc(i), i === o))
            if (i.component) {
              const s = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (i.component) {
            const s = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                nc(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = (function gx(e) {
                  for (let t = e.parent; t; t = t.parent) {
                    const n = t.routeConfig;
                    if (n && n._loadedConfig) return n._loadedConfig;
                    if (n && n.component) return null;
                  }
                  return null;
                })(i.snapshot),
                u = a ? a.module.componentFactoryResolver : null;
              (s.attachRef = null),
                (s.route = i),
                (s.resolver = u),
                s.outlet && s.outlet.activateWith(i, u),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class ac {
        constructor(t, n) {
          (this.routes = t), (this.module = n);
        }
      }
      function mn(e) {
        return "function" == typeof e;
      }
      function kn(e) {
        return e instanceof On;
      }
      const Ui = Symbol("INITIAL_VALUE");
      function $i() {
        return Nn((e) =>
          mA(
            e.map((t) =>
              t.pipe(
                Xi(1),
                (function CA(...e) {
                  const t = Ur(e);
                  return we((n, r) => {
                    (t ? Ql(e, n, t) : Ql(e, n)).subscribe(r);
                  });
                })(Ui)
              )
            )
          ).pipe(
            gy((t, n) => {
              let r = !1;
              return n.reduce(
                (i, o, s) =>
                  i !== Ui
                    ? i
                    : (o === Ui && (r = !0),
                      r || (!1 !== o && s !== n.length - 1 && !kn(o)) ? i : o),
                t
              );
            }, Ui),
            Nr((t) => t !== Ui),
            ee((t) => (kn(t) ? t : !0 === t)),
            Xi(1)
          )
        );
      }
      class _x {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new qi()),
            (this.attachRef = null);
        }
      }
      class qi {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, n) {
          const r = this.getOrCreateContext(t);
          (r.outlet = n), this.contexts.set(t, r);
        }
        onChildOutletDestroyed(t) {
          const n = this.getContext(t);
          n && ((n.outlet = null), (n.attachRef = null));
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let n = this.getContext(t);
          return n || ((n = new _x()), this.contexts.set(t, n)), n;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let Wy = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this.parentContexts = n),
              (this.location = r),
              (this.resolver = i),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Re()),
              (this.deactivateEvents = new Re()),
              (this.attachEvents = new Re()),
              (this.detachEvents = new Re()),
              (this.name = o || V),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = n;
            const s = (r = r || this.resolver).resolveComponentFactory(
                n._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              u = new wx(n, a, this.location.injector);
            (this.activated = this.location.createComponent(
              s,
              this.location.length,
              u
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(
              E(qi),
              E(Dt),
              E(Ir),
              (function Jr(e) {
                return (function lC(e, t) {
                  if ("class" === t) return e.classes;
                  if ("style" === t) return e.styles;
                  const n = e.attrs;
                  if (n) {
                    const r = n.length;
                    let i = 0;
                    for (; i < r; ) {
                      const o = n[i];
                      if (bd(o)) break;
                      if (0 === o) i += 2;
                      else if ("number" == typeof o)
                        for (i++; i < r && "string" == typeof n[i]; ) i++;
                      else {
                        if (o === t) return n[i + 1];
                        i += 2;
                      }
                    }
                  }
                  return null;
                })(pe(), e);
              })("name"),
              E(wl)
            );
          }),
          (e.ɵdir = Ie({
            type: e,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
          })),
          e
        );
      })();
      class wx {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Lr
            ? this.route
            : t === qi
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Qy = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = $t({
            type: e,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && ot(0, "router-outlet");
            },
            directives: [Wy],
            encapsulation: 2,
          })),
          e
        );
      })();
      function Zy(e, t = "") {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          Ex(r, bx(t, r));
        }
      }
      function Ex(e, t) {
        e.children && Zy(e.children, t);
      }
      function bx(e, t) {
        return t
          ? e || t.path
            ? e && !t.path
              ? `${e}/`
              : !e && t.path
              ? t.path
              : `${e}/${t.path}`
            : ""
          : e;
      }
      function uc(e) {
        const t = e.children && e.children.map(uc),
          n = t
            ? Object.assign(Object.assign({}, e), { children: t })
            : Object.assign({}, e);
        return (
          !n.component &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== V &&
            (n.component = Qy),
          n
        );
      }
      function lt(e) {
        return e.outlet || V;
      }
      function Yy(e, t) {
        const n = e.filter((r) => lt(r) === t);
        return n.push(...e.filter((r) => lt(r) !== t)), n;
      }
      const Ky = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function Ns(e, t, n) {
        var r;
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? Object.assign({}, Ky)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || LA)(n, e, t);
        if (!o) return Object.assign({}, Ky);
        const s = {};
        Me(o.posParams, (u, l) => {
          s[l] = u.path;
        });
        const a =
          o.consumed.length > 0
            ? Object.assign(
                Object.assign({}, s),
                o.consumed[o.consumed.length - 1].parameters
              )
            : s;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          lastChild: o.consumed.length,
          parameters: a,
          positionalParamSegments:
            null !== (r = o.posParams) && void 0 !== r ? r : {},
        };
      }
      function Os(e, t, n, r, i = "corrected") {
        if (
          n.length > 0 &&
          (function Sx(e, t, n) {
            return n.some((r) => Fs(e, t, r) && lt(r) !== V);
          })(e, n, r)
        ) {
          const s = new H(
            t,
            (function Ix(e, t, n, r) {
              const i = {};
              (i[V] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const o of n)
                if ("" === o.path && lt(o) !== V) {
                  const s = new H([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (i[lt(o)] = s);
                }
              return i;
            })(e, t, r, new H(n, e.children))
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function Tx(e, t, n) {
            return n.some((r) => Fs(e, t, r));
          })(e, n, r)
        ) {
          const s = new H(
            e.segments,
            (function Mx(e, t, n, r, i, o) {
              const s = {};
              for (const a of r)
                if (Fs(e, n, a) && !i[lt(a)]) {
                  const u = new H([], {});
                  (u._sourceSegment = e),
                    (u._segmentIndexShift =
                      "legacy" === o ? e.segments.length : t.length),
                    (s[lt(a)] = u);
                }
              return Object.assign(Object.assign({}, i), s);
            })(e, t, n, r, e.children, i)
          );
          return (
            (s._sourceSegment = e),
            (s._segmentIndexShift = t.length),
            { segmentGroup: s, slicedSegments: n }
          );
        }
        const o = new H(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function Fs(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function Jy(e, t, n, r) {
        return (
          !!(lt(e) === r || (r !== V && Fs(t, n, e))) &&
          ("**" === e.path || Ns(t, e, n).matched)
        );
      }
      function Xy(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      class Gi {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class ev {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ks(e) {
        return new ie((t) => t.error(new Gi(e)));
      }
      function tv(e) {
        return new ie((t) => t.error(new ev(e)));
      }
      function Ax(e) {
        return new ie((t) =>
          t.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${e}'`
            )
          )
        );
      }
      class Px {
        constructor(t, n, r, i, o) {
          (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = i),
            (this.config = o),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Qt));
        }
        apply() {
          const t = Os(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new H(t.segments, t.children);
          return this.expandSegmentGroup(this.ngModule, this.config, n, V)
            .pipe(
              ee((o) =>
                this.createUrlTree(
                  lc(o),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              gn((o) => {
                if (o instanceof ev)
                  return (this.allowRedirects = !1), this.match(o.urlTree);
                throw o instanceof Gi ? this.noMatchError(o) : o;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, V)
            .pipe(
              ee((i) => this.createUrlTree(lc(i), t.queryParams, t.fragment))
            )
            .pipe(
              gn((i) => {
                throw i instanceof Gi ? this.noMatchError(i) : i;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, n, r) {
          const i = t.segments.length > 0 ? new H([], { [V]: t }) : t;
          return new On(i, n, r);
        }
        expandSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(ee((o) => new H([], o)))
            : this.expandSegment(t, r, n, r.segments, i, !0);
        }
        expandChildren(t, n, r) {
          const i = [];
          for (const o of Object.keys(r.children))
            "primary" === o ? i.unshift(o) : i.push(o);
          return be(i).pipe(
            ki((o) => {
              const s = r.children[o],
                a = Yy(n, o);
              return this.expandSegmentGroup(t, a, s, o).pipe(
                ee((u) => ({ segment: u, outlet: o }))
              );
            }),
            gy((o, s) => ((o[s.outlet] = s.segment), o), {}),
            (function EA(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? Nr((i, o) => e(i, o, r)) : Dn,
                  Zl(1),
                  n ? yy(t) : my(() => new bs())
                );
            })()
          );
        }
        expandSegment(t, n, r, i, o, s) {
          return be(r).pipe(
            ki((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, i, o, s).pipe(
                gn((l) => {
                  if (l instanceof Gi) return L(null);
                  throw l;
                })
              )
            ),
            Or((a) => !!a),
            gn((a, u) => {
              if (a instanceof bs || "EmptyError" === a.name) {
                if (Xy(n, i, o)) return L(new H([], {}));
                throw new Gi(n);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, i, o, s, a) {
          return Jy(i, n, o, s)
            ? void 0 === i.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, i, o, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s)
              : ks(n)
            : ks(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                i,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
          const o = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? tv(o)
            : this.lineralizeSegments(r, o).pipe(
                Ce((s) => {
                  const a = new H(s, {});
                  return this.expandSegment(t, a, n, s, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          const {
            matched: a,
            consumedSegments: u,
            lastChild: l,
            positionalParamSegments: c,
          } = Ns(n, i, o);
          if (!a) return ks(n);
          const d = this.applyRedirectCommands(u, i.redirectTo, c);
          return i.redirectTo.startsWith("/")
            ? tv(d)
            : this.lineralizeSegments(i, d).pipe(
                Ce((f) =>
                  this.expandSegment(t, n, r, f.concat(o.slice(l)), s, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, n, r, i, o) {
          if ("**" === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? L(r._loadedConfig)
                  : this.configLoader.load(t.injector, r)
                ).pipe(ee((f) => ((r._loadedConfig = f), new H(i, {}))))
              : L(new H(i, {}));
          const { matched: s, consumedSegments: a, lastChild: u } = Ns(n, r, i);
          if (!s) return ks(n);
          const l = i.slice(u);
          return this.getChildConfig(t, r, i).pipe(
            Ce((d) => {
              const f = d.module,
                h = d.routes,
                { segmentGroup: p, slicedSegments: m } = Os(n, a, l, h),
                v = new H(p.segments, p.children);
              if (0 === m.length && v.hasChildren())
                return this.expandChildren(f, h, v).pipe(
                  ee((T) => new H(a, T))
                );
              if (0 === h.length && 0 === m.length) return L(new H(a, {}));
              const D = lt(r) === o;
              return this.expandSegment(f, v, h, m, D ? V : o, !0).pipe(
                ee((w) => new H(a.concat(w.segments), w.children))
              );
            })
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? L(new ac(n.children, t))
            : n.loadChildren
            ? void 0 !== n._loadedConfig
              ? L(n._loadedConfig)
              : this.runCanLoadGuards(t.injector, n, r).pipe(
                  Ce((i) =>
                    i
                      ? this.configLoader
                          .load(t.injector, n)
                          .pipe(ee((o) => ((n._loadedConfig = o), o)))
                      : (function xx(e) {
                          return new ie((t) =>
                            t.error(
                              Kl(
                                `Cannot load children because the guard of the route "path: '${e.path}'" returned false`
                              )
                            )
                          );
                        })(n)
                  )
                )
            : L(new ac([], t));
        }
        runCanLoadGuards(t, n, r) {
          const i = n.canLoad;
          return i && 0 !== i.length
            ? L(
                i.map((s) => {
                  const a = t.get(s);
                  let u;
                  if (
                    (function yx(e) {
                      return e && mn(e.canLoad);
                    })(a)
                  )
                    u = a.canLoad(n, r);
                  else {
                    if (!mn(a)) throw new Error("Invalid CanLoad guard");
                    u = a(n, r);
                  }
                  return kt(u);
                })
              ).pipe(
                $i(),
                Ze((s) => {
                  if (!kn(s)) return;
                  const a = Kl(
                    `Redirecting to "${this.urlSerializer.serialize(s)}"`
                  );
                  throw ((a.url = s), a);
                }),
                ee((s) => !0 === s)
              )
            : L(!0);
        }
        lineralizeSegments(t, n) {
          let r = [],
            i = n.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return L(r);
            if (i.numberOfChildren > 1 || !i.children[V])
              return Ax(t.redirectTo);
            i = i.children[V];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreatreUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreatreUrlTree(t, n, r, i) {
          const o = this.createSegmentGroup(t, n.root, r, i);
          return new On(
            o,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Me(t, (i, o) => {
              if ("string" == typeof i && i.startsWith(":")) {
                const a = i.substring(1);
                r[o] = n[a];
              } else r[o] = i;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, i) {
          const o = this.createSegments(t, n.segments, r, i);
          let s = {};
          return (
            Me(n.children, (a, u) => {
              s[u] = this.createSegmentGroup(t, a, r, i);
            }),
            new H(o, s)
          );
        }
        createSegments(t, n, r, i) {
          return n.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(t, o, i)
              : this.findOrReturn(o, r)
          );
        }
        findPosParam(t, n, r) {
          const i = r[n.path.substring(1)];
          if (!i)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${n.path}'.`
            );
          return i;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const i of n) {
            if (i.path === t.path) return n.splice(r), i;
            r++;
          }
          return t;
        }
      }
      function lc(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const o = lc(e.children[r]);
          (o.segments.length > 0 || o.hasChildren()) && (t[r] = o);
        }
        return (function Nx(e) {
          if (1 === e.numberOfChildren && e.children[V]) {
            const t = e.children[V];
            return new H(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new H(e.segments, t));
      }
      class nv {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Ls {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function Fx(e, t, n) {
        const r = e._root;
        return zi(r, t ? t._root : null, n, [r.value]);
      }
      function js(e, t, n) {
        const r = (function Lx(e) {
          if (!e) return null;
          for (let t = e.parent; t; t = t.parent) {
            const n = t.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(t);
        return (r ? r.module.injector : n).get(e);
      }
      function zi(
        e,
        t,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = kr(t);
        return (
          e.children.forEach((s) => {
            (function jx(
              e,
              t,
              n,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const u = (function Vx(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Fn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Fn(e.url, t.url) || !Ft(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !rc(e, t) || !Ft(e.queryParams, t.queryParams);
                    default:
                      return !rc(e, t);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                u
                  ? i.canActivateChecks.push(new nv(r))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  zi(e, t, o.component ? (a ? a.children : null) : n, r, i),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new Ls(a.outlet.component, s));
              } else
                s && Wi(t, a, i),
                  i.canActivateChecks.push(new nv(r)),
                  zi(e, null, o.component ? (a ? a.children : null) : n, r, i);
            })(s, o[s.value.outlet], n, r.concat([s.value]), i),
              delete o[s.value.outlet];
          }),
          Me(o, (s, a) => Wi(s, n.getContext(a), i)),
          i
        );
      }
      function Wi(e, t, n) {
        const r = kr(e),
          i = e.value;
        Me(r, (o, s) => {
          Wi(o, i.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Ls(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          );
      }
      class Qx {}
      function rv(e) {
        return new ie((t) => t.error(e));
      }
      class Yx {
        constructor(t, n, r, i, o, s) {
          (this.rootComponentType = t),
            (this.config = n),
            (this.urlTree = r),
            (this.url = i),
            (this.paramsInheritanceStrategy = o),
            (this.relativeLinkResolution = s);
        }
        recognize() {
          const t = Os(
              this.urlTree.root,
              [],
              [],
              this.config.filter((s) => void 0 === s.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            n = this.processSegmentGroup(this.config, t, V);
          if (null === n) return null;
          const r = new xs(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              V,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            i = new Xt(r, n),
            o = new By(this.url, i);
          return this.inheritParamsAndData(o._root), o;
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Vy(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(t, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(t, n)
            : this.processSegment(t, n, n.segments, r);
        }
        processChildren(t, n) {
          const r = [];
          for (const o of Object.keys(n.children)) {
            const s = n.children[o],
              a = Yy(t, o),
              u = this.processSegmentGroup(a, s, o);
            if (null === u) return null;
            r.push(...u);
          }
          const i = iv(r);
          return (
            (function Kx(e) {
              e.sort((t, n) =>
                t.value.outlet === V
                  ? -1
                  : n.value.outlet === V
                  ? 1
                  : t.value.outlet.localeCompare(n.value.outlet)
              );
            })(i),
            i
          );
        }
        processSegment(t, n, r, i) {
          for (const o of t) {
            const s = this.processSegmentAgainstRoute(o, n, r, i);
            if (null !== s) return s;
          }
          return Xy(n, r, i) ? [] : null;
        }
        processSegmentAgainstRoute(t, n, r, i) {
          if (t.redirectTo || !Jy(t, n, r, i)) return null;
          let o,
            s = [],
            a = [];
          if ("**" === t.path) {
            const h = r.length > 0 ? My(r).parameters : {};
            o = new xs(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              av(t),
              lt(t),
              t.component,
              t,
              ov(n),
              sv(n) + r.length,
              uv(t)
            );
          } else {
            const h = Ns(n, t, r);
            if (!h.matched) return null;
            (s = h.consumedSegments),
              (a = r.slice(h.lastChild)),
              (o = new xs(
                s,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                av(t),
                lt(t),
                t.component,
                t,
                ov(n),
                sv(n) + s.length,
                uv(t)
              ));
          }
          const u = (function Jx(e) {
              return e.children
                ? e.children
                : e.loadChildren
                ? e._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = Os(
              n,
              s,
              a,
              u.filter((h) => void 0 === h.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const h = this.processChildren(u, l);
            return null === h ? null : [new Xt(o, h)];
          }
          if (0 === u.length && 0 === c.length) return [new Xt(o, [])];
          const d = lt(t) === i,
            f = this.processSegment(u, l, c, d ? V : i);
          return null === f ? null : [new Xt(o, f)];
        }
      }
      function Xx(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function iv(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!Xx(r)) {
            t.push(r);
            continue;
          }
          const i = t.find((o) => r.value.routeConfig === o.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
        }
        for (const r of n) {
          const i = iv(r.children);
          t.push(new Xt(r.value, i));
        }
        return t.filter((r) => !n.has(r));
      }
      function ov(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function sv(e) {
        let t = e,
          n = t._segmentIndexShift ? t._segmentIndexShift : 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment),
            (n += t._segmentIndexShift ? t._segmentIndexShift : 0);
        return n - 1;
      }
      function av(e) {
        return e.data || {};
      }
      function uv(e) {
        return e.resolve || {};
      }
      function lv(e) {
        return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)];
      }
      function cc(e) {
        return Nn((t) => {
          const n = e(t);
          return n ? be(n).pipe(ee(() => t)) : L(t);
        });
      }
      class aR extends class sR {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      } {}
      const dc = new G("ROUTES");
      class cv {
        constructor(t, n, r, i) {
          (this.injector = t),
            (this.compiler = n),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = i);
        }
        load(t, n) {
          if (n._loader$) return n._loader$;
          this.onLoadStartListener && this.onLoadStartListener(n);
          const i = this.loadModuleFactory(n.loadChildren).pipe(
            ee((o) => {
              this.onLoadEndListener && this.onLoadEndListener(n);
              const s = o.create(t);
              return new ac(
                by(s.injector.get(dc, void 0, N.Self | N.Optional)).map(uc),
                s
              );
            }),
            gn((o) => {
              throw ((n._loader$ = void 0), o);
            })
          );
          return (
            (n._loader$ = new DA(i, () => new Lt()).pipe(py())), n._loader$
          );
        }
        loadModuleFactory(t) {
          return kt(t()).pipe(
            Ce((n) =>
              n instanceof xg ? L(n) : be(this.compiler.compileModuleAsync(n))
            )
          );
        }
      }
      class lR {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, n) {
          return t;
        }
      }
      function cR(e) {
        throw e;
      }
      function dR(e, t, n) {
        return t.parse("/");
      }
      function dv(e, t) {
        return L(null);
      }
      const fR = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        hR = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let Ye = (() => {
        class e {
          constructor(n, r, i, o, s, a, u) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = i),
              (this.location = o),
              (this.config = u),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new Lt()),
              (this.errorHandler = cR),
              (this.malformedUriErrorHandler = dR),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: dv,
                afterPreactivation: dv,
              }),
              (this.urlHandlingStrategy = new lR()),
              (this.routeReuseStrategy = new aR()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = s.get(Qt)),
              (this.console = s.get(dm));
            const d = s.get(ve);
            (this.isNgZoneEnabled = d instanceof ve && ve.isInAngularZone()),
              this.resetConfig(u),
              (this.currentUrlTree = (function VA() {
                return new On(new H([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new cv(
                s,
                a,
                (f) => this.triggerEvent(new Dy(f)),
                (f) => this.triggerEvent(new Cy(f))
              )),
              (this.routerState = jy(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new Et({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var n;
            return null === (n = this.location.getState()) || void 0 === n
              ? void 0
              : n.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              Nr((i) => 0 !== i.id),
              ee((i) =>
                Object.assign(Object.assign({}, i), {
                  extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl),
                })
              ),
              Nn((i) => {
                let o = !1,
                  s = !1;
                return L(i).pipe(
                  Ze((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    };
                  }),
                  Nn((a) => {
                    const u = this.browserUrlTree.toString(),
                      l =
                        !this.navigated ||
                        a.extractedUrl.toString() !== u ||
                        u !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || l) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        Vs(a.source) && (this.browserUrlTree = a.extractedUrl),
                        L(a).pipe(
                          Nn((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new Yl(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? Bt
                                : Promise.resolve(d)
                            );
                          }),
                          (function Ox(e, t, n, r) {
                            return Nn((i) =>
                              (function Rx(e, t, n, r, i) {
                                return new Px(e, t, n, r, i).apply();
                              })(e, t, n, i.extractedUrl, r).pipe(
                                ee((o) =>
                                  Object.assign(Object.assign({}, i), {
                                    urlAfterRedirects: o,
                                  })
                                )
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          Ze((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function eR(e, t, n, r, i) {
                            return Ce((o) =>
                              (function Zx(
                                e,
                                t,
                                n,
                                r,
                                i = "emptyOnly",
                                o = "legacy"
                              ) {
                                try {
                                  const s = new Yx(
                                    e,
                                    t,
                                    n,
                                    r,
                                    i,
                                    o
                                  ).recognize();
                                  return null === s ? rv(new Qx()) : L(s);
                                } catch (s) {
                                  return rv(s);
                                }
                              })(
                                e,
                                t,
                                o.urlAfterRedirects,
                                n(o.urlAfterRedirects),
                                r,
                                i
                              ).pipe(
                                ee((s) =>
                                  Object.assign(Object.assign({}, o), {
                                    targetSnapshot: s,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (d) => this.serializeUrl(d),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          Ze((d) => {
                            if ("eager" === this.urlUpdateStrategy) {
                              if (!d.extras.skipLocationChange) {
                                const h = this.urlHandlingStrategy.merge(
                                  d.urlAfterRedirects,
                                  d.rawUrl
                                );
                                this.setBrowserUrl(h, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const f = new IA(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      l &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: m,
                          extras: v,
                        } = a,
                        D = new Yl(f, this.serializeUrl(h), p, m);
                      r.next(D);
                      const g = jy(h, this.rootComponentType).snapshot;
                      return L(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: g,
                          urlAfterRedirects: h,
                          extras: Object.assign(Object.assign({}, v), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), Bt;
                  }),
                  cc((a) => {
                    const {
                      targetSnapshot: u,
                      id: l,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.beforePreactivation(u, {
                      navigationId: l,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  Ze((a) => {
                    const u = new SA(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(u);
                  }),
                  ee((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: Fx(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function Bx(e, t) {
                    return Ce((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: i,
                        guards: {
                          canActivateChecks: o,
                          canDeactivateChecks: s,
                        },
                      } = n;
                      return 0 === s.length && 0 === o.length
                        ? L(
                            Object.assign(Object.assign({}, n), {
                              guardsResult: !0,
                            })
                          )
                        : (function Hx(e, t, n, r) {
                            return be(e).pipe(
                              Ce((i) =>
                                (function Wx(e, t, n, r, i) {
                                  const o =
                                    t && t.routeConfig
                                      ? t.routeConfig.canDeactivate
                                      : null;
                                  return o && 0 !== o.length
                                    ? L(
                                        o.map((a) => {
                                          const u = js(a, t, i);
                                          let l;
                                          if (
                                            (function Cx(e) {
                                              return e && mn(e.canDeactivate);
                                            })(u)
                                          )
                                            l = kt(u.canDeactivate(e, t, n, r));
                                          else {
                                            if (!mn(u))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            l = kt(u(e, t, n, r));
                                          }
                                          return l.pipe(Or());
                                        })
                                      ).pipe($i())
                                    : L(!0);
                                })(i.component, i.route, n, t, r)
                              ),
                              Or((i) => !0 !== i, !0)
                            );
                          })(s, r, i, e).pipe(
                            Ce((a) =>
                              a &&
                              (function mx(e) {
                                return "boolean" == typeof e;
                              })(a)
                                ? (function Ux(e, t, n, r) {
                                    return be(t).pipe(
                                      ki((i) =>
                                        Ql(
                                          (function qx(e, t) {
                                            return (
                                              null !== e && t && t(new RA(e)),
                                              L(!0)
                                            );
                                          })(i.route.parent, r),
                                          (function $x(e, t) {
                                            return (
                                              null !== e && t && t(new NA(e)),
                                              L(!0)
                                            );
                                          })(i.route, r),
                                          (function zx(e, t, n) {
                                            const r = t[t.length - 1],
                                              o = t
                                                .slice(0, t.length - 1)
                                                .reverse()
                                                .map((s) =>
                                                  (function kx(e) {
                                                    const t = e.routeConfig
                                                      ? e.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return t && 0 !== t.length
                                                      ? { node: e, guards: t }
                                                      : null;
                                                  })(s)
                                                )
                                                .filter((s) => null !== s)
                                                .map((s) =>
                                                  hy(() =>
                                                    L(
                                                      s.guards.map((u) => {
                                                        const l = js(
                                                          u,
                                                          s.node,
                                                          n
                                                        );
                                                        let c;
                                                        if (
                                                          (function Dx(e) {
                                                            return (
                                                              e &&
                                                              mn(
                                                                e.canActivateChild
                                                              )
                                                            );
                                                          })(l)
                                                        )
                                                          c = kt(
                                                            l.canActivateChild(
                                                              r,
                                                              e
                                                            )
                                                          );
                                                        else {
                                                          if (!mn(l))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          c = kt(l(r, e));
                                                        }
                                                        return c.pipe(Or());
                                                      })
                                                    ).pipe($i())
                                                  )
                                                );
                                            return L(o).pipe($i());
                                          })(e, i.path, n),
                                          (function Gx(e, t, n) {
                                            const r = t.routeConfig
                                              ? t.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return L(!0);
                                            const i = r.map((o) =>
                                              hy(() => {
                                                const s = js(o, t, n);
                                                let a;
                                                if (
                                                  (function vx(e) {
                                                    return (
                                                      e && mn(e.canActivate)
                                                    );
                                                  })(s)
                                                )
                                                  a = kt(s.canActivate(t, e));
                                                else {
                                                  if (!mn(s))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  a = kt(s(t, e));
                                                }
                                                return a.pipe(Or());
                                              })
                                            );
                                            return L(i).pipe($i());
                                          })(e, i.route, n)
                                        )
                                      ),
                                      Or((i) => !0 !== i, !0)
                                    );
                                  })(r, o, e, t)
                                : L(a)
                            ),
                            ee((a) =>
                              Object.assign(Object.assign({}, n), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  Ze((a) => {
                    if (kn(a.guardsResult)) {
                      const l = Kl(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((l.url = a.guardsResult), l);
                    }
                    const u = new TA(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(u);
                  }),
                  Nr(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  cc((a) => {
                    if (a.guards.canActivateChecks.length)
                      return L(a).pipe(
                        Ze((u) => {
                          const l = new AA(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        }),
                        Nn((u) => {
                          let l = !1;
                          return L(u).pipe(
                            (function tR(e, t) {
                              return Ce((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: i },
                                } = n;
                                if (!i.length) return L(n);
                                let o = 0;
                                return be(i).pipe(
                                  ki((s) =>
                                    (function nR(e, t, n, r) {
                                      return (function rR(e, t, n, r) {
                                        const i = lv(e);
                                        if (0 === i.length) return L({});
                                        const o = {};
                                        return be(i).pipe(
                                          Ce((s) =>
                                            (function iR(e, t, n, r) {
                                              const i = js(e, t, r);
                                              return kt(
                                                i.resolve
                                                  ? i.resolve(t, n)
                                                  : i(t, n)
                                              );
                                            })(e[s], t, n, r).pipe(
                                              Ze((a) => {
                                                o[s] = a;
                                              })
                                            )
                                          ),
                                          Zl(1),
                                          Ce(() =>
                                            lv(o).length === i.length
                                              ? L(o)
                                              : Bt
                                          )
                                        );
                                      })(e._resolve, e, t, r).pipe(
                                        ee(
                                          (o) => (
                                            (e._resolvedData = o),
                                            (e.data = Object.assign(
                                              Object.assign({}, e.data),
                                              Vy(e, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(s.route, r, e, t)
                                  ),
                                  Ze(() => o++),
                                  Zl(1),
                                  Ce((s) => (o === i.length ? L(n) : Bt))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            Ze({
                              next: () => (l = !0),
                              complete: () => {
                                l ||
                                  (this.restoreHistory(u),
                                  this.cancelNavigationTransition(
                                    u,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                        }),
                        Ze((u) => {
                          const l = new xA(
                            u.id,
                            this.serializeUrl(u.extractedUrl),
                            this.serializeUrl(u.urlAfterRedirects),
                            u.targetSnapshot
                          );
                          this.triggerEvent(l);
                        })
                      );
                  }),
                  cc((a) => {
                    const {
                      targetSnapshot: u,
                      id: l,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.afterPreactivation(u, {
                      navigationId: l,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  ee((a) => {
                    const u = (function rx(e, t, n) {
                      const r = Bi(e, t._root, n ? n._root : void 0);
                      return new Ly(r, t);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: u,
                    });
                  }),
                  Ze((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((e, t, n) =>
                    ee(
                      (r) => (
                        new px(
                          t,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(e),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  Ze({
                    next() {
                      o = !0;
                    },
                    complete() {
                      o = !0;
                    },
                  }),
                  (function bA(e) {
                    return we((t, n) => {
                      try {
                        t.subscribe(n);
                      } finally {
                        n.add(e);
                      }
                    });
                  })(() => {
                    var a;
                    o ||
                      s ||
                      this.cancelNavigationTransition(
                        i,
                        `Navigation ID ${i.id} is not equal to the current navigation id ${this.navigationId}`
                      ),
                      (null === (a = this.currentNavigation) || void 0 === a
                        ? void 0
                        : a.id) === i.id && (this.currentNavigation = null);
                  }),
                  gn((a) => {
                    if (
                      ((s = !0),
                      (function kA(e) {
                        return e && e[wy];
                      })(a))
                    ) {
                      const u = kn(a.url);
                      u || ((this.navigated = !0), this.restoreHistory(i, !0));
                      const l = new vy(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a.message
                      );
                      r.next(l),
                        u
                          ? setTimeout(() => {
                              const c = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                d = {
                                  skipLocationChange:
                                    i.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy ||
                                    Vs(i.source),
                                };
                              this.scheduleNavigation(
                                c,
                                "imperative",
                                null,
                                d,
                                {
                                  resolve: i.resolve,
                                  reject: i.reject,
                                  promise: i.promise,
                                }
                              );
                            }, 0)
                          : i.resolve(!1);
                    } else {
                      this.restoreHistory(i, !0);
                      const u = new MA(
                        i.id,
                        this.serializeUrl(i.extractedUrl),
                        a
                      );
                      r.next(u);
                      try {
                        i.resolve(this.errorHandler(a));
                      } catch (l) {
                        i.reject(l);
                      }
                    }
                    return Bt;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(n) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.transitions.value), n)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    var i;
                    const o = { replaceUrl: !0 },
                      s = (
                        null === (i = n.state) || void 0 === i
                          ? void 0
                          : i.navigationId
                      )
                        ? n.state
                        : null;
                    if (s) {
                      const u = Object.assign({}, s);
                      delete u.navigationId,
                        delete u.ɵrouterPageId,
                        0 !== Object.keys(u).length && (o.state = u);
                    }
                    const a = this.parseUrl(n.url);
                    this.scheduleNavigation(a, r, s, o);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            Zy(n),
              (this.config = n.map(uc)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: i,
                queryParams: o,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: u,
              } = r,
              l = i || this.routerState.root,
              c = u ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case "merge":
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  o
                );
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = o || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function sx(e, t, n, r, i) {
                if (0 === n.length) return ic(t.root, t.root, t, r, i);
                const o = (function ax(e) {
                  if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
                    return new $y(!0, 0, e);
                  let t = 0,
                    n = !1;
                  const r = e.reduce((i, o, s) => {
                    if ("object" == typeof o && null != o) {
                      if (o.outlets) {
                        const a = {};
                        return (
                          Me(o.outlets, (u, l) => {
                            a[l] = "string" == typeof u ? u.split("/") : u;
                          }),
                          [...i, { outlets: a }]
                        );
                      }
                      if (o.segmentPath) return [...i, o.segmentPath];
                    }
                    return "string" != typeof o
                      ? [...i, o]
                      : 0 === s
                      ? (o.split("/").forEach((a, u) => {
                          (0 == u && "." === a) ||
                            (0 == u && "" === a
                              ? (n = !0)
                              : ".." === a
                              ? t++
                              : "" != a && i.push(a));
                        }),
                        i)
                      : [...i, o];
                  }, []);
                  return new $y(n, t, r);
                })(n);
                if (o.toRoot()) return ic(t.root, new H([], {}), t, r, i);
                const s = (function ux(e, t, n) {
                    if (e.isAbsolute) return new oc(t.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const o = n.snapshot._urlSegment;
                      return new oc(o, o === t.root, 0);
                    }
                    const r = Rs(e.commands[0]) ? 0 : 1;
                    return (function lx(e, t, n) {
                      let r = e,
                        i = t,
                        o = n;
                      for (; o > i; ) {
                        if (((o -= i), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'");
                        i = r.segments.length;
                      }
                      return new oc(r, !1, i - o);
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + r,
                      e.numberOfDoubleDots
                    );
                  })(o, t, e),
                  a = s.processChildren
                    ? Ps(s.segmentGroup, s.index, o.commands)
                    : qy(s.segmentGroup, s.index, o.commands);
                return ic(s.segmentGroup, a, t, r, i);
              })(l, this.currentUrlTree, n, d, null != c ? c : null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const i = kn(n) ? n : this.parseUrl(n),
              o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(o, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function pR(e) {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t];
                  if (null == n)
                    throw new Error(
                      `The requested path contains ${n} segment at index ${t}`
                    );
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let i;
            if (
              ((i =
                !0 === r
                  ? Object.assign({}, fR)
                  : !1 === r
                  ? Object.assign({}, hR)
                  : r),
              kn(n))
            )
              return Sy(this.currentUrlTree, n, i);
            const o = this.parseUrl(n);
            return Sy(this.currentUrlTree, o, i);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, i) => {
              const o = n[i];
              return null != o && (r[i] = o), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new Li(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, i, o, s) {
            var a, u, l;
            if (this.disposed) return Promise.resolve(!1);
            const c = this.transitions.value,
              d = Vs(r) && c && !Vs(c.source),
              f = c.rawUrl.toString() === n.toString(),
              h =
                c.id ===
                (null === (a = this.currentNavigation) || void 0 === a
                  ? void 0
                  : a.id);
            if (d && f && h) return Promise.resolve(!0);
            let m, v, D;
            s
              ? ((m = s.resolve), (v = s.reject), (D = s.promise))
              : (D = new Promise((T, U) => {
                  (m = T), (v = U);
                }));
            const g = ++this.navigationId;
            let w;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (i = this.location.getState()),
                  (w =
                    i && i.ɵrouterPageId
                      ? i.ɵrouterPageId
                      : o.replaceUrl || o.skipLocationChange
                      ? null !== (u = this.browserPageId) && void 0 !== u
                        ? u
                        : 0
                      : (null !== (l = this.browserPageId) && void 0 !== l
                          ? l
                          : 0) + 1))
                : (w = 0),
              this.setTransition({
                id: g,
                targetPageId: w,
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: o,
                resolve: m,
                reject: v,
                promise: D,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              D.catch((T) => Promise.reject(T))
            );
          }
          setBrowserUrl(n, r) {
            const i = this.urlSerializer.serialize(n),
              o = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              );
            this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl
              ? this.location.replaceState(i, "", o)
              : this.location.go(i, "", o);
          }
          restoreHistory(n, r = !1) {
            var i, o;
            if ("computed" === this.canceledNavigationResolution) {
              const s = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (i = this.currentNavigation) || void 0 === i
                    ? void 0
                    : i.finalUrl)) ||
              0 === s
                ? this.currentUrlTree ===
                    (null === (o = this.currentNavigation) || void 0 === o
                      ? void 0
                      : o.finalUrl) &&
                  0 === s &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(s);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r) {
            const i = new vy(n.id, this.serializeUrl(n.extractedUrl), r);
            this.triggerEvent(i), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            Lu();
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Vs(e) {
        return "imperative" !== e;
      }
      class fv {}
      class hv {
        preload(t, n) {
          return L(null);
        }
      }
      let pv = (() => {
          class e {
            constructor(n, r, i, o) {
              (this.router = n),
                (this.injector = i),
                (this.preloadingStrategy = o),
                (this.loader = new cv(
                  i,
                  r,
                  (u) => n.triggerEvent(new Dy(u)),
                  (u) => n.triggerEvent(new Cy(u))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Nr((n) => n instanceof Li),
                  ki(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const n = this.injector.get(Qt);
              return this.processRoutes(n, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(n, r) {
              const i = [];
              for (const o of r)
                if (o.loadChildren && !o.canLoad && o._loadedConfig) {
                  const s = o._loadedConfig;
                  i.push(this.processRoutes(s.module, s.routes));
                } else
                  o.loadChildren && !o.canLoad
                    ? i.push(this.preloadConfig(n, o))
                    : o.children && i.push(this.processRoutes(n, o.children));
              return be(i).pipe(
                Hr(),
                ee((o) => {})
              );
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? L(r._loadedConfig)
                  : this.loader.load(n.injector, r)
                ).pipe(
                  Ce(
                    (o) => (
                      (r._loadedConfig = o),
                      this.processRoutes(o.module, o.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(A(Ye), A(os), A(ke), A(fv));
            }),
            (e.ɵprov = q({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        pc = (() => {
          class e {
            constructor(n, r, i = {}) {
              (this.router = n),
                (this.viewportScroller = r),
                (this.options = i),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (i.scrollPositionRestoration =
                  i.scrollPositionRestoration || "disabled"),
                (i.anchorScrolling = i.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof Yl
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof Li &&
                    ((this.lastId = n.id),
                    this.scheduleScrollEvent(
                      n,
                      this.router.parseUrl(n.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof _y &&
                  (n.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(n.position)
                    : n.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(n.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(n, r) {
              this.router.triggerEvent(
                new _y(
                  n,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (e.ɵfac = function (n) {
              Lu();
            }),
            (e.ɵprov = q({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Ln = new G("ROUTER_CONFIGURATION"),
        gv = new G("ROUTER_FORROOT_GUARD"),
        vR = [
          Tl,
          { provide: Ry, useClass: Py },
          {
            provide: Ye,
            useFactory: function ER(e, t, n, r, i, o, s = {}, a, u) {
              const l = new Ye(null, e, t, n, r, i, by(o));
              return (
                a && (l.urlHandlingStrategy = a),
                u && (l.routeReuseStrategy = u),
                (function bR(e, t) {
                  e.errorHandler && (t.errorHandler = e.errorHandler),
                    e.malformedUriErrorHandler &&
                      (t.malformedUriErrorHandler = e.malformedUriErrorHandler),
                    e.onSameUrlNavigation &&
                      (t.onSameUrlNavigation = e.onSameUrlNavigation),
                    e.paramsInheritanceStrategy &&
                      (t.paramsInheritanceStrategy =
                        e.paramsInheritanceStrategy),
                    e.relativeLinkResolution &&
                      (t.relativeLinkResolution = e.relativeLinkResolution),
                    e.urlUpdateStrategy &&
                      (t.urlUpdateStrategy = e.urlUpdateStrategy),
                    e.canceledNavigationResolution &&
                      (t.canceledNavigationResolution =
                        e.canceledNavigationResolution);
                })(s, l),
                s.enableTracing &&
                  l.events.subscribe((c) => {
                    var d, f;
                    null === (d = console.group) ||
                      void 0 === d ||
                      d.call(console, `Router Event: ${c.constructor.name}`),
                      console.log(c.toString()),
                      console.log(c),
                      null === (f = console.groupEnd) ||
                        void 0 === f ||
                        f.call(console);
                  }),
                l
              );
            },
            deps: [
              Ry,
              qi,
              Tl,
              ke,
              os,
              dc,
              Ln,
              [class uR {}, new Tt()],
              [class oR {}, new Tt()],
            ],
          },
          qi,
          {
            provide: Lr,
            useFactory: function MR(e) {
              return e.routerState.root;
            },
            deps: [Ye],
          },
          pv,
          hv,
          class yR {
            preload(t, n) {
              return n().pipe(gn(() => L(null)));
            }
          },
          { provide: Ln, useValue: { enableTracing: !1 } },
        ];
      function DR() {
        return new ym("Router", Ye);
      }
      let mv = (() => {
        class e {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                vR,
                yv(n),
                {
                  provide: gv,
                  useFactory: wR,
                  deps: [[Ye, new Tt(), new er()]],
                },
                { provide: Ln, useValue: r || {} },
                {
                  provide: Pr,
                  useFactory: _R,
                  deps: [Pn, [new oi(ls), new Tt()], Ln],
                },
                { provide: pc, useFactory: CR, deps: [Ye, pT, Ln] },
                {
                  provide: fv,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : hv,
                },
                { provide: ym, multi: !0, useFactory: DR },
                [
                  gc,
                  { provide: is, multi: !0, useFactory: IR, deps: [gc] },
                  { provide: vv, useFactory: SR, deps: [gc] },
                  { provide: cm, multi: !0, useExisting: vv },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: e, providers: [yv(n)] };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(gv, 8), A(Ye, 8));
          }),
          (e.ɵmod = _n({ type: e })),
          (e.ɵinj = en({})),
          e
        );
      })();
      function CR(e, t, n) {
        return n.scrollOffset && t.setOffset(n.scrollOffset), new pc(e, t, n);
      }
      function _R(e, t, n = {}) {
        return n.useHash ? new WI(e, t) : new Lm(e, t);
      }
      function wR(e) {
        return "guarded";
      }
      function yv(e) {
        return [
          { provide: gC, multi: !0, useValue: e },
          { provide: dc, multi: !0, useValue: e },
        ];
      }
      let gc = (() => {
        class e {
          constructor(n) {
            (this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new Lt());
          }
          appInitializer() {
            return this.injector.get(qI, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const i = new Promise((a) => (r = a)),
                o = this.injector.get(Ye),
                s = this.injector.get(Ln);
              return (
                "disabled" === s.initialNavigation
                  ? (o.setUpLocationChangeListener(), r(!0))
                  : "enabled" === s.initialNavigation ||
                    "enabledBlocking" === s.initialNavigation
                  ? ((o.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? L(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    o.initialNavigation())
                  : r(!0),
                i
              );
            });
          }
          bootstrapListener(n) {
            const r = this.injector.get(Ln),
              i = this.injector.get(pv),
              o = this.injector.get(pc),
              s = this.injector.get(Ye),
              a = this.injector.get(xi);
            n === a.components[0] &&
              (("enabledNonBlocking" === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                s.initialNavigation(),
              i.setUpPreloading(),
              o.init(),
              s.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(A(ke));
          }),
          (e.ɵprov = q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function IR(e) {
        return e.appInitializer.bind(e);
      }
      function SR(e) {
        return e.bootstrapListener.bind(e);
      }
      const vv = new G("Router Initializer"),
        AR = [];
      let xR = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _n({ type: e })),
            (e.ɵinj = en({ imports: [[mv.forRoot(AR)], mv] })),
            e
          );
        })(),
        RR = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = _n({ type: e, bootstrap: [oA] })),
            (e.ɵinj = en({
              providers: [{ provide: ls, useValue: "/angular-theme/" }],
              imports: [[UT, xR]],
            })),
            e
          );
        })();
      (function gI() {
        Em = !1;
      })(),
        BT()
          .bootstrapModule(RR)
          .catch((e) => console.error(e));
    },
  },
  (X) => {
    X((X.s = 287));
  },
]);
