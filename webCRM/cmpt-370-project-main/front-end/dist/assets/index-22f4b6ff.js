function Ua(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const i in r)
                if (i !== "default" && !(i in e)) {
                    const s = Object.getOwnPropertyDescriptor(r, i);
                    s &&
                        Object.defineProperty(
                            e,
                            i,
                            s.get ? s : { enumerable: !0, get: () => r[i] },
                        );
                }
        }
    }
    return Object.freeze(
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
    );
}
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        r(i);
    new MutationObserver((i) => {
        for (const s of i)
            if (s.type === "childList")
                for (const o of s.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(i) {
        const s = {};
        return (
            i.integrity && (s.integrity = i.integrity),
            i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
            i.crossOrigin === "use-credentials"
                ? (s.credentials = "include")
                : i.crossOrigin === "anonymous"
                ? (s.credentials = "omit")
                : (s.credentials = "same-origin"),
            s
        );
    }
    function r(i) {
        if (i.ep) return;
        i.ep = !0;
        const s = n(i);
        fetch(i.href, s);
    }
})();
var Bd =
    typeof globalThis < "u"
        ? globalThis
        : typeof window < "u"
        ? window
        : typeof global < "u"
        ? global
        : typeof self < "u"
        ? self
        : {};
function za(e) {
    return e &&
        e.__esModule &&
        Object.prototype.hasOwnProperty.call(e, "default")
        ? e.default
        : e;
}
var Ba = { exports: {} },
    Xi = {},
    Va = { exports: {} },
    V = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Rr = Symbol.for("react.element"),
    Vd = Symbol.for("react.portal"),
    Qd = Symbol.for("react.fragment"),
    $d = Symbol.for("react.strict_mode"),
    qd = Symbol.for("react.profiler"),
    Hd = Symbol.for("react.provider"),
    Wd = Symbol.for("react.context"),
    bd = Symbol.for("react.forward_ref"),
    Gd = Symbol.for("react.suspense"),
    Kd = Symbol.for("react.memo"),
    Yd = Symbol.for("react.lazy"),
    su = Symbol.iterator;
function Xd(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (su && e[su]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var Qa = {
        isMounted: function () {
            return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
    },
    $a = Object.assign,
    qa = {};
function Ln(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = qa),
        (this.updater = n || Qa);
}
Ln.prototype.isReactComponent = {};
Ln.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
    this.updater.enqueueSetState(this, e, t, "setState");
};
Ln.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ha() {}
Ha.prototype = Ln.prototype;
function tl(e, t, n) {
    (this.props = e),
        (this.context = t),
        (this.refs = qa),
        (this.updater = n || Qa);
}
var nl = (tl.prototype = new Ha());
nl.constructor = tl;
$a(nl, Ln.prototype);
nl.isPureReactComponent = !0;
var ou = Array.isArray,
    Wa = Object.prototype.hasOwnProperty,
    rl = { current: null },
    ba = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ga(e, t, n) {
    var r,
        i = {},
        s = null,
        o = null;
    if (t != null)
        for (r in (t.ref !== void 0 && (o = t.ref),
        t.key !== void 0 && (s = "" + t.key),
        t))
            Wa.call(t, r) && !ba.hasOwnProperty(r) && (i[r] = t[r]);
    var l = arguments.length - 2;
    if (l === 1) i.children = n;
    else if (1 < l) {
        for (var u = Array(l), a = 0; a < l; a++) u[a] = arguments[a + 2];
        i.children = u;
    }
    if (e && e.defaultProps)
        for (r in ((l = e.defaultProps), l)) i[r] === void 0 && (i[r] = l[r]);
    return {
        $$typeof: Rr,
        type: e,
        key: s,
        ref: o,
        props: i,
        _owner: rl.current,
    };
}
function Jd(e, t) {
    return {
        $$typeof: Rr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
    };
}
function il(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Rr;
}
function Zd(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
        "$" +
        e.replace(/[=:]/g, function (n) {
            return t[n];
        })
    );
}
var lu = /\/+/g;
function xs(e, t) {
    return typeof e == "object" && e !== null && e.key != null
        ? Zd("" + e.key)
        : t.toString(36);
}
function ri(e, t, n, r, i) {
    var s = typeof e;
    (s === "undefined" || s === "boolean") && (e = null);
    var o = !1;
    if (e === null) o = !0;
    else
        switch (s) {
            case "string":
            case "number":
                o = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case Rr:
                    case Vd:
                        o = !0;
                }
        }
    if (o)
        return (
            (o = e),
            (i = i(o)),
            (e = r === "" ? "." + xs(o, 0) : r),
            ou(i)
                ? ((n = ""),
                  e != null && (n = e.replace(lu, "$&/") + "/"),
                  ri(i, t, n, "", function (a) {
                      return a;
                  }))
                : i != null &&
                  (il(i) &&
                      (i = Jd(
                          i,
                          n +
                              (!i.key || (o && o.key === i.key)
                                  ? ""
                                  : ("" + i.key).replace(lu, "$&/") + "/") +
                              e,
                      )),
                  t.push(i)),
            1
        );
    if (((o = 0), (r = r === "" ? "." : r + ":"), ou(e)))
        for (var l = 0; l < e.length; l++) {
            s = e[l];
            var u = r + xs(s, l);
            o += ri(s, t, n, u, i);
        }
    else if (((u = Xd(e)), typeof u == "function"))
        for (e = u.call(e), l = 0; !(s = e.next()).done; )
            (s = s.value), (u = r + xs(s, l++)), (o += ri(s, t, n, u, i));
    else if (s === "object")
        throw (
            ((t = String(e)),
            Error(
                "Objects are not valid as a React child (found: " +
                    (t === "[object Object]"
                        ? "object with keys {" + Object.keys(e).join(", ") + "}"
                        : t) +
                    "). If you meant to render a collection of children, use an array instead.",
            ))
        );
    return o;
}
function zr(e, t, n) {
    if (e == null) return e;
    var r = [],
        i = 0;
    return (
        ri(e, r, "", "", function (s) {
            return t.call(n, s, i++);
        }),
        r
    );
}
function eh(e) {
    if (e._status === -1) {
        var t = e._result;
        (t = t()),
            t.then(
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 1), (e._result = n));
                },
                function (n) {
                    (e._status === 0 || e._status === -1) &&
                        ((e._status = 2), (e._result = n));
                },
            ),
            e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
}
var we = { current: null },
    ii = { transition: null },
    th = {
        ReactCurrentDispatcher: we,
        ReactCurrentBatchConfig: ii,
        ReactCurrentOwner: rl,
    };
V.Children = {
    map: zr,
    forEach: function (e, t, n) {
        zr(
            e,
            function () {
                t.apply(this, arguments);
            },
            n,
        );
    },
    count: function (e) {
        var t = 0;
        return (
            zr(e, function () {
                t++;
            }),
            t
        );
    },
    toArray: function (e) {
        return (
            zr(e, function (t) {
                return t;
            }) || []
        );
    },
    only: function (e) {
        if (!il(e))
            throw Error(
                "React.Children.only expected to receive a single React element child.",
            );
        return e;
    },
};
V.Component = Ln;
V.Fragment = Qd;
V.Profiler = qd;
V.PureComponent = tl;
V.StrictMode = $d;
V.Suspense = Gd;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = th;
V.cloneElement = function (e, t, n) {
    if (e == null)
        throw Error(
            "React.cloneElement(...): The argument must be a React element, but you passed " +
                e +
                ".",
        );
    var r = $a({}, e.props),
        i = e.key,
        s = e.ref,
        o = e._owner;
    if (t != null) {
        if (
            (t.ref !== void 0 && ((s = t.ref), (o = rl.current)),
            t.key !== void 0 && (i = "" + t.key),
            e.type && e.type.defaultProps)
        )
            var l = e.type.defaultProps;
        for (u in t)
            Wa.call(t, u) &&
                !ba.hasOwnProperty(u) &&
                (r[u] = t[u] === void 0 && l !== void 0 ? l[u] : t[u]);
    }
    var u = arguments.length - 2;
    if (u === 1) r.children = n;
    else if (1 < u) {
        l = Array(u);
        for (var a = 0; a < u; a++) l[a] = arguments[a + 2];
        r.children = l;
    }
    return { $$typeof: Rr, type: e.type, key: i, ref: s, props: r, _owner: o };
};
V.createContext = function (e) {
    return (
        (e = {
            $$typeof: Wd,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
        }),
        (e.Provider = { $$typeof: Hd, _context: e }),
        (e.Consumer = e)
    );
};
V.createElement = Ga;
V.createFactory = function (e) {
    var t = Ga.bind(null, e);
    return (t.type = e), t;
};
V.createRef = function () {
    return { current: null };
};
V.forwardRef = function (e) {
    return { $$typeof: bd, render: e };
};
V.isValidElement = il;
V.lazy = function (e) {
    return { $$typeof: Yd, _payload: { _status: -1, _result: e }, _init: eh };
};
V.memo = function (e, t) {
    return { $$typeof: Kd, type: e, compare: t === void 0 ? null : t };
};
V.startTransition = function (e) {
    var t = ii.transition;
    ii.transition = {};
    try {
        e();
    } finally {
        ii.transition = t;
    }
};
V.unstable_act = function () {
    throw Error("act(...) is not supported in production builds of React.");
};
V.useCallback = function (e, t) {
    return we.current.useCallback(e, t);
};
V.useContext = function (e) {
    return we.current.useContext(e);
};
V.useDebugValue = function () {};
V.useDeferredValue = function (e) {
    return we.current.useDeferredValue(e);
};
V.useEffect = function (e, t) {
    return we.current.useEffect(e, t);
};
V.useId = function () {
    return we.current.useId();
};
V.useImperativeHandle = function (e, t, n) {
    return we.current.useImperativeHandle(e, t, n);
};
V.useInsertionEffect = function (e, t) {
    return we.current.useInsertionEffect(e, t);
};
V.useLayoutEffect = function (e, t) {
    return we.current.useLayoutEffect(e, t);
};
V.useMemo = function (e, t) {
    return we.current.useMemo(e, t);
};
V.useReducer = function (e, t, n) {
    return we.current.useReducer(e, t, n);
};
V.useRef = function (e) {
    return we.current.useRef(e);
};
V.useState = function (e) {
    return we.current.useState(e);
};
V.useSyncExternalStore = function (e, t, n) {
    return we.current.useSyncExternalStore(e, t, n);
};
V.useTransition = function () {
    return we.current.useTransition();
};
V.version = "18.2.0";
Va.exports = V;
var R = Va.exports;
const nh = za(R),
    rh = Ua({ __proto__: null, default: nh }, [R]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ih = R,
    sh = Symbol.for("react.element"),
    oh = Symbol.for("react.fragment"),
    lh = Object.prototype.hasOwnProperty,
    uh =
        ih.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    ah = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ka(e, t, n) {
    var r,
        i = {},
        s = null,
        o = null;
    n !== void 0 && (s = "" + n),
        t.key !== void 0 && (s = "" + t.key),
        t.ref !== void 0 && (o = t.ref);
    for (r in t) lh.call(t, r) && !ah.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in ((t = e.defaultProps), t)) i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: sh,
        type: e,
        key: s,
        ref: o,
        props: i,
        _owner: uh.current,
    };
}
Xi.Fragment = oh;
Xi.jsx = Ka;
Xi.jsxs = Ka;
Ba.exports = Xi;
var x = Ba.exports,
    Ya = { exports: {} },
    Ae = {},
    Xa = { exports: {} },
    Ja = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
    function t(P, D) {
        var M = P.length;
        P.push(D);
        e: for (; 0 < M; ) {
            var q = (M - 1) >>> 1,
                Z = P[q];
            if (0 < i(Z, D)) (P[q] = D), (P[M] = Z), (M = q);
            else break e;
        }
    }
    function n(P) {
        return P.length === 0 ? null : P[0];
    }
    function r(P) {
        if (P.length === 0) return null;
        var D = P[0],
            M = P.pop();
        if (M !== D) {
            P[0] = M;
            e: for (var q = 0, Z = P.length, Mr = Z >>> 1; q < Mr; ) {
                var Ut = 2 * (q + 1) - 1,
                    gs = P[Ut],
                    zt = Ut + 1,
                    Ur = P[zt];
                if (0 > i(gs, M))
                    zt < Z && 0 > i(Ur, gs)
                        ? ((P[q] = Ur), (P[zt] = M), (q = zt))
                        : ((P[q] = gs), (P[Ut] = M), (q = Ut));
                else if (zt < Z && 0 > i(Ur, M))
                    (P[q] = Ur), (P[zt] = M), (q = zt);
                else break e;
            }
        }
        return D;
    }
    function i(P, D) {
        var M = P.sortIndex - D.sortIndex;
        return M !== 0 ? M : P.id - D.id;
    }
    if (
        typeof performance == "object" &&
        typeof performance.now == "function"
    ) {
        var s = performance;
        e.unstable_now = function () {
            return s.now();
        };
    } else {
        var o = Date,
            l = o.now();
        e.unstable_now = function () {
            return o.now() - l;
        };
    }
    var u = [],
        a = [],
        c = 1,
        h = null,
        m = 3,
        y = !1,
        v = !1,
        g = !1,
        C = typeof setTimeout == "function" ? setTimeout : null,
        d = typeof clearTimeout == "function" ? clearTimeout : null,
        f = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
        navigator.scheduling !== void 0 &&
        navigator.scheduling.isInputPending !== void 0 &&
        navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function p(P) {
        for (var D = n(a); D !== null; ) {
            if (D.callback === null) r(a);
            else if (D.startTime <= P)
                r(a), (D.sortIndex = D.expirationTime), t(u, D);
            else break;
            D = n(a);
        }
    }
    function E(P) {
        if (((g = !1), p(P), !v))
            if (n(u) !== null) (v = !0), U(_);
            else {
                var D = n(a);
                D !== null && ne(E, D.startTime - P);
            }
    }
    function _(P, D) {
        (v = !1), g && ((g = !1), d(k), (k = -1)), (y = !0);
        var M = m;
        try {
            for (
                p(D), h = n(u);
                h !== null && (!(h.expirationTime > D) || (P && !H()));

            ) {
                var q = h.callback;
                if (typeof q == "function") {
                    (h.callback = null), (m = h.priorityLevel);
                    var Z = q(h.expirationTime <= D);
                    (D = e.unstable_now()),
                        typeof Z == "function"
                            ? (h.callback = Z)
                            : h === n(u) && r(u),
                        p(D);
                } else r(u);
                h = n(u);
            }
            if (h !== null) var Mr = !0;
            else {
                var Ut = n(a);
                Ut !== null && ne(E, Ut.startTime - D), (Mr = !1);
            }
            return Mr;
        } finally {
            (h = null), (m = M), (y = !1);
        }
    }
    var T = !1,
        N = null,
        k = -1,
        z = 5,
        j = -1;
    function H() {
        return !(e.unstable_now() - j < z);
    }
    function ht() {
        if (N !== null) {
            var P = e.unstable_now();
            j = P;
            var D = !0;
            try {
                D = N(!0, P);
            } finally {
                D ? Qe() : ((T = !1), (N = null));
            }
        } else T = !1;
    }
    var Qe;
    if (typeof f == "function")
        Qe = function () {
            f(ht);
        };
    else if (typeof MessageChannel < "u") {
        var w = new MessageChannel(),
            I = w.port2;
        (w.port1.onmessage = ht),
            (Qe = function () {
                I.postMessage(null);
            });
    } else
        Qe = function () {
            C(ht, 0);
        };
    function U(P) {
        (N = P), T || ((T = !0), Qe());
    }
    function ne(P, D) {
        k = C(function () {
            P(e.unstable_now());
        }, D);
    }
    (e.unstable_IdlePriority = 5),
        (e.unstable_ImmediatePriority = 1),
        (e.unstable_LowPriority = 4),
        (e.unstable_NormalPriority = 3),
        (e.unstable_Profiling = null),
        (e.unstable_UserBlockingPriority = 2),
        (e.unstable_cancelCallback = function (P) {
            P.callback = null;
        }),
        (e.unstable_continueExecution = function () {
            v || y || ((v = !0), U(_));
        }),
        (e.unstable_forceFrameRate = function (P) {
            0 > P || 125 < P
                ? console.error(
                      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                  )
                : (z = 0 < P ? Math.floor(1e3 / P) : 5);
        }),
        (e.unstable_getCurrentPriorityLevel = function () {
            return m;
        }),
        (e.unstable_getFirstCallbackNode = function () {
            return n(u);
        }),
        (e.unstable_next = function (P) {
            switch (m) {
                case 1:
                case 2:
                case 3:
                    var D = 3;
                    break;
                default:
                    D = m;
            }
            var M = m;
            m = D;
            try {
                return P();
            } finally {
                m = M;
            }
        }),
        (e.unstable_pauseExecution = function () {}),
        (e.unstable_requestPaint = function () {}),
        (e.unstable_runWithPriority = function (P, D) {
            switch (P) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    P = 3;
            }
            var M = m;
            m = P;
            try {
                return D();
            } finally {
                m = M;
            }
        }),
        (e.unstable_scheduleCallback = function (P, D, M) {
            var q = e.unstable_now();
            switch (
                (typeof M == "object" && M !== null
                    ? ((M = M.delay),
                      (M = typeof M == "number" && 0 < M ? q + M : q))
                    : (M = q),
                P)
            ) {
                case 1:
                    var Z = -1;
                    break;
                case 2:
                    Z = 250;
                    break;
                case 5:
                    Z = 1073741823;
                    break;
                case 4:
                    Z = 1e4;
                    break;
                default:
                    Z = 5e3;
            }
            return (
                (Z = M + Z),
                (P = {
                    id: c++,
                    callback: D,
                    priorityLevel: P,
                    startTime: M,
                    expirationTime: Z,
                    sortIndex: -1,
                }),
                M > q
                    ? ((P.sortIndex = M),
                      t(a, P),
                      n(u) === null &&
                          P === n(a) &&
                          (g ? (d(k), (k = -1)) : (g = !0), ne(E, M - q)))
                    : ((P.sortIndex = Z), t(u, P), v || y || ((v = !0), U(_))),
                P
            );
        }),
        (e.unstable_shouldYield = H),
        (e.unstable_wrapCallback = function (P) {
            var D = m;
            return function () {
                var M = m;
                m = D;
                try {
                    return P.apply(this, arguments);
                } finally {
                    m = M;
                }
            };
        });
})(Ja);
Xa.exports = Ja;
var ch = Xa.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Za = R,
    De = ch;
function O(e) {
    for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
            n = 1;
        n < arguments.length;
        n++
    )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
}
var ec = new Set(),
    ar = {};
function en(e, t) {
    Tn(e, t), Tn(e + "Capture", t);
}
function Tn(e, t) {
    for (ar[e] = t, e = 0; e < t.length; e++) ec.add(t[e]);
}
var lt = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
    ),
    Xs = Object.prototype.hasOwnProperty,
    fh =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    uu = {},
    au = {};
function dh(e) {
    return Xs.call(au, e)
        ? !0
        : Xs.call(uu, e)
        ? !1
        : fh.test(e)
        ? (au[e] = !0)
        : ((uu[e] = !0), !1);
}
function hh(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r
                ? !1
                : n !== null
                ? !n.acceptsBooleans
                : ((e = e.toLowerCase().slice(0, 5)),
                  e !== "data-" && e !== "aria-");
        default:
            return !1;
    }
}
function ph(e, t, n, r) {
    if (t === null || typeof t > "u" || hh(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null)
        switch (n.type) {
            case 3:
                return !t;
            case 4:
                return t === !1;
            case 5:
                return isNaN(t);
            case 6:
                return isNaN(t) || 1 > t;
        }
    return !1;
}
function Se(e, t, n, r, i, s, o) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = s),
        (this.removeEmptyString = o);
}
var pe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
        pe[e] = new Se(e, 0, !1, e, null, !1, !1);
    });
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
].forEach(function (e) {
    var t = e[0];
    pe[t] = new Se(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    pe[e] = new Se(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
].forEach(function (e) {
    pe[e] = new Se(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
        pe[e] = new Se(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
    pe[e] = new Se(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
    pe[e] = new Se(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
    pe[e] = new Se(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
    pe[e] = new Se(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var sl = /[\-:]([a-z])/g;
function ol(e) {
    return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(sl, ol);
        pe[t] = new Se(t, 1, !1, e, null, !1, !1);
    });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
        var t = e.replace(sl, ol);
        pe[t] = new Se(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(sl, ol);
    pe[t] = new Se(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
    pe[e] = new Se(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
pe.xlinkHref = new Se(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
    pe[e] = new Se(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ll(e, t, n, r) {
    var i = pe.hasOwnProperty(t) ? pe[t] : null;
    (i !== null
        ? i.type !== 0
        : r ||
          !(2 < t.length) ||
          (t[0] !== "o" && t[0] !== "O") ||
          (t[1] !== "n" && t[1] !== "N")) &&
        (ph(t, n, i, r) && (n = null),
        r || i === null
            ? dh(t) &&
              (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
            : i.mustUseProperty
            ? (e[i.propertyName] = n === null ? (i.type === 3 ? !1 : "") : n)
            : ((t = i.attributeName),
              (r = i.attributeNamespace),
              n === null
                  ? e.removeAttribute(t)
                  : ((i = i.type),
                    (n = i === 3 || (i === 4 && n === !0) ? "" : "" + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ft = Za.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Br = Symbol.for("react.element"),
    ln = Symbol.for("react.portal"),
    un = Symbol.for("react.fragment"),
    ul = Symbol.for("react.strict_mode"),
    Js = Symbol.for("react.profiler"),
    tc = Symbol.for("react.provider"),
    nc = Symbol.for("react.context"),
    al = Symbol.for("react.forward_ref"),
    Zs = Symbol.for("react.suspense"),
    eo = Symbol.for("react.suspense_list"),
    cl = Symbol.for("react.memo"),
    vt = Symbol.for("react.lazy"),
    rc = Symbol.for("react.offscreen"),
    cu = Symbol.iterator;
function zn(e) {
    return e === null || typeof e != "object"
        ? null
        : ((e = (cu && e[cu]) || e["@@iterator"]),
          typeof e == "function" ? e : null);
}
var J = Object.assign,
    Es;
function bn(e) {
    if (Es === void 0)
        try {
            throw Error();
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Es = (t && t[1]) || "";
        }
    return (
        `
` +
        Es +
        e
    );
}
var ws = !1;
function Ss(e, t) {
    if (!e || ws) return "";
    ws = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (
                ((t = function () {
                    throw Error();
                }),
                Object.defineProperty(t.prototype, "props", {
                    set: function () {
                        throw Error();
                    },
                }),
                typeof Reflect == "object" && Reflect.construct)
            ) {
                try {
                    Reflect.construct(t, []);
                } catch (a) {
                    var r = a;
                }
                Reflect.construct(e, [], t);
            } else {
                try {
                    t.call();
                } catch (a) {
                    r = a;
                }
                e.call(t.prototype);
            }
        else {
            try {
                throw Error();
            } catch (a) {
                r = a;
            }
            e();
        }
    } catch (a) {
        if (a && r && typeof a.stack == "string") {
            for (
                var i = a.stack.split(`
`),
                    s = r.stack.split(`
`),
                    o = i.length - 1,
                    l = s.length - 1;
                1 <= o && 0 <= l && i[o] !== s[l];

            )
                l--;
            for (; 1 <= o && 0 <= l; o--, l--)
                if (i[o] !== s[l]) {
                    if (o !== 1 || l !== 1)
                        do
                            if ((o--, l--, 0 > l || i[o] !== s[l])) {
                                var u =
                                    `
` + i[o].replace(" at new ", " at ");
                                return (
                                    e.displayName &&
                                        u.includes("<anonymous>") &&
                                        (u = u.replace(
                                            "<anonymous>",
                                            e.displayName,
                                        )),
                                    u
                                );
                            }
                        while (1 <= o && 0 <= l);
                    break;
                }
        }
    } finally {
        (ws = !1), (Error.prepareStackTrace = n);
    }
    return (e = e ? e.displayName || e.name : "") ? bn(e) : "";
}
function mh(e) {
    switch (e.tag) {
        case 5:
            return bn(e.type);
        case 16:
            return bn("Lazy");
        case 13:
            return bn("Suspense");
        case 19:
            return bn("SuspenseList");
        case 0:
        case 2:
        case 15:
            return (e = Ss(e.type, !1)), e;
        case 11:
            return (e = Ss(e.type.render, !1)), e;
        case 1:
            return (e = Ss(e.type, !0)), e;
        default:
            return "";
    }
}
function to(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case un:
            return "Fragment";
        case ln:
            return "Portal";
        case Js:
            return "Profiler";
        case ul:
            return "StrictMode";
        case Zs:
            return "Suspense";
        case eo:
            return "SuspenseList";
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
            case nc:
                return (e.displayName || "Context") + ".Consumer";
            case tc:
                return (e._context.displayName || "Context") + ".Provider";
            case al:
                var t = e.render;
                return (
                    (e = e.displayName),
                    e ||
                        ((e = t.displayName || t.name || ""),
                        (e =
                            e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
                    e
                );
            case cl:
                return (
                    (t = e.displayName || null),
                    t !== null ? t : to(e.type) || "Memo"
                );
            case vt:
                (t = e._payload), (e = e._init);
                try {
                    return to(e(t));
                } catch {}
        }
    return null;
}
function vh(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return (
                (e = t.render),
                (e = e.displayName || e.name || ""),
                t.displayName ||
                    (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
            );
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return to(t);
        case 8:
            return t === ul ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t;
    }
    return null;
}
function At(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return "";
    }
}
function ic(e) {
    var t = e.type;
    return (
        (e = e.nodeName) &&
        e.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
    );
}
function yh(e) {
    var t = ic(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (
        !e.hasOwnProperty(t) &&
        typeof n < "u" &&
        typeof n.get == "function" &&
        typeof n.set == "function"
    ) {
        var i = n.get,
            s = n.set;
        return (
            Object.defineProperty(e, t, {
                configurable: !0,
                get: function () {
                    return i.call(this);
                },
                set: function (o) {
                    (r = "" + o), s.call(this, o);
                },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
                getValue: function () {
                    return r;
                },
                setValue: function (o) {
                    r = "" + o;
                },
                stopTracking: function () {
                    (e._valueTracker = null), delete e[t];
                },
            }
        );
    }
}
function Vr(e) {
    e._valueTracker || (e._valueTracker = yh(e));
}
function sc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return (
        e && (r = ic(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r),
        e !== n ? (t.setValue(e), !0) : !1
    );
}
function xi(e) {
    if (
        ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
        return null;
    try {
        return e.activeElement || e.body;
    } catch {
        return e.body;
    }
}
function no(e, t) {
    var n = t.checked;
    return J({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
    });
}
function fu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    (n = At(t.value != null ? t.value : n)),
        (e._wrapperState = {
            initialChecked: r,
            initialValue: n,
            controlled:
                t.type === "checkbox" || t.type === "radio"
                    ? t.checked != null
                    : t.value != null,
        });
}
function oc(e, t) {
    (t = t.checked), t != null && ll(e, "checked", t, !1);
}
function ro(e, t) {
    oc(e, t);
    var n = At(t.value),
        r = t.type;
    if (n != null)
        r === "number"
            ? ((n === 0 && e.value === "") || e.value != n) &&
              (e.value = "" + n)
            : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return;
    }
    t.hasOwnProperty("value")
        ? io(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && io(e, t.type, At(t.defaultValue)),
        t.checked == null &&
            t.defaultChecked != null &&
            (e.defaultChecked = !!t.defaultChecked);
}
function du(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
            !(
                (r !== "submit" && r !== "reset") ||
                (t.value !== void 0 && t.value !== null)
            )
        )
            return;
        (t = "" + e._wrapperState.initialValue),
            n || t === e.value || (e.value = t),
            (e.defaultValue = t);
    }
    (n = e.name),
        n !== "" && (e.name = ""),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== "" && (e.name = n);
}
function io(e, t, n) {
    (t !== "number" || xi(e.ownerDocument) !== e) &&
        (n == null
            ? (e.defaultValue = "" + e._wrapperState.initialValue)
            : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Gn = Array.isArray;
function En(e, t, n, r) {
    if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
            (i = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== i && (e[n].selected = i),
                i && r && (e[n].defaultSelected = !0);
    } else {
        for (n = "" + At(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                (e[i].selected = !0), r && (e[i].defaultSelected = !0);
                return;
            }
            t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
    }
}
function so(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(O(91));
    return J({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
    });
}
function hu(e, t) {
    var n = t.value;
    if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
            if (t != null) throw Error(O(92));
            if (Gn(n)) {
                if (1 < n.length) throw Error(O(93));
                n = n[0];
            }
            t = n;
        }
        t == null && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: At(n) };
}
function lc(e, t) {
    var n = At(t.value),
        r = At(t.defaultValue);
    n != null &&
        ((n = "" + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = "" + r);
}
function pu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
        t !== "" &&
        t !== null &&
        (e.value = t);
}
function uc(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml";
    }
}
function oo(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
        ? uc(t)
        : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
}
var Qr,
    ac = (function (e) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
            ? function (t, n, r, i) {
                  MSApp.execUnsafeLocalFunction(function () {
                      return e(t, n, r, i);
                  });
              }
            : e;
    })(function (e, t) {
        if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
            e.innerHTML = t;
        else {
            for (
                Qr = Qr || document.createElement("div"),
                    Qr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
                    t = Qr.firstChild;
                e.firstChild;

            )
                e.removeChild(e.firstChild);
            for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
    });
function cr(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return;
        }
    }
    e.textContent = t;
}
var Zn = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
    },
    gh = ["Webkit", "ms", "Moz", "O"];
Object.keys(Zn).forEach(function (e) {
    gh.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Zn[t] = Zn[e]);
    });
});
function cc(e, t, n) {
    return t == null || typeof t == "boolean" || t === ""
        ? ""
        : n ||
          typeof t != "number" ||
          t === 0 ||
          (Zn.hasOwnProperty(e) && Zn[e])
        ? ("" + t).trim()
        : t + "px";
}
function fc(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                i = cc(n, t[n], r);
            n === "float" && (n = "cssFloat"),
                r ? e.setProperty(n, i) : (e[n] = i);
        }
}
var xh = J(
    { menuitem: !0 },
    {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
    },
);
function lo(e, t) {
    if (t) {
        if (xh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(O(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(O(60));
            if (
                typeof t.dangerouslySetInnerHTML != "object" ||
                !("__html" in t.dangerouslySetInnerHTML)
            )
                throw Error(O(61));
        }
        if (t.style != null && typeof t.style != "object") throw Error(O(62));
    }
}
function uo(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0;
    }
}
var ao = null;
function fl(e) {
    return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    );
}
var co = null,
    wn = null,
    Sn = null;
function mu(e) {
    if ((e = Dr(e))) {
        if (typeof co != "function") throw Error(O(280));
        var t = e.stateNode;
        t && ((t = ns(t)), co(e.stateNode, e.type, t));
    }
}
function dc(e) {
    wn ? (Sn ? Sn.push(e) : (Sn = [e])) : (wn = e);
}
function hc() {
    if (wn) {
        var e = wn,
            t = Sn;
        if (((Sn = wn = null), mu(e), t))
            for (e = 0; e < t.length; e++) mu(t[e]);
    }
}
function pc(e, t) {
    return e(t);
}
function mc() {}
var Cs = !1;
function vc(e, t, n) {
    if (Cs) return e(t, n);
    Cs = !0;
    try {
        return pc(e, t, n);
    } finally {
        (Cs = !1), (wn !== null || Sn !== null) && (mc(), hc());
    }
}
function fr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = ns(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) ||
                ((e = e.type),
                (r = !(
                    e === "button" ||
                    e === "input" ||
                    e === "select" ||
                    e === "textarea"
                ))),
                (e = !r);
            break e;
        default:
            e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(O(231, t, typeof n));
    return n;
}
var fo = !1;
if (lt)
    try {
        var Bn = {};
        Object.defineProperty(Bn, "passive", {
            get: function () {
                fo = !0;
            },
        }),
            window.addEventListener("test", Bn, Bn),
            window.removeEventListener("test", Bn, Bn);
    } catch {
        fo = !1;
    }
function Eh(e, t, n, r, i, s, o, l, u) {
    var a = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, a);
    } catch (c) {
        this.onError(c);
    }
}
var er = !1,
    Ei = null,
    wi = !1,
    ho = null,
    wh = {
        onError: function (e) {
            (er = !0), (Ei = e);
        },
    };
function Sh(e, t, n, r, i, s, o, l, u) {
    (er = !1), (Ei = null), Eh.apply(wh, arguments);
}
function Ch(e, t, n, r, i, s, o, l, u) {
    if ((Sh.apply(this, arguments), er)) {
        if (er) {
            var a = Ei;
            (er = !1), (Ei = null);
        } else throw Error(O(198));
        wi || ((wi = !0), (ho = a));
    }
}
function tn(e) {
    var t = e,
        n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
        e = t;
        do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
        while (e);
    }
    return t.tag === 3 ? n : null;
}
function yc(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (
            (t === null &&
                ((e = e.alternate), e !== null && (t = e.memoizedState)),
            t !== null)
        )
            return t.dehydrated;
    }
    return null;
}
function vu(e) {
    if (tn(e) !== e) throw Error(O(188));
}
function kh(e) {
    var t = e.alternate;
    if (!t) {
        if (((t = tn(e)), t === null)) throw Error(O(188));
        return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
        var i = n.return;
        if (i === null) break;
        var s = i.alternate;
        if (s === null) {
            if (((r = i.return), r !== null)) {
                n = r;
                continue;
            }
            break;
        }
        if (i.child === s.child) {
            for (s = i.child; s; ) {
                if (s === n) return vu(i), e;
                if (s === r) return vu(i), t;
                s = s.sibling;
            }
            throw Error(O(188));
        }
        if (n.return !== r.return) (n = i), (r = s);
        else {
            for (var o = !1, l = i.child; l; ) {
                if (l === n) {
                    (o = !0), (n = i), (r = s);
                    break;
                }
                if (l === r) {
                    (o = !0), (r = i), (n = s);
                    break;
                }
                l = l.sibling;
            }
            if (!o) {
                for (l = s.child; l; ) {
                    if (l === n) {
                        (o = !0), (n = s), (r = i);
                        break;
                    }
                    if (l === r) {
                        (o = !0), (r = s), (n = i);
                        break;
                    }
                    l = l.sibling;
                }
                if (!o) throw Error(O(189));
            }
        }
        if (n.alternate !== r) throw Error(O(190));
    }
    if (n.tag !== 3) throw Error(O(188));
    return n.stateNode.current === n ? e : t;
}
function gc(e) {
    return (e = kh(e)), e !== null ? xc(e) : null;
}
function xc(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
        var t = xc(e);
        if (t !== null) return t;
        e = e.sibling;
    }
    return null;
}
var Ec = De.unstable_scheduleCallback,
    yu = De.unstable_cancelCallback,
    Nh = De.unstable_shouldYield,
    Th = De.unstable_requestPaint,
    te = De.unstable_now,
    Oh = De.unstable_getCurrentPriorityLevel,
    dl = De.unstable_ImmediatePriority,
    wc = De.unstable_UserBlockingPriority,
    Si = De.unstable_NormalPriority,
    _h = De.unstable_LowPriority,
    Sc = De.unstable_IdlePriority,
    Ji = null,
    et = null;
function Rh(e) {
    if (et && typeof et.onCommitFiberRoot == "function")
        try {
            et.onCommitFiberRoot(
                Ji,
                e,
                void 0,
                (e.current.flags & 128) === 128,
            );
        } catch {}
}
var Ge = Math.clz32 ? Math.clz32 : Dh,
    Ph = Math.log,
    Ih = Math.LN2;
function Dh(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Ph(e) / Ih) | 0)) | 0;
}
var $r = 64,
    qr = 4194304;
function Kn(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e;
    }
}
function Ci(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        i = e.suspendedLanes,
        s = e.pingedLanes,
        o = n & 268435455;
    if (o !== 0) {
        var l = o & ~i;
        l !== 0 ? (r = Kn(l)) : ((s &= o), s !== 0 && (r = Kn(s)));
    } else (o = n & ~i), o !== 0 ? (r = Kn(o)) : s !== 0 && (r = Kn(s));
    if (r === 0) return 0;
    if (
        t !== 0 &&
        t !== r &&
        !(t & i) &&
        ((i = r & -r),
        (s = t & -t),
        i >= s || (i === 16 && (s & 4194240) !== 0))
    )
        return t;
    if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t; )
            (n = 31 - Ge(t)), (i = 1 << n), (r |= e[n]), (t &= ~i);
    return r;
}
function Ah(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1;
    }
}
function Lh(e, t) {
    for (
        var n = e.suspendedLanes,
            r = e.pingedLanes,
            i = e.expirationTimes,
            s = e.pendingLanes;
        0 < s;

    ) {
        var o = 31 - Ge(s),
            l = 1 << o,
            u = i[o];
        u === -1
            ? (!(l & n) || l & r) && (i[o] = Ah(l, t))
            : u <= t && (e.expiredLanes |= l),
            (s &= ~l);
    }
}
function po(e) {
    return (
        (e = e.pendingLanes & -1073741825),
        e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
}
function Cc() {
    var e = $r;
    return ($r <<= 1), !($r & 4194240) && ($r = 64), e;
}
function ks(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
}
function Pr(e, t, n) {
    (e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - Ge(t)),
        (e[t] = n);
}
function Fh(e, t) {
    var n = e.pendingLanes & ~t;
    (e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements);
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var i = 31 - Ge(n),
            s = 1 << i;
        (t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~s);
    }
}
function hl(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n; ) {
        var r = 31 - Ge(n),
            i = 1 << r;
        (i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i);
    }
}
var $ = 0;
function kc(e) {
    return (
        (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
    );
}
var Nc,
    pl,
    Tc,
    Oc,
    _c,
    mo = !1,
    Hr = [],
    kt = null,
    Nt = null,
    Tt = null,
    dr = new Map(),
    hr = new Map(),
    xt = [],
    jh =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
            " ",
        );
function gu(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            kt = null;
            break;
        case "dragenter":
        case "dragleave":
            Nt = null;
            break;
        case "mouseover":
        case "mouseout":
            Tt = null;
            break;
        case "pointerover":
        case "pointerout":
            dr.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            hr.delete(t.pointerId);
    }
}
function Vn(e, t, n, r, i, s) {
    return e === null || e.nativeEvent !== s
        ? ((e = {
              blockedOn: t,
              domEventName: n,
              eventSystemFlags: r,
              nativeEvent: s,
              targetContainers: [i],
          }),
          t !== null && ((t = Dr(t)), t !== null && pl(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
}
function Mh(e, t, n, r, i) {
    switch (t) {
        case "focusin":
            return (kt = Vn(kt, e, t, n, r, i)), !0;
        case "dragenter":
            return (Nt = Vn(Nt, e, t, n, r, i)), !0;
        case "mouseover":
            return (Tt = Vn(Tt, e, t, n, r, i)), !0;
        case "pointerover":
            var s = i.pointerId;
            return dr.set(s, Vn(dr.get(s) || null, e, t, n, r, i)), !0;
        case "gotpointercapture":
            return (
                (s = i.pointerId),
                hr.set(s, Vn(hr.get(s) || null, e, t, n, r, i)),
                !0
            );
    }
    return !1;
}
function Rc(e) {
    var t = Qt(e.target);
    if (t !== null) {
        var n = tn(t);
        if (n !== null) {
            if (((t = n.tag), t === 13)) {
                if (((t = yc(n)), t !== null)) {
                    (e.blockedOn = t),
                        _c(e.priority, function () {
                            Tc(n);
                        });
                    return;
                }
            } else if (
                t === 3 &&
                n.stateNode.current.memoizedState.isDehydrated
            ) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return;
            }
        }
    }
    e.blockedOn = null;
}
function si(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = vo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            (ao = r), n.target.dispatchEvent(r), (ao = null);
        } else return (t = Dr(n)), t !== null && pl(t), (e.blockedOn = n), !1;
        t.shift();
    }
    return !0;
}
function xu(e, t, n) {
    si(e) && n.delete(t);
}
function Uh() {
    (mo = !1),
        kt !== null && si(kt) && (kt = null),
        Nt !== null && si(Nt) && (Nt = null),
        Tt !== null && si(Tt) && (Tt = null),
        dr.forEach(xu),
        hr.forEach(xu);
}
function Qn(e, t) {
    e.blockedOn === t &&
        ((e.blockedOn = null),
        mo ||
            ((mo = !0),
            De.unstable_scheduleCallback(De.unstable_NormalPriority, Uh)));
}
function pr(e) {
    function t(i) {
        return Qn(i, e);
    }
    if (0 < Hr.length) {
        Qn(Hr[0], e);
        for (var n = 1; n < Hr.length; n++) {
            var r = Hr[n];
            r.blockedOn === e && (r.blockedOn = null);
        }
    }
    for (
        kt !== null && Qn(kt, e),
            Nt !== null && Qn(Nt, e),
            Tt !== null && Qn(Tt, e),
            dr.forEach(t),
            hr.forEach(t),
            n = 0;
        n < xt.length;
        n++
    )
        (r = xt[n]), r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < xt.length && ((n = xt[0]), n.blockedOn === null); )
        Rc(n), n.blockedOn === null && xt.shift();
}
var Cn = ft.ReactCurrentBatchConfig,
    ki = !0;
function zh(e, t, n, r) {
    var i = $,
        s = Cn.transition;
    Cn.transition = null;
    try {
        ($ = 1), ml(e, t, n, r);
    } finally {
        ($ = i), (Cn.transition = s);
    }
}
function Bh(e, t, n, r) {
    var i = $,
        s = Cn.transition;
    Cn.transition = null;
    try {
        ($ = 4), ml(e, t, n, r);
    } finally {
        ($ = i), (Cn.transition = s);
    }
}
function ml(e, t, n, r) {
    if (ki) {
        var i = vo(e, t, n, r);
        if (i === null) Ls(e, t, r, Ni, n), gu(e, r);
        else if (Mh(i, e, t, n, r)) r.stopPropagation();
        else if ((gu(e, r), t & 4 && -1 < jh.indexOf(e))) {
            for (; i !== null; ) {
                var s = Dr(i);
                if (
                    (s !== null && Nc(s),
                    (s = vo(e, t, n, r)),
                    s === null && Ls(e, t, r, Ni, n),
                    s === i)
                )
                    break;
                i = s;
            }
            i !== null && r.stopPropagation();
        } else Ls(e, t, r, null, n);
    }
}
var Ni = null;
function vo(e, t, n, r) {
    if (((Ni = null), (e = fl(r)), (e = Qt(e)), e !== null))
        if (((t = tn(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
            if (((e = yc(t)), e !== null)) return e;
            e = null;
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
        } else t !== e && (e = null);
    return (Ni = e), null;
}
function Pc(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (Oh()) {
                case dl:
                    return 1;
                case wc:
                    return 4;
                case Si:
                case _h:
                    return 16;
                case Sc:
                    return 536870912;
                default:
                    return 16;
            }
        default:
            return 16;
    }
}
var wt = null,
    vl = null,
    oi = null;
function Ic() {
    if (oi) return oi;
    var e,
        t = vl,
        n = t.length,
        r,
        i = "value" in wt ? wt.value : wt.textContent,
        s = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === i[s - r]; r++);
    return (oi = i.slice(e, 1 < r ? 1 - r : void 0));
}
function li(e) {
    var t = e.keyCode;
    return (
        "charCode" in e
            ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
            : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    );
}
function Wr() {
    return !0;
}
function Eu() {
    return !1;
}
function Le(e) {
    function t(n, r, i, s, o) {
        (this._reactName = n),
            (this._targetInst = i),
            (this.type = r),
            (this.nativeEvent = s),
            (this.target = o),
            (this.currentTarget = null);
        for (var l in e)
            e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(s) : s[l]));
        return (
            (this.isDefaultPrevented = (
                s.defaultPrevented != null
                    ? s.defaultPrevented
                    : s.returnValue === !1
            )
                ? Wr
                : Eu),
            (this.isPropagationStopped = Eu),
            this
        );
    }
    return (
        J(t.prototype, {
            preventDefault: function () {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n &&
                    (n.preventDefault
                        ? n.preventDefault()
                        : typeof n.returnValue != "unknown" &&
                          (n.returnValue = !1),
                    (this.isDefaultPrevented = Wr));
            },
            stopPropagation: function () {
                var n = this.nativeEvent;
                n &&
                    (n.stopPropagation
                        ? n.stopPropagation()
                        : typeof n.cancelBubble != "unknown" &&
                          (n.cancelBubble = !0),
                    (this.isPropagationStopped = Wr));
            },
            persist: function () {},
            isPersistent: Wr,
        }),
        t
    );
}
var Fn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
            return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
    },
    yl = Le(Fn),
    Ir = J({}, Fn, { view: 0, detail: 0 }),
    Vh = Le(Ir),
    Ns,
    Ts,
    $n,
    Zi = J({}, Ir, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: gl,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
            return e.relatedTarget === void 0
                ? e.fromElement === e.srcElement
                    ? e.toElement
                    : e.fromElement
                : e.relatedTarget;
        },
        movementX: function (e) {
            return "movementX" in e
                ? e.movementX
                : (e !== $n &&
                      ($n && e.type === "mousemove"
                          ? ((Ns = e.screenX - $n.screenX),
                            (Ts = e.screenY - $n.screenY))
                          : (Ts = Ns = 0),
                      ($n = e)),
                  Ns);
        },
        movementY: function (e) {
            return "movementY" in e ? e.movementY : Ts;
        },
    }),
    wu = Le(Zi),
    Qh = J({}, Zi, { dataTransfer: 0 }),
    $h = Le(Qh),
    qh = J({}, Ir, { relatedTarget: 0 }),
    Os = Le(qh),
    Hh = J({}, Fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Wh = Le(Hh),
    bh = J({}, Fn, {
        clipboardData: function (e) {
            return "clipboardData" in e
                ? e.clipboardData
                : window.clipboardData;
        },
    }),
    Gh = Le(bh),
    Kh = J({}, Fn, { data: 0 }),
    Su = Le(Kh),
    Yh = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
    },
    Xh = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
    },
    Jh = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
    };
function Zh(e) {
    var t = this.nativeEvent;
    return t.getModifierState
        ? t.getModifierState(e)
        : (e = Jh[e])
        ? !!t[e]
        : !1;
}
function gl() {
    return Zh;
}
var ep = J({}, Ir, {
        key: function (e) {
            if (e.key) {
                var t = Yh[e.key] || e.key;
                if (t !== "Unidentified") return t;
            }
            return e.type === "keypress"
                ? ((e = li(e)), e === 13 ? "Enter" : String.fromCharCode(e))
                : e.type === "keydown" || e.type === "keyup"
                ? Xh[e.keyCode] || "Unidentified"
                : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: gl,
        charCode: function (e) {
            return e.type === "keypress" ? li(e) : 0;
        },
        keyCode: function (e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
        },
        which: function (e) {
            return e.type === "keypress"
                ? li(e)
                : e.type === "keydown" || e.type === "keyup"
                ? e.keyCode
                : 0;
        },
    }),
    tp = Le(ep),
    np = J({}, Zi, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
    }),
    Cu = Le(np),
    rp = J({}, Ir, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: gl,
    }),
    ip = Le(rp),
    sp = J({}, Fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    op = Le(sp),
    lp = J({}, Zi, {
        deltaX: function (e) {
            return "deltaX" in e
                ? e.deltaX
                : "wheelDeltaX" in e
                ? -e.wheelDeltaX
                : 0;
        },
        deltaY: function (e) {
            return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                ? -e.wheelDeltaY
                : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
    }),
    up = Le(lp),
    ap = [9, 13, 27, 32],
    xl = lt && "CompositionEvent" in window,
    tr = null;
lt && "documentMode" in document && (tr = document.documentMode);
var cp = lt && "TextEvent" in window && !tr,
    Dc = lt && (!xl || (tr && 8 < tr && 11 >= tr)),
    ku = String.fromCharCode(32),
    Nu = !1;
function Ac(e, t) {
    switch (e) {
        case "keyup":
            return ap.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1;
    }
}
function Lc(e) {
    return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var an = !1;
function fp(e, t) {
    switch (e) {
        case "compositionend":
            return Lc(t);
        case "keypress":
            return t.which !== 32 ? null : ((Nu = !0), ku);
        case "textInput":
            return (e = t.data), e === ku && Nu ? null : e;
        default:
            return null;
    }
}
function dp(e, t) {
    if (an)
        return e === "compositionend" || (!xl && Ac(e, t))
            ? ((e = Ic()), (oi = vl = wt = null), (an = !1), e)
            : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (
                !(t.ctrlKey || t.altKey || t.metaKey) ||
                (t.ctrlKey && t.altKey)
            ) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which);
            }
            return null;
        case "compositionend":
            return Dc && t.locale !== "ko" ? null : t.data;
        default:
            return null;
    }
}
var hp = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
};
function Tu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!hp[e.type] : t === "textarea";
}
function Fc(e, t, n, r) {
    dc(r),
        (t = Ti(t, "onChange")),
        0 < t.length &&
            ((n = new yl("onChange", "change", null, n, r)),
            e.push({ event: n, listeners: t }));
}
var nr = null,
    mr = null;
function pp(e) {
    Wc(e, 0);
}
function es(e) {
    var t = dn(e);
    if (sc(t)) return e;
}
function mp(e, t) {
    if (e === "change") return t;
}
var jc = !1;
if (lt) {
    var _s;
    if (lt) {
        var Rs = "oninput" in document;
        if (!Rs) {
            var Ou = document.createElement("div");
            Ou.setAttribute("oninput", "return;"),
                (Rs = typeof Ou.oninput == "function");
        }
        _s = Rs;
    } else _s = !1;
    jc = _s && (!document.documentMode || 9 < document.documentMode);
}
function _u() {
    nr && (nr.detachEvent("onpropertychange", Mc), (mr = nr = null));
}
function Mc(e) {
    if (e.propertyName === "value" && es(mr)) {
        var t = [];
        Fc(t, mr, e, fl(e)), vc(pp, t);
    }
}
function vp(e, t, n) {
    e === "focusin"
        ? (_u(), (nr = t), (mr = n), nr.attachEvent("onpropertychange", Mc))
        : e === "focusout" && _u();
}
function yp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return es(mr);
}
function gp(e, t) {
    if (e === "click") return es(t);
}
function xp(e, t) {
    if (e === "input" || e === "change") return es(t);
}
function Ep(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Ye = typeof Object.is == "function" ? Object.is : Ep;
function vr(e, t) {
    if (Ye(e, t)) return !0;
    if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
    )
        return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!Xs.call(t, i) || !Ye(e[i], t[i])) return !1;
    }
    return !0;
}
function Ru(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
}
function Pu(e, t) {
    var n = Ru(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (((r = e + n.textContent.length), e <= t && r >= t))
                return { node: n, offset: t - e };
            e = r;
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e;
                }
                n = n.parentNode;
            }
            n = void 0;
        }
        n = Ru(n);
    }
}
function Uc(e, t) {
    return e && t
        ? e === t
            ? !0
            : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
            ? Uc(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
            ? !!(e.compareDocumentPosition(t) & 16)
            : !1
        : !1;
}
function zc() {
    for (var e = window, t = xi(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string";
        } catch {
            n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = xi(e.document);
    }
    return t;
}
function El(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
        t &&
        ((t === "input" &&
            (e.type === "text" ||
                e.type === "search" ||
                e.type === "tel" ||
                e.type === "url" ||
                e.type === "password")) ||
            t === "textarea" ||
            e.contentEditable === "true")
    );
}
function wp(e) {
    var t = zc(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (
        t !== n &&
        n &&
        n.ownerDocument &&
        Uc(n.ownerDocument.documentElement, n)
    ) {
        if (r !== null && El(n)) {
            if (
                ((t = r.start),
                (e = r.end),
                e === void 0 && (e = t),
                "selectionStart" in n)
            )
                (n.selectionStart = t),
                    (n.selectionEnd = Math.min(e, n.value.length));
            else if (
                ((e =
                    ((t = n.ownerDocument || document) && t.defaultView) ||
                    window),
                e.getSelection)
            ) {
                e = e.getSelection();
                var i = n.textContent.length,
                    s = Math.min(r.start, i);
                (r = r.end === void 0 ? s : Math.min(r.end, i)),
                    !e.extend && s > r && ((i = r), (r = s), (s = i)),
                    (i = Pu(n, s));
                var o = Pu(n, r);
                i &&
                    o &&
                    (e.rangeCount !== 1 ||
                        e.anchorNode !== i.node ||
                        e.anchorOffset !== i.offset ||
                        e.focusNode !== o.node ||
                        e.focusOffset !== o.offset) &&
                    ((t = t.createRange()),
                    t.setStart(i.node, i.offset),
                    e.removeAllRanges(),
                    s > r
                        ? (e.addRange(t), e.extend(o.node, o.offset))
                        : (t.setEnd(o.node, o.offset), e.addRange(t)));
            }
        }
        for (t = [], e = n; (e = e.parentNode); )
            e.nodeType === 1 &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
        for (
            typeof n.focus == "function" && n.focus(), n = 0;
            n < t.length;
            n++
        )
            (e = t[n]),
                (e.element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
    }
}
var Sp = lt && "documentMode" in document && 11 >= document.documentMode,
    cn = null,
    yo = null,
    rr = null,
    go = !1;
function Iu(e, t, n) {
    var r =
        n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    go ||
        cn == null ||
        cn !== xi(r) ||
        ((r = cn),
        "selectionStart" in r && El(r)
            ? (r = { start: r.selectionStart, end: r.selectionEnd })
            : ((r = (
                  (r.ownerDocument && r.ownerDocument.defaultView) ||
                  window
              ).getSelection()),
              (r = {
                  anchorNode: r.anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
              })),
        (rr && vr(rr, r)) ||
            ((rr = r),
            (r = Ti(yo, "onSelect")),
            0 < r.length &&
                ((t = new yl("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = cn))));
}
function br(e, t) {
    var n = {};
    return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
    );
}
var fn = {
        animationend: br("Animation", "AnimationEnd"),
        animationiteration: br("Animation", "AnimationIteration"),
        animationstart: br("Animation", "AnimationStart"),
        transitionend: br("Transition", "TransitionEnd"),
    },
    Ps = {},
    Bc = {};
lt &&
    ((Bc = document.createElement("div").style),
    "AnimationEvent" in window ||
        (delete fn.animationend.animation,
        delete fn.animationiteration.animation,
        delete fn.animationstart.animation),
    "TransitionEvent" in window || delete fn.transitionend.transition);
function ts(e) {
    if (Ps[e]) return Ps[e];
    if (!fn[e]) return e;
    var t = fn[e],
        n;
    for (n in t) if (t.hasOwnProperty(n) && n in Bc) return (Ps[e] = t[n]);
    return e;
}
var Vc = ts("animationend"),
    Qc = ts("animationiteration"),
    $c = ts("animationstart"),
    qc = ts("transitionend"),
    Hc = new Map(),
    Du =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
            " ",
        );
function Ft(e, t) {
    Hc.set(e, t), en(t, [e]);
}
for (var Is = 0; Is < Du.length; Is++) {
    var Ds = Du[Is],
        Cp = Ds.toLowerCase(),
        kp = Ds[0].toUpperCase() + Ds.slice(1);
    Ft(Cp, "on" + kp);
}
Ft(Vc, "onAnimationEnd");
Ft(Qc, "onAnimationIteration");
Ft($c, "onAnimationStart");
Ft("dblclick", "onDoubleClick");
Ft("focusin", "onFocus");
Ft("focusout", "onBlur");
Ft(qc, "onTransitionEnd");
Tn("onMouseEnter", ["mouseout", "mouseover"]);
Tn("onMouseLeave", ["mouseout", "mouseover"]);
Tn("onPointerEnter", ["pointerout", "pointerover"]);
Tn("onPointerLeave", ["pointerout", "pointerover"]);
en(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
    ),
);
en(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
    ),
);
en("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
en(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
en(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
en(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Yn =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
            " ",
        ),
    Np = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(Yn),
    );
function Au(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = n), Ch(r, t, void 0, e), (e.currentTarget = null);
}
function Wc(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            i = r.event;
        r = r.listeners;
        e: {
            var s = void 0;
            if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                    var l = r[o],
                        u = l.instance,
                        a = l.currentTarget;
                    if (((l = l.listener), u !== s && i.isPropagationStopped()))
                        break e;
                    Au(i, l, a), (s = u);
                }
            else
                for (o = 0; o < r.length; o++) {
                    if (
                        ((l = r[o]),
                        (u = l.instance),
                        (a = l.currentTarget),
                        (l = l.listener),
                        u !== s && i.isPropagationStopped())
                    )
                        break e;
                    Au(i, l, a), (s = u);
                }
        }
    }
    if (wi) throw ((e = ho), (wi = !1), (ho = null), e);
}
function b(e, t) {
    var n = t[Co];
    n === void 0 && (n = t[Co] = new Set());
    var r = e + "__bubble";
    n.has(r) || (bc(t, e, 2, !1), n.add(r));
}
function As(e, t, n) {
    var r = 0;
    t && (r |= 4), bc(n, e, r, t);
}
var Gr = "_reactListening" + Math.random().toString(36).slice(2);
function yr(e) {
    if (!e[Gr]) {
        (e[Gr] = !0),
            ec.forEach(function (n) {
                n !== "selectionchange" &&
                    (Np.has(n) || As(n, !1, e), As(n, !0, e));
            });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Gr] || ((t[Gr] = !0), As("selectionchange", !1, t));
    }
}
function bc(e, t, n, r) {
    switch (Pc(t)) {
        case 1:
            var i = zh;
            break;
        case 4:
            i = Bh;
            break;
        default:
            i = ml;
    }
    (n = i.bind(null, t, n, e)),
        (i = void 0),
        !fo ||
            (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
            (i = !0),
        r
            ? i !== void 0
                ? e.addEventListener(t, n, { capture: !0, passive: i })
                : e.addEventListener(t, n, !0)
            : i !== void 0
            ? e.addEventListener(t, n, { passive: i })
            : e.addEventListener(t, n, !1);
}
function Ls(e, t, n, r, i) {
    var s = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (;;) {
            if (r === null) return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var l = r.stateNode.containerInfo;
                if (l === i || (l.nodeType === 8 && l.parentNode === i)) break;
                if (o === 4)
                    for (o = r.return; o !== null; ) {
                        var u = o.tag;
                        if (
                            (u === 3 || u === 4) &&
                            ((u = o.stateNode.containerInfo),
                            u === i || (u.nodeType === 8 && u.parentNode === i))
                        )
                            return;
                        o = o.return;
                    }
                for (; l !== null; ) {
                    if (((o = Qt(l)), o === null)) return;
                    if (((u = o.tag), u === 5 || u === 6)) {
                        r = s = o;
                        continue e;
                    }
                    l = l.parentNode;
                }
            }
            r = r.return;
        }
    vc(function () {
        var a = s,
            c = fl(n),
            h = [];
        e: {
            var m = Hc.get(e);
            if (m !== void 0) {
                var y = yl,
                    v = e;
                switch (e) {
                    case "keypress":
                        if (li(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        y = tp;
                        break;
                    case "focusin":
                        (v = "focus"), (y = Os);
                        break;
                    case "focusout":
                        (v = "blur"), (y = Os);
                        break;
                    case "beforeblur":
                    case "afterblur":
                        y = Os;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        y = wu;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        y = $h;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        y = ip;
                        break;
                    case Vc:
                    case Qc:
                    case $c:
                        y = Wh;
                        break;
                    case qc:
                        y = op;
                        break;
                    case "scroll":
                        y = Vh;
                        break;
                    case "wheel":
                        y = up;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        y = Gh;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        y = Cu;
                }
                var g = (t & 4) !== 0,
                    C = !g && e === "scroll",
                    d = g ? (m !== null ? m + "Capture" : null) : m;
                g = [];
                for (var f = a, p; f !== null; ) {
                    p = f;
                    var E = p.stateNode;
                    if (
                        (p.tag === 5 &&
                            E !== null &&
                            ((p = E),
                            d !== null &&
                                ((E = fr(f, d)),
                                E != null && g.push(gr(f, E, p)))),
                        C)
                    )
                        break;
                    f = f.return;
                }
                0 < g.length &&
                    ((m = new y(m, v, null, n, c)),
                    h.push({ event: m, listeners: g }));
            }
        }
        if (!(t & 7)) {
            e: {
                if (
                    ((m = e === "mouseover" || e === "pointerover"),
                    (y = e === "mouseout" || e === "pointerout"),
                    m &&
                        n !== ao &&
                        (v = n.relatedTarget || n.fromElement) &&
                        (Qt(v) || v[ut]))
                )
                    break e;
                if (
                    (y || m) &&
                    ((m =
                        c.window === c
                            ? c
                            : (m = c.ownerDocument)
                            ? m.defaultView || m.parentWindow
                            : window),
                    y
                        ? ((v = n.relatedTarget || n.toElement),
                          (y = a),
                          (v = v ? Qt(v) : null),
                          v !== null &&
                              ((C = tn(v)),
                              v !== C || (v.tag !== 5 && v.tag !== 6)) &&
                              (v = null))
                        : ((y = null), (v = a)),
                    y !== v)
                ) {
                    if (
                        ((g = wu),
                        (E = "onMouseLeave"),
                        (d = "onMouseEnter"),
                        (f = "mouse"),
                        (e === "pointerout" || e === "pointerover") &&
                            ((g = Cu),
                            (E = "onPointerLeave"),
                            (d = "onPointerEnter"),
                            (f = "pointer")),
                        (C = y == null ? m : dn(y)),
                        (p = v == null ? m : dn(v)),
                        (m = new g(E, f + "leave", y, n, c)),
                        (m.target = C),
                        (m.relatedTarget = p),
                        (E = null),
                        Qt(c) === a &&
                            ((g = new g(d, f + "enter", v, n, c)),
                            (g.target = p),
                            (g.relatedTarget = C),
                            (E = g)),
                        (C = E),
                        y && v)
                    )
                        t: {
                            for (g = y, d = v, f = 0, p = g; p; p = rn(p)) f++;
                            for (p = 0, E = d; E; E = rn(E)) p++;
                            for (; 0 < f - p; ) (g = rn(g)), f--;
                            for (; 0 < p - f; ) (d = rn(d)), p--;
                            for (; f--; ) {
                                if (
                                    g === d ||
                                    (d !== null && g === d.alternate)
                                )
                                    break t;
                                (g = rn(g)), (d = rn(d));
                            }
                            g = null;
                        }
                    else g = null;
                    y !== null && Lu(h, m, y, g, !1),
                        v !== null && C !== null && Lu(h, C, v, g, !0);
                }
            }
            e: {
                if (
                    ((m = a ? dn(a) : window),
                    (y = m.nodeName && m.nodeName.toLowerCase()),
                    y === "select" || (y === "input" && m.type === "file"))
                )
                    var _ = mp;
                else if (Tu(m))
                    if (jc) _ = xp;
                    else {
                        _ = yp;
                        var T = vp;
                    }
                else
                    (y = m.nodeName) &&
                        y.toLowerCase() === "input" &&
                        (m.type === "checkbox" || m.type === "radio") &&
                        (_ = gp);
                if (_ && (_ = _(e, a))) {
                    Fc(h, _, n, c);
                    break e;
                }
                T && T(e, m, a),
                    e === "focusout" &&
                        (T = m._wrapperState) &&
                        T.controlled &&
                        m.type === "number" &&
                        io(m, "number", m.value);
            }
            switch (((T = a ? dn(a) : window), e)) {
                case "focusin":
                    (Tu(T) || T.contentEditable === "true") &&
                        ((cn = T), (yo = a), (rr = null));
                    break;
                case "focusout":
                    rr = yo = cn = null;
                    break;
                case "mousedown":
                    go = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    (go = !1), Iu(h, n, c);
                    break;
                case "selectionchange":
                    if (Sp) break;
                case "keydown":
                case "keyup":
                    Iu(h, n, c);
            }
            var N;
            if (xl)
                e: {
                    switch (e) {
                        case "compositionstart":
                            var k = "onCompositionStart";
                            break e;
                        case "compositionend":
                            k = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            k = "onCompositionUpdate";
                            break e;
                    }
                    k = void 0;
                }
            else
                an
                    ? Ac(e, n) && (k = "onCompositionEnd")
                    : e === "keydown" &&
                      n.keyCode === 229 &&
                      (k = "onCompositionStart");
            k &&
                (Dc &&
                    n.locale !== "ko" &&
                    (an || k !== "onCompositionStart"
                        ? k === "onCompositionEnd" && an && (N = Ic())
                        : ((wt = c),
                          (vl = "value" in wt ? wt.value : wt.textContent),
                          (an = !0))),
                (T = Ti(a, k)),
                0 < T.length &&
                    ((k = new Su(k, e, null, n, c)),
                    h.push({ event: k, listeners: T }),
                    N
                        ? (k.data = N)
                        : ((N = Lc(n)), N !== null && (k.data = N)))),
                (N = cp ? fp(e, n) : dp(e, n)) &&
                    ((a = Ti(a, "onBeforeInput")),
                    0 < a.length &&
                        ((c = new Su(
                            "onBeforeInput",
                            "beforeinput",
                            null,
                            n,
                            c,
                        )),
                        h.push({ event: c, listeners: a }),
                        (c.data = N)));
        }
        Wc(h, t);
    });
}
function gr(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
}
function Ti(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var i = e,
            s = i.stateNode;
        i.tag === 5 &&
            s !== null &&
            ((i = s),
            (s = fr(e, n)),
            s != null && r.unshift(gr(e, s, i)),
            (s = fr(e, t)),
            s != null && r.push(gr(e, s, i))),
            (e = e.return);
    }
    return r;
}
function rn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
}
function Lu(e, t, n, r, i) {
    for (var s = t._reactName, o = []; n !== null && n !== r; ) {
        var l = n,
            u = l.alternate,
            a = l.stateNode;
        if (u !== null && u === r) break;
        l.tag === 5 &&
            a !== null &&
            ((l = a),
            i
                ? ((u = fr(n, s)), u != null && o.unshift(gr(n, u, l)))
                : i || ((u = fr(n, s)), u != null && o.push(gr(n, u, l)))),
            (n = n.return);
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
}
var Tp = /\r\n?/g,
    Op = /\u0000|\uFFFD/g;
function Fu(e) {
    return (typeof e == "string" ? e : "" + e)
        .replace(
            Tp,
            `
`,
        )
        .replace(Op, "");
}
function Kr(e, t, n) {
    if (((t = Fu(t)), Fu(e) !== t && n)) throw Error(O(425));
}
function Oi() {}
var xo = null,
    Eo = null;
function wo(e, t) {
    return (
        e === "textarea" ||
        e === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
            t.dangerouslySetInnerHTML !== null &&
            t.dangerouslySetInnerHTML.__html != null)
    );
}
var So = typeof setTimeout == "function" ? setTimeout : void 0,
    _p = typeof clearTimeout == "function" ? clearTimeout : void 0,
    ju = typeof Promise == "function" ? Promise : void 0,
    Rp =
        typeof queueMicrotask == "function"
            ? queueMicrotask
            : typeof ju < "u"
            ? function (e) {
                  return ju.resolve(null).then(e).catch(Pp);
              }
            : So;
function Pp(e) {
    setTimeout(function () {
        throw e;
    });
}
function Fs(e, t) {
    var n = t,
        r = 0;
    do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8))
            if (((n = i.data), n === "/$")) {
                if (r === 0) {
                    e.removeChild(i), pr(t);
                    return;
                }
                r--;
            } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
        n = i;
    } while (n);
    pr(t);
}
function Ot(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
            if (t === "/$") return null;
        }
    }
    return e;
}
function Mu(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--;
            } else n === "/$" && t++;
        }
        e = e.previousSibling;
    }
    return null;
}
var jn = Math.random().toString(36).slice(2),
    Ze = "__reactFiber$" + jn,
    xr = "__reactProps$" + jn,
    ut = "__reactContainer$" + jn,
    Co = "__reactEvents$" + jn,
    Ip = "__reactListeners$" + jn,
    Dp = "__reactHandles$" + jn;
function Qt(e) {
    var t = e[Ze];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
        if ((t = n[ut] || n[Ze])) {
            if (
                ((n = t.alternate),
                t.child !== null || (n !== null && n.child !== null))
            )
                for (e = Mu(e); e !== null; ) {
                    if ((n = e[Ze])) return n;
                    e = Mu(e);
                }
            return t;
        }
        (e = n), (n = e.parentNode);
    }
    return null;
}
function Dr(e) {
    return (
        (e = e[Ze] || e[ut]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
            ? null
            : e
    );
}
function dn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(O(33));
}
function ns(e) {
    return e[xr] || null;
}
var ko = [],
    hn = -1;
function jt(e) {
    return { current: e };
}
function G(e) {
    0 > hn || ((e.current = ko[hn]), (ko[hn] = null), hn--);
}
function W(e, t) {
    hn++, (ko[hn] = e.current), (e.current = t);
}
var Lt = {},
    ge = jt(Lt),
    Ne = jt(!1),
    Gt = Lt;
function On(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Lt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
        s;
    for (s in n) i[s] = t[s];
    return (
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = t),
            (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
    );
}
function Te(e) {
    return (e = e.childContextTypes), e != null;
}
function _i() {
    G(Ne), G(ge);
}
function Uu(e, t, n) {
    if (ge.current !== Lt) throw Error(O(168));
    W(ge, t), W(Ne, n);
}
function Gc(e, t, n) {
    var r = e.stateNode;
    if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
        return n;
    r = r.getChildContext();
    for (var i in r) if (!(i in t)) throw Error(O(108, vh(e) || "Unknown", i));
    return J({}, n, r);
}
function Ri(e) {
    return (
        (e =
            ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
            Lt),
        (Gt = ge.current),
        W(ge, e),
        W(Ne, Ne.current),
        !0
    );
}
function zu(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(O(169));
    n
        ? ((e = Gc(e, t, Gt)),
          (r.__reactInternalMemoizedMergedChildContext = e),
          G(Ne),
          G(ge),
          W(ge, e))
        : G(Ne),
        W(Ne, n);
}
var rt = null,
    rs = !1,
    js = !1;
function Kc(e) {
    rt === null ? (rt = [e]) : rt.push(e);
}
function Ap(e) {
    (rs = !0), Kc(e);
}
function Mt() {
    if (!js && rt !== null) {
        js = !0;
        var e = 0,
            t = $;
        try {
            var n = rt;
            for ($ = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0);
                while (r !== null);
            }
            (rt = null), (rs = !1);
        } catch (i) {
            throw (rt !== null && (rt = rt.slice(e + 1)), Ec(dl, Mt), i);
        } finally {
            ($ = t), (js = !1);
        }
    }
    return null;
}
var pn = [],
    mn = 0,
    Pi = null,
    Ii = 0,
    je = [],
    Me = 0,
    Kt = null,
    it = 1,
    st = "";
function Bt(e, t) {
    (pn[mn++] = Ii), (pn[mn++] = Pi), (Pi = e), (Ii = t);
}
function Yc(e, t, n) {
    (je[Me++] = it), (je[Me++] = st), (je[Me++] = Kt), (Kt = e);
    var r = it;
    e = st;
    var i = 32 - Ge(r) - 1;
    (r &= ~(1 << i)), (n += 1);
    var s = 32 - Ge(t) + i;
    if (30 < s) {
        var o = i - (i % 5);
        (s = (r & ((1 << o) - 1)).toString(32)),
            (r >>= o),
            (i -= o),
            (it = (1 << (32 - Ge(t) + i)) | (n << i) | r),
            (st = s + e);
    } else (it = (1 << s) | (n << i) | r), (st = e);
}
function wl(e) {
    e.return !== null && (Bt(e, 1), Yc(e, 1, 0));
}
function Sl(e) {
    for (; e === Pi; )
        (Pi = pn[--mn]), (pn[mn] = null), (Ii = pn[--mn]), (pn[mn] = null);
    for (; e === Kt; )
        (Kt = je[--Me]),
            (je[Me] = null),
            (st = je[--Me]),
            (je[Me] = null),
            (it = je[--Me]),
            (je[Me] = null);
}
var Ie = null,
    Pe = null,
    K = !1,
    be = null;
function Xc(e, t) {
    var n = Ue(5, null, null, 0);
    (n.elementType = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Bu(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return (
                (t =
                    t.nodeType !== 1 ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                        ? null
                        : t),
                t !== null
                    ? ((e.stateNode = t), (Ie = e), (Pe = Ot(t.firstChild)), !0)
                    : !1
            );
        case 6:
            return (
                (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
                t !== null ? ((e.stateNode = t), (Ie = e), (Pe = null), !0) : !1
            );
        case 13:
            return (
                (t = t.nodeType !== 8 ? null : t),
                t !== null
                    ? ((n = Kt !== null ? { id: it, overflow: st } : null),
                      (e.memoizedState = {
                          dehydrated: t,
                          treeContext: n,
                          retryLane: 1073741824,
                      }),
                      (n = Ue(18, null, null, 0)),
                      (n.stateNode = t),
                      (n.return = e),
                      (e.child = n),
                      (Ie = e),
                      (Pe = null),
                      !0)
                    : !1
            );
        default:
            return !1;
    }
}
function No(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function To(e) {
    if (K) {
        var t = Pe;
        if (t) {
            var n = t;
            if (!Bu(e, t)) {
                if (No(e)) throw Error(O(418));
                t = Ot(n.nextSibling);
                var r = Ie;
                t && Bu(e, t)
                    ? Xc(r, n)
                    : ((e.flags = (e.flags & -4097) | 2), (K = !1), (Ie = e));
            }
        } else {
            if (No(e)) throw Error(O(418));
            (e.flags = (e.flags & -4097) | 2), (K = !1), (Ie = e);
        }
    }
}
function Vu(e) {
    for (
        e = e.return;
        e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

    )
        e = e.return;
    Ie = e;
}
function Yr(e) {
    if (e !== Ie) return !1;
    if (!K) return Vu(e), (K = !0), !1;
    var t;
    if (
        ((t = e.tag !== 3) &&
            !(t = e.tag !== 5) &&
            ((t = e.type),
            (t = t !== "head" && t !== "body" && !wo(e.type, e.memoizedProps))),
        t && (t = Pe))
    ) {
        if (No(e)) throw (Jc(), Error(O(418)));
        for (; t; ) Xc(e, t), (t = Ot(t.nextSibling));
    }
    if ((Vu(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
            throw Error(O(317));
        e: {
            for (e = e.nextSibling, t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Pe = Ot(e.nextSibling);
                            break e;
                        }
                        t--;
                    } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
                }
                e = e.nextSibling;
            }
            Pe = null;
        }
    } else Pe = Ie ? Ot(e.stateNode.nextSibling) : null;
    return !0;
}
function Jc() {
    for (var e = Pe; e; ) e = Ot(e.nextSibling);
}
function _n() {
    (Pe = Ie = null), (K = !1);
}
function Cl(e) {
    be === null ? (be = [e]) : be.push(e);
}
var Lp = ft.ReactCurrentBatchConfig;
function He(e, t) {
    if (e && e.defaultProps) {
        (t = J({}, t)), (e = e.defaultProps);
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t;
    }
    return t;
}
var Di = jt(null),
    Ai = null,
    vn = null,
    kl = null;
function Nl() {
    kl = vn = Ai = null;
}
function Tl(e) {
    var t = Di.current;
    G(Di), (e._currentValue = t);
}
function Oo(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if (
            ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
                : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
            e === n)
        )
            break;
        e = e.return;
    }
}
function kn(e, t) {
    (Ai = e),
        (kl = vn = null),
        (e = e.dependencies),
        e !== null &&
            e.firstContext !== null &&
            (e.lanes & t && (ke = !0), (e.firstContext = null));
}
function Be(e) {
    var t = e._currentValue;
    if (kl !== e)
        if (((e = { context: e, memoizedValue: t, next: null }), vn === null)) {
            if (Ai === null) throw Error(O(308));
            (vn = e), (Ai.dependencies = { lanes: 0, firstContext: e });
        } else vn = vn.next = e;
    return t;
}
var $t = null;
function Ol(e) {
    $t === null ? ($t = [e]) : $t.push(e);
}
function Zc(e, t, n, r) {
    var i = t.interleaved;
    return (
        i === null ? ((n.next = n), Ol(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        at(e, r)
    );
}
function at(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
        (e.childLanes |= t),
            (n = e.alternate),
            n !== null && (n.childLanes |= t),
            (n = e),
            (e = e.return);
    return n.tag === 3 ? n.stateNode : null;
}
var yt = !1;
function _l(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
    };
}
function ef(e, t) {
    (e = e.updateQueue),
        t.updateQueue === e &&
            (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
            });
}
function ot(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
    };
}
function _t(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (((r = r.shared), Q & 2)) {
        var i = r.pending;
        return (
            i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
            (r.pending = t),
            at(e, n)
        );
    }
    return (
        (i = r.interleaved),
        i === null ? ((t.next = t), Ol(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        at(e, n)
    );
}
function ui(e, t, n) {
    if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (n & 4194240) !== 0))
    ) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), hl(e, n);
    }
}
function Qu(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
            s = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null,
                };
                s === null ? (i = s = o) : (s = s.next = o), (n = n.next);
            } while (n !== null);
            s === null ? (i = s = t) : (s = s.next = t);
        } else i = s = t;
        (n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: s,
            shared: r.shared,
            effects: r.effects,
        }),
            (e.updateQueue = n);
        return;
    }
    (e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t);
}
function Li(e, t, n, r) {
    var i = e.updateQueue;
    yt = !1;
    var s = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        l = i.shared.pending;
    if (l !== null) {
        i.shared.pending = null;
        var u = l,
            a = u.next;
        (u.next = null), o === null ? (s = a) : (o.next = a), (o = u);
        var c = e.alternate;
        c !== null &&
            ((c = c.updateQueue),
            (l = c.lastBaseUpdate),
            l !== o &&
                (l === null ? (c.firstBaseUpdate = a) : (l.next = a),
                (c.lastBaseUpdate = u)));
    }
    if (s !== null) {
        var h = i.baseState;
        (o = 0), (c = a = u = null), (l = s);
        do {
            var m = l.lane,
                y = l.eventTime;
            if ((r & m) === m) {
                c !== null &&
                    (c = c.next =
                        {
                            eventTime: y,
                            lane: 0,
                            tag: l.tag,
                            payload: l.payload,
                            callback: l.callback,
                            next: null,
                        });
                e: {
                    var v = e,
                        g = l;
                    switch (((m = t), (y = n), g.tag)) {
                        case 1:
                            if (((v = g.payload), typeof v == "function")) {
                                h = v.call(y, h, m);
                                break e;
                            }
                            h = v;
                            break e;
                        case 3:
                            v.flags = (v.flags & -65537) | 128;
                        case 0:
                            if (
                                ((v = g.payload),
                                (m =
                                    typeof v == "function"
                                        ? v.call(y, h, m)
                                        : v),
                                m == null)
                            )
                                break e;
                            h = J({}, h, m);
                            break e;
                        case 2:
                            yt = !0;
                    }
                }
                l.callback !== null &&
                    l.lane !== 0 &&
                    ((e.flags |= 64),
                    (m = i.effects),
                    m === null ? (i.effects = [l]) : m.push(l));
            } else
                (y = {
                    eventTime: y,
                    lane: m,
                    tag: l.tag,
                    payload: l.payload,
                    callback: l.callback,
                    next: null,
                }),
                    c === null ? ((a = c = y), (u = h)) : (c = c.next = y),
                    (o |= m);
            if (((l = l.next), l === null)) {
                if (((l = i.shared.pending), l === null)) break;
                (m = l),
                    (l = m.next),
                    (m.next = null),
                    (i.lastBaseUpdate = m),
                    (i.shared.pending = null);
            }
        } while (1);
        if (
            (c === null && (u = h),
            (i.baseState = u),
            (i.firstBaseUpdate = a),
            (i.lastBaseUpdate = c),
            (t = i.shared.interleaved),
            t !== null)
        ) {
            i = t;
            do (o |= i.lane), (i = i.next);
            while (i !== t);
        } else s === null && (i.shared.lanes = 0);
        (Xt |= o), (e.lanes = o), (e.memoizedState = h);
    }
}
function $u(e, t, n) {
    if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.callback;
            if (i !== null) {
                if (((r.callback = null), (r = n), typeof i != "function"))
                    throw Error(O(191, i));
                i.call(r);
            }
        }
}
var tf = new Za.Component().refs;
function _o(e, t, n, r) {
    (t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : J({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n);
}
var is = {
    isMounted: function (e) {
        return (e = e._reactInternals) ? tn(e) === e : !1;
    },
    enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = Ee(),
            i = Pt(e),
            s = ot(r, i);
        (s.payload = t),
            n != null && (s.callback = n),
            (t = _t(e, s, i)),
            t !== null && (Ke(t, e, i, r), ui(t, e, i));
    },
    enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = Ee(),
            i = Pt(e),
            s = ot(r, i);
        (s.tag = 1),
            (s.payload = t),
            n != null && (s.callback = n),
            (t = _t(e, s, i)),
            t !== null && (Ke(t, e, i, r), ui(t, e, i));
    },
    enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = Ee(),
            r = Pt(e),
            i = ot(n, r);
        (i.tag = 2),
            t != null && (i.callback = t),
            (t = _t(e, i, r)),
            t !== null && (Ke(t, e, r, n), ui(t, e, r));
    },
};
function qu(e, t, n, r, i, s, o) {
    return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == "function"
            ? e.shouldComponentUpdate(r, s, o)
            : t.prototype && t.prototype.isPureReactComponent
            ? !vr(n, r) || !vr(i, s)
            : !0
    );
}
function nf(e, t, n) {
    var r = !1,
        i = Lt,
        s = t.contextType;
    return (
        typeof s == "object" && s !== null
            ? (s = Be(s))
            : ((i = Te(t) ? Gt : ge.current),
              (r = t.contextTypes),
              (s = (r = r != null) ? On(e, i) : Lt)),
        (t = new t(n, s)),
        (e.memoizedState =
            t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = is),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
            ((e = e.stateNode),
            (e.__reactInternalMemoizedUnmaskedChildContext = i),
            (e.__reactInternalMemoizedMaskedChildContext = s)),
        t
    );
}
function Hu(e, t, n, r) {
    (e = t.state),
        typeof t.componentWillReceiveProps == "function" &&
            t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
            t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && is.enqueueReplaceState(t, t.state, null);
}
function Ro(e, t, n, r) {
    var i = e.stateNode;
    (i.props = n), (i.state = e.memoizedState), (i.refs = tf), _l(e);
    var s = t.contextType;
    typeof s == "object" && s !== null
        ? (i.context = Be(s))
        : ((s = Te(t) ? Gt : ge.current), (i.context = On(e, s))),
        (i.state = e.memoizedState),
        (s = t.getDerivedStateFromProps),
        typeof s == "function" && (_o(e, t, s, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == "function" ||
            typeof i.getSnapshotBeforeUpdate == "function" ||
            (typeof i.UNSAFE_componentWillMount != "function" &&
                typeof i.componentWillMount != "function") ||
            ((t = i.state),
            typeof i.componentWillMount == "function" && i.componentWillMount(),
            typeof i.UNSAFE_componentWillMount == "function" &&
                i.UNSAFE_componentWillMount(),
            t !== i.state && is.enqueueReplaceState(i, i.state, null),
            Li(e, n, i, r),
            (i.state = e.memoizedState)),
        typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function qn(e, t, n) {
    if (
        ((e = n.ref),
        e !== null && typeof e != "function" && typeof e != "object")
    ) {
        if (n._owner) {
            if (((n = n._owner), n)) {
                if (n.tag !== 1) throw Error(O(309));
                var r = n.stateNode;
            }
            if (!r) throw Error(O(147, e));
            var i = r,
                s = "" + e;
            return t !== null &&
                t.ref !== null &&
                typeof t.ref == "function" &&
                t.ref._stringRef === s
                ? t.ref
                : ((t = function (o) {
                      var l = i.refs;
                      l === tf && (l = i.refs = {}),
                          o === null ? delete l[s] : (l[s] = o);
                  }),
                  (t._stringRef = s),
                  t);
        }
        if (typeof e != "string") throw Error(O(284));
        if (!n._owner) throw Error(O(290, e));
    }
    return e;
}
function Xr(e, t) {
    throw (
        ((e = Object.prototype.toString.call(t)),
        Error(
            O(
                31,
                e === "[object Object]"
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : e,
            ),
        ))
    );
}
function Wu(e) {
    var t = e._init;
    return t(e._payload);
}
function rf(e) {
    function t(d, f) {
        if (e) {
            var p = d.deletions;
            p === null ? ((d.deletions = [f]), (d.flags |= 16)) : p.push(f);
        }
    }
    function n(d, f) {
        if (!e) return null;
        for (; f !== null; ) t(d, f), (f = f.sibling);
        return null;
    }
    function r(d, f) {
        for (d = new Map(); f !== null; )
            f.key !== null ? d.set(f.key, f) : d.set(f.index, f),
                (f = f.sibling);
        return d;
    }
    function i(d, f) {
        return (d = It(d, f)), (d.index = 0), (d.sibling = null), d;
    }
    function s(d, f, p) {
        return (
            (d.index = p),
            e
                ? ((p = d.alternate),
                  p !== null
                      ? ((p = p.index), p < f ? ((d.flags |= 2), f) : p)
                      : ((d.flags |= 2), f))
                : ((d.flags |= 1048576), f)
        );
    }
    function o(d) {
        return e && d.alternate === null && (d.flags |= 2), d;
    }
    function l(d, f, p, E) {
        return f === null || f.tag !== 6
            ? ((f = $s(p, d.mode, E)), (f.return = d), f)
            : ((f = i(f, p)), (f.return = d), f);
    }
    function u(d, f, p, E) {
        var _ = p.type;
        return _ === un
            ? c(d, f, p.props.children, E, p.key)
            : f !== null &&
              (f.elementType === _ ||
                  (typeof _ == "object" &&
                      _ !== null &&
                      _.$$typeof === vt &&
                      Wu(_) === f.type))
            ? ((E = i(f, p.props)), (E.ref = qn(d, f, p)), (E.return = d), E)
            : ((E = pi(p.type, p.key, p.props, null, d.mode, E)),
              (E.ref = qn(d, f, p)),
              (E.return = d),
              E);
    }
    function a(d, f, p, E) {
        return f === null ||
            f.tag !== 4 ||
            f.stateNode.containerInfo !== p.containerInfo ||
            f.stateNode.implementation !== p.implementation
            ? ((f = qs(p, d.mode, E)), (f.return = d), f)
            : ((f = i(f, p.children || [])), (f.return = d), f);
    }
    function c(d, f, p, E, _) {
        return f === null || f.tag !== 7
            ? ((f = bt(p, d.mode, E, _)), (f.return = d), f)
            : ((f = i(f, p)), (f.return = d), f);
    }
    function h(d, f, p) {
        if ((typeof f == "string" && f !== "") || typeof f == "number")
            return (f = $s("" + f, d.mode, p)), (f.return = d), f;
        if (typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
                case Br:
                    return (
                        (p = pi(f.type, f.key, f.props, null, d.mode, p)),
                        (p.ref = qn(d, null, f)),
                        (p.return = d),
                        p
                    );
                case ln:
                    return (f = qs(f, d.mode, p)), (f.return = d), f;
                case vt:
                    var E = f._init;
                    return h(d, E(f._payload), p);
            }
            if (Gn(f) || zn(f))
                return (f = bt(f, d.mode, p, null)), (f.return = d), f;
            Xr(d, f);
        }
        return null;
    }
    function m(d, f, p, E) {
        var _ = f !== null ? f.key : null;
        if ((typeof p == "string" && p !== "") || typeof p == "number")
            return _ !== null ? null : l(d, f, "" + p, E);
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
                case Br:
                    return p.key === _ ? u(d, f, p, E) : null;
                case ln:
                    return p.key === _ ? a(d, f, p, E) : null;
                case vt:
                    return (_ = p._init), m(d, f, _(p._payload), E);
            }
            if (Gn(p) || zn(p)) return _ !== null ? null : c(d, f, p, E, null);
            Xr(d, p);
        }
        return null;
    }
    function y(d, f, p, E, _) {
        if ((typeof E == "string" && E !== "") || typeof E == "number")
            return (d = d.get(p) || null), l(f, d, "" + E, _);
        if (typeof E == "object" && E !== null) {
            switch (E.$$typeof) {
                case Br:
                    return (
                        (d = d.get(E.key === null ? p : E.key) || null),
                        u(f, d, E, _)
                    );
                case ln:
                    return (
                        (d = d.get(E.key === null ? p : E.key) || null),
                        a(f, d, E, _)
                    );
                case vt:
                    var T = E._init;
                    return y(d, f, p, T(E._payload), _);
            }
            if (Gn(E) || zn(E))
                return (d = d.get(p) || null), c(f, d, E, _, null);
            Xr(f, E);
        }
        return null;
    }
    function v(d, f, p, E) {
        for (
            var _ = null, T = null, N = f, k = (f = 0), z = null;
            N !== null && k < p.length;
            k++
        ) {
            N.index > k ? ((z = N), (N = null)) : (z = N.sibling);
            var j = m(d, N, p[k], E);
            if (j === null) {
                N === null && (N = z);
                break;
            }
            e && N && j.alternate === null && t(d, N),
                (f = s(j, f, k)),
                T === null ? (_ = j) : (T.sibling = j),
                (T = j),
                (N = z);
        }
        if (k === p.length) return n(d, N), K && Bt(d, k), _;
        if (N === null) {
            for (; k < p.length; k++)
                (N = h(d, p[k], E)),
                    N !== null &&
                        ((f = s(N, f, k)),
                        T === null ? (_ = N) : (T.sibling = N),
                        (T = N));
            return K && Bt(d, k), _;
        }
        for (N = r(d, N); k < p.length; k++)
            (z = y(N, d, k, p[k], E)),
                z !== null &&
                    (e &&
                        z.alternate !== null &&
                        N.delete(z.key === null ? k : z.key),
                    (f = s(z, f, k)),
                    T === null ? (_ = z) : (T.sibling = z),
                    (T = z));
        return (
            e &&
                N.forEach(function (H) {
                    return t(d, H);
                }),
            K && Bt(d, k),
            _
        );
    }
    function g(d, f, p, E) {
        var _ = zn(p);
        if (typeof _ != "function") throw Error(O(150));
        if (((p = _.call(p)), p == null)) throw Error(O(151));
        for (
            var T = (_ = null), N = f, k = (f = 0), z = null, j = p.next();
            N !== null && !j.done;
            k++, j = p.next()
        ) {
            N.index > k ? ((z = N), (N = null)) : (z = N.sibling);
            var H = m(d, N, j.value, E);
            if (H === null) {
                N === null && (N = z);
                break;
            }
            e && N && H.alternate === null && t(d, N),
                (f = s(H, f, k)),
                T === null ? (_ = H) : (T.sibling = H),
                (T = H),
                (N = z);
        }
        if (j.done) return n(d, N), K && Bt(d, k), _;
        if (N === null) {
            for (; !j.done; k++, j = p.next())
                (j = h(d, j.value, E)),
                    j !== null &&
                        ((f = s(j, f, k)),
                        T === null ? (_ = j) : (T.sibling = j),
                        (T = j));
            return K && Bt(d, k), _;
        }
        for (N = r(d, N); !j.done; k++, j = p.next())
            (j = y(N, d, k, j.value, E)),
                j !== null &&
                    (e &&
                        j.alternate !== null &&
                        N.delete(j.key === null ? k : j.key),
                    (f = s(j, f, k)),
                    T === null ? (_ = j) : (T.sibling = j),
                    (T = j));
        return (
            e &&
                N.forEach(function (ht) {
                    return t(d, ht);
                }),
            K && Bt(d, k),
            _
        );
    }
    function C(d, f, p, E) {
        if (
            (typeof p == "object" &&
                p !== null &&
                p.type === un &&
                p.key === null &&
                (p = p.props.children),
            typeof p == "object" && p !== null)
        ) {
            switch (p.$$typeof) {
                case Br:
                    e: {
                        for (var _ = p.key, T = f; T !== null; ) {
                            if (T.key === _) {
                                if (((_ = p.type), _ === un)) {
                                    if (T.tag === 7) {
                                        n(d, T.sibling),
                                            (f = i(T, p.props.children)),
                                            (f.return = d),
                                            (d = f);
                                        break e;
                                    }
                                } else if (
                                    T.elementType === _ ||
                                    (typeof _ == "object" &&
                                        _ !== null &&
                                        _.$$typeof === vt &&
                                        Wu(_) === T.type)
                                ) {
                                    n(d, T.sibling),
                                        (f = i(T, p.props)),
                                        (f.ref = qn(d, T, p)),
                                        (f.return = d),
                                        (d = f);
                                    break e;
                                }
                                n(d, T);
                                break;
                            } else t(d, T);
                            T = T.sibling;
                        }
                        p.type === un
                            ? ((f = bt(p.props.children, d.mode, E, p.key)),
                              (f.return = d),
                              (d = f))
                            : ((E = pi(
                                  p.type,
                                  p.key,
                                  p.props,
                                  null,
                                  d.mode,
                                  E,
                              )),
                              (E.ref = qn(d, f, p)),
                              (E.return = d),
                              (d = E));
                    }
                    return o(d);
                case ln:
                    e: {
                        for (T = p.key; f !== null; ) {
                            if (f.key === T)
                                if (
                                    f.tag === 4 &&
                                    f.stateNode.containerInfo ===
                                        p.containerInfo &&
                                    f.stateNode.implementation ===
                                        p.implementation
                                ) {
                                    n(d, f.sibling),
                                        (f = i(f, p.children || [])),
                                        (f.return = d),
                                        (d = f);
                                    break e;
                                } else {
                                    n(d, f);
                                    break;
                                }
                            else t(d, f);
                            f = f.sibling;
                        }
                        (f = qs(p, d.mode, E)), (f.return = d), (d = f);
                    }
                    return o(d);
                case vt:
                    return (T = p._init), C(d, f, T(p._payload), E);
            }
            if (Gn(p)) return v(d, f, p, E);
            if (zn(p)) return g(d, f, p, E);
            Xr(d, p);
        }
        return (typeof p == "string" && p !== "") || typeof p == "number"
            ? ((p = "" + p),
              f !== null && f.tag === 6
                  ? (n(d, f.sibling), (f = i(f, p)), (f.return = d), (d = f))
                  : (n(d, f), (f = $s(p, d.mode, E)), (f.return = d), (d = f)),
              o(d))
            : n(d, f);
    }
    return C;
}
var Rn = rf(!0),
    sf = rf(!1),
    Ar = {},
    tt = jt(Ar),
    Er = jt(Ar),
    wr = jt(Ar);
function qt(e) {
    if (e === Ar) throw Error(O(174));
    return e;
}
function Rl(e, t) {
    switch ((W(wr, t), W(Er, e), W(tt, Ar), (e = t.nodeType), e)) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : oo(null, "");
            break;
        default:
            (e = e === 8 ? t.parentNode : t),
                (t = e.namespaceURI || null),
                (e = e.tagName),
                (t = oo(t, e));
    }
    G(tt), W(tt, t);
}
function Pn() {
    G(tt), G(Er), G(wr);
}
function of(e) {
    qt(wr.current);
    var t = qt(tt.current),
        n = oo(t, e.type);
    t !== n && (W(Er, e), W(tt, n));
}
function Pl(e) {
    Er.current === e && (G(tt), G(Er));
}
var Y = jt(0);
function Fi(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (
                n !== null &&
                ((n = n.dehydrated),
                n === null || n.data === "$?" || n.data === "$!")
            )
                return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t;
        } else if (t.child !== null) {
            (t.child.return = t), (t = t.child);
            continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return null;
            t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
}
var Ms = [];
function Il() {
    for (var e = 0; e < Ms.length; e++)
        Ms[e]._workInProgressVersionPrimary = null;
    Ms.length = 0;
}
var ai = ft.ReactCurrentDispatcher,
    Us = ft.ReactCurrentBatchConfig,
    Yt = 0,
    X = null,
    le = null,
    ae = null,
    ji = !1,
    ir = !1,
    Sr = 0,
    Fp = 0;
function me() {
    throw Error(O(321));
}
function Dl(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!Ye(e[n], t[n])) return !1;
    return !0;
}
function Al(e, t, n, r, i, s) {
    if (
        ((Yt = s),
        (X = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (ai.current = e === null || e.memoizedState === null ? zp : Bp),
        (e = n(r, i)),
        ir)
    ) {
        s = 0;
        do {
            if (((ir = !1), (Sr = 0), 25 <= s)) throw Error(O(301));
            (s += 1),
                (ae = le = null),
                (t.updateQueue = null),
                (ai.current = Vp),
                (e = n(r, i));
        } while (ir);
    }
    if (
        ((ai.current = Mi),
        (t = le !== null && le.next !== null),
        (Yt = 0),
        (ae = le = X = null),
        (ji = !1),
        t)
    )
        throw Error(O(300));
    return e;
}
function Ll() {
    var e = Sr !== 0;
    return (Sr = 0), e;
}
function Je() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
    };
    return ae === null ? (X.memoizedState = ae = e) : (ae = ae.next = e), ae;
}
function Ve() {
    if (le === null) {
        var e = X.alternate;
        e = e !== null ? e.memoizedState : null;
    } else e = le.next;
    var t = ae === null ? X.memoizedState : ae.next;
    if (t !== null) (ae = t), (le = e);
    else {
        if (e === null) throw Error(O(310));
        (le = e),
            (e = {
                memoizedState: le.memoizedState,
                baseState: le.baseState,
                baseQueue: le.baseQueue,
                queue: le.queue,
                next: null,
            }),
            ae === null ? (X.memoizedState = ae = e) : (ae = ae.next = e);
    }
    return ae;
}
function Cr(e, t) {
    return typeof t == "function" ? t(e) : t;
}
function zs(e) {
    var t = Ve(),
        n = t.queue;
    if (n === null) throw Error(O(311));
    n.lastRenderedReducer = e;
    var r = le,
        i = r.baseQueue,
        s = n.pending;
    if (s !== null) {
        if (i !== null) {
            var o = i.next;
            (i.next = s.next), (s.next = o);
        }
        (r.baseQueue = i = s), (n.pending = null);
    }
    if (i !== null) {
        (s = i.next), (r = r.baseState);
        var l = (o = null),
            u = null,
            a = s;
        do {
            var c = a.lane;
            if ((Yt & c) === c)
                u !== null &&
                    (u = u.next =
                        {
                            lane: 0,
                            action: a.action,
                            hasEagerState: a.hasEagerState,
                            eagerState: a.eagerState,
                            next: null,
                        }),
                    (r = a.hasEagerState ? a.eagerState : e(r, a.action));
            else {
                var h = {
                    lane: c,
                    action: a.action,
                    hasEagerState: a.hasEagerState,
                    eagerState: a.eagerState,
                    next: null,
                };
                u === null ? ((l = u = h), (o = r)) : (u = u.next = h),
                    (X.lanes |= c),
                    (Xt |= c);
            }
            a = a.next;
        } while (a !== null && a !== s);
        u === null ? (o = r) : (u.next = l),
            Ye(r, t.memoizedState) || (ke = !0),
            (t.memoizedState = r),
            (t.baseState = o),
            (t.baseQueue = u),
            (n.lastRenderedState = r);
    }
    if (((e = n.interleaved), e !== null)) {
        i = e;
        do (s = i.lane), (X.lanes |= s), (Xt |= s), (i = i.next);
        while (i !== e);
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
}
function Bs(e) {
    var t = Ve(),
        n = t.queue;
    if (n === null) throw Error(O(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        i = n.pending,
        s = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var o = (i = i.next);
        do (s = e(s, o.action)), (o = o.next);
        while (o !== i);
        Ye(s, t.memoizedState) || (ke = !0),
            (t.memoizedState = s),
            t.baseQueue === null && (t.baseState = s),
            (n.lastRenderedState = s);
    }
    return [s, r];
}
function lf() {}
function uf(e, t) {
    var n = X,
        r = Ve(),
        i = t(),
        s = !Ye(r.memoizedState, i);
    if (
        (s && ((r.memoizedState = i), (ke = !0)),
        (r = r.queue),
        Fl(ff.bind(null, n, r, e), [e]),
        r.getSnapshot !== t || s || (ae !== null && ae.memoizedState.tag & 1))
    ) {
        if (
            ((n.flags |= 2048),
            kr(9, cf.bind(null, n, r, i, t), void 0, null),
            fe === null)
        )
            throw Error(O(349));
        Yt & 30 || af(n, t, i);
    }
    return i;
}
function af(e, t, n) {
    (e.flags |= 16384),
        (e = { getSnapshot: t, value: n }),
        (t = X.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (X.updateQueue = t),
              (t.stores = [e]))
            : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function cf(e, t, n, r) {
    (t.value = n), (t.getSnapshot = r), df(t) && hf(e);
}
function ff(e, t, n) {
    return n(function () {
        df(t) && hf(e);
    });
}
function df(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !Ye(e, n);
    } catch {
        return !0;
    }
}
function hf(e) {
    var t = at(e, 1);
    t !== null && Ke(t, e, 1, -1);
}
function bu(e) {
    var t = Je();
    return (
        typeof e == "function" && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Cr,
            lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = Up.bind(null, X, e)),
        [t.memoizedState, e]
    );
}
function kr(e, t, n, r) {
    return (
        (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
        (t = X.updateQueue),
        t === null
            ? ((t = { lastEffect: null, stores: null }),
              (X.updateQueue = t),
              (t.lastEffect = e.next = e))
            : ((n = t.lastEffect),
              n === null
                  ? (t.lastEffect = e.next = e)
                  : ((r = n.next),
                    (n.next = e),
                    (e.next = r),
                    (t.lastEffect = e))),
        e
    );
}
function pf() {
    return Ve().memoizedState;
}
function ci(e, t, n, r) {
    var i = Je();
    (X.flags |= e),
        (i.memoizedState = kr(1 | t, n, void 0, r === void 0 ? null : r));
}
function ss(e, t, n, r) {
    var i = Ve();
    r = r === void 0 ? null : r;
    var s = void 0;
    if (le !== null) {
        var o = le.memoizedState;
        if (((s = o.destroy), r !== null && Dl(r, o.deps))) {
            i.memoizedState = kr(t, n, s, r);
            return;
        }
    }
    (X.flags |= e), (i.memoizedState = kr(1 | t, n, s, r));
}
function Gu(e, t) {
    return ci(8390656, 8, e, t);
}
function Fl(e, t) {
    return ss(2048, 8, e, t);
}
function mf(e, t) {
    return ss(4, 2, e, t);
}
function vf(e, t) {
    return ss(4, 4, e, t);
}
function yf(e, t) {
    if (typeof t == "function")
        return (
            (e = e()),
            t(e),
            function () {
                t(null);
            }
        );
    if (t != null)
        return (
            (e = e()),
            (t.current = e),
            function () {
                t.current = null;
            }
        );
}
function gf(e, t, n) {
    return (
        (n = n != null ? n.concat([e]) : null), ss(4, 4, yf.bind(null, t, e), n)
    );
}
function jl() {}
function xf(e, t) {
    var n = Ve();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Dl(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
}
function Ef(e, t) {
    var n = Ve();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Dl(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
}
function wf(e, t, n) {
    return Yt & 21
        ? (Ye(n, t) ||
              ((n = Cc()), (X.lanes |= n), (Xt |= n), (e.baseState = !0)),
          t)
        : (e.baseState && ((e.baseState = !1), (ke = !0)),
          (e.memoizedState = n));
}
function jp(e, t) {
    var n = $;
    ($ = n !== 0 && 4 > n ? n : 4), e(!0);
    var r = Us.transition;
    Us.transition = {};
    try {
        e(!1), t();
    } finally {
        ($ = n), (Us.transition = r);
    }
}
function Sf() {
    return Ve().memoizedState;
}
function Mp(e, t, n) {
    var r = Pt(e);
    if (
        ((n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        }),
        Cf(e))
    )
        kf(t, n);
    else if (((n = Zc(e, t, n, r)), n !== null)) {
        var i = Ee();
        Ke(n, e, r, i), Nf(n, t, r);
    }
}
function Up(e, t, n) {
    var r = Pt(e),
        i = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null,
        };
    if (Cf(e)) kf(t, i);
    else {
        var s = e.alternate;
        if (
            e.lanes === 0 &&
            (s === null || s.lanes === 0) &&
            ((s = t.lastRenderedReducer), s !== null)
        )
            try {
                var o = t.lastRenderedState,
                    l = s(o, n);
                if (((i.hasEagerState = !0), (i.eagerState = l), Ye(l, o))) {
                    var u = t.interleaved;
                    u === null
                        ? ((i.next = i), Ol(t))
                        : ((i.next = u.next), (u.next = i)),
                        (t.interleaved = i);
                    return;
                }
            } catch {
            } finally {
            }
        (n = Zc(e, t, i, r)),
            n !== null && ((i = Ee()), Ke(n, e, r, i), Nf(n, t, r));
    }
}
function Cf(e) {
    var t = e.alternate;
    return e === X || (t !== null && t === X);
}
function kf(e, t) {
    ir = ji = !0;
    var n = e.pending;
    n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
}
function Nf(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        (r &= e.pendingLanes), (n |= r), (t.lanes = n), hl(e, n);
    }
}
var Mi = {
        readContext: Be,
        useCallback: me,
        useContext: me,
        useEffect: me,
        useImperativeHandle: me,
        useInsertionEffect: me,
        useLayoutEffect: me,
        useMemo: me,
        useReducer: me,
        useRef: me,
        useState: me,
        useDebugValue: me,
        useDeferredValue: me,
        useTransition: me,
        useMutableSource: me,
        useSyncExternalStore: me,
        useId: me,
        unstable_isNewReconciler: !1,
    },
    zp = {
        readContext: Be,
        useCallback: function (e, t) {
            return (Je().memoizedState = [e, t === void 0 ? null : t]), e;
        },
        useContext: Be,
        useEffect: Gu,
        useImperativeHandle: function (e, t, n) {
            return (
                (n = n != null ? n.concat([e]) : null),
                ci(4194308, 4, yf.bind(null, t, e), n)
            );
        },
        useLayoutEffect: function (e, t) {
            return ci(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
            return ci(4, 2, e, t);
        },
        useMemo: function (e, t) {
            var n = Je();
            return (
                (t = t === void 0 ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
            );
        },
        useReducer: function (e, t, n) {
            var r = Je();
            return (
                (t = n !== void 0 ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                    pending: null,
                    interleaved: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Mp.bind(null, X, e)),
                [r.memoizedState, e]
            );
        },
        useRef: function (e) {
            var t = Je();
            return (e = { current: e }), (t.memoizedState = e);
        },
        useState: bu,
        useDebugValue: jl,
        useDeferredValue: function (e) {
            return (Je().memoizedState = e);
        },
        useTransition: function () {
            var e = bu(!1),
                t = e[0];
            return (e = jp.bind(null, e[1])), (Je().memoizedState = e), [t, e];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
            var r = X,
                i = Je();
            if (K) {
                if (n === void 0) throw Error(O(407));
                n = n();
            } else {
                if (((n = t()), fe === null)) throw Error(O(349));
                Yt & 30 || af(r, t, n);
            }
            i.memoizedState = n;
            var s = { value: n, getSnapshot: t };
            return (
                (i.queue = s),
                Gu(ff.bind(null, r, s, e), [e]),
                (r.flags |= 2048),
                kr(9, cf.bind(null, r, s, n, t), void 0, null),
                n
            );
        },
        useId: function () {
            var e = Je(),
                t = fe.identifierPrefix;
            if (K) {
                var n = st,
                    r = it;
                (n = (r & ~(1 << (32 - Ge(r) - 1))).toString(32) + n),
                    (t = ":" + t + "R" + n),
                    (n = Sr++),
                    0 < n && (t += "H" + n.toString(32)),
                    (t += ":");
            } else (n = Fp++), (t = ":" + t + "r" + n.toString(32) + ":");
            return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
    },
    Bp = {
        readContext: Be,
        useCallback: xf,
        useContext: Be,
        useEffect: Fl,
        useImperativeHandle: gf,
        useInsertionEffect: mf,
        useLayoutEffect: vf,
        useMemo: Ef,
        useReducer: zs,
        useRef: pf,
        useState: function () {
            return zs(Cr);
        },
        useDebugValue: jl,
        useDeferredValue: function (e) {
            var t = Ve();
            return wf(t, le.memoizedState, e);
        },
        useTransition: function () {
            var e = zs(Cr)[0],
                t = Ve().memoizedState;
            return [e, t];
        },
        useMutableSource: lf,
        useSyncExternalStore: uf,
        useId: Sf,
        unstable_isNewReconciler: !1,
    },
    Vp = {
        readContext: Be,
        useCallback: xf,
        useContext: Be,
        useEffect: Fl,
        useImperativeHandle: gf,
        useInsertionEffect: mf,
        useLayoutEffect: vf,
        useMemo: Ef,
        useReducer: Bs,
        useRef: pf,
        useState: function () {
            return Bs(Cr);
        },
        useDebugValue: jl,
        useDeferredValue: function (e) {
            var t = Ve();
            return le === null
                ? (t.memoizedState = e)
                : wf(t, le.memoizedState, e);
        },
        useTransition: function () {
            var e = Bs(Cr)[0],
                t = Ve().memoizedState;
            return [e, t];
        },
        useMutableSource: lf,
        useSyncExternalStore: uf,
        useId: Sf,
        unstable_isNewReconciler: !1,
    };
function In(e, t) {
    try {
        var n = "",
            r = t;
        do (n += mh(r)), (r = r.return);
        while (r);
        var i = n;
    } catch (s) {
        i =
            `
Error generating stack: ` +
            s.message +
            `
` +
            s.stack;
    }
    return { value: e, source: t, stack: i, digest: null };
}
function Vs(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Po(e, t) {
    try {
        console.error(t.value);
    } catch (n) {
        setTimeout(function () {
            throw n;
        });
    }
}
var Qp = typeof WeakMap == "function" ? WeakMap : Map;
function Tf(e, t, n) {
    (n = ot(-1, n)), (n.tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
        (n.callback = function () {
            zi || ((zi = !0), (Bo = r)), Po(e, t);
        }),
        n
    );
}
function Of(e, t, n) {
    (n = ot(-1, n)), (n.tag = 3);
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        (n.payload = function () {
            return r(i);
        }),
            (n.callback = function () {
                Po(e, t);
            });
    }
    var s = e.stateNode;
    return (
        s !== null &&
            typeof s.componentDidCatch == "function" &&
            (n.callback = function () {
                Po(e, t),
                    typeof r != "function" &&
                        (Rt === null ? (Rt = new Set([this])) : Rt.add(this));
                var o = t.stack;
                this.componentDidCatch(t.value, {
                    componentStack: o !== null ? o : "",
                });
            }),
        n
    );
}
function Ku(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new Qp();
        var i = new Set();
        r.set(t, i);
    } else (i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i));
    i.has(n) || (i.add(n), (e = n0.bind(null, e, t, n)), t.then(e, e));
}
function Yu(e) {
    do {
        var t;
        if (
            ((t = e.tag === 13) &&
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated !== null : !0)),
            t)
        )
            return e;
        e = e.return;
    } while (e !== null);
    return null;
}
function Xu(e, t, n, r, i) {
    return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = i), e)
        : (e === t
              ? (e.flags |= 65536)
              : ((e.flags |= 128),
                (n.flags |= 131072),
                (n.flags &= -52805),
                n.tag === 1 &&
                    (n.alternate === null
                        ? (n.tag = 17)
                        : ((t = ot(-1, 1)), (t.tag = 2), _t(n, t, 1))),
                (n.lanes |= 1)),
          e);
}
var $p = ft.ReactCurrentOwner,
    ke = !1;
function xe(e, t, n, r) {
    t.child = e === null ? sf(t, null, n, r) : Rn(t, e.child, n, r);
}
function Ju(e, t, n, r, i) {
    n = n.render;
    var s = t.ref;
    return (
        kn(t, i),
        (r = Al(e, t, n, r, s, i)),
        (n = Ll()),
        e !== null && !ke
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              ct(e, t, i))
            : (K && n && wl(t), (t.flags |= 1), xe(e, t, r, i), t.child)
    );
}
function Zu(e, t, n, r, i) {
    if (e === null) {
        var s = n.type;
        return typeof s == "function" &&
            !ql(s) &&
            s.defaultProps === void 0 &&
            n.compare === null &&
            n.defaultProps === void 0
            ? ((t.tag = 15), (t.type = s), _f(e, t, s, r, i))
            : ((e = pi(n.type, null, r, t, t.mode, i)),
              (e.ref = t.ref),
              (e.return = t),
              (t.child = e));
    }
    if (((s = e.child), !(e.lanes & i))) {
        var o = s.memoizedProps;
        if (
            ((n = n.compare),
            (n = n !== null ? n : vr),
            n(o, r) && e.ref === t.ref)
        )
            return ct(e, t, i);
    }
    return (
        (t.flags |= 1),
        (e = It(s, r)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e)
    );
}
function _f(e, t, n, r, i) {
    if (e !== null) {
        var s = e.memoizedProps;
        if (vr(s, r) && e.ref === t.ref)
            if (((ke = !1), (t.pendingProps = r = s), (e.lanes & i) !== 0))
                e.flags & 131072 && (ke = !0);
            else return (t.lanes = e.lanes), ct(e, t, i);
    }
    return Io(e, t, n, r, i);
}
function Rf(e, t, n) {
    var r = t.pendingProps,
        i = r.children,
        s = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
            }),
                W(gn, Re),
                (Re |= n);
        else {
            if (!(n & 1073741824))
                return (
                    (e = s !== null ? s.baseLanes | n : n),
                    (t.lanes = t.childLanes = 1073741824),
                    (t.memoizedState = {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null,
                    }),
                    (t.updateQueue = null),
                    W(gn, Re),
                    (Re |= e),
                    null
                );
            (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
            }),
                (r = s !== null ? s.baseLanes : n),
                W(gn, Re),
                (Re |= r);
        }
    else
        s !== null
            ? ((r = s.baseLanes | n), (t.memoizedState = null))
            : (r = n),
            W(gn, Re),
            (Re |= r);
    return xe(e, t, i, n), t.child;
}
function Pf(e, t) {
    var n = t.ref;
    ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
}
function Io(e, t, n, r, i) {
    var s = Te(n) ? Gt : ge.current;
    return (
        (s = On(t, s)),
        kn(t, i),
        (n = Al(e, t, n, r, s, i)),
        (r = Ll()),
        e !== null && !ke
            ? ((t.updateQueue = e.updateQueue),
              (t.flags &= -2053),
              (e.lanes &= ~i),
              ct(e, t, i))
            : (K && r && wl(t), (t.flags |= 1), xe(e, t, n, i), t.child)
    );
}
function ea(e, t, n, r, i) {
    if (Te(n)) {
        var s = !0;
        Ri(t);
    } else s = !1;
    if ((kn(t, i), t.stateNode === null))
        fi(e, t), nf(t, n, r), Ro(t, n, r, i), (r = !0);
    else if (e === null) {
        var o = t.stateNode,
            l = t.memoizedProps;
        o.props = l;
        var u = o.context,
            a = n.contextType;
        typeof a == "object" && a !== null
            ? (a = Be(a))
            : ((a = Te(n) ? Gt : ge.current), (a = On(t, a)));
        var c = n.getDerivedStateFromProps,
            h =
                typeof c == "function" ||
                typeof o.getSnapshotBeforeUpdate == "function";
        h ||
            (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
                typeof o.componentWillReceiveProps != "function") ||
            ((l !== r || u !== a) && Hu(t, o, r, a)),
            (yt = !1);
        var m = t.memoizedState;
        (o.state = m),
            Li(t, r, o, i),
            (u = t.memoizedState),
            l !== r || m !== u || Ne.current || yt
                ? (typeof c == "function" &&
                      (_o(t, n, c, r), (u = t.memoizedState)),
                  (l = yt || qu(t, n, l, r, m, u, a))
                      ? (h ||
                            (typeof o.UNSAFE_componentWillMount != "function" &&
                                typeof o.componentWillMount != "function") ||
                            (typeof o.componentWillMount == "function" &&
                                o.componentWillMount(),
                            typeof o.UNSAFE_componentWillMount == "function" &&
                                o.UNSAFE_componentWillMount()),
                        typeof o.componentDidMount == "function" &&
                            (t.flags |= 4194308))
                      : (typeof o.componentDidMount == "function" &&
                            (t.flags |= 4194308),
                        (t.memoizedProps = r),
                        (t.memoizedState = u)),
                  (o.props = r),
                  (o.state = u),
                  (o.context = a),
                  (r = l))
                : (typeof o.componentDidMount == "function" &&
                      (t.flags |= 4194308),
                  (r = !1));
    } else {
        (o = t.stateNode),
            ef(e, t),
            (l = t.memoizedProps),
            (a = t.type === t.elementType ? l : He(t.type, l)),
            (o.props = a),
            (h = t.pendingProps),
            (m = o.context),
            (u = n.contextType),
            typeof u == "object" && u !== null
                ? (u = Be(u))
                : ((u = Te(n) ? Gt : ge.current), (u = On(t, u)));
        var y = n.getDerivedStateFromProps;
        (c =
            typeof y == "function" ||
            typeof o.getSnapshotBeforeUpdate == "function") ||
            (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
                typeof o.componentWillReceiveProps != "function") ||
            ((l !== h || m !== u) && Hu(t, o, r, u)),
            (yt = !1),
            (m = t.memoizedState),
            (o.state = m),
            Li(t, r, o, i);
        var v = t.memoizedState;
        l !== h || m !== v || Ne.current || yt
            ? (typeof y == "function" &&
                  (_o(t, n, y, r), (v = t.memoizedState)),
              (a = yt || qu(t, n, a, r, m, v, u) || !1)
                  ? (c ||
                        (typeof o.UNSAFE_componentWillUpdate != "function" &&
                            typeof o.componentWillUpdate != "function") ||
                        (typeof o.componentWillUpdate == "function" &&
                            o.componentWillUpdate(r, v, u),
                        typeof o.UNSAFE_componentWillUpdate == "function" &&
                            o.UNSAFE_componentWillUpdate(r, v, u)),
                    typeof o.componentDidUpdate == "function" && (t.flags |= 4),
                    typeof o.getSnapshotBeforeUpdate == "function" &&
                        (t.flags |= 1024))
                  : (typeof o.componentDidUpdate != "function" ||
                        (l === e.memoizedProps && m === e.memoizedState) ||
                        (t.flags |= 4),
                    typeof o.getSnapshotBeforeUpdate != "function" ||
                        (l === e.memoizedProps && m === e.memoizedState) ||
                        (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = v)),
              (o.props = r),
              (o.state = v),
              (o.context = u),
              (r = a))
            : (typeof o.componentDidUpdate != "function" ||
                  (l === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != "function" ||
                  (l === e.memoizedProps && m === e.memoizedState) ||
                  (t.flags |= 1024),
              (r = !1));
    }
    return Do(e, t, n, r, s, i);
}
function Do(e, t, n, r, i, s) {
    Pf(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o) return i && zu(t, n, !1), ct(e, t, s);
    (r = t.stateNode), ($p.current = t);
    var l =
        o && typeof n.getDerivedStateFromError != "function"
            ? null
            : r.render();
    return (
        (t.flags |= 1),
        e !== null && o
            ? ((t.child = Rn(t, e.child, null, s)),
              (t.child = Rn(t, null, l, s)))
            : xe(e, t, l, s),
        (t.memoizedState = r.state),
        i && zu(t, n, !0),
        t.child
    );
}
function If(e) {
    var t = e.stateNode;
    t.pendingContext
        ? Uu(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Uu(e, t.context, !1),
        Rl(e, t.containerInfo);
}
function ta(e, t, n, r, i) {
    return _n(), Cl(i), (t.flags |= 256), xe(e, t, n, r), t.child;
}
var Ao = { dehydrated: null, treeContext: null, retryLane: 0 };
function Lo(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
}
function Df(e, t, n) {
    var r = t.pendingProps,
        i = Y.current,
        s = !1,
        o = (t.flags & 128) !== 0,
        l;
    if (
        ((l = o) ||
            (l = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
        l
            ? ((s = !0), (t.flags &= -129))
            : (e === null || e.memoizedState !== null) && (i |= 1),
        W(Y, i & 1),
        e === null)
    )
        return (
            To(t),
            (e = t.memoizedState),
            e !== null && ((e = e.dehydrated), e !== null)
                ? (t.mode & 1
                      ? e.data === "$!"
                          ? (t.lanes = 8)
                          : (t.lanes = 1073741824)
                      : (t.lanes = 1),
                  null)
                : ((o = r.children),
                  (e = r.fallback),
                  s
                      ? ((r = t.mode),
                        (s = t.child),
                        (o = { mode: "hidden", children: o }),
                        !(r & 1) && s !== null
                            ? ((s.childLanes = 0), (s.pendingProps = o))
                            : (s = us(o, r, 0, null)),
                        (e = bt(e, r, n, null)),
                        (s.return = t),
                        (e.return = t),
                        (s.sibling = e),
                        (t.child = s),
                        (t.child.memoizedState = Lo(n)),
                        (t.memoizedState = Ao),
                        e)
                      : Ml(t, o))
        );
    if (((i = e.memoizedState), i !== null && ((l = i.dehydrated), l !== null)))
        return qp(e, t, o, r, l, i, n);
    if (s) {
        (s = r.fallback), (o = t.mode), (i = e.child), (l = i.sibling);
        var u = { mode: "hidden", children: r.children };
        return (
            !(o & 1) && t.child !== i
                ? ((r = t.child),
                  (r.childLanes = 0),
                  (r.pendingProps = u),
                  (t.deletions = null))
                : ((r = It(i, u)),
                  (r.subtreeFlags = i.subtreeFlags & 14680064)),
            l !== null
                ? (s = It(l, s))
                : ((s = bt(s, o, n, null)), (s.flags |= 2)),
            (s.return = t),
            (r.return = t),
            (r.sibling = s),
            (t.child = r),
            (r = s),
            (s = t.child),
            (o = e.child.memoizedState),
            (o =
                o === null
                    ? Lo(n)
                    : {
                          baseLanes: o.baseLanes | n,
                          cachePool: null,
                          transitions: o.transitions,
                      }),
            (s.memoizedState = o),
            (s.childLanes = e.childLanes & ~n),
            (t.memoizedState = Ao),
            r
        );
    }
    return (
        (s = e.child),
        (e = s.sibling),
        (r = It(s, { mode: "visible", children: r.children })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
            ((n = t.deletions),
            n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
    );
}
function Ml(e, t) {
    return (
        (t = us({ mode: "visible", children: t }, e.mode, 0, null)),
        (t.return = e),
        (e.child = t)
    );
}
function Jr(e, t, n, r) {
    return (
        r !== null && Cl(r),
        Rn(t, e.child, null, n),
        (e = Ml(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
    );
}
function qp(e, t, n, r, i, s, o) {
    if (n)
        return t.flags & 256
            ? ((t.flags &= -257), (r = Vs(Error(O(422)))), Jr(e, t, o, r))
            : t.memoizedState !== null
            ? ((t.child = e.child), (t.flags |= 128), null)
            : ((s = r.fallback),
              (i = t.mode),
              (r = us({ mode: "visible", children: r.children }, i, 0, null)),
              (s = bt(s, i, o, null)),
              (s.flags |= 2),
              (r.return = t),
              (s.return = t),
              (r.sibling = s),
              (t.child = r),
              t.mode & 1 && Rn(t, e.child, null, o),
              (t.child.memoizedState = Lo(o)),
              (t.memoizedState = Ao),
              s);
    if (!(t.mode & 1)) return Jr(e, t, o, null);
    if (i.data === "$!") {
        if (((r = i.nextSibling && i.nextSibling.dataset), r)) var l = r.dgst;
        return (
            (r = l), (s = Error(O(419))), (r = Vs(s, r, void 0)), Jr(e, t, o, r)
        );
    }
    if (((l = (o & e.childLanes) !== 0), ke || l)) {
        if (((r = fe), r !== null)) {
            switch (o & -o) {
                case 4:
                    i = 2;
                    break;
                case 16:
                    i = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    i = 32;
                    break;
                case 536870912:
                    i = 268435456;
                    break;
                default:
                    i = 0;
            }
            (i = i & (r.suspendedLanes | o) ? 0 : i),
                i !== 0 &&
                    i !== s.retryLane &&
                    ((s.retryLane = i), at(e, i), Ke(r, e, i, -1));
        }
        return $l(), (r = Vs(Error(O(421)))), Jr(e, t, o, r);
    }
    return i.data === "$?"
        ? ((t.flags |= 128),
          (t.child = e.child),
          (t = r0.bind(null, e)),
          (i._reactRetry = t),
          null)
        : ((e = s.treeContext),
          (Pe = Ot(i.nextSibling)),
          (Ie = t),
          (K = !0),
          (be = null),
          e !== null &&
              ((je[Me++] = it),
              (je[Me++] = st),
              (je[Me++] = Kt),
              (it = e.id),
              (st = e.overflow),
              (Kt = t)),
          (t = Ml(t, r.children)),
          (t.flags |= 4096),
          t);
}
function na(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Oo(e.return, t, n);
}
function Qs(e, t, n, r, i) {
    var s = e.memoizedState;
    s === null
        ? (e.memoizedState = {
              isBackwards: t,
              rendering: null,
              renderingStartTime: 0,
              last: r,
              tail: n,
              tailMode: i,
          })
        : ((s.isBackwards = t),
          (s.rendering = null),
          (s.renderingStartTime = 0),
          (s.last = r),
          (s.tail = n),
          (s.tailMode = i));
}
function Af(e, t, n) {
    var r = t.pendingProps,
        i = r.revealOrder,
        s = r.tail;
    if ((xe(e, t, r.children, n), (r = Y.current), r & 2))
        (r = (r & 1) | 2), (t.flags |= 128);
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13) e.memoizedState !== null && na(e, n, t);
                else if (e.tag === 19) na(e, n, t);
                else if (e.child !== null) {
                    (e.child.return = e), (e = e.child);
                    continue;
                }
                if (e === t) break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
            }
        r &= 1;
    }
    if ((W(Y, r), !(t.mode & 1))) t.memoizedState = null;
    else
        switch (i) {
            case "forwards":
                for (n = t.child, i = null; n !== null; )
                    (e = n.alternate),
                        e !== null && Fi(e) === null && (i = n),
                        (n = n.sibling);
                (n = i),
                    n === null
                        ? ((i = t.child), (t.child = null))
                        : ((i = n.sibling), (n.sibling = null)),
                    Qs(t, !1, i, n, s);
                break;
            case "backwards":
                for (n = null, i = t.child, t.child = null; i !== null; ) {
                    if (((e = i.alternate), e !== null && Fi(e) === null)) {
                        t.child = i;
                        break;
                    }
                    (e = i.sibling), (i.sibling = n), (n = i), (i = e);
                }
                Qs(t, !0, n, null, s);
                break;
            case "together":
                Qs(t, !1, null, null, void 0);
                break;
            default:
                t.memoizedState = null;
        }
    return t.child;
}
function fi(e, t) {
    !(t.mode & 1) &&
        e !== null &&
        ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function ct(e, t, n) {
    if (
        (e !== null && (t.dependencies = e.dependencies),
        (Xt |= t.lanes),
        !(n & t.childLanes))
    )
        return null;
    if (e !== null && t.child !== e.child) throw Error(O(153));
    if (t.child !== null) {
        for (
            e = t.child, n = It(e, e.pendingProps), t.child = n, n.return = t;
            e.sibling !== null;

        )
            (e = e.sibling),
                (n = n.sibling = It(e, e.pendingProps)),
                (n.return = t);
        n.sibling = null;
    }
    return t.child;
}
function Hp(e, t, n) {
    switch (t.tag) {
        case 3:
            If(t), _n();
            break;
        case 5:
            of(t);
            break;
        case 1:
            Te(t.type) && Ri(t);
            break;
        case 4:
            Rl(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                i = t.memoizedProps.value;
            W(Di, r._currentValue), (r._currentValue = i);
            break;
        case 13:
            if (((r = t.memoizedState), r !== null))
                return r.dehydrated !== null
                    ? (W(Y, Y.current & 1), (t.flags |= 128), null)
                    : n & t.child.childLanes
                    ? Df(e, t, n)
                    : (W(Y, Y.current & 1),
                      (e = ct(e, t, n)),
                      e !== null ? e.sibling : null);
            W(Y, Y.current & 1);
            break;
        case 19:
            if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
                if (r) return Af(e, t, n);
                t.flags |= 128;
            }
            if (
                ((i = t.memoizedState),
                i !== null &&
                    ((i.rendering = null),
                    (i.tail = null),
                    (i.lastEffect = null)),
                W(Y, Y.current),
                r)
            )
                break;
            return null;
        case 22:
        case 23:
            return (t.lanes = 0), Rf(e, t, n);
    }
    return ct(e, t, n);
}
var Lf, Fo, Ff, jf;
Lf = function (e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            (n.child.return = n), (n = n.child);
            continue;
        }
        if (n === t) break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t) return;
            n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
    }
};
Fo = function () {};
Ff = function (e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        (e = t.stateNode), qt(tt.current);
        var s = null;
        switch (n) {
            case "input":
                (i = no(e, i)), (r = no(e, r)), (s = []);
                break;
            case "select":
                (i = J({}, i, { value: void 0 })),
                    (r = J({}, r, { value: void 0 })),
                    (s = []);
                break;
            case "textarea":
                (i = so(e, i)), (r = so(e, r)), (s = []);
                break;
            default:
                typeof i.onClick != "function" &&
                    typeof r.onClick == "function" &&
                    (e.onclick = Oi);
        }
        lo(n, r);
        var o;
        n = null;
        for (a in i)
            if (!r.hasOwnProperty(a) && i.hasOwnProperty(a) && i[a] != null)
                if (a === "style") {
                    var l = i[a];
                    for (o in l)
                        l.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
                } else
                    a !== "dangerouslySetInnerHTML" &&
                        a !== "children" &&
                        a !== "suppressContentEditableWarning" &&
                        a !== "suppressHydrationWarning" &&
                        a !== "autoFocus" &&
                        (ar.hasOwnProperty(a)
                            ? s || (s = [])
                            : (s = s || []).push(a, null));
        for (a in r) {
            var u = r[a];
            if (
                ((l = i != null ? i[a] : void 0),
                r.hasOwnProperty(a) && u !== l && (u != null || l != null))
            )
                if (a === "style")
                    if (l) {
                        for (o in l)
                            !l.hasOwnProperty(o) ||
                                (u && u.hasOwnProperty(o)) ||
                                (n || (n = {}), (n[o] = ""));
                        for (o in u)
                            u.hasOwnProperty(o) &&
                                l[o] !== u[o] &&
                                (n || (n = {}), (n[o] = u[o]));
                    } else n || (s || (s = []), s.push(a, n)), (n = u);
                else
                    a === "dangerouslySetInnerHTML"
                        ? ((u = u ? u.__html : void 0),
                          (l = l ? l.__html : void 0),
                          u != null && l !== u && (s = s || []).push(a, u))
                        : a === "children"
                        ? (typeof u != "string" && typeof u != "number") ||
                          (s = s || []).push(a, "" + u)
                        : a !== "suppressContentEditableWarning" &&
                          a !== "suppressHydrationWarning" &&
                          (ar.hasOwnProperty(a)
                              ? (u != null &&
                                    a === "onScroll" &&
                                    b("scroll", e),
                                s || l === u || (s = []))
                              : (s = s || []).push(a, u));
        }
        n && (s = s || []).push("style", n);
        var a = s;
        (t.updateQueue = a) && (t.flags |= 4);
    }
};
jf = function (e, t, n, r) {
    n !== r && (t.flags |= 4);
};
function Hn(e, t) {
    if (!K)
        switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null; )
                    t.alternate !== null && (n = t), (t = t.sibling);
                n === null ? (e.tail = null) : (n.sibling = null);
                break;
            case "collapsed":
                n = e.tail;
                for (var r = null; n !== null; )
                    n.alternate !== null && (r = n), (n = n.sibling);
                r === null
                    ? t || e.tail === null
                        ? (e.tail = null)
                        : (e.tail.sibling = null)
                    : (r.sibling = null);
        }
}
function ve(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var i = e.child; i !== null; )
            (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags & 14680064),
                (r |= i.flags & 14680064),
                (i.return = e),
                (i = i.sibling);
    else
        for (i = e.child; i !== null; )
            (n |= i.lanes | i.childLanes),
                (r |= i.subtreeFlags),
                (r |= i.flags),
                (i.return = e),
                (i = i.sibling);
    return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Wp(e, t, n) {
    var r = t.pendingProps;
    switch ((Sl(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return ve(t), null;
        case 1:
            return Te(t.type) && _i(), ve(t), null;
        case 3:
            return (
                (r = t.stateNode),
                Pn(),
                G(Ne),
                G(ge),
                Il(),
                r.pendingContext &&
                    ((r.context = r.pendingContext), (r.pendingContext = null)),
                (e === null || e.child === null) &&
                    (Yr(t)
                        ? (t.flags |= 4)
                        : e === null ||
                          (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                          ((t.flags |= 1024),
                          be !== null && ($o(be), (be = null)))),
                Fo(e, t),
                ve(t),
                null
            );
        case 5:
            Pl(t);
            var i = qt(wr.current);
            if (((n = t.type), e !== null && t.stateNode != null))
                Ff(e, t, n, r, i),
                    e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(O(166));
                    return ve(t), null;
                }
                if (((e = qt(tt.current)), Yr(t))) {
                    (r = t.stateNode), (n = t.type);
                    var s = t.memoizedProps;
                    switch (
                        ((r[Ze] = t), (r[xr] = s), (e = (t.mode & 1) !== 0), n)
                    ) {
                        case "dialog":
                            b("cancel", r), b("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            b("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (i = 0; i < Yn.length; i++) b(Yn[i], r);
                            break;
                        case "source":
                            b("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            b("error", r), b("load", r);
                            break;
                        case "details":
                            b("toggle", r);
                            break;
                        case "input":
                            fu(r, s), b("invalid", r);
                            break;
                        case "select":
                            (r._wrapperState = { wasMultiple: !!s.multiple }),
                                b("invalid", r);
                            break;
                        case "textarea":
                            hu(r, s), b("invalid", r);
                    }
                    lo(n, s), (i = null);
                    for (var o in s)
                        if (s.hasOwnProperty(o)) {
                            var l = s[o];
                            o === "children"
                                ? typeof l == "string"
                                    ? r.textContent !== l &&
                                      (s.suppressHydrationWarning !== !0 &&
                                          Kr(r.textContent, l, e),
                                      (i = ["children", l]))
                                    : typeof l == "number" &&
                                      r.textContent !== "" + l &&
                                      (s.suppressHydrationWarning !== !0 &&
                                          Kr(r.textContent, l, e),
                                      (i = ["children", "" + l]))
                                : ar.hasOwnProperty(o) &&
                                  l != null &&
                                  o === "onScroll" &&
                                  b("scroll", r);
                        }
                    switch (n) {
                        case "input":
                            Vr(r), du(r, s, !0);
                            break;
                        case "textarea":
                            Vr(r), pu(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof s.onClick == "function" && (r.onclick = Oi);
                    }
                    (r = i), (t.updateQueue = r), r !== null && (t.flags |= 4);
                } else {
                    (o = i.nodeType === 9 ? i : i.ownerDocument),
                        e === "http://www.w3.org/1999/xhtml" && (e = uc(n)),
                        e === "http://www.w3.org/1999/xhtml"
                            ? n === "script"
                                ? ((e = o.createElement("div")),
                                  (e.innerHTML = "<script></script>"),
                                  (e = e.removeChild(e.firstChild)))
                                : typeof r.is == "string"
                                ? (e = o.createElement(n, { is: r.is }))
                                : ((e = o.createElement(n)),
                                  n === "select" &&
                                      ((o = e),
                                      r.multiple
                                          ? (o.multiple = !0)
                                          : r.size && (o.size = r.size)))
                            : (e = o.createElementNS(e, n)),
                        (e[Ze] = t),
                        (e[xr] = r),
                        Lf(e, t, !1, !1),
                        (t.stateNode = e);
                    e: {
                        switch (((o = uo(n, r)), n)) {
                            case "dialog":
                                b("cancel", e), b("close", e), (i = r);
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                b("load", e), (i = r);
                                break;
                            case "video":
                            case "audio":
                                for (i = 0; i < Yn.length; i++) b(Yn[i], e);
                                i = r;
                                break;
                            case "source":
                                b("error", e), (i = r);
                                break;
                            case "img":
                            case "image":
                            case "link":
                                b("error", e), b("load", e), (i = r);
                                break;
                            case "details":
                                b("toggle", e), (i = r);
                                break;
                            case "input":
                                fu(e, r), (i = no(e, r)), b("invalid", e);
                                break;
                            case "option":
                                i = r;
                                break;
                            case "select":
                                (e._wrapperState = {
                                    wasMultiple: !!r.multiple,
                                }),
                                    (i = J({}, r, { value: void 0 })),
                                    b("invalid", e);
                                break;
                            case "textarea":
                                hu(e, r), (i = so(e, r)), b("invalid", e);
                                break;
                            default:
                                i = r;
                        }
                        lo(n, i), (l = i);
                        for (s in l)
                            if (l.hasOwnProperty(s)) {
                                var u = l[s];
                                s === "style"
                                    ? fc(e, u)
                                    : s === "dangerouslySetInnerHTML"
                                    ? ((u = u ? u.__html : void 0),
                                      u != null && ac(e, u))
                                    : s === "children"
                                    ? typeof u == "string"
                                        ? (n !== "textarea" || u !== "") &&
                                          cr(e, u)
                                        : typeof u == "number" && cr(e, "" + u)
                                    : s !== "suppressContentEditableWarning" &&
                                      s !== "suppressHydrationWarning" &&
                                      s !== "autoFocus" &&
                                      (ar.hasOwnProperty(s)
                                          ? u != null &&
                                            s === "onScroll" &&
                                            b("scroll", e)
                                          : u != null && ll(e, s, u, o));
                            }
                        switch (n) {
                            case "input":
                                Vr(e), du(e, r, !1);
                                break;
                            case "textarea":
                                Vr(e), pu(e);
                                break;
                            case "option":
                                r.value != null &&
                                    e.setAttribute("value", "" + At(r.value));
                                break;
                            case "select":
                                (e.multiple = !!r.multiple),
                                    (s = r.value),
                                    s != null
                                        ? En(e, !!r.multiple, s, !1)
                                        : r.defaultValue != null &&
                                          En(
                                              e,
                                              !!r.multiple,
                                              r.defaultValue,
                                              !0,
                                          );
                                break;
                            default:
                                typeof i.onClick == "function" &&
                                    (e.onclick = Oi);
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1;
                        }
                    }
                    r && (t.flags |= 4);
                }
                t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
            }
            return ve(t), null;
        case 6:
            if (e && t.stateNode != null) jf(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null)
                    throw Error(O(166));
                if (((n = qt(wr.current)), qt(tt.current), Yr(t))) {
                    if (
                        ((r = t.stateNode),
                        (n = t.memoizedProps),
                        (r[Ze] = t),
                        (s = r.nodeValue !== n) && ((e = Ie), e !== null))
                    )
                        switch (e.tag) {
                            case 3:
                                Kr(r.nodeValue, n, (e.mode & 1) !== 0);
                                break;
                            case 5:
                                e.memoizedProps.suppressHydrationWarning !==
                                    !0 &&
                                    Kr(r.nodeValue, n, (e.mode & 1) !== 0);
                        }
                    s && (t.flags |= 4);
                } else
                    (r = (
                        n.nodeType === 9 ? n : n.ownerDocument
                    ).createTextNode(r)),
                        (r[Ze] = t),
                        (t.stateNode = r);
            }
            return ve(t), null;
        case 13:
            if (
                (G(Y),
                (r = t.memoizedState),
                e === null ||
                    (e.memoizedState !== null &&
                        e.memoizedState.dehydrated !== null))
            ) {
                if (K && Pe !== null && t.mode & 1 && !(t.flags & 128))
                    Jc(), _n(), (t.flags |= 98560), (s = !1);
                else if (((s = Yr(t)), r !== null && r.dehydrated !== null)) {
                    if (e === null) {
                        if (!s) throw Error(O(318));
                        if (
                            ((s = t.memoizedState),
                            (s = s !== null ? s.dehydrated : null),
                            !s)
                        )
                            throw Error(O(317));
                        s[Ze] = t;
                    } else
                        _n(),
                            !(t.flags & 128) && (t.memoizedState = null),
                            (t.flags |= 4);
                    ve(t), (s = !1);
                } else be !== null && ($o(be), (be = null)), (s = !0);
                if (!s) return t.flags & 65536 ? t : null;
            }
            return t.flags & 128
                ? ((t.lanes = n), t)
                : ((r = r !== null),
                  r !== (e !== null && e.memoizedState !== null) &&
                      r &&
                      ((t.child.flags |= 8192),
                      t.mode & 1 &&
                          (e === null || Y.current & 1
                              ? ue === 0 && (ue = 3)
                              : $l())),
                  t.updateQueue !== null && (t.flags |= 4),
                  ve(t),
                  null);
        case 4:
            return (
                Pn(),
                Fo(e, t),
                e === null && yr(t.stateNode.containerInfo),
                ve(t),
                null
            );
        case 10:
            return Tl(t.type._context), ve(t), null;
        case 17:
            return Te(t.type) && _i(), ve(t), null;
        case 19:
            if ((G(Y), (s = t.memoizedState), s === null)) return ve(t), null;
            if (((r = (t.flags & 128) !== 0), (o = s.rendering), o === null))
                if (r) Hn(s, !1);
                else {
                    if (ue !== 0 || (e !== null && e.flags & 128))
                        for (e = t.child; e !== null; ) {
                            if (((o = Fi(e)), o !== null)) {
                                for (
                                    t.flags |= 128,
                                        Hn(s, !1),
                                        r = o.updateQueue,
                                        r !== null &&
                                            ((t.updateQueue = r),
                                            (t.flags |= 4)),
                                        t.subtreeFlags = 0,
                                        r = n,
                                        n = t.child;
                                    n !== null;

                                )
                                    (s = n),
                                        (e = r),
                                        (s.flags &= 14680066),
                                        (o = s.alternate),
                                        o === null
                                            ? ((s.childLanes = 0),
                                              (s.lanes = e),
                                              (s.child = null),
                                              (s.subtreeFlags = 0),
                                              (s.memoizedProps = null),
                                              (s.memoizedState = null),
                                              (s.updateQueue = null),
                                              (s.dependencies = null),
                                              (s.stateNode = null))
                                            : ((s.childLanes = o.childLanes),
                                              (s.lanes = o.lanes),
                                              (s.child = o.child),
                                              (s.subtreeFlags = 0),
                                              (s.deletions = null),
                                              (s.memoizedProps =
                                                  o.memoizedProps),
                                              (s.memoizedState =
                                                  o.memoizedState),
                                              (s.updateQueue = o.updateQueue),
                                              (s.type = o.type),
                                              (e = o.dependencies),
                                              (s.dependencies =
                                                  e === null
                                                      ? null
                                                      : {
                                                            lanes: e.lanes,
                                                            firstContext:
                                                                e.firstContext,
                                                        })),
                                        (n = n.sibling);
                                return W(Y, (Y.current & 1) | 2), t.child;
                            }
                            e = e.sibling;
                        }
                    s.tail !== null &&
                        te() > Dn &&
                        ((t.flags |= 128),
                        (r = !0),
                        Hn(s, !1),
                        (t.lanes = 4194304));
                }
            else {
                if (!r)
                    if (((e = Fi(o)), e !== null)) {
                        if (
                            ((t.flags |= 128),
                            (r = !0),
                            (n = e.updateQueue),
                            n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                            Hn(s, !0),
                            s.tail === null &&
                                s.tailMode === "hidden" &&
                                !o.alternate &&
                                !K)
                        )
                            return ve(t), null;
                    } else
                        2 * te() - s.renderingStartTime > Dn &&
                            n !== 1073741824 &&
                            ((t.flags |= 128),
                            (r = !0),
                            Hn(s, !1),
                            (t.lanes = 4194304));
                s.isBackwards
                    ? ((o.sibling = t.child), (t.child = o))
                    : ((n = s.last),
                      n !== null ? (n.sibling = o) : (t.child = o),
                      (s.last = o));
            }
            return s.tail !== null
                ? ((t = s.tail),
                  (s.rendering = t),
                  (s.tail = t.sibling),
                  (s.renderingStartTime = te()),
                  (t.sibling = null),
                  (n = Y.current),
                  W(Y, r ? (n & 1) | 2 : n & 1),
                  t)
                : (ve(t), null);
        case 22:
        case 23:
            return (
                Ql(),
                (r = t.memoizedState !== null),
                e !== null &&
                    (e.memoizedState !== null) !== r &&
                    (t.flags |= 8192),
                r && t.mode & 1
                    ? Re & 1073741824 &&
                      (ve(t), t.subtreeFlags & 6 && (t.flags |= 8192))
                    : ve(t),
                null
            );
        case 24:
            return null;
        case 25:
            return null;
    }
    throw Error(O(156, t.tag));
}
function bp(e, t) {
    switch ((Sl(t), t.tag)) {
        case 1:
            return (
                Te(t.type) && _i(),
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 3:
            return (
                Pn(),
                G(Ne),
                G(ge),
                Il(),
                (e = t.flags),
                e & 65536 && !(e & 128)
                    ? ((t.flags = (e & -65537) | 128), t)
                    : null
            );
        case 5:
            return Pl(t), null;
        case 13:
            if (
                (G(Y),
                (e = t.memoizedState),
                e !== null && e.dehydrated !== null)
            ) {
                if (t.alternate === null) throw Error(O(340));
                _n();
            }
            return (
                (e = t.flags),
                e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
            );
        case 19:
            return G(Y), null;
        case 4:
            return Pn(), null;
        case 10:
            return Tl(t.type._context), null;
        case 22:
        case 23:
            return Ql(), null;
        case 24:
            return null;
        default:
            return null;
    }
}
var Zr = !1,
    ye = !1,
    Gp = typeof WeakSet == "function" ? WeakSet : Set,
    A = null;
function yn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null);
            } catch (r) {
                ee(e, t, r);
            }
        else n.current = null;
}
function jo(e, t, n) {
    try {
        n();
    } catch (r) {
        ee(e, t, r);
    }
}
var ra = !1;
function Kp(e, t) {
    if (((xo = ki), (e = zc()), El(e))) {
        if ("selectionStart" in e)
            var n = { start: e.selectionStart, end: e.selectionEnd };
        else
            e: {
                n = ((n = e.ownerDocument) && n.defaultView) || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var i = r.anchorOffset,
                        s = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType, s.nodeType;
                    } catch {
                        n = null;
                        break e;
                    }
                    var o = 0,
                        l = -1,
                        u = -1,
                        a = 0,
                        c = 0,
                        h = e,
                        m = null;
                    t: for (;;) {
                        for (
                            var y;
                            h !== n ||
                                (i !== 0 && h.nodeType !== 3) ||
                                (l = o + i),
                                h !== s ||
                                    (r !== 0 && h.nodeType !== 3) ||
                                    (u = o + r),
                                h.nodeType === 3 && (o += h.nodeValue.length),
                                (y = h.firstChild) !== null;

                        )
                            (m = h), (h = y);
                        for (;;) {
                            if (h === e) break t;
                            if (
                                (m === n && ++a === i && (l = o),
                                m === s && ++c === r && (u = o),
                                (y = h.nextSibling) !== null)
                            )
                                break;
                            (h = m), (m = h.parentNode);
                        }
                        h = y;
                    }
                    n = l === -1 || u === -1 ? null : { start: l, end: u };
                } else n = null;
            }
        n = n || { start: 0, end: 0 };
    } else n = null;
    for (
        Eo = { focusedElem: e, selectionRange: n }, ki = !1, A = t;
        A !== null;

    )
        if (
            ((t = A),
            (e = t.child),
            (t.subtreeFlags & 1028) !== 0 && e !== null)
        )
            (e.return = t), (A = e);
        else
            for (; A !== null; ) {
                t = A;
                try {
                    var v = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                            case 0:
                            case 11:
                            case 15:
                                break;
                            case 1:
                                if (v !== null) {
                                    var g = v.memoizedProps,
                                        C = v.memoizedState,
                                        d = t.stateNode,
                                        f = d.getSnapshotBeforeUpdate(
                                            t.elementType === t.type
                                                ? g
                                                : He(t.type, g),
                                            C,
                                        );
                                    d.__reactInternalSnapshotBeforeUpdate = f;
                                }
                                break;
                            case 3:
                                var p = t.stateNode.containerInfo;
                                p.nodeType === 1
                                    ? (p.textContent = "")
                                    : p.nodeType === 9 &&
                                      p.documentElement &&
                                      p.removeChild(p.documentElement);
                                break;
                            case 5:
                            case 6:
                            case 4:
                            case 17:
                                break;
                            default:
                                throw Error(O(163));
                        }
                } catch (E) {
                    ee(t, t.return, E);
                }
                if (((e = t.sibling), e !== null)) {
                    (e.return = t.return), (A = e);
                    break;
                }
                A = t.return;
            }
    return (v = ra), (ra = !1), v;
}
function sr(e, t, n) {
    var r = t.updateQueue;
    if (((r = r !== null ? r.lastEffect : null), r !== null)) {
        var i = (r = r.next);
        do {
            if ((i.tag & e) === e) {
                var s = i.destroy;
                (i.destroy = void 0), s !== void 0 && jo(t, n, s);
            }
            i = i.next;
        } while (i !== r);
    }
}
function os(e, t) {
    if (
        ((t = t.updateQueue),
        (t = t !== null ? t.lastEffect : null),
        t !== null)
    ) {
        var n = (t = t.next);
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
            }
            n = n.next;
        } while (n !== t);
    }
}
function Mo(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n;
        }
        typeof t == "function" ? t(e) : (t.current = e);
    }
}
function Mf(e) {
    var t = e.alternate;
    t !== null && ((e.alternate = null), Mf(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
            ((t = e.stateNode),
            t !== null &&
                (delete t[Ze],
                delete t[xr],
                delete t[Co],
                delete t[Ip],
                delete t[Dp])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null);
}
function Uf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ia(e) {
    e: for (;;) {
        for (; e.sibling === null; ) {
            if (e.return === null || Uf(e.return)) return null;
            e = e.return;
        }
        for (
            e.sibling.return = e.return, e = e.sibling;
            e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

        ) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            (e.child.return = e), (e = e.child);
        }
        if (!(e.flags & 2)) return e.stateNode;
    }
}
function Uo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode),
            t
                ? n.nodeType === 8
                    ? n.parentNode.insertBefore(e, t)
                    : n.insertBefore(e, t)
                : (n.nodeType === 8
                      ? ((t = n.parentNode), t.insertBefore(e, n))
                      : ((t = n), t.appendChild(e)),
                  (n = n._reactRootContainer),
                  n != null || t.onclick !== null || (t.onclick = Oi));
    else if (r !== 4 && ((e = e.child), e !== null))
        for (Uo(e, t, n), e = e.sibling; e !== null; )
            Uo(e, t, n), (e = e.sibling);
}
function zo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && ((e = e.child), e !== null))
        for (zo(e, t, n), e = e.sibling; e !== null; )
            zo(e, t, n), (e = e.sibling);
}
var de = null,
    We = !1;
function pt(e, t, n) {
    for (n = n.child; n !== null; ) zf(e, t, n), (n = n.sibling);
}
function zf(e, t, n) {
    if (et && typeof et.onCommitFiberUnmount == "function")
        try {
            et.onCommitFiberUnmount(Ji, n);
        } catch {}
    switch (n.tag) {
        case 5:
            ye || yn(n, t);
        case 6:
            var r = de,
                i = We;
            (de = null),
                pt(e, t, n),
                (de = r),
                (We = i),
                de !== null &&
                    (We
                        ? ((e = de),
                          (n = n.stateNode),
                          e.nodeType === 8
                              ? e.parentNode.removeChild(n)
                              : e.removeChild(n))
                        : de.removeChild(n.stateNode));
            break;
        case 18:
            de !== null &&
                (We
                    ? ((e = de),
                      (n = n.stateNode),
                      e.nodeType === 8
                          ? Fs(e.parentNode, n)
                          : e.nodeType === 1 && Fs(e, n),
                      pr(e))
                    : Fs(de, n.stateNode));
            break;
        case 4:
            (r = de),
                (i = We),
                (de = n.stateNode.containerInfo),
                (We = !0),
                pt(e, t, n),
                (de = r),
                (We = i);
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (
                !ye &&
                ((r = n.updateQueue),
                r !== null && ((r = r.lastEffect), r !== null))
            ) {
                i = r = r.next;
                do {
                    var s = i,
                        o = s.destroy;
                    (s = s.tag),
                        o !== void 0 && (s & 2 || s & 4) && jo(n, t, o),
                        (i = i.next);
                } while (i !== r);
            }
            pt(e, t, n);
            break;
        case 1:
            if (
                !ye &&
                (yn(n, t),
                (r = n.stateNode),
                typeof r.componentWillUnmount == "function")
            )
                try {
                    (r.props = n.memoizedProps),
                        (r.state = n.memoizedState),
                        r.componentWillUnmount();
                } catch (l) {
                    ee(n, t, l);
                }
            pt(e, t, n);
            break;
        case 21:
            pt(e, t, n);
            break;
        case 22:
            n.mode & 1
                ? ((ye = (r = ye) || n.memoizedState !== null),
                  pt(e, t, n),
                  (ye = r))
                : pt(e, t, n);
            break;
        default:
            pt(e, t, n);
    }
}
function sa(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Gp()),
            t.forEach(function (r) {
                var i = i0.bind(null, e, r);
                n.has(r) || (n.add(r), r.then(i, i));
            });
    }
}
function $e(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var s = e,
                    o = t,
                    l = o;
                e: for (; l !== null; ) {
                    switch (l.tag) {
                        case 5:
                            (de = l.stateNode), (We = !1);
                            break e;
                        case 3:
                            (de = l.stateNode.containerInfo), (We = !0);
                            break e;
                        case 4:
                            (de = l.stateNode.containerInfo), (We = !0);
                            break e;
                    }
                    l = l.return;
                }
                if (de === null) throw Error(O(160));
                zf(s, o, i), (de = null), (We = !1);
                var u = i.alternate;
                u !== null && (u.return = null), (i.return = null);
            } catch (a) {
                ee(i, t, a);
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; ) Bf(t, e), (t = t.sibling);
}
function Bf(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (($e(t, e), Xe(e), r & 4)) {
                try {
                    sr(3, e, e.return), os(3, e);
                } catch (g) {
                    ee(e, e.return, g);
                }
                try {
                    sr(5, e, e.return);
                } catch (g) {
                    ee(e, e.return, g);
                }
            }
            break;
        case 1:
            $e(t, e), Xe(e), r & 512 && n !== null && yn(n, n.return);
            break;
        case 5:
            if (
                ($e(t, e),
                Xe(e),
                r & 512 && n !== null && yn(n, n.return),
                e.flags & 32)
            ) {
                var i = e.stateNode;
                try {
                    cr(i, "");
                } catch (g) {
                    ee(e, e.return, g);
                }
            }
            if (r & 4 && ((i = e.stateNode), i != null)) {
                var s = e.memoizedProps,
                    o = n !== null ? n.memoizedProps : s,
                    l = e.type,
                    u = e.updateQueue;
                if (((e.updateQueue = null), u !== null))
                    try {
                        l === "input" &&
                            s.type === "radio" &&
                            s.name != null &&
                            oc(i, s),
                            uo(l, o);
                        var a = uo(l, s);
                        for (o = 0; o < u.length; o += 2) {
                            var c = u[o],
                                h = u[o + 1];
                            c === "style"
                                ? fc(i, h)
                                : c === "dangerouslySetInnerHTML"
                                ? ac(i, h)
                                : c === "children"
                                ? cr(i, h)
                                : ll(i, c, h, a);
                        }
                        switch (l) {
                            case "input":
                                ro(i, s);
                                break;
                            case "textarea":
                                lc(i, s);
                                break;
                            case "select":
                                var m = i._wrapperState.wasMultiple;
                                i._wrapperState.wasMultiple = !!s.multiple;
                                var y = s.value;
                                y != null
                                    ? En(i, !!s.multiple, y, !1)
                                    : m !== !!s.multiple &&
                                      (s.defaultValue != null
                                          ? En(
                                                i,
                                                !!s.multiple,
                                                s.defaultValue,
                                                !0,
                                            )
                                          : En(
                                                i,
                                                !!s.multiple,
                                                s.multiple ? [] : "",
                                                !1,
                                            ));
                        }
                        i[xr] = s;
                    } catch (g) {
                        ee(e, e.return, g);
                    }
            }
            break;
        case 6:
            if (($e(t, e), Xe(e), r & 4)) {
                if (e.stateNode === null) throw Error(O(162));
                (i = e.stateNode), (s = e.memoizedProps);
                try {
                    i.nodeValue = s;
                } catch (g) {
                    ee(e, e.return, g);
                }
            }
            break;
        case 3:
            if (
                ($e(t, e),
                Xe(e),
                r & 4 && n !== null && n.memoizedState.isDehydrated)
            )
                try {
                    pr(t.containerInfo);
                } catch (g) {
                    ee(e, e.return, g);
                }
            break;
        case 4:
            $e(t, e), Xe(e);
            break;
        case 13:
            $e(t, e),
                Xe(e),
                (i = e.child),
                i.flags & 8192 &&
                    ((s = i.memoizedState !== null),
                    (i.stateNode.isHidden = s),
                    !s ||
                        (i.alternate !== null &&
                            i.alternate.memoizedState !== null) ||
                        (Bl = te())),
                r & 4 && sa(e);
            break;
        case 22:
            if (
                ((c = n !== null && n.memoizedState !== null),
                e.mode & 1
                    ? ((ye = (a = ye) || c), $e(t, e), (ye = a))
                    : $e(t, e),
                Xe(e),
                r & 8192)
            ) {
                if (
                    ((a = e.memoizedState !== null),
                    (e.stateNode.isHidden = a) && !c && e.mode & 1)
                )
                    for (A = e, c = e.child; c !== null; ) {
                        for (h = A = c; A !== null; ) {
                            switch (((m = A), (y = m.child), m.tag)) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    sr(4, m, m.return);
                                    break;
                                case 1:
                                    yn(m, m.return);
                                    var v = m.stateNode;
                                    if (
                                        typeof v.componentWillUnmount ==
                                        "function"
                                    ) {
                                        (r = m), (n = m.return);
                                        try {
                                            (t = r),
                                                (v.props = t.memoizedProps),
                                                (v.state = t.memoizedState),
                                                v.componentWillUnmount();
                                        } catch (g) {
                                            ee(r, n, g);
                                        }
                                    }
                                    break;
                                case 5:
                                    yn(m, m.return);
                                    break;
                                case 22:
                                    if (m.memoizedState !== null) {
                                        la(h);
                                        continue;
                                    }
                            }
                            y !== null ? ((y.return = m), (A = y)) : la(h);
                        }
                        c = c.sibling;
                    }
                e: for (c = null, h = e; ; ) {
                    if (h.tag === 5) {
                        if (c === null) {
                            c = h;
                            try {
                                (i = h.stateNode),
                                    a
                                        ? ((s = i.style),
                                          typeof s.setProperty == "function"
                                              ? s.setProperty(
                                                    "display",
                                                    "none",
                                                    "important",
                                                )
                                              : (s.display = "none"))
                                        : ((l = h.stateNode),
                                          (u = h.memoizedProps.style),
                                          (o =
                                              u != null &&
                                              u.hasOwnProperty("display")
                                                  ? u.display
                                                  : null),
                                          (l.style.display = cc("display", o)));
                            } catch (g) {
                                ee(e, e.return, g);
                            }
                        }
                    } else if (h.tag === 6) {
                        if (c === null)
                            try {
                                h.stateNode.nodeValue = a
                                    ? ""
                                    : h.memoizedProps;
                            } catch (g) {
                                ee(e, e.return, g);
                            }
                    } else if (
                        ((h.tag !== 22 && h.tag !== 23) ||
                            h.memoizedState === null ||
                            h === e) &&
                        h.child !== null
                    ) {
                        (h.child.return = h), (h = h.child);
                        continue;
                    }
                    if (h === e) break e;
                    for (; h.sibling === null; ) {
                        if (h.return === null || h.return === e) break e;
                        c === h && (c = null), (h = h.return);
                    }
                    c === h && (c = null),
                        (h.sibling.return = h.return),
                        (h = h.sibling);
                }
            }
            break;
        case 19:
            $e(t, e), Xe(e), r & 4 && sa(e);
            break;
        case 21:
            break;
        default:
            $e(t, e), Xe(e);
    }
}
function Xe(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Uf(n)) {
                        var r = n;
                        break e;
                    }
                    n = n.return;
                }
                throw Error(O(160));
            }
            switch (r.tag) {
                case 5:
                    var i = r.stateNode;
                    r.flags & 32 && (cr(i, ""), (r.flags &= -33));
                    var s = ia(e);
                    zo(e, s, i);
                    break;
                case 3:
                case 4:
                    var o = r.stateNode.containerInfo,
                        l = ia(e);
                    Uo(e, l, o);
                    break;
                default:
                    throw Error(O(161));
            }
        } catch (u) {
            ee(e, e.return, u);
        }
        e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
}
function Yp(e, t, n) {
    (A = e), Vf(e);
}
function Vf(e, t, n) {
    for (var r = (e.mode & 1) !== 0; A !== null; ) {
        var i = A,
            s = i.child;
        if (i.tag === 22 && r) {
            var o = i.memoizedState !== null || Zr;
            if (!o) {
                var l = i.alternate,
                    u = (l !== null && l.memoizedState !== null) || ye;
                l = Zr;
                var a = ye;
                if (((Zr = o), (ye = u) && !a))
                    for (A = i; A !== null; )
                        (o = A),
                            (u = o.child),
                            o.tag === 22 && o.memoizedState !== null
                                ? ua(i)
                                : u !== null
                                ? ((u.return = o), (A = u))
                                : ua(i);
                for (; s !== null; ) (A = s), Vf(s), (s = s.sibling);
                (A = i), (Zr = l), (ye = a);
            }
            oa(e);
        } else
            i.subtreeFlags & 8772 && s !== null
                ? ((s.return = i), (A = s))
                : oa(e);
    }
}
function oa(e) {
    for (; A !== null; ) {
        var t = A;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            ye || os(5, t);
                            break;
                        case 1:
                            var r = t.stateNode;
                            if (t.flags & 4 && !ye)
                                if (n === null) r.componentDidMount();
                                else {
                                    var i =
                                        t.elementType === t.type
                                            ? n.memoizedProps
                                            : He(t.type, n.memoizedProps);
                                    r.componentDidUpdate(
                                        i,
                                        n.memoizedState,
                                        r.__reactInternalSnapshotBeforeUpdate,
                                    );
                                }
                            var s = t.updateQueue;
                            s !== null && $u(t, s, r);
                            break;
                        case 3:
                            var o = t.updateQueue;
                            if (o !== null) {
                                if (((n = null), t.child !== null))
                                    switch (t.child.tag) {
                                        case 5:
                                            n = t.child.stateNode;
                                            break;
                                        case 1:
                                            n = t.child.stateNode;
                                    }
                                $u(t, o, n);
                            }
                            break;
                        case 5:
                            var l = t.stateNode;
                            if (n === null && t.flags & 4) {
                                n = l;
                                var u = t.memoizedProps;
                                switch (t.type) {
                                    case "button":
                                    case "input":
                                    case "select":
                                    case "textarea":
                                        u.autoFocus && n.focus();
                                        break;
                                    case "img":
                                        u.src && (n.src = u.src);
                                }
                            }
                            break;
                        case 6:
                            break;
                        case 4:
                            break;
                        case 12:
                            break;
                        case 13:
                            if (t.memoizedState === null) {
                                var a = t.alternate;
                                if (a !== null) {
                                    var c = a.memoizedState;
                                    if (c !== null) {
                                        var h = c.dehydrated;
                                        h !== null && pr(h);
                                    }
                                }
                            }
                            break;
                        case 19:
                        case 17:
                        case 21:
                        case 22:
                        case 23:
                        case 25:
                            break;
                        default:
                            throw Error(O(163));
                    }
                ye || (t.flags & 512 && Mo(t));
            } catch (m) {
                ee(t, t.return, m);
            }
        }
        if (t === e) {
            A = null;
            break;
        }
        if (((n = t.sibling), n !== null)) {
            (n.return = t.return), (A = n);
            break;
        }
        A = t.return;
    }
}
function la(e) {
    for (; A !== null; ) {
        var t = A;
        if (t === e) {
            A = null;
            break;
        }
        var n = t.sibling;
        if (n !== null) {
            (n.return = t.return), (A = n);
            break;
        }
        A = t.return;
    }
}
function ua(e) {
    for (; A !== null; ) {
        var t = A;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        os(4, t);
                    } catch (u) {
                        ee(t, n, u);
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var i = t.return;
                        try {
                            r.componentDidMount();
                        } catch (u) {
                            ee(t, i, u);
                        }
                    }
                    var s = t.return;
                    try {
                        Mo(t);
                    } catch (u) {
                        ee(t, s, u);
                    }
                    break;
                case 5:
                    var o = t.return;
                    try {
                        Mo(t);
                    } catch (u) {
                        ee(t, o, u);
                    }
            }
        } catch (u) {
            ee(t, t.return, u);
        }
        if (t === e) {
            A = null;
            break;
        }
        var l = t.sibling;
        if (l !== null) {
            (l.return = t.return), (A = l);
            break;
        }
        A = t.return;
    }
}
var Xp = Math.ceil,
    Ui = ft.ReactCurrentDispatcher,
    Ul = ft.ReactCurrentOwner,
    ze = ft.ReactCurrentBatchConfig,
    Q = 0,
    fe = null,
    se = null,
    he = 0,
    Re = 0,
    gn = jt(0),
    ue = 0,
    Nr = null,
    Xt = 0,
    ls = 0,
    zl = 0,
    or = null,
    Ce = null,
    Bl = 0,
    Dn = 1 / 0,
    nt = null,
    zi = !1,
    Bo = null,
    Rt = null,
    ei = !1,
    St = null,
    Bi = 0,
    lr = 0,
    Vo = null,
    di = -1,
    hi = 0;
function Ee() {
    return Q & 6 ? te() : di !== -1 ? di : (di = te());
}
function Pt(e) {
    return e.mode & 1
        ? Q & 2 && he !== 0
            ? he & -he
            : Lp.transition !== null
            ? (hi === 0 && (hi = Cc()), hi)
            : ((e = $),
              e !== 0 ||
                  ((e = window.event), (e = e === void 0 ? 16 : Pc(e.type))),
              e)
        : 1;
}
function Ke(e, t, n, r) {
    if (50 < lr) throw ((lr = 0), (Vo = null), Error(O(185)));
    Pr(e, n, r),
        (!(Q & 2) || e !== fe) &&
            (e === fe && (!(Q & 2) && (ls |= n), ue === 4 && Et(e, he)),
            Oe(e, r),
            n === 1 &&
                Q === 0 &&
                !(t.mode & 1) &&
                ((Dn = te() + 500), rs && Mt()));
}
function Oe(e, t) {
    var n = e.callbackNode;
    Lh(e, t);
    var r = Ci(e, e === fe ? he : 0);
    if (r === 0)
        n !== null && yu(n), (e.callbackNode = null), (e.callbackPriority = 0);
    else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && yu(n), t === 1))
            e.tag === 0 ? Ap(aa.bind(null, e)) : Kc(aa.bind(null, e)),
                Rp(function () {
                    !(Q & 6) && Mt();
                }),
                (n = null);
        else {
            switch (kc(r)) {
                case 1:
                    n = dl;
                    break;
                case 4:
                    n = wc;
                    break;
                case 16:
                    n = Si;
                    break;
                case 536870912:
                    n = Sc;
                    break;
                default:
                    n = Si;
            }
            n = Kf(n, Qf.bind(null, e));
        }
        (e.callbackPriority = t), (e.callbackNode = n);
    }
}
function Qf(e, t) {
    if (((di = -1), (hi = 0), Q & 6)) throw Error(O(327));
    var n = e.callbackNode;
    if (Nn() && e.callbackNode !== n) return null;
    var r = Ci(e, e === fe ? he : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = Vi(e, r);
    else {
        t = r;
        var i = Q;
        Q |= 2;
        var s = qf();
        (fe !== e || he !== t) && ((nt = null), (Dn = te() + 500), Wt(e, t));
        do
            try {
                e0();
                break;
            } catch (l) {
                $f(e, l);
            }
        while (1);
        Nl(),
            (Ui.current = s),
            (Q = i),
            se !== null ? (t = 0) : ((fe = null), (he = 0), (t = ue));
    }
    if (t !== 0) {
        if (
            (t === 2 && ((i = po(e)), i !== 0 && ((r = i), (t = Qo(e, i)))),
            t === 1)
        )
            throw ((n = Nr), Wt(e, 0), Et(e, r), Oe(e, te()), n);
        if (t === 6) Et(e, r);
        else {
            if (
                ((i = e.current.alternate),
                !(r & 30) &&
                    !Jp(i) &&
                    ((t = Vi(e, r)),
                    t === 2 &&
                        ((s = po(e)), s !== 0 && ((r = s), (t = Qo(e, s)))),
                    t === 1))
            )
                throw ((n = Nr), Wt(e, 0), Et(e, r), Oe(e, te()), n);
            switch (((e.finishedWork = i), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                    throw Error(O(345));
                case 2:
                    Vt(e, Ce, nt);
                    break;
                case 3:
                    if (
                        (Et(e, r),
                        (r & 130023424) === r &&
                            ((t = Bl + 500 - te()), 10 < t))
                    ) {
                        if (Ci(e, 0) !== 0) break;
                        if (((i = e.suspendedLanes), (i & r) !== r)) {
                            Ee(), (e.pingedLanes |= e.suspendedLanes & i);
                            break;
                        }
                        e.timeoutHandle = So(Vt.bind(null, e, Ce, nt), t);
                        break;
                    }
                    Vt(e, Ce, nt);
                    break;
                case 4:
                    if ((Et(e, r), (r & 4194240) === r)) break;
                    for (t = e.eventTimes, i = -1; 0 < r; ) {
                        var o = 31 - Ge(r);
                        (s = 1 << o), (o = t[o]), o > i && (i = o), (r &= ~s);
                    }
                    if (
                        ((r = i),
                        (r = te() - r),
                        (r =
                            (120 > r
                                ? 120
                                : 480 > r
                                ? 480
                                : 1080 > r
                                ? 1080
                                : 1920 > r
                                ? 1920
                                : 3e3 > r
                                ? 3e3
                                : 4320 > r
                                ? 4320
                                : 1960 * Xp(r / 1960)) - r),
                        10 < r)
                    ) {
                        e.timeoutHandle = So(Vt.bind(null, e, Ce, nt), r);
                        break;
                    }
                    Vt(e, Ce, nt);
                    break;
                case 5:
                    Vt(e, Ce, nt);
                    break;
                default:
                    throw Error(O(329));
            }
        }
    }
    return Oe(e, te()), e.callbackNode === n ? Qf.bind(null, e) : null;
}
function Qo(e, t) {
    var n = or;
    return (
        e.current.memoizedState.isDehydrated && (Wt(e, t).flags |= 256),
        (e = Vi(e, t)),
        e !== 2 && ((t = Ce), (Ce = n), t !== null && $o(t)),
        e
    );
}
function $o(e) {
    Ce === null ? (Ce = e) : Ce.push.apply(Ce, e);
}
function Jp(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && ((n = n.stores), n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        s = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!Ye(s(), i)) return !1;
                    } catch {
                        return !1;
                    }
                }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
            (n.return = t), (t = n);
        else {
            if (t === e) break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e) return !0;
                t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
        }
    }
    return !0;
}
function Et(e, t) {
    for (
        t &= ~zl,
            t &= ~ls,
            e.suspendedLanes |= t,
            e.pingedLanes &= ~t,
            e = e.expirationTimes;
        0 < t;

    ) {
        var n = 31 - Ge(t),
            r = 1 << n;
        (e[n] = -1), (t &= ~r);
    }
}
function aa(e) {
    if (Q & 6) throw Error(O(327));
    Nn();
    var t = Ci(e, 0);
    if (!(t & 1)) return Oe(e, te()), null;
    var n = Vi(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = po(e);
        r !== 0 && ((t = r), (n = Qo(e, r)));
    }
    if (n === 1) throw ((n = Nr), Wt(e, 0), Et(e, t), Oe(e, te()), n);
    if (n === 6) throw Error(O(345));
    return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        Vt(e, Ce, nt),
        Oe(e, te()),
        null
    );
}
function Vl(e, t) {
    var n = Q;
    Q |= 1;
    try {
        return e(t);
    } finally {
        (Q = n), Q === 0 && ((Dn = te() + 500), rs && Mt());
    }
}
function Jt(e) {
    St !== null && St.tag === 0 && !(Q & 6) && Nn();
    var t = Q;
    Q |= 1;
    var n = ze.transition,
        r = $;
    try {
        if (((ze.transition = null), ($ = 1), e)) return e();
    } finally {
        ($ = r), (ze.transition = n), (Q = t), !(Q & 6) && Mt();
    }
}
function Ql() {
    (Re = gn.current), G(gn);
}
function Wt(e, t) {
    (e.finishedWork = null), (e.finishedLanes = 0);
    var n = e.timeoutHandle;
    if ((n !== -1 && ((e.timeoutHandle = -1), _p(n)), se !== null))
        for (n = se.return; n !== null; ) {
            var r = n;
            switch ((Sl(r), r.tag)) {
                case 1:
                    (r = r.type.childContextTypes), r != null && _i();
                    break;
                case 3:
                    Pn(), G(Ne), G(ge), Il();
                    break;
                case 5:
                    Pl(r);
                    break;
                case 4:
                    Pn();
                    break;
                case 13:
                    G(Y);
                    break;
                case 19:
                    G(Y);
                    break;
                case 10:
                    Tl(r.type._context);
                    break;
                case 22:
                case 23:
                    Ql();
            }
            n = n.return;
        }
    if (
        ((fe = e),
        (se = e = It(e.current, null)),
        (he = Re = t),
        (ue = 0),
        (Nr = null),
        (zl = ls = Xt = 0),
        (Ce = or = null),
        $t !== null)
    ) {
        for (t = 0; t < $t.length; t++)
            if (((n = $t[t]), (r = n.interleaved), r !== null)) {
                n.interleaved = null;
                var i = r.next,
                    s = n.pending;
                if (s !== null) {
                    var o = s.next;
                    (s.next = i), (r.next = o);
                }
                n.pending = r;
            }
        $t = null;
    }
    return e;
}
function $f(e, t) {
    do {
        var n = se;
        try {
            if ((Nl(), (ai.current = Mi), ji)) {
                for (var r = X.memoizedState; r !== null; ) {
                    var i = r.queue;
                    i !== null && (i.pending = null), (r = r.next);
                }
                ji = !1;
            }
            if (
                ((Yt = 0),
                (ae = le = X = null),
                (ir = !1),
                (Sr = 0),
                (Ul.current = null),
                n === null || n.return === null)
            ) {
                (ue = 1), (Nr = t), (se = null);
                break;
            }
            e: {
                var s = e,
                    o = n.return,
                    l = n,
                    u = t;
                if (
                    ((t = he),
                    (l.flags |= 32768),
                    u !== null &&
                        typeof u == "object" &&
                        typeof u.then == "function")
                ) {
                    var a = u,
                        c = l,
                        h = c.tag;
                    if (!(c.mode & 1) && (h === 0 || h === 11 || h === 15)) {
                        var m = c.alternate;
                        m
                            ? ((c.updateQueue = m.updateQueue),
                              (c.memoizedState = m.memoizedState),
                              (c.lanes = m.lanes))
                            : ((c.updateQueue = null),
                              (c.memoizedState = null));
                    }
                    var y = Yu(o);
                    if (y !== null) {
                        (y.flags &= -257),
                            Xu(y, o, l, s, t),
                            y.mode & 1 && Ku(s, a, t),
                            (t = y),
                            (u = a);
                        var v = t.updateQueue;
                        if (v === null) {
                            var g = new Set();
                            g.add(u), (t.updateQueue = g);
                        } else v.add(u);
                        break e;
                    } else {
                        if (!(t & 1)) {
                            Ku(s, a, t), $l();
                            break e;
                        }
                        u = Error(O(426));
                    }
                } else if (K && l.mode & 1) {
                    var C = Yu(o);
                    if (C !== null) {
                        !(C.flags & 65536) && (C.flags |= 256),
                            Xu(C, o, l, s, t),
                            Cl(In(u, l));
                        break e;
                    }
                }
                (s = u = In(u, l)),
                    ue !== 4 && (ue = 2),
                    or === null ? (or = [s]) : or.push(s),
                    (s = o);
                do {
                    switch (s.tag) {
                        case 3:
                            (s.flags |= 65536), (t &= -t), (s.lanes |= t);
                            var d = Tf(s, u, t);
                            Qu(s, d);
                            break e;
                        case 1:
                            l = u;
                            var f = s.type,
                                p = s.stateNode;
                            if (
                                !(s.flags & 128) &&
                                (typeof f.getDerivedStateFromError ==
                                    "function" ||
                                    (p !== null &&
                                        typeof p.componentDidCatch ==
                                            "function" &&
                                        (Rt === null || !Rt.has(p))))
                            ) {
                                (s.flags |= 65536), (t &= -t), (s.lanes |= t);
                                var E = Of(s, l, t);
                                Qu(s, E);
                                break e;
                            }
                    }
                    s = s.return;
                } while (s !== null);
            }
            Wf(n);
        } catch (_) {
            (t = _), se === n && n !== null && (se = n = n.return);
            continue;
        }
        break;
    } while (1);
}
function qf() {
    var e = Ui.current;
    return (Ui.current = Mi), e === null ? Mi : e;
}
function $l() {
    (ue === 0 || ue === 3 || ue === 2) && (ue = 4),
        fe === null || (!(Xt & 268435455) && !(ls & 268435455)) || Et(fe, he);
}
function Vi(e, t) {
    var n = Q;
    Q |= 2;
    var r = qf();
    (fe !== e || he !== t) && ((nt = null), Wt(e, t));
    do
        try {
            Zp();
            break;
        } catch (i) {
            $f(e, i);
        }
    while (1);
    if ((Nl(), (Q = n), (Ui.current = r), se !== null)) throw Error(O(261));
    return (fe = null), (he = 0), ue;
}
function Zp() {
    for (; se !== null; ) Hf(se);
}
function e0() {
    for (; se !== null && !Nh(); ) Hf(se);
}
function Hf(e) {
    var t = Gf(e.alternate, e, Re);
    (e.memoizedProps = e.pendingProps),
        t === null ? Wf(e) : (se = t),
        (Ul.current = null);
}
function Wf(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
            if (((n = bp(n, t)), n !== null)) {
                (n.flags &= 32767), (se = n);
                return;
            }
            if (e !== null)
                (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            else {
                (ue = 6), (se = null);
                return;
            }
        } else if (((n = Wp(n, t, Re)), n !== null)) {
            se = n;
            return;
        }
        if (((t = t.sibling), t !== null)) {
            se = t;
            return;
        }
        se = t = e;
    } while (t !== null);
    ue === 0 && (ue = 5);
}
function Vt(e, t, n) {
    var r = $,
        i = ze.transition;
    try {
        (ze.transition = null), ($ = 1), t0(e, t, n, r);
    } finally {
        (ze.transition = i), ($ = r);
    }
    return null;
}
function t0(e, t, n, r) {
    do Nn();
    while (St !== null);
    if (Q & 6) throw Error(O(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
        throw Error(O(177));
    (e.callbackNode = null), (e.callbackPriority = 0);
    var s = n.lanes | n.childLanes;
    if (
        (Fh(e, s),
        e === fe && ((se = fe = null), (he = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
            ei ||
            ((ei = !0),
            Kf(Si, function () {
                return Nn(), null;
            })),
        (s = (n.flags & 15990) !== 0),
        n.subtreeFlags & 15990 || s)
    ) {
        (s = ze.transition), (ze.transition = null);
        var o = $;
        $ = 1;
        var l = Q;
        (Q |= 4),
            (Ul.current = null),
            Kp(e, n),
            Bf(n, e),
            wp(Eo),
            (ki = !!xo),
            (Eo = xo = null),
            (e.current = n),
            Yp(n),
            Th(),
            (Q = l),
            ($ = o),
            (ze.transition = s);
    } else e.current = n;
    if (
        (ei && ((ei = !1), (St = e), (Bi = i)),
        (s = e.pendingLanes),
        s === 0 && (Rt = null),
        Rh(n.stateNode),
        Oe(e, te()),
        t !== null)
    )
        for (r = e.onRecoverableError, n = 0; n < t.length; n++)
            (i = t[n]),
                r(i.value, { componentStack: i.stack, digest: i.digest });
    if (zi) throw ((zi = !1), (e = Bo), (Bo = null), e);
    return (
        Bi & 1 && e.tag !== 0 && Nn(),
        (s = e.pendingLanes),
        s & 1 ? (e === Vo ? lr++ : ((lr = 0), (Vo = e))) : (lr = 0),
        Mt(),
        null
    );
}
function Nn() {
    if (St !== null) {
        var e = kc(Bi),
            t = ze.transition,
            n = $;
        try {
            if (((ze.transition = null), ($ = 16 > e ? 16 : e), St === null))
                var r = !1;
            else {
                if (((e = St), (St = null), (Bi = 0), Q & 6))
                    throw Error(O(331));
                var i = Q;
                for (Q |= 4, A = e.current; A !== null; ) {
                    var s = A,
                        o = s.child;
                    if (A.flags & 16) {
                        var l = s.deletions;
                        if (l !== null) {
                            for (var u = 0; u < l.length; u++) {
                                var a = l[u];
                                for (A = a; A !== null; ) {
                                    var c = A;
                                    switch (c.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            sr(8, c, s);
                                    }
                                    var h = c.child;
                                    if (h !== null) (h.return = c), (A = h);
                                    else
                                        for (; A !== null; ) {
                                            c = A;
                                            var m = c.sibling,
                                                y = c.return;
                                            if ((Mf(c), c === a)) {
                                                A = null;
                                                break;
                                            }
                                            if (m !== null) {
                                                (m.return = y), (A = m);
                                                break;
                                            }
                                            A = y;
                                        }
                                }
                            }
                            var v = s.alternate;
                            if (v !== null) {
                                var g = v.child;
                                if (g !== null) {
                                    v.child = null;
                                    do {
                                        var C = g.sibling;
                                        (g.sibling = null), (g = C);
                                    } while (g !== null);
                                }
                            }
                            A = s;
                        }
                    }
                    if (s.subtreeFlags & 2064 && o !== null)
                        (o.return = s), (A = o);
                    else
                        e: for (; A !== null; ) {
                            if (((s = A), s.flags & 2048))
                                switch (s.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        sr(9, s, s.return);
                                }
                            var d = s.sibling;
                            if (d !== null) {
                                (d.return = s.return), (A = d);
                                break e;
                            }
                            A = s.return;
                        }
                }
                var f = e.current;
                for (A = f; A !== null; ) {
                    o = A;
                    var p = o.child;
                    if (o.subtreeFlags & 2064 && p !== null)
                        (p.return = o), (A = p);
                    else
                        e: for (o = f; A !== null; ) {
                            if (((l = A), l.flags & 2048))
                                try {
                                    switch (l.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            os(9, l);
                                    }
                                } catch (_) {
                                    ee(l, l.return, _);
                                }
                            if (l === o) {
                                A = null;
                                break e;
                            }
                            var E = l.sibling;
                            if (E !== null) {
                                (E.return = l.return), (A = E);
                                break e;
                            }
                            A = l.return;
                        }
                }
                if (
                    ((Q = i),
                    Mt(),
                    et && typeof et.onPostCommitFiberRoot == "function")
                )
                    try {
                        et.onPostCommitFiberRoot(Ji, e);
                    } catch {}
                r = !0;
            }
            return r;
        } finally {
            ($ = n), (ze.transition = t);
        }
    }
    return !1;
}
function ca(e, t, n) {
    (t = In(n, t)),
        (t = Tf(e, t, 1)),
        (e = _t(e, t, 1)),
        (t = Ee()),
        e !== null && (Pr(e, 1, t), Oe(e, t));
}
function ee(e, t, n) {
    if (e.tag === 3) ca(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                ca(t, e, n);
                break;
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (
                    typeof t.type.getDerivedStateFromError == "function" ||
                    (typeof r.componentDidCatch == "function" &&
                        (Rt === null || !Rt.has(r)))
                ) {
                    (e = In(n, e)),
                        (e = Of(t, e, 1)),
                        (t = _t(t, e, 1)),
                        (e = Ee()),
                        t !== null && (Pr(t, 1, e), Oe(t, e));
                    break;
                }
            }
            t = t.return;
        }
}
function n0(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
        (t = Ee()),
        (e.pingedLanes |= e.suspendedLanes & n),
        fe === e &&
            (he & n) === n &&
            (ue === 4 ||
            (ue === 3 && (he & 130023424) === he && 500 > te() - Bl)
                ? Wt(e, 0)
                : (zl |= n)),
        Oe(e, t);
}
function bf(e, t) {
    t === 0 &&
        (e.mode & 1
            ? ((t = qr), (qr <<= 1), !(qr & 130023424) && (qr = 4194304))
            : (t = 1));
    var n = Ee();
    (e = at(e, t)), e !== null && (Pr(e, t, n), Oe(e, n));
}
function r0(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), bf(e, n);
}
function i0(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                i = e.memoizedState;
            i !== null && (n = i.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(O(314));
    }
    r !== null && r.delete(t), bf(e, n);
}
var Gf;
Gf = function (e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Ne.current) ke = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return (ke = !1), Hp(e, t, n);
            ke = !!(e.flags & 131072);
        }
    else (ke = !1), K && t.flags & 1048576 && Yc(t, Ii, t.index);
    switch (((t.lanes = 0), t.tag)) {
        case 2:
            var r = t.type;
            fi(e, t), (e = t.pendingProps);
            var i = On(t, ge.current);
            kn(t, n), (i = Al(null, t, r, e, i, n));
            var s = Ll();
            return (
                (t.flags |= 1),
                typeof i == "object" &&
                i !== null &&
                typeof i.render == "function" &&
                i.$$typeof === void 0
                    ? ((t.tag = 1),
                      (t.memoizedState = null),
                      (t.updateQueue = null),
                      Te(r) ? ((s = !0), Ri(t)) : (s = !1),
                      (t.memoizedState =
                          i.state !== null && i.state !== void 0
                              ? i.state
                              : null),
                      _l(t),
                      (i.updater = is),
                      (t.stateNode = i),
                      (i._reactInternals = t),
                      Ro(t, r, e, n),
                      (t = Do(null, t, r, !0, s, n)))
                    : ((t.tag = 0),
                      K && s && wl(t),
                      xe(null, t, i, n),
                      (t = t.child)),
                t
            );
        case 16:
            r = t.elementType;
            e: {
                switch (
                    (fi(e, t),
                    (e = t.pendingProps),
                    (i = r._init),
                    (r = i(r._payload)),
                    (t.type = r),
                    (i = t.tag = o0(r)),
                    (e = He(r, e)),
                    i)
                ) {
                    case 0:
                        t = Io(null, t, r, e, n);
                        break e;
                    case 1:
                        t = ea(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Ju(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Zu(null, t, r, He(r.type, e), n);
                        break e;
                }
                throw Error(O(306, r, ""));
            }
            return t;
        case 0:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : He(r, i)),
                Io(e, t, r, i, n)
            );
        case 1:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : He(r, i)),
                ea(e, t, r, i, n)
            );
        case 3:
            e: {
                if ((If(t), e === null)) throw Error(O(387));
                (r = t.pendingProps),
                    (s = t.memoizedState),
                    (i = s.element),
                    ef(e, t),
                    Li(t, r, null, n);
                var o = t.memoizedState;
                if (((r = o.element), s.isDehydrated))
                    if (
                        ((s = {
                            element: r,
                            isDehydrated: !1,
                            cache: o.cache,
                            pendingSuspenseBoundaries:
                                o.pendingSuspenseBoundaries,
                            transitions: o.transitions,
                        }),
                        (t.updateQueue.baseState = s),
                        (t.memoizedState = s),
                        t.flags & 256)
                    ) {
                        (i = In(Error(O(423)), t)), (t = ta(e, t, r, n, i));
                        break e;
                    } else if (r !== i) {
                        (i = In(Error(O(424)), t)), (t = ta(e, t, r, n, i));
                        break e;
                    } else
                        for (
                            Pe = Ot(t.stateNode.containerInfo.firstChild),
                                Ie = t,
                                K = !0,
                                be = null,
                                n = sf(t, null, r, n),
                                t.child = n;
                            n;

                        )
                            (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
                else {
                    if ((_n(), r === i)) {
                        t = ct(e, t, n);
                        break e;
                    }
                    xe(e, t, r, n);
                }
                t = t.child;
            }
            return t;
        case 5:
            return (
                of(t),
                e === null && To(t),
                (r = t.type),
                (i = t.pendingProps),
                (s = e !== null ? e.memoizedProps : null),
                (o = i.children),
                wo(r, i)
                    ? (o = null)
                    : s !== null && wo(r, s) && (t.flags |= 32),
                Pf(e, t),
                xe(e, t, o, n),
                t.child
            );
        case 6:
            return e === null && To(t), null;
        case 13:
            return Df(e, t, n);
        case 4:
            return (
                Rl(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                e === null ? (t.child = Rn(t, null, r, n)) : xe(e, t, r, n),
                t.child
            );
        case 11:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : He(r, i)),
                Ju(e, t, r, i, n)
            );
        case 7:
            return xe(e, t, t.pendingProps, n), t.child;
        case 8:
            return xe(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return xe(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (
                    ((r = t.type._context),
                    (i = t.pendingProps),
                    (s = t.memoizedProps),
                    (o = i.value),
                    W(Di, r._currentValue),
                    (r._currentValue = o),
                    s !== null)
                )
                    if (Ye(s.value, o)) {
                        if (s.children === i.children && !Ne.current) {
                            t = ct(e, t, n);
                            break e;
                        }
                    } else
                        for (
                            s = t.child, s !== null && (s.return = t);
                            s !== null;

                        ) {
                            var l = s.dependencies;
                            if (l !== null) {
                                o = s.child;
                                for (var u = l.firstContext; u !== null; ) {
                                    if (u.context === r) {
                                        if (s.tag === 1) {
                                            (u = ot(-1, n & -n)), (u.tag = 2);
                                            var a = s.updateQueue;
                                            if (a !== null) {
                                                a = a.shared;
                                                var c = a.pending;
                                                c === null
                                                    ? (u.next = u)
                                                    : ((u.next = c.next),
                                                      (c.next = u)),
                                                    (a.pending = u);
                                            }
                                        }
                                        (s.lanes |= n),
                                            (u = s.alternate),
                                            u !== null && (u.lanes |= n),
                                            Oo(s.return, n, t),
                                            (l.lanes |= n);
                                        break;
                                    }
                                    u = u.next;
                                }
                            } else if (s.tag === 10)
                                o = s.type === t.type ? null : s.child;
                            else if (s.tag === 18) {
                                if (((o = s.return), o === null))
                                    throw Error(O(341));
                                (o.lanes |= n),
                                    (l = o.alternate),
                                    l !== null && (l.lanes |= n),
                                    Oo(o, n, t),
                                    (o = s.sibling);
                            } else o = s.child;
                            if (o !== null) o.return = s;
                            else
                                for (o = s; o !== null; ) {
                                    if (o === t) {
                                        o = null;
                                        break;
                                    }
                                    if (((s = o.sibling), s !== null)) {
                                        (s.return = o.return), (o = s);
                                        break;
                                    }
                                    o = o.return;
                                }
                            s = o;
                        }
                xe(e, t, i.children, n), (t = t.child);
            }
            return t;
        case 9:
            return (
                (i = t.type),
                (r = t.pendingProps.children),
                kn(t, n),
                (i = Be(i)),
                (r = r(i)),
                (t.flags |= 1),
                xe(e, t, r, n),
                t.child
            );
        case 14:
            return (
                (r = t.type),
                (i = He(r, t.pendingProps)),
                (i = He(r.type, i)),
                Zu(e, t, r, i, n)
            );
        case 15:
            return _f(e, t, t.type, t.pendingProps, n);
        case 17:
            return (
                (r = t.type),
                (i = t.pendingProps),
                (i = t.elementType === r ? i : He(r, i)),
                fi(e, t),
                (t.tag = 1),
                Te(r) ? ((e = !0), Ri(t)) : (e = !1),
                kn(t, n),
                nf(t, r, i),
                Ro(t, r, i, n),
                Do(null, t, r, !0, e, n)
            );
        case 19:
            return Af(e, t, n);
        case 22:
            return Rf(e, t, n);
    }
    throw Error(O(156, t.tag));
};
function Kf(e, t) {
    return Ec(e, t);
}
function s0(e, t, n, r) {
    (this.tag = e),
        (this.key = n),
        (this.sibling =
            this.child =
            this.return =
            this.stateNode =
            this.type =
            this.elementType =
                null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
            this.memoizedState =
            this.updateQueue =
            this.memoizedProps =
                null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
}
function Ue(e, t, n, r) {
    return new s0(e, t, n, r);
}
function ql(e) {
    return (e = e.prototype), !(!e || !e.isReactComponent);
}
function o0(e) {
    if (typeof e == "function") return ql(e) ? 1 : 0;
    if (e != null) {
        if (((e = e.$$typeof), e === al)) return 11;
        if (e === cl) return 14;
    }
    return 2;
}
function It(e, t) {
    var n = e.alternate;
    return (
        n === null
            ? ((n = Ue(e.tag, t, e.key, e.mode)),
              (n.elementType = e.elementType),
              (n.type = e.type),
              (n.stateNode = e.stateNode),
              (n.alternate = e),
              (e.alternate = n))
            : ((n.pendingProps = t),
              (n.type = e.type),
              (n.flags = 0),
              (n.subtreeFlags = 0),
              (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
            t === null
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
    );
}
function pi(e, t, n, r, i, s) {
    var o = 2;
    if (((r = e), typeof e == "function")) ql(e) && (o = 1);
    else if (typeof e == "string") o = 5;
    else
        e: switch (e) {
            case un:
                return bt(n.children, i, s, t);
            case ul:
                (o = 8), (i |= 8);
                break;
            case Js:
                return (
                    (e = Ue(12, n, t, i | 2)),
                    (e.elementType = Js),
                    (e.lanes = s),
                    e
                );
            case Zs:
                return (
                    (e = Ue(13, n, t, i)),
                    (e.elementType = Zs),
                    (e.lanes = s),
                    e
                );
            case eo:
                return (
                    (e = Ue(19, n, t, i)),
                    (e.elementType = eo),
                    (e.lanes = s),
                    e
                );
            case rc:
                return us(n, i, s, t);
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                        case tc:
                            o = 10;
                            break e;
                        case nc:
                            o = 9;
                            break e;
                        case al:
                            o = 11;
                            break e;
                        case cl:
                            o = 14;
                            break e;
                        case vt:
                            (o = 16), (r = null);
                            break e;
                    }
                throw Error(O(130, e == null ? e : typeof e, ""));
        }
    return (
        (t = Ue(o, n, t, i)),
        (t.elementType = e),
        (t.type = r),
        (t.lanes = s),
        t
    );
}
function bt(e, t, n, r) {
    return (e = Ue(7, e, r, t)), (e.lanes = n), e;
}
function us(e, t, n, r) {
    return (
        (e = Ue(22, e, r, t)),
        (e.elementType = rc),
        (e.lanes = n),
        (e.stateNode = { isHidden: !1 }),
        e
    );
}
function $s(e, t, n) {
    return (e = Ue(6, e, null, t)), (e.lanes = n), e;
}
function qs(e, t, n) {
    return (
        (t = Ue(4, e.children !== null ? e.children : [], e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation,
        }),
        t
    );
}
function l0(e, t, n, r, i) {
    (this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork =
            this.pingCache =
            this.current =
            this.pendingChildren =
                null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = ks(0)),
        (this.expirationTimes = ks(-1)),
        (this.entangledLanes =
            this.finishedLanes =
            this.mutableReadLanes =
            this.expiredLanes =
            this.pingedLanes =
            this.suspendedLanes =
            this.pendingLanes =
                0),
        (this.entanglements = ks(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null);
}
function Hl(e, t, n, r, i, s, o, l, u) {
    return (
        (e = new l0(e, t, n, l, u)),
        t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
        (s = Ue(3, null, null, t)),
        (e.current = s),
        (s.stateNode = e),
        (s.memoizedState = {
            element: r,
            isDehydrated: n,
            cache: null,
            transitions: null,
            pendingSuspenseBoundaries: null,
        }),
        _l(s),
        e
    );
}
function u0(e, t, n) {
    var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: ln,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
    };
}
function Yf(e) {
    if (!e) return Lt;
    e = e._reactInternals;
    e: {
        if (tn(e) !== e || e.tag !== 1) throw Error(O(170));
        var t = e;
        do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Te(t.type)) {
                        t =
                            t.stateNode
                                .__reactInternalMemoizedMergedChildContext;
                        break e;
                    }
            }
            t = t.return;
        } while (t !== null);
        throw Error(O(171));
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Te(n)) return Gc(e, n, t);
    }
    return t;
}
function Xf(e, t, n, r, i, s, o, l, u) {
    return (
        (e = Hl(n, r, !0, e, i, s, o, l, u)),
        (e.context = Yf(null)),
        (n = e.current),
        (r = Ee()),
        (i = Pt(n)),
        (s = ot(r, i)),
        (s.callback = t ?? null),
        _t(n, s, i),
        (e.current.lanes = i),
        Pr(e, i, r),
        Oe(e, r),
        e
    );
}
function as(e, t, n, r) {
    var i = t.current,
        s = Ee(),
        o = Pt(i);
    return (
        (n = Yf(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = ot(s, o)),
        (t.payload = { element: e }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = _t(i, t, o)),
        e !== null && (Ke(e, i, o, s), ui(e, i, o)),
        o
    );
}
function Qi(e) {
    if (((e = e.current), !e.child)) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode;
    }
}
function fa(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
    }
}
function Wl(e, t) {
    fa(e, t), (e = e.alternate) && fa(e, t);
}
function a0() {
    return null;
}
var Jf =
    typeof reportError == "function"
        ? reportError
        : function (e) {
              console.error(e);
          };
function bl(e) {
    this._internalRoot = e;
}
cs.prototype.render = bl.prototype.render = function (e) {
    var t = this._internalRoot;
    if (t === null) throw Error(O(409));
    as(e, t, null, null);
};
cs.prototype.unmount = bl.prototype.unmount = function () {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Jt(function () {
            as(null, e, null, null);
        }),
            (t[ut] = null);
    }
};
function cs(e) {
    this._internalRoot = e;
}
cs.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
        var t = Oc();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < xt.length && t !== 0 && t < xt[n].priority; n++);
        xt.splice(n, 0, e), n === 0 && Rc(e);
    }
};
function Gl(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function fs(e) {
    return !(
        !e ||
        (e.nodeType !== 1 &&
            e.nodeType !== 9 &&
            e.nodeType !== 11 &&
            (e.nodeType !== 8 ||
                e.nodeValue !== " react-mount-point-unstable "))
    );
}
function da() {}
function c0(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var s = r;
            r = function () {
                var a = Qi(o);
                s.call(a);
            };
        }
        var o = Xf(t, r, e, 0, null, !1, !1, "", da);
        return (
            (e._reactRootContainer = o),
            (e[ut] = o.current),
            yr(e.nodeType === 8 ? e.parentNode : e),
            Jt(),
            o
        );
    }
    for (; (i = e.lastChild); ) e.removeChild(i);
    if (typeof r == "function") {
        var l = r;
        r = function () {
            var a = Qi(u);
            l.call(a);
        };
    }
    var u = Hl(e, 0, !1, null, null, !1, !1, "", da);
    return (
        (e._reactRootContainer = u),
        (e[ut] = u.current),
        yr(e.nodeType === 8 ? e.parentNode : e),
        Jt(function () {
            as(t, u, n, r);
        }),
        u
    );
}
function ds(e, t, n, r, i) {
    var s = n._reactRootContainer;
    if (s) {
        var o = s;
        if (typeof i == "function") {
            var l = i;
            i = function () {
                var u = Qi(o);
                l.call(u);
            };
        }
        as(t, o, e, i);
    } else o = c0(n, t, e, i, r);
    return Qi(o);
}
Nc = function (e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Kn(t.pendingLanes);
                n !== 0 &&
                    (hl(t, n | 1),
                    Oe(t, te()),
                    !(Q & 6) && ((Dn = te() + 500), Mt()));
            }
            break;
        case 13:
            Jt(function () {
                var r = at(e, 1);
                if (r !== null) {
                    var i = Ee();
                    Ke(r, e, 1, i);
                }
            }),
                Wl(e, 1);
    }
};
pl = function (e) {
    if (e.tag === 13) {
        var t = at(e, 134217728);
        if (t !== null) {
            var n = Ee();
            Ke(t, e, 134217728, n);
        }
        Wl(e, 134217728);
    }
};
Tc = function (e) {
    if (e.tag === 13) {
        var t = Pt(e),
            n = at(e, t);
        if (n !== null) {
            var r = Ee();
            Ke(n, e, t, r);
        }
        Wl(e, t);
    }
};
Oc = function () {
    return $;
};
_c = function (e, t) {
    var n = $;
    try {
        return ($ = e), t();
    } finally {
        $ = n;
    }
};
co = function (e, t, n) {
    switch (t) {
        case "input":
            if ((ro(e, n), (t = n.name), n.type === "radio" && t != null)) {
                for (n = e; n.parentNode; ) n = n.parentNode;
                for (
                    n = n.querySelectorAll(
                        "input[name=" +
                            JSON.stringify("" + t) +
                            '][type="radio"]',
                    ),
                        t = 0;
                    t < n.length;
                    t++
                ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var i = ns(r);
                        if (!i) throw Error(O(90));
                        sc(r), ro(r, i);
                    }
                }
            }
            break;
        case "textarea":
            lc(e, n);
            break;
        case "select":
            (t = n.value), t != null && En(e, !!n.multiple, t, !1);
    }
};
pc = Vl;
mc = Jt;
var f0 = { usingClientEntryPoint: !1, Events: [Dr, dn, ns, dc, hc, Vl] },
    Wn = {
        findFiberByHostInstance: Qt,
        bundleType: 0,
        version: "18.2.0",
        rendererPackageName: "react-dom",
    },
    d0 = {
        bundleType: Wn.bundleType,
        version: Wn.version,
        rendererPackageName: Wn.rendererPackageName,
        rendererConfig: Wn.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: ft.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
            return (e = gc(e)), e === null ? null : e.stateNode;
        },
        findFiberByHostInstance: Wn.findFiberByHostInstance || a0,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ti = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ti.isDisabled && ti.supportsFiber)
        try {
            (Ji = ti.inject(d0)), (et = ti);
        } catch {}
}
Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = f0;
Ae.createPortal = function (e, t) {
    var n =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Gl(t)) throw Error(O(200));
    return u0(e, t, null, n);
};
Ae.createRoot = function (e, t) {
    if (!Gl(e)) throw Error(O(299));
    var n = !1,
        r = "",
        i = Jf;
    return (
        t != null &&
            (t.unstable_strictMode === !0 && (n = !0),
            t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = Hl(e, 1, !1, null, null, n, !1, r, i)),
        (e[ut] = t.current),
        yr(e.nodeType === 8 ? e.parentNode : e),
        new bl(t)
    );
};
Ae.findDOMNode = function (e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function"
            ? Error(O(188))
            : ((e = Object.keys(e).join(",")), Error(O(268, e)));
    return (e = gc(t)), (e = e === null ? null : e.stateNode), e;
};
Ae.flushSync = function (e) {
    return Jt(e);
};
Ae.hydrate = function (e, t, n) {
    if (!fs(t)) throw Error(O(200));
    return ds(null, e, t, !0, n);
};
Ae.hydrateRoot = function (e, t, n) {
    if (!Gl(e)) throw Error(O(405));
    var r = (n != null && n.hydratedSources) || null,
        i = !1,
        s = "",
        o = Jf;
    if (
        (n != null &&
            (n.unstable_strictMode === !0 && (i = !0),
            n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
        (t = Xf(t, null, e, 1, n ?? null, i, !1, s, o)),
        (e[ut] = t.current),
        yr(e),
        r)
    )
        for (e = 0; e < r.length; e++)
            (n = r[e]),
                (i = n._getVersion),
                (i = i(n._source)),
                t.mutableSourceEagerHydrationData == null
                    ? (t.mutableSourceEagerHydrationData = [n, i])
                    : t.mutableSourceEagerHydrationData.push(n, i);
    return new cs(t);
};
Ae.render = function (e, t, n) {
    if (!fs(t)) throw Error(O(200));
    return ds(null, e, t, !1, n);
};
Ae.unmountComponentAtNode = function (e) {
    if (!fs(e)) throw Error(O(40));
    return e._reactRootContainer
        ? (Jt(function () {
              ds(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[ut] = null);
              });
          }),
          !0)
        : !1;
};
Ae.unstable_batchedUpdates = Vl;
Ae.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
    if (!fs(n)) throw Error(O(200));
    if (e == null || e._reactInternals === void 0) throw Error(O(38));
    return ds(e, t, n, !1, r);
};
Ae.version = "18.2.0-next-9e3b772b8-20220608";
function Zf() {
    if (
        !(
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
    )
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Zf);
        } catch (e) {
            console.error(e);
        }
}
Zf(), (Ya.exports = Ae);
var ed = Ya.exports,
    td,
    ha = ed;
(td = ha.createRoot), ha.hydrateRoot;
class Lr {
    constructor() {
        (this.listeners = new Set()),
            (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(t) {
        const n = { listener: t };
        return (
            this.listeners.add(n),
            this.onSubscribe(),
            () => {
                this.listeners.delete(n), this.onUnsubscribe();
            }
        );
    }
    hasListeners() {
        return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
}
const Tr = typeof window > "u" || "Deno" in window;
function Fe() {}
function h0(e, t) {
    return typeof e == "function" ? e(t) : e;
}
function qo(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function nd(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0);
}
function Xn(e, t, n) {
    return hs(e)
        ? typeof t == "function"
            ? { ...n, queryKey: e, queryFn: t }
            : { ...t, queryKey: e }
        : e;
}
function gt(e, t, n) {
    return hs(e) ? [{ ...t, queryKey: e }, n] : [e || {}, t];
}
function pa(e, t) {
    const {
        type: n = "all",
        exact: r,
        fetchStatus: i,
        predicate: s,
        queryKey: o,
        stale: l,
    } = e;
    if (hs(o)) {
        if (r) {
            if (t.queryHash !== Kl(o, t.options)) return !1;
        } else if (!$i(t.queryKey, o)) return !1;
    }
    if (n !== "all") {
        const u = t.isActive();
        if ((n === "active" && !u) || (n === "inactive" && u)) return !1;
    }
    return !(
        (typeof l == "boolean" && t.isStale() !== l) ||
        (typeof i < "u" && i !== t.state.fetchStatus) ||
        (s && !s(t))
    );
}
function ma(e, t) {
    const { exact: n, fetching: r, predicate: i, mutationKey: s } = e;
    if (hs(s)) {
        if (!t.options.mutationKey) return !1;
        if (n) {
            if (Ht(t.options.mutationKey) !== Ht(s)) return !1;
        } else if (!$i(t.options.mutationKey, s)) return !1;
    }
    return !(
        (typeof r == "boolean" && (t.state.status === "loading") !== r) ||
        (i && !i(t))
    );
}
function Kl(e, t) {
    return ((t == null ? void 0 : t.queryKeyHashFn) || Ht)(e);
}
function Ht(e) {
    return JSON.stringify(e, (t, n) =>
        Wo(n)
            ? Object.keys(n)
                  .sort()
                  .reduce((r, i) => ((r[i] = n[i]), r), {})
            : n,
    );
}
function $i(e, t) {
    return rd(e, t);
}
function rd(e, t) {
    return e === t
        ? !0
        : typeof e != typeof t
        ? !1
        : e && t && typeof e == "object" && typeof t == "object"
        ? !Object.keys(t).some((n) => !rd(e[n], t[n]))
        : !1;
}
function id(e, t) {
    if (e === t) return e;
    const n = va(e) && va(t);
    if (n || (Wo(e) && Wo(t))) {
        const r = n ? e.length : Object.keys(e).length,
            i = n ? t : Object.keys(t),
            s = i.length,
            o = n ? [] : {};
        let l = 0;
        for (let u = 0; u < s; u++) {
            const a = n ? u : i[u];
            (o[a] = id(e[a], t[a])), o[a] === e[a] && l++;
        }
        return r === s && l === r ? e : o;
    }
    return t;
}
function Ho(e, t) {
    if ((e && !t) || (t && !e)) return !1;
    for (const n in e) if (e[n] !== t[n]) return !1;
    return !0;
}
function va(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Wo(e) {
    if (!ya(e)) return !1;
    const t = e.constructor;
    if (typeof t > "u") return !0;
    const n = t.prototype;
    return !(!ya(n) || !n.hasOwnProperty("isPrototypeOf"));
}
function ya(e) {
    return Object.prototype.toString.call(e) === "[object Object]";
}
function hs(e) {
    return Array.isArray(e);
}
function sd(e) {
    return new Promise((t) => {
        setTimeout(t, e);
    });
}
function ga(e) {
    sd(0).then(e);
}
function p0() {
    if (typeof AbortController == "function") return new AbortController();
}
function bo(e, t, n) {
    return n.isDataEqual != null && n.isDataEqual(e, t)
        ? e
        : typeof n.structuralSharing == "function"
        ? n.structuralSharing(e, t)
        : n.structuralSharing !== !1
        ? id(e, t)
        : t;
}
class m0 extends Lr {
    constructor() {
        super(),
            (this.setup = (t) => {
                if (!Tr && window.addEventListener) {
                    const n = () => t();
                    return (
                        window.addEventListener("visibilitychange", n, !1),
                        window.addEventListener("focus", n, !1),
                        () => {
                            window.removeEventListener("visibilitychange", n),
                                window.removeEventListener("focus", n);
                        }
                    );
                }
            });
    }
    onSubscribe() {
        this.cleanup || this.setEventListener(this.setup);
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            var t;
            (t = this.cleanup) == null || t.call(this), (this.cleanup = void 0);
        }
    }
    setEventListener(t) {
        var n;
        (this.setup = t),
            (n = this.cleanup) == null || n.call(this),
            (this.cleanup = t((r) => {
                typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
            }));
    }
    setFocused(t) {
        this.focused !== t && ((this.focused = t), this.onFocus());
    }
    onFocus() {
        this.listeners.forEach(({ listener: t }) => {
            t();
        });
    }
    isFocused() {
        return typeof this.focused == "boolean"
            ? this.focused
            : typeof document > "u"
            ? !0
            : [void 0, "visible", "prerender"].includes(
                  document.visibilityState,
              );
    }
}
const qi = new m0(),
    xa = ["online", "offline"];
class v0 extends Lr {
    constructor() {
        super(),
            (this.setup = (t) => {
                if (!Tr && window.addEventListener) {
                    const n = () => t();
                    return (
                        xa.forEach((r) => {
                            window.addEventListener(r, n, !1);
                        }),
                        () => {
                            xa.forEach((r) => {
                                window.removeEventListener(r, n);
                            });
                        }
                    );
                }
            });
    }
    onSubscribe() {
        this.cleanup || this.setEventListener(this.setup);
    }
    onUnsubscribe() {
        if (!this.hasListeners()) {
            var t;
            (t = this.cleanup) == null || t.call(this), (this.cleanup = void 0);
        }
    }
    setEventListener(t) {
        var n;
        (this.setup = t),
            (n = this.cleanup) == null || n.call(this),
            (this.cleanup = t((r) => {
                typeof r == "boolean" ? this.setOnline(r) : this.onOnline();
            }));
    }
    setOnline(t) {
        this.online !== t && ((this.online = t), this.onOnline());
    }
    onOnline() {
        this.listeners.forEach(({ listener: t }) => {
            t();
        });
    }
    isOnline() {
        return typeof this.online == "boolean"
            ? this.online
            : typeof navigator > "u" || typeof navigator.onLine > "u"
            ? !0
            : navigator.onLine;
    }
}
const Hi = new v0();
function y0(e) {
    return Math.min(1e3 * 2 ** e, 3e4);
}
function ps(e) {
    return (e ?? "online") === "online" ? Hi.isOnline() : !0;
}
class od {
    constructor(t) {
        (this.revert = t == null ? void 0 : t.revert),
            (this.silent = t == null ? void 0 : t.silent);
    }
}
function mi(e) {
    return e instanceof od;
}
function ld(e) {
    let t = !1,
        n = 0,
        r = !1,
        i,
        s,
        o;
    const l = new Promise((C, d) => {
            (s = C), (o = d);
        }),
        u = (C) => {
            r || (y(new od(C)), e.abort == null || e.abort());
        },
        a = () => {
            t = !0;
        },
        c = () => {
            t = !1;
        },
        h = () =>
            !qi.isFocused() || (e.networkMode !== "always" && !Hi.isOnline()),
        m = (C) => {
            r ||
                ((r = !0),
                e.onSuccess == null || e.onSuccess(C),
                i == null || i(),
                s(C));
        },
        y = (C) => {
            r ||
                ((r = !0),
                e.onError == null || e.onError(C),
                i == null || i(),
                o(C));
        },
        v = () =>
            new Promise((C) => {
                (i = (d) => {
                    const f = r || !h();
                    return f && C(d), f;
                }),
                    e.onPause == null || e.onPause();
            }).then(() => {
                (i = void 0), r || e.onContinue == null || e.onContinue();
            }),
        g = () => {
            if (r) return;
            let C;
            try {
                C = e.fn();
            } catch (d) {
                C = Promise.reject(d);
            }
            Promise.resolve(C)
                .then(m)
                .catch((d) => {
                    var f, p;
                    if (r) return;
                    const E = (f = e.retry) != null ? f : 3,
                        _ = (p = e.retryDelay) != null ? p : y0,
                        T = typeof _ == "function" ? _(n, d) : _,
                        N =
                            E === !0 ||
                            (typeof E == "number" && n < E) ||
                            (typeof E == "function" && E(n, d));
                    if (t || !N) {
                        y(d);
                        return;
                    }
                    n++,
                        e.onFail == null || e.onFail(n, d),
                        sd(T)
                            .then(() => {
                                if (h()) return v();
                            })
                            .then(() => {
                                t ? y(d) : g();
                            });
                });
        };
    return (
        ps(e.networkMode) ? g() : v().then(g),
        {
            promise: l,
            cancel: u,
            continue: () =>
                (i == null ? void 0 : i()) ? l : Promise.resolve(),
            cancelRetry: a,
            continueRetry: c,
        }
    );
}
const Yl = console;
function g0() {
    let e = [],
        t = 0,
        n = (c) => {
            c();
        },
        r = (c) => {
            c();
        };
    const i = (c) => {
            let h;
            t++;
            try {
                h = c();
            } finally {
                t--, t || l();
            }
            return h;
        },
        s = (c) => {
            t
                ? e.push(c)
                : ga(() => {
                      n(c);
                  });
        },
        o =
            (c) =>
            (...h) => {
                s(() => {
                    c(...h);
                });
            },
        l = () => {
            const c = e;
            (e = []),
                c.length &&
                    ga(() => {
                        r(() => {
                            c.forEach((h) => {
                                n(h);
                            });
                        });
                    });
        };
    return {
        batch: i,
        batchCalls: o,
        schedule: s,
        setNotifyFunction: (c) => {
            n = c;
        },
        setBatchNotifyFunction: (c) => {
            r = c;
        },
    };
}
const ie = g0();
class ud {
    destroy() {
        this.clearGcTimeout();
    }
    scheduleGc() {
        this.clearGcTimeout(),
            qo(this.cacheTime) &&
                (this.gcTimeout = setTimeout(() => {
                    this.optionalRemove();
                }, this.cacheTime));
    }
    updateCacheTime(t) {
        this.cacheTime = Math.max(
            this.cacheTime || 0,
            t ?? (Tr ? 1 / 0 : 5 * 60 * 1e3),
        );
    }
    clearGcTimeout() {
        this.gcTimeout &&
            (clearTimeout(this.gcTimeout), (this.gcTimeout = void 0));
    }
}
class x0 extends ud {
    constructor(t) {
        super(),
            (this.abortSignalConsumed = !1),
            (this.defaultOptions = t.defaultOptions),
            this.setOptions(t.options),
            (this.observers = []),
            (this.cache = t.cache),
            (this.logger = t.logger || Yl),
            (this.queryKey = t.queryKey),
            (this.queryHash = t.queryHash),
            (this.initialState = t.state || E0(this.options)),
            (this.state = this.initialState),
            this.scheduleGc();
    }
    get meta() {
        return this.options.meta;
    }
    setOptions(t) {
        (this.options = { ...this.defaultOptions, ...t }),
            this.updateCacheTime(this.options.cacheTime);
    }
    optionalRemove() {
        !this.observers.length &&
            this.state.fetchStatus === "idle" &&
            this.cache.remove(this);
    }
    setData(t, n) {
        const r = bo(this.state.data, t, this.options);
        return (
            this.dispatch({
                data: r,
                type: "success",
                dataUpdatedAt: n == null ? void 0 : n.updatedAt,
                manual: n == null ? void 0 : n.manual,
            }),
            r
        );
    }
    setState(t, n) {
        this.dispatch({ type: "setState", state: t, setStateOptions: n });
    }
    cancel(t) {
        var n;
        const r = this.promise;
        return (
            (n = this.retryer) == null || n.cancel(t),
            r ? r.then(Fe).catch(Fe) : Promise.resolve()
        );
    }
    destroy() {
        super.destroy(), this.cancel({ silent: !0 });
    }
    reset() {
        this.destroy(), this.setState(this.initialState);
    }
    isActive() {
        return this.observers.some((t) => t.options.enabled !== !1);
    }
    isDisabled() {
        return this.getObserversCount() > 0 && !this.isActive();
    }
    isStale() {
        return (
            this.state.isInvalidated ||
            !this.state.dataUpdatedAt ||
            this.observers.some((t) => t.getCurrentResult().isStale)
        );
    }
    isStaleByTime(t = 0) {
        return (
            this.state.isInvalidated ||
            !this.state.dataUpdatedAt ||
            !nd(this.state.dataUpdatedAt, t)
        );
    }
    onFocus() {
        var t;
        const n = this.observers.find((r) => r.shouldFetchOnWindowFocus());
        n && n.refetch({ cancelRefetch: !1 }),
            (t = this.retryer) == null || t.continue();
    }
    onOnline() {
        var t;
        const n = this.observers.find((r) => r.shouldFetchOnReconnect());
        n && n.refetch({ cancelRefetch: !1 }),
            (t = this.retryer) == null || t.continue();
    }
    addObserver(t) {
        this.observers.includes(t) ||
            (this.observers.push(t),
            this.clearGcTimeout(),
            this.cache.notify({
                type: "observerAdded",
                query: this,
                observer: t,
            }));
    }
    removeObserver(t) {
        this.observers.includes(t) &&
            ((this.observers = this.observers.filter((n) => n !== t)),
            this.observers.length ||
                (this.retryer &&
                    (this.abortSignalConsumed
                        ? this.retryer.cancel({ revert: !0 })
                        : this.retryer.cancelRetry()),
                this.scheduleGc()),
            this.cache.notify({
                type: "observerRemoved",
                query: this,
                observer: t,
            }));
    }
    getObserversCount() {
        return this.observers.length;
    }
    invalidate() {
        this.state.isInvalidated || this.dispatch({ type: "invalidate" });
    }
    fetch(t, n) {
        var r, i;
        if (this.state.fetchStatus !== "idle") {
            if (this.state.dataUpdatedAt && n != null && n.cancelRefetch)
                this.cancel({ silent: !0 });
            else if (this.promise) {
                var s;
                return (
                    (s = this.retryer) == null || s.continueRetry(),
                    this.promise
                );
            }
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
            const y = this.observers.find((v) => v.options.queryFn);
            y && this.setOptions(y.options);
        }
        const o = p0(),
            l = { queryKey: this.queryKey, pageParam: void 0, meta: this.meta },
            u = (y) => {
                Object.defineProperty(y, "signal", {
                    enumerable: !0,
                    get: () => {
                        if (o) return (this.abortSignalConsumed = !0), o.signal;
                    },
                });
            };
        u(l);
        const a = () =>
                this.options.queryFn
                    ? ((this.abortSignalConsumed = !1), this.options.queryFn(l))
                    : Promise.reject(
                          "Missing queryFn for queryKey '" +
                              this.options.queryHash +
                              "'",
                      ),
            c = {
                fetchOptions: n,
                options: this.options,
                queryKey: this.queryKey,
                state: this.state,
                fetchFn: a,
            };
        if (
            (u(c),
            (r = this.options.behavior) == null || r.onFetch(c),
            (this.revertState = this.state),
            this.state.fetchStatus === "idle" ||
                this.state.fetchMeta !==
                    ((i = c.fetchOptions) == null ? void 0 : i.meta))
        ) {
            var h;
            this.dispatch({
                type: "fetch",
                meta: (h = c.fetchOptions) == null ? void 0 : h.meta,
            });
        }
        const m = (y) => {
            if (
                ((mi(y) && y.silent) ||
                    this.dispatch({ type: "error", error: y }),
                !mi(y))
            ) {
                var v, g, C, d;
                (v = (g = this.cache.config).onError) == null ||
                    v.call(g, y, this),
                    (C = (d = this.cache.config).onSettled) == null ||
                        C.call(d, this.state.data, y, this);
            }
            this.isFetchingOptimistic || this.scheduleGc(),
                (this.isFetchingOptimistic = !1);
        };
        return (
            (this.retryer = ld({
                fn: c.fetchFn,
                abort: o == null ? void 0 : o.abort.bind(o),
                onSuccess: (y) => {
                    var v, g, C, d;
                    if (typeof y > "u") {
                        m(new Error(this.queryHash + " data is undefined"));
                        return;
                    }
                    this.setData(y),
                        (v = (g = this.cache.config).onSuccess) == null ||
                            v.call(g, y, this),
                        (C = (d = this.cache.config).onSettled) == null ||
                            C.call(d, y, this.state.error, this),
                        this.isFetchingOptimistic || this.scheduleGc(),
                        (this.isFetchingOptimistic = !1);
                },
                onError: m,
                onFail: (y, v) => {
                    this.dispatch({
                        type: "failed",
                        failureCount: y,
                        error: v,
                    });
                },
                onPause: () => {
                    this.dispatch({ type: "pause" });
                },
                onContinue: () => {
                    this.dispatch({ type: "continue" });
                },
                retry: c.options.retry,
                retryDelay: c.options.retryDelay,
                networkMode: c.options.networkMode,
            })),
            (this.promise = this.retryer.promise),
            this.promise
        );
    }
    dispatch(t) {
        const n = (r) => {
            var i, s;
            switch (t.type) {
                case "failed":
                    return {
                        ...r,
                        fetchFailureCount: t.failureCount,
                        fetchFailureReason: t.error,
                    };
                case "pause":
                    return { ...r, fetchStatus: "paused" };
                case "continue":
                    return { ...r, fetchStatus: "fetching" };
                case "fetch":
                    return {
                        ...r,
                        fetchFailureCount: 0,
                        fetchFailureReason: null,
                        fetchMeta: (i = t.meta) != null ? i : null,
                        fetchStatus: ps(this.options.networkMode)
                            ? "fetching"
                            : "paused",
                        ...(!r.dataUpdatedAt && {
                            error: null,
                            status: "loading",
                        }),
                    };
                case "success":
                    return {
                        ...r,
                        data: t.data,
                        dataUpdateCount: r.dataUpdateCount + 1,
                        dataUpdatedAt:
                            (s = t.dataUpdatedAt) != null ? s : Date.now(),
                        error: null,
                        isInvalidated: !1,
                        status: "success",
                        ...(!t.manual && {
                            fetchStatus: "idle",
                            fetchFailureCount: 0,
                            fetchFailureReason: null,
                        }),
                    };
                case "error":
                    const o = t.error;
                    return mi(o) && o.revert && this.revertState
                        ? { ...this.revertState, fetchStatus: "idle" }
                        : {
                              ...r,
                              error: o,
                              errorUpdateCount: r.errorUpdateCount + 1,
                              errorUpdatedAt: Date.now(),
                              fetchFailureCount: r.fetchFailureCount + 1,
                              fetchFailureReason: o,
                              fetchStatus: "idle",
                              status: "error",
                          };
                case "invalidate":
                    return { ...r, isInvalidated: !0 };
                case "setState":
                    return { ...r, ...t.state };
            }
        };
        (this.state = n(this.state)),
            ie.batch(() => {
                this.observers.forEach((r) => {
                    r.onQueryUpdate(t);
                }),
                    this.cache.notify({
                        query: this,
                        type: "updated",
                        action: t,
                    });
            });
    }
}
function E0(e) {
    const t =
            typeof e.initialData == "function"
                ? e.initialData()
                : e.initialData,
        n = typeof t < "u",
        r = n
            ? typeof e.initialDataUpdatedAt == "function"
                ? e.initialDataUpdatedAt()
                : e.initialDataUpdatedAt
            : 0;
    return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: n ? r ?? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: n ? "success" : "loading",
        fetchStatus: "idle",
    };
}
class w0 extends Lr {
    constructor(t) {
        super(),
            (this.config = t || {}),
            (this.queries = []),
            (this.queriesMap = {});
    }
    build(t, n, r) {
        var i;
        const s = n.queryKey,
            o = (i = n.queryHash) != null ? i : Kl(s, n);
        let l = this.get(o);
        return (
            l ||
                ((l = new x0({
                    cache: this,
                    logger: t.getLogger(),
                    queryKey: s,
                    queryHash: o,
                    options: t.defaultQueryOptions(n),
                    state: r,
                    defaultOptions: t.getQueryDefaults(s),
                })),
                this.add(l)),
            l
        );
    }
    add(t) {
        this.queriesMap[t.queryHash] ||
            ((this.queriesMap[t.queryHash] = t),
            this.queries.push(t),
            this.notify({ type: "added", query: t }));
    }
    remove(t) {
        const n = this.queriesMap[t.queryHash];
        n &&
            (t.destroy(),
            (this.queries = this.queries.filter((r) => r !== t)),
            n === t && delete this.queriesMap[t.queryHash],
            this.notify({ type: "removed", query: t }));
    }
    clear() {
        ie.batch(() => {
            this.queries.forEach((t) => {
                this.remove(t);
            });
        });
    }
    get(t) {
        return this.queriesMap[t];
    }
    getAll() {
        return this.queries;
    }
    find(t, n) {
        const [r] = gt(t, n);
        return (
            typeof r.exact > "u" && (r.exact = !0),
            this.queries.find((i) => pa(r, i))
        );
    }
    findAll(t, n) {
        const [r] = gt(t, n);
        return Object.keys(r).length > 0
            ? this.queries.filter((i) => pa(r, i))
            : this.queries;
    }
    notify(t) {
        ie.batch(() => {
            this.listeners.forEach(({ listener: n }) => {
                n(t);
            });
        });
    }
    onFocus() {
        ie.batch(() => {
            this.queries.forEach((t) => {
                t.onFocus();
            });
        });
    }
    onOnline() {
        ie.batch(() => {
            this.queries.forEach((t) => {
                t.onOnline();
            });
        });
    }
}
class S0 extends ud {
    constructor(t) {
        super(),
            (this.defaultOptions = t.defaultOptions),
            (this.mutationId = t.mutationId),
            (this.mutationCache = t.mutationCache),
            (this.logger = t.logger || Yl),
            (this.observers = []),
            (this.state = t.state || C0()),
            this.setOptions(t.options),
            this.scheduleGc();
    }
    setOptions(t) {
        (this.options = { ...this.defaultOptions, ...t }),
            this.updateCacheTime(this.options.cacheTime);
    }
    get meta() {
        return this.options.meta;
    }
    setState(t) {
        this.dispatch({ type: "setState", state: t });
    }
    addObserver(t) {
        this.observers.includes(t) ||
            (this.observers.push(t),
            this.clearGcTimeout(),
            this.mutationCache.notify({
                type: "observerAdded",
                mutation: this,
                observer: t,
            }));
    }
    removeObserver(t) {
        (this.observers = this.observers.filter((n) => n !== t)),
            this.scheduleGc(),
            this.mutationCache.notify({
                type: "observerRemoved",
                mutation: this,
                observer: t,
            });
    }
    optionalRemove() {
        this.observers.length ||
            (this.state.status === "loading"
                ? this.scheduleGc()
                : this.mutationCache.remove(this));
    }
    continue() {
        var t, n;
        return (t = (n = this.retryer) == null ? void 0 : n.continue()) != null
            ? t
            : this.execute();
    }
    async execute() {
        const t = () => {
                var N;
                return (
                    (this.retryer = ld({
                        fn: () =>
                            this.options.mutationFn
                                ? this.options.mutationFn(this.state.variables)
                                : Promise.reject("No mutationFn found"),
                        onFail: (k, z) => {
                            this.dispatch({
                                type: "failed",
                                failureCount: k,
                                error: z,
                            });
                        },
                        onPause: () => {
                            this.dispatch({ type: "pause" });
                        },
                        onContinue: () => {
                            this.dispatch({ type: "continue" });
                        },
                        retry: (N = this.options.retry) != null ? N : 0,
                        retryDelay: this.options.retryDelay,
                        networkMode: this.options.networkMode,
                    })),
                    this.retryer.promise
                );
            },
            n = this.state.status === "loading";
        try {
            var r, i, s, o, l, u, a, c;
            if (!n) {
                var h, m, y, v;
                this.dispatch({
                    type: "loading",
                    variables: this.options.variables,
                }),
                    await ((h = (m = this.mutationCache.config).onMutate) ==
                    null
                        ? void 0
                        : h.call(m, this.state.variables, this));
                const k = await ((y = (v = this.options).onMutate) == null
                    ? void 0
                    : y.call(v, this.state.variables));
                k !== this.state.context &&
                    this.dispatch({
                        type: "loading",
                        context: k,
                        variables: this.state.variables,
                    });
            }
            const N = await t();
            return (
                await ((r = (i = this.mutationCache.config).onSuccess) == null
                    ? void 0
                    : r.call(
                          i,
                          N,
                          this.state.variables,
                          this.state.context,
                          this,
                      )),
                await ((s = (o = this.options).onSuccess) == null
                    ? void 0
                    : s.call(o, N, this.state.variables, this.state.context)),
                await ((l = (u = this.mutationCache.config).onSettled) == null
                    ? void 0
                    : l.call(
                          u,
                          N,
                          null,
                          this.state.variables,
                          this.state.context,
                          this,
                      )),
                await ((a = (c = this.options).onSettled) == null
                    ? void 0
                    : a.call(
                          c,
                          N,
                          null,
                          this.state.variables,
                          this.state.context,
                      )),
                this.dispatch({ type: "success", data: N }),
                N
            );
        } catch (N) {
            try {
                var g, C, d, f, p, E, _, T;
                throw (
                    (await ((g = (C = this.mutationCache.config).onError) ==
                    null
                        ? void 0
                        : g.call(
                              C,
                              N,
                              this.state.variables,
                              this.state.context,
                              this,
                          )),
                    await ((d = (f = this.options).onError) == null
                        ? void 0
                        : d.call(
                              f,
                              N,
                              this.state.variables,
                              this.state.context,
                          )),
                    await ((p = (E = this.mutationCache.config).onSettled) ==
                    null
                        ? void 0
                        : p.call(
                              E,
                              void 0,
                              N,
                              this.state.variables,
                              this.state.context,
                              this,
                          )),
                    await ((_ = (T = this.options).onSettled) == null
                        ? void 0
                        : _.call(
                              T,
                              void 0,
                              N,
                              this.state.variables,
                              this.state.context,
                          )),
                    N)
                );
            } finally {
                this.dispatch({ type: "error", error: N });
            }
        }
    }
    dispatch(t) {
        const n = (r) => {
            switch (t.type) {
                case "failed":
                    return {
                        ...r,
                        failureCount: t.failureCount,
                        failureReason: t.error,
                    };
                case "pause":
                    return { ...r, isPaused: !0 };
                case "continue":
                    return { ...r, isPaused: !1 };
                case "loading":
                    return {
                        ...r,
                        context: t.context,
                        data: void 0,
                        failureCount: 0,
                        failureReason: null,
                        error: null,
                        isPaused: !ps(this.options.networkMode),
                        status: "loading",
                        variables: t.variables,
                    };
                case "success":
                    return {
                        ...r,
                        data: t.data,
                        failureCount: 0,
                        failureReason: null,
                        error: null,
                        status: "success",
                        isPaused: !1,
                    };
                case "error":
                    return {
                        ...r,
                        data: void 0,
                        error: t.error,
                        failureCount: r.failureCount + 1,
                        failureReason: t.error,
                        isPaused: !1,
                        status: "error",
                    };
                case "setState":
                    return { ...r, ...t.state };
            }
        };
        (this.state = n(this.state)),
            ie.batch(() => {
                this.observers.forEach((r) => {
                    r.onMutationUpdate(t);
                }),
                    this.mutationCache.notify({
                        mutation: this,
                        type: "updated",
                        action: t,
                    });
            });
    }
}
function C0() {
    return {
        context: void 0,
        data: void 0,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: !1,
        status: "idle",
        variables: void 0,
    };
}
class k0 extends Lr {
    constructor(t) {
        super(),
            (this.config = t || {}),
            (this.mutations = []),
            (this.mutationId = 0);
    }
    build(t, n, r) {
        const i = new S0({
            mutationCache: this,
            logger: t.getLogger(),
            mutationId: ++this.mutationId,
            options: t.defaultMutationOptions(n),
            state: r,
            defaultOptions: n.mutationKey
                ? t.getMutationDefaults(n.mutationKey)
                : void 0,
        });
        return this.add(i), i;
    }
    add(t) {
        this.mutations.push(t), this.notify({ type: "added", mutation: t });
    }
    remove(t) {
        (this.mutations = this.mutations.filter((n) => n !== t)),
            this.notify({ type: "removed", mutation: t });
    }
    clear() {
        ie.batch(() => {
            this.mutations.forEach((t) => {
                this.remove(t);
            });
        });
    }
    getAll() {
        return this.mutations;
    }
    find(t) {
        return (
            typeof t.exact > "u" && (t.exact = !0),
            this.mutations.find((n) => ma(t, n))
        );
    }
    findAll(t) {
        return this.mutations.filter((n) => ma(t, n));
    }
    notify(t) {
        ie.batch(() => {
            this.listeners.forEach(({ listener: n }) => {
                n(t);
            });
        });
    }
    resumePausedMutations() {
        var t;
        return (
            (this.resuming = (
                (t = this.resuming) != null ? t : Promise.resolve()
            )
                .then(() => {
                    const n = this.mutations.filter((r) => r.state.isPaused);
                    return ie.batch(() =>
                        n.reduce(
                            (r, i) => r.then(() => i.continue().catch(Fe)),
                            Promise.resolve(),
                        ),
                    );
                })
                .then(() => {
                    this.resuming = void 0;
                })),
            this.resuming
        );
    }
}
function N0() {
    return {
        onFetch: (e) => {
            e.fetchFn = () => {
                var t, n, r, i, s, o;
                const l =
                        (t = e.fetchOptions) == null || (n = t.meta) == null
                            ? void 0
                            : n.refetchPage,
                    u =
                        (r = e.fetchOptions) == null || (i = r.meta) == null
                            ? void 0
                            : i.fetchMore,
                    a = u == null ? void 0 : u.pageParam,
                    c = (u == null ? void 0 : u.direction) === "forward",
                    h = (u == null ? void 0 : u.direction) === "backward",
                    m = ((s = e.state.data) == null ? void 0 : s.pages) || [],
                    y =
                        ((o = e.state.data) == null ? void 0 : o.pageParams) ||
                        [];
                let v = y,
                    g = !1;
                const C = (T) => {
                        Object.defineProperty(T, "signal", {
                            enumerable: !0,
                            get: () => {
                                var N;
                                if ((N = e.signal) != null && N.aborted) g = !0;
                                else {
                                    var k;
                                    (k = e.signal) == null ||
                                        k.addEventListener("abort", () => {
                                            g = !0;
                                        });
                                }
                                return e.signal;
                            },
                        });
                    },
                    d =
                        e.options.queryFn ||
                        (() =>
                            Promise.reject(
                                "Missing queryFn for queryKey '" +
                                    e.options.queryHash +
                                    "'",
                            )),
                    f = (T, N, k, z) => (
                        (v = z ? [N, ...v] : [...v, N]),
                        z ? [k, ...T] : [...T, k]
                    ),
                    p = (T, N, k, z) => {
                        if (g) return Promise.reject("Cancelled");
                        if (typeof k > "u" && !N && T.length)
                            return Promise.resolve(T);
                        const j = {
                            queryKey: e.queryKey,
                            pageParam: k,
                            meta: e.options.meta,
                        };
                        C(j);
                        const H = d(j);
                        return Promise.resolve(H).then((Qe) => f(T, k, Qe, z));
                    };
                let E;
                if (!m.length) E = p([]);
                else if (c) {
                    const T = typeof a < "u",
                        N = T ? a : Ea(e.options, m);
                    E = p(m, T, N);
                } else if (h) {
                    const T = typeof a < "u",
                        N = T ? a : T0(e.options, m);
                    E = p(m, T, N, !0);
                } else {
                    v = [];
                    const T = typeof e.options.getNextPageParam > "u";
                    E = (l && m[0] ? l(m[0], 0, m) : !0)
                        ? p([], T, y[0])
                        : Promise.resolve(f([], y[0], m[0]));
                    for (let k = 1; k < m.length; k++)
                        E = E.then((z) => {
                            if (l && m[k] ? l(m[k], k, m) : !0) {
                                const H = T ? y[k] : Ea(e.options, z);
                                return p(z, T, H);
                            }
                            return Promise.resolve(f(z, y[k], m[k]));
                        });
                }
                return E.then((T) => ({ pages: T, pageParams: v }));
            };
        },
    };
}
function Ea(e, t) {
    return e.getNextPageParam == null
        ? void 0
        : e.getNextPageParam(t[t.length - 1], t);
}
function T0(e, t) {
    return e.getPreviousPageParam == null
        ? void 0
        : e.getPreviousPageParam(t[0], t);
}
class O0 {
    constructor(t = {}) {
        (this.queryCache = t.queryCache || new w0()),
            (this.mutationCache = t.mutationCache || new k0()),
            (this.logger = t.logger || Yl),
            (this.defaultOptions = t.defaultOptions || {}),
            (this.queryDefaults = []),
            (this.mutationDefaults = []),
            (this.mountCount = 0);
    }
    mount() {
        this.mountCount++,
            this.mountCount === 1 &&
                ((this.unsubscribeFocus = qi.subscribe(() => {
                    qi.isFocused() &&
                        (this.resumePausedMutations(),
                        this.queryCache.onFocus());
                })),
                (this.unsubscribeOnline = Hi.subscribe(() => {
                    Hi.isOnline() &&
                        (this.resumePausedMutations(),
                        this.queryCache.onOnline());
                })));
    }
    unmount() {
        var t, n;
        this.mountCount--,
            this.mountCount === 0 &&
                ((t = this.unsubscribeFocus) == null || t.call(this),
                (this.unsubscribeFocus = void 0),
                (n = this.unsubscribeOnline) == null || n.call(this),
                (this.unsubscribeOnline = void 0));
    }
    isFetching(t, n) {
        const [r] = gt(t, n);
        return (r.fetchStatus = "fetching"), this.queryCache.findAll(r).length;
    }
    isMutating(t) {
        return this.mutationCache.findAll({ ...t, fetching: !0 }).length;
    }
    getQueryData(t, n) {
        var r;
        return (r = this.queryCache.find(t, n)) == null ? void 0 : r.state.data;
    }
    ensureQueryData(t, n, r) {
        const i = Xn(t, n, r),
            s = this.getQueryData(i.queryKey);
        return s ? Promise.resolve(s) : this.fetchQuery(i);
    }
    getQueriesData(t) {
        return this.getQueryCache()
            .findAll(t)
            .map(({ queryKey: n, state: r }) => {
                const i = r.data;
                return [n, i];
            });
    }
    setQueryData(t, n, r) {
        const i = this.queryCache.find(t),
            s = i == null ? void 0 : i.state.data,
            o = h0(n, s);
        if (typeof o > "u") return;
        const l = Xn(t),
            u = this.defaultQueryOptions(l);
        return this.queryCache.build(this, u).setData(o, { ...r, manual: !0 });
    }
    setQueriesData(t, n, r) {
        return ie.batch(() =>
            this.getQueryCache()
                .findAll(t)
                .map(({ queryKey: i }) => [i, this.setQueryData(i, n, r)]),
        );
    }
    getQueryState(t, n) {
        var r;
        return (r = this.queryCache.find(t, n)) == null ? void 0 : r.state;
    }
    removeQueries(t, n) {
        const [r] = gt(t, n),
            i = this.queryCache;
        ie.batch(() => {
            i.findAll(r).forEach((s) => {
                i.remove(s);
            });
        });
    }
    resetQueries(t, n, r) {
        const [i, s] = gt(t, n, r),
            o = this.queryCache,
            l = { type: "active", ...i };
        return ie.batch(
            () => (
                o.findAll(i).forEach((u) => {
                    u.reset();
                }),
                this.refetchQueries(l, s)
            ),
        );
    }
    cancelQueries(t, n, r) {
        const [i, s = {}] = gt(t, n, r);
        typeof s.revert > "u" && (s.revert = !0);
        const o = ie.batch(() =>
            this.queryCache.findAll(i).map((l) => l.cancel(s)),
        );
        return Promise.all(o).then(Fe).catch(Fe);
    }
    invalidateQueries(t, n, r) {
        const [i, s] = gt(t, n, r);
        return ie.batch(() => {
            var o, l;
            if (
                (this.queryCache.findAll(i).forEach((a) => {
                    a.invalidate();
                }),
                i.refetchType === "none")
            )
                return Promise.resolve();
            const u = {
                ...i,
                type:
                    (o = (l = i.refetchType) != null ? l : i.type) != null
                        ? o
                        : "active",
            };
            return this.refetchQueries(u, s);
        });
    }
    refetchQueries(t, n, r) {
        const [i, s] = gt(t, n, r),
            o = ie.batch(() =>
                this.queryCache
                    .findAll(i)
                    .filter((u) => !u.isDisabled())
                    .map((u) => {
                        var a;
                        return u.fetch(void 0, {
                            ...s,
                            cancelRefetch:
                                (a = s == null ? void 0 : s.cancelRefetch) !=
                                null
                                    ? a
                                    : !0,
                            meta: { refetchPage: i.refetchPage },
                        });
                    }),
            );
        let l = Promise.all(o).then(Fe);
        return (s != null && s.throwOnError) || (l = l.catch(Fe)), l;
    }
    fetchQuery(t, n, r) {
        const i = Xn(t, n, r),
            s = this.defaultQueryOptions(i);
        typeof s.retry > "u" && (s.retry = !1);
        const o = this.queryCache.build(this, s);
        return o.isStaleByTime(s.staleTime)
            ? o.fetch(s)
            : Promise.resolve(o.state.data);
    }
    prefetchQuery(t, n, r) {
        return this.fetchQuery(t, n, r).then(Fe).catch(Fe);
    }
    fetchInfiniteQuery(t, n, r) {
        const i = Xn(t, n, r);
        return (i.behavior = N0()), this.fetchQuery(i);
    }
    prefetchInfiniteQuery(t, n, r) {
        return this.fetchInfiniteQuery(t, n, r).then(Fe).catch(Fe);
    }
    resumePausedMutations() {
        return this.mutationCache.resumePausedMutations();
    }
    getQueryCache() {
        return this.queryCache;
    }
    getMutationCache() {
        return this.mutationCache;
    }
    getLogger() {
        return this.logger;
    }
    getDefaultOptions() {
        return this.defaultOptions;
    }
    setDefaultOptions(t) {
        this.defaultOptions = t;
    }
    setQueryDefaults(t, n) {
        const r = this.queryDefaults.find((i) => Ht(t) === Ht(i.queryKey));
        r
            ? (r.defaultOptions = n)
            : this.queryDefaults.push({ queryKey: t, defaultOptions: n });
    }
    getQueryDefaults(t) {
        if (!t) return;
        const n = this.queryDefaults.find((r) => $i(t, r.queryKey));
        return n == null ? void 0 : n.defaultOptions;
    }
    setMutationDefaults(t, n) {
        const r = this.mutationDefaults.find(
            (i) => Ht(t) === Ht(i.mutationKey),
        );
        r
            ? (r.defaultOptions = n)
            : this.mutationDefaults.push({ mutationKey: t, defaultOptions: n });
    }
    getMutationDefaults(t) {
        if (!t) return;
        const n = this.mutationDefaults.find((r) => $i(t, r.mutationKey));
        return n == null ? void 0 : n.defaultOptions;
    }
    defaultQueryOptions(t) {
        if (t != null && t._defaulted) return t;
        const n = {
            ...this.defaultOptions.queries,
            ...this.getQueryDefaults(t == null ? void 0 : t.queryKey),
            ...t,
            _defaulted: !0,
        };
        return (
            !n.queryHash && n.queryKey && (n.queryHash = Kl(n.queryKey, n)),
            typeof n.refetchOnReconnect > "u" &&
                (n.refetchOnReconnect = n.networkMode !== "always"),
            typeof n.useErrorBoundary > "u" &&
                (n.useErrorBoundary = !!n.suspense),
            n
        );
    }
    defaultMutationOptions(t) {
        return t != null && t._defaulted
            ? t
            : {
                  ...this.defaultOptions.mutations,
                  ...this.getMutationDefaults(
                      t == null ? void 0 : t.mutationKey,
                  ),
                  ...t,
                  _defaulted: !0,
              };
    }
    clear() {
        this.queryCache.clear(), this.mutationCache.clear();
    }
}
class _0 extends Lr {
    constructor(t, n) {
        super(),
            (this.client = t),
            (this.options = n),
            (this.trackedProps = new Set()),
            (this.selectError = null),
            this.bindMethods(),
            this.setOptions(n);
    }
    bindMethods() {
        (this.remove = this.remove.bind(this)),
            (this.refetch = this.refetch.bind(this));
    }
    onSubscribe() {
        this.listeners.size === 1 &&
            (this.currentQuery.addObserver(this),
            wa(this.currentQuery, this.options) && this.executeFetch(),
            this.updateTimers());
    }
    onUnsubscribe() {
        this.hasListeners() || this.destroy();
    }
    shouldFetchOnReconnect() {
        return Go(
            this.currentQuery,
            this.options,
            this.options.refetchOnReconnect,
        );
    }
    shouldFetchOnWindowFocus() {
        return Go(
            this.currentQuery,
            this.options,
            this.options.refetchOnWindowFocus,
        );
    }
    destroy() {
        (this.listeners = new Set()),
            this.clearStaleTimeout(),
            this.clearRefetchInterval(),
            this.currentQuery.removeObserver(this);
    }
    setOptions(t, n) {
        const r = this.options,
            i = this.currentQuery;
        if (
            ((this.options = this.client.defaultQueryOptions(t)),
            Ho(r, this.options) ||
                this.client.getQueryCache().notify({
                    type: "observerOptionsUpdated",
                    query: this.currentQuery,
                    observer: this,
                }),
            typeof this.options.enabled < "u" &&
                typeof this.options.enabled != "boolean")
        )
            throw new Error("Expected enabled to be a boolean");
        this.options.queryKey || (this.options.queryKey = r.queryKey),
            this.updateQuery();
        const s = this.hasListeners();
        s && Sa(this.currentQuery, i, this.options, r) && this.executeFetch(),
            this.updateResult(n),
            s &&
                (this.currentQuery !== i ||
                    this.options.enabled !== r.enabled ||
                    this.options.staleTime !== r.staleTime) &&
                this.updateStaleTimeout();
        const o = this.computeRefetchInterval();
        s &&
            (this.currentQuery !== i ||
                this.options.enabled !== r.enabled ||
                o !== this.currentRefetchInterval) &&
            this.updateRefetchInterval(o);
    }
    getOptimisticResult(t) {
        const n = this.client.getQueryCache().build(this.client, t),
            r = this.createResult(n, t);
        return (
            P0(this, r, t) &&
                ((this.currentResult = r),
                (this.currentResultOptions = this.options),
                (this.currentResultState = this.currentQuery.state)),
            r
        );
    }
    getCurrentResult() {
        return this.currentResult;
    }
    trackResult(t) {
        const n = {};
        return (
            Object.keys(t).forEach((r) => {
                Object.defineProperty(n, r, {
                    configurable: !1,
                    enumerable: !0,
                    get: () => (this.trackedProps.add(r), t[r]),
                });
            }),
            n
        );
    }
    getCurrentQuery() {
        return this.currentQuery;
    }
    remove() {
        this.client.getQueryCache().remove(this.currentQuery);
    }
    refetch({ refetchPage: t, ...n } = {}) {
        return this.fetch({ ...n, meta: { refetchPage: t } });
    }
    fetchOptimistic(t) {
        const n = this.client.defaultQueryOptions(t),
            r = this.client.getQueryCache().build(this.client, n);
        return (
            (r.isFetchingOptimistic = !0),
            r.fetch().then(() => this.createResult(r, n))
        );
    }
    fetch(t) {
        var n;
        return this.executeFetch({
            ...t,
            cancelRefetch: (n = t.cancelRefetch) != null ? n : !0,
        }).then(() => (this.updateResult(), this.currentResult));
    }
    executeFetch(t) {
        this.updateQuery();
        let n = this.currentQuery.fetch(this.options, t);
        return (t != null && t.throwOnError) || (n = n.catch(Fe)), n;
    }
    updateStaleTimeout() {
        if (
            (this.clearStaleTimeout(),
            Tr || this.currentResult.isStale || !qo(this.options.staleTime))
        )
            return;
        const n =
            nd(this.currentResult.dataUpdatedAt, this.options.staleTime) + 1;
        this.staleTimeoutId = setTimeout(() => {
            this.currentResult.isStale || this.updateResult();
        }, n);
    }
    computeRefetchInterval() {
        var t;
        return typeof this.options.refetchInterval == "function"
            ? this.options.refetchInterval(
                  this.currentResult.data,
                  this.currentQuery,
              )
            : (t = this.options.refetchInterval) != null
            ? t
            : !1;
    }
    updateRefetchInterval(t) {
        this.clearRefetchInterval(),
            (this.currentRefetchInterval = t),
            !(
                Tr ||
                this.options.enabled === !1 ||
                !qo(this.currentRefetchInterval) ||
                this.currentRefetchInterval === 0
            ) &&
                (this.refetchIntervalId = setInterval(() => {
                    (this.options.refetchIntervalInBackground ||
                        qi.isFocused()) &&
                        this.executeFetch();
                }, this.currentRefetchInterval));
    }
    updateTimers() {
        this.updateStaleTimeout(),
            this.updateRefetchInterval(this.computeRefetchInterval());
    }
    clearStaleTimeout() {
        this.staleTimeoutId &&
            (clearTimeout(this.staleTimeoutId), (this.staleTimeoutId = void 0));
    }
    clearRefetchInterval() {
        this.refetchIntervalId &&
            (clearInterval(this.refetchIntervalId),
            (this.refetchIntervalId = void 0));
    }
    createResult(t, n) {
        const r = this.currentQuery,
            i = this.options,
            s = this.currentResult,
            o = this.currentResultState,
            l = this.currentResultOptions,
            u = t !== r,
            a = u ? t.state : this.currentQueryInitialState,
            c = u ? this.currentResult : this.previousQueryResult,
            { state: h } = t;
        let {
                dataUpdatedAt: m,
                error: y,
                errorUpdatedAt: v,
                fetchStatus: g,
                status: C,
            } = h,
            d = !1,
            f = !1,
            p;
        if (n._optimisticResults) {
            const k = this.hasListeners(),
                z = !k && wa(t, n),
                j = k && Sa(t, r, n, i);
            (z || j) &&
                ((g = ps(t.options.networkMode) ? "fetching" : "paused"),
                m || (C = "loading")),
                n._optimisticResults === "isRestoring" && (g = "idle");
        }
        if (
            n.keepPreviousData &&
            !h.dataUpdatedAt &&
            c != null &&
            c.isSuccess &&
            C !== "error"
        )
            (p = c.data), (m = c.dataUpdatedAt), (C = c.status), (d = !0);
        else if (n.select && typeof h.data < "u")
            if (
                s &&
                h.data === (o == null ? void 0 : o.data) &&
                n.select === this.selectFn
            )
                p = this.selectResult;
            else
                try {
                    (this.selectFn = n.select),
                        (p = n.select(h.data)),
                        (p = bo(s == null ? void 0 : s.data, p, n)),
                        (this.selectResult = p),
                        (this.selectError = null);
                } catch (k) {
                    this.selectError = k;
                }
        else p = h.data;
        if (
            typeof n.placeholderData < "u" &&
            typeof p > "u" &&
            C === "loading"
        ) {
            let k;
            if (
                s != null &&
                s.isPlaceholderData &&
                n.placeholderData === (l == null ? void 0 : l.placeholderData)
            )
                k = s.data;
            else if (
                ((k =
                    typeof n.placeholderData == "function"
                        ? n.placeholderData()
                        : n.placeholderData),
                n.select && typeof k < "u")
            )
                try {
                    (k = n.select(k)), (this.selectError = null);
                } catch (z) {
                    this.selectError = z;
                }
            typeof k < "u" &&
                ((C = "success"),
                (p = bo(s == null ? void 0 : s.data, k, n)),
                (f = !0));
        }
        this.selectError &&
            ((y = this.selectError),
            (p = this.selectResult),
            (v = Date.now()),
            (C = "error"));
        const E = g === "fetching",
            _ = C === "loading",
            T = C === "error";
        return {
            status: C,
            fetchStatus: g,
            isLoading: _,
            isSuccess: C === "success",
            isError: T,
            isInitialLoading: _ && E,
            data: p,
            dataUpdatedAt: m,
            error: y,
            errorUpdatedAt: v,
            failureCount: h.fetchFailureCount,
            failureReason: h.fetchFailureReason,
            errorUpdateCount: h.errorUpdateCount,
            isFetched: h.dataUpdateCount > 0 || h.errorUpdateCount > 0,
            isFetchedAfterMount:
                h.dataUpdateCount > a.dataUpdateCount ||
                h.errorUpdateCount > a.errorUpdateCount,
            isFetching: E,
            isRefetching: E && !_,
            isLoadingError: T && h.dataUpdatedAt === 0,
            isPaused: g === "paused",
            isPlaceholderData: f,
            isPreviousData: d,
            isRefetchError: T && h.dataUpdatedAt !== 0,
            isStale: Xl(t, n),
            refetch: this.refetch,
            remove: this.remove,
        };
    }
    updateResult(t) {
        const n = this.currentResult,
            r = this.createResult(this.currentQuery, this.options);
        if (
            ((this.currentResultState = this.currentQuery.state),
            (this.currentResultOptions = this.options),
            Ho(r, n))
        )
            return;
        this.currentResult = r;
        const i = { cache: !0 },
            s = () => {
                if (!n) return !0;
                const { notifyOnChangeProps: o } = this.options,
                    l = typeof o == "function" ? o() : o;
                if (l === "all" || (!l && !this.trackedProps.size)) return !0;
                const u = new Set(l ?? this.trackedProps);
                return (
                    this.options.useErrorBoundary && u.add("error"),
                    Object.keys(this.currentResult).some((a) => {
                        const c = a;
                        return this.currentResult[c] !== n[c] && u.has(c);
                    })
                );
            };
        (t == null ? void 0 : t.listeners) !== !1 && s() && (i.listeners = !0),
            this.notify({ ...i, ...t });
    }
    updateQuery() {
        const t = this.client.getQueryCache().build(this.client, this.options);
        if (t === this.currentQuery) return;
        const n = this.currentQuery;
        (this.currentQuery = t),
            (this.currentQueryInitialState = t.state),
            (this.previousQueryResult = this.currentResult),
            this.hasListeners() &&
                (n == null || n.removeObserver(this), t.addObserver(this));
    }
    onQueryUpdate(t) {
        const n = {};
        t.type === "success"
            ? (n.onSuccess = !t.manual)
            : t.type === "error" && !mi(t.error) && (n.onError = !0),
            this.updateResult(n),
            this.hasListeners() && this.updateTimers();
    }
    notify(t) {
        ie.batch(() => {
            if (t.onSuccess) {
                var n, r, i, s;
                (n = (r = this.options).onSuccess) == null ||
                    n.call(r, this.currentResult.data),
                    (i = (s = this.options).onSettled) == null ||
                        i.call(s, this.currentResult.data, null);
            } else if (t.onError) {
                var o, l, u, a;
                (o = (l = this.options).onError) == null ||
                    o.call(l, this.currentResult.error),
                    (u = (a = this.options).onSettled) == null ||
                        u.call(a, void 0, this.currentResult.error);
            }
            t.listeners &&
                this.listeners.forEach(({ listener: c }) => {
                    c(this.currentResult);
                }),
                t.cache &&
                    this.client.getQueryCache().notify({
                        query: this.currentQuery,
                        type: "observerResultsUpdated",
                    });
        });
    }
}
function R0(e, t) {
    return (
        t.enabled !== !1 &&
        !e.state.dataUpdatedAt &&
        !(e.state.status === "error" && t.retryOnMount === !1)
    );
}
function wa(e, t) {
    return (
        R0(e, t) || (e.state.dataUpdatedAt > 0 && Go(e, t, t.refetchOnMount))
    );
}
function Go(e, t, n) {
    if (t.enabled !== !1) {
        const r = typeof n == "function" ? n(e) : n;
        return r === "always" || (r !== !1 && Xl(e, t));
    }
    return !1;
}
function Sa(e, t, n, r) {
    return (
        n.enabled !== !1 &&
        (e !== t || r.enabled === !1) &&
        (!n.suspense || e.state.status !== "error") &&
        Xl(e, n)
    );
}
function Xl(e, t) {
    return e.isStaleByTime(t.staleTime);
}
function P0(e, t, n) {
    return n.keepPreviousData
        ? !1
        : n.placeholderData !== void 0
        ? t.isPlaceholderData
        : !Ho(e.getCurrentResult(), t);
}
var ad = { exports: {} },
    cd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var An = R;
function I0(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var D0 = typeof Object.is == "function" ? Object.is : I0,
    A0 = An.useState,
    L0 = An.useEffect,
    F0 = An.useLayoutEffect,
    j0 = An.useDebugValue;
function M0(e, t) {
    var n = t(),
        r = A0({ inst: { value: n, getSnapshot: t } }),
        i = r[0].inst,
        s = r[1];
    return (
        F0(
            function () {
                (i.value = n), (i.getSnapshot = t), Hs(i) && s({ inst: i });
            },
            [e, n, t],
        ),
        L0(
            function () {
                return (
                    Hs(i) && s({ inst: i }),
                    e(function () {
                        Hs(i) && s({ inst: i });
                    })
                );
            },
            [e],
        ),
        j0(n),
        n
    );
}
function Hs(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !D0(e, n);
    } catch {
        return !0;
    }
}
function U0(e, t) {
    return t();
}
var z0 =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
        ? U0
        : M0;
cd.useSyncExternalStore =
    An.useSyncExternalStore !== void 0 ? An.useSyncExternalStore : z0;
ad.exports = cd;
var B0 = ad.exports;
const V0 = B0.useSyncExternalStore,
    Ca = R.createContext(void 0),
    fd = R.createContext(!1);
function dd(e, t) {
    return (
        e ||
        (t && typeof window < "u"
            ? (window.ReactQueryClientContext ||
                  (window.ReactQueryClientContext = Ca),
              window.ReactQueryClientContext)
            : Ca)
    );
}
const Q0 = ({ context: e } = {}) => {
        const t = R.useContext(dd(e, R.useContext(fd)));
        if (!t)
            throw new Error(
                "No QueryClient set, use QueryClientProvider to set one",
            );
        return t;
    },
    $0 = ({ client: e, children: t, context: n, contextSharing: r = !1 }) => {
        R.useEffect(
            () => (
                e.mount(),
                () => {
                    e.unmount();
                }
            ),
            [e],
        );
        const i = dd(n, r);
        return R.createElement(
            fd.Provider,
            { value: !n && r },
            R.createElement(i.Provider, { value: e }, t),
        );
    },
    hd = R.createContext(!1),
    q0 = () => R.useContext(hd);
hd.Provider;
function H0() {
    let e = !1;
    return {
        clearReset: () => {
            e = !1;
        },
        reset: () => {
            e = !0;
        },
        isReset: () => e,
    };
}
const W0 = R.createContext(H0()),
    b0 = () => R.useContext(W0);
function G0(e, t) {
    return typeof e == "function" ? e(...t) : !!e;
}
const K0 = (e, t) => {
        (e.suspense || e.useErrorBoundary) &&
            (t.isReset() || (e.retryOnMount = !1));
    },
    Y0 = (e) => {
        R.useEffect(() => {
            e.clearReset();
        }, [e]);
    },
    X0 = ({
        result: e,
        errorResetBoundary: t,
        useErrorBoundary: n,
        query: r,
    }) => e.isError && !t.isReset() && !e.isFetching && G0(n, [e.error, r]),
    J0 = (e) => {
        e.suspense && typeof e.staleTime != "number" && (e.staleTime = 1e3);
    },
    Z0 = (e, t) => e.isLoading && e.isFetching && !t,
    em = (e, t, n) => (e == null ? void 0 : e.suspense) && Z0(t, n),
    tm = (e, t, n) =>
        t
            .fetchOptimistic(e)
            .then(({ data: r }) => {
                e.onSuccess == null || e.onSuccess(r),
                    e.onSettled == null || e.onSettled(r, null);
            })
            .catch((r) => {
                n.clearReset(),
                    e.onError == null || e.onError(r),
                    e.onSettled == null || e.onSettled(void 0, r);
            });
function nm(e, t) {
    const n = Q0({ context: e.context }),
        r = q0(),
        i = b0(),
        s = n.defaultQueryOptions(e);
    (s._optimisticResults = r ? "isRestoring" : "optimistic"),
        s.onError && (s.onError = ie.batchCalls(s.onError)),
        s.onSuccess && (s.onSuccess = ie.batchCalls(s.onSuccess)),
        s.onSettled && (s.onSettled = ie.batchCalls(s.onSettled)),
        J0(s),
        K0(s, i),
        Y0(i);
    const [o] = R.useState(() => new t(n, s)),
        l = o.getOptimisticResult(s);
    if (
        (V0(
            R.useCallback(
                (u) => {
                    const a = r ? () => {} : o.subscribe(ie.batchCalls(u));
                    return o.updateResult(), a;
                },
                [o, r],
            ),
            () => o.getCurrentResult(),
            () => o.getCurrentResult(),
        ),
        R.useEffect(() => {
            o.setOptions(s, { listeners: !1 });
        }, [s, o]),
        em(s, l, r))
    )
        throw tm(s, o, i);
    if (
        X0({
            result: l,
            errorResetBoundary: i,
            useErrorBoundary: s.useErrorBoundary,
            query: o.getCurrentQuery(),
        })
    )
        throw l.error;
    return s.notifyOnChangeProps ? l : o.trackResult(l);
}
function pd(e, t, n) {
    const r = Xn(e, t, n);
    return nm(r, _0);
}
/**
 * @remix-run/router v1.9.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Or() {
    return (
        (Or = Object.assign
            ? Object.assign.bind()
            : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var r in n)
                          Object.prototype.hasOwnProperty.call(n, r) &&
                              (e[r] = n[r]);
                  }
                  return e;
              }),
        Or.apply(this, arguments)
    );
}
var Ct;
(function (e) {
    (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(Ct || (Ct = {}));
const ka = "popstate";
function rm(e) {
    e === void 0 && (e = {});
    function t(r, i) {
        let { pathname: s, search: o, hash: l } = r.location;
        return Ko(
            "",
            { pathname: s, search: o, hash: l },
            (i.state && i.state.usr) || null,
            (i.state && i.state.key) || "default",
        );
    }
    function n(r, i) {
        return typeof i == "string" ? i : Wi(i);
    }
    return sm(t, n, null, e);
}
function oe(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Jl(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t);
        } catch {}
    }
}
function im() {
    return Math.random().toString(36).substr(2, 8);
}
function Na(e, t) {
    return { usr: e.state, key: e.key, idx: t };
}
function Ko(e, t, n, r) {
    return (
        n === void 0 && (n = null),
        Or(
            {
                pathname: typeof e == "string" ? e : e.pathname,
                search: "",
                hash: "",
            },
            typeof t == "string" ? Mn(t) : t,
            { state: n, key: (t && t.key) || r || im() },
        )
    );
}
function Wi(e) {
    let { pathname: t = "/", search: n = "", hash: r = "" } = e;
    return (
        n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
        r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
        t
    );
}
function Mn(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
        let r = e.indexOf("?");
        r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
            e && (t.pathname = e);
    }
    return t;
}
function sm(e, t, n, r) {
    r === void 0 && (r = {});
    let { window: i = document.defaultView, v5Compat: s = !1 } = r,
        o = i.history,
        l = Ct.Pop,
        u = null,
        a = c();
    a == null && ((a = 0), o.replaceState(Or({}, o.state, { idx: a }), ""));
    function c() {
        return (o.state || { idx: null }).idx;
    }
    function h() {
        l = Ct.Pop;
        let C = c(),
            d = C == null ? null : C - a;
        (a = C), u && u({ action: l, location: g.location, delta: d });
    }
    function m(C, d) {
        l = Ct.Push;
        let f = Ko(g.location, C, d);
        n && n(f, C), (a = c() + 1);
        let p = Na(f, a),
            E = g.createHref(f);
        try {
            o.pushState(p, "", E);
        } catch (_) {
            if (_ instanceof DOMException && _.name === "DataCloneError")
                throw _;
            i.location.assign(E);
        }
        s && u && u({ action: l, location: g.location, delta: 1 });
    }
    function y(C, d) {
        l = Ct.Replace;
        let f = Ko(g.location, C, d);
        n && n(f, C), (a = c());
        let p = Na(f, a),
            E = g.createHref(f);
        o.replaceState(p, "", E),
            s && u && u({ action: l, location: g.location, delta: 0 });
    }
    function v(C) {
        let d =
                i.location.origin !== "null"
                    ? i.location.origin
                    : i.location.href,
            f = typeof C == "string" ? C : Wi(C);
        return (
            oe(
                d,
                "No window.location.(origin|href) available to create URL for href: " +
                    f,
            ),
            new URL(f, d)
        );
    }
    let g = {
        get action() {
            return l;
        },
        get location() {
            return e(i, o);
        },
        listen(C) {
            if (u)
                throw new Error("A history only accepts one active listener");
            return (
                i.addEventListener(ka, h),
                (u = C),
                () => {
                    i.removeEventListener(ka, h), (u = null);
                }
            );
        },
        createHref(C) {
            return t(i, C);
        },
        createURL: v,
        encodeLocation(C) {
            let d = v(C);
            return { pathname: d.pathname, search: d.search, hash: d.hash };
        },
        push: m,
        replace: y,
        go(C) {
            return o.go(C);
        },
    };
    return g;
}
var Ta;
(function (e) {
    (e.data = "data"),
        (e.deferred = "deferred"),
        (e.redirect = "redirect"),
        (e.error = "error");
})(Ta || (Ta = {}));
function om(e, t, n) {
    n === void 0 && (n = "/");
    let r = typeof t == "string" ? Mn(t) : t,
        i = Zl(r.pathname || "/", n);
    if (i == null) return null;
    let s = md(e);
    lm(s);
    let o = null;
    for (let l = 0; o == null && l < s.length; ++l) o = vm(s[l], xm(i));
    return o;
}
function md(e, t, n, r) {
    t === void 0 && (t = []),
        n === void 0 && (n = []),
        r === void 0 && (r = "");
    let i = (s, o, l) => {
        let u = {
            relativePath: l === void 0 ? s.path || "" : l,
            caseSensitive: s.caseSensitive === !0,
            childrenIndex: o,
            route: s,
        };
        u.relativePath.startsWith("/") &&
            (oe(
                u.relativePath.startsWith(r),
                'Absolute route path "' +
                    u.relativePath +
                    '" nested under path ' +
                    ('"' +
                        r +
                        '" is not valid. An absolute child route path ') +
                    "must start with the combined path of all its parent routes.",
            ),
            (u.relativePath = u.relativePath.slice(r.length)));
        let a = Dt([r, u.relativePath]),
            c = n.concat(u);
        s.children &&
            s.children.length > 0 &&
            (oe(
                s.index !== !0,
                "Index routes must not have child routes. Please remove " +
                    ('all child routes from route path "' + a + '".'),
            ),
            md(s.children, t, c, a)),
            !(s.path == null && !s.index) &&
                t.push({ path: a, score: pm(a, s.index), routesMeta: c });
    };
    return (
        e.forEach((s, o) => {
            var l;
            if (s.path === "" || !((l = s.path) != null && l.includes("?")))
                i(s, o);
            else for (let u of vd(s.path)) i(s, o, u);
        }),
        t
    );
}
function vd(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [n, ...r] = t,
        i = n.endsWith("?"),
        s = n.replace(/\?$/, "");
    if (r.length === 0) return i ? [s, ""] : [s];
    let o = vd(r.join("/")),
        l = [];
    return (
        l.push(...o.map((u) => (u === "" ? s : [s, u].join("/")))),
        i && l.push(...o),
        l.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
    );
}
function lm(e) {
    e.sort((t, n) =>
        t.score !== n.score
            ? n.score - t.score
            : mm(
                  t.routesMeta.map((r) => r.childrenIndex),
                  n.routesMeta.map((r) => r.childrenIndex),
              ),
    );
}
const um = /^:\w+$/,
    am = 3,
    cm = 2,
    fm = 1,
    dm = 10,
    hm = -2,
    Oa = (e) => e === "*";
function pm(e, t) {
    let n = e.split("/"),
        r = n.length;
    return (
        n.some(Oa) && (r += hm),
        t && (r += cm),
        n
            .filter((i) => !Oa(i))
            .reduce((i, s) => i + (um.test(s) ? am : s === "" ? fm : dm), r)
    );
}
function mm(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i])
        ? e[e.length - 1] - t[t.length - 1]
        : 0;
}
function vm(e, t) {
    let { routesMeta: n } = e,
        r = {},
        i = "/",
        s = [];
    for (let o = 0; o < n.length; ++o) {
        let l = n[o],
            u = o === n.length - 1,
            a = i === "/" ? t : t.slice(i.length) || "/",
            c = ym(
                {
                    path: l.relativePath,
                    caseSensitive: l.caseSensitive,
                    end: u,
                },
                a,
            );
        if (!c) return null;
        Object.assign(r, c.params);
        let h = l.route;
        s.push({
            params: r,
            pathname: Dt([i, c.pathname]),
            pathnameBase: Cm(Dt([i, c.pathnameBase])),
            route: h,
        }),
            c.pathnameBase !== "/" && (i = Dt([i, c.pathnameBase]));
    }
    return s;
}
function ym(e, t) {
    typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
    let [n, r] = gm(e.path, e.caseSensitive, e.end),
        i = t.match(n);
    if (!i) return null;
    let s = i[0],
        o = s.replace(/(.)\/+$/, "$1"),
        l = i.slice(1);
    return {
        params: r.reduce((a, c, h) => {
            if (c === "*") {
                let m = l[h] || "";
                o = s.slice(0, s.length - m.length).replace(/(.)\/+$/, "$1");
            }
            return (a[c] = Em(l[h] || "", c)), a;
        }, {}),
        pathname: s,
        pathnameBase: o,
        pattern: e,
    };
}
function gm(e, t, n) {
    t === void 0 && (t = !1),
        n === void 0 && (n = !0),
        Jl(
            e === "*" || !e.endsWith("*") || e.endsWith("/*"),
            'Route path "' +
                e +
                '" will be treated as if it were ' +
                ('"' +
                    e.replace(/\*$/, "/*") +
                    '" because the `*` character must ') +
                "always follow a `/` in the pattern. To get rid of this warning, " +
                ('please change the route path to "' +
                    e.replace(/\*$/, "/*") +
                    '".'),
        );
    let r = [],
        i =
            "^" +
            e
                .replace(/\/*\*?$/, "")
                .replace(/^\/*/, "/")
                .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&")
                .replace(/\/:(\w+)/g, (o, l) => (r.push(l), "/([^\\/]+)"));
    return (
        e.endsWith("*")
            ? (r.push("*"),
              (i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
            : n
            ? (i += "\\/*$")
            : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"),
        [new RegExp(i, t ? void 0 : "i"), r]
    );
}
function xm(e) {
    try {
        return decodeURI(e);
    } catch (t) {
        return (
            Jl(
                !1,
                'The URL path "' +
                    e +
                    '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
                    ("encoding (" + t + ")."),
            ),
            e
        );
    }
}
function Em(e, t) {
    try {
        return decodeURIComponent(e);
    } catch (n) {
        return (
            Jl(
                !1,
                'The value for the URL param "' +
                    t +
                    '" will not be decoded because' +
                    (' the string "' +
                        e +
                        '" is a malformed URL segment. This is probably') +
                    (" due to a bad percent encoding (" + n + ")."),
            ),
            e
        );
    }
}
function Zl(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
        r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/";
}
function wm(e, t) {
    t === void 0 && (t = "/");
    let {
        pathname: n,
        search: r = "",
        hash: i = "",
    } = typeof e == "string" ? Mn(e) : e;
    return {
        pathname: n ? (n.startsWith("/") ? n : Sm(n, t)) : t,
        search: km(r),
        hash: Nm(i),
    };
}
function Sm(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return (
        e.split("/").forEach((i) => {
            i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
        }),
        n.length > 1 ? n.join("/") : "/"
    );
}
function Ws(e, t, n, r) {
    return (
        "Cannot include a '" +
        e +
        "' character in a manually specified " +
        ("`to." +
            t +
            "` field [" +
            JSON.stringify(r) +
            "].  Please separate it out to the ") +
        ("`to." +
            n +
            "` field. Alternatively you may provide the full path as ") +
        'a string in <Link to="..."> and the router will parse it for you.'
    );
}
function yd(e) {
    return e.filter(
        (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
    );
}
function gd(e, t, n, r) {
    r === void 0 && (r = !1);
    let i;
    typeof e == "string"
        ? (i = Mn(e))
        : ((i = Or({}, e)),
          oe(
              !i.pathname || !i.pathname.includes("?"),
              Ws("?", "pathname", "search", i),
          ),
          oe(
              !i.pathname || !i.pathname.includes("#"),
              Ws("#", "pathname", "hash", i),
          ),
          oe(
              !i.search || !i.search.includes("#"),
              Ws("#", "search", "hash", i),
          ));
    let s = e === "" || i.pathname === "",
        o = s ? "/" : i.pathname,
        l;
    if (r || o == null) l = n;
    else {
        let h = t.length - 1;
        if (o.startsWith("..")) {
            let m = o.split("/");
            for (; m[0] === ".."; ) m.shift(), (h -= 1);
            i.pathname = m.join("/");
        }
        l = h >= 0 ? t[h] : "/";
    }
    let u = wm(i, l),
        a = o && o !== "/" && o.endsWith("/"),
        c = (s || o === ".") && n.endsWith("/");
    return !u.pathname.endsWith("/") && (a || c) && (u.pathname += "/"), u;
}
const Dt = (e) => e.join("/").replace(/\/\/+/g, "/"),
    Cm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    km = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
    Nm = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Tm(e) {
    return (
        e != null &&
        typeof e.status == "number" &&
        typeof e.statusText == "string" &&
        typeof e.internal == "boolean" &&
        "data" in e
    );
}
const xd = ["post", "put", "patch", "delete"];
new Set(xd);
const Om = ["get", ...xd];
new Set(Om);
/**
 * React Router v6.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function bi() {
    return (
        (bi = Object.assign
            ? Object.assign.bind()
            : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var r in n)
                          Object.prototype.hasOwnProperty.call(n, r) &&
                              (e[r] = n[r]);
                  }
                  return e;
              }),
        bi.apply(this, arguments)
    );
}
const eu = R.createContext(null),
    Ed = R.createContext(null),
    nn = R.createContext(null),
    ms = R.createContext(null),
    dt = R.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
    wd = R.createContext(null);
function _m(e, t) {
    let { relative: n } = t === void 0 ? {} : t;
    Fr() || oe(!1);
    let { basename: r, navigator: i } = R.useContext(nn),
        { hash: s, pathname: o, search: l } = tu(e, { relative: n }),
        u = o;
    return (
        r !== "/" && (u = o === "/" ? r : Dt([r, o])),
        i.createHref({ pathname: u, search: l, hash: s })
    );
}
function Fr() {
    return R.useContext(ms) != null;
}
function jr() {
    return Fr() || oe(!1), R.useContext(ms).location;
}
function Sd(e) {
    R.useContext(nn).static || R.useLayoutEffect(e);
}
function Cd() {
    let { isDataRoute: e } = R.useContext(dt);
    return e ? qm() : Rm();
}
function Rm() {
    Fr() || oe(!1);
    let e = R.useContext(eu),
        { basename: t, navigator: n } = R.useContext(nn),
        { matches: r } = R.useContext(dt),
        { pathname: i } = jr(),
        s = JSON.stringify(yd(r).map((u) => u.pathnameBase)),
        o = R.useRef(!1);
    return (
        Sd(() => {
            o.current = !0;
        }),
        R.useCallback(
            function (u, a) {
                if ((a === void 0 && (a = {}), !o.current)) return;
                if (typeof u == "number") {
                    n.go(u);
                    return;
                }
                let c = gd(u, JSON.parse(s), i, a.relative === "path");
                e == null &&
                    t !== "/" &&
                    (c.pathname = c.pathname === "/" ? t : Dt([t, c.pathname])),
                    (a.replace ? n.replace : n.push)(c, a.state, a);
            },
            [t, n, s, i, e],
        )
    );
}
const Pm = R.createContext(null);
function Im(e) {
    let t = R.useContext(dt).outlet;
    return t && R.createElement(Pm.Provider, { value: e }, t);
}
function Dm() {
    let { matches: e } = R.useContext(dt),
        t = e[e.length - 1];
    return t ? t.params : {};
}
function tu(e, t) {
    let { relative: n } = t === void 0 ? {} : t,
        { matches: r } = R.useContext(dt),
        { pathname: i } = jr(),
        s = JSON.stringify(yd(r).map((o) => o.pathnameBase));
    return R.useMemo(() => gd(e, JSON.parse(s), i, n === "path"), [e, s, i, n]);
}
function Am(e, t) {
    return Lm(e, t);
}
function Lm(e, t, n) {
    Fr() || oe(!1);
    let { navigator: r } = R.useContext(nn),
        { matches: i } = R.useContext(dt),
        s = i[i.length - 1],
        o = s ? s.params : {};
    s && s.pathname;
    let l = s ? s.pathnameBase : "/";
    s && s.route;
    let u = jr(),
        a;
    if (t) {
        var c;
        let g = typeof t == "string" ? Mn(t) : t;
        l === "/" || ((c = g.pathname) != null && c.startsWith(l)) || oe(!1),
            (a = g);
    } else a = u;
    let h = a.pathname || "/",
        m = l === "/" ? h : h.slice(l.length) || "/",
        y = om(e, { pathname: m }),
        v = zm(
            y &&
                y.map((g) =>
                    Object.assign({}, g, {
                        params: Object.assign({}, o, g.params),
                        pathname: Dt([
                            l,
                            r.encodeLocation
                                ? r.encodeLocation(g.pathname).pathname
                                : g.pathname,
                        ]),
                        pathnameBase:
                            g.pathnameBase === "/"
                                ? l
                                : Dt([
                                      l,
                                      r.encodeLocation
                                          ? r.encodeLocation(g.pathnameBase)
                                                .pathname
                                          : g.pathnameBase,
                                  ]),
                    }),
                ),
            i,
            n,
        );
    return t && v
        ? R.createElement(
              ms.Provider,
              {
                  value: {
                      location: bi(
                          {
                              pathname: "/",
                              search: "",
                              hash: "",
                              state: null,
                              key: "default",
                          },
                          a,
                      ),
                      navigationType: Ct.Pop,
                  },
              },
              v,
          )
        : v;
}
function Fm() {
    let e = $m(),
        t = Tm(e)
            ? e.status + " " + e.statusText
            : e instanceof Error
            ? e.message
            : JSON.stringify(e),
        n = e instanceof Error ? e.stack : null,
        i = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" },
        s = null;
    return R.createElement(
        R.Fragment,
        null,
        R.createElement("h2", null, "Unexpected Application Error!"),
        R.createElement("h3", { style: { fontStyle: "italic" } }, t),
        n ? R.createElement("pre", { style: i }, n) : null,
        s,
    );
}
const jm = R.createElement(Fm, null);
class Mm extends R.Component {
    constructor(t) {
        super(t),
            (this.state = {
                location: t.location,
                revalidation: t.revalidation,
                error: t.error,
            });
    }
    static getDerivedStateFromError(t) {
        return { error: t };
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location ||
            (n.revalidation !== "idle" && t.revalidation === "idle")
            ? {
                  error: t.error,
                  location: t.location,
                  revalidation: t.revalidation,
              }
            : {
                  error: t.error || n.error,
                  location: n.location,
                  revalidation: t.revalidation || n.revalidation,
              };
    }
    componentDidCatch(t, n) {
        console.error(
            "React Router caught the following error during render",
            t,
            n,
        );
    }
    render() {
        return this.state.error
            ? R.createElement(
                  dt.Provider,
                  { value: this.props.routeContext },
                  R.createElement(wd.Provider, {
                      value: this.state.error,
                      children: this.props.component,
                  }),
              )
            : this.props.children;
    }
}
function Um(e) {
    let { routeContext: t, match: n, children: r } = e,
        i = R.useContext(eu);
    return (
        i &&
            i.static &&
            i.staticContext &&
            (n.route.errorElement || n.route.ErrorBoundary) &&
            (i.staticContext._deepestRenderedBoundaryId = n.route.id),
        R.createElement(dt.Provider, { value: t }, r)
    );
}
function zm(e, t, n) {
    var r;
    if ((t === void 0 && (t = []), n === void 0 && (n = null), e == null)) {
        var i;
        if ((i = n) != null && i.errors) e = n.matches;
        else return null;
    }
    let s = e,
        o = (r = n) == null ? void 0 : r.errors;
    if (o != null) {
        let l = s.findIndex(
            (u) => u.route.id && (o == null ? void 0 : o[u.route.id]),
        );
        l >= 0 || oe(!1), (s = s.slice(0, Math.min(s.length, l + 1)));
    }
    return s.reduceRight((l, u, a) => {
        let c = u.route.id ? (o == null ? void 0 : o[u.route.id]) : null,
            h = null;
        n && (h = u.route.errorElement || jm);
        let m = t.concat(s.slice(0, a + 1)),
            y = () => {
                let v;
                return (
                    c
                        ? (v = h)
                        : u.route.Component
                        ? (v = R.createElement(u.route.Component, null))
                        : u.route.element
                        ? (v = u.route.element)
                        : (v = l),
                    R.createElement(Um, {
                        match: u,
                        routeContext: {
                            outlet: l,
                            matches: m,
                            isDataRoute: n != null,
                        },
                        children: v,
                    })
                );
            };
        return n && (u.route.ErrorBoundary || u.route.errorElement || a === 0)
            ? R.createElement(Mm, {
                  location: n.location,
                  revalidation: n.revalidation,
                  component: h,
                  error: c,
                  children: y(),
                  routeContext: { outlet: null, matches: m, isDataRoute: !0 },
              })
            : y();
    }, null);
}
var kd = (function (e) {
        return (
            (e.UseBlocker = "useBlocker"),
            (e.UseRevalidator = "useRevalidator"),
            (e.UseNavigateStable = "useNavigate"),
            e
        );
    })(kd || {}),
    Gi = (function (e) {
        return (
            (e.UseBlocker = "useBlocker"),
            (e.UseLoaderData = "useLoaderData"),
            (e.UseActionData = "useActionData"),
            (e.UseRouteError = "useRouteError"),
            (e.UseNavigation = "useNavigation"),
            (e.UseRouteLoaderData = "useRouteLoaderData"),
            (e.UseMatches = "useMatches"),
            (e.UseRevalidator = "useRevalidator"),
            (e.UseNavigateStable = "useNavigate"),
            (e.UseRouteId = "useRouteId"),
            e
        );
    })(Gi || {});
function Bm(e) {
    let t = R.useContext(eu);
    return t || oe(!1), t;
}
function Vm(e) {
    let t = R.useContext(Ed);
    return t || oe(!1), t;
}
function Qm(e) {
    let t = R.useContext(dt);
    return t || oe(!1), t;
}
function Nd(e) {
    let t = Qm(),
        n = t.matches[t.matches.length - 1];
    return n.route.id || oe(!1), n.route.id;
}
function $m() {
    var e;
    let t = R.useContext(wd),
        n = Vm(Gi.UseRouteError),
        r = Nd(Gi.UseRouteError);
    return t || ((e = n.errors) == null ? void 0 : e[r]);
}
function qm() {
    let { router: e } = Bm(kd.UseNavigateStable),
        t = Nd(Gi.UseNavigateStable),
        n = R.useRef(!1);
    return (
        Sd(() => {
            n.current = !0;
        }),
        R.useCallback(
            function (i, s) {
                s === void 0 && (s = {}),
                    n.current &&
                        (typeof i == "number"
                            ? e.navigate(i)
                            : e.navigate(i, bi({ fromRouteId: t }, s)));
            },
            [e, t],
        )
    );
}
function Hm(e) {
    return Im(e.context);
}
function _e(e) {
    oe(!1);
}
function Wm(e) {
    let {
        basename: t = "/",
        children: n = null,
        location: r,
        navigationType: i = Ct.Pop,
        navigator: s,
        static: o = !1,
    } = e;
    Fr() && oe(!1);
    let l = t.replace(/^\/*/, "/"),
        u = R.useMemo(
            () => ({ basename: l, navigator: s, static: o }),
            [l, s, o],
        );
    typeof r == "string" && (r = Mn(r));
    let {
            pathname: a = "/",
            search: c = "",
            hash: h = "",
            state: m = null,
            key: y = "default",
        } = r,
        v = R.useMemo(() => {
            let g = Zl(a, l);
            return g == null
                ? null
                : {
                      location: {
                          pathname: g,
                          search: c,
                          hash: h,
                          state: m,
                          key: y,
                      },
                      navigationType: i,
                  };
        }, [l, a, c, h, m, y, i]);
    return v == null
        ? null
        : R.createElement(
              nn.Provider,
              { value: u },
              R.createElement(ms.Provider, { children: n, value: v }),
          );
}
function bm(e) {
    let { children: t, location: n } = e;
    return Am(Yo(t), n);
}
new Promise(() => {});
function Yo(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return (
        R.Children.forEach(e, (r, i) => {
            if (!R.isValidElement(r)) return;
            let s = [...t, i];
            if (r.type === R.Fragment) {
                n.push.apply(n, Yo(r.props.children, s));
                return;
            }
            r.type !== _e && oe(!1),
                !r.props.index || !r.props.children || oe(!1);
            let o = {
                id: r.props.id || s.join("-"),
                caseSensitive: r.props.caseSensitive,
                element: r.props.element,
                Component: r.props.Component,
                index: r.props.index,
                path: r.props.path,
                loader: r.props.loader,
                action: r.props.action,
                errorElement: r.props.errorElement,
                ErrorBoundary: r.props.ErrorBoundary,
                hasErrorBoundary:
                    r.props.ErrorBoundary != null ||
                    r.props.errorElement != null,
                shouldRevalidate: r.props.shouldRevalidate,
                handle: r.props.handle,
                lazy: r.props.lazy,
            };
            r.props.children && (o.children = Yo(r.props.children, s)),
                n.push(o);
        }),
        n
    );
}
/**
 * React Router DOM v6.16.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Ki() {
    return (
        (Ki = Object.assign
            ? Object.assign.bind()
            : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                      var n = arguments[t];
                      for (var r in n)
                          Object.prototype.hasOwnProperty.call(n, r) &&
                              (e[r] = n[r]);
                  }
                  return e;
              }),
        Ki.apply(this, arguments)
    );
}
function Td(e, t) {
    if (e == null) return {};
    var n = {},
        r = Object.keys(e),
        i,
        s;
    for (s = 0; s < r.length; s++)
        (i = r[s]), !(t.indexOf(i) >= 0) && (n[i] = e[i]);
    return n;
}
function Gm(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Km(e, t) {
    return e.button === 0 && (!t || t === "_self") && !Gm(e);
}
const Ym = [
        "onClick",
        "relative",
        "reloadDocument",
        "replace",
        "state",
        "target",
        "to",
        "preventScrollReset",
    ],
    Xm = [
        "aria-current",
        "caseSensitive",
        "className",
        "end",
        "style",
        "to",
        "children",
    ],
    Jm = "startTransition",
    _a = rh[Jm];
function Zm(e) {
    let { basename: t, children: n, future: r, window: i } = e,
        s = R.useRef();
    s.current == null && (s.current = rm({ window: i, v5Compat: !0 }));
    let o = s.current,
        [l, u] = R.useState({ action: o.action, location: o.location }),
        { v7_startTransition: a } = r || {},
        c = R.useCallback(
            (h) => {
                a && _a ? _a(() => u(h)) : u(h);
            },
            [u, a],
        );
    return (
        R.useLayoutEffect(() => o.listen(c), [o, c]),
        R.createElement(Wm, {
            basename: t,
            children: n,
            location: l.location,
            navigationType: l.action,
            navigator: o,
        })
    );
}
const ev =
        typeof window < "u" &&
        typeof window.document < "u" &&
        typeof window.document.createElement < "u",
    tv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    Od = R.forwardRef(function (t, n) {
        let {
                onClick: r,
                relative: i,
                reloadDocument: s,
                replace: o,
                state: l,
                target: u,
                to: a,
                preventScrollReset: c,
            } = t,
            h = Td(t, Ym),
            { basename: m } = R.useContext(nn),
            y,
            v = !1;
        if (typeof a == "string" && tv.test(a) && ((y = a), ev))
            try {
                let f = new URL(window.location.href),
                    p = a.startsWith("//")
                        ? new URL(f.protocol + a)
                        : new URL(a),
                    E = Zl(p.pathname, m);
                p.origin === f.origin && E != null
                    ? (a = E + p.search + p.hash)
                    : (v = !0);
            } catch {}
        let g = _m(a, { relative: i }),
            C = nv(a, {
                replace: o,
                state: l,
                target: u,
                preventScrollReset: c,
                relative: i,
            });
        function d(f) {
            r && r(f), f.defaultPrevented || C(f);
        }
        return R.createElement(
            "a",
            Ki({}, h, {
                href: y || g,
                onClick: v || s ? r : d,
                ref: n,
                target: u,
            }),
        );
    }),
    mt = R.forwardRef(function (t, n) {
        let {
                "aria-current": r = "page",
                caseSensitive: i = !1,
                className: s = "",
                end: o = !1,
                style: l,
                to: u,
                children: a,
            } = t,
            c = Td(t, Xm),
            h = tu(u, { relative: c.relative }),
            m = jr(),
            y = R.useContext(Ed),
            { navigator: v } = R.useContext(nn),
            g = v.encodeLocation ? v.encodeLocation(h).pathname : h.pathname,
            C = m.pathname,
            d =
                y && y.navigation && y.navigation.location
                    ? y.navigation.location.pathname
                    : null;
        i ||
            ((C = C.toLowerCase()),
            (d = d ? d.toLowerCase() : null),
            (g = g.toLowerCase()));
        let f =
                C === g ||
                (!o && C.startsWith(g) && C.charAt(g.length) === "/"),
            p =
                d != null &&
                (d === g ||
                    (!o && d.startsWith(g) && d.charAt(g.length) === "/")),
            E = f ? r : void 0,
            _;
        typeof s == "function"
            ? (_ = s({ isActive: f, isPending: p }))
            : (_ = [s, f ? "active" : null, p ? "pending" : null]
                  .filter(Boolean)
                  .join(" "));
        let T = typeof l == "function" ? l({ isActive: f, isPending: p }) : l;
        return R.createElement(
            Od,
            Ki({}, c, {
                "aria-current": E,
                className: _,
                ref: n,
                style: T,
                to: u,
            }),
            typeof a == "function" ? a({ isActive: f, isPending: p }) : a,
        );
    });
var Ra;
(function (e) {
    (e.UseScrollRestoration = "useScrollRestoration"),
        (e.UseSubmit = "useSubmit"),
        (e.UseSubmitFetcher = "useSubmitFetcher"),
        (e.UseFetcher = "useFetcher");
})(Ra || (Ra = {}));
var Pa;
(function (e) {
    (e.UseFetchers = "useFetchers"),
        (e.UseScrollRestoration = "useScrollRestoration");
})(Pa || (Pa = {}));
function nv(e, t) {
    let {
            target: n,
            replace: r,
            state: i,
            preventScrollReset: s,
            relative: o,
        } = t === void 0 ? {} : t,
        l = Cd(),
        u = jr(),
        a = tu(e, { relative: o });
    return R.useCallback(
        (c) => {
            if (Km(c, n)) {
                c.preventDefault();
                let h = r !== void 0 ? r : Wi(u) === Wi(a);
                l(e, {
                    replace: h,
                    state: i,
                    preventScrollReset: s,
                    relative: o,
                });
            }
        },
        [u, l, a, r, i, n, e, s, o],
    );
}
const rv = ({ children: e }) => {
    const t = R.useRef(null);
    if (!t.current) {
        const n = document.createElement("div");
        t.current = n;
    }
    return (
        R.useEffect(() => {
            const n = document.getElementById("modal");
            return n.appendChild(t.current), () => n.removeChild(t.current);
        }, []),
        ed.createPortal(x.jsx("div", { children: e }), t.current)
    );
};
function sn() {
    const e = Cd(),
        [t, n] = R.useState(!1),
        [r, i] = R.useState(!1);
    return x.jsxs("div", {
        className: "flex w-full",
        children: [
            x.jsx("div", {
                className: ` ${
                    r ? "w-16" : "w-50"
                } flex flex-col h-screen p-3 shadow duration-300 hidden sm:block bg-base-200`,
                children: x.jsxs("div", {
                    className: "space-y-3",
                    children: [
                        x.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                                x.jsx(mt, {
                                    to: "/",
                                    className: `text-xl font-bold text-white ${
                                        r ? "invisible" : "visible"
                                    }`,
                                    children: "370 CRM",
                                }),
                                x.jsx("button", {
                                    onClick: () => i(!r),
                                    children: x.jsx("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: `w-6 h-6 ${
                                            r
                                                ? "fixed top-0 left-0 right-0 mx-5 my-4 z-10"
                                                : "z-0"
                                        } `,
                                        children: x.jsx("path", {
                                            fillRule: "evenodd",
                                            d: "M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z",
                                            clipRule: "evenodd",
                                        }),
                                    }),
                                }),
                            ],
                        }),
                        x.jsxs("div", {
                            className: "relative",
                            children: [
                                x.jsx("span", {
                                    className:
                                        "absolute inset-y-0 left-0 flex items-center py-4",
                                    children: x.jsx("button", {
                                        onClick: () => i(!r),
                                        type: "submit",
                                        className:
                                            "p-2 focus:outline-none focus:ring",
                                        children: x.jsx("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            fill: "currentColor",
                                            className: "w-6 h-6",
                                            children: x.jsx("path", {
                                                fillRule: "evenodd",
                                                d: "M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z",
                                                clipRule: "evenodd",
                                            }),
                                        }),
                                    }),
                                }),
                                x.jsx("input", {
                                    type: "search",
                                    name: "Search",
                                    placeholder: "Search...",
                                    className: `w-full py-2 pl-10 text-sm rounded-md focus:outline-none ${
                                        r ? "invisible" : "visible"
                                    }`,
                                }),
                            ],
                        }),
                        x.jsxs("div", {
                            className: "flex-1",
                            children: [
                                x.jsxs("ul", {
                                    className: "pt-2 pb-4 space-y-1 text-sm",
                                    children: [
                                        x.jsx("li", {
                                            className:
                                                "rounded-sm hover:bg-neutral",
                                            children: x.jsxs(mt, {
                                                to: "/dashboard",
                                                className: ({ isActive: s }) =>
                                                    s
                                                        ? "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center text-white"
                                                        : "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center",
                                                children: [
                                                    x.jsxs("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        viewBox: "0 0 24 24",
                                                        fill: "currentColor",
                                                        className:
                                                            "w-6 h-6 grid-auto",
                                                        children: [
                                                            x.jsx("path", {
                                                                d: "M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z",
                                                            }),
                                                            x.jsx("path", {
                                                                d: "M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z",
                                                            }),
                                                        ],
                                                    }),
                                                    x.jsx("span", {
                                                        className: ` ${
                                                            r
                                                                ? "invisible"
                                                                : "visible"
                                                        } text-gray-100 items-center`,
                                                        children: "Dashboard",
                                                    }),
                                                ],
                                            }),
                                        }),
                                        x.jsx("li", {
                                            className:
                                                "rounded-sm hover:bg-neutral",
                                            children: x.jsxs(mt, {
                                                to: "/clients",
                                                className: ({ isActive: s }) =>
                                                    s
                                                        ? "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center text-white"
                                                        : "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center",
                                                children: [
                                                    x.jsx("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        viewBox: "0 0 24 24",
                                                        fill: "currentColor",
                                                        className: "w-6 h-6",
                                                        children: x.jsx(
                                                            "path",
                                                            {
                                                                fillRule:
                                                                    "evenodd",
                                                                d: "M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z",
                                                                clipRule:
                                                                    "evenodd",
                                                            },
                                                        ),
                                                    }),
                                                    x.jsx("span", {
                                                        className: ` ${
                                                            r
                                                                ? "invisible"
                                                                : "visible"
                                                        } text-gray-100 items-center`,
                                                        children: "Clients",
                                                    }),
                                                ],
                                            }),
                                        }),
                                        x.jsx("li", {
                                            className:
                                                "rounded-sm hover:bg-neutral",
                                            children: x.jsxs(mt, {
                                                to: "/projects",
                                                className: ({ isActive: s }) =>
                                                    s
                                                        ? "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center text-white"
                                                        : "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center",
                                                children: [
                                                    x.jsxs("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        viewBox: "0 0 24 24",
                                                        fill: "currentColor",
                                                        className: "w-6 h-6",
                                                        children: [
                                                            x.jsx("path", {
                                                                fillRule:
                                                                    "evenodd",
                                                                d: "M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z",
                                                                clipRule:
                                                                    "evenodd",
                                                            }),
                                                            x.jsx("path", {
                                                                fillRule:
                                                                    "evenodd",
                                                                d: "M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z",
                                                                clipRule:
                                                                    "evenodd",
                                                            }),
                                                        ],
                                                    }),
                                                    x.jsx("span", {
                                                        className: ` ${
                                                            r
                                                                ? "invisible"
                                                                : "visible"
                                                        } text-gray-100 items-center`,
                                                        children: "Projects",
                                                    }),
                                                ],
                                            }),
                                        }),
                                        x.jsx("li", {
                                            className:
                                                "rounded-sm hover:bg-neutral",
                                            children: x.jsxs(mt, {
                                                to: "/admin",
                                                className: ({ isActive: s }) =>
                                                    s
                                                        ? "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center text-white"
                                                        : "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center",
                                                children: [
                                                    x.jsx("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        viewBox: "0 0 24 24",
                                                        fill: "currentColor",
                                                        className: "w-6 h-6",
                                                        children: x.jsx(
                                                            "path",
                                                            {
                                                                d: "M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z",
                                                            },
                                                        ),
                                                    }),
                                                    x.jsx("span", {
                                                        className: ` ${
                                                            r
                                                                ? "invisible"
                                                                : "visible"
                                                        } text-gray-100 items-center`,
                                                        children: "Admin",
                                                    }),
                                                ],
                                            }),
                                        }),
                                        x.jsx("li", {
                                            className:
                                                "rounded-sm hover:bg-neutral",
                                            children: x.jsxs("button", {
                                                onClick: () => n(!0),
                                                className:
                                                    "grid grid-cols-[25px_auto] p-2 space-x-3 rounded-md items-center",
                                                children: [
                                                    x.jsx("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        viewBox: "0 0 24 24",
                                                        fill: "currentColor",
                                                        className: "w-6 h-6",
                                                        children: x.jsx(
                                                            "path",
                                                            {
                                                                fillRule:
                                                                    "evenodd",
                                                                d: "M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z",
                                                                clipRule:
                                                                    "evenodd",
                                                            },
                                                        ),
                                                    }),
                                                    x.jsx("span", {
                                                        className: ` ${
                                                            r
                                                                ? "invisible"
                                                                : "visible"
                                                        } text-gray-100 items-center`,
                                                        children: "Logout",
                                                    }),
                                                ],
                                            }),
                                        }),
                                    ],
                                }),
                                t
                                    ? x.jsx(rv, {
                                          children: x.jsxs("div", {
                                              className:
                                                  "bg-neutral-focus drop-shadow-2xl rounded-full fixed top-0 left-0 right-0 m-20 p-10 z-10 grid grid-cols-1 place-content-center place-items-center",
                                              children: [
                                                  x.jsx("h1", {
                                                      className:
                                                          "text-2xl text-black m-4",
                                                      children: "Logout?",
                                                  }),
                                                  x.jsxs("div", {
                                                      className: "m-1",
                                                      children: [
                                                          x.jsx("button", {
                                                              className:
                                                                  "btn m-1",
                                                              onClick: () => {
                                                                  n(!1), e("/");
                                                              },
                                                              children: "Yes",
                                                          }),
                                                          x.jsx("button", {
                                                              className:
                                                                  "btn m-1",
                                                              onClick: () =>
                                                                  n(!1),
                                                              children: "No",
                                                          }),
                                                      ],
                                                  }),
                                              ],
                                          }),
                                      })
                                    : null,
                            ],
                        }),
                    ],
                }),
            }),
            x.jsxs("div", {
                className: "flex flex-cols-1 w-full mx-4",
                children: [
                    x.jsx(Hm, {}),
                    x.jsxs("div", {
                        className: "btm-nav sm:hidden bg-base-200",
                        children: [
                            x.jsxs(mt, {
                                to: "/dashboard",
                                children: [
                                    x.jsxs("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "w-6 h-6 grid-auto",
                                        children: [
                                            x.jsx("path", {
                                                d: "M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z",
                                            }),
                                            x.jsx("path", {
                                                d: "M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z",
                                            }),
                                        ],
                                    }),
                                    x.jsx("span", {
                                        className: "btm-nav-label",
                                        children: "Home",
                                    }),
                                ],
                            }),
                            x.jsxs(mt, {
                                to: "/projects",
                                children: [
                                    x.jsxs("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "w-6 h-6",
                                        children: [
                                            x.jsx("path", {
                                                fillRule: "evenodd",
                                                d: "M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z",
                                                clipRule: "evenodd",
                                            }),
                                            x.jsx("path", {
                                                fillRule: "evenodd",
                                                d: "M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z",
                                                clipRule: "evenodd",
                                            }),
                                        ],
                                    }),
                                    x.jsx("span", {
                                        className: "btm-nav-label",
                                        children: "Projects",
                                    }),
                                ],
                            }),
                            x.jsxs(mt, {
                                to: "/clients",
                                children: [
                                    x.jsx("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "w-6 h-6",
                                        children: x.jsx("path", {
                                            fillRule: "evenodd",
                                            d: "M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z",
                                            clipRule: "evenodd",
                                        }),
                                    }),
                                    x.jsx("span", {
                                        className: "btm-nav-label",
                                        children: "Clients",
                                    }),
                                ],
                            }),
                            x.jsxs("button", {
                                onClick: () => n(!0),
                                children: [
                                    x.jsx("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "w-6 h-6",
                                        children: x.jsx("path", {
                                            fillRule: "evenodd",
                                            d: "M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z",
                                            clipRule: "evenodd",
                                        }),
                                    }),
                                    x.jsx("span", {
                                        className: "btm-nav-label",
                                        children: "Log out",
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
const nu = JSON,
    iv = (e) => e.toUpperCase(),
    sv = (e) => {
        const t = {};
        return (
            e.forEach((n, r) => {
                t[r] = n;
            }),
            t
        );
    },
    ov = (e, t, n) =>
        e.document
            ? e
            : { document: e, variables: t, requestHeaders: n, signal: void 0 },
    lv = (e, t, n) =>
        e.query
            ? e
            : { query: e, variables: t, requestHeaders: n, signal: void 0 },
    uv = (e, t) =>
        e.documents ? e : { documents: e, requestHeaders: t, signal: void 0 },
    av = (e, t, ...n) => {
        const [r, i] = n;
        return e.document
            ? e
            : {
                  url: e,
                  document: t,
                  variables: r,
                  requestHeaders: i,
                  signal: void 0,
              };
    };
function vi(e, t) {
    if (!!!e) throw new Error(t);
}
function cv(e) {
    return typeof e == "object" && e !== null;
}
function fv(e, t) {
    if (!!!e) throw new Error(t ?? "Unexpected invariant triggered.");
}
const dv = /\r\n|[\n\r]/g;
function Xo(e, t) {
    let n = 0,
        r = 1;
    for (const i of e.body.matchAll(dv)) {
        if ((typeof i.index == "number" || fv(!1), i.index >= t)) break;
        (n = i.index + i[0].length), (r += 1);
    }
    return { line: r, column: t + 1 - n };
}
function hv(e) {
    return _d(e.source, Xo(e.source, e.start));
}
function _d(e, t) {
    const n = e.locationOffset.column - 1,
        r = "".padStart(n) + e.body,
        i = t.line - 1,
        s = e.locationOffset.line - 1,
        o = t.line + s,
        l = t.line === 1 ? n : 0,
        u = t.column + l,
        a = `${e.name}:${o}:${u}
`,
        c = r.split(/\r\n|[\n\r]/g),
        h = c[i];
    if (h.length > 120) {
        const m = Math.floor(u / 80),
            y = u % 80,
            v = [];
        for (let g = 0; g < h.length; g += 80) v.push(h.slice(g, g + 80));
        return (
            a +
            Ia([
                [`${o} |`, v[0]],
                ...v.slice(1, m + 1).map((g) => ["|", g]),
                ["|", "^".padStart(y)],
                ["|", v[m + 1]],
            ])
        );
    }
    return (
        a +
        Ia([
            [`${o - 1} |`, c[i - 1]],
            [`${o} |`, h],
            ["|", "^".padStart(u)],
            [`${o + 1} |`, c[i + 1]],
        ])
    );
}
function Ia(e) {
    const t = e.filter(([r, i]) => i !== void 0),
        n = Math.max(...t.map(([r]) => r.length));
    return t.map(([r, i]) => r.padStart(n) + (i ? " " + i : "")).join(`
`);
}
function pv(e) {
    const t = e[0];
    return t == null || "kind" in t || "length" in t
        ? {
              nodes: t,
              source: e[1],
              positions: e[2],
              path: e[3],
              originalError: e[4],
              extensions: e[5],
          }
        : t;
}
class ru extends Error {
    constructor(t, ...n) {
        var r, i, s;
        const {
            nodes: o,
            source: l,
            positions: u,
            path: a,
            originalError: c,
            extensions: h,
        } = pv(n);
        super(t),
            (this.name = "GraphQLError"),
            (this.path = a ?? void 0),
            (this.originalError = c ?? void 0),
            (this.nodes = Da(Array.isArray(o) ? o : o ? [o] : void 0));
        const m = Da(
            (r = this.nodes) === null || r === void 0
                ? void 0
                : r.map((v) => v.loc).filter((v) => v != null),
        );
        (this.source =
            l ??
            (m == null || (i = m[0]) === null || i === void 0
                ? void 0
                : i.source)),
            (this.positions =
                u ?? (m == null ? void 0 : m.map((v) => v.start))),
            (this.locations =
                u && l
                    ? u.map((v) => Xo(l, v))
                    : m == null
                    ? void 0
                    : m.map((v) => Xo(v.source, v.start)));
        const y = cv(c == null ? void 0 : c.extensions)
            ? c == null
                ? void 0
                : c.extensions
            : void 0;
        (this.extensions =
            (s = h ?? y) !== null && s !== void 0 ? s : Object.create(null)),
            Object.defineProperties(this, {
                message: { writable: !0, enumerable: !0 },
                name: { enumerable: !1 },
                nodes: { enumerable: !1 },
                source: { enumerable: !1 },
                positions: { enumerable: !1 },
                originalError: { enumerable: !1 },
            }),
            c != null && c.stack
                ? Object.defineProperty(this, "stack", {
                      value: c.stack,
                      writable: !0,
                      configurable: !0,
                  })
                : Error.captureStackTrace
                ? Error.captureStackTrace(this, ru)
                : Object.defineProperty(this, "stack", {
                      value: Error().stack,
                      writable: !0,
                      configurable: !0,
                  });
    }
    get [Symbol.toStringTag]() {
        return "GraphQLError";
    }
    toString() {
        let t = this.message;
        if (this.nodes)
            for (const n of this.nodes)
                n.loc &&
                    (t +=
                        `

` + hv(n.loc));
        else if (this.source && this.locations)
            for (const n of this.locations)
                t +=
                    `

` + _d(this.source, n);
        return t;
    }
    toJSON() {
        const t = { message: this.message };
        return (
            this.locations != null && (t.locations = this.locations),
            this.path != null && (t.path = this.path),
            this.extensions != null &&
                Object.keys(this.extensions).length > 0 &&
                (t.extensions = this.extensions),
            t
        );
    }
}
function Da(e) {
    return e === void 0 || e.length === 0 ? void 0 : e;
}
function ce(e, t, n) {
    return new ru(`Syntax Error: ${n}`, { source: e, positions: [t] });
}
class mv {
    constructor(t, n, r) {
        (this.start = t.start),
            (this.end = n.end),
            (this.startToken = t),
            (this.endToken = n),
            (this.source = r);
    }
    get [Symbol.toStringTag]() {
        return "Location";
    }
    toJSON() {
        return { start: this.start, end: this.end };
    }
}
class Rd {
    constructor(t, n, r, i, s, o) {
        (this.kind = t),
            (this.start = n),
            (this.end = r),
            (this.line = i),
            (this.column = s),
            (this.value = o),
            (this.prev = null),
            (this.next = null);
    }
    get [Symbol.toStringTag]() {
        return "Token";
    }
    toJSON() {
        return {
            kind: this.kind,
            value: this.value,
            line: this.line,
            column: this.column,
        };
    }
}
const Pd = {
        Name: [],
        Document: ["definitions"],
        OperationDefinition: [
            "name",
            "variableDefinitions",
            "directives",
            "selectionSet",
        ],
        VariableDefinition: ["variable", "type", "defaultValue", "directives"],
        Variable: ["name"],
        SelectionSet: ["selections"],
        Field: ["alias", "name", "arguments", "directives", "selectionSet"],
        Argument: ["name", "value"],
        FragmentSpread: ["name", "directives"],
        InlineFragment: ["typeCondition", "directives", "selectionSet"],
        FragmentDefinition: [
            "name",
            "variableDefinitions",
            "typeCondition",
            "directives",
            "selectionSet",
        ],
        IntValue: [],
        FloatValue: [],
        StringValue: [],
        BooleanValue: [],
        NullValue: [],
        EnumValue: [],
        ListValue: ["values"],
        ObjectValue: ["fields"],
        ObjectField: ["name", "value"],
        Directive: ["name", "arguments"],
        NamedType: ["name"],
        ListType: ["type"],
        NonNullType: ["type"],
        SchemaDefinition: ["description", "directives", "operationTypes"],
        OperationTypeDefinition: ["type"],
        ScalarTypeDefinition: ["description", "name", "directives"],
        ObjectTypeDefinition: [
            "description",
            "name",
            "interfaces",
            "directives",
            "fields",
        ],
        FieldDefinition: [
            "description",
            "name",
            "arguments",
            "type",
            "directives",
        ],
        InputValueDefinition: [
            "description",
            "name",
            "type",
            "defaultValue",
            "directives",
        ],
        InterfaceTypeDefinition: [
            "description",
            "name",
            "interfaces",
            "directives",
            "fields",
        ],
        UnionTypeDefinition: ["description", "name", "directives", "types"],
        EnumTypeDefinition: ["description", "name", "directives", "values"],
        EnumValueDefinition: ["description", "name", "directives"],
        InputObjectTypeDefinition: [
            "description",
            "name",
            "directives",
            "fields",
        ],
        DirectiveDefinition: ["description", "name", "arguments", "locations"],
        SchemaExtension: ["directives", "operationTypes"],
        ScalarTypeExtension: ["name", "directives"],
        ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
        InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
        UnionTypeExtension: ["name", "directives", "types"],
        EnumTypeExtension: ["name", "directives", "values"],
        InputObjectTypeExtension: ["name", "directives", "fields"],
    },
    vv = new Set(Object.keys(Pd));
function Aa(e) {
    const t = e == null ? void 0 : e.kind;
    return typeof t == "string" && vv.has(t);
}
var xn;
(function (e) {
    (e.QUERY = "query"),
        (e.MUTATION = "mutation"),
        (e.SUBSCRIPTION = "subscription");
})(xn || (xn = {}));
var Jo;
(function (e) {
    (e.QUERY = "QUERY"),
        (e.MUTATION = "MUTATION"),
        (e.SUBSCRIPTION = "SUBSCRIPTION"),
        (e.FIELD = "FIELD"),
        (e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION"),
        (e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD"),
        (e.INLINE_FRAGMENT = "INLINE_FRAGMENT"),
        (e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION"),
        (e.SCHEMA = "SCHEMA"),
        (e.SCALAR = "SCALAR"),
        (e.OBJECT = "OBJECT"),
        (e.FIELD_DEFINITION = "FIELD_DEFINITION"),
        (e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION"),
        (e.INTERFACE = "INTERFACE"),
        (e.UNION = "UNION"),
        (e.ENUM = "ENUM"),
        (e.ENUM_VALUE = "ENUM_VALUE"),
        (e.INPUT_OBJECT = "INPUT_OBJECT"),
        (e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION");
})(Jo || (Jo = {}));
var F;
(function (e) {
    (e.NAME = "Name"),
        (e.DOCUMENT = "Document"),
        (e.OPERATION_DEFINITION = "OperationDefinition"),
        (e.VARIABLE_DEFINITION = "VariableDefinition"),
        (e.SELECTION_SET = "SelectionSet"),
        (e.FIELD = "Field"),
        (e.ARGUMENT = "Argument"),
        (e.FRAGMENT_SPREAD = "FragmentSpread"),
        (e.INLINE_FRAGMENT = "InlineFragment"),
        (e.FRAGMENT_DEFINITION = "FragmentDefinition"),
        (e.VARIABLE = "Variable"),
        (e.INT = "IntValue"),
        (e.FLOAT = "FloatValue"),
        (e.STRING = "StringValue"),
        (e.BOOLEAN = "BooleanValue"),
        (e.NULL = "NullValue"),
        (e.ENUM = "EnumValue"),
        (e.LIST = "ListValue"),
        (e.OBJECT = "ObjectValue"),
        (e.OBJECT_FIELD = "ObjectField"),
        (e.DIRECTIVE = "Directive"),
        (e.NAMED_TYPE = "NamedType"),
        (e.LIST_TYPE = "ListType"),
        (e.NON_NULL_TYPE = "NonNullType"),
        (e.SCHEMA_DEFINITION = "SchemaDefinition"),
        (e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition"),
        (e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition"),
        (e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition"),
        (e.FIELD_DEFINITION = "FieldDefinition"),
        (e.INPUT_VALUE_DEFINITION = "InputValueDefinition"),
        (e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition"),
        (e.UNION_TYPE_DEFINITION = "UnionTypeDefinition"),
        (e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition"),
        (e.ENUM_VALUE_DEFINITION = "EnumValueDefinition"),
        (e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition"),
        (e.DIRECTIVE_DEFINITION = "DirectiveDefinition"),
        (e.SCHEMA_EXTENSION = "SchemaExtension"),
        (e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension"),
        (e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension"),
        (e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension"),
        (e.UNION_TYPE_EXTENSION = "UnionTypeExtension"),
        (e.ENUM_TYPE_EXTENSION = "EnumTypeExtension"),
        (e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension");
})(F || (F = {}));
function Zo(e) {
    return e === 9 || e === 32;
}
function _r(e) {
    return e >= 48 && e <= 57;
}
function Id(e) {
    return (e >= 97 && e <= 122) || (e >= 65 && e <= 90);
}
function Dd(e) {
    return Id(e) || e === 95;
}
function yv(e) {
    return Id(e) || _r(e) || e === 95;
}
function gv(e) {
    var t;
    let n = Number.MAX_SAFE_INTEGER,
        r = null,
        i = -1;
    for (let o = 0; o < e.length; ++o) {
        var s;
        const l = e[o],
            u = xv(l);
        u !== l.length &&
            ((r = (s = r) !== null && s !== void 0 ? s : o),
            (i = o),
            o !== 0 && u < n && (n = u));
    }
    return e
        .map((o, l) => (l === 0 ? o : o.slice(n)))
        .slice((t = r) !== null && t !== void 0 ? t : 0, i + 1);
}
function xv(e) {
    let t = 0;
    for (; t < e.length && Zo(e.charCodeAt(t)); ) ++t;
    return t;
}
function Ev(e, t) {
    const n = e.replace(/"""/g, '\\"""'),
        r = n.split(/\r\n|[\n\r]/g),
        i = r.length === 1,
        s =
            r.length > 1 &&
            r.slice(1).every((y) => y.length === 0 || Zo(y.charCodeAt(0))),
        o = n.endsWith('\\"""'),
        l = e.endsWith('"') && !o,
        u = e.endsWith("\\"),
        a = l || u,
        c = !(t != null && t.minimize) && (!i || e.length > 70 || a || s || o);
    let h = "";
    const m = i && Zo(e.charCodeAt(0));
    return (
        ((c && !m) || s) &&
            (h += `
`),
        (h += n),
        (c || a) &&
            (h += `
`),
        '"""' + h + '"""'
    );
}
var S;
(function (e) {
    (e.SOF = "<SOF>"),
        (e.EOF = "<EOF>"),
        (e.BANG = "!"),
        (e.DOLLAR = "$"),
        (e.AMP = "&"),
        (e.PAREN_L = "("),
        (e.PAREN_R = ")"),
        (e.SPREAD = "..."),
        (e.COLON = ":"),
        (e.EQUALS = "="),
        (e.AT = "@"),
        (e.BRACKET_L = "["),
        (e.BRACKET_R = "]"),
        (e.BRACE_L = "{"),
        (e.PIPE = "|"),
        (e.BRACE_R = "}"),
        (e.NAME = "Name"),
        (e.INT = "Int"),
        (e.FLOAT = "Float"),
        (e.STRING = "String"),
        (e.BLOCK_STRING = "BlockString"),
        (e.COMMENT = "Comment");
})(S || (S = {}));
class wv {
    constructor(t) {
        const n = new Rd(S.SOF, 0, 0, 0, 0);
        (this.source = t),
            (this.lastToken = n),
            (this.token = n),
            (this.line = 1),
            (this.lineStart = 0);
    }
    get [Symbol.toStringTag]() {
        return "Lexer";
    }
    advance() {
        return (this.lastToken = this.token), (this.token = this.lookahead());
    }
    lookahead() {
        let t = this.token;
        if (t.kind !== S.EOF)
            do
                if (t.next) t = t.next;
                else {
                    const n = Cv(this, t.end);
                    (t.next = n), (n.prev = t), (t = n);
                }
            while (t.kind === S.COMMENT);
        return t;
    }
}
function Sv(e) {
    return (
        e === S.BANG ||
        e === S.DOLLAR ||
        e === S.AMP ||
        e === S.PAREN_L ||
        e === S.PAREN_R ||
        e === S.SPREAD ||
        e === S.COLON ||
        e === S.EQUALS ||
        e === S.AT ||
        e === S.BRACKET_L ||
        e === S.BRACKET_R ||
        e === S.BRACE_L ||
        e === S.PIPE ||
        e === S.BRACE_R
    );
}
function Un(e) {
    return (e >= 0 && e <= 55295) || (e >= 57344 && e <= 1114111);
}
function vs(e, t) {
    return Ad(e.charCodeAt(t)) && Ld(e.charCodeAt(t + 1));
}
function Ad(e) {
    return e >= 55296 && e <= 56319;
}
function Ld(e) {
    return e >= 56320 && e <= 57343;
}
function Zt(e, t) {
    const n = e.source.body.codePointAt(t);
    if (n === void 0) return S.EOF;
    if (n >= 32 && n <= 126) {
        const r = String.fromCodePoint(n);
        return r === '"' ? `'"'` : `"${r}"`;
    }
    return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function re(e, t, n, r, i) {
    const s = e.line,
        o = 1 + n - e.lineStart;
    return new Rd(t, n, r, s, o, i);
}
function Cv(e, t) {
    const n = e.source.body,
        r = n.length;
    let i = t;
    for (; i < r; ) {
        const s = n.charCodeAt(i);
        switch (s) {
            case 65279:
            case 9:
            case 32:
            case 44:
                ++i;
                continue;
            case 10:
                ++i, ++e.line, (e.lineStart = i);
                continue;
            case 13:
                n.charCodeAt(i + 1) === 10 ? (i += 2) : ++i,
                    ++e.line,
                    (e.lineStart = i);
                continue;
            case 35:
                return kv(e, i);
            case 33:
                return re(e, S.BANG, i, i + 1);
            case 36:
                return re(e, S.DOLLAR, i, i + 1);
            case 38:
                return re(e, S.AMP, i, i + 1);
            case 40:
                return re(e, S.PAREN_L, i, i + 1);
            case 41:
                return re(e, S.PAREN_R, i, i + 1);
            case 46:
                if (n.charCodeAt(i + 1) === 46 && n.charCodeAt(i + 2) === 46)
                    return re(e, S.SPREAD, i, i + 3);
                break;
            case 58:
                return re(e, S.COLON, i, i + 1);
            case 61:
                return re(e, S.EQUALS, i, i + 1);
            case 64:
                return re(e, S.AT, i, i + 1);
            case 91:
                return re(e, S.BRACKET_L, i, i + 1);
            case 93:
                return re(e, S.BRACKET_R, i, i + 1);
            case 123:
                return re(e, S.BRACE_L, i, i + 1);
            case 124:
                return re(e, S.PIPE, i, i + 1);
            case 125:
                return re(e, S.BRACE_R, i, i + 1);
            case 34:
                return n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34
                    ? Pv(e, i)
                    : Tv(e, i);
        }
        if (_r(s) || s === 45) return Nv(e, i, s);
        if (Dd(s)) return Iv(e, i);
        throw ce(
            e.source,
            i,
            s === 39
                ? `Unexpected single quote character ('), did you mean to use a double quote (")?`
                : Un(s) || vs(n, i)
                ? `Unexpected character: ${Zt(e, i)}.`
                : `Invalid character: ${Zt(e, i)}.`,
        );
    }
    return re(e, S.EOF, r, r);
}
function kv(e, t) {
    const n = e.source.body,
        r = n.length;
    let i = t + 1;
    for (; i < r; ) {
        const s = n.charCodeAt(i);
        if (s === 10 || s === 13) break;
        if (Un(s)) ++i;
        else if (vs(n, i)) i += 2;
        else break;
    }
    return re(e, S.COMMENT, t, i, n.slice(t + 1, i));
}
function Nv(e, t, n) {
    const r = e.source.body;
    let i = t,
        s = n,
        o = !1;
    if ((s === 45 && (s = r.charCodeAt(++i)), s === 48)) {
        if (((s = r.charCodeAt(++i)), _r(s)))
            throw ce(
                e.source,
                i,
                `Invalid number, unexpected digit after 0: ${Zt(e, i)}.`,
            );
    } else (i = bs(e, i, s)), (s = r.charCodeAt(i));
    if (
        (s === 46 &&
            ((o = !0),
            (s = r.charCodeAt(++i)),
            (i = bs(e, i, s)),
            (s = r.charCodeAt(i))),
        (s === 69 || s === 101) &&
            ((o = !0),
            (s = r.charCodeAt(++i)),
            (s === 43 || s === 45) && (s = r.charCodeAt(++i)),
            (i = bs(e, i, s)),
            (s = r.charCodeAt(i))),
        s === 46 || Dd(s))
    )
        throw ce(
            e.source,
            i,
            `Invalid number, expected digit but got: ${Zt(e, i)}.`,
        );
    return re(e, o ? S.FLOAT : S.INT, t, i, r.slice(t, i));
}
function bs(e, t, n) {
    if (!_r(n))
        throw ce(
            e.source,
            t,
            `Invalid number, expected digit but got: ${Zt(e, t)}.`,
        );
    const r = e.source.body;
    let i = t + 1;
    for (; _r(r.charCodeAt(i)); ) ++i;
    return i;
}
function Tv(e, t) {
    const n = e.source.body,
        r = n.length;
    let i = t + 1,
        s = i,
        o = "";
    for (; i < r; ) {
        const l = n.charCodeAt(i);
        if (l === 34) return (o += n.slice(s, i)), re(e, S.STRING, t, i + 1, o);
        if (l === 92) {
            o += n.slice(s, i);
            const u =
                n.charCodeAt(i + 1) === 117
                    ? n.charCodeAt(i + 2) === 123
                        ? Ov(e, i)
                        : _v(e, i)
                    : Rv(e, i);
            (o += u.value), (i += u.size), (s = i);
            continue;
        }
        if (l === 10 || l === 13) break;
        if (Un(l)) ++i;
        else if (vs(n, i)) i += 2;
        else
            throw ce(
                e.source,
                i,
                `Invalid character within String: ${Zt(e, i)}.`,
            );
    }
    throw ce(e.source, i, "Unterminated string.");
}
function Ov(e, t) {
    const n = e.source.body;
    let r = 0,
        i = 3;
    for (; i < 12; ) {
        const s = n.charCodeAt(t + i++);
        if (s === 125) {
            if (i < 5 || !Un(r)) break;
            return { value: String.fromCodePoint(r), size: i };
        }
        if (((r = (r << 4) | Jn(s)), r < 0)) break;
    }
    throw ce(
        e.source,
        t,
        `Invalid Unicode escape sequence: "${n.slice(t, t + i)}".`,
    );
}
function _v(e, t) {
    const n = e.source.body,
        r = La(n, t + 2);
    if (Un(r)) return { value: String.fromCodePoint(r), size: 6 };
    if (Ad(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
        const i = La(n, t + 8);
        if (Ld(i)) return { value: String.fromCodePoint(r, i), size: 12 };
    }
    throw ce(
        e.source,
        t,
        `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`,
    );
}
function La(e, t) {
    return (
        (Jn(e.charCodeAt(t)) << 12) |
        (Jn(e.charCodeAt(t + 1)) << 8) |
        (Jn(e.charCodeAt(t + 2)) << 4) |
        Jn(e.charCodeAt(t + 3))
    );
}
function Jn(e) {
    return e >= 48 && e <= 57
        ? e - 48
        : e >= 65 && e <= 70
        ? e - 55
        : e >= 97 && e <= 102
        ? e - 87
        : -1;
}
function Rv(e, t) {
    const n = e.source.body;
    switch (n.charCodeAt(t + 1)) {
        case 34:
            return { value: '"', size: 2 };
        case 92:
            return { value: "\\", size: 2 };
        case 47:
            return { value: "/", size: 2 };
        case 98:
            return { value: "\b", size: 2 };
        case 102:
            return { value: "\f", size: 2 };
        case 110:
            return {
                value: `
`,
                size: 2,
            };
        case 114:
            return { value: "\r", size: 2 };
        case 116:
            return { value: "	", size: 2 };
    }
    throw ce(
        e.source,
        t,
        `Invalid character escape sequence: "${n.slice(t, t + 2)}".`,
    );
}
function Pv(e, t) {
    const n = e.source.body,
        r = n.length;
    let i = e.lineStart,
        s = t + 3,
        o = s,
        l = "";
    const u = [];
    for (; s < r; ) {
        const a = n.charCodeAt(s);
        if (
            a === 34 &&
            n.charCodeAt(s + 1) === 34 &&
            n.charCodeAt(s + 2) === 34
        ) {
            (l += n.slice(o, s)), u.push(l);
            const c = re(
                e,
                S.BLOCK_STRING,
                t,
                s + 3,
                gv(u).join(`
`),
            );
            return (e.line += u.length - 1), (e.lineStart = i), c;
        }
        if (
            a === 92 &&
            n.charCodeAt(s + 1) === 34 &&
            n.charCodeAt(s + 2) === 34 &&
            n.charCodeAt(s + 3) === 34
        ) {
            (l += n.slice(o, s)), (o = s + 1), (s += 4);
            continue;
        }
        if (a === 10 || a === 13) {
            (l += n.slice(o, s)),
                u.push(l),
                a === 13 && n.charCodeAt(s + 1) === 10 ? (s += 2) : ++s,
                (l = ""),
                (o = s),
                (i = s);
            continue;
        }
        if (Un(a)) ++s;
        else if (vs(n, s)) s += 2;
        else
            throw ce(
                e.source,
                s,
                `Invalid character within String: ${Zt(e, s)}.`,
            );
    }
    throw ce(e.source, s, "Unterminated string.");
}
function Iv(e, t) {
    const n = e.source.body,
        r = n.length;
    let i = t + 1;
    for (; i < r; ) {
        const s = n.charCodeAt(i);
        if (yv(s)) ++i;
        else break;
    }
    return re(e, S.NAME, t, i, n.slice(t, i));
}
const Dv = 10,
    Fd = 2;
function iu(e) {
    return ys(e, []);
}
function ys(e, t) {
    switch (typeof e) {
        case "string":
            return JSON.stringify(e);
        case "function":
            return e.name ? `[function ${e.name}]` : "[function]";
        case "object":
            return Av(e, t);
        default:
            return String(e);
    }
}
function Av(e, t) {
    if (e === null) return "null";
    if (t.includes(e)) return "[Circular]";
    const n = [...t, e];
    if (Lv(e)) {
        const r = e.toJSON();
        if (r !== e) return typeof r == "string" ? r : ys(r, n);
    } else if (Array.isArray(e)) return jv(e, n);
    return Fv(e, n);
}
function Lv(e) {
    return typeof e.toJSON == "function";
}
function Fv(e, t) {
    const n = Object.entries(e);
    return n.length === 0
        ? "{}"
        : t.length > Fd
        ? "[" + Mv(e) + "]"
        : "{ " + n.map(([i, s]) => i + ": " + ys(s, t)).join(", ") + " }";
}
function jv(e, t) {
    if (e.length === 0) return "[]";
    if (t.length > Fd) return "[Array]";
    const n = Math.min(Dv, e.length),
        r = e.length - n,
        i = [];
    for (let s = 0; s < n; ++s) i.push(ys(e[s], t));
    return (
        r === 1
            ? i.push("... 1 more item")
            : r > 1 && i.push(`... ${r} more items`),
        "[" + i.join(", ") + "]"
    );
}
function Mv(e) {
    const t = Object.prototype.toString
        .call(e)
        .replace(/^\[object /, "")
        .replace(/]$/, "");
    if (t === "Object" && typeof e.constructor == "function") {
        const n = e.constructor.name;
        if (typeof n == "string" && n !== "") return n;
    }
    return t;
}
const Uv = globalThis.process
    ? function (t, n) {
          return t instanceof n;
      }
    : function (t, n) {
          if (t instanceof n) return !0;
          if (typeof t == "object" && t !== null) {
              var r;
              const i = n.prototype[Symbol.toStringTag],
                  s =
                      Symbol.toStringTag in t
                          ? t[Symbol.toStringTag]
                          : (r = t.constructor) === null || r === void 0
                          ? void 0
                          : r.name;
              if (i === s) {
                  const o = iu(t);
                  throw new Error(`Cannot use ${i} "${o}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
              }
          }
          return !1;
      };
class jd {
    constructor(t, n = "GraphQL request", r = { line: 1, column: 1 }) {
        typeof t == "string" ||
            vi(!1, `Body must be a string. Received: ${iu(t)}.`),
            (this.body = t),
            (this.name = n),
            (this.locationOffset = r),
            this.locationOffset.line > 0 ||
                vi(
                    !1,
                    "line in locationOffset is 1-indexed and must be positive.",
                ),
            this.locationOffset.column > 0 ||
                vi(
                    !1,
                    "column in locationOffset is 1-indexed and must be positive.",
                );
    }
    get [Symbol.toStringTag]() {
        return "Source";
    }
}
function zv(e) {
    return Uv(e, jd);
}
function Bv(e, t) {
    return new Vv(e, t).parseDocument();
}
class Vv {
    constructor(t, n = {}) {
        const r = zv(t) ? t : new jd(t);
        (this._lexer = new wv(r)),
            (this._options = n),
            (this._tokenCounter = 0);
    }
    parseName() {
        const t = this.expectToken(S.NAME);
        return this.node(t, { kind: F.NAME, value: t.value });
    }
    parseDocument() {
        return this.node(this._lexer.token, {
            kind: F.DOCUMENT,
            definitions: this.many(S.SOF, this.parseDefinition, S.EOF),
        });
    }
    parseDefinition() {
        if (this.peek(S.BRACE_L)) return this.parseOperationDefinition();
        const t = this.peekDescription(),
            n = t ? this._lexer.lookahead() : this._lexer.token;
        if (n.kind === S.NAME) {
            switch (n.value) {
                case "schema":
                    return this.parseSchemaDefinition();
                case "scalar":
                    return this.parseScalarTypeDefinition();
                case "type":
                    return this.parseObjectTypeDefinition();
                case "interface":
                    return this.parseInterfaceTypeDefinition();
                case "union":
                    return this.parseUnionTypeDefinition();
                case "enum":
                    return this.parseEnumTypeDefinition();
                case "input":
                    return this.parseInputObjectTypeDefinition();
                case "directive":
                    return this.parseDirectiveDefinition();
            }
            if (t)
                throw ce(
                    this._lexer.source,
                    this._lexer.token.start,
                    "Unexpected description, descriptions are supported only on type definitions.",
                );
            switch (n.value) {
                case "query":
                case "mutation":
                case "subscription":
                    return this.parseOperationDefinition();
                case "fragment":
                    return this.parseFragmentDefinition();
                case "extend":
                    return this.parseTypeSystemExtension();
            }
        }
        throw this.unexpected(n);
    }
    parseOperationDefinition() {
        const t = this._lexer.token;
        if (this.peek(S.BRACE_L))
            return this.node(t, {
                kind: F.OPERATION_DEFINITION,
                operation: xn.QUERY,
                name: void 0,
                variableDefinitions: [],
                directives: [],
                selectionSet: this.parseSelectionSet(),
            });
        const n = this.parseOperationType();
        let r;
        return (
            this.peek(S.NAME) && (r = this.parseName()),
            this.node(t, {
                kind: F.OPERATION_DEFINITION,
                operation: n,
                name: r,
                variableDefinitions: this.parseVariableDefinitions(),
                directives: this.parseDirectives(!1),
                selectionSet: this.parseSelectionSet(),
            })
        );
    }
    parseOperationType() {
        const t = this.expectToken(S.NAME);
        switch (t.value) {
            case "query":
                return xn.QUERY;
            case "mutation":
                return xn.MUTATION;
            case "subscription":
                return xn.SUBSCRIPTION;
        }
        throw this.unexpected(t);
    }
    parseVariableDefinitions() {
        return this.optionalMany(
            S.PAREN_L,
            this.parseVariableDefinition,
            S.PAREN_R,
        );
    }
    parseVariableDefinition() {
        return this.node(this._lexer.token, {
            kind: F.VARIABLE_DEFINITION,
            variable: this.parseVariable(),
            type: (this.expectToken(S.COLON), this.parseTypeReference()),
            defaultValue: this.expectOptionalToken(S.EQUALS)
                ? this.parseConstValueLiteral()
                : void 0,
            directives: this.parseConstDirectives(),
        });
    }
    parseVariable() {
        const t = this._lexer.token;
        return (
            this.expectToken(S.DOLLAR),
            this.node(t, { kind: F.VARIABLE, name: this.parseName() })
        );
    }
    parseSelectionSet() {
        return this.node(this._lexer.token, {
            kind: F.SELECTION_SET,
            selections: this.many(S.BRACE_L, this.parseSelection, S.BRACE_R),
        });
    }
    parseSelection() {
        return this.peek(S.SPREAD) ? this.parseFragment() : this.parseField();
    }
    parseField() {
        const t = this._lexer.token,
            n = this.parseName();
        let r, i;
        return (
            this.expectOptionalToken(S.COLON)
                ? ((r = n), (i = this.parseName()))
                : (i = n),
            this.node(t, {
                kind: F.FIELD,
                alias: r,
                name: i,
                arguments: this.parseArguments(!1),
                directives: this.parseDirectives(!1),
                selectionSet: this.peek(S.BRACE_L)
                    ? this.parseSelectionSet()
                    : void 0,
            })
        );
    }
    parseArguments(t) {
        const n = t ? this.parseConstArgument : this.parseArgument;
        return this.optionalMany(S.PAREN_L, n, S.PAREN_R);
    }
    parseArgument(t = !1) {
        const n = this._lexer.token,
            r = this.parseName();
        return (
            this.expectToken(S.COLON),
            this.node(n, {
                kind: F.ARGUMENT,
                name: r,
                value: this.parseValueLiteral(t),
            })
        );
    }
    parseConstArgument() {
        return this.parseArgument(!0);
    }
    parseFragment() {
        const t = this._lexer.token;
        this.expectToken(S.SPREAD);
        const n = this.expectOptionalKeyword("on");
        return !n && this.peek(S.NAME)
            ? this.node(t, {
                  kind: F.FRAGMENT_SPREAD,
                  name: this.parseFragmentName(),
                  directives: this.parseDirectives(!1),
              })
            : this.node(t, {
                  kind: F.INLINE_FRAGMENT,
                  typeCondition: n ? this.parseNamedType() : void 0,
                  directives: this.parseDirectives(!1),
                  selectionSet: this.parseSelectionSet(),
              });
    }
    parseFragmentDefinition() {
        const t = this._lexer.token;
        return (
            this.expectKeyword("fragment"),
            this._options.allowLegacyFragmentVariables === !0
                ? this.node(t, {
                      kind: F.FRAGMENT_DEFINITION,
                      name: this.parseFragmentName(),
                      variableDefinitions: this.parseVariableDefinitions(),
                      typeCondition:
                          (this.expectKeyword("on"), this.parseNamedType()),
                      directives: this.parseDirectives(!1),
                      selectionSet: this.parseSelectionSet(),
                  })
                : this.node(t, {
                      kind: F.FRAGMENT_DEFINITION,
                      name: this.parseFragmentName(),
                      typeCondition:
                          (this.expectKeyword("on"), this.parseNamedType()),
                      directives: this.parseDirectives(!1),
                      selectionSet: this.parseSelectionSet(),
                  })
        );
    }
    parseFragmentName() {
        if (this._lexer.token.value === "on") throw this.unexpected();
        return this.parseName();
    }
    parseValueLiteral(t) {
        const n = this._lexer.token;
        switch (n.kind) {
            case S.BRACKET_L:
                return this.parseList(t);
            case S.BRACE_L:
                return this.parseObject(t);
            case S.INT:
                return (
                    this.advanceLexer(),
                    this.node(n, { kind: F.INT, value: n.value })
                );
            case S.FLOAT:
                return (
                    this.advanceLexer(),
                    this.node(n, { kind: F.FLOAT, value: n.value })
                );
            case S.STRING:
            case S.BLOCK_STRING:
                return this.parseStringLiteral();
            case S.NAME:
                switch ((this.advanceLexer(), n.value)) {
                    case "true":
                        return this.node(n, { kind: F.BOOLEAN, value: !0 });
                    case "false":
                        return this.node(n, { kind: F.BOOLEAN, value: !1 });
                    case "null":
                        return this.node(n, { kind: F.NULL });
                    default:
                        return this.node(n, { kind: F.ENUM, value: n.value });
                }
            case S.DOLLAR:
                if (t)
                    if (
                        (this.expectToken(S.DOLLAR),
                        this._lexer.token.kind === S.NAME)
                    ) {
                        const r = this._lexer.token.value;
                        throw ce(
                            this._lexer.source,
                            n.start,
                            `Unexpected variable "$${r}" in constant value.`,
                        );
                    } else throw this.unexpected(n);
                return this.parseVariable();
            default:
                throw this.unexpected();
        }
    }
    parseConstValueLiteral() {
        return this.parseValueLiteral(!0);
    }
    parseStringLiteral() {
        const t = this._lexer.token;
        return (
            this.advanceLexer(),
            this.node(t, {
                kind: F.STRING,
                value: t.value,
                block: t.kind === S.BLOCK_STRING,
            })
        );
    }
    parseList(t) {
        const n = () => this.parseValueLiteral(t);
        return this.node(this._lexer.token, {
            kind: F.LIST,
            values: this.any(S.BRACKET_L, n, S.BRACKET_R),
        });
    }
    parseObject(t) {
        const n = () => this.parseObjectField(t);
        return this.node(this._lexer.token, {
            kind: F.OBJECT,
            fields: this.any(S.BRACE_L, n, S.BRACE_R),
        });
    }
    parseObjectField(t) {
        const n = this._lexer.token,
            r = this.parseName();
        return (
            this.expectToken(S.COLON),
            this.node(n, {
                kind: F.OBJECT_FIELD,
                name: r,
                value: this.parseValueLiteral(t),
            })
        );
    }
    parseDirectives(t) {
        const n = [];
        for (; this.peek(S.AT); ) n.push(this.parseDirective(t));
        return n;
    }
    parseConstDirectives() {
        return this.parseDirectives(!0);
    }
    parseDirective(t) {
        const n = this._lexer.token;
        return (
            this.expectToken(S.AT),
            this.node(n, {
                kind: F.DIRECTIVE,
                name: this.parseName(),
                arguments: this.parseArguments(t),
            })
        );
    }
    parseTypeReference() {
        const t = this._lexer.token;
        let n;
        if (this.expectOptionalToken(S.BRACKET_L)) {
            const r = this.parseTypeReference();
            this.expectToken(S.BRACKET_R),
                (n = this.node(t, { kind: F.LIST_TYPE, type: r }));
        } else n = this.parseNamedType();
        return this.expectOptionalToken(S.BANG)
            ? this.node(t, { kind: F.NON_NULL_TYPE, type: n })
            : n;
    }
    parseNamedType() {
        return this.node(this._lexer.token, {
            kind: F.NAMED_TYPE,
            name: this.parseName(),
        });
    }
    peekDescription() {
        return this.peek(S.STRING) || this.peek(S.BLOCK_STRING);
    }
    parseDescription() {
        if (this.peekDescription()) return this.parseStringLiteral();
    }
    parseSchemaDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription();
        this.expectKeyword("schema");
        const r = this.parseConstDirectives(),
            i = this.many(
                S.BRACE_L,
                this.parseOperationTypeDefinition,
                S.BRACE_R,
            );
        return this.node(t, {
            kind: F.SCHEMA_DEFINITION,
            description: n,
            directives: r,
            operationTypes: i,
        });
    }
    parseOperationTypeDefinition() {
        const t = this._lexer.token,
            n = this.parseOperationType();
        this.expectToken(S.COLON);
        const r = this.parseNamedType();
        return this.node(t, {
            kind: F.OPERATION_TYPE_DEFINITION,
            operation: n,
            type: r,
        });
    }
    parseScalarTypeDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription();
        this.expectKeyword("scalar");
        const r = this.parseName(),
            i = this.parseConstDirectives();
        return this.node(t, {
            kind: F.SCALAR_TYPE_DEFINITION,
            description: n,
            name: r,
            directives: i,
        });
    }
    parseObjectTypeDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription();
        this.expectKeyword("type");
        const r = this.parseName(),
            i = this.parseImplementsInterfaces(),
            s = this.parseConstDirectives(),
            o = this.parseFieldsDefinition();
        return this.node(t, {
            kind: F.OBJECT_TYPE_DEFINITION,
            description: n,
            name: r,
            interfaces: i,
            directives: s,
            fields: o,
        });
    }
    parseImplementsInterfaces() {
        return this.expectOptionalKeyword("implements")
            ? this.delimitedMany(S.AMP, this.parseNamedType)
            : [];
    }
    parseFieldsDefinition() {
        return this.optionalMany(
            S.BRACE_L,
            this.parseFieldDefinition,
            S.BRACE_R,
        );
    }
    parseFieldDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription(),
            r = this.parseName(),
            i = this.parseArgumentDefs();
        this.expectToken(S.COLON);
        const s = this.parseTypeReference(),
            o = this.parseConstDirectives();
        return this.node(t, {
            kind: F.FIELD_DEFINITION,
            description: n,
            name: r,
            arguments: i,
            type: s,
            directives: o,
        });
    }
    parseArgumentDefs() {
        return this.optionalMany(S.PAREN_L, this.parseInputValueDef, S.PAREN_R);
    }
    parseInputValueDef() {
        const t = this._lexer.token,
            n = this.parseDescription(),
            r = this.parseName();
        this.expectToken(S.COLON);
        const i = this.parseTypeReference();
        let s;
        this.expectOptionalToken(S.EQUALS) &&
            (s = this.parseConstValueLiteral());
        const o = this.parseConstDirectives();
        return this.node(t, {
            kind: F.INPUT_VALUE_DEFINITION,
            description: n,
            name: r,
            type: i,
            defaultValue: s,
            directives: o,
        });
    }
    parseInterfaceTypeDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription();
        this.expectKeyword("interface");
        const r = this.parseName(),
            i = this.parseImplementsInterfaces(),
            s = this.parseConstDirectives(),
            o = this.parseFieldsDefinition();
        return this.node(t, {
            kind: F.INTERFACE_TYPE_DEFINITION,
            description: n,
            name: r,
            interfaces: i,
            directives: s,
            fields: o,
        });
    }
    parseUnionTypeDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription();
        this.expectKeyword("union");
        const r = this.parseName(),
            i = this.parseConstDirectives(),
            s = this.parseUnionMemberTypes();
        return this.node(t, {
            kind: F.UNION_TYPE_DEFINITION,
            description: n,
            name: r,
            directives: i,
            types: s,
        });
    }
    parseUnionMemberTypes() {
        return this.expectOptionalToken(S.EQUALS)
            ? this.delimitedMany(S.PIPE, this.parseNamedType)
            : [];
    }
    parseEnumTypeDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription();
        this.expectKeyword("enum");
        const r = this.parseName(),
            i = this.parseConstDirectives(),
            s = this.parseEnumValuesDefinition();
        return this.node(t, {
            kind: F.ENUM_TYPE_DEFINITION,
            description: n,
            name: r,
            directives: i,
            values: s,
        });
    }
    parseEnumValuesDefinition() {
        return this.optionalMany(
            S.BRACE_L,
            this.parseEnumValueDefinition,
            S.BRACE_R,
        );
    }
    parseEnumValueDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription(),
            r = this.parseEnumValueName(),
            i = this.parseConstDirectives();
        return this.node(t, {
            kind: F.ENUM_VALUE_DEFINITION,
            description: n,
            name: r,
            directives: i,
        });
    }
    parseEnumValueName() {
        if (
            this._lexer.token.value === "true" ||
            this._lexer.token.value === "false" ||
            this._lexer.token.value === "null"
        )
            throw ce(
                this._lexer.source,
                this._lexer.token.start,
                `${ni(
                    this._lexer.token,
                )} is reserved and cannot be used for an enum value.`,
            );
        return this.parseName();
    }
    parseInputObjectTypeDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription();
        this.expectKeyword("input");
        const r = this.parseName(),
            i = this.parseConstDirectives(),
            s = this.parseInputFieldsDefinition();
        return this.node(t, {
            kind: F.INPUT_OBJECT_TYPE_DEFINITION,
            description: n,
            name: r,
            directives: i,
            fields: s,
        });
    }
    parseInputFieldsDefinition() {
        return this.optionalMany(S.BRACE_L, this.parseInputValueDef, S.BRACE_R);
    }
    parseTypeSystemExtension() {
        const t = this._lexer.lookahead();
        if (t.kind === S.NAME)
            switch (t.value) {
                case "schema":
                    return this.parseSchemaExtension();
                case "scalar":
                    return this.parseScalarTypeExtension();
                case "type":
                    return this.parseObjectTypeExtension();
                case "interface":
                    return this.parseInterfaceTypeExtension();
                case "union":
                    return this.parseUnionTypeExtension();
                case "enum":
                    return this.parseEnumTypeExtension();
                case "input":
                    return this.parseInputObjectTypeExtension();
            }
        throw this.unexpected(t);
    }
    parseSchemaExtension() {
        const t = this._lexer.token;
        this.expectKeyword("extend"), this.expectKeyword("schema");
        const n = this.parseConstDirectives(),
            r = this.optionalMany(
                S.BRACE_L,
                this.parseOperationTypeDefinition,
                S.BRACE_R,
            );
        if (n.length === 0 && r.length === 0) throw this.unexpected();
        return this.node(t, {
            kind: F.SCHEMA_EXTENSION,
            directives: n,
            operationTypes: r,
        });
    }
    parseScalarTypeExtension() {
        const t = this._lexer.token;
        this.expectKeyword("extend"), this.expectKeyword("scalar");
        const n = this.parseName(),
            r = this.parseConstDirectives();
        if (r.length === 0) throw this.unexpected();
        return this.node(t, {
            kind: F.SCALAR_TYPE_EXTENSION,
            name: n,
            directives: r,
        });
    }
    parseObjectTypeExtension() {
        const t = this._lexer.token;
        this.expectKeyword("extend"), this.expectKeyword("type");
        const n = this.parseName(),
            r = this.parseImplementsInterfaces(),
            i = this.parseConstDirectives(),
            s = this.parseFieldsDefinition();
        if (r.length === 0 && i.length === 0 && s.length === 0)
            throw this.unexpected();
        return this.node(t, {
            kind: F.OBJECT_TYPE_EXTENSION,
            name: n,
            interfaces: r,
            directives: i,
            fields: s,
        });
    }
    parseInterfaceTypeExtension() {
        const t = this._lexer.token;
        this.expectKeyword("extend"), this.expectKeyword("interface");
        const n = this.parseName(),
            r = this.parseImplementsInterfaces(),
            i = this.parseConstDirectives(),
            s = this.parseFieldsDefinition();
        if (r.length === 0 && i.length === 0 && s.length === 0)
            throw this.unexpected();
        return this.node(t, {
            kind: F.INTERFACE_TYPE_EXTENSION,
            name: n,
            interfaces: r,
            directives: i,
            fields: s,
        });
    }
    parseUnionTypeExtension() {
        const t = this._lexer.token;
        this.expectKeyword("extend"), this.expectKeyword("union");
        const n = this.parseName(),
            r = this.parseConstDirectives(),
            i = this.parseUnionMemberTypes();
        if (r.length === 0 && i.length === 0) throw this.unexpected();
        return this.node(t, {
            kind: F.UNION_TYPE_EXTENSION,
            name: n,
            directives: r,
            types: i,
        });
    }
    parseEnumTypeExtension() {
        const t = this._lexer.token;
        this.expectKeyword("extend"), this.expectKeyword("enum");
        const n = this.parseName(),
            r = this.parseConstDirectives(),
            i = this.parseEnumValuesDefinition();
        if (r.length === 0 && i.length === 0) throw this.unexpected();
        return this.node(t, {
            kind: F.ENUM_TYPE_EXTENSION,
            name: n,
            directives: r,
            values: i,
        });
    }
    parseInputObjectTypeExtension() {
        const t = this._lexer.token;
        this.expectKeyword("extend"), this.expectKeyword("input");
        const n = this.parseName(),
            r = this.parseConstDirectives(),
            i = this.parseInputFieldsDefinition();
        if (r.length === 0 && i.length === 0) throw this.unexpected();
        return this.node(t, {
            kind: F.INPUT_OBJECT_TYPE_EXTENSION,
            name: n,
            directives: r,
            fields: i,
        });
    }
    parseDirectiveDefinition() {
        const t = this._lexer.token,
            n = this.parseDescription();
        this.expectKeyword("directive"), this.expectToken(S.AT);
        const r = this.parseName(),
            i = this.parseArgumentDefs(),
            s = this.expectOptionalKeyword("repeatable");
        this.expectKeyword("on");
        const o = this.parseDirectiveLocations();
        return this.node(t, {
            kind: F.DIRECTIVE_DEFINITION,
            description: n,
            name: r,
            arguments: i,
            repeatable: s,
            locations: o,
        });
    }
    parseDirectiveLocations() {
        return this.delimitedMany(S.PIPE, this.parseDirectiveLocation);
    }
    parseDirectiveLocation() {
        const t = this._lexer.token,
            n = this.parseName();
        if (Object.prototype.hasOwnProperty.call(Jo, n.value)) return n;
        throw this.unexpected(t);
    }
    node(t, n) {
        return (
            this._options.noLocation !== !0 &&
                (n.loc = new mv(t, this._lexer.lastToken, this._lexer.source)),
            n
        );
    }
    peek(t) {
        return this._lexer.token.kind === t;
    }
    expectToken(t) {
        const n = this._lexer.token;
        if (n.kind === t) return this.advanceLexer(), n;
        throw ce(
            this._lexer.source,
            n.start,
            `Expected ${Md(t)}, found ${ni(n)}.`,
        );
    }
    expectOptionalToken(t) {
        return this._lexer.token.kind === t ? (this.advanceLexer(), !0) : !1;
    }
    expectKeyword(t) {
        const n = this._lexer.token;
        if (n.kind === S.NAME && n.value === t) this.advanceLexer();
        else
            throw ce(
                this._lexer.source,
                n.start,
                `Expected "${t}", found ${ni(n)}.`,
            );
    }
    expectOptionalKeyword(t) {
        const n = this._lexer.token;
        return n.kind === S.NAME && n.value === t
            ? (this.advanceLexer(), !0)
            : !1;
    }
    unexpected(t) {
        const n = t ?? this._lexer.token;
        return ce(this._lexer.source, n.start, `Unexpected ${ni(n)}.`);
    }
    any(t, n, r) {
        this.expectToken(t);
        const i = [];
        for (; !this.expectOptionalToken(r); ) i.push(n.call(this));
        return i;
    }
    optionalMany(t, n, r) {
        if (this.expectOptionalToken(t)) {
            const i = [];
            do i.push(n.call(this));
            while (!this.expectOptionalToken(r));
            return i;
        }
        return [];
    }
    many(t, n, r) {
        this.expectToken(t);
        const i = [];
        do i.push(n.call(this));
        while (!this.expectOptionalToken(r));
        return i;
    }
    delimitedMany(t, n) {
        this.expectOptionalToken(t);
        const r = [];
        do r.push(n.call(this));
        while (this.expectOptionalToken(t));
        return r;
    }
    advanceLexer() {
        const { maxTokens: t } = this._options,
            n = this._lexer.advance();
        if (
            t !== void 0 &&
            n.kind !== S.EOF &&
            (++this._tokenCounter, this._tokenCounter > t)
        )
            throw ce(
                this._lexer.source,
                n.start,
                `Document contains more that ${t} tokens. Parsing aborted.`,
            );
    }
}
function ni(e) {
    const t = e.value;
    return Md(e.kind) + (t != null ? ` "${t}"` : "");
}
function Md(e) {
    return Sv(e) ? `"${e}"` : e;
}
function Qv(e) {
    return `"${e.replace($v, qv)}"`;
}
const $v = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function qv(e) {
    return Hv[e.charCodeAt(0)];
}
const Hv = [
        "\\u0000",
        "\\u0001",
        "\\u0002",
        "\\u0003",
        "\\u0004",
        "\\u0005",
        "\\u0006",
        "\\u0007",
        "\\b",
        "\\t",
        "\\n",
        "\\u000B",
        "\\f",
        "\\r",
        "\\u000E",
        "\\u000F",
        "\\u0010",
        "\\u0011",
        "\\u0012",
        "\\u0013",
        "\\u0014",
        "\\u0015",
        "\\u0016",
        "\\u0017",
        "\\u0018",
        "\\u0019",
        "\\u001A",
        "\\u001B",
        "\\u001C",
        "\\u001D",
        "\\u001E",
        "\\u001F",
        "",
        "",
        '\\"',
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "\\\\",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "\\u007F",
        "\\u0080",
        "\\u0081",
        "\\u0082",
        "\\u0083",
        "\\u0084",
        "\\u0085",
        "\\u0086",
        "\\u0087",
        "\\u0088",
        "\\u0089",
        "\\u008A",
        "\\u008B",
        "\\u008C",
        "\\u008D",
        "\\u008E",
        "\\u008F",
        "\\u0090",
        "\\u0091",
        "\\u0092",
        "\\u0093",
        "\\u0094",
        "\\u0095",
        "\\u0096",
        "\\u0097",
        "\\u0098",
        "\\u0099",
        "\\u009A",
        "\\u009B",
        "\\u009C",
        "\\u009D",
        "\\u009E",
        "\\u009F",
    ],
    Wv = Object.freeze({});
function bv(e, t, n = Pd) {
    const r = new Map();
    for (const d of Object.values(F)) r.set(d, Gv(t, d));
    let i,
        s = Array.isArray(e),
        o = [e],
        l = -1,
        u = [],
        a = e,
        c,
        h;
    const m = [],
        y = [];
    do {
        l++;
        const d = l === o.length,
            f = d && u.length !== 0;
        if (d) {
            if (
                ((c = y.length === 0 ? void 0 : m[m.length - 1]),
                (a = h),
                (h = y.pop()),
                f)
            )
                if (s) {
                    a = a.slice();
                    let E = 0;
                    for (const [_, T] of u) {
                        const N = _ - E;
                        T === null ? (a.splice(N, 1), E++) : (a[N] = T);
                    }
                } else {
                    a = Object.defineProperties(
                        {},
                        Object.getOwnPropertyDescriptors(a),
                    );
                    for (const [E, _] of u) a[E] = _;
                }
            (l = i.index),
                (o = i.keys),
                (u = i.edits),
                (s = i.inArray),
                (i = i.prev);
        } else if (h) {
            if (((c = s ? l : o[l]), (a = h[c]), a == null)) continue;
            m.push(c);
        }
        let p;
        if (!Array.isArray(a)) {
            var v, g;
            Aa(a) || vi(!1, `Invalid AST Node: ${iu(a)}.`);
            const E = d
                ? (v = r.get(a.kind)) === null || v === void 0
                    ? void 0
                    : v.leave
                : (g = r.get(a.kind)) === null || g === void 0
                ? void 0
                : g.enter;
            if (((p = E == null ? void 0 : E.call(t, a, c, h, m, y)), p === Wv))
                break;
            if (p === !1) {
                if (!d) {
                    m.pop();
                    continue;
                }
            } else if (p !== void 0 && (u.push([c, p]), !d))
                if (Aa(p)) a = p;
                else {
                    m.pop();
                    continue;
                }
        }
        if ((p === void 0 && f && u.push([c, a]), d)) m.pop();
        else {
            var C;
            (i = { inArray: s, index: l, keys: o, edits: u, prev: i }),
                (s = Array.isArray(a)),
                (o = s ? a : (C = n[a.kind]) !== null && C !== void 0 ? C : []),
                (l = -1),
                (u = []),
                h && y.push(h),
                (h = a);
        }
    } while (i !== void 0);
    return u.length !== 0 ? u[u.length - 1][1] : e;
}
function Gv(e, t) {
    const n = e[t];
    return typeof n == "object"
        ? n
        : typeof n == "function"
        ? { enter: n, leave: void 0 }
        : { enter: e.enter, leave: e.leave };
}
function Kv(e) {
    return bv(e, Xv);
}
const Yv = 80,
    Xv = {
        Name: { leave: (e) => e.value },
        Variable: { leave: (e) => "$" + e.name },
        Document: {
            leave: (e) =>
                L(
                    e.definitions,
                    `

`,
                ),
        },
        OperationDefinition: {
            leave(e) {
                const t = B("(", L(e.variableDefinitions, ", "), ")"),
                    n = L(
                        [e.operation, L([e.name, t]), L(e.directives, " ")],
                        " ",
                    );
                return (n === "query" ? "" : n + " ") + e.selectionSet;
            },
        },
        VariableDefinition: {
            leave: ({ variable: e, type: t, defaultValue: n, directives: r }) =>
                e + ": " + t + B(" = ", n) + B(" ", L(r, " ")),
        },
        SelectionSet: { leave: ({ selections: e }) => qe(e) },
        Field: {
            leave({
                alias: e,
                name: t,
                arguments: n,
                directives: r,
                selectionSet: i,
            }) {
                const s = B("", e, ": ") + t;
                let o = s + B("(", L(n, ", "), ")");
                return (
                    o.length > Yv &&
                        (o =
                            s +
                            B(
                                `(
`,
                                yi(
                                    L(
                                        n,
                                        `
`,
                                    ),
                                ),
                                `
)`,
                            )),
                    L([o, L(r, " "), i], " ")
                );
            },
        },
        Argument: { leave: ({ name: e, value: t }) => e + ": " + t },
        FragmentSpread: {
            leave: ({ name: e, directives: t }) =>
                "..." + e + B(" ", L(t, " ")),
        },
        InlineFragment: {
            leave: ({ typeCondition: e, directives: t, selectionSet: n }) =>
                L(["...", B("on ", e), L(t, " "), n], " "),
        },
        FragmentDefinition: {
            leave: ({
                name: e,
                typeCondition: t,
                variableDefinitions: n,
                directives: r,
                selectionSet: i,
            }) =>
                `fragment ${e}${B("(", L(n, ", "), ")")} on ${t} ${B(
                    "",
                    L(r, " "),
                    " ",
                )}` + i,
        },
        IntValue: { leave: ({ value: e }) => e },
        FloatValue: { leave: ({ value: e }) => e },
        StringValue: { leave: ({ value: e, block: t }) => (t ? Ev(e) : Qv(e)) },
        BooleanValue: { leave: ({ value: e }) => (e ? "true" : "false") },
        NullValue: { leave: () => "null" },
        EnumValue: { leave: ({ value: e }) => e },
        ListValue: { leave: ({ values: e }) => "[" + L(e, ", ") + "]" },
        ObjectValue: { leave: ({ fields: e }) => "{" + L(e, ", ") + "}" },
        ObjectField: { leave: ({ name: e, value: t }) => e + ": " + t },
        Directive: {
            leave: ({ name: e, arguments: t }) =>
                "@" + e + B("(", L(t, ", "), ")"),
        },
        NamedType: { leave: ({ name: e }) => e },
        ListType: { leave: ({ type: e }) => "[" + e + "]" },
        NonNullType: { leave: ({ type: e }) => e + "!" },
        SchemaDefinition: {
            leave: ({ description: e, directives: t, operationTypes: n }) =>
                B(
                    "",
                    e,
                    `
`,
                ) + L(["schema", L(t, " "), qe(n)], " "),
        },
        OperationTypeDefinition: {
            leave: ({ operation: e, type: t }) => e + ": " + t,
        },
        ScalarTypeDefinition: {
            leave: ({ description: e, name: t, directives: n }) =>
                B(
                    "",
                    e,
                    `
`,
                ) + L(["scalar", t, L(n, " ")], " "),
        },
        ObjectTypeDefinition: {
            leave: ({
                description: e,
                name: t,
                interfaces: n,
                directives: r,
                fields: i,
            }) =>
                B(
                    "",
                    e,
                    `
`,
                ) +
                L(
                    [
                        "type",
                        t,
                        B("implements ", L(n, " & ")),
                        L(r, " "),
                        qe(i),
                    ],
                    " ",
                ),
        },
        FieldDefinition: {
            leave: ({
                description: e,
                name: t,
                arguments: n,
                type: r,
                directives: i,
            }) =>
                B(
                    "",
                    e,
                    `
`,
                ) +
                t +
                (Fa(n)
                    ? B(
                          `(
`,
                          yi(
                              L(
                                  n,
                                  `
`,
                              ),
                          ),
                          `
)`,
                      )
                    : B("(", L(n, ", "), ")")) +
                ": " +
                r +
                B(" ", L(i, " ")),
        },
        InputValueDefinition: {
            leave: ({
                description: e,
                name: t,
                type: n,
                defaultValue: r,
                directives: i,
            }) =>
                B(
                    "",
                    e,
                    `
`,
                ) + L([t + ": " + n, B("= ", r), L(i, " ")], " "),
        },
        InterfaceTypeDefinition: {
            leave: ({
                description: e,
                name: t,
                interfaces: n,
                directives: r,
                fields: i,
            }) =>
                B(
                    "",
                    e,
                    `
`,
                ) +
                L(
                    [
                        "interface",
                        t,
                        B("implements ", L(n, " & ")),
                        L(r, " "),
                        qe(i),
                    ],
                    " ",
                ),
        },
        UnionTypeDefinition: {
            leave: ({ description: e, name: t, directives: n, types: r }) =>
                B(
                    "",
                    e,
                    `
`,
                ) + L(["union", t, L(n, " "), B("= ", L(r, " | "))], " "),
        },
        EnumTypeDefinition: {
            leave: ({ description: e, name: t, directives: n, values: r }) =>
                B(
                    "",
                    e,
                    `
`,
                ) + L(["enum", t, L(n, " "), qe(r)], " "),
        },
        EnumValueDefinition: {
            leave: ({ description: e, name: t, directives: n }) =>
                B(
                    "",
                    e,
                    `
`,
                ) + L([t, L(n, " ")], " "),
        },
        InputObjectTypeDefinition: {
            leave: ({ description: e, name: t, directives: n, fields: r }) =>
                B(
                    "",
                    e,
                    `
`,
                ) + L(["input", t, L(n, " "), qe(r)], " "),
        },
        DirectiveDefinition: {
            leave: ({
                description: e,
                name: t,
                arguments: n,
                repeatable: r,
                locations: i,
            }) =>
                B(
                    "",
                    e,
                    `
`,
                ) +
                "directive @" +
                t +
                (Fa(n)
                    ? B(
                          `(
`,
                          yi(
                              L(
                                  n,
                                  `
`,
                              ),
                          ),
                          `
)`,
                      )
                    : B("(", L(n, ", "), ")")) +
                (r ? " repeatable" : "") +
                " on " +
                L(i, " | "),
        },
        SchemaExtension: {
            leave: ({ directives: e, operationTypes: t }) =>
                L(["extend schema", L(e, " "), qe(t)], " "),
        },
        ScalarTypeExtension: {
            leave: ({ name: e, directives: t }) =>
                L(["extend scalar", e, L(t, " ")], " "),
        },
        ObjectTypeExtension: {
            leave: ({ name: e, interfaces: t, directives: n, fields: r }) =>
                L(
                    [
                        "extend type",
                        e,
                        B("implements ", L(t, " & ")),
                        L(n, " "),
                        qe(r),
                    ],
                    " ",
                ),
        },
        InterfaceTypeExtension: {
            leave: ({ name: e, interfaces: t, directives: n, fields: r }) =>
                L(
                    [
                        "extend interface",
                        e,
                        B("implements ", L(t, " & ")),
                        L(n, " "),
                        qe(r),
                    ],
                    " ",
                ),
        },
        UnionTypeExtension: {
            leave: ({ name: e, directives: t, types: n }) =>
                L(["extend union", e, L(t, " "), B("= ", L(n, " | "))], " "),
        },
        EnumTypeExtension: {
            leave: ({ name: e, directives: t, values: n }) =>
                L(["extend enum", e, L(t, " "), qe(n)], " "),
        },
        InputObjectTypeExtension: {
            leave: ({ name: e, directives: t, fields: n }) =>
                L(["extend input", e, L(t, " "), qe(n)], " "),
        },
    };
function L(e, t = "") {
    var n;
    return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null &&
        n !== void 0
        ? n
        : "";
}
function qe(e) {
    return B(
        `{
`,
        yi(
            L(
                e,
                `
`,
            ),
        ),
        `
}`,
    );
}
function B(e, t, n = "") {
    return t != null && t !== "" ? e + t + n : "";
}
function yi(e) {
    return B(
        "  ",
        e.replace(
            /\n/g,
            `
  `,
        ),
    );
}
function Fa(e) {
    var t;
    return (t =
        e == null
            ? void 0
            : e.some((n) =>
                  n.includes(`
`),
              )) !== null && t !== void 0
        ? t
        : !1;
}
const ja = (e) => {
        var r, i;
        let t;
        const n = e.definitions.filter((s) => s.kind === "OperationDefinition");
        return (
            n.length === 1 &&
                (t =
                    (i = (r = n[0]) == null ? void 0 : r.name) == null
                        ? void 0
                        : i.value),
            t
        );
    },
    Gs = (e) => {
        if (typeof e == "string") {
            let n;
            try {
                const r = Bv(e);
                n = ja(r);
            } catch {}
            return { query: e, operationName: n };
        }
        const t = ja(e);
        return { query: Kv(e), operationName: t };
    };
class ur extends Error {
    constructor(t, n) {
        const r = `${ur.extractMessage(t)}: ${JSON.stringify({
            response: t,
            request: n,
        })}`;
        super(r),
            Object.setPrototypeOf(this, ur.prototype),
            (this.response = t),
            (this.request = n),
            typeof Error.captureStackTrace == "function" &&
                Error.captureStackTrace(this, ur);
    }
    static extractMessage(t) {
        var n, r;
        return (
            ((r = (n = t.errors) == null ? void 0 : n[0]) == null
                ? void 0
                : r.message) ?? `GraphQL Error (Code: ${t.status})`
        );
    }
}
var el = { exports: {} };
(function (e, t) {
    var n = typeof self < "u" ? self : Bd,
        r = (function () {
            function s() {
                (this.fetch = !1), (this.DOMException = n.DOMException);
            }
            return (s.prototype = n), new s();
        })();
    (function (s) {
        (function (o) {
            var l = {
                searchParams: "URLSearchParams" in s,
                iterable: "Symbol" in s && "iterator" in Symbol,
                blob:
                    "FileReader" in s &&
                    "Blob" in s &&
                    (function () {
                        try {
                            return new Blob(), !0;
                        } catch {
                            return !1;
                        }
                    })(),
                formData: "FormData" in s,
                arrayBuffer: "ArrayBuffer" in s,
            };
            function u(w) {
                return w && DataView.prototype.isPrototypeOf(w);
            }
            if (l.arrayBuffer)
                var a = [
                        "[object Int8Array]",
                        "[object Uint8Array]",
                        "[object Uint8ClampedArray]",
                        "[object Int16Array]",
                        "[object Uint16Array]",
                        "[object Int32Array]",
                        "[object Uint32Array]",
                        "[object Float32Array]",
                        "[object Float64Array]",
                    ],
                    c =
                        ArrayBuffer.isView ||
                        function (w) {
                            return (
                                w &&
                                a.indexOf(Object.prototype.toString.call(w)) >
                                    -1
                            );
                        };
            function h(w) {
                if (
                    (typeof w != "string" && (w = String(w)),
                    /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(w))
                )
                    throw new TypeError(
                        "Invalid character in header field name",
                    );
                return w.toLowerCase();
            }
            function m(w) {
                return typeof w != "string" && (w = String(w)), w;
            }
            function y(w) {
                var I = {
                    next: function () {
                        var U = w.shift();
                        return { done: U === void 0, value: U };
                    },
                };
                return (
                    l.iterable &&
                        (I[Symbol.iterator] = function () {
                            return I;
                        }),
                    I
                );
            }
            function v(w) {
                (this.map = {}),
                    w instanceof v
                        ? w.forEach(function (I, U) {
                              this.append(U, I);
                          }, this)
                        : Array.isArray(w)
                        ? w.forEach(function (I) {
                              this.append(I[0], I[1]);
                          }, this)
                        : w &&
                          Object.getOwnPropertyNames(w).forEach(function (I) {
                              this.append(I, w[I]);
                          }, this);
            }
            (v.prototype.append = function (w, I) {
                (w = h(w)), (I = m(I));
                var U = this.map[w];
                this.map[w] = U ? U + ", " + I : I;
            }),
                (v.prototype.delete = function (w) {
                    delete this.map[h(w)];
                }),
                (v.prototype.get = function (w) {
                    return (w = h(w)), this.has(w) ? this.map[w] : null;
                }),
                (v.prototype.has = function (w) {
                    return this.map.hasOwnProperty(h(w));
                }),
                (v.prototype.set = function (w, I) {
                    this.map[h(w)] = m(I);
                }),
                (v.prototype.forEach = function (w, I) {
                    for (var U in this.map)
                        this.map.hasOwnProperty(U) &&
                            w.call(I, this.map[U], U, this);
                }),
                (v.prototype.keys = function () {
                    var w = [];
                    return (
                        this.forEach(function (I, U) {
                            w.push(U);
                        }),
                        y(w)
                    );
                }),
                (v.prototype.values = function () {
                    var w = [];
                    return (
                        this.forEach(function (I) {
                            w.push(I);
                        }),
                        y(w)
                    );
                }),
                (v.prototype.entries = function () {
                    var w = [];
                    return (
                        this.forEach(function (I, U) {
                            w.push([U, I]);
                        }),
                        y(w)
                    );
                }),
                l.iterable &&
                    (v.prototype[Symbol.iterator] = v.prototype.entries);
            function g(w) {
                if (w.bodyUsed)
                    return Promise.reject(new TypeError("Already read"));
                w.bodyUsed = !0;
            }
            function C(w) {
                return new Promise(function (I, U) {
                    (w.onload = function () {
                        I(w.result);
                    }),
                        (w.onerror = function () {
                            U(w.error);
                        });
                });
            }
            function d(w) {
                var I = new FileReader(),
                    U = C(I);
                return I.readAsArrayBuffer(w), U;
            }
            function f(w) {
                var I = new FileReader(),
                    U = C(I);
                return I.readAsText(w), U;
            }
            function p(w) {
                for (
                    var I = new Uint8Array(w), U = new Array(I.length), ne = 0;
                    ne < I.length;
                    ne++
                )
                    U[ne] = String.fromCharCode(I[ne]);
                return U.join("");
            }
            function E(w) {
                if (w.slice) return w.slice(0);
                var I = new Uint8Array(w.byteLength);
                return I.set(new Uint8Array(w)), I.buffer;
            }
            function _() {
                return (
                    (this.bodyUsed = !1),
                    (this._initBody = function (w) {
                        (this._bodyInit = w),
                            w
                                ? typeof w == "string"
                                    ? (this._bodyText = w)
                                    : l.blob && Blob.prototype.isPrototypeOf(w)
                                    ? (this._bodyBlob = w)
                                    : l.formData &&
                                      FormData.prototype.isPrototypeOf(w)
                                    ? (this._bodyFormData = w)
                                    : l.searchParams &&
                                      URLSearchParams.prototype.isPrototypeOf(w)
                                    ? (this._bodyText = w.toString())
                                    : l.arrayBuffer && l.blob && u(w)
                                    ? ((this._bodyArrayBuffer = E(w.buffer)),
                                      (this._bodyInit = new Blob([
                                          this._bodyArrayBuffer,
                                      ])))
                                    : l.arrayBuffer &&
                                      (ArrayBuffer.prototype.isPrototypeOf(w) ||
                                          c(w))
                                    ? (this._bodyArrayBuffer = E(w))
                                    : (this._bodyText = w =
                                          Object.prototype.toString.call(w))
                                : (this._bodyText = ""),
                            this.headers.get("content-type") ||
                                (typeof w == "string"
                                    ? this.headers.set(
                                          "content-type",
                                          "text/plain;charset=UTF-8",
                                      )
                                    : this._bodyBlob && this._bodyBlob.type
                                    ? this.headers.set(
                                          "content-type",
                                          this._bodyBlob.type,
                                      )
                                    : l.searchParams &&
                                      URLSearchParams.prototype.isPrototypeOf(
                                          w,
                                      ) &&
                                      this.headers.set(
                                          "content-type",
                                          "application/x-www-form-urlencoded;charset=UTF-8",
                                      ));
                    }),
                    l.blob &&
                        ((this.blob = function () {
                            var w = g(this);
                            if (w) return w;
                            if (this._bodyBlob)
                                return Promise.resolve(this._bodyBlob);
                            if (this._bodyArrayBuffer)
                                return Promise.resolve(
                                    new Blob([this._bodyArrayBuffer]),
                                );
                            if (this._bodyFormData)
                                throw new Error(
                                    "could not read FormData body as blob",
                                );
                            return Promise.resolve(new Blob([this._bodyText]));
                        }),
                        (this.arrayBuffer = function () {
                            return this._bodyArrayBuffer
                                ? g(this) ||
                                      Promise.resolve(this._bodyArrayBuffer)
                                : this.blob().then(d);
                        })),
                    (this.text = function () {
                        var w = g(this);
                        if (w) return w;
                        if (this._bodyBlob) return f(this._bodyBlob);
                        if (this._bodyArrayBuffer)
                            return Promise.resolve(p(this._bodyArrayBuffer));
                        if (this._bodyFormData)
                            throw new Error(
                                "could not read FormData body as text",
                            );
                        return Promise.resolve(this._bodyText);
                    }),
                    l.formData &&
                        (this.formData = function () {
                            return this.text().then(z);
                        }),
                    (this.json = function () {
                        return this.text().then(JSON.parse);
                    }),
                    this
                );
            }
            var T = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            function N(w) {
                var I = w.toUpperCase();
                return T.indexOf(I) > -1 ? I : w;
            }
            function k(w, I) {
                I = I || {};
                var U = I.body;
                if (w instanceof k) {
                    if (w.bodyUsed) throw new TypeError("Already read");
                    (this.url = w.url),
                        (this.credentials = w.credentials),
                        I.headers || (this.headers = new v(w.headers)),
                        (this.method = w.method),
                        (this.mode = w.mode),
                        (this.signal = w.signal),
                        !U &&
                            w._bodyInit != null &&
                            ((U = w._bodyInit), (w.bodyUsed = !0));
                } else this.url = String(w);
                if (
                    ((this.credentials =
                        I.credentials || this.credentials || "same-origin"),
                    (I.headers || !this.headers) &&
                        (this.headers = new v(I.headers)),
                    (this.method = N(I.method || this.method || "GET")),
                    (this.mode = I.mode || this.mode || null),
                    (this.signal = I.signal || this.signal),
                    (this.referrer = null),
                    (this.method === "GET" || this.method === "HEAD") && U)
                )
                    throw new TypeError(
                        "Body not allowed for GET or HEAD requests",
                    );
                this._initBody(U);
            }
            k.prototype.clone = function () {
                return new k(this, { body: this._bodyInit });
            };
            function z(w) {
                var I = new FormData();
                return (
                    w
                        .trim()
                        .split("&")
                        .forEach(function (U) {
                            if (U) {
                                var ne = U.split("="),
                                    P = ne.shift().replace(/\+/g, " "),
                                    D = ne.join("=").replace(/\+/g, " ");
                                I.append(
                                    decodeURIComponent(P),
                                    decodeURIComponent(D),
                                );
                            }
                        }),
                    I
                );
            }
            function j(w) {
                var I = new v(),
                    U = w.replace(/\r?\n[\t ]+/g, " ");
                return (
                    U.split(/\r?\n/).forEach(function (ne) {
                        var P = ne.split(":"),
                            D = P.shift().trim();
                        if (D) {
                            var M = P.join(":").trim();
                            I.append(D, M);
                        }
                    }),
                    I
                );
            }
            _.call(k.prototype);
            function H(w, I) {
                I || (I = {}),
                    (this.type = "default"),
                    (this.status = I.status === void 0 ? 200 : I.status),
                    (this.ok = this.status >= 200 && this.status < 300),
                    (this.statusText = "statusText" in I ? I.statusText : "OK"),
                    (this.headers = new v(I.headers)),
                    (this.url = I.url || ""),
                    this._initBody(w);
            }
            _.call(H.prototype),
                (H.prototype.clone = function () {
                    return new H(this._bodyInit, {
                        status: this.status,
                        statusText: this.statusText,
                        headers: new v(this.headers),
                        url: this.url,
                    });
                }),
                (H.error = function () {
                    var w = new H(null, { status: 0, statusText: "" });
                    return (w.type = "error"), w;
                });
            var ht = [301, 302, 303, 307, 308];
            (H.redirect = function (w, I) {
                if (ht.indexOf(I) === -1)
                    throw new RangeError("Invalid status code");
                return new H(null, { status: I, headers: { location: w } });
            }),
                (o.DOMException = s.DOMException);
            try {
                new o.DOMException();
            } catch {
                (o.DOMException = function (I, U) {
                    (this.message = I), (this.name = U);
                    var ne = Error(I);
                    this.stack = ne.stack;
                }),
                    (o.DOMException.prototype = Object.create(Error.prototype)),
                    (o.DOMException.prototype.constructor = o.DOMException);
            }
            function Qe(w, I) {
                return new Promise(function (U, ne) {
                    var P = new k(w, I);
                    if (P.signal && P.signal.aborted)
                        return ne(new o.DOMException("Aborted", "AbortError"));
                    var D = new XMLHttpRequest();
                    function M() {
                        D.abort();
                    }
                    (D.onload = function () {
                        var q = {
                            status: D.status,
                            statusText: D.statusText,
                            headers: j(D.getAllResponseHeaders() || ""),
                        };
                        q.url =
                            "responseURL" in D
                                ? D.responseURL
                                : q.headers.get("X-Request-URL");
                        var Z = "response" in D ? D.response : D.responseText;
                        U(new H(Z, q));
                    }),
                        (D.onerror = function () {
                            ne(new TypeError("Network request failed"));
                        }),
                        (D.ontimeout = function () {
                            ne(new TypeError("Network request failed"));
                        }),
                        (D.onabort = function () {
                            ne(new o.DOMException("Aborted", "AbortError"));
                        }),
                        D.open(P.method, P.url, !0),
                        P.credentials === "include"
                            ? (D.withCredentials = !0)
                            : P.credentials === "omit" &&
                              (D.withCredentials = !1),
                        "responseType" in D &&
                            l.blob &&
                            (D.responseType = "blob"),
                        P.headers.forEach(function (q, Z) {
                            D.setRequestHeader(Z, q);
                        }),
                        P.signal &&
                            (P.signal.addEventListener("abort", M),
                            (D.onreadystatechange = function () {
                                D.readyState === 4 &&
                                    P.signal.removeEventListener("abort", M);
                            })),
                        D.send(typeof P._bodyInit > "u" ? null : P._bodyInit);
                });
            }
            return (
                (Qe.polyfill = !0),
                s.fetch ||
                    ((s.fetch = Qe),
                    (s.Headers = v),
                    (s.Request = k),
                    (s.Response = H)),
                (o.Headers = v),
                (o.Request = k),
                (o.Response = H),
                (o.fetch = Qe),
                Object.defineProperty(o, "__esModule", { value: !0 }),
                o
            );
        })({});
    })(r),
        (r.fetch.ponyfill = !0),
        delete r.fetch.polyfill;
    var i = r;
    (t = i.fetch),
        (t.default = i.fetch),
        (t.fetch = i.fetch),
        (t.Headers = i.Headers),
        (t.Request = i.Request),
        (t.Response = i.Response),
        (e.exports = t);
})(el, el.exports);
var Yi = el.exports;
const gi = za(Yi),
    Jv = Ua({ __proto__: null, default: gi }, [Yi]),
    on = (e) => {
        let t = {};
        return (
            e &&
                ((typeof Headers < "u" && e instanceof Headers) ||
                (Jv && Yi.Headers && e instanceof Yi.Headers)
                    ? (t = sv(e))
                    : Array.isArray(e)
                    ? e.forEach(([n, r]) => {
                          n && r !== void 0 && (t[n] = r);
                      })
                    : (t = e)),
            t
        );
    },
    Ma = (e) => e.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim(),
    Zv = (e) => {
        if (!Array.isArray(e.query)) {
            const r = e,
                i = [`query=${encodeURIComponent(Ma(r.query))}`];
            return (
                e.variables &&
                    i.push(
                        `variables=${encodeURIComponent(
                            r.jsonSerializer.stringify(r.variables),
                        )}`,
                    ),
                r.operationName &&
                    i.push(
                        `operationName=${encodeURIComponent(r.operationName)}`,
                    ),
                i.join("&")
            );
        }
        if (typeof e.variables < "u" && !Array.isArray(e.variables))
            throw new Error(
                "Cannot create query with given variable type, array expected",
            );
        const t = e,
            n = e.query.reduce(
                (r, i, s) => (
                    r.push({
                        query: Ma(i),
                        variables: t.variables
                            ? t.jsonSerializer.stringify(t.variables[s])
                            : void 0,
                    }),
                    r
                ),
                [],
            );
        return `query=${encodeURIComponent(t.jsonSerializer.stringify(n))}`;
    },
    ey = (e) => async (t) => {
        const {
                url: n,
                query: r,
                variables: i,
                operationName: s,
                fetch: o,
                fetchOptions: l,
                middleware: u,
            } = t,
            a = { ...t.headers };
        let c = "",
            h;
        e === "POST"
            ? ((h = ny(r, i, s, l.jsonSerializer)),
              typeof h == "string" && (a["Content-Type"] = "application/json"))
            : (c = Zv({
                  query: r,
                  variables: i,
                  operationName: s,
                  jsonSerializer: l.jsonSerializer ?? nu,
              }));
        const m = { method: e, headers: a, body: h, ...l };
        let y = n,
            v = m;
        if (u) {
            const g = await Promise.resolve(
                    u({ ...m, url: n, operationName: s, variables: i }),
                ),
                { url: C, ...d } = g;
            (y = C), (v = d);
        }
        return c && (y = `${y}?${c}`), await o(y, v);
    };
class ty {
    constructor(t, n = {}) {
        (this.url = t),
            (this.requestConfig = n),
            (this.rawRequest = async (...r) => {
                const [i, s, o] = r,
                    l = lv(i, s, o),
                    {
                        headers: u,
                        fetch: a = gi,
                        method: c = "POST",
                        requestMiddleware: h,
                        responseMiddleware: m,
                        ...y
                    } = this.requestConfig,
                    { url: v } = this;
                l.signal !== void 0 && (y.signal = l.signal);
                const { operationName: g } = Gs(l.query);
                return Ks({
                    url: v,
                    query: l.query,
                    variables: l.variables,
                    headers: { ...on(Ys(u)), ...on(l.requestHeaders) },
                    operationName: g,
                    fetch: a,
                    method: c,
                    fetchOptions: y,
                    middleware: h,
                })
                    .then((C) => (m && m(C), C))
                    .catch((C) => {
                        throw (m && m(C), C);
                    });
            });
    }
    async request(t, ...n) {
        const [r, i] = n,
            s = ov(t, r, i),
            {
                headers: o,
                fetch: l = gi,
                method: u = "POST",
                requestMiddleware: a,
                responseMiddleware: c,
                ...h
            } = this.requestConfig,
            { url: m } = this;
        s.signal !== void 0 && (h.signal = s.signal);
        const { query: y, operationName: v } = Gs(s.document);
        return Ks({
            url: m,
            query: y,
            variables: s.variables,
            headers: { ...on(Ys(o)), ...on(s.requestHeaders) },
            operationName: v,
            fetch: l,
            method: u,
            fetchOptions: h,
            middleware: a,
        })
            .then((g) => (c && c(g), g.data))
            .catch((g) => {
                throw (c && c(g), g);
            });
    }
    batchRequests(t, n) {
        const r = uv(t, n),
            { headers: i, ...s } = this.requestConfig;
        r.signal !== void 0 && (s.signal = r.signal);
        const o = r.documents.map(({ document: u }) => Gs(u).query),
            l = r.documents.map(({ variables: u }) => u);
        return Ks({
            url: this.url,
            query: o,
            variables: l,
            headers: { ...on(Ys(i)), ...on(r.requestHeaders) },
            operationName: void 0,
            fetch: this.requestConfig.fetch ?? gi,
            method: this.requestConfig.method || "POST",
            fetchOptions: s,
            middleware: this.requestConfig.requestMiddleware,
        })
            .then(
                (u) => (
                    this.requestConfig.responseMiddleware &&
                        this.requestConfig.responseMiddleware(u),
                    u.data
                ),
            )
            .catch((u) => {
                throw (
                    (this.requestConfig.responseMiddleware &&
                        this.requestConfig.responseMiddleware(u),
                    u)
                );
            });
    }
    setHeaders(t) {
        return (this.requestConfig.headers = t), this;
    }
    setHeader(t, n) {
        const { headers: r } = this.requestConfig;
        return r ? (r[t] = n) : (this.requestConfig.headers = { [t]: n }), this;
    }
    setEndpoint(t) {
        return (this.url = t), this;
    }
}
const Ks = async (e) => {
    const { query: t, variables: n, fetchOptions: r } = e,
        i = ey(iv(e.method ?? "post")),
        s = Array.isArray(e.query),
        o = await i(e),
        l = await ry(o, r.jsonSerializer ?? nu),
        u = Array.isArray(l) ? !l.some(({ data: c }) => !c) : !!l.data,
        a =
            Array.isArray(l) ||
            !l.errors ||
            (Array.isArray(l.errors) && !l.errors.length) ||
            r.errorPolicy === "all" ||
            r.errorPolicy === "ignore";
    if (o.ok && a && u) {
        const { errors: c, ...h } = (Array.isArray(l), l),
            m = r.errorPolicy === "ignore" ? h : l;
        return {
            ...(s ? { data: m } : m),
            headers: o.headers,
            status: o.status,
        };
    } else {
        const c = typeof l == "string" ? { error: l } : l;
        throw new ur(
            { ...c, status: o.status, headers: o.headers },
            { query: t, variables: n },
        );
    }
};
async function Ud(e, t, ...n) {
    const r = av(e, t, ...n);
    return new ty(r.url).request({ ...r });
}
const ny = (e, t, n, r) => {
        const i = r ?? nu;
        if (!Array.isArray(e))
            return i.stringify({ query: e, variables: t, operationName: n });
        if (typeof t < "u" && !Array.isArray(t))
            throw new Error(
                "Cannot create request body with given variable type, array expected",
            );
        const s = e.reduce(
            (o, l, u) => (
                o.push({ query: l, variables: t ? t[u] : void 0 }), o
            ),
            [],
        );
        return i.stringify(s);
    },
    ry = async (e, t) => {
        let n;
        return (
            e.headers.forEach((r, i) => {
                i.toLowerCase() === "content-type" && (n = r);
            }),
            n &&
            (n.toLowerCase().startsWith("application/json") ||
                n.toLowerCase().startsWith("application/graphql+json") ||
                n.toLowerCase().startsWith("application/graphql-response+json"))
                ? t.parse(await e.text())
                : e.text()
        );
    },
    Ys = (e) => (typeof e == "function" ? e() : e),
    zd = (e, ...t) =>
        e.reduce((n, r, i) => `${n}${r}${i in t ? String(t[i]) : ""}`, ""),
    iy = "https://j3vzh3eptc.us-west-2.awsapprunner.com/api/v1";
function sy() {
    return pd(
        ["clients"],
        async () =>
            await Ud(
                iy,
                zd`
              query{
                  clients{
                      id
                      name
                  }
              }`,
            ),
    );
}
function oy() {
    var s;
    const { status: e, data: t, error: n, isFetching: r, refetch: i } = sy();
    return x.jsxs("div", {
        children: [
            x.jsx("h1", {
                className: "m-4 p-4 text-bold text-4xl",
                children: "Clients",
            }),
            x.jsx("div", {
                children:
                    e === "loading"
                        ? "Loading..."
                        : e === "error"
                        ? x.jsxs("span", { children: ["Error: ", n.message] })
                        : x.jsxs(x.Fragment, {
                              children: [
                                  x.jsx("div", {
                                      children: r
                                          ? "Background Updating..."
                                          : " ",
                                  }),
                                  x.jsx("div", {
                                      className: "overflow-x-auto",
                                      children: x.jsxs("table", {
                                          className: "table",
                                          children: [
                                              x.jsx("thead", {
                                                  children: x.jsxs("tr", {
                                                      children: [
                                                          x.jsx("th", {
                                                              children: "Name",
                                                          }),
                                                          x.jsx("th", {
                                                              children: "ID",
                                                          }),
                                                      ],
                                                  }),
                                              }),
                                              x.jsx("tbody", {
                                                  children:
                                                      ((s =
                                                          t == null
                                                              ? void 0
                                                              : t.clients) ==
                                                      null
                                                          ? void 0
                                                          : s.length) === 0
                                                          ? "No clients found"
                                                          : t.clients.map((o) =>
                                                                x.jsxs(
                                                                    "tr",
                                                                    {
                                                                        className:
                                                                            "hover",
                                                                        children:
                                                                            [
                                                                                x.jsx(
                                                                                    "td",
                                                                                    {
                                                                                        children:
                                                                                            o.name,
                                                                                    },
                                                                                ),
                                                                                x.jsx(
                                                                                    "td",
                                                                                    {
                                                                                        children:
                                                                                            o.id,
                                                                                    },
                                                                                ),
                                                                                x.jsx(
                                                                                    "td",
                                                                                    {
                                                                                        children:
                                                                                            x.jsx(
                                                                                                Od,
                                                                                                {
                                                                                                    to: `/client/${o.id}`,
                                                                                                    children:
                                                                                                        x.jsx(
                                                                                                            "button",
                                                                                                            {
                                                                                                                className:
                                                                                                                    "text-white font-bold py-2 px-4 rounded",
                                                                                                                children:
                                                                                                                    "View",
                                                                                                            },
                                                                                                        ),
                                                                                                },
                                                                                            ),
                                                                                    },
                                                                                ),
                                                                            ],
                                                                    },
                                                                    o.id,
                                                                ),
                                                            ),
                                              }),
                                          ],
                                      }),
                                  }),
                              ],
                          }),
            }),
        ],
    });
}
const ly = "https://j3vzh3eptc.us-west-2.awsapprunner.com/api/v1";
function uy(e) {
    return pd(
        ["client", e],
        async () =>
            await Ud(
                ly,
                zd`
              query{
                  client(id: "${e}"){
                      id
                      name
                  }
              }`,
            ),
    );
}
function ay() {
    let { id: e } = Dm();
    const { status: t, data: n, error: r, isFetching: i, refetch: s } = uy(e);
    return x.jsxs("div", {
        children: [
            x.jsx("h1", {
                className: "m-4 p-4 text-bold text-4xl",
                children: "Client",
            }),
            x.jsx("div", {
                children:
                    t === "loading"
                        ? "Loading..."
                        : t === "error"
                        ? x.jsxs("span", { children: ["Error: ", r.message] })
                        : x.jsxs(x.Fragment, {
                              children: [
                                  x.jsx("div", {
                                      children: i
                                          ? "Background Updating..."
                                          : " ",
                                  }),
                                  x.jsxs("div", {
                                      className: "overflow-x-auto",
                                      children: [
                                          x.jsxs("p", {
                                              children: [
                                                  "Name: ",
                                                  n.client.name,
                                              ],
                                          }),
                                          x.jsxs("p", {
                                              children: ["ID: ", n.client.id],
                                          }),
                                      ],
                                  }),
                              ],
                          }),
            }),
        ],
    });
}
function cy() {
    return x.jsxs("div", {
        children: [
            x.jsx("h1", {
                className: "m-4 p-4 text-bold text-4xl",
                children: "Projects",
            }),
            x.jsx("p", {
                className: "m-4 p-4 text-bold text-2xl",
                children: "Show projects",
            }),
        ],
    });
}
function fy() {
    return x.jsxs("div", {
        children: [
            x.jsx("h1", {
                className: "m-4 p-4 text-bold text-4xl",
                children: "Home",
            }),
            x.jsx("p", {
                className: "m-4 p-4 text-bold text-2xl",
                children: "Log in page",
            }),
        ],
    });
}
function dy() {
    return x.jsxs("div", {
        children: [
            x.jsx("h1", {
                className: "m-4 p-4 text-bold text-4xl",
                children: "Admin",
            }),
            x.jsx("p", {
                className: "m-4 p-4 text-bold text-2xl",
                children: "Show admin tasks",
            }),
        ],
    });
}
function hy() {
    return x.jsxs("div", {
        children: [
            x.jsx("h1", {
                className: "m-4 p-4 text-bold text-4xl",
                children: "Dashboard",
            }),
            x.jsx("p", {
                className: "m-4 p-4 text-bold text-2xl",
                children: "Logged in home page",
            }),
        ],
    });
}
const py = new O0();
function my() {
    return x.jsx(Zm, {
        children: x.jsx($0, {
            client: py,
            children: x.jsxs(bm, {
                children: [
                    x.jsx(_e, {
                        path: "/",
                        element: x.jsx(sn, {}),
                        children: x.jsx(_e, {
                            path: "/",
                            element: x.jsx(fy, {}),
                        }),
                    }),
                    x.jsx(_e, {
                        path: "/",
                        element: x.jsx(sn, {}),
                        children: x.jsx(_e, {
                            path: "clients",
                            element: x.jsx(oy, {}),
                        }),
                    }),
                    x.jsx(_e, {
                        path: "/",
                        element: x.jsx(sn, {}),
                        children: x.jsx(_e, {
                            path: "projects",
                            element: x.jsx(cy, {}),
                        }),
                    }),
                    x.jsx(_e, {
                        path: "/",
                        element: x.jsx(sn, {}),
                        children: x.jsx(_e, {
                            path: "admin",
                            element: x.jsx(dy, {}),
                        }),
                    }),
                    x.jsx(_e, {
                        path: "/",
                        element: x.jsx(sn, {}),
                        children: x.jsx(_e, {
                            path: "dashboard",
                            element: x.jsx(hy, {}),
                        }),
                    }),
                    x.jsx(_e, {
                        path: "/",
                        element: x.jsx(sn, {}),
                        children: x.jsx(_e, {
                            path: "/client/:id",
                            element: x.jsx(ay, {}),
                        }),
                    }),
                ],
            }),
        }),
    });
}
const vy = td(document.getElementById("root"));
vy.render(x.jsx(my, {}));
