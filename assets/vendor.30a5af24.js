var Lo = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {}
  , Ao = {
    exports: {}
}
  , Io = {
    exports: {}
};
(function(n) {
    (function(e, t) {
        n.exports ? n.exports = t() : e.EvEmitter = t()
    }
    )(typeof window != "undefined" ? window : Lo, function() {
        function e() {}
        let t = e.prototype;
        return t.on = function(i, r) {
            if (!i || !r)
                return this;
            let s = this._events = this._events || {}
              , o = s[i] = s[i] || [];
            return o.includes(r) || o.push(r),
            this
        }
        ,
        t.once = function(i, r) {
            if (!i || !r)
                return this;
            this.on(i, r);
            let s = this._onceEvents = this._onceEvents || {}
              , o = s[i] = s[i] || {};
            return o[r] = !0,
            this
        }
        ,
        t.off = function(i, r) {
            let s = this._events && this._events[i];
            if (!s || !s.length)
                return this;
            let o = s.indexOf(r);
            return o != -1 && s.splice(o, 1),
            this
        }
        ,
        t.emitEvent = function(i, r) {
            let s = this._events && this._events[i];
            if (!s || !s.length)
                return this;
            s = s.slice(0),
            r = r || [];
            let o = this._onceEvents && this._onceEvents[i];
            for (let a of s)
                o && o[a] && (this.off(i, a),
                delete o[a]),
                a.apply(this, r);
            return this
        }
        ,
        t.allOff = function() {
            return delete this._events,
            delete this._onceEvents,
            this
        }
        ,
        e
    })
}
)(Io);
/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(n) {
    (function(e, t) {
        n.exports ? n.exports = t(e, Io.exports) : e.imagesLoaded = t(e, e.EvEmitter)
    }
    )(typeof window != "undefined" ? window : Lo, function(t, i) {
        let r = t.jQuery
          , s = t.console;
        function o(c) {
            return Array.isArray(c) ? c : typeof c == "object" && typeof c.length == "number" ? [...c] : [c]
        }
        function a(c, d, g) {
            if (!(this instanceof a))
                return new a(c,d,g);
            let h = c;
            if (typeof c == "string" && (h = document.querySelectorAll(c)),
            !h) {
                s.error(`Bad element for imagesLoaded ${h || c}`);
                return
            }
            this.elements = o(h),
            this.options = {},
            typeof d == "function" ? g = d : Object.assign(this.options, d),
            g && this.on("always", g),
            this.getImages(),
            r && (this.jqDeferred = new r.Deferred),
            setTimeout(this.check.bind(this))
        }
        a.prototype = Object.create(i.prototype),
        a.prototype.getImages = function() {
            this.images = [],
            this.elements.forEach(this.addElementImages, this)
        }
        ;
        const l = [1, 9, 11];
        a.prototype.addElementImages = function(c) {
            c.nodeName === "IMG" && this.addImage(c),
            this.options.background === !0 && this.addElementBackgroundImages(c);
            let {nodeType: d} = c;
            if (!d || !l.includes(d))
                return;
            let g = c.querySelectorAll("img");
            for (let h of g)
                this.addImage(h);
            if (typeof this.options.background == "string") {
                let h = c.querySelectorAll(this.options.background);
                for (let m of h)
                    this.addElementBackgroundImages(m)
            }
        }
        ;
        const f = /url\((['"])?(.*?)\1\)/gi;
        a.prototype.addElementBackgroundImages = function(c) {
            let d = getComputedStyle(c);
            if (!d)
                return;
            let g = f.exec(d.backgroundImage);
            for (; g !== null; ) {
                let h = g && g[2];
                h && this.addBackground(h, c),
                g = f.exec(d.backgroundImage)
            }
        }
        ,
        a.prototype.addImage = function(c) {
            let d = new u(c);
            this.images.push(d)
        }
        ,
        a.prototype.addBackground = function(c, d) {
            let g = new p(c,d);
            this.images.push(g)
        }
        ,
        a.prototype.check = function() {
            if (this.progressedCount = 0,
            this.hasAnyBroken = !1,
            !this.images.length) {
                this.complete();
                return
            }
            let c = (d,g,h)=>{
                setTimeout(()=>{
                    this.progress(d, g, h)
                }
                )
            }
            ;
            this.images.forEach(function(d) {
                d.once("progress", c),
                d.check()
            })
        }
        ,
        a.prototype.progress = function(c, d, g) {
            this.progressedCount++,
            this.hasAnyBroken = this.hasAnyBroken || !c.isLoaded,
            this.emitEvent("progress", [this, c, d]),
            this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, c),
            this.progressedCount === this.images.length && this.complete(),
            this.options.debug && s && s.log(`progress: ${g}`, c, d)
        }
        ,
        a.prototype.complete = function() {
            let c = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0,
            this.emitEvent(c, [this]),
            this.emitEvent("always", [this]),
            this.jqDeferred) {
                let d = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[d](this)
            }
        }
        ;
        function u(c) {
            this.img = c
        }
        u.prototype = Object.create(i.prototype),
        u.prototype.check = function() {
            if (this.getIsImageComplete()) {
                this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
                return
            }
            this.proxyImage = new Image,
            this.img.crossOrigin && (this.proxyImage.crossOrigin = this.img.crossOrigin),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            this.proxyImage.src = this.img.currentSrc || this.img.src
        }
        ,
        u.prototype.getIsImageComplete = function() {
            return this.img.complete && this.img.naturalWidth
        }
        ,
        u.prototype.confirm = function(c, d) {
            this.isLoaded = c;
            let {parentNode: g} = this.img
              , h = g.nodeName === "PICTURE" ? g : this.img;
            this.emitEvent("progress", [this, h, d])
        }
        ,
        u.prototype.handleEvent = function(c) {
            let d = "on" + c.type;
            this[d] && this[d](c)
        }
        ,
        u.prototype.onload = function() {
            this.confirm(!0, "onload"),
            this.unbindEvents()
        }
        ,
        u.prototype.onerror = function() {
            this.confirm(!1, "onerror"),
            this.unbindEvents()
        }
        ,
        u.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this),
            this.proxyImage.removeEventListener("error", this),
            this.img.removeEventListener("load", this),
            this.img.removeEventListener("error", this)
        }
        ;
        function p(c, d) {
            this.url = c,
            this.element = d,
            this.img = new Image
        }
        return p.prototype = Object.create(u.prototype),
        p.prototype.check = function() {
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            this.img.src = this.url,
            this.getIsImageComplete() && (this.confirm(this.img.naturalWidth !== 0, "naturalWidth"),
            this.unbindEvents())
        }
        ,
        p.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this),
            this.img.removeEventListener("error", this)
        }
        ,
        p.prototype.confirm = function(c, d) {
            this.isLoaded = c,
            this.emitEvent("progress", [this, this.element, d])
        }
        ,
        a.makeJQueryPlugin = function(c) {
            c = c || t.jQuery,
            c && (r = c,
            r.fn.imagesLoaded = function(d, g) {
                return new a(this,d,g).jqDeferred.promise(r(this))
            }
            )
        }
        ,
        a.makeJQueryPlugin(),
        a
    })
}
)(Ao);
var Ed = Ao.exports;
function _t(n) {
    if (n === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return n
}
function Do(n, e) {
    n.prototype = Object.create(e.prototype),
    n.prototype.constructor = n,
    n.__proto__ = e
}
/*!
 * GSAP 3.9.1
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Be = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
        lineHeight: ""
    }
}, Pi = {
    duration: .5,
    overwrite: !1,
    delay: 0
}, cs, qe = 1e8, Y = 1 / qe, Hn = Math.PI * 2, Pl = Hn / 4, kl = 0, zo = Math.sqrt, Ol = Math.cos, Ml = Math.sin, ce = function(e) {
    return typeof e == "string"
}, ue = function(e) {
    return typeof e == "function"
}, St = function(e) {
    return typeof e == "number"
}, ds = function(e) {
    return typeof e == "undefined"
}, Ct = function(e) {
    return typeof e == "object"
}, Ae = function(e) {
    return e !== !1
}, $o = function() {
    return typeof window != "undefined"
}, br = function(e) {
    return ue(e) || ce(e)
}, Ro = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {}
, ye = Array.isArray, qn = /(?:-?\.?\d|\.)+/gi, Fo = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, gi = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, bn = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Bo = /[+-]=-?[.\d]+/, No = /[^,'"\[\]\s]+/gi, Ll = /[\d.+\-=]+(?:e[-+]\d*)*/i, K, at, Un, ps, Ne = {}, Wr = {}, Vo, Go = function(e) {
    return (Wr = ki(e, Ne)) && dt
}, hs = function(e, t) {
    return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()")
}, jr = function(e, t) {
    return !t && console.warn(e)
}, Wo = function(e, t) {
    return e && (Ne[e] = t) && Wr && (Wr[e] = t) || Ne
}, ir = function() {
    return 0
}, gs = {}, Dt = [], Kn = {}, jo, Re = {}, Tn = {}, Fs = 30, Dr = [], ms = "", _s = function(e) {
    var t = e[0], i, r;
    if (Ct(t) || ue(t) || (e = [e]),
    !(i = (t._gsap || {}).harness)) {
        for (r = Dr.length; r-- && !Dr[r].targetTest(t); )
            ;
        i = Dr[r]
    }
    for (r = e.length; r--; )
        e[r] && (e[r]._gsap || (e[r]._gsap = new da(e[r],i))) || e.splice(r, 1);
    return e
}, Qt = function(e) {
    return e._gsap || _s(Ue(e))[0]._gsap
}, Yo = function(e, t, i) {
    return (i = e[t]) && ue(i) ? e[t]() : ds(i) && e.getAttribute && e.getAttribute(t) || i
}, Ie = function(e, t) {
    return (e = e.split(",")).forEach(t) || e
}, re = function(e) {
    return Math.round(e * 1e5) / 1e5 || 0
}, ve = function(e) {
    return Math.round(e * 1e7) / 1e7 || 0
}, Al = function(e, t) {
    for (var i = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < i; )
        ;
    return r < i
}, Yr = function() {
    var e = Dt.length, t = Dt.slice(0), i, r;
    for (Kn = {},
    Dt.length = 0,
    i = 0; i < e; i++)
        r = t[i],
        r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0)
}, Xo = function(e, t, i, r) {
    Dt.length && Yr(),
    e.render(t, i, r),
    Dt.length && Yr()
}, Ho = function(e) {
    var t = parseFloat(e);
    return (t || t === 0) && (e + "").match(No).length < 2 ? t : ce(e) ? e.trim() : e
}, qo = function(e) {
    return e
}, Ze = function(e, t) {
    for (var i in t)
        i in e || (e[i] = t[i]);
    return e
}, Il = function(e) {
    return function(t, i) {
        for (var r in i)
            r in t || r === "duration" && e || r === "ease" || (t[r] = i[r])
    }
}, ki = function(e, t) {
    for (var i in t)
        e[i] = t[i];
    return e
}, Bs = function n(e, t) {
    for (var i in t)
        i !== "__proto__" && i !== "constructor" && i !== "prototype" && (e[i] = Ct(t[i]) ? n(e[i] || (e[i] = {}), t[i]) : t[i]);
    return e
}, Xr = function(e, t) {
    var i = {}, r;
    for (r in e)
        r in t || (i[r] = e[r]);
    return i
}, Qi = function(e) {
    var t = e.parent || K
      , i = e.keyframes ? Il(ye(e.keyframes)) : Ze;
    if (Ae(e.inherit))
        for (; t; )
            i(e, t.vars.defaults),
            t = t.parent || t._dp;
    return e
}, Dl = function(e, t) {
    for (var i = e.length, r = i === t.length; r && i-- && e[i] === t[i]; )
        ;
    return i < 0
}, zl = function(e, t, i, r, s) {
    i === void 0 && (i = "_first"),
    r === void 0 && (r = "_last");
    var o = e[r], a;
    if (s)
        for (a = t[s]; o && o[s] > a; )
            o = o._prev;
    return o ? (t._next = o._next,
    o._next = t) : (t._next = e[i],
    e[i] = t),
    t._next ? t._next._prev = t : e[r] = t,
    t._prev = o,
    t.parent = t._dp = e,
    t
}, sn = function(e, t, i, r) {
    i === void 0 && (i = "_first"),
    r === void 0 && (r = "_last");
    var s = t._prev
      , o = t._next;
    s ? s._next = o : e[i] === t && (e[i] = o),
    o ? o._prev = s : e[r] === t && (e[r] = s),
    t._next = t._prev = t.parent = null
}, bt = function(e, t) {
    e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove(e),
    e._act = 0
}, Jt = function(e, t) {
    if (e && (!t || t._end > e._dur || t._start < 0))
        for (var i = e; i; )
            i._dirty = 1,
            i = i.parent;
    return e
}, $l = function(e) {
    for (var t = e.parent; t && t.parent; )
        t._dirty = 1,
        t.totalDuration(),
        t = t.parent;
    return e
}, Rl = function n(e) {
    return !e || e._ts && n(e.parent)
}, Ns = function(e) {
    return e._repeat ? Oi(e._tTime, e = e.duration() + e._rDelay) * e : 0
}, Oi = function(e, t) {
    var i = Math.floor(e /= t);
    return e && i === e ? i - 1 : i
}, Hr = function(e, t) {
    return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
}, on = function(e) {
    return e._end = ve(e._start + (e._tDur / Math.abs(e._ts || e._rts || Y) || 0))
}, Uo = function(e, t) {
    var i = e._dp;
    return i && i.smoothChildTiming && e._ts && (e._start = ve(i._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)),
    on(e),
    i._dirty || Jt(i, e)),
    e
}, Ko = function(e, t) {
    var i;
    if ((t._time || t._initted && !t._dur) && (i = Hr(e.rawTime(), t),
    (!t._dur || gr(0, t.totalDuration(), i) - t._tTime > Y) && t.render(i, !0)),
    Jt(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
        if (e._dur < e.duration())
            for (i = e; i._dp; )
                i.rawTime() >= 0 && i.totalTime(i._tTime),
                i = i._dp;
        e._zTime = -Y
    }
}, ft = function(e, t, i, r) {
    return t.parent && bt(t),
    t._start = ve((St(i) ? i : i || e !== K ? We(e, i, t) : e._time) + t._delay),
    t._end = ve(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)),
    zl(e, t, "_first", "_last", e._sort ? "_start" : 0),
    Zn(t) || (e._recent = t),
    r || Ko(e, t),
    e
}, Zo = function(e, t) {
    return (Ne.ScrollTrigger || hs("scrollTrigger", t)) && Ne.ScrollTrigger.create(t, e)
}, Qo = function(e, t, i, r) {
    if (af(e, t),
    !e._initted)
        return 1;
    if (!i && e._pt && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && jo !== Xe.frame)
        return Dt.push(e),
        e._lazy = [t, r],
        1
}, Fl = function n(e) {
    var t = e.parent;
    return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || n(t))
}, Zn = function(e) {
    var t = e.data;
    return t === "isFromStart" || t === "isStart"
}, Bl = function(e, t, i, r) {
    var s = e.ratio, o = t < 0 || !t && (!e._start && Fl(e) && !(!e._initted && Zn(e)) || (e._ts < 0 || e._dp._ts < 0) && !Zn(e)) ? 0 : 1, a = e._rDelay, l = 0, f, u, p;
    if (a && e._repeat && (l = gr(0, e._tDur, t),
    u = Oi(l, a),
    e._yoyo && u & 1 && (o = 1 - o),
    u !== Oi(e._tTime, a) && (s = 1 - o,
    e.vars.repeatRefresh && e._initted && e.invalidate())),
    o !== s || r || e._zTime === Y || !t && e._zTime) {
        if (!e._initted && Qo(e, t, r, i))
            return;
        for (p = e._zTime,
        e._zTime = t || (i ? Y : 0),
        i || (i = t && !p),
        e.ratio = o,
        e._from && (o = 1 - o),
        e._time = 0,
        e._tTime = l,
        f = e._pt; f; )
            f.r(o, f.d),
            f = f._next;
        e._startAt && t < 0 && e._startAt.render(t, !0, !0),
        e._onUpdate && !i && Ke(e, "onUpdate"),
        l && e._repeat && !i && e.parent && Ke(e, "onRepeat"),
        (t >= e._tDur || t < 0) && e.ratio === o && (o && bt(e, 1),
        i || (Ke(e, o ? "onComplete" : "onReverseComplete", !0),
        e._prom && e._prom()))
    } else
        e._zTime || (e._zTime = t)
}, Nl = function(e, t, i) {
    var r;
    if (i > t)
        for (r = e._first; r && r._start <= i; ) {
            if (r.data === "isPause" && r._start > t)
                return r;
            r = r._next
        }
    else
        for (r = e._last; r && r._start >= i; ) {
            if (r.data === "isPause" && r._start < t)
                return r;
            r = r._prev
        }
}, Mi = function(e, t, i, r) {
    var s = e._repeat
      , o = ve(t) || 0
      , a = e._tTime / e._tDur;
    return a && !r && (e._time *= o / e._dur),
    e._dur = o,
    e._tDur = s ? s < 0 ? 1e10 : ve(o * (s + 1) + e._rDelay * s) : o,
    a > 0 && !r ? Uo(e, e._tTime = e._tDur * a) : e.parent && on(e),
    i || Jt(e.parent, e),
    e
}, Vs = function(e) {
    return e instanceof Le ? Jt(e) : Mi(e, e._dur)
}, Vl = {
    _start: 0,
    endTime: ir,
    totalDuration: ir
}, We = function n(e, t, i) {
    var r = e.labels, s = e._recent || Vl, o = e.duration() >= qe ? s.endTime(!1) : e._dur, a, l, f;
    return ce(t) && (isNaN(t) || t in r) ? (l = t.charAt(0),
    f = t.substr(-1) === "%",
    a = t.indexOf("="),
    l === "<" || l === ">" ? (a >= 0 && (t = t.replace(/=/, "")),
    (l === "<" ? s._start : s.endTime(s._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (f ? (a < 0 ? s : i).totalDuration() / 100 : 1)) : a < 0 ? (t in r || (r[t] = o),
    r[t]) : (l = parseFloat(t.charAt(a - 1) + t.substr(a + 1)),
    f && i && (l = l / 100 * (ye(i) ? i[0] : i).totalDuration()),
    a > 1 ? n(e, t.substr(0, a - 1), i) + l : o + l)) : t == null ? o : +t
}, Ji = function(e, t, i) {
    var r = St(t[1]), s = (r ? 2 : 1) + (e < 2 ? 0 : 1), o = t[s], a, l;
    if (r && (o.duration = t[1]),
    o.parent = i,
    e) {
        for (a = o,
        l = i; l && !("immediateRender"in a); )
            a = l.vars.defaults || {},
            l = Ae(l.vars.inherit) && l.parent;
        o.immediateRender = Ae(a.immediateRender),
        e < 2 ? o.runBackwards = 1 : o.startAt = t[s - 1]
    }
    return new fe(t[0],o,t[s + 1])
}, Gt = function(e, t) {
    return e || e === 0 ? t(e) : t
}, gr = function(e, t, i) {
    return i < e ? e : i > t ? t : i
}, Me = function(e, t) {
    return !ce(e) || !(t = Ll.exec(e)) ? "" : e.substr(t.index + t[0].length)
}, Gl = function(e, t, i) {
    return Gt(i, function(r) {
        return gr(e, t, r)
    })
}, Qn = [].slice, Jo = function(e, t) {
    return e && Ct(e) && "length"in e && (!t && !e.length || e.length - 1 in e && Ct(e[0])) && !e.nodeType && e !== at
}, Wl = function(e, t, i) {
    return i === void 0 && (i = []),
    e.forEach(function(r) {
        var s;
        return ce(r) && !t || Jo(r, 1) ? (s = i).push.apply(s, Ue(r)) : i.push(r)
    }) || i
}, Ue = function(e, t, i) {
    return ce(e) && !i && (Un || !Li()) ? Qn.call((t || ps).querySelectorAll(e), 0) : ye(e) ? Wl(e, i) : Jo(e) ? Qn.call(e, 0) : e ? [e] : []
}, jl = function(e) {
    return e = Ue(e)[0] || jr("Invalid scope") || {},
    function(t) {
        var i = e.current || e.nativeElement || e;
        return Ue(t, i.querySelectorAll ? i : i === e ? jr("Invalid scope") || ps.createElement("div") : e)
    }
}, ea = function(e) {
    return e.sort(function() {
        return .5 - Math.random()
    })
}, ta = function(e) {
    if (ue(e))
        return e;
    var t = Ct(e) ? e : {
        each: e
    }
      , i = ei(t.ease)
      , r = t.from || 0
      , s = parseFloat(t.base) || 0
      , o = {}
      , a = r > 0 && r < 1
      , l = isNaN(r) || a
      , f = t.axis
      , u = r
      , p = r;
    return ce(r) ? u = p = {
        center: .5,
        edges: .5,
        end: 1
    }[r] || 0 : !a && l && (u = r[0],
    p = r[1]),
    function(c, d, g) {
        var h = (g || t).length, m = o[h], v, b, y, _, T, x, w, C, P;
        if (!m) {
            if (P = t.grid === "auto" ? 0 : (t.grid || [1, qe])[1],
            !P) {
                for (w = -qe; w < (w = g[P++].getBoundingClientRect().left) && P < h; )
                    ;
                P--
            }
            for (m = o[h] = [],
            v = l ? Math.min(P, h) * u - .5 : r % P,
            b = P === qe ? 0 : l ? h * p / P - .5 : r / P | 0,
            w = 0,
            C = qe,
            x = 0; x < h; x++)
                y = x % P - v,
                _ = b - (x / P | 0),
                m[x] = T = f ? Math.abs(f === "y" ? _ : y) : zo(y * y + _ * _),
                T > w && (w = T),
                T < C && (C = T);
            r === "random" && ea(m),
            m.max = w - C,
            m.min = C,
            m.v = h = (parseFloat(t.amount) || parseFloat(t.each) * (P > h ? h - 1 : f ? f === "y" ? h / P : P : Math.max(P, h / P)) || 0) * (r === "edges" ? -1 : 1),
            m.b = h < 0 ? s - h : s,
            m.u = Me(t.amount || t.each) || 0,
            i = i && h < 0 ? fa(i) : i
        }
        return h = (m[c] - m.min) / m.max || 0,
        ve(m.b + (i ? i(h) : h) * m.v) + m.u
    }
}, Jn = function(e) {
    var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
    return function(i) {
        var r = Math.round(parseFloat(i) / e) * e * t;
        return (r - r % 1) / t + (St(i) ? 0 : Me(i))
    }
}, ia = function(e, t) {
    var i = ye(e), r, s;
    return !i && Ct(e) && (r = i = e.radius || qe,
    e.values ? (e = Ue(e.values),
    (s = !St(e[0])) && (r *= r)) : e = Jn(e.increment)),
    Gt(t, i ? ue(e) ? function(o) {
        return s = e(o),
        Math.abs(s - o) <= r ? s : o
    }
    : function(o) {
        for (var a = parseFloat(s ? o.x : o), l = parseFloat(s ? o.y : 0), f = qe, u = 0, p = e.length, c, d; p--; )
            s ? (c = e[p].x - a,
            d = e[p].y - l,
            c = c * c + d * d) : c = Math.abs(e[p] - a),
            c < f && (f = c,
            u = p);
        return u = !r || f <= r ? e[u] : o,
        s || u === o || St(o) ? u : u + Me(o)
    }
    : Jn(e))
}, ra = function(e, t, i, r) {
    return Gt(ye(e) ? !t : i === !0 ? !!(i = 0) : !r, function() {
        return ye(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e - i / 2 + Math.random() * (t - e + i * .99)) / i) * i * r) / r
    })
}, Yl = function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
        t[i] = arguments[i];
    return function(r) {
        return t.reduce(function(s, o) {
            return o(s)
        }, r)
    }
}, Xl = function(e, t) {
    return function(i) {
        return e(parseFloat(i)) + (t || Me(i))
    }
}, Hl = function(e, t, i) {
    return sa(e, t, 0, 1, i)
}, na = function(e, t, i) {
    return Gt(i, function(r) {
        return e[~~t(r)]
    })
}, ql = function n(e, t, i) {
    var r = t - e;
    return ye(e) ? na(e, n(0, e.length), t) : Gt(i, function(s) {
        return (r + (s - e) % r) % r + e
    })
}, Ul = function n(e, t, i) {
    var r = t - e
      , s = r * 2;
    return ye(e) ? na(e, n(0, e.length - 1), t) : Gt(i, function(o) {
        return o = (s + (o - e) % s) % s || 0,
        e + (o > r ? s - o : o)
    })
}, rr = function(e) {
    for (var t = 0, i = "", r, s, o, a; ~(r = e.indexOf("random(", t)); )
        o = e.indexOf(")", r),
        a = e.charAt(r + 7) === "[",
        s = e.substr(r + 7, o - r - 7).match(a ? No : qn),
        i += e.substr(t, r - t) + ra(a ? s : +s[0], a ? 0 : +s[1], +s[2] || 1e-5),
        t = o + 1;
    return i + e.substr(t, e.length - t)
}, sa = function(e, t, i, r, s) {
    var o = t - e
      , a = r - i;
    return Gt(s, function(l) {
        return i + ((l - e) / o * a || 0)
    })
}, Kl = function n(e, t, i, r) {
    var s = isNaN(e + t) ? 0 : function(d) {
        return (1 - d) * e + d * t
    }
    ;
    if (!s) {
        var o = ce(e), a = {}, l, f, u, p, c;
        if (i === !0 && (r = 1) && (i = null),
        o)
            e = {
                p: e
            },
            t = {
                p: t
            };
        else if (ye(e) && !ye(t)) {
            for (u = [],
            p = e.length,
            c = p - 2,
            f = 1; f < p; f++)
                u.push(n(e[f - 1], e[f]));
            p--,
            s = function(g) {
                g *= p;
                var h = Math.min(c, ~~g);
                return u[h](g - h)
            }
            ,
            i = t
        } else
            r || (e = ki(ye(e) ? [] : {}, e));
        if (!u) {
            for (l in t)
                vs.call(a, e, l, "get", t[l]);
            s = function(g) {
                return bs(g, a) || (o ? e.p : e)
            }
        }
    }
    return Gt(i, s)
}, Gs = function(e, t, i) {
    var r = e.labels, s = qe, o, a, l;
    for (o in r)
        a = r[o] - t,
        a < 0 == !!i && a && s > (a = Math.abs(a)) && (l = o,
        s = a);
    return l
}, Ke = function(e, t, i) {
    var r = e.vars, s = r[t], o, a;
    if (!!s)
        return o = r[t + "Params"],
        a = r.callbackScope || e,
        i && Dt.length && Yr(),
        o ? s.apply(a, o) : s.call(a)
}, Yi = function(e) {
    return bt(e),
    e.scrollTrigger && e.scrollTrigger.kill(!1),
    e.progress() < 1 && Ke(e, "onInterrupt"),
    e
}, mi, Zl = function(e) {
    e = !e.name && e.default || e;
    var t = e.name
      , i = ue(e)
      , r = t && !i && e.init ? function() {
        this._props = []
    }
    : e
      , s = {
        init: ir,
        render: bs,
        add: vs,
        kill: hf,
        modifier: pf,
        rawVars: 0
    }
      , o = {
        targetTest: 0,
        get: 0,
        getSetter: ws,
        aliases: {},
        register: 0
    };
    if (Li(),
    e !== r) {
        if (Re[t])
            return;
        Ze(r, Ze(Xr(e, s), o)),
        ki(r.prototype, ki(s, Xr(e, o))),
        Re[r.prop = t] = r,
        e.targetTest && (Dr.push(r),
        gs[t] = 1),
        t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin"
    }
    Wo(t, r),
    e.register && e.register(dt, r, De)
}, j = 255, Xi = {
    aqua: [0, j, j],
    lime: [0, j, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, j],
    navy: [0, 0, 128],
    white: [j, j, j],
    olive: [128, 128, 0],
    yellow: [j, j, 0],
    orange: [j, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [j, 0, 0],
    pink: [j, 192, 203],
    cyan: [0, j, j],
    transparent: [j, j, j, 0]
}, xn = function(e, t, i) {
    return e += e < 0 ? 1 : e > 1 ? -1 : 0,
    (e * 6 < 1 ? t + (i - t) * e * 6 : e < .5 ? i : e * 3 < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) * j + .5 | 0
}, oa = function(e, t, i) {
    var r = e ? St(e) ? [e >> 16, e >> 8 & j, e & j] : 0 : Xi.black, s, o, a, l, f, u, p, c, d, g;
    if (!r) {
        if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)),
        Xi[e])
            r = Xi[e];
        else if (e.charAt(0) === "#") {
            if (e.length < 6 && (s = e.charAt(1),
            o = e.charAt(2),
            a = e.charAt(3),
            e = "#" + s + s + o + o + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")),
            e.length === 9)
                return r = parseInt(e.substr(1, 6), 16),
                [r >> 16, r >> 8 & j, r & j, parseInt(e.substr(7), 16) / 255];
            e = parseInt(e.substr(1), 16),
            r = [e >> 16, e >> 8 & j, e & j]
        } else if (e.substr(0, 3) === "hsl") {
            if (r = g = e.match(qn),
            !t)
                l = +r[0] % 360 / 360,
                f = +r[1] / 100,
                u = +r[2] / 100,
                o = u <= .5 ? u * (f + 1) : u + f - u * f,
                s = u * 2 - o,
                r.length > 3 && (r[3] *= 1),
                r[0] = xn(l + 1 / 3, s, o),
                r[1] = xn(l, s, o),
                r[2] = xn(l - 1 / 3, s, o);
            else if (~e.indexOf("="))
                return r = e.match(Fo),
                i && r.length < 4 && (r[3] = 1),
                r
        } else
            r = e.match(qn) || Xi.transparent;
        r = r.map(Number)
    }
    return t && !g && (s = r[0] / j,
    o = r[1] / j,
    a = r[2] / j,
    p = Math.max(s, o, a),
    c = Math.min(s, o, a),
    u = (p + c) / 2,
    p === c ? l = f = 0 : (d = p - c,
    f = u > .5 ? d / (2 - p - c) : d / (p + c),
    l = p === s ? (o - a) / d + (o < a ? 6 : 0) : p === o ? (a - s) / d + 2 : (s - o) / d + 4,
    l *= 60),
    r[0] = ~~(l + .5),
    r[1] = ~~(f * 100 + .5),
    r[2] = ~~(u * 100 + .5)),
    i && r.length < 4 && (r[3] = 1),
    r
}, aa = function(e) {
    var t = []
      , i = []
      , r = -1;
    return e.split(zt).forEach(function(s) {
        var o = s.match(gi) || [];
        t.push.apply(t, o),
        i.push(r += o.length + 1)
    }),
    t.c = i,
    t
}, Ws = function(e, t, i) {
    var r = "", s = (e + r).match(zt), o = t ? "hsla(" : "rgba(", a = 0, l, f, u, p;
    if (!s)
        return e;
    if (s = s.map(function(c) {
        return (c = oa(c, t, 1)) && o + (t ? c[0] + "," + c[1] + "%," + c[2] + "%," + c[3] : c.join(",")) + ")"
    }),
    i && (u = aa(e),
    l = i.c,
    l.join(r) !== u.c.join(r)))
        for (f = e.replace(zt, "1").split(gi),
        p = f.length - 1; a < p; a++)
            r += f[a] + (~l.indexOf(a) ? s.shift() || o + "0,0,0,0)" : (u.length ? u : s.length ? s : i).shift());
    if (!f)
        for (f = e.split(zt),
        p = f.length - 1; a < p; a++)
            r += f[a] + s[a];
    return r + f[p]
}, zt = function() {
    var n = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
    for (e in Xi)
        n += "|" + e + "\\b";
    return new RegExp(n + ")","gi")
}(), Ql = /hsl[a]?\(/, la = function(e) {
    var t = e.join(" "), i;
    if (zt.lastIndex = 0,
    zt.test(t))
        return i = Ql.test(t),
        e[1] = Ws(e[1], i),
        e[0] = Ws(e[0], i, aa(e[1])),
        !0
}, qr, Xe = function() {
    var n = Date.now, e = 500, t = 33, i = n(), r = i, s = 1e3 / 240, o = s, a = [], l, f, u, p, c, d, g = function h(m) {
        var v = n() - r, b = m === !0, y, _, T, x;
        if (v > e && (i += v - t),
        r += v,
        T = r - i,
        y = T - o,
        (y > 0 || b) && (x = ++p.frame,
        c = T - p.time * 1e3,
        p.time = T = T / 1e3,
        o += y + (y >= s ? 4 : s - y),
        _ = 1),
        b || (l = f(h)),
        _)
            for (d = 0; d < a.length; d++)
                a[d](T, c, x, m)
    };
    return p = {
        time: 0,
        frame: 0,
        tick: function() {
            g(!0)
        },
        deltaRatio: function(m) {
            return c / (1e3 / (m || 60))
        },
        wake: function() {
            Vo && (!Un && $o() && (at = Un = window,
            ps = at.document || {},
            Ne.gsap = dt,
            (at.gsapVersions || (at.gsapVersions = [])).push(dt.version),
            Go(Wr || at.GreenSockGlobals || !at.gsap && at || {}),
            u = at.requestAnimationFrame),
            l && p.sleep(),
            f = u || function(m) {
                return setTimeout(m, o - p.time * 1e3 + 1 | 0)
            }
            ,
            qr = 1,
            g(2))
        },
        sleep: function() {
            (u ? at.cancelAnimationFrame : clearTimeout)(l),
            qr = 0,
            f = ir
        },
        lagSmoothing: function(m, v) {
            e = m || 1 / Y,
            t = Math.min(v, e, 0)
        },
        fps: function(m) {
            s = 1e3 / (m || 240),
            o = p.time * 1e3 + s
        },
        add: function(m) {
            a.indexOf(m) < 0 && a.push(m),
            Li()
        },
        remove: function(m, v) {
            ~(v = a.indexOf(m)) && a.splice(v, 1) && d >= v && d--
        },
        _listeners: a
    },
    p
}(), Li = function() {
    return !qr && Xe.wake()
}, R = {}, Jl = /^[\d.\-M][\d.\-,\s]/, ef = /["']/g, tf = function(e) {
    for (var t = {}, i = e.substr(1, e.length - 3).split(":"), r = i[0], s = 1, o = i.length, a, l, f; s < o; s++)
        l = i[s],
        a = s !== o - 1 ? l.lastIndexOf(",") : l.length,
        f = l.substr(0, a),
        t[r] = isNaN(f) ? f.replace(ef, "").trim() : +f,
        r = l.substr(a + 1).trim();
    return t
}, rf = function(e) {
    var t = e.indexOf("(") + 1
      , i = e.indexOf(")")
      , r = e.indexOf("(", t);
    return e.substring(t, ~r && r < i ? e.indexOf(")", i + 1) : i)
}, nf = function(e) {
    var t = (e + "").split("(")
      , i = R[t[0]];
    return i && t.length > 1 && i.config ? i.config.apply(null, ~e.indexOf("{") ? [tf(t[1])] : rf(e).split(",").map(Ho)) : R._CE && Jl.test(e) ? R._CE("", e) : i
}, fa = function(e) {
    return function(t) {
        return 1 - e(1 - t)
    }
}, ua = function n(e, t) {
    for (var i = e._first, r; i; )
        i instanceof Le ? n(i, t) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== t && (i.timeline ? n(i.timeline, t) : (r = i._ease,
        i._ease = i._yEase,
        i._yEase = r,
        i._yoyo = t)),
        i = i._next
}, ei = function(e, t) {
    return e && (ue(e) ? e : R[e] || nf(e)) || t
}, ni = function(e, t, i, r) {
    i === void 0 && (i = function(l) {
        return 1 - t(1 - l)
    }
    ),
    r === void 0 && (r = function(l) {
        return l < .5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2
    }
    );
    var s = {
        easeIn: t,
        easeOut: i,
        easeInOut: r
    }, o;
    return Ie(e, function(a) {
        R[a] = Ne[a] = s,
        R[o = a.toLowerCase()] = i;
        for (var l in s)
            R[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = R[a + "." + l] = s[l]
    }),
    s
}, ca = function(e) {
    return function(t) {
        return t < .5 ? (1 - e(1 - t * 2)) / 2 : .5 + e((t - .5) * 2) / 2
    }
}, Sn = function n(e, t, i) {
    var r = t >= 1 ? t : 1
      , s = (i || (e ? .3 : .45)) / (t < 1 ? t : 1)
      , o = s / Hn * (Math.asin(1 / r) || 0)
      , a = function(u) {
        return u === 1 ? 1 : r * Math.pow(2, -10 * u) * Ml((u - o) * s) + 1
    }
      , l = e === "out" ? a : e === "in" ? function(f) {
        return 1 - a(1 - f)
    }
    : ca(a);
    return s = Hn / s,
    l.config = function(f, u) {
        return n(e, f, u)
    }
    ,
    l
}, Cn = function n(e, t) {
    t === void 0 && (t = 1.70158);
    var i = function(o) {
        return o ? --o * o * ((t + 1) * o + t) + 1 : 0
    }
      , r = e === "out" ? i : e === "in" ? function(s) {
        return 1 - i(1 - s)
    }
    : ca(i);
    return r.config = function(s) {
        return n(e, s)
    }
    ,
    r
};
Ie("Linear,Quad,Cubic,Quart,Quint,Strong", function(n, e) {
    var t = e < 5 ? e + 1 : e;
    ni(n + ",Power" + (t - 1), e ? function(i) {
        return Math.pow(i, t)
    }
    : function(i) {
        return i
    }
    , function(i) {
        return 1 - Math.pow(1 - i, t)
    }, function(i) {
        return i < .5 ? Math.pow(i * 2, t) / 2 : 1 - Math.pow((1 - i) * 2, t) / 2
    })
});
R.Linear.easeNone = R.none = R.Linear.easeIn;
ni("Elastic", Sn("in"), Sn("out"), Sn());
(function(n, e) {
    var t = 1 / e
      , i = 2 * t
      , r = 2.5 * t
      , s = function(a) {
        return a < t ? n * a * a : a < i ? n * Math.pow(a - 1.5 / e, 2) + .75 : a < r ? n * (a -= 2.25 / e) * a + .9375 : n * Math.pow(a - 2.625 / e, 2) + .984375
    };
    ni("Bounce", function(o) {
        return 1 - s(1 - o)
    }, s)
}
)(7.5625, 2.75);
ni("Expo", function(n) {
    return n ? Math.pow(2, 10 * (n - 1)) : 0
});
ni("Circ", function(n) {
    return -(zo(1 - n * n) - 1)
});
ni("Sine", function(n) {
    return n === 1 ? 1 : -Ol(n * Pl) + 1
});
ni("Back", Cn("in"), Cn("out"), Cn());
R.SteppedEase = R.steps = Ne.SteppedEase = {
    config: function(e, t) {
        e === void 0 && (e = 1);
        var i = 1 / e
          , r = e + (t ? 0 : 1)
          , s = t ? 1 : 0
          , o = 1 - Y;
        return function(a) {
            return ((r * gr(0, o, a) | 0) + s) * i
        }
    }
};
Pi.ease = R["quad.out"];
Ie("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(n) {
    return ms += n + "," + n + "Params,"
});
var da = function(e, t) {
    this.id = kl++,
    e._gsap = this,
    this.target = e,
    this.harness = t,
    this.get = t ? t.get : Yo,
    this.set = t ? t.getSetter : ws
}
  , nr = function() {
    function n(t) {
        this.vars = t,
        this._delay = +t.delay || 0,
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0,
        this._yoyo = !!t.yoyo || !!t.yoyoEase),
        this._ts = 1,
        Mi(this, +t.duration, 1, 1),
        this.data = t.data,
        qr || Xe.wake()
    }
    var e = n.prototype;
    return e.delay = function(i) {
        return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay),
        this._delay = i,
        this) : this._delay
    }
    ,
    e.duration = function(i) {
        return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur
    }
    ,
    e.totalDuration = function(i) {
        return arguments.length ? (this._dirty = 0,
        Mi(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
    }
    ,
    e.totalTime = function(i, r) {
        if (Li(),
        !arguments.length)
            return this._tTime;
        var s = this._dp;
        if (s && s.smoothChildTiming && this._ts) {
            for (Uo(this, i),
            !s._dp || s.parent || Ko(s, this); s && s.parent; )
                s.parent._time !== s._start + (s._ts >= 0 ? s._tTime / s._ts : (s.totalDuration() - s._tTime) / -s._ts) && s.totalTime(s._tTime, !0),
                s = s.parent;
            !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && ft(this._dp, this, this._start - this._delay)
        }
        return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === Y || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i),
        Xo(this, i, r)),
        this
    }
    ,
    e.time = function(i, r) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + Ns(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time
    }
    ,
    e.totalProgress = function(i, r) {
        return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
    }
    ,
    e.progress = function(i, r) {
        return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + Ns(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
    }
    ,
    e.iteration = function(i, r) {
        var s = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (i - 1) * s, r) : this._repeat ? Oi(this._tTime, s) + 1 : 1
    }
    ,
    e.timeScale = function(i) {
        if (!arguments.length)
            return this._rts === -Y ? 0 : this._rts;
        if (this._rts === i)
            return this;
        var r = this.parent && this._ts ? Hr(this.parent._time, this) : this._tTime;
        return this._rts = +i || 0,
        this._ts = this._ps || i === -Y ? 0 : this._rts,
        $l(this.totalTime(gr(-this._delay, this._tDur, r), !0)),
        on(this),
        this
    }
    ,
    e.paused = function(i) {
        return arguments.length ? (this._ps !== i && (this._ps = i,
        i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
        this._ts = this._act = 0) : (Li(),
        this._ts = this._rts,
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== Y && (this._tTime -= Y)))),
        this) : this._ps
    }
    ,
    e.startTime = function(i) {
        if (arguments.length) {
            this._start = i;
            var r = this.parent || this._dp;
            return r && (r._sort || !this.parent) && ft(r, this, i - this._delay),
            this
        }
        return this._start
    }
    ,
    e.endTime = function(i) {
        return this._start + (Ae(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
    }
    ,
    e.rawTime = function(i) {
        var r = this.parent || this._dp;
        return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Hr(r.rawTime(i), this) : this._tTime : this._tTime
    }
    ,
    e.globalTime = function(i) {
        for (var r = this, s = arguments.length ? i : r.rawTime(); r; )
            s = r._start + s / (r._ts || 1),
            r = r._dp;
        return s
    }
    ,
    e.repeat = function(i) {
        return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i,
        Vs(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
    }
    ,
    e.repeatDelay = function(i) {
        if (arguments.length) {
            var r = this._time;
            return this._rDelay = i,
            Vs(this),
            r ? this.time(r) : this
        }
        return this._rDelay
    }
    ,
    e.yoyo = function(i) {
        return arguments.length ? (this._yoyo = i,
        this) : this._yoyo
    }
    ,
    e.seek = function(i, r) {
        return this.totalTime(We(this, i), Ae(r))
    }
    ,
    e.restart = function(i, r) {
        return this.play().totalTime(i ? -this._delay : 0, Ae(r))
    }
    ,
    e.play = function(i, r) {
        return i != null && this.seek(i, r),
        this.reversed(!1).paused(!1)
    }
    ,
    e.reverse = function(i, r) {
        return i != null && this.seek(i || this.totalDuration(), r),
        this.reversed(!0).paused(!1)
    }
    ,
    e.pause = function(i, r) {
        return i != null && this.seek(i, r),
        this.paused(!0)
    }
    ,
    e.resume = function() {
        return this.paused(!1)
    }
    ,
    e.reversed = function(i) {
        return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -Y : 0)),
        this) : this._rts < 0
    }
    ,
    e.invalidate = function() {
        return this._initted = this._act = 0,
        this._zTime = -Y,
        this
    }
    ,
    e.isActive = function() {
        var i = this.parent || this._dp, r = this._start, s;
        return !!(!i || this._ts && this._initted && i.isActive() && (s = i.rawTime(!0)) >= r && s < this.endTime(!0) - Y)
    }
    ,
    e.eventCallback = function(i, r, s) {
        var o = this.vars;
        return arguments.length > 1 ? (r ? (o[i] = r,
        s && (o[i + "Params"] = s),
        i === "onUpdate" && (this._onUpdate = r)) : delete o[i],
        this) : o[i]
    }
    ,
    e.then = function(i) {
        var r = this;
        return new Promise(function(s) {
            var o = ue(i) ? i : qo
              , a = function() {
                var f = r.then;
                r.then = null,
                ue(o) && (o = o(r)) && (o.then || o === r) && (r.then = f),
                s(o),
                r.then = f
            };
            r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? a() : r._prom = a
        }
        )
    }
    ,
    e.kill = function() {
        Yi(this)
    }
    ,
    n
}();
Ze(nr.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -Y,
    _prom: 0,
    _ps: !1,
    _rts: 1
});
var Le = function(n) {
    Do(e, n);
    function e(i, r) {
        var s;
        return i === void 0 && (i = {}),
        s = n.call(this, i) || this,
        s.labels = {},
        s.smoothChildTiming = !!i.smoothChildTiming,
        s.autoRemoveChildren = !!i.autoRemoveChildren,
        s._sort = Ae(i.sortChildren),
        K && ft(i.parent || K, _t(s), r),
        i.reversed && s.reverse(),
        i.paused && s.paused(!0),
        i.scrollTrigger && Zo(_t(s), i.scrollTrigger),
        s
    }
    var t = e.prototype;
    return t.to = function(r, s, o) {
        return Ji(0, arguments, this),
        this
    }
    ,
    t.from = function(r, s, o) {
        return Ji(1, arguments, this),
        this
    }
    ,
    t.fromTo = function(r, s, o, a) {
        return Ji(2, arguments, this),
        this
    }
    ,
    t.set = function(r, s, o) {
        return s.duration = 0,
        s.parent = this,
        Qi(s).repeatDelay || (s.repeat = 0),
        s.immediateRender = !!s.immediateRender,
        new fe(r,s,We(this, o),1),
        this
    }
    ,
    t.call = function(r, s, o) {
        return ft(this, fe.delayedCall(0, r, s), o)
    }
    ,
    t.staggerTo = function(r, s, o, a, l, f, u) {
        return o.duration = s,
        o.stagger = o.stagger || a,
        o.onComplete = f,
        o.onCompleteParams = u,
        o.parent = this,
        new fe(r,o,We(this, l)),
        this
    }
    ,
    t.staggerFrom = function(r, s, o, a, l, f, u) {
        return o.runBackwards = 1,
        Qi(o).immediateRender = Ae(o.immediateRender),
        this.staggerTo(r, s, o, a, l, f, u)
    }
    ,
    t.staggerFromTo = function(r, s, o, a, l, f, u, p) {
        return a.startAt = o,
        Qi(a).immediateRender = Ae(a.immediateRender),
        this.staggerTo(r, s, a, l, f, u, p)
    }
    ,
    t.render = function(r, s, o) {
        var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, f = this._dur, u = r <= 0 ? 0 : ve(r), p = this._zTime < 0 != r < 0 && (this._initted || !f), c, d, g, h, m, v, b, y, _, T, x, w;
        if (this !== K && u > l && r >= 0 && (u = l),
        u !== this._tTime || o || p) {
            if (a !== this._time && f && (u += this._time - a,
            r += this._time - a),
            c = u,
            _ = this._start,
            y = this._ts,
            v = !y,
            p && (f || (a = this._zTime),
            (r || !s) && (this._zTime = r)),
            this._repeat) {
                if (x = this._yoyo,
                m = f + this._rDelay,
                this._repeat < -1 && r < 0)
                    return this.totalTime(m * 100 + r, s, o);
                if (c = ve(u % m),
                u === l ? (h = this._repeat,
                c = f) : (h = ~~(u / m),
                h && h === u / m && (c = f,
                h--),
                c > f && (c = f)),
                T = Oi(this._tTime, m),
                !a && this._tTime && T !== h && (T = h),
                x && h & 1 && (c = f - c,
                w = 1),
                h !== T && !this._lock) {
                    var C = x && T & 1
                      , P = C === (x && h & 1);
                    if (h < T && (C = !C),
                    a = C ? 0 : f,
                    this._lock = 1,
                    this.render(a || (w ? 0 : ve(h * m)), s, !f)._lock = 0,
                    this._tTime = u,
                    !s && this.parent && Ke(this, "onRepeat"),
                    this.vars.repeatRefresh && !w && (this.invalidate()._lock = 1),
                    a && a !== this._time || v !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
                        return this;
                    if (f = this._dur,
                    l = this._tDur,
                    P && (this._lock = 2,
                    a = C ? f : -1e-4,
                    this.render(a, !0),
                    this.vars.repeatRefresh && !w && this.invalidate()),
                    this._lock = 0,
                    !this._ts && !v)
                        return this;
                    ua(this, w)
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2 && (b = Nl(this, ve(a), ve(c)),
            b && (u -= c - (c = b._start))),
            this._tTime = u,
            this._time = c,
            this._act = !y,
            this._initted || (this._onUpdate = this.vars.onUpdate,
            this._initted = 1,
            this._zTime = r,
            a = 0),
            !a && c && !s && (Ke(this, "onStart"),
            this._tTime !== u))
                return this;
            if (c >= a && r >= 0)
                for (d = this._first; d; ) {
                    if (g = d._next,
                    (d._act || c >= d._start) && d._ts && b !== d) {
                        if (d.parent !== this)
                            return this.render(r, s, o);
                        if (d.render(d._ts > 0 ? (c - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (c - d._start) * d._ts, s, o),
                        c !== this._time || !this._ts && !v) {
                            b = 0,
                            g && (u += this._zTime = -Y);
                            break
                        }
                    }
                    d = g
                }
            else {
                d = this._last;
                for (var E = r < 0 ? r : c; d; ) {
                    if (g = d._prev,
                    (d._act || E <= d._end) && d._ts && b !== d) {
                        if (d.parent !== this)
                            return this.render(r, s, o);
                        if (d.render(d._ts > 0 ? (E - d._start) * d._ts : (d._dirty ? d.totalDuration() : d._tDur) + (E - d._start) * d._ts, s, o),
                        c !== this._time || !this._ts && !v) {
                            b = 0,
                            g && (u += this._zTime = E ? -Y : Y);
                            break
                        }
                    }
                    d = g
                }
            }
            if (b && !s && (this.pause(),
            b.render(c >= a ? 0 : -Y)._zTime = c >= a ? 1 : -1,
            this._ts))
                return this._start = _,
                on(this),
                this.render(r, s, o);
            this._onUpdate && !s && Ke(this, "onUpdate", !0),
            (u === l && l >= this.totalDuration() || !u && a) && (_ === this._start || Math.abs(y) !== Math.abs(this._ts)) && (this._lock || ((r || !f) && (u === l && this._ts > 0 || !u && this._ts < 0) && bt(this, 1),
            !s && !(r < 0 && !a) && (u || a || !l) && (Ke(this, u === l && r >= 0 ? "onComplete" : "onReverseComplete", !0),
            this._prom && !(u < l && this.timeScale() > 0) && this._prom())))
        }
        return this
    }
    ,
    t.add = function(r, s) {
        var o = this;
        if (St(s) || (s = We(this, s, r)),
        !(r instanceof nr)) {
            if (ye(r))
                return r.forEach(function(a) {
                    return o.add(a, s)
                }),
                this;
            if (ce(r))
                return this.addLabel(r, s);
            if (ue(r))
                r = fe.delayedCall(0, r);
            else
                return this
        }
        return this !== r ? ft(this, r, s) : this
    }
    ,
    t.getChildren = function(r, s, o, a) {
        r === void 0 && (r = !0),
        s === void 0 && (s = !0),
        o === void 0 && (o = !0),
        a === void 0 && (a = -qe);
        for (var l = [], f = this._first; f; )
            f._start >= a && (f instanceof fe ? s && l.push(f) : (o && l.push(f),
            r && l.push.apply(l, f.getChildren(!0, s, o)))),
            f = f._next;
        return l
    }
    ,
    t.getById = function(r) {
        for (var s = this.getChildren(1, 1, 1), o = s.length; o--; )
            if (s[o].vars.id === r)
                return s[o]
    }
    ,
    t.remove = function(r) {
        return ce(r) ? this.removeLabel(r) : ue(r) ? this.killTweensOf(r) : (sn(this, r),
        r === this._recent && (this._recent = this._last),
        Jt(this))
    }
    ,
    t.totalTime = function(r, s) {
        return arguments.length ? (this._forcing = 1,
        !this._dp && this._ts && (this._start = ve(Xe.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))),
        n.prototype.totalTime.call(this, r, s),
        this._forcing = 0,
        this) : this._tTime
    }
    ,
    t.addLabel = function(r, s) {
        return this.labels[r] = We(this, s),
        this
    }
    ,
    t.removeLabel = function(r) {
        return delete this.labels[r],
        this
    }
    ,
    t.addPause = function(r, s, o) {
        var a = fe.delayedCall(0, s || ir, o);
        return a.data = "isPause",
        this._hasPause = 1,
        ft(this, a, We(this, r))
    }
    ,
    t.removePause = function(r) {
        var s = this._first;
        for (r = We(this, r); s; )
            s._start === r && s.data === "isPause" && bt(s),
            s = s._next
    }
    ,
    t.killTweensOf = function(r, s, o) {
        for (var a = this.getTweensOf(r, o), l = a.length; l--; )
            kt !== a[l] && a[l].kill(r, s);
        return this
    }
    ,
    t.getTweensOf = function(r, s) {
        for (var o = [], a = Ue(r), l = this._first, f = St(s), u; l; )
            l instanceof fe ? Al(l._targets, a) && (f ? (!kt || l._initted && l._ts) && l.globalTime(0) <= s && l.globalTime(l.totalDuration()) > s : !s || l.isActive()) && o.push(l) : (u = l.getTweensOf(a, s)).length && o.push.apply(o, u),
            l = l._next;
        return o
    }
    ,
    t.tweenTo = function(r, s) {
        s = s || {};
        var o = this, a = We(o, r), l = s, f = l.startAt, u = l.onStart, p = l.onStartParams, c = l.immediateRender, d, g = fe.to(o, Ze({
            ease: s.ease || "none",
            lazy: !1,
            immediateRender: !1,
            time: a,
            overwrite: "auto",
            duration: s.duration || Math.abs((a - (f && "time"in f ? f.time : o._time)) / o.timeScale()) || Y,
            onStart: function() {
                if (o.pause(),
                !d) {
                    var m = s.duration || Math.abs((a - (f && "time"in f ? f.time : o._time)) / o.timeScale());
                    g._dur !== m && Mi(g, m, 0, 1).render(g._time, !0, !0),
                    d = 1
                }
                u && u.apply(g, p || [])
            }
        }, s));
        return c ? g.render(0) : g
    }
    ,
    t.tweenFromTo = function(r, s, o) {
        return this.tweenTo(s, Ze({
            startAt: {
                time: We(this, r)
            }
        }, o))
    }
    ,
    t.recent = function() {
        return this._recent
    }
    ,
    t.nextLabel = function(r) {
        return r === void 0 && (r = this._time),
        Gs(this, We(this, r))
    }
    ,
    t.previousLabel = function(r) {
        return r === void 0 && (r = this._time),
        Gs(this, We(this, r), 1)
    }
    ,
    t.currentLabel = function(r) {
        return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + Y)
    }
    ,
    t.shiftChildren = function(r, s, o) {
        o === void 0 && (o = 0);
        for (var a = this._first, l = this.labels, f; a; )
            a._start >= o && (a._start += r,
            a._end += r),
            a = a._next;
        if (s)
            for (f in l)
                l[f] >= o && (l[f] += r);
        return Jt(this)
    }
    ,
    t.invalidate = function() {
        var r = this._first;
        for (this._lock = 0; r; )
            r.invalidate(),
            r = r._next;
        return n.prototype.invalidate.call(this)
    }
    ,
    t.clear = function(r) {
        r === void 0 && (r = !0);
        for (var s = this._first, o; s; )
            o = s._next,
            this.remove(s),
            s = o;
        return this._dp && (this._time = this._tTime = this._pTime = 0),
        r && (this.labels = {}),
        Jt(this)
    }
    ,
    t.totalDuration = function(r) {
        var s = 0, o = this, a = o._last, l = qe, f, u, p;
        if (arguments.length)
            return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -r : r));
        if (o._dirty) {
            for (p = o.parent; a; )
                f = a._prev,
                a._dirty && a.totalDuration(),
                u = a._start,
                u > l && o._sort && a._ts && !o._lock ? (o._lock = 1,
                ft(o, a, u - a._delay, 1)._lock = 0) : l = u,
                u < 0 && a._ts && (s -= u,
                (!p && !o._dp || p && p.smoothChildTiming) && (o._start += u / o._ts,
                o._time -= u,
                o._tTime -= u),
                o.shiftChildren(-u, !1, -1 / 0),
                l = 0),
                a._end > s && a._ts && (s = a._end),
                a = f;
            Mi(o, o === K && o._time > s ? o._time : s, 1, 1),
            o._dirty = 0
        }
        return o._tDur
    }
    ,
    e.updateRoot = function(r) {
        if (K._ts && (Xo(K, Hr(r, K)),
        jo = Xe.frame),
        Xe.frame >= Fs) {
            Fs += Be.autoSleep || 120;
            var s = K._first;
            if ((!s || !s._ts) && Be.autoSleep && Xe._listeners.length < 2) {
                for (; s && !s._ts; )
                    s = s._next;
                s || Xe.sleep()
            }
        }
    }
    ,
    e
}(nr);
Ze(Le.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var sf = function(e, t, i, r, s, o, a) {
    var l = new De(this._pt,e,t,0,1,va,null,s), f = 0, u = 0, p, c, d, g, h, m, v, b;
    for (l.b = i,
    l.e = r,
    i += "",
    r += "",
    (v = ~r.indexOf("random(")) && (r = rr(r)),
    o && (b = [i, r],
    o(b, e, t),
    i = b[0],
    r = b[1]),
    c = i.match(bn) || []; p = bn.exec(r); )
        g = p[0],
        h = r.substring(f, p.index),
        d ? d = (d + 1) % 5 : h.substr(-5) === "rgba(" && (d = 1),
        g !== c[u++] && (m = parseFloat(c[u - 1]) || 0,
        l._pt = {
            _next: l._pt,
            p: h || u === 1 ? h : ",",
            s: m,
            c: g.charAt(1) === "=" ? parseFloat(g.substr(2)) * (g.charAt(0) === "-" ? -1 : 1) : parseFloat(g) - m,
            m: d && d < 4 ? Math.round : 0
        },
        f = bn.lastIndex);
    return l.c = f < r.length ? r.substring(f, r.length) : "",
    l.fp = a,
    (Bo.test(r) || v) && (l.e = 0),
    this._pt = l,
    l
}, vs = function(e, t, i, r, s, o, a, l, f) {
    ue(r) && (r = r(s || 0, e, o));
    var u = e[t], p = i !== "get" ? i : ue(u) ? f ? e[t.indexOf("set") || !ue(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](f) : e[t]() : u, c = ue(u) ? f ? uf : ma : ys, d;
    if (ce(r) && (~r.indexOf("random(") && (r = rr(r)),
    r.charAt(1) === "=" && (d = parseFloat(p) + parseFloat(r.substr(2)) * (r.charAt(0) === "-" ? -1 : 1) + (Me(p) || 0),
    (d || d === 0) && (r = d))),
    p !== r)
        return !isNaN(p * r) && r !== "" ? (d = new De(this._pt,e,t,+p || 0,r - (p || 0),typeof u == "boolean" ? df : _a,0,c),
        f && (d.fp = f),
        a && d.modifier(a, this, e),
        this._pt = d) : (!u && !(t in e) && hs(t, r),
        sf.call(this, e, t, p, r, c, l || Be.stringFilter, f))
}, of = function(e, t, i, r, s) {
    if (ue(e) && (e = er(e, s, t, i, r)),
    !Ct(e) || e.style && e.nodeType || ye(e) || Ro(e))
        return ce(e) ? er(e, s, t, i, r) : e;
    var o = {}, a;
    for (a in e)
        o[a] = er(e[a], s, t, i, r);
    return o
}, pa = function(e, t, i, r, s, o) {
    var a, l, f, u;
    if (Re[e] && (a = new Re[e]).init(s, a.rawVars ? t[e] : of(t[e], r, s, o, i), i, r, o) !== !1 && (i._pt = l = new De(i._pt,s,e,0,1,a.render,a,0,a.priority),
    i !== mi))
        for (f = i._ptLookup[i._targets.indexOf(s)],
        u = a._props.length; u--; )
            f[a._props[u]] = l;
    return a
}, kt, af = function n(e, t) {
    var i = e.vars, r = i.ease, s = i.startAt, o = i.immediateRender, a = i.lazy, l = i.onUpdate, f = i.onUpdateParams, u = i.callbackScope, p = i.runBackwards, c = i.yoyoEase, d = i.keyframes, g = i.autoRevert, h = e._dur, m = e._startAt, v = e._targets, b = e.parent, y = b && b.data === "nested" ? b.parent._targets : v, _ = e._overwrite === "auto" && !cs, T = e.timeline, x, w, C, P, E, O, k, D, z, F, V, te, Pe;
    if (T && (!d || !r) && (r = "none"),
    e._ease = ei(r, Pi.ease),
    e._yEase = c ? fa(ei(c === !0 ? r : c, Pi.ease)) : 0,
    c && e._yoyo && !e._repeat && (c = e._yEase,
    e._yEase = e._ease,
    e._ease = c),
    e._from = !T && !!i.runBackwards,
    !T || d && !i.stagger) {
        if (D = v[0] ? Qt(v[0]).harness : 0,
        te = D && i[D.prop],
        x = Xr(i, gs),
        m && bt(m.render(-1, !0)),
        s)
            if (bt(e._startAt = fe.set(v, Ze({
                data: "isStart",
                overwrite: !1,
                parent: b,
                immediateRender: !0,
                lazy: Ae(a),
                startAt: null,
                delay: 0,
                onUpdate: l,
                onUpdateParams: f,
                callbackScope: u,
                stagger: 0
            }, s))),
            t < 0 && !o && !g && e._startAt.render(-1, !0),
            o) {
                if (t > 0 && !g && (e._startAt = 0),
                h && t <= 0) {
                    t && (e._zTime = t);
                    return
                }
            } else
                g === !1 && (e._startAt = 0);
        else if (p && h) {
            if (m)
                !g && (e._startAt = 0);
            else if (t && (o = !1),
            C = Ze({
                overwrite: !1,
                data: "isFromStart",
                lazy: o && Ae(a),
                immediateRender: o,
                stagger: 0,
                parent: b
            }, x),
            te && (C[D.prop] = te),
            bt(e._startAt = fe.set(v, C)),
            t < 0 && e._startAt.render(-1, !0),
            e._zTime = t,
            !o)
                n(e._startAt, Y);
            else if (!t)
                return
        }
        for (e._pt = 0,
        a = h && Ae(a) || a && !h,
        w = 0; w < v.length; w++) {
            if (E = v[w],
            k = E._gsap || _s(v)[w]._gsap,
            e._ptLookup[w] = F = {},
            Kn[k.id] && Dt.length && Yr(),
            V = y === v ? w : y.indexOf(E),
            D && (z = new D).init(E, te || x, e, V, y) !== !1 && (e._pt = P = new De(e._pt,E,z.name,0,1,z.render,z,0,z.priority),
            z._props.forEach(function(ze) {
                F[ze] = P
            }),
            z.priority && (O = 1)),
            !D || te)
                for (C in x)
                    Re[C] && (z = pa(C, x, e, V, E, y)) ? z.priority && (O = 1) : F[C] = P = vs.call(e, E, C, "get", x[C], V, y, 0, i.stringFilter);
            e._op && e._op[w] && e.kill(E, e._op[w]),
            _ && e._pt && (kt = e,
            K.killTweensOf(E, F, e.globalTime(t)),
            Pe = !e.parent,
            kt = 0),
            e._pt && a && (Kn[k.id] = 1)
        }
        O && ya(e),
        e._onInit && e._onInit(e)
    }
    e._onUpdate = l,
    e._initted = (!e._op || e._pt) && !Pe,
    d && t <= 0 && T.render(qe, !0, !0)
}, lf = function(e, t) {
    var i = e[0] ? Qt(e[0]).harness : 0, r = i && i.aliases, s, o, a, l;
    if (!r)
        return t;
    s = ki({}, t);
    for (o in r)
        if (o in s)
            for (l = r[o].split(","),
            a = l.length; a--; )
                s[l[a]] = s[o];
    return s
}, ff = function(e, t, i, r) {
    var s = t.ease || r || "power1.inOut", o, a;
    if (ye(t))
        a = i[e] || (i[e] = []),
        t.forEach(function(l, f) {
            return a.push({
                t: f / (t.length - 1) * 100,
                v: l,
                e: s
            })
        });
    else
        for (o in t)
            a = i[o] || (i[o] = []),
            o === "ease" || a.push({
                t: parseFloat(e),
                v: t[o],
                e: s
            })
}, er = function(e, t, i, r, s) {
    return ue(e) ? e.call(t, i, r, s) : ce(e) && ~e.indexOf("random(") ? rr(e) : e
}, ha = ms + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase", ga = {};
Ie(ha + ",id,stagger,delay,duration,paused,scrollTrigger", function(n) {
    return ga[n] = 1
});
var fe = function(n) {
    Do(e, n);
    function e(i, r, s, o) {
        var a;
        typeof r == "number" && (s.duration = r,
        r = s,
        s = null),
        a = n.call(this, o ? r : Qi(r)) || this;
        var l = a.vars, f = l.duration, u = l.delay, p = l.immediateRender, c = l.stagger, d = l.overwrite, g = l.keyframes, h = l.defaults, m = l.scrollTrigger, v = l.yoyoEase, b = r.parent || K, y = (ye(i) || Ro(i) ? St(i[0]) : "length"in r) ? [i] : Ue(i), _, T, x, w, C, P, E, O;
        if (a._targets = y.length ? _s(y) : jr("GSAP target " + i + " not found. https://greensock.com", !Be.nullTargetWarn) || [],
        a._ptLookup = [],
        a._overwrite = d,
        g || c || br(f) || br(u)) {
            if (r = a.vars,
            _ = a.timeline = new Le({
                data: "nested",
                defaults: h || {}
            }),
            _.kill(),
            _.parent = _._dp = _t(a),
            _._start = 0,
            c || br(f) || br(u)) {
                if (w = y.length,
                E = c && ta(c),
                Ct(c))
                    for (C in c)
                        ~ha.indexOf(C) && (O || (O = {}),
                        O[C] = c[C]);
                for (T = 0; T < w; T++)
                    x = Xr(r, ga),
                    x.stagger = 0,
                    v && (x.yoyoEase = v),
                    O && ki(x, O),
                    P = y[T],
                    x.duration = +er(f, _t(a), T, P, y),
                    x.delay = (+er(u, _t(a), T, P, y) || 0) - a._delay,
                    !c && w === 1 && x.delay && (a._delay = u = x.delay,
                    a._start += u,
                    x.delay = 0),
                    _.to(P, x, E ? E(T, P, y) : 0),
                    _._ease = R.none;
                _.duration() ? f = u = 0 : a.timeline = 0
            } else if (g) {
                Qi(Ze(_.vars.defaults, {
                    ease: "none"
                })),
                _._ease = ei(g.ease || r.ease || "none");
                var k = 0, D, z, F;
                if (ye(g))
                    g.forEach(function(V) {
                        return _.to(y, V, ">")
                    });
                else {
                    x = {};
                    for (C in g)
                        C === "ease" || C === "easeEach" || ff(C, g[C], x, g.easeEach);
                    for (C in x)
                        for (D = x[C].sort(function(V, te) {
                            return V.t - te.t
                        }),
                        k = 0,
                        T = 0; T < D.length; T++)
                            z = D[T],
                            F = {
                                ease: z.e,
                                duration: (z.t - (T ? D[T - 1].t : 0)) / 100 * f
                            },
                            F[C] = z.v,
                            _.to(y, F, k),
                            k += F.duration;
                    _.duration() < f && _.to({}, {
                        duration: f - _.duration()
                    })
                }
            }
            f || a.duration(f = _.duration())
        } else
            a.timeline = 0;
        return d === !0 && !cs && (kt = _t(a),
        K.killTweensOf(y),
        kt = 0),
        ft(b, _t(a), s),
        r.reversed && a.reverse(),
        r.paused && a.paused(!0),
        (p || !f && !g && a._start === ve(b._time) && Ae(p) && Rl(_t(a)) && b.data !== "nested") && (a._tTime = -Y,
        a.render(Math.max(0, -u))),
        m && Zo(_t(a), m),
        a
    }
    var t = e.prototype;
    return t.render = function(r, s, o) {
        var a = this._time, l = this._tDur, f = this._dur, u = r > l - Y && r >= 0 ? l : r < Y ? 0 : r, p, c, d, g, h, m, v, b, y;
        if (!f)
            Bl(this, r, s, o);
        else if (u !== this._tTime || !r || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 != r < 0) {
            if (p = u,
            b = this.timeline,
            this._repeat) {
                if (g = f + this._rDelay,
                this._repeat < -1 && r < 0)
                    return this.totalTime(g * 100 + r, s, o);
                if (p = ve(u % g),
                u === l ? (d = this._repeat,
                p = f) : (d = ~~(u / g),
                d && d === u / g && (p = f,
                d--),
                p > f && (p = f)),
                m = this._yoyo && d & 1,
                m && (y = this._yEase,
                p = f - p),
                h = Oi(this._tTime, g),
                p === a && !o && this._initted)
                    return this;
                d !== h && (b && this._yEase && ua(b, m),
                this.vars.repeatRefresh && !m && !this._lock && (this._lock = o = 1,
                this.render(ve(g * d), !0).invalidate()._lock = 0))
            }
            if (!this._initted) {
                if (Qo(this, r < 0 ? r : p, o, s))
                    return this._tTime = 0,
                    this;
                if (f !== this._dur)
                    return this.render(r, s, o)
            }
            if (this._tTime = u,
            this._time = p,
            !this._act && this._ts && (this._act = 1,
            this._lazy = 0),
            this.ratio = v = (y || this._ease)(p / f),
            this._from && (this.ratio = v = 1 - v),
            p && !a && !s && (Ke(this, "onStart"),
            this._tTime !== u))
                return this;
            for (c = this._pt; c; )
                c.r(v, c.d),
                c = c._next;
            b && b.render(r < 0 ? r : !p && m ? -Y : b._dur * b._ease(p / this._dur), s, o) || this._startAt && (this._zTime = r),
            this._onUpdate && !s && (r < 0 && this._startAt && this._startAt.render(r, !0, o),
            Ke(this, "onUpdate")),
            this._repeat && d !== h && this.vars.onRepeat && !s && this.parent && Ke(this, "onRepeat"),
            (u === this._tDur || !u) && this._tTime === u && (r < 0 && this._startAt && !this._onUpdate && this._startAt.render(r, !0, !0),
            (r || !f) && (u === this._tDur && this._ts > 0 || !u && this._ts < 0) && bt(this, 1),
            !s && !(r < 0 && !a) && (u || a) && (Ke(this, u === l ? "onComplete" : "onReverseComplete", !0),
            this._prom && !(u < l && this.timeScale() > 0) && this._prom()))
        }
        return this
    }
    ,
    t.targets = function() {
        return this._targets
    }
    ,
    t.invalidate = function() {
        return this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0,
        this._ptLookup = [],
        this.timeline && this.timeline.invalidate(),
        n.prototype.invalidate.call(this)
    }
    ,
    t.kill = function(r, s) {
        if (s === void 0 && (s = "all"),
        !r && (!s || s === "all"))
            return this._lazy = this._pt = 0,
            this.parent ? Yi(this) : this;
        if (this.timeline) {
            var o = this.timeline.totalDuration();
            return this.timeline.killTweensOf(r, s, kt && kt.vars.overwrite !== !0)._first || Yi(this),
            this.parent && o !== this.timeline.totalDuration() && Mi(this, this._dur * this.timeline._tDur / o, 0, 1),
            this
        }
        var a = this._targets, l = r ? Ue(r) : a, f = this._ptLookup, u = this._pt, p, c, d, g, h, m, v;
        if ((!s || s === "all") && Dl(a, l))
            return s === "all" && (this._pt = 0),
            Yi(this);
        for (p = this._op = this._op || [],
        s !== "all" && (ce(s) && (h = {},
        Ie(s, function(b) {
            return h[b] = 1
        }),
        s = h),
        s = lf(a, s)),
        v = a.length; v--; )
            if (~l.indexOf(a[v])) {
                c = f[v],
                s === "all" ? (p[v] = s,
                g = c,
                d = {}) : (d = p[v] = p[v] || {},
                g = s);
                for (h in g)
                    m = c && c[h],
                    m && ((!("kill"in m.d) || m.d.kill(h) === !0) && sn(this, m, "_pt"),
                    delete c[h]),
                    d !== "all" && (d[h] = 1)
            }
        return this._initted && !this._pt && u && Yi(this),
        this
    }
    ,
    e.to = function(r, s) {
        return new e(r,s,arguments[2])
    }
    ,
    e.from = function(r, s) {
        return Ji(1, arguments)
    }
    ,
    e.delayedCall = function(r, s, o, a) {
        return new e(s,0,{
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: r,
            onComplete: s,
            onReverseComplete: s,
            onCompleteParams: o,
            onReverseCompleteParams: o,
            callbackScope: a
        })
    }
    ,
    e.fromTo = function(r, s, o) {
        return Ji(2, arguments)
    }
    ,
    e.set = function(r, s) {
        return s.duration = 0,
        s.repeatDelay || (s.repeat = 0),
        new e(r,s)
    }
    ,
    e.killTweensOf = function(r, s, o) {
        return K.killTweensOf(r, s, o)
    }
    ,
    e
}(nr);
Ze(fe.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
});
Ie("staggerTo,staggerFrom,staggerFromTo", function(n) {
    fe[n] = function() {
        var e = new Le
          , t = Qn.call(arguments, 0);
        return t.splice(n === "staggerFromTo" ? 5 : 4, 0, 0),
        e[n].apply(e, t)
    }
});
var ys = function(e, t, i) {
    return e[t] = i
}
  , ma = function(e, t, i) {
    return e[t](i)
}
  , uf = function(e, t, i, r) {
    return e[t](r.fp, i)
}
  , cf = function(e, t, i) {
    return e.setAttribute(t, i)
}
  , ws = function(e, t) {
    return ue(e[t]) ? ma : ds(e[t]) && e.setAttribute ? cf : ys
}
  , _a = function(e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t)
}
  , df = function(e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t)
}
  , va = function(e, t) {
    var i = t._pt
      , r = "";
    if (!e && t.b)
        r = t.b;
    else if (e === 1 && t.e)
        r = t.e;
    else {
        for (; i; )
            r = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round((i.s + i.c * e) * 1e4) / 1e4) + r,
            i = i._next;
        r += t.c
    }
    t.set(t.t, t.p, r, t)
}
  , bs = function(e, t) {
    for (var i = t._pt; i; )
        i.r(e, i.d),
        i = i._next
}
  , pf = function(e, t, i, r) {
    for (var s = this._pt, o; s; )
        o = s._next,
        s.p === r && s.modifier(e, t, i),
        s = o
}
  , hf = function(e) {
    for (var t = this._pt, i, r; t; )
        r = t._next,
        t.p === e && !t.op || t.op === e ? sn(this, t, "_pt") : t.dep || (i = 1),
        t = r;
    return !i
}
  , gf = function(e, t, i, r) {
    r.mSet(e, t, r.m.call(r.tween, i, r.mt), r)
}
  , ya = function(e) {
    for (var t = e._pt, i, r, s, o; t; ) {
        for (i = t._next,
        r = s; r && r.pr > t.pr; )
            r = r._next;
        (t._prev = r ? r._prev : o) ? t._prev._next = t : s = t,
        (t._next = r) ? r._prev = t : o = t,
        t = i
    }
    e._pt = s
}
  , De = function() {
    function n(t, i, r, s, o, a, l, f, u) {
        this.t = i,
        this.s = s,
        this.c = o,
        this.p = r,
        this.r = a || _a,
        this.d = l || this,
        this.set = f || ys,
        this.pr = u || 0,
        this._next = t,
        t && (t._prev = this)
    }
    var e = n.prototype;
    return e.modifier = function(i, r, s) {
        this.mSet = this.mSet || this.set,
        this.set = gf,
        this.m = i,
        this.mt = s,
        this.tween = r
    }
    ,
    n
}();
Ie(ms + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(n) {
    return gs[n] = 1
});
Ne.TweenMax = Ne.TweenLite = fe;
Ne.TimelineLite = Ne.TimelineMax = Le;
K = new Le({
    sortChildren: !1,
    defaults: Pi,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0
});
Be.stringFilter = la;
var Ur = {
    registerPlugin: function() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
        t.forEach(function(r) {
            return Zl(r)
        })
    },
    timeline: function(e) {
        return new Le(e)
    },
    getTweensOf: function(e, t) {
        return K.getTweensOf(e, t)
    },
    getProperty: function(e, t, i, r) {
        ce(e) && (e = Ue(e)[0]);
        var s = Qt(e || {}).get
          , o = i ? qo : Ho;
        return i === "native" && (i = ""),
        e && (t ? o((Re[t] && Re[t].get || s)(e, t, i, r)) : function(a, l, f) {
            return o((Re[a] && Re[a].get || s)(e, a, l, f))
        }
        )
    },
    quickSetter: function(e, t, i) {
        if (e = Ue(e),
        e.length > 1) {
            var r = e.map(function(u) {
                return dt.quickSetter(u, t, i)
            })
              , s = r.length;
            return function(u) {
                for (var p = s; p--; )
                    r[p](u)
            }
        }
        e = e[0] || {};
        var o = Re[t]
          , a = Qt(e)
          , l = a.harness && (a.harness.aliases || {})[t] || t
          , f = o ? function(u) {
            var p = new o;
            mi._pt = 0,
            p.init(e, i ? u + i : u, mi, 0, [e]),
            p.render(1, p),
            mi._pt && bs(1, mi)
        }
        : a.set(e, l);
        return o ? f : function(u) {
            return f(e, l, i ? u + i : u, a, 1)
        }
    },
    isTweening: function(e) {
        return K.getTweensOf(e, !0).length > 0
    },
    defaults: function(e) {
        return e && e.ease && (e.ease = ei(e.ease, Pi.ease)),
        Bs(Pi, e || {})
    },
    config: function(e) {
        return Bs(Be, e || {})
    },
    registerEffect: function(e) {
        var t = e.name
          , i = e.effect
          , r = e.plugins
          , s = e.defaults
          , o = e.extendTimeline;
        (r || "").split(",").forEach(function(a) {
            return a && !Re[a] && !Ne[a] && jr(t + " effect requires " + a + " plugin.")
        }),
        Tn[t] = function(a, l, f) {
            return i(Ue(a), Ze(l || {}, s), f)
        }
        ,
        o && (Le.prototype[t] = function(a, l, f) {
            return this.add(Tn[t](a, Ct(l) ? l : (f = l) && {}, this), f)
        }
        )
    },
    registerEase: function(e, t) {
        R[e] = ei(t)
    },
    parseEase: function(e, t) {
        return arguments.length ? ei(e, t) : R
    },
    getById: function(e) {
        return K.getById(e)
    },
    exportRoot: function(e, t) {
        e === void 0 && (e = {});
        var i = new Le(e), r, s;
        for (i.smoothChildTiming = Ae(e.smoothChildTiming),
        K.remove(i),
        i._dp = 0,
        i._time = i._tTime = K._time,
        r = K._first; r; )
            s = r._next,
            (t || !(!r._dur && r instanceof fe && r.vars.onComplete === r._targets[0])) && ft(i, r, r._start - r._delay),
            r = s;
        return ft(K, i, 0),
        i
    },
    utils: {
        wrap: ql,
        wrapYoyo: Ul,
        distribute: ta,
        random: ra,
        snap: ia,
        normalize: Hl,
        getUnit: Me,
        clamp: Gl,
        splitColor: oa,
        toArray: Ue,
        selector: jl,
        mapRange: sa,
        pipe: Yl,
        unitize: Xl,
        interpolate: Kl,
        shuffle: ea
    },
    install: Go,
    effects: Tn,
    ticker: Xe,
    updateRoot: Le.updateRoot,
    plugins: Re,
    globalTimeline: K,
    core: {
        PropTween: De,
        globals: Wo,
        Tween: fe,
        Timeline: Le,
        Animation: nr,
        getCache: Qt,
        _removeLinkedListItem: sn,
        suppressOverwrites: function(e) {
            return cs = e
        }
    }
};
Ie("to,from,fromTo,delayedCall,set,killTweensOf", function(n) {
    return Ur[n] = fe[n]
});
Xe.add(Le.updateRoot);
mi = Ur.to({}, {
    duration: 0
});
var mf = function(e, t) {
    for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; )
        i = i._next;
    return i
}
  , _f = function(e, t) {
    var i = e._targets, r, s, o;
    for (r in t)
        for (s = i.length; s--; )
            o = e._ptLookup[s][r],
            o && (o = o.d) && (o._pt && (o = mf(o, r)),
            o && o.modifier && o.modifier(t[r], e, i[s], r))
}
  , En = function(e, t) {
    return {
        name: e,
        rawVars: 1,
        init: function(r, s, o) {
            o._onInit = function(a) {
                var l, f;
                if (ce(s) && (l = {},
                Ie(s, function(u) {
                    return l[u] = 1
                }),
                s = l),
                t) {
                    l = {};
                    for (f in s)
                        l[f] = t(s[f]);
                    s = l
                }
                _f(a, s)
            }
        }
    }
}
  , dt = Ur.registerPlugin({
    name: "attr",
    init: function(e, t, i, r, s) {
        var o, a;
        for (o in t)
            a = this.add(e, "setAttribute", (e.getAttribute(o) || 0) + "", t[o], r, s, 0, 0, o),
            a && (a.op = o),
            this._props.push(o)
    }
}, {
    name: "endArray",
    init: function(e, t) {
        for (var i = t.length; i--; )
            this.add(e, i, e[i] || 0, t[i])
    }
}, En("roundProps", Jn), En("modifiers"), En("snap", ia)) || Ur;
fe.version = Le.version = dt.version = "3.9.1";
Vo = 1;
$o() && Li();
R.Power0;
R.Power1;
R.Power2;
R.Power3;
R.Power4;
R.Linear;
R.Quad;
R.Cubic;
R.Quart;
R.Quint;
R.Strong;
R.Elastic;
R.Back;
R.SteppedEase;
R.Bounce;
R.Sine;
R.Expo;
R.Circ;
/*!
 * CSSPlugin 3.9.1
 * https://greensock.com
 *
 * Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var js, Ot, vi, Ts, Kt, Ys, vf = function() {
    return typeof window != "undefined"
}, Bt = {}, qt = 180 / Math.PI, yi = Math.PI / 180, ci = Math.atan2, Xs = 1e8, wa = /([A-Z])/g, yf = /(?:left|right|width|margin|padding|x)/i, wf = /[\s,\(]\S/, Mt = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
}, ba = function(e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
}, bf = function(e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
}, Tf = function(e, t) {
    return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t)
}, xf = function(e, t) {
    var i = t.s + t.c * e;
    t.set(t.t, t.p, ~~(i + (i < 0 ? -.5 : .5)) + t.u, t)
}, Ta = function(e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t)
}, xa = function(e, t) {
    return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t)
}, Sf = function(e, t, i) {
    return e.style[t] = i
}, Cf = function(e, t, i) {
    return e.style.setProperty(t, i)
}, Ef = function(e, t, i) {
    return e._gsap[t] = i
}, Pf = function(e, t, i) {
    return e._gsap.scaleX = e._gsap.scaleY = i
}, kf = function(e, t, i, r, s) {
    var o = e._gsap;
    o.scaleX = o.scaleY = i,
    o.renderTransform(s, o)
}, Of = function(e, t, i, r, s) {
    var o = e._gsap;
    o[t] = i,
    o.renderTransform(s, o)
}, he = "transform", Nt = he + "Origin", Sa, es = function(e, t) {
    var i = Ot.createElementNS ? Ot.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Ot.createElement(e);
    return i.style ? i : Ot.createElement(e)
}, Tt = function n(e, t, i) {
    var r = getComputedStyle(e);
    return r[t] || r.getPropertyValue(t.replace(wa, "-$1").toLowerCase()) || r.getPropertyValue(t) || !i && n(e, Ai(t) || t, 1) || ""
}, Hs = "O,Moz,ms,Ms,Webkit".split(","), Ai = function(e, t, i) {
    var r = t || Kt
      , s = r.style
      , o = 5;
    if (e in s && !i)
        return e;
    for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(Hs[o] + e in s); )
        ;
    return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Hs[o] : "") + e
}, ts = function() {
    vf() && window.document && (js = window,
    Ot = js.document,
    vi = Ot.documentElement,
    Kt = es("div") || {
        style: {}
    },
    es("div"),
    he = Ai(he),
    Nt = he + "Origin",
    Kt.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0",
    Sa = !!Ai("perspective"),
    Ts = 1)
}, Pn = function n(e) {
    var t = es("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), i = this.parentNode, r = this.nextSibling, s = this.style.cssText, o;
    if (vi.appendChild(t),
    t.appendChild(this),
    this.style.display = "block",
    e)
        try {
            o = this.getBBox(),
            this._gsapBBox = this.getBBox,
            this.getBBox = n
        } catch {}
    else
        this._gsapBBox && (o = this._gsapBBox());
    return i && (r ? i.insertBefore(this, r) : i.appendChild(this)),
    vi.removeChild(t),
    this.style.cssText = s,
    o
}, qs = function(e, t) {
    for (var i = t.length; i--; )
        if (e.hasAttribute(t[i]))
            return e.getAttribute(t[i])
}, Ca = function(e) {
    var t;
    try {
        t = e.getBBox()
    } catch {
        t = Pn.call(e, !0)
    }
    return t && (t.width || t.height) || e.getBBox === Pn || (t = Pn.call(e, !0)),
    t && !t.width && !t.x && !t.y ? {
        x: +qs(e, ["x", "cx", "x1"]) || 0,
        y: +qs(e, ["y", "cy", "y1"]) || 0,
        width: 0,
        height: 0
    } : t
}, Ea = function(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && Ca(e))
}, sr = function(e, t) {
    if (t) {
        var i = e.style;
        t in Bt && t !== Nt && (t = he),
        i.removeProperty ? ((t.substr(0, 2) === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t),
        i.removeProperty(t.replace(wa, "-$1").toLowerCase())) : i.removeAttribute(t)
    }
}, Lt = function(e, t, i, r, s, o) {
    var a = new De(e._pt,t,i,0,1,o ? xa : Ta);
    return e._pt = a,
    a.b = r,
    a.e = s,
    e._props.push(i),
    a
}, Us = {
    deg: 1,
    rad: 1,
    turn: 1
}, Vt = function n(e, t, i, r) {
    var s = parseFloat(i) || 0, o = (i + "").trim().substr((s + "").length) || "px", a = Kt.style, l = yf.test(t), f = e.tagName.toLowerCase() === "svg", u = (f ? "client" : "offset") + (l ? "Width" : "Height"), p = 100, c = r === "px", d = r === "%", g, h, m, v;
    return r === o || !s || Us[r] || Us[o] ? s : (o !== "px" && !c && (s = n(e, t, i, "px")),
    v = e.getCTM && Ea(e),
    (d || o === "%") && (Bt[t] || ~t.indexOf("adius")) ? (g = v ? e.getBBox()[l ? "width" : "height"] : e[u],
    re(d ? s / g * p : s / 100 * g)) : (a[l ? "width" : "height"] = p + (c ? o : r),
    h = ~t.indexOf("adius") || r === "em" && e.appendChild && !f ? e : e.parentNode,
    v && (h = (e.ownerSVGElement || {}).parentNode),
    (!h || h === Ot || !h.appendChild) && (h = Ot.body),
    m = h._gsap,
    m && d && m.width && l && m.time === Xe.time ? re(s / m.width * p) : ((d || o === "%") && (a.position = Tt(e, "position")),
    h === e && (a.position = "static"),
    h.appendChild(Kt),
    g = Kt[u],
    h.removeChild(Kt),
    a.position = "absolute",
    l && d && (m = Qt(h),
    m.time = Xe.time,
    m.width = h[u]),
    re(c ? g * s / p : g && s ? p / g * s : 0))))
}, Ut = function(e, t, i, r) {
    var s;
    return Ts || ts(),
    t in Mt && t !== "transform" && (t = Mt[t],
    ~t.indexOf(",") && (t = t.split(",")[0])),
    Bt[t] && t !== "transform" ? (s = ar(e, r),
    s = t !== "transformOrigin" ? s[t] : s.svg ? s.origin : Zr(Tt(e, Nt)) + " " + s.zOrigin + "px") : (s = e.style[t],
    (!s || s === "auto" || r || ~(s + "").indexOf("calc(")) && (s = Kr[t] && Kr[t](e, t, i) || Tt(e, t) || Yo(e, t) || (t === "opacity" ? 1 : 0))),
    i && !~(s + "").trim().indexOf(" ") ? Vt(e, t, s, i) + i : s
}, Mf = function(e, t, i, r) {
    if (!i || i === "none") {
        var s = Ai(t, e, 1)
          , o = s && Tt(e, s, 1);
        o && o !== i ? (t = s,
        i = o) : t === "borderColor" && (i = Tt(e, "borderTopColor"))
    }
    var a = new De(this._pt,e.style,t,0,1,va), l = 0, f = 0, u, p, c, d, g, h, m, v, b, y, _, T, x;
    if (a.b = i,
    a.e = r,
    i += "",
    r += "",
    r === "auto" && (e.style[t] = r,
    r = Tt(e, t) || r,
    e.style[t] = i),
    u = [i, r],
    la(u),
    i = u[0],
    r = u[1],
    c = i.match(gi) || [],
    x = r.match(gi) || [],
    x.length) {
        for (; p = gi.exec(r); )
            m = p[0],
            b = r.substring(l, p.index),
            g ? g = (g + 1) % 5 : (b.substr(-5) === "rgba(" || b.substr(-5) === "hsla(") && (g = 1),
            m !== (h = c[f++] || "") && (d = parseFloat(h) || 0,
            _ = h.substr((d + "").length),
            T = m.charAt(1) === "=" ? +(m.charAt(0) + "1") : 0,
            T && (m = m.substr(2)),
            v = parseFloat(m),
            y = m.substr((v + "").length),
            l = gi.lastIndex - y.length,
            y || (y = y || Be.units[t] || _,
            l === r.length && (r += y,
            a.e += y)),
            _ !== y && (d = Vt(e, t, h, y) || 0),
            a._pt = {
                _next: a._pt,
                p: b || f === 1 ? b : ",",
                s: d,
                c: T ? T * v : v - d,
                m: g && g < 4 || t === "zIndex" ? Math.round : 0
            });
        a.c = l < r.length ? r.substring(l, r.length) : ""
    } else
        a.r = t === "display" && r === "none" ? xa : Ta;
    return Bo.test(r) && (a.e = 0),
    this._pt = a,
    a
}, Ks = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
}, Lf = function(e) {
    var t = e.split(" ")
      , i = t[0]
      , r = t[1] || "50%";
    return (i === "top" || i === "bottom" || r === "left" || r === "right") && (e = i,
    i = r,
    r = e),
    t[0] = Ks[i] || i,
    t[1] = Ks[r] || r,
    t.join(" ")
}, Af = function(e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
        var i = t.t, r = i.style, s = t.u, o = i._gsap, a, l, f;
        if (s === "all" || s === !0)
            r.cssText = "",
            l = 1;
        else
            for (s = s.split(","),
            f = s.length; --f > -1; )
                a = s[f],
                Bt[a] && (l = 1,
                a = a === "transformOrigin" ? Nt : he),
                sr(i, a);
        l && (sr(i, he),
        o && (o.svg && i.removeAttribute("transform"),
        ar(i, 1),
        o.uncache = 1))
    }
}, Kr = {
    clearProps: function(e, t, i, r, s) {
        if (s.data !== "isFromStart") {
            var o = e._pt = new De(e._pt,t,i,0,0,Af);
            return o.u = r,
            o.pr = -10,
            o.tween = s,
            e._props.push(i),
            1
        }
    }
}, or = [1, 0, 0, 1, 0, 0], Pa = {}, ka = function(e) {
    return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e
}, Zs = function(e) {
    var t = Tt(e, he);
    return ka(t) ? or : t.substr(7).match(Fo).map(re)
}, xs = function(e, t) {
    var i = e._gsap || Qt(e), r = e.style, s = Zs(e), o, a, l, f;
    return i.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix,
    s = [l.a, l.b, l.c, l.d, l.e, l.f],
    s.join(",") === "1,0,0,1,0,0" ? or : s) : (s === or && !e.offsetParent && e !== vi && !i.svg && (l = r.display,
    r.display = "block",
    o = e.parentNode,
    (!o || !e.offsetParent) && (f = 1,
    a = e.nextSibling,
    vi.appendChild(e)),
    s = Zs(e),
    l ? r.display = l : sr(e, "display"),
    f && (a ? o.insertBefore(e, a) : o ? o.appendChild(e) : vi.removeChild(e))),
    t && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s)
}, is = function(e, t, i, r, s, o) {
    var a = e._gsap, l = s || xs(e, !0), f = a.xOrigin || 0, u = a.yOrigin || 0, p = a.xOffset || 0, c = a.yOffset || 0, d = l[0], g = l[1], h = l[2], m = l[3], v = l[4], b = l[5], y = t.split(" "), _ = parseFloat(y[0]) || 0, T = parseFloat(y[1]) || 0, x, w, C, P;
    i ? l !== or && (w = d * m - g * h) && (C = _ * (m / w) + T * (-h / w) + (h * b - m * v) / w,
    P = _ * (-g / w) + T * (d / w) - (d * b - g * v) / w,
    _ = C,
    T = P) : (x = Ca(e),
    _ = x.x + (~y[0].indexOf("%") ? _ / 100 * x.width : _),
    T = x.y + (~(y[1] || y[0]).indexOf("%") ? T / 100 * x.height : T)),
    r || r !== !1 && a.smooth ? (v = _ - f,
    b = T - u,
    a.xOffset = p + (v * d + b * h) - v,
    a.yOffset = c + (v * g + b * m) - b) : a.xOffset = a.yOffset = 0,
    a.xOrigin = _,
    a.yOrigin = T,
    a.smooth = !!r,
    a.origin = t,
    a.originIsAbsolute = !!i,
    e.style[Nt] = "0px 0px",
    o && (Lt(o, a, "xOrigin", f, _),
    Lt(o, a, "yOrigin", u, T),
    Lt(o, a, "xOffset", p, a.xOffset),
    Lt(o, a, "yOffset", c, a.yOffset)),
    e.setAttribute("data-svg-origin", _ + " " + T)
}, ar = function(e, t) {
    var i = e._gsap || new da(e);
    if ("x"in i && !t && !i.uncache)
        return i;
    var r = e.style, s = i.scaleX < 0, o = "px", a = "deg", l = Tt(e, Nt) || "0", f, u, p, c, d, g, h, m, v, b, y, _, T, x, w, C, P, E, O, k, D, z, F, V, te, Pe, ze, S, ke, si, Qe, Je;
    return f = u = p = g = h = m = v = b = y = 0,
    c = d = 1,
    i.svg = !!(e.getCTM && Ea(e)),
    x = xs(e, i.svg),
    i.svg && (V = (!i.uncache || l === "0px 0px") && !t && e.getAttribute("data-svg-origin"),
    is(e, V || l, !!V || i.originIsAbsolute, i.smooth !== !1, x)),
    _ = i.xOrigin || 0,
    T = i.yOrigin || 0,
    x !== or && (E = x[0],
    O = x[1],
    k = x[2],
    D = x[3],
    f = z = x[4],
    u = F = x[5],
    x.length === 6 ? (c = Math.sqrt(E * E + O * O),
    d = Math.sqrt(D * D + k * k),
    g = E || O ? ci(O, E) * qt : 0,
    v = k || D ? ci(k, D) * qt + g : 0,
    v && (d *= Math.abs(Math.cos(v * yi))),
    i.svg && (f -= _ - (_ * E + T * k),
    u -= T - (_ * O + T * D))) : (Je = x[6],
    si = x[7],
    ze = x[8],
    S = x[9],
    ke = x[10],
    Qe = x[11],
    f = x[12],
    u = x[13],
    p = x[14],
    w = ci(Je, ke),
    h = w * qt,
    w && (C = Math.cos(-w),
    P = Math.sin(-w),
    V = z * C + ze * P,
    te = F * C + S * P,
    Pe = Je * C + ke * P,
    ze = z * -P + ze * C,
    S = F * -P + S * C,
    ke = Je * -P + ke * C,
    Qe = si * -P + Qe * C,
    z = V,
    F = te,
    Je = Pe),
    w = ci(-k, ke),
    m = w * qt,
    w && (C = Math.cos(-w),
    P = Math.sin(-w),
    V = E * C - ze * P,
    te = O * C - S * P,
    Pe = k * C - ke * P,
    Qe = D * P + Qe * C,
    E = V,
    O = te,
    k = Pe),
    w = ci(O, E),
    g = w * qt,
    w && (C = Math.cos(w),
    P = Math.sin(w),
    V = E * C + O * P,
    te = z * C + F * P,
    O = O * C - E * P,
    F = F * C - z * P,
    E = V,
    z = te),
    h && Math.abs(h) + Math.abs(g) > 359.9 && (h = g = 0,
    m = 180 - m),
    c = re(Math.sqrt(E * E + O * O + k * k)),
    d = re(Math.sqrt(F * F + Je * Je)),
    w = ci(z, F),
    v = Math.abs(w) > 2e-4 ? w * qt : 0,
    y = Qe ? 1 / (Qe < 0 ? -Qe : Qe) : 0),
    i.svg && (V = e.getAttribute("transform"),
    i.forceCSS = e.setAttribute("transform", "") || !ka(Tt(e, he)),
    V && e.setAttribute("transform", V))),
    Math.abs(v) > 90 && Math.abs(v) < 270 && (s ? (c *= -1,
    v += g <= 0 ? 180 : -180,
    g += g <= 0 ? 180 : -180) : (d *= -1,
    v += v <= 0 ? 180 : -180)),
    i.x = f - ((i.xPercent = f && (i.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetWidth * i.xPercent / 100 : 0) + o,
    i.y = u - ((i.yPercent = u && (i.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetHeight * i.yPercent / 100 : 0) + o,
    i.z = p + o,
    i.scaleX = re(c),
    i.scaleY = re(d),
    i.rotation = re(g) + a,
    i.rotationX = re(h) + a,
    i.rotationY = re(m) + a,
    i.skewX = v + a,
    i.skewY = b + a,
    i.transformPerspective = y + o,
    (i.zOrigin = parseFloat(l.split(" ")[2]) || 0) && (r[Nt] = Zr(l)),
    i.xOffset = i.yOffset = 0,
    i.force3D = Be.force3D,
    i.renderTransform = i.svg ? Df : Sa ? Oa : If,
    i.uncache = 0,
    i
}, Zr = function(e) {
    return (e = e.split(" "))[0] + " " + e[1]
}, kn = function(e, t, i) {
    var r = Me(t);
    return re(parseFloat(t) + parseFloat(Vt(e, "x", i + "px", r))) + r
}, If = function(e, t) {
    t.z = "0px",
    t.rotationY = t.rotationX = "0deg",
    t.force3D = 0,
    Oa(e, t)
}, Yt = "0deg", Gi = "0px", Xt = ") ", Oa = function(e, t) {
    var i = t || this
      , r = i.xPercent
      , s = i.yPercent
      , o = i.x
      , a = i.y
      , l = i.z
      , f = i.rotation
      , u = i.rotationY
      , p = i.rotationX
      , c = i.skewX
      , d = i.skewY
      , g = i.scaleX
      , h = i.scaleY
      , m = i.transformPerspective
      , v = i.force3D
      , b = i.target
      , y = i.zOrigin
      , _ = ""
      , T = v === "auto" && e && e !== 1 || v === !0;
    if (y && (p !== Yt || u !== Yt)) {
        var x = parseFloat(u) * yi, w = Math.sin(x), C = Math.cos(x), P;
        x = parseFloat(p) * yi,
        P = Math.cos(x),
        o = kn(b, o, w * P * -y),
        a = kn(b, a, -Math.sin(x) * -y),
        l = kn(b, l, C * P * -y + y)
    }
    m !== Gi && (_ += "perspective(" + m + Xt),
    (r || s) && (_ += "translate(" + r + "%, " + s + "%) "),
    (T || o !== Gi || a !== Gi || l !== Gi) && (_ += l !== Gi || T ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + Xt),
    f !== Yt && (_ += "rotate(" + f + Xt),
    u !== Yt && (_ += "rotateY(" + u + Xt),
    p !== Yt && (_ += "rotateX(" + p + Xt),
    (c !== Yt || d !== Yt) && (_ += "skew(" + c + ", " + d + Xt),
    (g !== 1 || h !== 1) && (_ += "scale(" + g + ", " + h + Xt),
    b.style[he] = _ || "translate(0, 0)"
}, Df = function(e, t) {
    var i = t || this, r = i.xPercent, s = i.yPercent, o = i.x, a = i.y, l = i.rotation, f = i.skewX, u = i.skewY, p = i.scaleX, c = i.scaleY, d = i.target, g = i.xOrigin, h = i.yOrigin, m = i.xOffset, v = i.yOffset, b = i.forceCSS, y = parseFloat(o), _ = parseFloat(a), T, x, w, C, P;
    l = parseFloat(l),
    f = parseFloat(f),
    u = parseFloat(u),
    u && (u = parseFloat(u),
    f += u,
    l += u),
    l || f ? (l *= yi,
    f *= yi,
    T = Math.cos(l) * p,
    x = Math.sin(l) * p,
    w = Math.sin(l - f) * -c,
    C = Math.cos(l - f) * c,
    f && (u *= yi,
    P = Math.tan(f - u),
    P = Math.sqrt(1 + P * P),
    w *= P,
    C *= P,
    u && (P = Math.tan(u),
    P = Math.sqrt(1 + P * P),
    T *= P,
    x *= P)),
    T = re(T),
    x = re(x),
    w = re(w),
    C = re(C)) : (T = p,
    C = c,
    x = w = 0),
    (y && !~(o + "").indexOf("px") || _ && !~(a + "").indexOf("px")) && (y = Vt(d, "x", o, "px"),
    _ = Vt(d, "y", a, "px")),
    (g || h || m || v) && (y = re(y + g - (g * T + h * w) + m),
    _ = re(_ + h - (g * x + h * C) + v)),
    (r || s) && (P = d.getBBox(),
    y = re(y + r / 100 * P.width),
    _ = re(_ + s / 100 * P.height)),
    P = "matrix(" + T + "," + x + "," + w + "," + C + "," + y + "," + _ + ")",
    d.setAttribute("transform", P),
    b && (d.style[he] = P)
}, zf = function(e, t, i, r, s, o) {
    var a = 360, l = ce(s), f = parseFloat(s) * (l && ~s.indexOf("rad") ? qt : 1), u = o ? f * o : f - r, p = r + u + "deg", c, d;
    return l && (c = s.split("_")[1],
    c === "short" && (u %= a,
    u !== u % (a / 2) && (u += u < 0 ? a : -a)),
    c === "cw" && u < 0 ? u = (u + a * Xs) % a - ~~(u / a) * a : c === "ccw" && u > 0 && (u = (u - a * Xs) % a - ~~(u / a) * a)),
    e._pt = d = new De(e._pt,t,i,r,u,bf),
    d.e = p,
    d.u = "deg",
    e._props.push(i),
    d
}, Qs = function(e, t) {
    for (var i in t)
        e[i] = t[i];
    return e
}, $f = function(e, t, i) {
    var r = Qs({}, i._gsap), s = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, l, f, u, p, c, d, g;
    r.svg ? (f = i.getAttribute("transform"),
    i.setAttribute("transform", ""),
    o[he] = t,
    a = ar(i, 1),
    sr(i, he),
    i.setAttribute("transform", f)) : (f = getComputedStyle(i)[he],
    o[he] = t,
    a = ar(i, 1),
    o[he] = f);
    for (l in Bt)
        f = r[l],
        u = a[l],
        f !== u && s.indexOf(l) < 0 && (d = Me(f),
        g = Me(u),
        p = d !== g ? Vt(i, l, f, g) : parseFloat(f),
        c = parseFloat(u),
        e._pt = new De(e._pt,a,l,p,c - p,ba),
        e._pt.u = g || 0,
        e._props.push(l));
    Qs(a, r)
};
Ie("padding,margin,Width,Radius", function(n, e) {
    var t = "Top"
      , i = "Right"
      , r = "Bottom"
      , s = "Left"
      , o = (e < 3 ? [t, i, r, s] : [t + s, t + i, r + i, r + s]).map(function(a) {
        return e < 2 ? n + a : "border" + a + n
    });
    Kr[e > 1 ? "border" + n : n] = function(a, l, f, u, p) {
        var c, d;
        if (arguments.length < 4)
            return c = o.map(function(g) {
                return Ut(a, g, f)
            }),
            d = c.join(" "),
            d.split(c[0]).length === 5 ? c[0] : d;
        c = (u + "").split(" "),
        d = {},
        o.forEach(function(g, h) {
            return d[g] = c[h] = c[h] || c[(h - 1) / 2 | 0]
        }),
        a.init(l, d, p)
    }
});
var Ma = {
    name: "css",
    register: ts,
    targetTest: function(e) {
        return e.style && e.nodeType
    },
    init: function(e, t, i, r, s) {
        var o = this._props, a = e.style, l = i.vars.startAt, f, u, p, c, d, g, h, m, v, b, y, _, T, x, w;
        Ts || ts();
        for (h in t)
            if (h !== "autoRound" && (u = t[h],
            !(Re[h] && pa(h, t, i, r, e, s)))) {
                if (d = typeof u,
                g = Kr[h],
                d === "function" && (u = u.call(i, r, e, s),
                d = typeof u),
                d === "string" && ~u.indexOf("random(") && (u = rr(u)),
                g)
                    g(this, e, h, u, i) && (w = 1);
                else if (h.substr(0, 2) === "--")
                    f = (getComputedStyle(e).getPropertyValue(h) + "").trim(),
                    u += "",
                    zt.lastIndex = 0,
                    zt.test(f) || (m = Me(f),
                    v = Me(u)),
                    v ? m !== v && (f = Vt(e, h, f, v) + v) : m && (u += m),
                    this.add(a, "setProperty", f, u, r, s, 0, 0, h),
                    o.push(h);
                else if (d !== "undefined") {
                    if (l && h in l ? (f = typeof l[h] == "function" ? l[h].call(i, r, e, s) : l[h],
                    ce(f) && ~f.indexOf("random(") && (f = rr(f)),
                    Me(f + "") || (f += Be.units[h] || Me(Ut(e, h)) || ""),
                    (f + "").charAt(1) === "=" && (f = Ut(e, h))) : f = Ut(e, h),
                    c = parseFloat(f),
                    b = d === "string" && u.charAt(1) === "=" ? +(u.charAt(0) + "1") : 0,
                    b && (u = u.substr(2)),
                    p = parseFloat(u),
                    h in Mt && (h === "autoAlpha" && (c === 1 && Ut(e, "visibility") === "hidden" && p && (c = 0),
                    Lt(this, a, "visibility", c ? "inherit" : "hidden", p ? "inherit" : "hidden", !p)),
                    h !== "scale" && h !== "transform" && (h = Mt[h],
                    ~h.indexOf(",") && (h = h.split(",")[0]))),
                    y = h in Bt,
                    y) {
                        if (_ || (T = e._gsap,
                        T.renderTransform && !t.parseTransform || ar(e, t.parseTransform),
                        x = t.smoothOrigin !== !1 && T.smooth,
                        _ = this._pt = new De(this._pt,a,he,0,1,T.renderTransform,T,0,-1),
                        _.dep = 1),
                        h === "scale")
                            this._pt = new De(this._pt,T,"scaleY",T.scaleY,(b ? b * p : p - T.scaleY) || 0),
                            o.push("scaleY", h),
                            h += "X";
                        else if (h === "transformOrigin") {
                            u = Lf(u),
                            T.svg ? is(e, u, 0, x, 0, this) : (v = parseFloat(u.split(" ")[2]) || 0,
                            v !== T.zOrigin && Lt(this, T, "zOrigin", T.zOrigin, v),
                            Lt(this, a, h, Zr(f), Zr(u)));
                            continue
                        } else if (h === "svgOrigin") {
                            is(e, u, 1, x, 0, this);
                            continue
                        } else if (h in Pa) {
                            zf(this, T, h, c, u, b);
                            continue
                        } else if (h === "smoothOrigin") {
                            Lt(this, T, "smooth", T.smooth, u);
                            continue
                        } else if (h === "force3D") {
                            T[h] = u;
                            continue
                        } else if (h === "transform") {
                            $f(this, u, e);
                            continue
                        }
                    } else
                        h in a || (h = Ai(h) || h);
                    if (y || (p || p === 0) && (c || c === 0) && !wf.test(u) && h in a)
                        m = (f + "").substr((c + "").length),
                        p || (p = 0),
                        v = Me(u) || (h in Be.units ? Be.units[h] : m),
                        m !== v && (c = Vt(e, h, f, v)),
                        this._pt = new De(this._pt,y ? T : a,h,c,b ? b * p : p - c,!y && (v === "px" || h === "zIndex") && t.autoRound !== !1 ? xf : ba),
                        this._pt.u = v || 0,
                        m !== v && v !== "%" && (this._pt.b = f,
                        this._pt.r = Tf);
                    else if (h in a)
                        Mf.call(this, e, h, f, u);
                    else if (h in e)
                        this.add(e, h, f || e[h], u, r, s);
                    else {
                        hs(h, u);
                        continue
                    }
                    o.push(h)
                }
            }
        w && ya(this)
    },
    get: Ut,
    aliases: Mt,
    getSetter: function(e, t, i) {
        var r = Mt[t];
        return r && r.indexOf(",") < 0 && (t = r),
        t in Bt && t !== Nt && (e._gsap.x || Ut(e, "x")) ? i && Ys === i ? t === "scale" ? Pf : Ef : (Ys = i || {}) && (t === "scale" ? kf : Of) : e.style && !ds(e.style[t]) ? Sf : ~t.indexOf("-") ? Cf : ws(e, t)
    },
    core: {
        _removeProperty: sr,
        _getMatrix: xs
    }
};
dt.utils.checkPrefix = Ai;
(function(n, e, t, i) {
    var r = Ie(n + "," + e + "," + t, function(s) {
        Bt[s] = 1
    });
    Ie(e, function(s) {
        Be.units[s] = "deg",
        Pa[s] = 1
    }),
    Mt[r[13]] = n + "," + e,
    Ie(i, function(s) {
        var o = s.split(":");
        Mt[o[1]] = r[o[0]]
    })
}
)("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Ie("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(n) {
    Be.units[n] = "px"
});
dt.registerPlugin(Ma);
var Rf = dt.registerPlugin(Ma) || dt;
Rf.core.Tween;
/*!
 * ScrollTrigger 3.9.1
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var L, _i, H, _e, wt, ee, La, Ss, lr, Tr, zr, On, be, $r, rs, Se, Js, eo, pi, Aa, Mn, Ia, Ln, Hi = 1, ti = [], Zt = [], At = Date.now, An = At(), st = 0, to = 1, xr = function(e) {
    return e
}, lt = function(e) {
    return lr(e)[0] || (it(e) && L.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null)
}, io = function(e) {
    return Math.round(e * 1e5) / 1e5 || 0
}, Da = function() {
    return typeof window != "undefined"
}, za = function() {
    return L || Da() && (L = window.gsap) && L.registerPlugin && L
}, Ii = function(e) {
    return !!~La.indexOf(e)
}, ii = function(e, t) {
    return ~ti.indexOf(e) && ti[ti.indexOf(e) + 1][t]
}, Qr = function(e, t) {
    var i = t.s
      , r = t.sc
      , s = Zt.indexOf(e)
      , o = r === Ce.sc ? 1 : 2;
    return !~s && (s = Zt.push(e) - 1),
    Zt[s + o] || (Zt[s + o] = ii(e, i) || (Ii(e) ? r : function(a) {
        return arguments.length ? e[i] = a : e[i]
    }
    ))
}, $a = function(e) {
    return ii(e, "getBoundingClientRect") || (Ii(e) ? function() {
        return Vr.width = H.innerWidth,
        Vr.height = H.innerHeight,
        Vr
    }
    : function() {
        return yt(e)
    }
    )
}, Ff = function(e, t, i) {
    var r = i.d
      , s = i.d2
      , o = i.a;
    return (o = ii(e, "getBoundingClientRect")) ? function() {
        return o()[r]
    }
    : function() {
        return (t ? H["inner" + s] : e["client" + s]) || 0
    }
}, Bf = function(e, t) {
    return !t || ~ti.indexOf(e) ? $a(e) : function() {
        return Vr
    }
}, Jr = function(e, t) {
    var i = t.s
      , r = t.d2
      , s = t.d
      , o = t.a;
    return (i = "scroll" + r) && (o = ii(e, i)) ? o() - $a(e)()[s] : Ii(e) ? (ee[i] || wt[i]) - (H["inner" + r] || wt["client" + r] || ee["client" + r]) : e[i] - e["offset" + r]
}, In = function(e, t) {
    for (var i = 0; i < pi.length; i += 3)
        (!t || ~t.indexOf(pi[i + 1])) && e(pi[i], pi[i + 1], pi[i + 2])
}, it = function(e) {
    return typeof e == "string"
}, ut = function(e) {
    return typeof e == "function"
}, qi = function(e) {
    return typeof e == "number"
}, Dn = function(e) {
    return typeof e == "object"
}, Sr = function(e) {
    return ut(e) && e()
}, ro = function(e, t) {
    return function() {
        var i = Sr(e)
          , r = Sr(t);
        return function() {
            Sr(i),
            Sr(r)
        }
    }
}, Wi = function(e, t, i) {
    return e && e.progress(t ? 0 : 1) && i && e.pause()
}, zn = function(e, t) {
    if (e.enabled) {
        var i = t(e);
        i && i.totalTime && (e.callbackAnimation = i)
    }
}, di = Math.abs, Cr = "scrollLeft", Er = "scrollTop", Cs = "left", Es = "top", an = "right", ln = "bottom", $t = "width", Rt = "height", wi = "Right", bi = "Left", Ti = "Top", xi = "Bottom", ie = "padding", Ye = "margin", ri = "Width", fn = "Height", Te = "px", nt = {
    s: Cr,
    p: Cs,
    p2: bi,
    os: an,
    os2: wi,
    d: $t,
    d2: ri,
    a: "x",
    sc: function(e) {
        return arguments.length ? H.scrollTo(e, Ce.sc()) : H.pageXOffset || _e[Cr] || wt[Cr] || ee[Cr] || 0
    }
}, Ce = {
    s: Er,
    p: Es,
    p2: Ti,
    os: ln,
    os2: xi,
    d: Rt,
    d2: fn,
    a: "y",
    op: nt,
    sc: function(e) {
        return arguments.length ? H.scrollTo(nt.sc(), e) : H.pageYOffset || _e[Er] || wt[Er] || ee[Er] || 0
    }
}, vt = function(e) {
    return H.getComputedStyle(e)
}, Nf = function(e) {
    var t = vt(e).position;
    e.style.position = t === "absolute" || t === "fixed" ? t : "relative"
}, no = function(e, t) {
    for (var i in t)
        i in e || (e[i] = t[i]);
    return e
}, yt = function(e, t) {
    var i = t && vt(e)[rs] !== "matrix(1, 0, 0, 1, 0, 0)" && L.to(e, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0
    }).progress(1)
      , r = e.getBoundingClientRect();
    return i && i.progress(0).kill(),
    r
}, ns = function(e, t) {
    var i = t.d2;
    return e["offset" + i] || e["client" + i] || 0
}, Ra = function(e) {
    var t = [], i = e.labels, r = e.duration(), s;
    for (s in i)
        t.push(i[s] / r);
    return t
}, Vf = function(e) {
    return function(t) {
        return L.utils.snap(Ra(e), t)
    }
}, Ps = function(e) {
    var t = L.utils.snap(e)
      , i = Array.isArray(e) && e.slice(0).sort(function(r, s) {
        return r - s
    });
    return i ? function(r, s, o) {
        o === void 0 && (o = .001);
        var a;
        if (!s)
            return t(r);
        if (s > 0) {
            for (r -= o,
            a = 0; a < i.length; a++)
                if (i[a] >= r)
                    return i[a];
            return i[a - 1]
        } else
            for (a = i.length,
            r += o; a--; )
                if (i[a] <= r)
                    return i[a];
        return i[0]
    }
    : function(r, s, o) {
        o === void 0 && (o = .001);
        var a = t(r);
        return !s || Math.abs(a - r) < o || a - r < 0 == s < 0 ? a : t(s < 0 ? r - e : r + e)
    }
}, Gf = function(e) {
    return function(t, i) {
        return Ps(Ra(e))(t, i.direction)
    }
}, so = function(e, t, i, r) {
    return i.split(",").forEach(function(s) {
        return e(t, s, r)
    })
}, xe = function(e, t, i) {
    return e.addEventListener(t, i, {
        passive: !0
    })
}, Ui = function(e, t, i) {
    return e.removeEventListener(t, i)
}, oo = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal"
}, Pr = {
    toggleActions: "play",
    anticipatePin: 0
}, en = {
    top: 0,
    left: 0,
    center: .5,
    bottom: 1,
    right: 1
}, Rr = function(e, t) {
    if (it(e)) {
        var i = e.indexOf("=")
          , r = ~i ? +(e.charAt(i - 1) + 1) * parseFloat(e.substr(i + 1)) : 0;
        ~i && (e.indexOf("%") > i && (r *= t / 100),
        e = e.substr(0, i - 1)),
        e = r + (e in en ? en[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0)
    }
    return e
}, kr = function(e, t, i, r, s, o, a, l) {
    var f = s.startColor
      , u = s.endColor
      , p = s.fontSize
      , c = s.indent
      , d = s.fontWeight
      , g = _e.createElement("div")
      , h = Ii(i) || ii(i, "pinType") === "fixed"
      , m = e.indexOf("scroller") !== -1
      , v = h ? ee : i
      , b = e.indexOf("start") !== -1
      , y = b ? f : u
      , _ = "border-color:" + y + ";font-size:" + p + ";color:" + y + ";font-weight:" + d + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    return _ += "position:" + ((m || l) && h ? "fixed;" : "absolute;"),
    (m || l || !h) && (_ += (r === Ce ? an : ln) + ":" + (o + parseFloat(c)) + "px;"),
    a && (_ += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"),
    g._isStart = b,
    g.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")),
    g.style.cssText = _,
    g.innerText = t || t === 0 ? e + "-" + t : e,
    v.children[0] ? v.insertBefore(g, v.children[0]) : v.appendChild(g),
    g._offset = g["offset" + r.op.d2],
    Fr(g, 0, r, b),
    g
}, Fr = function(e, t, i, r) {
    var s = {
        display: "block"
    }
      , o = i[r ? "os2" : "p2"]
      , a = i[r ? "p2" : "os2"];
    e._isFlipped = r,
    s[i.a + "Percent"] = r ? -100 : 0,
    s[i.a] = r ? "1px" : 0,
    s["border" + o + ri] = 1,
    s["border" + a + ri] = 0,
    s[i.p] = t + "px",
    L.set(e, s)
}, N = [], ss = {}, ao = function() {
    return At() - st > 34 && ks()
}, Or = function() {
    ks(),
    st || Di("scrollStart"),
    st = At()
}, Ki = function() {
    return !be && !Ia && !_e.fullscreenElement && Ss.restart(!0)
}, fr = {}, Wf = [], Q = [], Si, lo, fo = function(e) {
    var t = L.ticker.frame, i = [], r = 0, s;
    if (lo !== t || Hi) {
        for (tn(); r < Q.length; r += 4)
            s = H.matchMedia(Q[r]).matches,
            s !== Q[r + 3] && (Q[r + 3] = s,
            s ? i.push(r) : tn(1, Q[r]) || ut(Q[r + 2]) && Q[r + 2]());
        for (Ba(),
        r = 0; r < i.length; r++)
            s = i[r],
            Si = Q[s],
            Q[s + 2] = Q[s + 1](e);
        Si = 0,
        _i && Ci(0, 1),
        lo = t,
        Di("matchMedia")
    }
}, Fa = function n() {
    return Ui(X, "scrollEnd", n) || Ci(!0)
}, Di = function(e) {
    return fr[e] && fr[e].map(function(t) {
        return t()
    }) || Wf
}, je = [], Ba = function(e) {
    for (var t = 0; t < je.length; t += 5)
        (!e || je[t + 4] === e) && (je[t].style.cssText = je[t + 1],
        je[t].getBBox && je[t].setAttribute("transform", je[t + 2] || ""),
        je[t + 3].uncache = 1)
}, tn = function(e, t) {
    var i;
    for (Se = 0; Se < N.length; Se++)
        i = N[Se],
        (!t || i.media === t) && (e ? i.kill(1) : i.revert());
    t && Ba(t),
    t || Di("revert")
}, Na = function() {
    return Zt.forEach(function(e) {
        return typeof e == "function" && (e.rec = 0)
    })
}, os, Ci = function(e, t) {
    if (st && !e) {
        xe(X, "scrollEnd", Fa);
        return
    }
    os = !0;
    var i = Di("refreshInit");
    Aa && X.sort(),
    t || tn(),
    N.forEach(function(r) {
        return r.refresh()
    }),
    N.forEach(function(r) {
        return r.vars.end === "max" && r.setPositions(r.start, Jr(r.scroller, r._dir))
    }),
    i.forEach(function(r) {
        return r && r.render && r.render(-1)
    }),
    Na(),
    Ss.pause(),
    os = !1,
    Di("refresh")
}, uo = 0, Br = 1, ks = function() {
    if (!os) {
        var e = N.length
          , t = At()
          , i = t - An >= 50
          , r = e && N[0].scroll();
        if (Br = uo > r ? -1 : 1,
        uo = r,
        i && (st && !$r && t - st > 200 && (st = 0,
        Di("scrollEnd")),
        zr = An,
        An = t),
        Br < 0) {
            for (Se = e; Se-- > 0; )
                N[Se] && N[Se].update(0, i);
            Br = 1
        } else
            for (Se = 0; Se < e; Se++)
                N[Se] && N[Se].update(0, i)
    }
}, as = [Cs, Es, ln, an, Ye + xi, Ye + wi, Ye + Ti, Ye + bi, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Nr = as.concat([$t, Rt, "boxSizing", "max" + ri, "max" + fn, "position", Ye, ie, ie + Ti, ie + wi, ie + xi, ie + bi]), jf = function(e, t, i) {
    ur(i);
    var r = e._gsap;
    if (r.spacerIsNative)
        ur(r.spacerState);
    else if (e.parentNode === t) {
        var s = t.parentNode;
        s && (s.insertBefore(e, t),
        s.removeChild(t))
    }
}, $n = function(e, t, i, r) {
    if (e.parentNode !== t) {
        for (var s = as.length, o = t.style, a = e.style, l; s--; )
            l = as[s],
            o[l] = i[l];
        o.position = i.position === "absolute" ? "absolute" : "relative",
        i.display === "inline" && (o.display = "inline-block"),
        a[ln] = a[an] = o.flexBasis = "auto",
        o.overflow = "visible",
        o.boxSizing = "border-box",
        o[$t] = ns(e, nt) + Te,
        o[Rt] = ns(e, Ce) + Te,
        o[ie] = a[Ye] = a[Es] = a[Cs] = "0",
        ur(r),
        a[$t] = a["max" + ri] = i[$t],
        a[Rt] = a["max" + fn] = i[Rt],
        a[ie] = i[ie],
        e.parentNode.insertBefore(t, e),
        t.appendChild(e)
    }
}, Yf = /([A-Z])/g, ur = function(e) {
    if (e) {
        var t = e.t.style, i = e.length, r = 0, s, o;
        for ((e.t._gsap || L.core.getCache(e.t)).uncache = 1; r < i; r += 2)
            o = e[r + 1],
            s = e[r],
            o ? t[s] = o : t[s] && t.removeProperty(s.replace(Yf, "-$1").toLowerCase())
    }
}, Mr = function(e) {
    for (var t = Nr.length, i = e.style, r = [], s = 0; s < t; s++)
        r.push(Nr[s], i[Nr[s]]);
    return r.t = e,
    r
}, Xf = function(e, t, i) {
    for (var r = [], s = e.length, o = i ? 8 : 0, a; o < s; o += 2)
        a = e[o],
        r.push(a, a in t ? t[a] : e[o + 1]);
    return r.t = e.t,
    r
}, Vr = {
    left: 0,
    top: 0
}, co = function(e, t, i, r, s, o, a, l, f, u, p, c, d) {
    ut(e) && (e = e(l)),
    it(e) && e.substr(0, 3) === "max" && (e = c + (e.charAt(4) === "=" ? Rr("0" + e.substr(3), i) : 0));
    var g = d ? d.time() : 0, h, m, v;
    if (d && d.seek(0),
    qi(e))
        a && Fr(a, i, r, !0);
    else {
        ut(t) && (t = t(l));
        var b = e.split(" "), y, _, T, x;
        v = lt(t) || ee,
        y = yt(v) || {},
        (!y || !y.left && !y.top) && vt(v).display === "none" && (x = v.style.display,
        v.style.display = "block",
        y = yt(v),
        x ? v.style.display = x : v.style.removeProperty("display")),
        _ = Rr(b[0], y[r.d]),
        T = Rr(b[1] || "0", i),
        e = y[r.p] - f[r.p] - u + _ + s - T,
        a && Fr(a, T, r, i - T < 20 || a._isStart && T > 20),
        i -= i - T
    }
    if (o) {
        var w = e + i
          , C = o._isStart;
        h = "scroll" + r.d2,
        Fr(o, w, r, C && w > 20 || !C && (p ? Math.max(ee[h], wt[h]) : o.parentNode[h]) <= w + 1),
        p && (f = yt(a),
        p && (o.style[r.op.p] = f[r.op.p] - r.op.m - o._offset + Te))
    }
    return d && v && (h = yt(v),
    d.seek(c),
    m = yt(v),
    d._caScrollDist = h[r.p] - m[r.p],
    e = e / d._caScrollDist * c),
    d && d.seek(g),
    d ? e : Math.round(e)
}, Hf = /(?:webkit|moz|length|cssText|inset)/i, po = function(e, t, i, r) {
    if (e.parentNode !== t) {
        var s = e.style, o, a;
        if (t === ee) {
            e._stOrig = s.cssText,
            a = vt(e);
            for (o in a)
                !+o && !Hf.test(o) && a[o] && typeof s[o] == "string" && o !== "0" && (s[o] = a[o]);
            s.top = i,
            s.left = r
        } else
            s.cssText = e._stOrig;
        L.core.getCache(e).uncache = 1,
        t.appendChild(e)
    }
}, ho = function(e, t) {
    var i = Qr(e, t), r = "_scroll" + t.p2, s, o, a = function l(f, u, p, c, d) {
        var g = l.tween
          , h = u.onComplete
          , m = {};
        return g && g.kill(),
        s = Math.round(p),
        u[r] = f,
        u.modifiers = m,
        m[r] = function(v) {
            return v = io(i()),
            v !== s && v !== o && Math.abs(v - s) > 2 && Math.abs(v - o) > 2 ? (g.kill(),
            l.tween = 0) : v = p + c * g.ratio + d * g.ratio * g.ratio,
            o = s,
            s = io(v)
        }
        ,
        u.onComplete = function() {
            l.tween = 0,
            h && h.call(g)
        }
        ,
        g = l.tween = L.to(e, u),
        g
    };
    return e[r] = i,
    xe(e, "wheel", function() {
        return a.tween && a.tween.kill() && (a.tween = 0)
    }),
    a
};
nt.op = Ce;
var X = function() {
    function n(t, i) {
        _i || n.register(L) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
        this.init(t, i)
    }
    var e = n.prototype;
    return e.init = function(i, r) {
        if (this.progress = this.start = 0,
        this.vars && this.kill(1),
        !to) {
            this.update = this.refresh = this.kill = xr;
            return
        }
        i = no(it(i) || qi(i) || i.nodeType ? {
            trigger: i
        } : i, Pr);
        var s = i, o = s.onUpdate, a = s.toggleClass, l = s.id, f = s.onToggle, u = s.onRefresh, p = s.scrub, c = s.trigger, d = s.pin, g = s.pinSpacing, h = s.invalidateOnRefresh, m = s.anticipatePin, v = s.onScrubComplete, b = s.onSnapComplete, y = s.once, _ = s.snap, T = s.pinReparent, x = s.pinSpacer, w = s.containerAnimation, C = s.fastScrollEnd, P = s.preventOverlaps, E = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? nt : Ce, O = !p && p !== 0, k = lt(i.scroller || H), D = L.core.getCache(k), z = Ii(k), F = ("pinType"in i ? i.pinType : ii(k, "pinType") || z && "fixed") === "fixed", V = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], te = O && i.toggleActions.split(" "), Pe = "markers"in i ? i.markers : Pr.markers, ze = z ? 0 : parseFloat(vt(k)["border" + E.p2 + ri]) || 0, S = this, ke = i.onRefreshInit && function() {
            return i.onRefreshInit(S)
        }
        , si = Ff(k, z, E), Qe = Bf(k, z), Je = 0, ae = Qr(k, E), ot, $e, Is, oi, zi, Z, et, pt, ai, ht, li, $i, me, _r, vr, cn, Ve, dn, pn, hn, Ri, Et, Ds, Fi, zs, gn, mn, yr, _n, we, wr, Pt, fi, Bi, Ni, vn, yn;
        if (S.media = Si,
        S._dir = E,
        m *= 45,
        S.scroller = k,
        S.scroll = w ? w.time.bind(w) : ae,
        oi = ae(),
        S.vars = i,
        r = r || i.animation,
        "refreshPriority"in i && (Aa = 1),
        D.tweenScroll = D.tweenScroll || {
            top: ho(k, Ce),
            left: ho(k, nt)
        },
        S.tweenTo = ot = D.tweenScroll[E.p],
        r && (r.vars.lazy = !1,
        r._initted || r.vars.immediateRender !== !1 && i.immediateRender !== !1 && r.render(0, !0, !0),
        S.animation = r.pause(),
        r.scrollTrigger = S,
        wr = qi(p) && p,
        wr && (we = L.to(r, {
            ease: "power3",
            duration: wr,
            onComplete: function() {
                return v && v(S)
            }
        })),
        yr = 0,
        l || (l = r.vars.id)),
        N.push(S),
        _ && ((!Dn(_) || _.push) && (_ = {
            snapTo: _
        }),
        "scrollBehavior"in ee.style && L.set(z ? [ee, wt] : k, {
            scrollBehavior: "auto"
        }),
        Is = ut(_.snapTo) ? _.snapTo : _.snapTo === "labels" ? Vf(r) : _.snapTo === "labelsDirectional" ? Gf(r) : _.directional !== !1 ? function($, B) {
            return Ps(_.snapTo)($, B.direction)
        }
        : L.utils.snap(_.snapTo),
        Pt = _.duration || {
            min: .1,
            max: 2
        },
        Pt = Dn(Pt) ? Tr(Pt.min, Pt.max) : Tr(Pt, Pt),
        fi = L.delayedCall(_.delay || wr / 2 || .1, function() {
            if (Math.abs(S.getVelocity()) < 10 && !$r && Je !== ae()) {
                var $ = r && !O ? r.totalProgress() : S.progress
                  , B = ($ - _n) / (At() - zr) * 1e3 || 0
                  , G = L.utils.clamp(-S.progress, 1 - S.progress, di(B / 2) * B / .185)
                  , W = S.progress + (_.inertia === !1 ? 0 : G)
                  , Ge = Tr(0, 1, Is(W, S))
                  , A = ae()
                  , J = Math.round(Z + Ge * me)
                  , q = _
                  , gt = q.onStart
                  , U = q.onInterrupt
                  , Oe = q.onComplete
                  , tt = ot.tween;
                if (A <= et && A >= Z && J !== A) {
                    if (tt && !tt._initted && tt.data <= di(J - A))
                        return;
                    _.inertia === !1 && (G = Ge - S.progress),
                    ot(J, {
                        duration: Pt(di(Math.max(di(W - $), di(Ge - $)) * .185 / B / .05 || 0)),
                        ease: _.ease || "power3",
                        data: di(J - A),
                        onInterrupt: function() {
                            return fi.restart(!0) && U && U(S)
                        },
                        onComplete: function() {
                            S.update(),
                            Je = ae(),
                            yr = _n = r && !O ? r.totalProgress() : S.progress,
                            b && b(S),
                            Oe && Oe(S)
                        }
                    }, A, G * me, J - A - G * me),
                    gt && gt(S, ot.tween)
                }
            } else
                S.isActive && fi.restart(!0)
        }).pause()),
        l && (ss[l] = S),
        c = S.trigger = lt(c || d),
        d = d === !0 ? c : lt(d),
        it(a) && (a = {
            targets: c,
            className: a
        }),
        d && (g === !1 || g === Ye || (g = !g && vt(d.parentNode).display === "flex" ? !1 : ie),
        S.pin = d,
        i.force3D !== !1 && L.set(d, {
            force3D: !0
        }),
        $e = L.core.getCache(d),
        $e.spacer ? _r = $e.pinState : (x && (x = lt(x),
        x && !x.nodeType && (x = x.current || x.nativeElement),
        $e.spacerIsNative = !!x,
        x && ($e.spacerState = Mr(x))),
        $e.spacer = Ve = x || _e.createElement("div"),
        Ve.classList.add("pin-spacer"),
        l && Ve.classList.add("pin-spacer-" + l),
        $e.pinState = _r = Mr(d)),
        S.spacer = Ve = $e.spacer,
        mn = vt(d),
        Ds = mn[g + E.os2],
        pn = L.getProperty(d),
        hn = L.quickSetter(d, E.a, Te),
        $n(d, Ve, mn),
        cn = Mr(d)),
        Pe && ($i = Dn(Pe) ? no(Pe, oo) : oo,
        ht = kr("scroller-start", l, k, E, $i, 0),
        li = kr("scroller-end", l, k, E, $i, 0, ht),
        dn = ht["offset" + E.op.d2],
        pt = kr("start", l, k, E, $i, dn, 0, w),
        ai = kr("end", l, k, E, $i, dn, 0, w),
        w && (yn = L.quickSetter([pt, ai], E.a, Te)),
        !F && !(ti.length && ii(k, "fixedMarkers") === !0) && (Nf(z ? ee : k),
        L.set([ht, li], {
            force3D: !0
        }),
        zs = L.quickSetter(ht, E.a, Te),
        gn = L.quickSetter(li, E.a, Te))),
        w) {
            var $s = w.vars.onUpdate
              , Cl = w.vars.onUpdateParams;
            w.eventCallback("onUpdate", function() {
                S.update(0, 0, 1),
                $s && $s.apply(Cl || [])
            })
        }
        S.previous = function() {
            return N[N.indexOf(S) - 1]
        }
        ,
        S.next = function() {
            return N[N.indexOf(S) + 1]
        }
        ,
        S.revert = function($) {
            var B = $ !== !1 || !S.enabled
              , G = be;
            B !== S.isReverted && (B && (S.scroll.rec || (S.scroll.rec = ae()),
            Ni = Math.max(ae(), S.scroll.rec || 0),
            Bi = S.progress,
            vn = r && r.progress()),
            pt && [pt, ai, ht, li].forEach(function(W) {
                return W.style.display = B ? "none" : "block"
            }),
            B && (be = 1),
            S.update(B),
            be = G,
            d && (B ? jf(d, Ve, _r) : (!T || !S.isActive) && $n(d, Ve, vt(d), Fi)),
            S.isReverted = B)
        }
        ,
        S.refresh = function($, B) {
            if (!((be || !S.enabled) && !B)) {
                if (d && $ && st) {
                    xe(n, "scrollEnd", Fa);
                    return
                }
                be = 1,
                we && we.pause(),
                h && r && r.time(-.01, !0).invalidate(),
                S.isReverted || S.revert();
                for (var G = si(), W = Qe(), Ge = w ? w.duration() : Jr(k, E), A = 0, J = 0, q = i.end, gt = i.endTrigger || c, U = i.start || (i.start === 0 || !c ? 0 : d ? "0 0" : "0 100%"), Oe = i.pinnedContainer && lt(i.pinnedContainer), tt = c && Math.max(0, N.indexOf(S)) || 0, ne = tt, se, pe, ui, jt, oe, le, mt, wn, Rs, Vi; ne--; )
                    le = N[ne],
                    le.end || le.refresh(0, 1) || (be = 1),
                    mt = le.pin,
                    mt && (mt === c || mt === d) && !le.isReverted && (Vi || (Vi = []),
                    Vi.unshift(le),
                    le.revert());
                for (ut(U) && (U = U(S)),
                Z = co(U, c, G, E, ae(), pt, ht, S, W, ze, F, Ge, w) || (d ? -.001 : 0),
                ut(q) && (q = q(S)),
                it(q) && !q.indexOf("+=") && (~q.indexOf(" ") ? q = (it(U) ? U.split(" ")[0] : "") + q : (A = Rr(q.substr(2), G),
                q = it(U) ? U : Z + A,
                gt = c)),
                et = Math.max(Z, co(q || (gt ? "100% 0" : Ge), gt, G, E, ae() + A, ai, li, S, W, ze, F, Ge, w)) || -.001,
                me = et - Z || (Z -= .01) && .001,
                A = 0,
                ne = tt; ne--; )
                    le = N[ne],
                    mt = le.pin,
                    mt && le.start - le._pinPush < Z && !w && (se = le.end - le.start,
                    (mt === c || mt === Oe) && !qi(U) && (A += se * (1 - le.progress)),
                    mt === d && (J += se));
                if (Z += A,
                et += A,
                S._pinPush = J,
                pt && A && (se = {},
                se[E.a] = "+=" + A,
                Oe && (se[E.p] = "-=" + ae()),
                L.set([pt, ai], se)),
                d)
                    se = vt(d),
                    jt = E === Ce,
                    ui = ae(),
                    Ri = parseFloat(pn(E.a)) + J,
                    !Ge && et > 1 && ((z ? ee : k).style["overflow-" + E.a] = "scroll"),
                    $n(d, Ve, se),
                    cn = Mr(d),
                    pe = yt(d, !0),
                    wn = F && Qr(k, jt ? nt : Ce)(),
                    g && (Fi = [g + E.os2, me + J + Te],
                    Fi.t = Ve,
                    ne = g === ie ? ns(d, E) + me + J : 0,
                    ne && Fi.push(E.d, ne + Te),
                    ur(Fi),
                    F && ae(Ni)),
                    F && (oe = {
                        top: pe.top + (jt ? ui - Z : wn) + Te,
                        left: pe.left + (jt ? wn : ui - Z) + Te,
                        boxSizing: "border-box",
                        position: "fixed"
                    },
                    oe[$t] = oe["max" + ri] = Math.ceil(pe.width) + Te,
                    oe[Rt] = oe["max" + fn] = Math.ceil(pe.height) + Te,
                    oe[Ye] = oe[Ye + Ti] = oe[Ye + wi] = oe[Ye + xi] = oe[Ye + bi] = "0",
                    oe[ie] = se[ie],
                    oe[ie + Ti] = se[ie + Ti],
                    oe[ie + wi] = se[ie + wi],
                    oe[ie + xi] = se[ie + xi],
                    oe[ie + bi] = se[ie + bi],
                    vr = Xf(_r, oe, T)),
                    r ? (Rs = r._initted,
                    Mn(1),
                    r.render(r.duration(), !0, !0),
                    Et = pn(E.a) - Ri + me + J,
                    me !== Et && vr.splice(vr.length - 2, 2),
                    r.render(0, !0, !0),
                    Rs || r.invalidate(),
                    Mn(0)) : Et = me;
                else if (c && ae() && !w)
                    for (pe = c.parentNode; pe && pe !== ee; )
                        pe._pinOffset && (Z -= pe._pinOffset,
                        et -= pe._pinOffset),
                        pe = pe.parentNode;
                Vi && Vi.forEach(function(El) {
                    return El.revert(!1)
                }),
                S.start = Z,
                S.end = et,
                oi = zi = ae(),
                w || (oi < Ni && ae(Ni),
                S.scroll.rec = 0),
                S.revert(!1),
                be = 0,
                r && O && r._initted && r.progress() !== vn && r.progress(vn, !0).render(r.time(), !0, !0),
                (Bi !== S.progress || w) && (r && !O && r.totalProgress(Bi, !0),
                S.progress = Bi,
                S.update(0, 0, 1)),
                d && g && (Ve._pinOffset = Math.round(S.progress * Et)),
                u && u(S)
            }
        }
        ,
        S.getVelocity = function() {
            return (ae() - zi) / (At() - zr) * 1e3 || 0
        }
        ,
        S.endAnimation = function() {
            Wi(S.callbackAnimation),
            r && (we ? we.progress(1) : r.paused() ? O || Wi(r, S.direction < 0, 1) : Wi(r, r.reversed()))
        }
        ,
        S.labelToScroll = function($) {
            return r && r.labels && (Z || S.refresh() || Z) + r.labels[$] / r.duration() * me || 0
        }
        ,
        S.getTrailing = function($) {
            var B = N.indexOf(S)
              , G = S.direction > 0 ? N.slice(0, B).reverse() : N.slice(B + 1);
            return it($) ? G.filter(function(W) {
                return W.vars.preventOverlaps === $
            }) : G
        }
        ,
        S.update = function($, B, G) {
            if (!(w && !G && !$)) {
                var W = S.scroll(), Ge = $ ? 0 : (W - Z) / me, A = Ge < 0 ? 0 : Ge > 1 ? 1 : Ge || 0, J = S.progress, q, gt, U, Oe, tt, ne, se, pe;
                if (B && (zi = oi,
                oi = w ? ae() : W,
                _ && (_n = yr,
                yr = r && !O ? r.totalProgress() : A)),
                m && !A && d && !be && !Hi && st && Z < W + (W - zi) / (At() - zr) * m && (A = 1e-4),
                A !== J && S.enabled) {
                    if (q = S.isActive = !!A && A < 1,
                    gt = !!J && J < 1,
                    ne = q !== gt,
                    tt = ne || !!A != !!J,
                    S.direction = A > J ? 1 : -1,
                    S.progress = A,
                    tt && !be && (U = A && !J ? 0 : A === 1 ? 1 : J === 1 ? 2 : 3,
                    O && (Oe = !ne && te[U + 1] !== "none" && te[U + 1] || te[U],
                    pe = r && (Oe === "complete" || Oe === "reset" || Oe in r))),
                    P && ne && (pe || p || !r) && (ut(P) ? P(S) : S.getTrailing(P).forEach(function(le) {
                        return le.endAnimation()
                    })),
                    O || (we && !be && !Hi ? (we.vars.totalProgress = A,
                    we.invalidate().restart()) : r && r.totalProgress(A, !!be)),
                    d) {
                        if ($ && g && (Ve.style[g + E.os2] = Ds),
                        !F)
                            hn(Ri + Et * A);
                        else if (tt) {
                            if (se = !$ && A > J && et + 1 > W && W + 1 >= Jr(k, E),
                            T)
                                if (!$ && (q || se)) {
                                    var ui = yt(d, !0)
                                      , jt = W - Z;
                                    po(d, ee, ui.top + (E === Ce ? jt : 0) + Te, ui.left + (E === Ce ? 0 : jt) + Te)
                                } else
                                    po(d, Ve);
                            ur(q || se ? vr : cn),
                            Et !== me && A < 1 && q || hn(Ri + (A === 1 && !se ? Et : 0))
                        }
                    }
                    _ && !ot.tween && !be && !Hi && fi.restart(!0),
                    a && (ne || y && A && (A < 1 || !Ln)) && lr(a.targets).forEach(function(le) {
                        return le.classList[q || y ? "add" : "remove"](a.className)
                    }),
                    o && !O && !$ && o(S),
                    tt && !be ? (O && (pe && (Oe === "complete" ? r.pause().totalProgress(1) : Oe === "reset" ? r.restart(!0).pause() : Oe === "restart" ? r.restart(!0) : r[Oe]()),
                    o && o(S)),
                    (ne || !Ln) && (f && ne && zn(S, f),
                    V[U] && zn(S, V[U]),
                    y && (A === 1 ? S.kill(!1, 1) : V[U] = 0),
                    ne || (U = A === 1 ? 1 : 3,
                    V[U] && zn(S, V[U]))),
                    C && !q && Math.abs(S.getVelocity()) > (qi(C) ? C : 2500) && (Wi(S.callbackAnimation),
                    we ? we.progress(1) : Wi(r, !A, 1))) : O && o && !be && o(S)
                }
                if (gn) {
                    var oe = w ? W / w.duration() * (w._caScrollDist || 0) : W;
                    zs(oe + (ht._isFlipped ? 1 : 0)),
                    gn(oe)
                }
                yn && yn(-W / w.duration() * (w._caScrollDist || 0))
            }
        }
        ,
        S.enable = function($, B) {
            S.enabled || (S.enabled = !0,
            xe(k, "resize", Ki),
            xe(k, "scroll", Or),
            ke && xe(n, "refreshInit", ke),
            $ !== !1 && (S.progress = Bi = 0,
            oi = zi = Je = ae()),
            B !== !1 && S.refresh())
        }
        ,
        S.getTween = function($) {
            return $ && ot ? ot.tween : we
        }
        ,
        S.setPositions = function($, B) {
            d && (Ri += $ - Z,
            Et += B - $ - me),
            S.start = Z = $,
            S.end = et = B,
            me = B - $,
            S.update()
        }
        ,
        S.disable = function($, B) {
            if (S.enabled && ($ !== !1 && S.revert(),
            S.enabled = S.isActive = !1,
            B || we && we.pause(),
            Ni = 0,
            $e && ($e.uncache = 1),
            ke && Ui(n, "refreshInit", ke),
            fi && (fi.pause(),
            ot.tween && ot.tween.kill() && (ot.tween = 0)),
            !z)) {
                for (var G = N.length; G--; )
                    if (N[G].scroller === k && N[G] !== S)
                        return;
                Ui(k, "resize", Ki),
                Ui(k, "scroll", Or)
            }
        }
        ,
        S.kill = function($, B) {
            S.disable($, B),
            we && we.kill(),
            l && delete ss[l];
            var G = N.indexOf(S);
            G >= 0 && N.splice(G, 1),
            G === Se && Br > 0 && Se--,
            G = 0,
            N.forEach(function(W) {
                return W.scroller === S.scroller && (G = 1)
            }),
            G || (S.scroll.rec = 0),
            r && (r.scrollTrigger = null,
            $ && r.render(-1),
            B || r.kill()),
            pt && [pt, ai, ht, li].forEach(function(W) {
                return W.parentNode && W.parentNode.removeChild(W)
            }),
            d && ($e && ($e.uncache = 1),
            G = 0,
            N.forEach(function(W) {
                return W.pin === d && G++
            }),
            G || ($e.spacer = 0))
        }
        ,
        S.enable(!1, !1),
        !r || !r.add || me ? S.refresh() : L.delayedCall(.01, function() {
            return Z || et || S.refresh()
        }) && (me = .01) && (Z = et = 0)
    }
    ,
    n.register = function(i) {
        if (!_i && (L = i || za(),
        Da() && window.document && (H = window,
        _e = document,
        wt = _e.documentElement,
        ee = _e.body),
        L && (lr = L.utils.toArray,
        Tr = L.utils.clamp,
        Mn = L.core.suppressOverwrites || xr,
        L.core.globals("ScrollTrigger", n),
        ee))) {
            xe(H, "wheel", Or),
            La = [H, _e, wt, ee],
            xe(_e, "scroll", Or);
            var r = ee.style, s = r.borderTopStyle, o;
            r.borderTopStyle = "solid",
            o = yt(ee),
            Ce.m = Math.round(o.top + Ce.sc()) || 0,
            nt.m = Math.round(o.left + nt.sc()) || 0,
            s ? r.borderTopStyle = s : r.removeProperty("border-top-style"),
            On = setInterval(ao, 200),
            L.delayedCall(.5, function() {
                return Hi = 0
            }),
            xe(_e, "touchcancel", xr),
            xe(ee, "touchstart", xr),
            so(xe, _e, "pointerdown,touchstart,mousedown", function() {
                return $r = 1
            }),
            so(xe, _e, "pointerup,touchend,mouseup", function() {
                return $r = 0
            }),
            rs = L.utils.checkPrefix("transform"),
            Nr.push(rs),
            _i = At(),
            Ss = L.delayedCall(.2, Ci).pause(),
            pi = [_e, "visibilitychange", function() {
                var a = H.innerWidth
                  , l = H.innerHeight;
                _e.hidden ? (Js = a,
                eo = l) : (Js !== a || eo !== l) && Ki()
            }
            , _e, "DOMContentLoaded", Ci, H, "load", function() {
                return st || Ci()
            }
            , H, "resize", Ki],
            In(xe)
        }
        return _i
    }
    ,
    n.defaults = function(i) {
        if (i)
            for (var r in i)
                Pr[r] = i[r];
        return Pr
    }
    ,
    n.kill = function() {
        to = 0,
        N.slice(0).forEach(function(i) {
            return i.kill(1)
        })
    }
    ,
    n.config = function(i) {
        "limitCallbacks"in i && (Ln = !!i.limitCallbacks);
        var r = i.syncInterval;
        r && clearInterval(On) || (On = r) && setInterval(ao, r),
        "autoRefreshEvents"in i && (In(Ui) || In(xe, i.autoRefreshEvents || "none"),
        Ia = (i.autoRefreshEvents + "").indexOf("resize") === -1)
    }
    ,
    n.scrollerProxy = function(i, r) {
        var s = lt(i)
          , o = Zt.indexOf(s)
          , a = Ii(s);
        ~o && Zt.splice(o, a ? 6 : 2),
        r && (a ? ti.unshift(H, r, ee, r, wt, r) : ti.unshift(s, r))
    }
    ,
    n.matchMedia = function(i) {
        var r, s, o, a, l;
        for (s in i)
            o = Q.indexOf(s),
            a = i[s],
            Si = s,
            s === "all" ? a() : (r = H.matchMedia(s),
            r && (r.matches && (l = a()),
            ~o ? (Q[o + 1] = ro(Q[o + 1], a),
            Q[o + 2] = ro(Q[o + 2], l)) : (o = Q.length,
            Q.push(s, a, l),
            r.addListener ? r.addListener(fo) : r.addEventListener("change", fo)),
            Q[o + 3] = r.matches)),
            Si = 0;
        return Q
    }
    ,
    n.clearMatchMedia = function(i) {
        i || (Q.length = 0),
        i = Q.indexOf(i),
        i >= 0 && Q.splice(i, 4)
    }
    ,
    n.isInViewport = function(i, r, s) {
        var o = (it(i) ? lt(i) : i).getBoundingClientRect()
          , a = o[s ? $t : Rt] * r || 0;
        return s ? o.right - a > 0 && o.left + a < H.innerWidth : o.bottom - a > 0 && o.top + a < H.innerHeight
    }
    ,
    n.positionInViewport = function(i, r, s) {
        it(i) && (i = lt(i));
        var o = i.getBoundingClientRect()
          , a = o[s ? $t : Rt]
          , l = r == null ? a / 2 : r in en ? en[r] * a : ~r.indexOf("%") ? parseFloat(r) * a / 100 : parseFloat(r) || 0;
        return s ? (o.left + l) / H.innerWidth : (o.top + l) / H.innerHeight
    }
    ,
    n
}();
X.version = "3.9.1";
X.saveStyles = function(n) {
    return n ? lr(n).forEach(function(e) {
        if (e && e.style) {
            var t = je.indexOf(e);
            t >= 0 && je.splice(t, 5),
            je.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), L.core.getCache(e), Si)
        }
    }) : je
}
;
X.revert = function(n, e) {
    return tn(!n, e)
}
;
X.create = function(n, e) {
    return new X(n,e)
}
;
X.refresh = function(n) {
    return n ? Ki() : (_i || X.register()) && Ci(!0)
}
;
X.update = ks;
X.clearScrollMemory = Na;
X.maxScroll = function(n, e) {
    return Jr(n, e ? nt : Ce)
}
;
X.getScrollFunc = function(n, e) {
    return Qr(lt(n), e ? nt : Ce)
}
;
X.getById = function(n) {
    return ss[n]
}
;
X.getAll = function() {
    return N.slice(0)
}
;
X.isScrolling = function() {
    return !!st
}
;
X.snapDirectional = Ps;
X.addEventListener = function(n, e) {
    var t = fr[n] || (fr[n] = []);
    ~t.indexOf(e) || t.push(e)
}
;
X.removeEventListener = function(n, e) {
    var t = fr[n]
      , i = t && t.indexOf(e);
    i >= 0 && t.splice(i, 1)
}
;
X.batch = function(n, e) {
    var t = [], i = {}, r = e.interval || .016, s = e.batchMax || 1e9, o = function(f, u) {
        var p = []
          , c = []
          , d = L.delayedCall(r, function() {
            u(p, c),
            p = [],
            c = []
        }).pause();
        return function(g) {
            p.length || d.restart(!0),
            p.push(g.trigger),
            c.push(g),
            s <= p.length && d.progress(1)
        }
    }, a;
    for (a in e)
        i[a] = a.substr(0, 2) === "on" && ut(e[a]) && a !== "onRefreshInit" ? o(a, e[a]) : e[a];
    return ut(s) && (s = s(),
    xe(X, "refresh", function() {
        return s = e.batchMax()
    })),
    lr(n).forEach(function(l) {
        var f = {};
        for (a in i)
            f[a] = i[a];
        f.trigger = l,
        t.push(X.create(f))
    }),
    t
}
;
X.sort = function(n) {
    return N.sort(n || function(e, t) {
        return (e.vars.refreshPriority || 0) * -1e6 + e.start - (t.start + (t.vars.refreshPriority || 0) * -1e6)
    }
    )
}
;
za() && L.registerPlugin(X);
function go(n) {
    return n !== null && typeof n == "object" && "constructor"in n && n.constructor === Object
}
function Os(n={}, e={}) {
    Object.keys(e).forEach(t=>{
        typeof n[t] == "undefined" ? n[t] = e[t] : go(e[t]) && go(n[t]) && Object.keys(e[t]).length > 0 && Os(n[t], e[t])
    }
    )
}
const Va = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector() {
        return null
    },
    querySelectorAll() {
        return []
    },
    getElementById() {
        return null
    },
    createEvent() {
        return {
            initEvent() {}
        }
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName() {
                return []
            }
        }
    },
    createElementNS() {
        return {}
    },
    importNode() {
        return null
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};
function ge() {
    const n = typeof document != "undefined" ? document : {};
    return Os(n, Va),
    n
}
const qf = {
    document: Va,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
        return {
            getPropertyValue() {
                return ""
            }
        }
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
        return {}
    },
    requestAnimationFrame(n) {
        return typeof setTimeout == "undefined" ? (n(),
        null) : setTimeout(n, 0)
    },
    cancelAnimationFrame(n) {
        typeof setTimeout != "undefined" && clearTimeout(n)
    }
};
function de() {
    const n = typeof window != "undefined" ? window : {};
    return Os(n, qf),
    n
}
function Uf(n) {
    const e = n.__proto__;
    Object.defineProperty(n, "__proto__", {
        get() {
            return e
        },
        set(t) {
            e.__proto__ = t
        }
    })
}
class It extends Array {
    constructor(e) {
        if (typeof e == "number")
            super(e);
        else {
            super(...e || []);
            Uf(this)
        }
    }
}
function mr(n=[]) {
    const e = [];
    return n.forEach(t=>{
        Array.isArray(t) ? e.push(...mr(t)) : e.push(t)
    }
    ),
    e
}
function Ga(n, e) {
    return Array.prototype.filter.call(n, e)
}
function Kf(n) {
    const e = [];
    for (let t = 0; t < n.length; t += 1)
        e.indexOf(n[t]) === -1 && e.push(n[t]);
    return e
}
function Zf(n, e) {
    if (typeof n != "string")
        return [n];
    const t = []
      , i = e.querySelectorAll(n);
    for (let r = 0; r < i.length; r += 1)
        t.push(i[r]);
    return t
}
function M(n, e) {
    const t = de()
      , i = ge();
    let r = [];
    if (!e && n instanceof It)
        return n;
    if (!n)
        return new It(r);
    if (typeof n == "string") {
        const s = n.trim();
        if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
            let o = "div";
            s.indexOf("<li") === 0 && (o = "ul"),
            s.indexOf("<tr") === 0 && (o = "tbody"),
            (s.indexOf("<td") === 0 || s.indexOf("<th") === 0) && (o = "tr"),
            s.indexOf("<tbody") === 0 && (o = "table"),
            s.indexOf("<option") === 0 && (o = "select");
            const a = i.createElement(o);
            a.innerHTML = s;
            for (let l = 0; l < a.childNodes.length; l += 1)
                r.push(a.childNodes[l])
        } else
            r = Zf(n.trim(), e || i)
    } else if (n.nodeType || n === t || n === i)
        r.push(n);
    else if (Array.isArray(n)) {
        if (n instanceof It)
            return n;
        r = n
    }
    return new It(Kf(r))
}
M.fn = It.prototype;
function Qf(...n) {
    const e = mr(n.map(t=>t.split(" ")));
    return this.forEach(t=>{
        t.classList.add(...e)
    }
    ),
    this
}
function Jf(...n) {
    const e = mr(n.map(t=>t.split(" ")));
    return this.forEach(t=>{
        t.classList.remove(...e)
    }
    ),
    this
}
function eu(...n) {
    const e = mr(n.map(t=>t.split(" ")));
    this.forEach(t=>{
        e.forEach(i=>{
            t.classList.toggle(i)
        }
        )
    }
    )
}
function tu(...n) {
    const e = mr(n.map(t=>t.split(" ")));
    return Ga(this, t=>e.filter(i=>t.classList.contains(i)).length > 0).length > 0
}
function iu(n, e) {
    if (arguments.length === 1 && typeof n == "string")
        return this[0] ? this[0].getAttribute(n) : void 0;
    for (let t = 0; t < this.length; t += 1)
        if (arguments.length === 2)
            this[t].setAttribute(n, e);
        else
            for (const i in n)
                this[t][i] = n[i],
                this[t].setAttribute(i, n[i]);
    return this
}
function ru(n) {
    for (let e = 0; e < this.length; e += 1)
        this[e].removeAttribute(n);
    return this
}
function nu(n) {
    for (let e = 0; e < this.length; e += 1)
        this[e].style.transform = n;
    return this
}
function su(n) {
    for (let e = 0; e < this.length; e += 1)
        this[e].style.transitionDuration = typeof n != "string" ? `${n}ms` : n;
    return this
}
function ou(...n) {
    let[e,t,i,r] = n;
    typeof n[1] == "function" && ([e,i,r] = n,
    t = void 0),
    r || (r = !1);
    function s(f) {
        const u = f.target;
        if (!u)
            return;
        const p = f.target.dom7EventData || [];
        if (p.indexOf(f) < 0 && p.unshift(f),
        M(u).is(t))
            i.apply(u, p);
        else {
            const c = M(u).parents();
            for (let d = 0; d < c.length; d += 1)
                M(c[d]).is(t) && i.apply(c[d], p)
        }
    }
    function o(f) {
        const u = f && f.target ? f.target.dom7EventData || [] : [];
        u.indexOf(f) < 0 && u.unshift(f),
        i.apply(this, u)
    }
    const a = e.split(" ");
    let l;
    for (let f = 0; f < this.length; f += 1) {
        const u = this[f];
        if (t)
            for (l = 0; l < a.length; l += 1) {
                const p = a[l];
                u.dom7LiveListeners || (u.dom7LiveListeners = {}),
                u.dom7LiveListeners[p] || (u.dom7LiveListeners[p] = []),
                u.dom7LiveListeners[p].push({
                    listener: i,
                    proxyListener: s
                }),
                u.addEventListener(p, s, r)
            }
        else
            for (l = 0; l < a.length; l += 1) {
                const p = a[l];
                u.dom7Listeners || (u.dom7Listeners = {}),
                u.dom7Listeners[p] || (u.dom7Listeners[p] = []),
                u.dom7Listeners[p].push({
                    listener: i,
                    proxyListener: o
                }),
                u.addEventListener(p, o, r)
            }
    }
    return this
}
function au(...n) {
    let[e,t,i,r] = n;
    typeof n[1] == "function" && ([e,i,r] = n,
    t = void 0),
    r || (r = !1);
    const s = e.split(" ");
    for (let o = 0; o < s.length; o += 1) {
        const a = s[o];
        for (let l = 0; l < this.length; l += 1) {
            const f = this[l];
            let u;
            if (!t && f.dom7Listeners ? u = f.dom7Listeners[a] : t && f.dom7LiveListeners && (u = f.dom7LiveListeners[a]),
            u && u.length)
                for (let p = u.length - 1; p >= 0; p -= 1) {
                    const c = u[p];
                    i && c.listener === i || i && c.listener && c.listener.dom7proxy && c.listener.dom7proxy === i ? (f.removeEventListener(a, c.proxyListener, r),
                    u.splice(p, 1)) : i || (f.removeEventListener(a, c.proxyListener, r),
                    u.splice(p, 1))
                }
        }
    }
    return this
}
function lu(...n) {
    const e = de()
      , t = n[0].split(" ")
      , i = n[1];
    for (let r = 0; r < t.length; r += 1) {
        const s = t[r];
        for (let o = 0; o < this.length; o += 1) {
            const a = this[o];
            if (e.CustomEvent) {
                const l = new e.CustomEvent(s,{
                    detail: i,
                    bubbles: !0,
                    cancelable: !0
                });
                a.dom7EventData = n.filter((f,u)=>u > 0),
                a.dispatchEvent(l),
                a.dom7EventData = [],
                delete a.dom7EventData
            }
        }
    }
    return this
}
function fu(n) {
    const e = this;
    function t(i) {
        i.target === this && (n.call(this, i),
        e.off("transitionend", t))
    }
    return n && e.on("transitionend", t),
    this
}
function uu(n) {
    if (this.length > 0) {
        if (n) {
            const e = this.styles();
            return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
        }
        return this[0].offsetWidth
    }
    return null
}
function cu(n) {
    if (this.length > 0) {
        if (n) {
            const e = this.styles();
            return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
        }
        return this[0].offsetHeight
    }
    return null
}
function du() {
    if (this.length > 0) {
        const n = de()
          , e = ge()
          , t = this[0]
          , i = t.getBoundingClientRect()
          , r = e.body
          , s = t.clientTop || r.clientTop || 0
          , o = t.clientLeft || r.clientLeft || 0
          , a = t === n ? n.scrollY : t.scrollTop
          , l = t === n ? n.scrollX : t.scrollLeft;
        return {
            top: i.top + a - s,
            left: i.left + l - o
        }
    }
    return null
}
function pu() {
    const n = de();
    return this[0] ? n.getComputedStyle(this[0], null) : {}
}
function hu(n, e) {
    const t = de();
    let i;
    if (arguments.length === 1)
        if (typeof n == "string") {
            if (this[0])
                return t.getComputedStyle(this[0], null).getPropertyValue(n)
        } else {
            for (i = 0; i < this.length; i += 1)
                for (const r in n)
                    this[i].style[r] = n[r];
            return this
        }
    if (arguments.length === 2 && typeof n == "string") {
        for (i = 0; i < this.length; i += 1)
            this[i].style[n] = e;
        return this
    }
    return this
}
function gu(n) {
    return n ? (this.forEach((e,t)=>{
        n.apply(e, [e, t])
    }
    ),
    this) : this
}
function mu(n) {
    const e = Ga(this, n);
    return M(e)
}
function _u(n) {
    if (typeof n == "undefined")
        return this[0] ? this[0].innerHTML : null;
    for (let e = 0; e < this.length; e += 1)
        this[e].innerHTML = n;
    return this
}
function vu(n) {
    if (typeof n == "undefined")
        return this[0] ? this[0].textContent.trim() : null;
    for (let e = 0; e < this.length; e += 1)
        this[e].textContent = n;
    return this
}
function yu(n) {
    const e = de()
      , t = ge()
      , i = this[0];
    let r, s;
    if (!i || typeof n == "undefined")
        return !1;
    if (typeof n == "string") {
        if (i.matches)
            return i.matches(n);
        if (i.webkitMatchesSelector)
            return i.webkitMatchesSelector(n);
        if (i.msMatchesSelector)
            return i.msMatchesSelector(n);
        for (r = M(n),
        s = 0; s < r.length; s += 1)
            if (r[s] === i)
                return !0;
        return !1
    }
    if (n === t)
        return i === t;
    if (n === e)
        return i === e;
    if (n.nodeType || n instanceof It) {
        for (r = n.nodeType ? [n] : n,
        s = 0; s < r.length; s += 1)
            if (r[s] === i)
                return !0;
        return !1
    }
    return !1
}
function wu() {
    let n = this[0], e;
    if (n) {
        for (e = 0; (n = n.previousSibling) !== null; )
            n.nodeType === 1 && (e += 1);
        return e
    }
}
function bu(n) {
    if (typeof n == "undefined")
        return this;
    const e = this.length;
    if (n > e - 1)
        return M([]);
    if (n < 0) {
        const t = e + n;
        return t < 0 ? M([]) : M([this[t]])
    }
    return M([this[n]])
}
function Tu(...n) {
    let e;
    const t = ge();
    for (let i = 0; i < n.length; i += 1) {
        e = n[i];
        for (let r = 0; r < this.length; r += 1)
            if (typeof e == "string") {
                const s = t.createElement("div");
                for (s.innerHTML = e; s.firstChild; )
                    this[r].appendChild(s.firstChild)
            } else if (e instanceof It)
                for (let s = 0; s < e.length; s += 1)
                    this[r].appendChild(e[s]);
            else
                this[r].appendChild(e)
    }
    return this
}
function xu(n) {
    const e = ge();
    let t, i;
    for (t = 0; t < this.length; t += 1)
        if (typeof n == "string") {
            const r = e.createElement("div");
            for (r.innerHTML = n,
            i = r.childNodes.length - 1; i >= 0; i -= 1)
                this[t].insertBefore(r.childNodes[i], this[t].childNodes[0])
        } else if (n instanceof It)
            for (i = 0; i < n.length; i += 1)
                this[t].insertBefore(n[i], this[t].childNodes[0]);
        else
            this[t].insertBefore(n, this[t].childNodes[0]);
    return this
}
function Su(n) {
    return this.length > 0 ? n ? this[0].nextElementSibling && M(this[0].nextElementSibling).is(n) ? M([this[0].nextElementSibling]) : M([]) : this[0].nextElementSibling ? M([this[0].nextElementSibling]) : M([]) : M([])
}
function Cu(n) {
    const e = [];
    let t = this[0];
    if (!t)
        return M([]);
    for (; t.nextElementSibling; ) {
        const i = t.nextElementSibling;
        n ? M(i).is(n) && e.push(i) : e.push(i),
        t = i
    }
    return M(e)
}
function Eu(n) {
    if (this.length > 0) {
        const e = this[0];
        return n ? e.previousElementSibling && M(e.previousElementSibling).is(n) ? M([e.previousElementSibling]) : M([]) : e.previousElementSibling ? M([e.previousElementSibling]) : M([])
    }
    return M([])
}
function Pu(n) {
    const e = [];
    let t = this[0];
    if (!t)
        return M([]);
    for (; t.previousElementSibling; ) {
        const i = t.previousElementSibling;
        n ? M(i).is(n) && e.push(i) : e.push(i),
        t = i
    }
    return M(e)
}
function ku(n) {
    const e = [];
    for (let t = 0; t < this.length; t += 1)
        this[t].parentNode !== null && (n ? M(this[t].parentNode).is(n) && e.push(this[t].parentNode) : e.push(this[t].parentNode));
    return M(e)
}
function Ou(n) {
    const e = [];
    for (let t = 0; t < this.length; t += 1) {
        let i = this[t].parentNode;
        for (; i; )
            n ? M(i).is(n) && e.push(i) : e.push(i),
            i = i.parentNode
    }
    return M(e)
}
function Mu(n) {
    let e = this;
    return typeof n == "undefined" ? M([]) : (e.is(n) || (e = e.parents(n).eq(0)),
    e)
}
function Lu(n) {
    const e = [];
    for (let t = 0; t < this.length; t += 1) {
        const i = this[t].querySelectorAll(n);
        for (let r = 0; r < i.length; r += 1)
            e.push(i[r])
    }
    return M(e)
}
function Au(n) {
    const e = [];
    for (let t = 0; t < this.length; t += 1) {
        const i = this[t].children;
        for (let r = 0; r < i.length; r += 1)
            (!n || M(i[r]).is(n)) && e.push(i[r])
    }
    return M(e)
}
function Iu() {
    for (let n = 0; n < this.length; n += 1)
        this[n].parentNode && this[n].parentNode.removeChild(this[n]);
    return this
}
const mo = {
    addClass: Qf,
    removeClass: Jf,
    hasClass: tu,
    toggleClass: eu,
    attr: iu,
    removeAttr: ru,
    transform: nu,
    transition: su,
    on: ou,
    off: au,
    trigger: lu,
    transitionEnd: fu,
    outerWidth: uu,
    outerHeight: cu,
    styles: pu,
    offset: du,
    css: hu,
    each: gu,
    html: _u,
    text: vu,
    is: yu,
    index: wu,
    eq: bu,
    append: Tu,
    prepend: xu,
    next: Su,
    nextAll: Cu,
    prev: Eu,
    prevAll: Pu,
    parent: ku,
    parents: Ou,
    closest: Mu,
    find: Lu,
    children: Au,
    filter: mu,
    remove: Iu
};
Object.keys(mo).forEach(n=>{
    Object.defineProperty(M.fn, n, {
        value: mo[n],
        writable: !0
    })
}
);
function Du(n) {
    const e = n;
    Object.keys(e).forEach(t=>{
        try {
            e[t] = null
        } catch {}
        try {
            delete e[t]
        } catch {}
    }
    )
}
function rn(n, e) {
    return e === void 0 && (e = 0),
    setTimeout(n, e)
}
function cr() {
    return Date.now()
}
function zu(n) {
    const e = de();
    let t;
    return e.getComputedStyle && (t = e.getComputedStyle(n, null)),
    !t && n.currentStyle && (t = n.currentStyle),
    t || (t = n.style),
    t
}
function $u(n, e) {
    e === void 0 && (e = "x");
    const t = de();
    let i, r, s;
    const o = zu(n);
    return t.WebKitCSSMatrix ? (r = o.transform || o.webkitTransform,
    r.split(",").length > 6 && (r = r.split(", ").map(a=>a.replace(",", ".")).join(", ")),
    s = new t.WebKitCSSMatrix(r === "none" ? "" : r)) : (s = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
    i = s.toString().split(",")),
    e === "x" && (t.WebKitCSSMatrix ? r = s.m41 : i.length === 16 ? r = parseFloat(i[12]) : r = parseFloat(i[4])),
    e === "y" && (t.WebKitCSSMatrix ? r = s.m42 : i.length === 16 ? r = parseFloat(i[13]) : r = parseFloat(i[5])),
    r || 0
}
function Zi(n) {
    return typeof n == "object" && n !== null && n.constructor && Object.prototype.toString.call(n).slice(8, -1) === "Object"
}
function Ru(n) {
    return typeof window != "undefined" && typeof window.HTMLElement != "undefined" ? n instanceof HTMLElement : n && (n.nodeType === 1 || n.nodeType === 11)
}
function Fe() {
    const n = Object(arguments.length <= 0 ? void 0 : arguments[0])
      , e = ["__proto__", "constructor", "prototype"];
    for (let t = 1; t < arguments.length; t += 1) {
        const i = t < 0 || arguments.length <= t ? void 0 : arguments[t];
        if (i != null && !Ru(i)) {
            const r = Object.keys(Object(i)).filter(s=>e.indexOf(s) < 0);
            for (let s = 0, o = r.length; s < o; s += 1) {
                const a = r[s]
                  , l = Object.getOwnPropertyDescriptor(i, a);
                l !== void 0 && l.enumerable && (Zi(n[a]) && Zi(i[a]) ? i[a].__swiper__ ? n[a] = i[a] : Fe(n[a], i[a]) : !Zi(n[a]) && Zi(i[a]) ? (n[a] = {},
                i[a].__swiper__ ? n[a] = i[a] : Fe(n[a], i[a])) : n[a] = i[a])
            }
        }
    }
    return n
}
function Lr(n, e, t) {
    n.style.setProperty(e, t)
}
function Wa(n) {
    let {swiper: e, targetPosition: t, side: i} = n;
    const r = de()
      , s = -e.translate;
    let o = null, a;
    const l = e.params.speed;
    e.wrapperEl.style.scrollSnapType = "none",
    r.cancelAnimationFrame(e.cssModeFrameID);
    const f = t > s ? "next" : "prev"
      , u = (c,d)=>f === "next" && c >= d || f === "prev" && c <= d
      , p = ()=>{
        a = new Date().getTime(),
        o === null && (o = a);
        const c = Math.max(Math.min((a - o) / l, 1), 0)
          , d = .5 - Math.cos(c * Math.PI) / 2;
        let g = s + d * (t - s);
        if (u(g, t) && (g = t),
        e.wrapperEl.scrollTo({
            [i]: g
        }),
        u(g, t)) {
            e.wrapperEl.style.overflow = "hidden",
            e.wrapperEl.style.scrollSnapType = "",
            setTimeout(()=>{
                e.wrapperEl.style.overflow = "",
                e.wrapperEl.scrollTo({
                    [i]: g
                })
            }
            ),
            r.cancelAnimationFrame(e.cssModeFrameID);
            return
        }
        e.cssModeFrameID = r.requestAnimationFrame(p)
    }
    ;
    p()
}
let Rn;
function Fu() {
    const n = de()
      , e = ge();
    return {
        smoothScroll: e.documentElement && "scrollBehavior"in e.documentElement.style,
        touch: !!("ontouchstart"in n || n.DocumentTouch && e instanceof n.DocumentTouch),
        passiveListener: function() {
            let i = !1;
            try {
                const r = Object.defineProperty({}, "passive", {
                    get() {
                        i = !0
                    }
                });
                n.addEventListener("testPassiveListener", null, r)
            } catch {}
            return i
        }(),
        gestures: function() {
            return "ongesturestart"in n
        }()
    }
}
function ja() {
    return Rn || (Rn = Fu()),
    Rn
}
let Fn;
function Bu(n) {
    let {userAgent: e} = n === void 0 ? {} : n;
    const t = ja()
      , i = de()
      , r = i.navigator.platform
      , s = e || i.navigator.userAgent
      , o = {
        ios: !1,
        android: !1
    }
      , a = i.screen.width
      , l = i.screen.height
      , f = s.match(/(Android);?[\s\/]+([\d.]+)?/);
    let u = s.match(/(iPad).*OS\s([\d_]+)/);
    const p = s.match(/(iPod)(.*OS\s([\d_]+))?/)
      , c = !u && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
      , d = r === "Win32";
    let g = r === "MacIntel";
    const h = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    return !u && g && t.touch && h.indexOf(`${a}x${l}`) >= 0 && (u = s.match(/(Version)\/([\d.]+)/),
    u || (u = [0, 1, "13_0_0"]),
    g = !1),
    f && !d && (o.os = "android",
    o.android = !0),
    (u || c || p) && (o.os = "ios",
    o.ios = !0),
    o
}
function Nu(n) {
    return n === void 0 && (n = {}),
    Fn || (Fn = Bu(n)),
    Fn
}
let Bn;
function Vu() {
    const n = de();
    function e() {
        const t = n.navigator.userAgent.toLowerCase();
        return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
    }
    return {
        isSafari: e(),
        isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(n.navigator.userAgent)
    }
}
function Gu() {
    return Bn || (Bn = Vu()),
    Bn
}
function Wu(n) {
    let {swiper: e, on: t, emit: i} = n;
    const r = de();
    let s = null
      , o = null;
    const a = ()=>{
        !e || e.destroyed || !e.initialized || (i("beforeResize"),
        i("resize"))
    }
      , l = ()=>{
        !e || e.destroyed || !e.initialized || (s = new ResizeObserver(p=>{
            o = r.requestAnimationFrame(()=>{
                const {width: c, height: d} = e;
                let g = c
                  , h = d;
                p.forEach(m=>{
                    let {contentBoxSize: v, contentRect: b, target: y} = m;
                    y && y !== e.el || (g = b ? b.width : (v[0] || v).inlineSize,
                    h = b ? b.height : (v[0] || v).blockSize)
                }
                ),
                (g !== c || h !== d) && a()
            }
            )
        }
        ),
        s.observe(e.el))
    }
      , f = ()=>{
        o && r.cancelAnimationFrame(o),
        s && s.unobserve && e.el && (s.unobserve(e.el),
        s = null)
    }
      , u = ()=>{
        !e || e.destroyed || !e.initialized || i("orientationchange")
    }
    ;
    t("init", ()=>{
        if (e.params.resizeObserver && typeof r.ResizeObserver != "undefined") {
            l();
            return
        }
        r.addEventListener("resize", a),
        r.addEventListener("orientationchange", u)
    }
    ),
    t("destroy", ()=>{
        f(),
        r.removeEventListener("resize", a),
        r.removeEventListener("orientationchange", u)
    }
    )
}
function ju(n) {
    let {swiper: e, extendParams: t, on: i, emit: r} = n;
    const s = []
      , o = de()
      , a = function(u, p) {
        p === void 0 && (p = {});
        const c = o.MutationObserver || o.WebkitMutationObserver
          , d = new c(g=>{
            if (g.length === 1) {
                r("observerUpdate", g[0]);
                return
            }
            const h = function() {
                r("observerUpdate", g[0])
            };
            o.requestAnimationFrame ? o.requestAnimationFrame(h) : o.setTimeout(h, 0)
        }
        );
        d.observe(u, {
            attributes: typeof p.attributes == "undefined" ? !0 : p.attributes,
            childList: typeof p.childList == "undefined" ? !0 : p.childList,
            characterData: typeof p.characterData == "undefined" ? !0 : p.characterData
        }),
        s.push(d)
    }
      , l = ()=>{
        if (!!e.params.observer) {
            if (e.params.observeParents) {
                const u = e.$el.parents();
                for (let p = 0; p < u.length; p += 1)
                    a(u[p])
            }
            a(e.$el[0], {
                childList: e.params.observeSlideChildren
            }),
            a(e.$wrapperEl[0], {
                attributes: !1
            })
        }
    }
      , f = ()=>{
        s.forEach(u=>{
            u.disconnect()
        }
        ),
        s.splice(0, s.length)
    }
    ;
    t({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }),
    i("init", l),
    i("destroy", f)
}
var Yu = {
    on(n, e, t) {
        const i = this;
        if (typeof e != "function")
            return i;
        const r = t ? "unshift" : "push";
        return n.split(" ").forEach(s=>{
            i.eventsListeners[s] || (i.eventsListeners[s] = []),
            i.eventsListeners[s][r](e)
        }
        ),
        i
    },
    once(n, e, t) {
        const i = this;
        if (typeof e != "function")
            return i;
        function r() {
            i.off(n, r),
            r.__emitterProxy && delete r.__emitterProxy;
            for (var s = arguments.length, o = new Array(s), a = 0; a < s; a++)
                o[a] = arguments[a];
            e.apply(i, o)
        }
        return r.__emitterProxy = e,
        i.on(n, r, t)
    },
    onAny(n, e) {
        const t = this;
        if (typeof n != "function")
            return t;
        const i = e ? "unshift" : "push";
        return t.eventsAnyListeners.indexOf(n) < 0 && t.eventsAnyListeners[i](n),
        t
    },
    offAny(n) {
        const e = this;
        if (!e.eventsAnyListeners)
            return e;
        const t = e.eventsAnyListeners.indexOf(n);
        return t >= 0 && e.eventsAnyListeners.splice(t, 1),
        e
    },
    off(n, e) {
        const t = this;
        return t.eventsListeners && n.split(" ").forEach(i=>{
            typeof e == "undefined" ? t.eventsListeners[i] = [] : t.eventsListeners[i] && t.eventsListeners[i].forEach((r,s)=>{
                (r === e || r.__emitterProxy && r.__emitterProxy === e) && t.eventsListeners[i].splice(s, 1)
            }
            )
        }
        ),
        t
    },
    emit() {
        const n = this;
        if (!n.eventsListeners)
            return n;
        let e, t, i;
        for (var r = arguments.length, s = new Array(r), o = 0; o < r; o++)
            s[o] = arguments[o];
        return typeof s[0] == "string" || Array.isArray(s[0]) ? (e = s[0],
        t = s.slice(1, s.length),
        i = n) : (e = s[0].events,
        t = s[0].data,
        i = s[0].context || n),
        t.unshift(i),
        (Array.isArray(e) ? e : e.split(" ")).forEach(l=>{
            n.eventsAnyListeners && n.eventsAnyListeners.length && n.eventsAnyListeners.forEach(f=>{
                f.apply(i, [l, ...t])
            }
            ),
            n.eventsListeners && n.eventsListeners[l] && n.eventsListeners[l].forEach(f=>{
                f.apply(i, t)
            }
            )
        }
        ),
        n
    }
};
function Xu() {
    const n = this;
    let e, t;
    const i = n.$el;
    typeof n.params.width != "undefined" && n.params.width !== null ? e = n.params.width : e = i[0].clientWidth,
    typeof n.params.height != "undefined" && n.params.height !== null ? t = n.params.height : t = i[0].clientHeight,
    !(e === 0 && n.isHorizontal() || t === 0 && n.isVertical()) && (e = e - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10),
    t = t - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10),
    Number.isNaN(e) && (e = 0),
    Number.isNaN(t) && (t = 0),
    Object.assign(n, {
        width: e,
        height: t,
        size: n.isHorizontal() ? e : t
    }))
}
function Hu() {
    const n = this;
    function e(E) {
        return n.isHorizontal() ? E : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        }[E]
    }
    function t(E, O) {
        return parseFloat(E.getPropertyValue(e(O)) || 0)
    }
    const i = n.params
      , {$wrapperEl: r, size: s, rtlTranslate: o, wrongRTL: a} = n
      , l = n.virtual && i.virtual.enabled
      , f = l ? n.virtual.slides.length : n.slides.length
      , u = r.children(`.${n.params.slideClass}`)
      , p = l ? n.virtual.slides.length : u.length;
    let c = [];
    const d = []
      , g = [];
    let h = i.slidesOffsetBefore;
    typeof h == "function" && (h = i.slidesOffsetBefore.call(n));
    let m = i.slidesOffsetAfter;
    typeof m == "function" && (m = i.slidesOffsetAfter.call(n));
    const v = n.snapGrid.length
      , b = n.slidesGrid.length;
    let y = i.spaceBetween
      , _ = -h
      , T = 0
      , x = 0;
    if (typeof s == "undefined")
        return;
    typeof y == "string" && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * s),
    n.virtualSize = -y,
    o ? u.css({
        marginLeft: "",
        marginBottom: "",
        marginTop: ""
    }) : u.css({
        marginRight: "",
        marginBottom: "",
        marginTop: ""
    }),
    i.centeredSlides && i.cssMode && (Lr(n.wrapperEl, "--swiper-centered-offset-before", ""),
    Lr(n.wrapperEl, "--swiper-centered-offset-after", ""));
    const w = i.grid && i.grid.rows > 1 && n.grid;
    w && n.grid.initSlides(p);
    let C;
    const P = i.slidesPerView === "auto" && i.breakpoints && Object.keys(i.breakpoints).filter(E=>typeof i.breakpoints[E].slidesPerView != "undefined").length > 0;
    for (let E = 0; E < p; E += 1) {
        C = 0;
        const O = u.eq(E);
        if (w && n.grid.updateSlide(E, O, p, e),
        O.css("display") !== "none") {
            if (i.slidesPerView === "auto") {
                P && (u[E].style[e("width")] = "");
                const k = getComputedStyle(O[0])
                  , D = O[0].style.transform
                  , z = O[0].style.webkitTransform;
                if (D && (O[0].style.transform = "none"),
                z && (O[0].style.webkitTransform = "none"),
                i.roundLengths)
                    C = n.isHorizontal() ? O.outerWidth(!0) : O.outerHeight(!0);
                else {
                    const F = t(k, "width")
                      , V = t(k, "padding-left")
                      , te = t(k, "padding-right")
                      , Pe = t(k, "margin-left")
                      , ze = t(k, "margin-right")
                      , S = k.getPropertyValue("box-sizing");
                    if (S && S === "border-box")
                        C = F + Pe + ze;
                    else {
                        const {clientWidth: ke, offsetWidth: si} = O[0];
                        C = F + V + te + Pe + ze + (si - ke)
                    }
                }
                D && (O[0].style.transform = D),
                z && (O[0].style.webkitTransform = z),
                i.roundLengths && (C = Math.floor(C))
            } else
                C = (s - (i.slidesPerView - 1) * y) / i.slidesPerView,
                i.roundLengths && (C = Math.floor(C)),
                u[E] && (u[E].style[e("width")] = `${C}px`);
            u[E] && (u[E].swiperSlideSize = C),
            g.push(C),
            i.centeredSlides ? (_ = _ + C / 2 + T / 2 + y,
            T === 0 && E !== 0 && (_ = _ - s / 2 - y),
            E === 0 && (_ = _ - s / 2 - y),
            Math.abs(_) < 1 / 1e3 && (_ = 0),
            i.roundLengths && (_ = Math.floor(_)),
            x % i.slidesPerGroup === 0 && c.push(_),
            d.push(_)) : (i.roundLengths && (_ = Math.floor(_)),
            (x - Math.min(n.params.slidesPerGroupSkip, x)) % n.params.slidesPerGroup === 0 && c.push(_),
            d.push(_),
            _ = _ + C + y),
            n.virtualSize += C + y,
            T = C,
            x += 1
        }
    }
    if (n.virtualSize = Math.max(n.virtualSize, s) + m,
    o && a && (i.effect === "slide" || i.effect === "coverflow") && r.css({
        width: `${n.virtualSize + i.spaceBetween}px`
    }),
    i.setWrapperSize && r.css({
        [e("width")]: `${n.virtualSize + i.spaceBetween}px`
    }),
    w && n.grid.updateWrapperSize(C, c, e),
    !i.centeredSlides) {
        const E = [];
        for (let O = 0; O < c.length; O += 1) {
            let k = c[O];
            i.roundLengths && (k = Math.floor(k)),
            c[O] <= n.virtualSize - s && E.push(k)
        }
        c = E,
        Math.floor(n.virtualSize - s) - Math.floor(c[c.length - 1]) > 1 && c.push(n.virtualSize - s)
    }
    if (c.length === 0 && (c = [0]),
    i.spaceBetween !== 0) {
        const E = n.isHorizontal() && o ? "marginLeft" : e("marginRight");
        u.filter((O,k)=>i.cssMode ? k !== u.length - 1 : !0).css({
            [E]: `${y}px`
        })
    }
    if (i.centeredSlides && i.centeredSlidesBounds) {
        let E = 0;
        g.forEach(k=>{
            E += k + (i.spaceBetween ? i.spaceBetween : 0)
        }
        ),
        E -= i.spaceBetween;
        const O = E - s;
        c = c.map(k=>k < 0 ? -h : k > O ? O + m : k)
    }
    if (i.centerInsufficientSlides) {
        let E = 0;
        if (g.forEach(O=>{
            E += O + (i.spaceBetween ? i.spaceBetween : 0)
        }
        ),
        E -= i.spaceBetween,
        E < s) {
            const O = (s - E) / 2;
            c.forEach((k,D)=>{
                c[D] = k - O
            }
            ),
            d.forEach((k,D)=>{
                d[D] = k + O
            }
            )
        }
    }
    if (Object.assign(n, {
        slides: u,
        snapGrid: c,
        slidesGrid: d,
        slidesSizesGrid: g
    }),
    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
        Lr(n.wrapperEl, "--swiper-centered-offset-before", `${-c[0]}px`),
        Lr(n.wrapperEl, "--swiper-centered-offset-after", `${n.size / 2 - g[g.length - 1] / 2}px`);
        const E = -n.snapGrid[0]
          , O = -n.slidesGrid[0];
        n.snapGrid = n.snapGrid.map(k=>k + E),
        n.slidesGrid = n.slidesGrid.map(k=>k + O)
    }
    if (p !== f && n.emit("slidesLengthChange"),
    c.length !== v && (n.params.watchOverflow && n.checkOverflow(),
    n.emit("snapGridLengthChange")),
    d.length !== b && n.emit("slidesGridLengthChange"),
    i.watchSlidesProgress && n.updateSlidesOffset(),
    !l && !i.cssMode && (i.effect === "slide" || i.effect === "fade")) {
        const E = `${i.containerModifierClass}backface-hidden`
          , O = n.$el.hasClass(E);
        p <= i.maxBackfaceHiddenSlides ? O || n.$el.addClass(E) : O && n.$el.removeClass(E)
    }
}
function qu(n) {
    const e = this
      , t = []
      , i = e.virtual && e.params.virtual.enabled;
    let r = 0, s;
    typeof n == "number" ? e.setTransition(n) : n === !0 && e.setTransition(e.params.speed);
    const o = a=>i ? e.slides.filter(l=>parseInt(l.getAttribute("data-swiper-slide-index"), 10) === a)[0] : e.slides.eq(a)[0];
    if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
        if (e.params.centeredSlides)
            e.visibleSlides.each(a=>{
                t.push(a)
            }
            );
        else
            for (s = 0; s < Math.ceil(e.params.slidesPerView); s += 1) {
                const a = e.activeIndex + s;
                if (a > e.slides.length && !i)
                    break;
                t.push(o(a))
            }
    else
        t.push(o(e.activeIndex));
    for (s = 0; s < t.length; s += 1)
        if (typeof t[s] != "undefined") {
            const a = t[s].offsetHeight;
            r = a > r ? a : r
        }
    (r || r === 0) && e.$wrapperEl.css("height", `${r}px`)
}
function Uu() {
    const n = this
      , e = n.slides;
    for (let t = 0; t < e.length; t += 1)
        e[t].swiperSlideOffset = n.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
}
function Ku(n) {
    n === void 0 && (n = this && this.translate || 0);
    const e = this
      , t = e.params
      , {slides: i, rtlTranslate: r, snapGrid: s} = e;
    if (i.length === 0)
        return;
    typeof i[0].swiperSlideOffset == "undefined" && e.updateSlidesOffset();
    let o = -n;
    r && (o = n),
    i.removeClass(t.slideVisibleClass),
    e.visibleSlidesIndexes = [],
    e.visibleSlides = [];
    for (let a = 0; a < i.length; a += 1) {
        const l = i[a];
        let f = l.swiperSlideOffset;
        t.cssMode && t.centeredSlides && (f -= i[0].swiperSlideOffset);
        const u = (o + (t.centeredSlides ? e.minTranslate() : 0) - f) / (l.swiperSlideSize + t.spaceBetween)
          , p = (o - s[0] + (t.centeredSlides ? e.minTranslate() : 0) - f) / (l.swiperSlideSize + t.spaceBetween)
          , c = -(o - f)
          , d = c + e.slidesSizesGrid[a];
        (c >= 0 && c < e.size - 1 || d > 1 && d <= e.size || c <= 0 && d >= e.size) && (e.visibleSlides.push(l),
        e.visibleSlidesIndexes.push(a),
        i.eq(a).addClass(t.slideVisibleClass)),
        l.progress = r ? -u : u,
        l.originalProgress = r ? -p : p
    }
    e.visibleSlides = M(e.visibleSlides)
}
function Zu(n) {
    const e = this;
    if (typeof n == "undefined") {
        const f = e.rtlTranslate ? -1 : 1;
        n = e && e.translate && e.translate * f || 0
    }
    const t = e.params
      , i = e.maxTranslate() - e.minTranslate();
    let {progress: r, isBeginning: s, isEnd: o} = e;
    const a = s
      , l = o;
    i === 0 ? (r = 0,
    s = !0,
    o = !0) : (r = (n - e.minTranslate()) / i,
    s = r <= 0,
    o = r >= 1),
    Object.assign(e, {
        progress: r,
        isBeginning: s,
        isEnd: o
    }),
    (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && e.updateSlidesProgress(n),
    s && !a && e.emit("reachBeginning toEdge"),
    o && !l && e.emit("reachEnd toEdge"),
    (a && !s || l && !o) && e.emit("fromEdge"),
    e.emit("progress", r)
}
function Qu() {
    const n = this
      , {slides: e, params: t, $wrapperEl: i, activeIndex: r, realIndex: s} = n
      , o = n.virtual && t.virtual.enabled;
    e.removeClass(`${t.slideActiveClass} ${t.slideNextClass} ${t.slidePrevClass} ${t.slideDuplicateActiveClass} ${t.slideDuplicateNextClass} ${t.slideDuplicatePrevClass}`);
    let a;
    o ? a = n.$wrapperEl.find(`.${t.slideClass}[data-swiper-slide-index="${r}"]`) : a = e.eq(r),
    a.addClass(t.slideActiveClass),
    t.loop && (a.hasClass(t.slideDuplicateClass) ? i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${s}"]`).addClass(t.slideDuplicateActiveClass) : i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${s}"]`).addClass(t.slideDuplicateActiveClass));
    let l = a.nextAll(`.${t.slideClass}`).eq(0).addClass(t.slideNextClass);
    t.loop && l.length === 0 && (l = e.eq(0),
    l.addClass(t.slideNextClass));
    let f = a.prevAll(`.${t.slideClass}`).eq(0).addClass(t.slidePrevClass);
    t.loop && f.length === 0 && (f = e.eq(-1),
    f.addClass(t.slidePrevClass)),
    t.loop && (l.hasClass(t.slideDuplicateClass) ? i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(t.slideDuplicateNextClass) : i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(t.slideDuplicateNextClass),
    f.hasClass(t.slideDuplicateClass) ? i.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${f.attr("data-swiper-slide-index")}"]`).addClass(t.slideDuplicatePrevClass) : i.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${f.attr("data-swiper-slide-index")}"]`).addClass(t.slideDuplicatePrevClass)),
    n.emitSlidesClasses()
}
function Ju(n) {
    const e = this
      , t = e.rtlTranslate ? e.translate : -e.translate
      , {slidesGrid: i, snapGrid: r, params: s, activeIndex: o, realIndex: a, snapIndex: l} = e;
    let f = n, u;
    if (typeof f == "undefined") {
        for (let c = 0; c < i.length; c += 1)
            typeof i[c + 1] != "undefined" ? t >= i[c] && t < i[c + 1] - (i[c + 1] - i[c]) / 2 ? f = c : t >= i[c] && t < i[c + 1] && (f = c + 1) : t >= i[c] && (f = c);
        s.normalizeSlideIndex && (f < 0 || typeof f == "undefined") && (f = 0)
    }
    if (r.indexOf(t) >= 0)
        u = r.indexOf(t);
    else {
        const c = Math.min(s.slidesPerGroupSkip, f);
        u = c + Math.floor((f - c) / s.slidesPerGroup)
    }
    if (u >= r.length && (u = r.length - 1),
    f === o) {
        u !== l && (e.snapIndex = u,
        e.emit("snapIndexChange"));
        return
    }
    const p = parseInt(e.slides.eq(f).attr("data-swiper-slide-index") || f, 10);
    Object.assign(e, {
        snapIndex: u,
        realIndex: p,
        previousIndex: o,
        activeIndex: f
    }),
    e.emit("activeIndexChange"),
    e.emit("snapIndexChange"),
    a !== p && e.emit("realIndexChange"),
    (e.initialized || e.params.runCallbacksOnInit) && e.emit("slideChange")
}
function ec(n) {
    const e = this
      , t = e.params
      , i = M(n).closest(`.${t.slideClass}`)[0];
    let r = !1, s;
    if (i) {
        for (let o = 0; o < e.slides.length; o += 1)
            if (e.slides[o] === i) {
                r = !0,
                s = o;
                break
            }
    }
    if (i && r)
        e.clickedSlide = i,
        e.virtual && e.params.virtual.enabled ? e.clickedIndex = parseInt(M(i).attr("data-swiper-slide-index"), 10) : e.clickedIndex = s;
    else {
        e.clickedSlide = void 0,
        e.clickedIndex = void 0;
        return
    }
    t.slideToClickedSlide && e.clickedIndex !== void 0 && e.clickedIndex !== e.activeIndex && e.slideToClickedSlide()
}
var tc = {
    updateSize: Xu,
    updateSlides: Hu,
    updateAutoHeight: qu,
    updateSlidesOffset: Uu,
    updateSlidesProgress: Ku,
    updateProgress: Zu,
    updateSlidesClasses: Qu,
    updateActiveIndex: Ju,
    updateClickedSlide: ec
};
function ic(n) {
    n === void 0 && (n = this.isHorizontal() ? "x" : "y");
    const e = this
      , {params: t, rtlTranslate: i, translate: r, $wrapperEl: s} = e;
    if (t.virtualTranslate)
        return i ? -r : r;
    if (t.cssMode)
        return r;
    let o = $u(s[0], n);
    return i && (o = -o),
    o || 0
}
function rc(n, e) {
    const t = this
      , {rtlTranslate: i, params: r, $wrapperEl: s, wrapperEl: o, progress: a} = t;
    let l = 0
      , f = 0;
    const u = 0;
    t.isHorizontal() ? l = i ? -n : n : f = n,
    r.roundLengths && (l = Math.floor(l),
    f = Math.floor(f)),
    r.cssMode ? o[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -l : -f : r.virtualTranslate || s.transform(`translate3d(${l}px, ${f}px, ${u}px)`),
    t.previousTranslate = t.translate,
    t.translate = t.isHorizontal() ? l : f;
    let p;
    const c = t.maxTranslate() - t.minTranslate();
    c === 0 ? p = 0 : p = (n - t.minTranslate()) / c,
    p !== a && t.updateProgress(n),
    t.emit("setTranslate", t.translate, e)
}
function nc() {
    return -this.snapGrid[0]
}
function sc() {
    return -this.snapGrid[this.snapGrid.length - 1]
}
function oc(n, e, t, i, r) {
    n === void 0 && (n = 0),
    e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    i === void 0 && (i = !0);
    const s = this
      , {params: o, wrapperEl: a} = s;
    if (s.animating && o.preventInteractionOnTransition)
        return !1;
    const l = s.minTranslate()
      , f = s.maxTranslate();
    let u;
    if (i && n > l ? u = l : i && n < f ? u = f : u = n,
    s.updateProgress(u),
    o.cssMode) {
        const p = s.isHorizontal();
        if (e === 0)
            a[p ? "scrollLeft" : "scrollTop"] = -u;
        else {
            if (!s.support.smoothScroll)
                return Wa({
                    swiper: s,
                    targetPosition: -u,
                    side: p ? "left" : "top"
                }),
                !0;
            a.scrollTo({
                [p ? "left" : "top"]: -u,
                behavior: "smooth"
            })
        }
        return !0
    }
    return e === 0 ? (s.setTransition(0),
    s.setTranslate(u),
    t && (s.emit("beforeTransitionStart", e, r),
    s.emit("transitionEnd"))) : (s.setTransition(e),
    s.setTranslate(u),
    t && (s.emit("beforeTransitionStart", e, r),
    s.emit("transitionStart")),
    s.animating || (s.animating = !0,
    s.onTranslateToWrapperTransitionEnd || (s.onTranslateToWrapperTransitionEnd = function(c) {
        !s || s.destroyed || c.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onTranslateToWrapperTransitionEnd),
        s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd),
        s.onTranslateToWrapperTransitionEnd = null,
        delete s.onTranslateToWrapperTransitionEnd,
        t && s.emit("transitionEnd"))
    }
    ),
    s.$wrapperEl[0].addEventListener("transitionend", s.onTranslateToWrapperTransitionEnd),
    s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd))),
    !0
}
var ac = {
    getTranslate: ic,
    setTranslate: rc,
    minTranslate: nc,
    maxTranslate: sc,
    translateTo: oc
};
function lc(n, e) {
    const t = this;
    t.params.cssMode || t.$wrapperEl.transition(n),
    t.emit("setTransition", n, e)
}
function Ya(n) {
    let {swiper: e, runCallbacks: t, direction: i, step: r} = n;
    const {activeIndex: s, previousIndex: o} = e;
    let a = i;
    if (a || (s > o ? a = "next" : s < o ? a = "prev" : a = "reset"),
    e.emit(`transition${r}`),
    t && s !== o) {
        if (a === "reset") {
            e.emit(`slideResetTransition${r}`);
            return
        }
        e.emit(`slideChangeTransition${r}`),
        a === "next" ? e.emit(`slideNextTransition${r}`) : e.emit(`slidePrevTransition${r}`)
    }
}
function fc(n, e) {
    n === void 0 && (n = !0);
    const t = this
      , {params: i} = t;
    i.cssMode || (i.autoHeight && t.updateAutoHeight(),
    Ya({
        swiper: t,
        runCallbacks: n,
        direction: e,
        step: "Start"
    }))
}
function uc(n, e) {
    n === void 0 && (n = !0);
    const t = this
      , {params: i} = t;
    t.animating = !1,
    !i.cssMode && (t.setTransition(0),
    Ya({
        swiper: t,
        runCallbacks: n,
        direction: e,
        step: "End"
    }))
}
var cc = {
    setTransition: lc,
    transitionStart: fc,
    transitionEnd: uc
};
function dc(n, e, t, i, r) {
    if (n === void 0 && (n = 0),
    e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    typeof n != "number" && typeof n != "string")
        throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof n}] given.`);
    if (typeof n == "string") {
        const y = parseInt(n, 10);
        if (!isFinite(y))
            throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${n}] given.`);
        n = y
    }
    const s = this;
    let o = n;
    o < 0 && (o = 0);
    const {params: a, snapGrid: l, slidesGrid: f, previousIndex: u, activeIndex: p, rtlTranslate: c, wrapperEl: d, enabled: g} = s;
    if (s.animating && a.preventInteractionOnTransition || !g && !i && !r)
        return !1;
    const h = Math.min(s.params.slidesPerGroupSkip, o);
    let m = h + Math.floor((o - h) / s.params.slidesPerGroup);
    m >= l.length && (m = l.length - 1),
    (p || a.initialSlide || 0) === (u || 0) && t && s.emit("beforeSlideChangeStart");
    const v = -l[m];
    if (s.updateProgress(v),
    a.normalizeSlideIndex)
        for (let y = 0; y < f.length; y += 1) {
            const _ = -Math.floor(v * 100)
              , T = Math.floor(f[y] * 100)
              , x = Math.floor(f[y + 1] * 100);
            typeof f[y + 1] != "undefined" ? _ >= T && _ < x - (x - T) / 2 ? o = y : _ >= T && _ < x && (o = y + 1) : _ >= T && (o = y)
        }
    if (s.initialized && o !== p && (!s.allowSlideNext && v < s.translate && v < s.minTranslate() || !s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (p || 0) !== o))
        return !1;
    let b;
    if (o > p ? b = "next" : o < p ? b = "prev" : b = "reset",
    c && -v === s.translate || !c && v === s.translate)
        return s.updateActiveIndex(o),
        a.autoHeight && s.updateAutoHeight(),
        s.updateSlidesClasses(),
        a.effect !== "slide" && s.setTranslate(v),
        b !== "reset" && (s.transitionStart(t, b),
        s.transitionEnd(t, b)),
        !1;
    if (a.cssMode) {
        const y = s.isHorizontal()
          , _ = c ? v : -v;
        if (e === 0) {
            const T = s.virtual && s.params.virtual.enabled;
            T && (s.wrapperEl.style.scrollSnapType = "none",
            s._immediateVirtual = !0),
            d[y ? "scrollLeft" : "scrollTop"] = _,
            T && requestAnimationFrame(()=>{
                s.wrapperEl.style.scrollSnapType = "",
                s._swiperImmediateVirtual = !1
            }
            )
        } else {
            if (!s.support.smoothScroll)
                return Wa({
                    swiper: s,
                    targetPosition: _,
                    side: y ? "left" : "top"
                }),
                !0;
            d.scrollTo({
                [y ? "left" : "top"]: _,
                behavior: "smooth"
            })
        }
        return !0
    }
    return s.setTransition(e),
    s.setTranslate(v),
    s.updateActiveIndex(o),
    s.updateSlidesClasses(),
    s.emit("beforeTransitionStart", e, i),
    s.transitionStart(t, b),
    e === 0 ? s.transitionEnd(t, b) : s.animating || (s.animating = !0,
    s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(_) {
        !s || s.destroyed || _.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
        s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd),
        s.onSlideToWrapperTransitionEnd = null,
        delete s.onSlideToWrapperTransitionEnd,
        s.transitionEnd(t, b))
    }
    ),
    s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
    s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd)),
    !0
}
function pc(n, e, t, i) {
    n === void 0 && (n = 0),
    e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0);
    const r = this;
    let s = n;
    return r.params.loop && (s += r.loopedSlides),
    r.slideTo(s, e, t, i)
}
function hc(n, e, t) {
    n === void 0 && (n = this.params.speed),
    e === void 0 && (e = !0);
    const i = this
      , {animating: r, enabled: s, params: o} = i;
    if (!s)
        return i;
    let a = o.slidesPerGroup;
    o.slidesPerView === "auto" && o.slidesPerGroup === 1 && o.slidesPerGroupAuto && (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
    const l = i.activeIndex < o.slidesPerGroupSkip ? 1 : a;
    if (o.loop) {
        if (r && o.loopPreventsSlide)
            return !1;
        i.loopFix(),
        i._clientLeft = i.$wrapperEl[0].clientLeft
    }
    return o.rewind && i.isEnd ? i.slideTo(0, n, e, t) : i.slideTo(i.activeIndex + l, n, e, t)
}
function gc(n, e, t) {
    n === void 0 && (n = this.params.speed),
    e === void 0 && (e = !0);
    const i = this
      , {params: r, animating: s, snapGrid: o, slidesGrid: a, rtlTranslate: l, enabled: f} = i;
    if (!f)
        return i;
    if (r.loop) {
        if (s && r.loopPreventsSlide)
            return !1;
        i.loopFix(),
        i._clientLeft = i.$wrapperEl[0].clientLeft
    }
    const u = l ? i.translate : -i.translate;
    function p(m) {
        return m < 0 ? -Math.floor(Math.abs(m)) : Math.floor(m)
    }
    const c = p(u)
      , d = o.map(m=>p(m));
    let g = o[d.indexOf(c) - 1];
    if (typeof g == "undefined" && r.cssMode) {
        let m;
        o.forEach((v,b)=>{
            c >= v && (m = b)
        }
        ),
        typeof m != "undefined" && (g = o[m > 0 ? m - 1 : m])
    }
    let h = 0;
    if (typeof g != "undefined" && (h = a.indexOf(g),
    h < 0 && (h = i.activeIndex - 1),
    r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (h = h - i.slidesPerViewDynamic("previous", !0) + 1,
    h = Math.max(h, 0))),
    r.rewind && i.isBeginning) {
        const m = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
        return i.slideTo(m, n, e, t)
    }
    return i.slideTo(h, n, e, t)
}
function mc(n, e, t) {
    n === void 0 && (n = this.params.speed),
    e === void 0 && (e = !0);
    const i = this;
    return i.slideTo(i.activeIndex, n, e, t)
}
function _c(n, e, t, i) {
    n === void 0 && (n = this.params.speed),
    e === void 0 && (e = !0),
    i === void 0 && (i = .5);
    const r = this;
    let s = r.activeIndex;
    const o = Math.min(r.params.slidesPerGroupSkip, s)
      , a = o + Math.floor((s - o) / r.params.slidesPerGroup)
      , l = r.rtlTranslate ? r.translate : -r.translate;
    if (l >= r.snapGrid[a]) {
        const f = r.snapGrid[a]
          , u = r.snapGrid[a + 1];
        l - f > (u - f) * i && (s += r.params.slidesPerGroup)
    } else {
        const f = r.snapGrid[a - 1]
          , u = r.snapGrid[a];
        l - f <= (u - f) * i && (s -= r.params.slidesPerGroup)
    }
    return s = Math.max(s, 0),
    s = Math.min(s, r.slidesGrid.length - 1),
    r.slideTo(s, n, e, t)
}
function vc() {
    const n = this
      , {params: e, $wrapperEl: t} = n
      , i = e.slidesPerView === "auto" ? n.slidesPerViewDynamic() : e.slidesPerView;
    let r = n.clickedIndex, s;
    if (e.loop) {
        if (n.animating)
            return;
        s = parseInt(M(n.clickedSlide).attr("data-swiper-slide-index"), 10),
        e.centeredSlides ? r < n.loopedSlides - i / 2 || r > n.slides.length - n.loopedSlides + i / 2 ? (n.loopFix(),
        r = t.children(`.${e.slideClass}[data-swiper-slide-index="${s}"]:not(.${e.slideDuplicateClass})`).eq(0).index(),
        rn(()=>{
            n.slideTo(r)
        }
        )) : n.slideTo(r) : r > n.slides.length - i ? (n.loopFix(),
        r = t.children(`.${e.slideClass}[data-swiper-slide-index="${s}"]:not(.${e.slideDuplicateClass})`).eq(0).index(),
        rn(()=>{
            n.slideTo(r)
        }
        )) : n.slideTo(r)
    } else
        n.slideTo(r)
}
var yc = {
    slideTo: dc,
    slideToLoop: pc,
    slideNext: hc,
    slidePrev: gc,
    slideReset: mc,
    slideToClosest: _c,
    slideToClickedSlide: vc
};
function wc() {
    const n = this
      , e = ge()
      , {params: t, $wrapperEl: i} = n
      , r = i.children().length > 0 ? M(i.children()[0].parentNode) : i;
    r.children(`.${t.slideClass}.${t.slideDuplicateClass}`).remove();
    let s = r.children(`.${t.slideClass}`);
    if (t.loopFillGroupWithBlank) {
        const l = t.slidesPerGroup - s.length % t.slidesPerGroup;
        if (l !== t.slidesPerGroup) {
            for (let f = 0; f < l; f += 1) {
                const u = M(e.createElement("div")).addClass(`${t.slideClass} ${t.slideBlankClass}`);
                r.append(u)
            }
            s = r.children(`.${t.slideClass}`)
        }
    }
    t.slidesPerView === "auto" && !t.loopedSlides && (t.loopedSlides = s.length),
    n.loopedSlides = Math.ceil(parseFloat(t.loopedSlides || t.slidesPerView, 10)),
    n.loopedSlides += t.loopAdditionalSlides,
    n.loopedSlides > s.length && (n.loopedSlides = s.length);
    const o = []
      , a = [];
    s.each((l,f)=>{
        const u = M(l);
        f < n.loopedSlides && a.push(l),
        f < s.length && f >= s.length - n.loopedSlides && o.push(l),
        u.attr("data-swiper-slide-index", f)
    }
    );
    for (let l = 0; l < a.length; l += 1)
        r.append(M(a[l].cloneNode(!0)).addClass(t.slideDuplicateClass));
    for (let l = o.length - 1; l >= 0; l -= 1)
        r.prepend(M(o[l].cloneNode(!0)).addClass(t.slideDuplicateClass))
}
function bc() {
    const n = this;
    n.emit("beforeLoopFix");
    const {activeIndex: e, slides: t, loopedSlides: i, allowSlidePrev: r, allowSlideNext: s, snapGrid: o, rtlTranslate: a} = n;
    let l;
    n.allowSlidePrev = !0,
    n.allowSlideNext = !0;
    const u = -o[e] - n.getTranslate();
    e < i ? (l = t.length - i * 3 + e,
    l += i,
    n.slideTo(l, 0, !1, !0) && u !== 0 && n.setTranslate((a ? -n.translate : n.translate) - u)) : e >= t.length - i && (l = -t.length + e + i,
    l += i,
    n.slideTo(l, 0, !1, !0) && u !== 0 && n.setTranslate((a ? -n.translate : n.translate) - u)),
    n.allowSlidePrev = r,
    n.allowSlideNext = s,
    n.emit("loopFix")
}
function Tc() {
    const n = this
      , {$wrapperEl: e, params: t, slides: i} = n;
    e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),
    i.removeAttr("data-swiper-slide-index")
}
var xc = {
    loopCreate: wc,
    loopFix: bc,
    loopDestroy: Tc
};
function Sc(n) {
    const e = this;
    if (e.support.touch || !e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode)
        return;
    const t = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
    t.style.cursor = "move",
    t.style.cursor = n ? "-webkit-grabbing" : "-webkit-grab",
    t.style.cursor = n ? "-moz-grabbin" : "-moz-grab",
    t.style.cursor = n ? "grabbing" : "grab"
}
function Cc() {
    const n = this;
    n.support.touch || n.params.watchOverflow && n.isLocked || n.params.cssMode || (n[n.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "")
}
var Ec = {
    setGrabCursor: Sc,
    unsetGrabCursor: Cc
};
function Pc(n, e) {
    e === void 0 && (e = this);
    function t(i) {
        return !i || i === ge() || i === de() ? null : (i.assignedSlot && (i = i.assignedSlot),
        i.closest(n) || t(i.getRootNode().host))
    }
    return t(e)
}
function kc(n) {
    const e = this
      , t = ge()
      , i = de()
      , r = e.touchEventsData
      , {params: s, touches: o, enabled: a} = e;
    if (!a || e.animating && s.preventInteractionOnTransition)
        return;
    !e.animating && s.cssMode && s.loop && e.loopFix();
    let l = n;
    l.originalEvent && (l = l.originalEvent);
    let f = M(l.target);
    if (s.touchEventsTarget === "wrapper" && !f.closest(e.wrapperEl).length || (r.isTouchEvent = l.type === "touchstart",
    !r.isTouchEvent && "which"in l && l.which === 3) || !r.isTouchEvent && "button"in l && l.button > 0 || r.isTouched && r.isMoved)
        return;
    !!s.noSwipingClass && s.noSwipingClass !== "" && l.target && l.target.shadowRoot && n.path && n.path[0] && (f = M(n.path[0]));
    const p = s.noSwipingSelector ? s.noSwipingSelector : `.${s.noSwipingClass}`
      , c = !!(l.target && l.target.shadowRoot);
    if (s.noSwiping && (c ? Pc(p, l.target) : f.closest(p)[0])) {
        e.allowClick = !0;
        return
    }
    if (s.swipeHandler && !f.closest(s.swipeHandler)[0])
        return;
    o.currentX = l.type === "touchstart" ? l.targetTouches[0].pageX : l.pageX,
    o.currentY = l.type === "touchstart" ? l.targetTouches[0].pageY : l.pageY;
    const d = o.currentX
      , g = o.currentY
      , h = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection
      , m = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold;
    if (h && (d <= m || d >= i.innerWidth - m))
        if (h === "prevent")
            n.preventDefault();
        else
            return;
    if (Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }),
    o.startX = d,
    o.startY = g,
    r.touchStartTime = cr(),
    e.allowClick = !0,
    e.updateSize(),
    e.swipeDirection = void 0,
    s.threshold > 0 && (r.allowThresholdMove = !1),
    l.type !== "touchstart") {
        let v = !0;
        f.is(r.focusableElements) && (v = !1,
        f[0].nodeName === "SELECT" && (r.isTouched = !1)),
        t.activeElement && M(t.activeElement).is(r.focusableElements) && t.activeElement !== f[0] && t.activeElement.blur();
        const b = v && e.allowTouchMove && s.touchStartPreventDefault;
        (s.touchStartForcePreventDefault || b) && !f[0].isContentEditable && l.preventDefault()
    }
    e.params.freeMode && e.params.freeMode.enabled && e.freeMode && e.animating && !s.cssMode && e.freeMode.onTouchStart(),
    e.emit("touchStart", l)
}
function Oc(n) {
    const e = ge()
      , t = this
      , i = t.touchEventsData
      , {params: r, touches: s, rtlTranslate: o, enabled: a} = t;
    if (!a)
        return;
    let l = n;
    if (l.originalEvent && (l = l.originalEvent),
    !i.isTouched) {
        i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", l);
        return
    }
    if (i.isTouchEvent && l.type !== "touchmove")
        return;
    const f = l.type === "touchmove" && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0])
      , u = l.type === "touchmove" ? f.pageX : l.pageX
      , p = l.type === "touchmove" ? f.pageY : l.pageY;
    if (l.preventedByNestedSwiper) {
        s.startX = u,
        s.startY = p;
        return
    }
    if (!t.allowTouchMove) {
        M(l.target).is(i.focusableElements) || (t.allowClick = !1),
        i.isTouched && (Object.assign(s, {
            startX: u,
            startY: p,
            currentX: u,
            currentY: p
        }),
        i.touchStartTime = cr());
        return
    }
    if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop) {
        if (t.isVertical()) {
            if (p < s.startY && t.translate <= t.maxTranslate() || p > s.startY && t.translate >= t.minTranslate()) {
                i.isTouched = !1,
                i.isMoved = !1;
                return
            }
        } else if (u < s.startX && t.translate <= t.maxTranslate() || u > s.startX && t.translate >= t.minTranslate())
            return
    }
    if (i.isTouchEvent && e.activeElement && l.target === e.activeElement && M(l.target).is(i.focusableElements)) {
        i.isMoved = !0,
        t.allowClick = !1;
        return
    }
    if (i.allowTouchCallbacks && t.emit("touchMove", l),
    l.targetTouches && l.targetTouches.length > 1)
        return;
    s.currentX = u,
    s.currentY = p;
    const c = s.currentX - s.startX
      , d = s.currentY - s.startY;
    if (t.params.threshold && Math.sqrt(c ** 2 + d ** 2) < t.params.threshold)
        return;
    if (typeof i.isScrolling == "undefined") {
        let v;
        t.isHorizontal() && s.currentY === s.startY || t.isVertical() && s.currentX === s.startX ? i.isScrolling = !1 : c * c + d * d >= 25 && (v = Math.atan2(Math.abs(d), Math.abs(c)) * 180 / Math.PI,
        i.isScrolling = t.isHorizontal() ? v > r.touchAngle : 90 - v > r.touchAngle)
    }
    if (i.isScrolling && t.emit("touchMoveOpposite", l),
    typeof i.startMoving == "undefined" && (s.currentX !== s.startX || s.currentY !== s.startY) && (i.startMoving = !0),
    i.isScrolling) {
        i.isTouched = !1;
        return
    }
    if (!i.startMoving)
        return;
    t.allowClick = !1,
    !r.cssMode && l.cancelable && l.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && l.stopPropagation(),
    i.isMoved || (r.loop && !r.cssMode && t.loopFix(),
    i.startTranslate = t.getTranslate(),
    t.setTransition(0),
    t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
    i.allowMomentumBounce = !1,
    r.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0),
    t.emit("sliderFirstMove", l)),
    t.emit("sliderMove", l),
    i.isMoved = !0;
    let g = t.isHorizontal() ? c : d;
    s.diff = g,
    g *= r.touchRatio,
    o && (g = -g),
    t.swipeDirection = g > 0 ? "prev" : "next",
    i.currentTranslate = g + i.startTranslate;
    let h = !0
      , m = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (m = 0),
    g > 0 && i.currentTranslate > t.minTranslate() ? (h = !1,
    r.resistance && (i.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + i.startTranslate + g) ** m)) : g < 0 && i.currentTranslate < t.maxTranslate() && (h = !1,
    r.resistance && (i.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - i.startTranslate - g) ** m)),
    h && (l.preventedByNestedSwiper = !0),
    !t.allowSlideNext && t.swipeDirection === "next" && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev && t.swipeDirection === "prev" && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev && !t.allowSlideNext && (i.currentTranslate = i.startTranslate),
    r.threshold > 0)
        if (Math.abs(g) > r.threshold || i.allowThresholdMove) {
            if (!i.allowThresholdMove) {
                i.allowThresholdMove = !0,
                s.startX = s.currentX,
                s.startY = s.currentY,
                i.currentTranslate = i.startTranslate,
                s.diff = t.isHorizontal() ? s.currentX - s.startX : s.currentY - s.startY;
                return
            }
        } else {
            i.currentTranslate = i.startTranslate;
            return
        }
    !r.followFinger || r.cssMode || ((r.freeMode && r.freeMode.enabled && t.freeMode || r.watchSlidesProgress) && (t.updateActiveIndex(),
    t.updateSlidesClasses()),
    t.params.freeMode && r.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
    t.updateProgress(i.currentTranslate),
    t.setTranslate(i.currentTranslate))
}
function Mc(n) {
    const e = this
      , t = e.touchEventsData
      , {params: i, touches: r, rtlTranslate: s, slidesGrid: o, enabled: a} = e;
    if (!a)
        return;
    let l = n;
    if (l.originalEvent && (l = l.originalEvent),
    t.allowTouchCallbacks && e.emit("touchEnd", l),
    t.allowTouchCallbacks = !1,
    !t.isTouched) {
        t.isMoved && i.grabCursor && e.setGrabCursor(!1),
        t.isMoved = !1,
        t.startMoving = !1;
        return
    }
    i.grabCursor && t.isMoved && t.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
    const f = cr()
      , u = f - t.touchStartTime;
    if (e.allowClick) {
        const b = l.path || l.composedPath && l.composedPath();
        e.updateClickedSlide(b && b[0] || l.target),
        e.emit("tap click", l),
        u < 300 && f - t.lastClickTime < 300 && e.emit("doubleTap doubleClick", l)
    }
    if (t.lastClickTime = cr(),
    rn(()=>{
        e.destroyed || (e.allowClick = !0)
    }
    ),
    !t.isTouched || !t.isMoved || !e.swipeDirection || r.diff === 0 || t.currentTranslate === t.startTranslate) {
        t.isTouched = !1,
        t.isMoved = !1,
        t.startMoving = !1;
        return
    }
    t.isTouched = !1,
    t.isMoved = !1,
    t.startMoving = !1;
    let p;
    if (i.followFinger ? p = s ? e.translate : -e.translate : p = -t.currentTranslate,
    i.cssMode)
        return;
    if (e.params.freeMode && i.freeMode.enabled) {
        e.freeMode.onTouchEnd({
            currentPos: p
        });
        return
    }
    let c = 0
      , d = e.slidesSizesGrid[0];
    for (let b = 0; b < o.length; b += b < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
        const y = b < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        typeof o[b + y] != "undefined" ? p >= o[b] && p < o[b + y] && (c = b,
        d = o[b + y] - o[b]) : p >= o[b] && (c = b,
        d = o[o.length - 1] - o[o.length - 2])
    }
    let g = null
      , h = null;
    i.rewind && (e.isBeginning ? h = e.params.virtual && e.params.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (g = 0));
    const m = (p - o[c]) / d
      , v = c < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
    if (u > i.longSwipesMs) {
        if (!i.longSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.swipeDirection === "next" && (m >= i.longSwipesRatio ? e.slideTo(i.rewind && e.isEnd ? g : c + v) : e.slideTo(c)),
        e.swipeDirection === "prev" && (m > 1 - i.longSwipesRatio ? e.slideTo(c + v) : h !== null && m < 0 && Math.abs(m) > i.longSwipesRatio ? e.slideTo(h) : e.slideTo(c))
    } else {
        if (!i.shortSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.navigation && (l.target === e.navigation.nextEl || l.target === e.navigation.prevEl) ? l.target === e.navigation.nextEl ? e.slideTo(c + v) : e.slideTo(c) : (e.swipeDirection === "next" && e.slideTo(g !== null ? g : c + v),
        e.swipeDirection === "prev" && e.slideTo(h !== null ? h : c))
    }
}
function _o() {
    const n = this
      , {params: e, el: t} = n;
    if (t && t.offsetWidth === 0)
        return;
    e.breakpoints && n.setBreakpoint();
    const {allowSlideNext: i, allowSlidePrev: r, snapGrid: s} = n;
    n.allowSlideNext = !0,
    n.allowSlidePrev = !0,
    n.updateSize(),
    n.updateSlides(),
    n.updateSlidesClasses(),
    (e.slidesPerView === "auto" || e.slidesPerView > 1) && n.isEnd && !n.isBeginning && !n.params.centeredSlides ? n.slideTo(n.slides.length - 1, 0, !1, !0) : n.slideTo(n.activeIndex, 0, !1, !0),
    n.autoplay && n.autoplay.running && n.autoplay.paused && n.autoplay.run(),
    n.allowSlidePrev = r,
    n.allowSlideNext = i,
    n.params.watchOverflow && s !== n.snapGrid && n.checkOverflow()
}
function Lc(n) {
    const e = this;
    !e.enabled || e.allowClick || (e.params.preventClicks && n.preventDefault(),
    e.params.preventClicksPropagation && e.animating && (n.stopPropagation(),
    n.stopImmediatePropagation()))
}
function Ac() {
    const n = this
      , {wrapperEl: e, rtlTranslate: t, enabled: i} = n;
    if (!i)
        return;
    n.previousTranslate = n.translate,
    n.isHorizontal() ? n.translate = -e.scrollLeft : n.translate = -e.scrollTop,
    n.translate === -0 && (n.translate = 0),
    n.updateActiveIndex(),
    n.updateSlidesClasses();
    let r;
    const s = n.maxTranslate() - n.minTranslate();
    s === 0 ? r = 0 : r = (n.translate - n.minTranslate()) / s,
    r !== n.progress && n.updateProgress(t ? -n.translate : n.translate),
    n.emit("setTranslate", n.translate, !1)
}
let vo = !1;
function Ic() {}
const Xa = (n,e)=>{
    const t = ge()
      , {params: i, touchEvents: r, el: s, wrapperEl: o, device: a, support: l} = n
      , f = !!i.nested
      , u = e === "on" ? "addEventListener" : "removeEventListener"
      , p = e;
    if (!l.touch)
        s[u](r.start, n.onTouchStart, !1),
        t[u](r.move, n.onTouchMove, f),
        t[u](r.end, n.onTouchEnd, !1);
    else {
        const c = r.start === "touchstart" && l.passiveListener && i.passiveListeners ? {
            passive: !0,
            capture: !1
        } : !1;
        s[u](r.start, n.onTouchStart, c),
        s[u](r.move, n.onTouchMove, l.passiveListener ? {
            passive: !1,
            capture: f
        } : f),
        s[u](r.end, n.onTouchEnd, c),
        r.cancel && s[u](r.cancel, n.onTouchEnd, c)
    }
    (i.preventClicks || i.preventClicksPropagation) && s[u]("click", n.onClick, !0),
    i.cssMode && o[u]("scroll", n.onScroll),
    i.updateOnWindowResize ? n[p](a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", _o, !0) : n[p]("observerUpdate", _o, !0)
}
;
function Dc() {
    const n = this
      , e = ge()
      , {params: t, support: i} = n;
    n.onTouchStart = kc.bind(n),
    n.onTouchMove = Oc.bind(n),
    n.onTouchEnd = Mc.bind(n),
    t.cssMode && (n.onScroll = Ac.bind(n)),
    n.onClick = Lc.bind(n),
    i.touch && !vo && (e.addEventListener("touchstart", Ic),
    vo = !0),
    Xa(n, "on")
}
function zc() {
    Xa(this, "off")
}
var $c = {
    attachEvents: Dc,
    detachEvents: zc
};
const yo = (n,e)=>n.grid && e.grid && e.grid.rows > 1;
function Rc() {
    const n = this
      , {activeIndex: e, initialized: t, loopedSlides: i=0, params: r, $el: s} = n
      , o = r.breakpoints;
    if (!o || o && Object.keys(o).length === 0)
        return;
    const a = n.getBreakpoint(o, n.params.breakpointsBase, n.el);
    if (!a || n.currentBreakpoint === a)
        return;
    const f = (a in o ? o[a] : void 0) || n.originalParams
      , u = yo(n, r)
      , p = yo(n, f)
      , c = r.enabled;
    u && !p ? (s.removeClass(`${r.containerModifierClass}grid ${r.containerModifierClass}grid-column`),
    n.emitContainerClasses()) : !u && p && (s.addClass(`${r.containerModifierClass}grid`),
    (f.grid.fill && f.grid.fill === "column" || !f.grid.fill && r.grid.fill === "column") && s.addClass(`${r.containerModifierClass}grid-column`),
    n.emitContainerClasses());
    const d = f.direction && f.direction !== r.direction
      , g = r.loop && (f.slidesPerView !== r.slidesPerView || d);
    d && t && n.changeDirection(),
    Fe(n.params, f);
    const h = n.params.enabled;
    Object.assign(n, {
        allowTouchMove: n.params.allowTouchMove,
        allowSlideNext: n.params.allowSlideNext,
        allowSlidePrev: n.params.allowSlidePrev
    }),
    c && !h ? n.disable() : !c && h && n.enable(),
    n.currentBreakpoint = a,
    n.emit("_beforeBreakpoint", f),
    g && t && (n.loopDestroy(),
    n.loopCreate(),
    n.updateSlides(),
    n.slideTo(e - i + n.loopedSlides, 0, !1)),
    n.emit("breakpoint", f)
}
function Fc(n, e, t) {
    if (e === void 0 && (e = "window"),
    !n || e === "container" && !t)
        return;
    let i = !1;
    const r = de()
      , s = e === "window" ? r.innerHeight : t.clientHeight
      , o = Object.keys(n).map(a=>{
        if (typeof a == "string" && a.indexOf("@") === 0) {
            const l = parseFloat(a.substr(1));
            return {
                value: s * l,
                point: a
            }
        }
        return {
            value: a,
            point: a
        }
    }
    );
    o.sort((a,l)=>parseInt(a.value, 10) - parseInt(l.value, 10));
    for (let a = 0; a < o.length; a += 1) {
        const {point: l, value: f} = o[a];
        e === "window" ? r.matchMedia(`(min-width: ${f}px)`).matches && (i = l) : f <= t.clientWidth && (i = l)
    }
    return i || "max"
}
var Bc = {
    setBreakpoint: Rc,
    getBreakpoint: Fc
};
function Nc(n, e) {
    const t = [];
    return n.forEach(i=>{
        typeof i == "object" ? Object.keys(i).forEach(r=>{
            i[r] && t.push(e + r)
        }
        ) : typeof i == "string" && t.push(e + i)
    }
    ),
    t
}
function Vc() {
    const n = this
      , {classNames: e, params: t, rtl: i, $el: r, device: s, support: o} = n
      , a = Nc(["initialized", t.direction, {
        "pointer-events": !o.touch
    }, {
        "free-mode": n.params.freeMode && t.freeMode.enabled
    }, {
        autoheight: t.autoHeight
    }, {
        rtl: i
    }, {
        grid: t.grid && t.grid.rows > 1
    }, {
        "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
    }, {
        android: s.android
    }, {
        ios: s.ios
    }, {
        "css-mode": t.cssMode
    }, {
        centered: t.cssMode && t.centeredSlides
    }], t.containerModifierClass);
    e.push(...a),
    r.addClass([...e].join(" ")),
    n.emitContainerClasses()
}
function Gc() {
    const n = this
      , {$el: e, classNames: t} = n;
    e.removeClass(t.join(" ")),
    n.emitContainerClasses()
}
var Wc = {
    addClasses: Vc,
    removeClasses: Gc
};
function jc(n, e, t, i, r, s) {
    const o = de();
    let a;
    function l() {
        s && s()
    }
    !M(n).parent("picture")[0] && (!n.complete || !r) && e ? (a = new o.Image,
    a.onload = l,
    a.onerror = l,
    i && (a.sizes = i),
    t && (a.srcset = t),
    e && (a.src = e)) : l()
}
function Yc() {
    const n = this;
    n.imagesToLoad = n.$el.find("img");
    function e() {
        typeof n == "undefined" || n === null || !n || n.destroyed || (n.imagesLoaded !== void 0 && (n.imagesLoaded += 1),
        n.imagesLoaded === n.imagesToLoad.length && (n.params.updateOnImagesReady && n.update(),
        n.emit("imagesReady")))
    }
    for (let t = 0; t < n.imagesToLoad.length; t += 1) {
        const i = n.imagesToLoad[t];
        n.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, e)
    }
}
var Xc = {
    loadImage: jc,
    preloadImages: Yc
};
function Hc() {
    const n = this
      , {isLocked: e, params: t} = n
      , {slidesOffsetBefore: i} = t;
    if (i) {
        const r = n.slides.length - 1
          , s = n.slidesGrid[r] + n.slidesSizesGrid[r] + i * 2;
        n.isLocked = n.size > s
    } else
        n.isLocked = n.snapGrid.length === 1;
    t.allowSlideNext === !0 && (n.allowSlideNext = !n.isLocked),
    t.allowSlidePrev === !0 && (n.allowSlidePrev = !n.isLocked),
    e && e !== n.isLocked && (n.isEnd = !1),
    e !== n.isLocked && n.emit(n.isLocked ? "lock" : "unlock")
}
var qc = {
    checkOverflow: Hc
}
  , wo = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1
};
function Uc(n, e) {
    return function(i) {
        i === void 0 && (i = {});
        const r = Object.keys(i)[0]
          , s = i[r];
        if (typeof s != "object" || s === null) {
            Fe(e, i);
            return
        }
        if (["navigation", "pagination", "scrollbar"].indexOf(r) >= 0 && n[r] === !0 && (n[r] = {
            auto: !0
        }),
        !(r in n && "enabled"in s)) {
            Fe(e, i);
            return
        }
        n[r] === !0 && (n[r] = {
            enabled: !0
        }),
        typeof n[r] == "object" && !("enabled"in n[r]) && (n[r].enabled = !0),
        n[r] || (n[r] = {
            enabled: !1
        }),
        Fe(e, i)
    }
}
const Nn = {
    eventsEmitter: Yu,
    update: tc,
    translate: ac,
    transition: cc,
    slide: yc,
    loop: xc,
    grabCursor: Ec,
    events: $c,
    breakpoints: Bc,
    checkOverflow: qc,
    classes: Wc,
    images: Xc
}
  , Vn = {};
class rt {
    constructor() {
        let e, t;
        for (var i = arguments.length, r = new Array(i), s = 0; s < i; s++)
            r[s] = arguments[s];
        if (r.length === 1 && r[0].constructor && Object.prototype.toString.call(r[0]).slice(8, -1) === "Object" ? t = r[0] : [e,t] = r,
        t || (t = {}),
        t = Fe({}, t),
        e && !t.el && (t.el = e),
        t.el && M(t.el).length > 1) {
            const f = [];
            return M(t.el).each(u=>{
                const p = Fe({}, t, {
                    el: u
                });
                f.push(new rt(p))
            }
            ),
            f
        }
        const o = this;
        o.__swiper__ = !0,
        o.support = ja(),
        o.device = Nu({
            userAgent: t.userAgent
        }),
        o.browser = Gu(),
        o.eventsListeners = {},
        o.eventsAnyListeners = [],
        o.modules = [...o.__modules__],
        t.modules && Array.isArray(t.modules) && o.modules.push(...t.modules);
        const a = {};
        o.modules.forEach(f=>{
            f({
                swiper: o,
                extendParams: Uc(t, a),
                on: o.on.bind(o),
                once: o.once.bind(o),
                off: o.off.bind(o),
                emit: o.emit.bind(o)
            })
        }
        );
        const l = Fe({}, wo, a);
        return o.params = Fe({}, l, Vn, t),
        o.originalParams = Fe({}, o.params),
        o.passedParams = Fe({}, t),
        o.params && o.params.on && Object.keys(o.params.on).forEach(f=>{
            o.on(f, o.params.on[f])
        }
        ),
        o.params && o.params.onAny && o.onAny(o.params.onAny),
        o.$ = M,
        Object.assign(o, {
            enabled: o.params.enabled,
            el: e,
            classNames: [],
            slides: M(),
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal() {
                return o.params.direction === "horizontal"
            },
            isVertical() {
                return o.params.direction === "vertical"
            },
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: o.params.allowSlideNext,
            allowSlidePrev: o.params.allowSlidePrev,
            touchEvents: function() {
                const u = ["touchstart", "touchmove", "touchend", "touchcancel"]
                  , p = ["pointerdown", "pointermove", "pointerup"];
                return o.touchEventsTouch = {
                    start: u[0],
                    move: u[1],
                    end: u[2],
                    cancel: u[3]
                },
                o.touchEventsDesktop = {
                    start: p[0],
                    move: p[1],
                    end: p[2]
                },
                o.support.touch || !o.params.simulateTouch ? o.touchEventsTouch : o.touchEventsDesktop
            }(),
            touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: o.params.focusableElements,
                lastClickTime: cr(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0
            },
            allowClick: !0,
            allowTouchMove: o.params.allowTouchMove,
            touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
        }),
        o.emit("_swiper"),
        o.params.init && o.init(),
        o
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0,
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"))
    }
    disable() {
        const e = this;
        !e.enabled || (e.enabled = !1,
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"))
    }
    setProgress(e, t) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const r = i.minTranslate()
          , o = (i.maxTranslate() - r) * e + r;
        i.translateTo(o, typeof t == "undefined" ? 0 : t),
        i.updateActiveIndex(),
        i.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = e.el.className.split(" ").filter(i=>i.indexOf("swiper") === 0 || i.indexOf(e.params.containerModifierClass) === 0);
        e.emit("_containerClasses", t.join(" "))
    }
    getSlideClasses(e) {
        const t = this;
        return e.className.split(" ").filter(i=>i.indexOf("swiper-slide") === 0 || i.indexOf(t.params.slideClass) === 0).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = [];
        e.slides.each(i=>{
            const r = e.getSlideClasses(i);
            t.push({
                slideEl: i,
                classNames: r
            }),
            e.emit("_slideClass", i, r)
        }
        ),
        e.emit("_slideClasses", t)
    }
    slidesPerViewDynamic(e, t) {
        e === void 0 && (e = "current"),
        t === void 0 && (t = !1);
        const i = this
          , {params: r, slides: s, slidesGrid: o, slidesSizesGrid: a, size: l, activeIndex: f} = i;
        let u = 1;
        if (r.centeredSlides) {
            let p = s[f].swiperSlideSize, c;
            for (let d = f + 1; d < s.length; d += 1)
                s[d] && !c && (p += s[d].swiperSlideSize,
                u += 1,
                p > l && (c = !0));
            for (let d = f - 1; d >= 0; d -= 1)
                s[d] && !c && (p += s[d].swiperSlideSize,
                u += 1,
                p > l && (c = !0))
        } else if (e === "current")
            for (let p = f + 1; p < s.length; p += 1)
                (t ? o[p] + a[p] - o[f] < l : o[p] - o[f] < l) && (u += 1);
        else
            for (let p = f - 1; p >= 0; p -= 1)
                o[f] - o[p] < l && (u += 1);
        return u
    }
    update() {
        const e = this;
        if (!e || e.destroyed)
            return;
        const {snapGrid: t, params: i} = e;
        i.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses();
        function r() {
            const o = e.rtlTranslate ? e.translate * -1 : e.translate
              , a = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
            e.setTranslate(a),
            e.updateActiveIndex(),
            e.updateSlidesClasses()
        }
        let s;
        e.params.freeMode && e.params.freeMode.enabled ? (r(),
        e.params.autoHeight && e.updateAutoHeight()) : ((e.params.slidesPerView === "auto" || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? s = e.slideTo(e.slides.length - 1, 0, !1, !0) : s = e.slideTo(e.activeIndex, 0, !1, !0),
        s || r()),
        i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update")
    }
    changeDirection(e, t) {
        t === void 0 && (t = !0);
        const i = this
          , r = i.params.direction;
        return e || (e = r === "horizontal" ? "vertical" : "horizontal"),
        e === r || e !== "horizontal" && e !== "vertical" || (i.$el.removeClass(`${i.params.containerModifierClass}${r}`).addClass(`${i.params.containerModifierClass}${e}`),
        i.emitContainerClasses(),
        i.params.direction = e,
        i.slides.each(s=>{
            e === "vertical" ? s.style.width = "" : s.style.height = ""
        }
        ),
        i.emit("changeDirection"),
        t && i.update()),
        i
    }
    mount(e) {
        const t = this;
        if (t.mounted)
            return !0;
        const i = M(e || t.params.el);
        if (e = i[0],
        !e)
            return !1;
        e.swiper = t;
        const r = ()=>`.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let o = (()=>{
            if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                const a = M(e.shadowRoot.querySelector(r()));
                return a.children = l=>i.children(l),
                a
            }
            return i.children(r())
        }
        )();
        if (o.length === 0 && t.params.createElements) {
            const l = ge().createElement("div");
            o = M(l),
            l.className = t.params.wrapperClass,
            i.append(l),
            i.children(`.${t.params.slideClass}`).each(f=>{
                o.append(f)
            }
            )
        }
        return Object.assign(t, {
            $el: i,
            el: e,
            $wrapperEl: o,
            wrapperEl: o[0],
            mounted: !0,
            rtl: e.dir.toLowerCase() === "rtl" || i.css("direction") === "rtl",
            rtlTranslate: t.params.direction === "horizontal" && (e.dir.toLowerCase() === "rtl" || i.css("direction") === "rtl"),
            wrongRTL: o.css("display") === "-webkit-box"
        }),
        !0
    }
    init(e) {
        const t = this;
        return t.initialized || t.mount(e) === !1 || (t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.params.loop && t.loopCreate(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.preloadImages && t.preloadImages(),
        t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
        t.attachEvents(),
        t.initialized = !0,
        t.emit("init"),
        t.emit("afterInit")),
        t
    }
    destroy(e, t) {
        e === void 0 && (e = !0),
        t === void 0 && (t = !0);
        const i = this
          , {params: r, $el: s, $wrapperEl: o, slides: a} = i;
        return typeof i.params == "undefined" || i.destroyed || (i.emit("beforeDestroy"),
        i.initialized = !1,
        i.detachEvents(),
        r.loop && i.loopDestroy(),
        t && (i.removeClasses(),
        s.removeAttr("style"),
        o.removeAttr("style"),
        a && a.length && a.removeClass([r.slideVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
        i.emit("destroy"),
        Object.keys(i.eventsListeners).forEach(l=>{
            i.off(l)
        }
        ),
        e !== !1 && (i.$el[0].swiper = null,
        Du(i)),
        i.destroyed = !0),
        null
    }
    static extendDefaults(e) {
        Fe(Vn, e)
    }
    static get extendedDefaults() {
        return Vn
    }
    static get defaults() {
        return wo
    }
    static installModule(e) {
        rt.prototype.__modules__ || (rt.prototype.__modules__ = []);
        const t = rt.prototype.__modules__;
        typeof e == "function" && t.indexOf(e) < 0 && t.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach(t=>rt.installModule(t)),
        rt) : (rt.installModule(e),
        rt)
    }
}
Object.keys(Nn).forEach(n=>{
    Object.keys(Nn[n]).forEach(e=>{
        rt.prototype[e] = Nn[n][e]
    }
    )
}
);
rt.use([Wu, ju]);
function Kc(n, e, t, i) {
    const r = ge();
    return n.params.createElements && Object.keys(i).forEach(s=>{
        if (!t[s] && t.auto === !0) {
            let o = n.$el.children(`.${i[s]}`)[0];
            o || (o = r.createElement("div"),
            o.className = i[s],
            n.$el.append(o)),
            t[s] = o,
            e[s] = o
        }
    }
    ),
    t
}
function Pd(n) {
    let {swiper: e, extendParams: t, on: i, emit: r} = n;
    t({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock"
        }
    }),
    e.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null
    };
    function s(c) {
        let d;
        return c && (d = M(c),
        e.params.uniqueNavElements && typeof c == "string" && d.length > 1 && e.$el.find(c).length === 1 && (d = e.$el.find(c))),
        d
    }
    function o(c, d) {
        const g = e.params.navigation;
        c && c.length > 0 && (c[d ? "addClass" : "removeClass"](g.disabledClass),
        c[0] && c[0].tagName === "BUTTON" && (c[0].disabled = d),
        e.params.watchOverflow && e.enabled && c[e.isLocked ? "addClass" : "removeClass"](g.lockClass))
    }
    function a() {
        if (e.params.loop)
            return;
        const {$nextEl: c, $prevEl: d} = e.navigation;
        o(d, e.isBeginning && !e.params.rewind),
        o(c, e.isEnd && !e.params.rewind)
    }
    function l(c) {
        c.preventDefault(),
        !(e.isBeginning && !e.params.loop && !e.params.rewind) && e.slidePrev()
    }
    function f(c) {
        c.preventDefault(),
        !(e.isEnd && !e.params.loop && !e.params.rewind) && e.slideNext()
    }
    function u() {
        const c = e.params.navigation;
        if (e.params.navigation = Kc(e, e.originalParams.navigation, e.params.navigation, {
            nextEl: "swiper-button-next",
            prevEl: "swiper-button-prev"
        }),
        !(c.nextEl || c.prevEl))
            return;
        const d = s(c.nextEl)
          , g = s(c.prevEl);
        d && d.length > 0 && d.on("click", f),
        g && g.length > 0 && g.on("click", l),
        Object.assign(e.navigation, {
            $nextEl: d,
            nextEl: d && d[0],
            $prevEl: g,
            prevEl: g && g[0]
        }),
        e.enabled || (d && d.addClass(c.lockClass),
        g && g.addClass(c.lockClass))
    }
    function p() {
        const {$nextEl: c, $prevEl: d} = e.navigation;
        c && c.length && (c.off("click", f),
        c.removeClass(e.params.navigation.disabledClass)),
        d && d.length && (d.off("click", l),
        d.removeClass(e.params.navigation.disabledClass))
    }
    i("init", ()=>{
        u(),
        a()
    }
    ),
    i("toEdge fromEdge lock unlock", ()=>{
        a()
    }
    ),
    i("destroy", ()=>{
        p()
    }
    ),
    i("enable disable", ()=>{
        const {$nextEl: c, $prevEl: d} = e.navigation;
        c && c[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass),
        d && d[e.enabled ? "removeClass" : "addClass"](e.params.navigation.lockClass)
    }
    ),
    i("click", (c,d)=>{
        const {$nextEl: g, $prevEl: h} = e.navigation
          , m = d.target;
        if (e.params.navigation.hideOnClick && !M(m).is(h) && !M(m).is(g)) {
            if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === m || e.pagination.el.contains(m)))
                return;
            let v;
            g ? v = g.hasClass(e.params.navigation.hiddenClass) : h && (v = h.hasClass(e.params.navigation.hiddenClass)),
            r(v === !0 ? "navigationShow" : "navigationHide"),
            g && g.toggleClass(e.params.navigation.hiddenClass),
            h && h.toggleClass(e.params.navigation.hiddenClass)
        }
    }
    ),
    Object.assign(e.navigation, {
        update: a,
        init: u,
        destroy: p
    })
}
function kd(n) {
    let {swiper: e, extendParams: t, on: i, emit: r} = n, s;
    e.autoplay = {
        running: !1,
        paused: !1
    },
    t({
        autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1
        }
    });
    function o() {
        const m = e.slides.eq(e.activeIndex);
        let v = e.params.autoplay.delay;
        m.attr("data-swiper-autoplay") && (v = m.attr("data-swiper-autoplay") || e.params.autoplay.delay),
        clearTimeout(s),
        s = rn(()=>{
            let b;
            e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(),
            b = e.slidePrev(e.params.speed, !0, !0),
            r("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? l() : (b = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
            r("autoplay")) : (b = e.slidePrev(e.params.speed, !0, !0),
            r("autoplay")) : e.params.loop ? (e.loopFix(),
            b = e.slideNext(e.params.speed, !0, !0),
            r("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? l() : (b = e.slideTo(0, e.params.speed, !0, !0),
            r("autoplay")) : (b = e.slideNext(e.params.speed, !0, !0),
            r("autoplay")),
            (e.params.cssMode && e.autoplay.running || b === !1) && o()
        }
        , v)
    }
    function a() {
        return typeof s != "undefined" || e.autoplay.running ? !1 : (e.autoplay.running = !0,
        r("autoplayStart"),
        o(),
        !0)
    }
    function l() {
        return !e.autoplay.running || typeof s == "undefined" ? !1 : (s && (clearTimeout(s),
        s = void 0),
        e.autoplay.running = !1,
        r("autoplayStop"),
        !0)
    }
    function f(m) {
        !e.autoplay.running || e.autoplay.paused || (s && clearTimeout(s),
        e.autoplay.paused = !0,
        m === 0 || !e.params.autoplay.waitForTransition ? (e.autoplay.paused = !1,
        o()) : ["transitionend", "webkitTransitionEnd"].forEach(v=>{
            e.$wrapperEl[0].addEventListener(v, p)
        }
        ))
    }
    function u() {
        const m = ge();
        m.visibilityState === "hidden" && e.autoplay.running && f(),
        m.visibilityState === "visible" && e.autoplay.paused && (o(),
        e.autoplay.paused = !1)
    }
    function p(m) {
        !e || e.destroyed || !e.$wrapperEl || m.target === e.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(v=>{
            e.$wrapperEl[0].removeEventListener(v, p)
        }
        ),
        e.autoplay.paused = !1,
        e.autoplay.running ? o() : l())
    }
    function c() {
        e.params.autoplay.disableOnInteraction ? l() : (r("autoplayPause"),
        f()),
        ["transitionend", "webkitTransitionEnd"].forEach(m=>{
            e.$wrapperEl[0].removeEventListener(m, p)
        }
        )
    }
    function d() {
        e.params.autoplay.disableOnInteraction || (e.autoplay.paused = !1,
        r("autoplayResume"),
        o())
    }
    function g() {
        e.params.autoplay.pauseOnMouseEnter && (e.$el.on("mouseenter", c),
        e.$el.on("mouseleave", d))
    }
    function h() {
        e.$el.off("mouseenter", c),
        e.$el.off("mouseleave", d)
    }
    i("init", ()=>{
        e.params.autoplay.enabled && (a(),
        ge().addEventListener("visibilitychange", u),
        g())
    }
    ),
    i("beforeTransitionStart", (m,v,b)=>{
        e.autoplay.running && (b || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(v) : l())
    }
    ),
    i("sliderFirstMove", ()=>{
        e.autoplay.running && (e.params.autoplay.disableOnInteraction ? l() : f())
    }
    ),
    i("touchEnd", ()=>{
        e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && o()
    }
    ),
    i("destroy", ()=>{
        h(),
        e.autoplay.running && l(),
        ge().removeEventListener("visibilitychange", u)
    }
    ),
    Object.assign(e.autoplay, {
        pause: f,
        run: o,
        start: a,
        stop: l
    })
}
function Od(n) {
    let {swiper: e, extendParams: t, on: i} = n;
    t({
        thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs"
        }
    });
    let r = !1
      , s = !1;
    e.thumbs = {
        swiper: null
    };
    function o() {
        const f = e.thumbs.swiper;
        if (!f)
            return;
        const u = f.clickedIndex
          , p = f.clickedSlide;
        if (p && M(p).hasClass(e.params.thumbs.slideThumbActiveClass) || typeof u == "undefined" || u === null)
            return;
        let c;
        if (f.params.loop ? c = parseInt(M(f.clickedSlide).attr("data-swiper-slide-index"), 10) : c = u,
        e.params.loop) {
            let d = e.activeIndex;
            e.slides.eq(d).hasClass(e.params.slideDuplicateClass) && (e.loopFix(),
            e._clientLeft = e.$wrapperEl[0].clientLeft,
            d = e.activeIndex);
            const g = e.slides.eq(d).prevAll(`[data-swiper-slide-index="${c}"]`).eq(0).index()
              , h = e.slides.eq(d).nextAll(`[data-swiper-slide-index="${c}"]`).eq(0).index();
            typeof g == "undefined" ? c = h : typeof h == "undefined" ? c = g : h - d < d - g ? c = h : c = g
        }
        e.slideTo(c)
    }
    function a() {
        const {thumbs: f} = e.params;
        if (r)
            return !1;
        r = !0;
        const u = e.constructor;
        if (f.swiper instanceof u)
            e.thumbs.swiper = f.swiper,
            Object.assign(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            Object.assign(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            });
        else if (Zi(f.swiper)) {
            const p = Object.assign({}, f.swiper);
            Object.assign(p, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            e.thumbs.swiper = new u(p),
            s = !0
        }
        return e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
        e.thumbs.swiper.on("tap", o),
        !0
    }
    function l(f) {
        const u = e.thumbs.swiper;
        if (!u)
            return;
        const p = u.params.slidesPerView === "auto" ? u.slidesPerViewDynamic() : u.params.slidesPerView
          , c = e.params.thumbs.autoScrollOffset
          , d = c && !u.params.loop;
        if (e.realIndex !== u.realIndex || d) {
            let m = u.activeIndex, v, b;
            if (u.params.loop) {
                u.slides.eq(m).hasClass(u.params.slideDuplicateClass) && (u.loopFix(),
                u._clientLeft = u.$wrapperEl[0].clientLeft,
                m = u.activeIndex);
                const y = u.slides.eq(m).prevAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index()
                  , _ = u.slides.eq(m).nextAll(`[data-swiper-slide-index="${e.realIndex}"]`).eq(0).index();
                typeof y == "undefined" ? v = _ : typeof _ == "undefined" ? v = y : _ - m === m - y ? v = u.params.slidesPerGroup > 1 ? _ : m : _ - m < m - y ? v = _ : v = y,
                b = e.activeIndex > e.previousIndex ? "next" : "prev"
            } else
                v = e.realIndex,
                b = v > e.previousIndex ? "next" : "prev";
            d && (v += b === "next" ? c : -1 * c),
            u.visibleSlidesIndexes && u.visibleSlidesIndexes.indexOf(v) < 0 && (u.params.centeredSlides ? v > m ? v = v - Math.floor(p / 2) + 1 : v = v + Math.floor(p / 2) - 1 : v > m && u.params.slidesPerGroup,
            u.slideTo(v, f ? 0 : void 0))
        }
        let g = 1;
        const h = e.params.thumbs.slideThumbActiveClass;
        if (e.params.slidesPerView > 1 && !e.params.centeredSlides && (g = e.params.slidesPerView),
        e.params.thumbs.multipleActiveThumbs || (g = 1),
        g = Math.floor(g),
        u.slides.removeClass(h),
        u.params.loop || u.params.virtual && u.params.virtual.enabled)
            for (let m = 0; m < g; m += 1)
                u.$wrapperEl.children(`[data-swiper-slide-index="${e.realIndex + m}"]`).addClass(h);
        else
            for (let m = 0; m < g; m += 1)
                u.slides.eq(e.realIndex + m).addClass(h)
    }
    i("beforeInit", ()=>{
        const {thumbs: f} = e.params;
        !f || !f.swiper || (a(),
        l(!0))
    }
    ),
    i("slideChange update resize observerUpdate", ()=>{
        !e.thumbs.swiper || l()
    }
    ),
    i("setTransition", (f,u)=>{
        const p = e.thumbs.swiper;
        !p || p.setTransition(u)
    }
    ),
    i("beforeDestroy", ()=>{
        const f = e.thumbs.swiper;
        !f || s && f && f.destroy()
    }
    ),
    Object.assign(e.thumbs, {
        init: a,
        update: l
    })
}
function Zc(n, e) {
    if (!(n instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
function bo(n, e) {
    for (var t = 0; t < e.length; t++) {
        var i = e[t];
        i.enumerable = i.enumerable || !1,
        i.configurable = !0,
        "value"in i && (i.writable = !0),
        Object.defineProperty(n, i.key, i)
    }
}
function To(n, e, t) {
    return e && bo(n.prototype, e),
    t && bo(n, t),
    n
}
function Ei(n, e) {
    return Object.getOwnPropertyNames(Object(n)).reduce(function(t, i) {
        var r = Object.getOwnPropertyDescriptor(Object(n), i)
          , s = Object.getOwnPropertyDescriptor(Object(e), i);
        return Object.defineProperty(t, i, s || r)
    }, {})
}
function Gn(n) {
    var e = Ei(n);
    return (e.types || e.split) && (e.types = e.types || e.split),
    (e.absolute || e.position) && (e.absolute = e.absolute || /absolute/.test(n.position)),
    e
}
function Ms(n) {
    return n !== null && typeof n == "object"
}
function Qc(n) {
    return typeof n == "number" && n > -1 && n % 1 === 0
}
function Jc(n) {
    return Ms(n) && Qc(n.length)
}
function nn(n) {
    return Array.isArray(n) ? n : n == null ? [] : Jc(n) ? Array.prototype.slice.call(n) : [n]
}
function Ha(n) {
    return Ms(n) && /^(1|3|11)$/.test(n.nodeType)
}
function Ls(n) {
    return typeof n == "string"
}
function ed(n) {
    return nn(n).reduce(function(e, t) {
        return e.concat(nn(t))
    }, [])
}
function td(n) {
    var e = n;
    return Ls(n) && (/^(#[a-z]\w+)$/.test(n.trim()) ? e = document.getElementById(n.trim().slice(1)) : e = document.querySelectorAll(n)),
    ed(e).filter(Ha)
}
function I(n, e, t) {
    var i = {}
      , r = null;
    if (Ms(n) && (r = n[I.expando] || (n[I.expando] = ++I.uid),
    i = I.cache[r] || (I.cache[r] = {})),
    t === void 0)
        return e === void 0 ? i : i[e];
    if (e !== void 0)
        return i[e] = t,
        t
}
I.expando = "splitType".concat(new Date * 1);
I.cache = {};
I.uid = 0;
function id(n) {
    var e = n && n[I.expando];
    e && (delete n[e],
    delete I.cache[e])
}
function hi(n, e) {
    for (var t = nn(n), i = t.length, r = 0; r < i; r++)
        e(t[r], r, t)
}
function rd(n) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ";
    return n = n ? String(n) : "",
    n.split(e)
}
var As = "\\ud800-\\udfff"
  , qa = "\\u0300-\\u036f\\ufe20-\\ufe23"
  , Ua = "\\u20d0-\\u20f0"
  , Ka = "\\ufe0e\\ufe0f"
  , nd = "[".concat(As, "]")
  , ls = "[".concat(qa).concat(Ua, "]")
  , fs = "\\ud83c[\\udffb-\\udfff]"
  , sd = "(?:".concat(ls, "|").concat(fs, ")")
  , Za = "[^".concat(As, "]")
  , Qa = "(?:\\ud83c[\\udde6-\\uddff]){2}"
  , Ja = "[\\ud800-\\udbff][\\udc00-\\udfff]"
  , el = "\\u200d"
  , tl = "".concat(sd, "?")
  , il = "[".concat(Ka, "]?")
  , od = "(?:" + el + "(?:" + [Za, Qa, Ja].join("|") + ")" + il + tl + ")*"
  , ad = il + tl + od
  , ld = "(?:".concat(["".concat(Za).concat(ls, "?"), ls, Qa, Ja, nd].join("|"), `
)`)
  , fd = RegExp("".concat(fs, "(?=").concat(fs, ")|").concat(ld).concat(ad), "g")
  , ud = [el, As, qa, Ua, Ka]
  , cd = RegExp("[".concat(ud.join(""), "]"));
function dd(n) {
    return n.split("")
}
function rl(n) {
    return cd.test(n)
}
function pd(n) {
    return n.match(fd) || []
}
function hd(n) {
    return rl(n) ? pd(n) : dd(n)
}
function gd(n) {
    return n == null ? "" : String(n)
}
function md(n) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return n = gd(n),
    n && Ls(n) && !e && rl(n) ? hd(n) : n.split(e)
}
function ji(n, e) {
    var t = document.createElement(n);
    return e && Object.keys(e).forEach(function(i) {
        var r = e[i];
        r !== null && (i === "textContent" || i === "innerHTML" ? t[i] = r : i === "children" ? hi(r, function(s) {
            Ha(s) && t.appendChild(s)
        }) : t.setAttribute(i, String(r).trim()))
    }),
    t
}
function _d(n) {
    var e = Ls(n) || Array.isArray(n) ? String(n) : "";
    return {
        lines: /line/i.test(e),
        words: /word/i.test(e),
        chars: /(char)|(character)/i.test(e)
    }
}
function vd(n, e) {
    var t = /<br\s*\/?>/g
      , i = n.textContent;
    if (e) {
        var r = n.innerHTML
          , s = document.createElement("div");
        s.innerHTML = r.replace(t, " ".concat(e, " ")),
        i = s.textContent
    }
    return i.replace(/\s+/g, " ").trim()
}
var nl = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: "lines, words, chars",
    absolute: !1,
    tagName: "div"
}
  , xo = function() {
    return document.createDocumentFragment()
}
  , Wn = function(e) {
    return document.createTextNode(e)
};
function yd(n, e) {
    e = Ei(nl, e);
    var t = _d(e.types), i = e.tagName, r = "B".concat(new Date * 1, "R"), s = e.position === "absolute" || e.absolute, o = [], a = [], l = [], f;
    f = t.lines ? ji("div") : xo();
    var u = vd(n, r);
    if (a = rd(u).reduce(function(w, C, P, E) {
        var O, k;
        return C === r ? (f.appendChild(ji("br")),
        w) : (t.chars && (k = md(C).map(function(D) {
            return ji(i, {
                class: "".concat(e.splitClass, " ").concat(e.charClass),
                style: "display: inline-block;",
                textContent: D
            })
        }),
        l = l.concat(k)),
        t.words || t.lines ? (O = ji(i, {
            class: "".concat(e.wordClass, " ").concat(e.splitClass),
            style: "display: inline-block; position: ".concat(t.words ? "relative" : "static"),
            children: t.chars ? k : null,
            textContent: t.chars ? null : C
        }),
        f.appendChild(O)) : hi(k, function(D) {
            f.appendChild(D)
        }),
        P !== E.length - 1 && f.appendChild(Wn(" ")),
        t.words ? w.concat(O) : w)
    }, []),
    n.innerHTML = "",
    n.appendChild(f),
    !s && !t.lines)
        return {
            chars: l,
            words: a,
            lines: []
        };
    var p = [], c = [], d, g, h, m, v, b = I(n, "nodes", n.getElementsByTagName(i)), y = n.parentElement, _ = n.nextElementSibling, T = window.getComputedStyle(n), x = T.textAlign;
    return s && (m = {
        left: f.offsetLeft,
        top: f.offsetTop,
        width: f.offsetWidth
    },
    h = n.offsetWidth,
    g = n.offsetHeight,
    I(n).cssWidth = n.style.width,
    I(n).cssHeight = n.style.height),
    hi(b, function(w) {
        if (w !== f) {
            var C = w.parentElement === f, P;
            t.lines && C && (P = I(w, "top", w.offsetTop),
            P !== v && (v = P,
            p.push(c = [])),
            c.push(w)),
            s && (I(w).top = P || w.offsetTop,
            I(w).left = w.offsetLeft,
            I(w).width = w.offsetWidth,
            I(w).height = d || (d = w.offsetHeight))
        }
    }),
    y && y.removeChild(n),
    t.lines && (f = xo(),
    o = p.map(function(w) {
        var C = ji(i, {
            class: "".concat(e.splitClass, " ").concat(e.lineClass),
            style: "display: block; text-align: ".concat(x, "; width: 100%;")
        });
        return f.appendChild(C),
        s && (I(C).type = "line",
        I(C).top = I(w[0]).top,
        I(C).height = d),
        hi(w, function(P, E, O) {
            t.words ? C.appendChild(P) : t.chars ? hi(P.children, function(k) {
                C.appendChild(k)
            }) : C.appendChild(Wn(P.textContent)),
            E !== O.length - 1 && C.appendChild(Wn(" "))
        }),
        C
    }),
    n.replaceChild(f, n.firstChild)),
    s && (n.style.width = "".concat(n.style.width || h, "px"),
    n.style.height = "".concat(g, "px"),
    hi(b, function(w) {
        var C = I(w).type === "line"
          , P = !C && I(w.parentElement).type === "line";
        w.style.top = "".concat(P ? 0 : I(w).top, "px"),
        w.style.left = C ? "".concat(m.left, "px") : "".concat(I(w).left - (P ? m.left : 0), "px"),
        w.style.height = "".concat(I(w).height, "px"),
        w.style.width = C ? "".concat(m.width, "px") : "".concat(I(w).width, "px"),
        w.style.position = "absolute"
    })),
    y && (_ ? y.insertBefore(n, _) : y.appendChild(n)),
    {
        lines: o,
        words: t.words ? a : [],
        chars: l
    }
}
var Ar = Ei(nl, {})
  , Md = function() {
    To(n, null, [{
        key: "defaults",
        get: function() {
            return Ar
        },
        set: function(t) {
            Ar = Ei(Ar, Gn(t))
        }
    }]);
    function n(e, t) {
        Zc(this, n),
        this.isSplit = !1,
        this.settings = Ei(Ar, Gn(t)),
        this.elements = td(e) || [],
        this.elements.length && (this.originals = this.elements.map(function(i) {
            return I(i, "html", I(i).html || i.innerHTML)
        }),
        this.settings.types && this.split())
    }
    return To(n, [{
        key: "split",
        value: function(t) {
            var i = this;
            this.revert(),
            this.lines = [],
            this.words = [],
            this.chars = [];
            var r = [window.pageXOffset, window.pageYOffset];
            t !== void 0 && (this.settings = Ei(this.settings, Gn(t))),
            this.elements.forEach(function(s) {
                var o = yd(s, i.settings)
                  , a = o.lines
                  , l = o.words
                  , f = o.chars;
                i.lines = i.lines.concat(a),
                i.words = i.words.concat(l),
                i.chars = i.chars.concat(f),
                I(s).isSplit = !0
            }),
            this.isSplit = !0,
            window.scrollTo(r[0], r[1]),
            this.elements.forEach(function(s) {
                var o = I(s).nodes || [];
                nn(o).forEach(id)
            })
        }
    }, {
        key: "revert",
        value: function() {
            var t = this;
            this.isSplit && (this.lines = null,
            this.words = null,
            this.chars = null),
            this.elements.forEach(function(i) {
                I(i).isSplit && I(i).html && (i.innerHTML = I(i).html,
                i.style.height = I(i).cssHeight || "",
                i.style.width = I(i).cssWidth || "",
                t.isSplit = !1)
            })
        }
    }]),
    n
}()
  , sl = {
    exports: {}
};
(function(n, e) {
    (function() {
        function t() {
            var i = window
              , r = document;
            if ("scrollBehavior"in r.documentElement.style && i.__forceSmoothScrollPolyfill__ !== !0)
                return;
            var s = i.HTMLElement || i.Element
              , o = 468
              , a = {
                scroll: i.scroll || i.scrollTo,
                scrollBy: i.scrollBy,
                elementScroll: s.prototype.scroll || p,
                scrollIntoView: s.prototype.scrollIntoView
            }
              , l = i.performance && i.performance.now ? i.performance.now.bind(i.performance) : Date.now;
            function f(_) {
                var T = ["MSIE ", "Trident/", "Edge/"];
                return new RegExp(T.join("|")).test(_)
            }
            var u = f(i.navigator.userAgent) ? 1 : 0;
            function p(_, T) {
                this.scrollLeft = _,
                this.scrollTop = T
            }
            function c(_) {
                return .5 * (1 - Math.cos(Math.PI * _))
            }
            function d(_) {
                if (_ === null || typeof _ != "object" || _.behavior === void 0 || _.behavior === "auto" || _.behavior === "instant")
                    return !0;
                if (typeof _ == "object" && _.behavior === "smooth")
                    return !1;
                throw new TypeError("behavior member of ScrollOptions " + _.behavior + " is not a valid value for enumeration ScrollBehavior.")
            }
            function g(_, T) {
                if (T === "Y")
                    return _.clientHeight + u < _.scrollHeight;
                if (T === "X")
                    return _.clientWidth + u < _.scrollWidth
            }
            function h(_, T) {
                var x = i.getComputedStyle(_, null)["overflow" + T];
                return x === "auto" || x === "scroll"
            }
            function m(_) {
                var T = g(_, "Y") && h(_, "Y")
                  , x = g(_, "X") && h(_, "X");
                return T || x
            }
            function v(_) {
                for (; _ !== r.body && m(_) === !1; )
                    _ = _.parentNode || _.host;
                return _
            }
            function b(_) {
                var T = l(), x, w, C, P = (T - _.startTime) / o;
                P = P > 1 ? 1 : P,
                x = c(P),
                w = _.startX + (_.x - _.startX) * x,
                C = _.startY + (_.y - _.startY) * x,
                _.method.call(_.scrollable, w, C),
                (w !== _.x || C !== _.y) && i.requestAnimationFrame(b.bind(i, _))
            }
            function y(_, T, x) {
                var w, C, P, E, O = l();
                _ === r.body ? (w = i,
                C = i.scrollX || i.pageXOffset,
                P = i.scrollY || i.pageYOffset,
                E = a.scroll) : (w = _,
                C = _.scrollLeft,
                P = _.scrollTop,
                E = p),
                b({
                    scrollable: w,
                    method: E,
                    startTime: O,
                    startX: C,
                    startY: P,
                    x: T,
                    y: x
                })
            }
            i.scroll = i.scrollTo = function() {
                if (arguments[0] !== void 0) {
                    if (d(arguments[0]) === !0) {
                        a.scroll.call(i, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] != "object" ? arguments[0] : i.scrollX || i.pageXOffset, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : i.scrollY || i.pageYOffset);
                        return
                    }
                    y.call(i, r.body, arguments[0].left !== void 0 ? ~~arguments[0].left : i.scrollX || i.pageXOffset, arguments[0].top !== void 0 ? ~~arguments[0].top : i.scrollY || i.pageYOffset)
                }
            }
            ,
            i.scrollBy = function() {
                if (arguments[0] !== void 0) {
                    if (d(arguments[0])) {
                        a.scrollBy.call(i, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] != "object" ? arguments[0] : 0, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : 0);
                        return
                    }
                    y.call(i, r.body, ~~arguments[0].left + (i.scrollX || i.pageXOffset), ~~arguments[0].top + (i.scrollY || i.pageYOffset))
                }
            }
            ,
            s.prototype.scroll = s.prototype.scrollTo = function() {
                if (arguments[0] !== void 0) {
                    if (d(arguments[0]) === !0) {
                        if (typeof arguments[0] == "number" && arguments[1] === void 0)
                            throw new SyntaxError("Value could not be converted");
                        a.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left : typeof arguments[0] != "object" ? ~~arguments[0] : this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top : arguments[1] !== void 0 ? ~~arguments[1] : this.scrollTop);
                        return
                    }
                    var _ = arguments[0].left
                      , T = arguments[0].top;
                    y.call(this, this, typeof _ == "undefined" ? this.scrollLeft : ~~_, typeof T == "undefined" ? this.scrollTop : ~~T)
                }
            }
            ,
            s.prototype.scrollBy = function() {
                if (arguments[0] !== void 0) {
                    if (d(arguments[0]) === !0) {
                        a.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
                        return
                    }
                    this.scroll({
                        left: ~~arguments[0].left + this.scrollLeft,
                        top: ~~arguments[0].top + this.scrollTop,
                        behavior: arguments[0].behavior
                    })
                }
            }
            ,
            s.prototype.scrollIntoView = function() {
                if (d(arguments[0]) === !0) {
                    a.scrollIntoView.call(this, arguments[0] === void 0 ? !0 : arguments[0]);
                    return
                }
                var _ = v(this)
                  , T = _.getBoundingClientRect()
                  , x = this.getBoundingClientRect();
                _ !== r.body ? (y.call(this, _, _.scrollLeft + x.left - T.left, _.scrollTop + x.top - T.top),
                i.getComputedStyle(_).position !== "fixed" && i.scrollBy({
                    left: T.left,
                    top: T.top,
                    behavior: "smooth"
                })) : i.scrollBy({
                    left: x.left,
                    top: x.top,
                    behavior: "smooth"
                })
            }
        }
        n.exports = {
            polyfill: t
        }
    }
    )()
}
)(sl);
var Ld = sl.exports;
/** @license MIT smoothscroll-anchor-polyfill@1.3.4 (c) 2021 Jonas Kuske */
const Wt = typeof window != "undefined"
  , dr = Wt && window
  , Ee = Wt && document
  , Gr = Wt && Ee.documentElement
  , ol = Wt && Ee.createElement("a")
  , wd = ()=>Wt && "scrollBehavior"in ol
  , bd = n=>/^a$/i.test(n.tagName)
  , Td = n=>{
    if (!/#/.test(n.href))
        return !1;
    let e = n.pathname;
    return e[0] !== "/" && (e = "/" + e),
    !(n.hostname !== location.hostname || e !== location.pathname || n.search && n.search !== location.search)
}
  , al = n=>bd(n) && Td(n) ? n : n.parentElement ? al(n.parentElement) : null
  , ll = n=>{
    if (typeof n != "string")
        return null;
    try {
        n = decodeURIComponent(n)
    } catch {}
    let e = n ? Ee.getElementById(n.slice(1)) : Ee.body;
    return n === "#top" && !e && (e = Ee.body),
    e
}
  , So = n=>{
    const e = {
        preventScroll: !0
    };
    if (n.focus(e),
    Ee.activeElement !== n) {
        const t = n.getAttribute("tabindex");
        if (n.setAttribute("tabindex", "-1"),
        getComputedStyle(n).outlineStyle === "none") {
            const i = n.style.outlineStyle;
            n.style.outlineStyle = "none",
            n.addEventListener("blur", function r() {
                n.style.outlineStyle = i || "",
                t != null ? n.setAttribute("tabindex", t) : n.removeAttribute("tabindex"),
                n.removeEventListener("blur", r)
            })
        }
        n.focus(e)
    }
}
;
let Co, us = !1;
if (Wt)
    try {
        const n = Object.defineProperty({}, "preventScroll", {
            get() {
                us = !0
            }
        });
        ol.focus(n)
    } catch {}
const fl = n=>{
    us || clearTimeout(Co),
    n === Ee.body ? dr.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
    }) : n.scrollIntoView({
        behavior: "smooth",
        block: "start"
    }),
    us ? So(n) : Co = setTimeout(So.bind(null, n), 450)
}
  , ul = ()=>{
    const n = /scroll-behavior:[\s]*([^;"']+)/
      , e = getComputedStyle(Gr)
      , t = [Gr.style.scrollBehavior, (n.exec(Gr.getAttribute("style")) || [])[1], e.getPropertyValue("--scroll-behavior"), (n.exec(e.fontFamily) || [])[1]];
    for (var i = 0; i < t.length; i++) {
        const r = t[i] && t[i].trim();
        if (/^smooth$/.test(r))
            return !0;
        if (/^(initial|inherit|auto|unset)$/.test(r))
            return !1
    }
    return !1
}
  , cl = {
    polyfill: dl,
    destroy: pl
};
function dl(n={}) {
    if (pl(),
    Wt) {
        const e = dr.__forceSmoothscrollAnchorPolyfill__
          , t = typeof n.force == "boolean" ? n.force : e;
        if (wd() && !t)
            return;
        Ee.addEventListener("click", hl, !1),
        Ee.addEventListener("scroll", _l),
        dr.addEventListener("hashchange", ml)
    }
    return cl
}
function pl() {
    return Wt && (Ee.removeEventListener("click", hl, !1),
    Ee.removeEventListener("scroll", _l),
    dr.removeEventListener("hashchange", ml)),
    cl
}
function hl(n) {
    const e = n.metaKey || n.ctrlKey || n.shiftKey || n.button !== 0;
    if (n.defaultPrevented || e || !ul())
        return;
    const t = al(n.target);
    if (!t)
        return;
    const i = ll(t.hash);
    i && (n.preventDefault(),
    fl(i),
    history.pushState && history.pushState(null, Ee.title, t.href))
}
const tr = []
  , gl = ()=>Gr.scrollTop || Ee.body.scrollTop;
function ml() {
    if (!Ee.body || !ul())
        return;
    const n = ll(location.hash);
    if (!n)
        return;
    const e = gl()
      , t = tr[tr[1] === e ? 0 : 1];
    dr.scroll({
        top: t,
        behavior: "instant"
    }),
    fl(n)
}
function _l() {
    !Ee.body || (tr[0] = tr[1],
    tr[1] = gl())
}
dl();
/*!
 * ScrollToPlugin 3.9.1
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var He, vl, xt, ct, Ft, yl, wl, bl = function() {
    return typeof window != "undefined"
}, Tl = function() {
    return He || bl() && (He = window.gsap) && He.registerPlugin && He
}, xl = function(e) {
    return typeof e == "string"
}, Eo = function(e) {
    return typeof e == "function"
}, pr = function(e, t) {
    var i = t === "x" ? "Width" : "Height"
      , r = "scroll" + i
      , s = "client" + i;
    return e === xt || e === ct || e === Ft ? Math.max(ct[r], Ft[r]) - (xt["inner" + i] || ct[s] || Ft[s]) : e[r] - e["offset" + i]
}, hr = function(e, t) {
    var i = "scroll" + (t === "x" ? "Left" : "Top");
    return e === xt && (e.pageXOffset != null ? i = "page" + t.toUpperCase() + "Offset" : e = ct[i] != null ? ct : Ft),
    function() {
        return e[i]
    }
}, xd = function(e, t, i, r) {
    if (Eo(e) && (e = e(t, i, r)),
    typeof e != "object")
        return xl(e) && e !== "max" && e.charAt(1) !== "=" ? {
            x: e,
            y: e
        } : {
            y: e
        };
    if (e.nodeType)
        return {
            y: e,
            x: e
        };
    var s = {}, o;
    for (o in e)
        s[o] = o !== "onAutoKill" && Eo(e[o]) ? e[o](t, i, r) : e[o];
    return s
}, Sl = function(e, t) {
    if (e = yl(e)[0],
    !e || !e.getBoundingClientRect)
        return console.warn("scrollTo target doesn't exist. Using 0") || {
            x: 0,
            y: 0
        };
    var i = e.getBoundingClientRect()
      , r = !t || t === xt || t === Ft
      , s = r ? {
        top: ct.clientTop - (xt.pageYOffset || ct.scrollTop || Ft.scrollTop || 0),
        left: ct.clientLeft - (xt.pageXOffset || ct.scrollLeft || Ft.scrollLeft || 0)
    } : t.getBoundingClientRect()
      , o = {
        x: i.left - s.left,
        y: i.top - s.top
    };
    return !r && t && (o.x += hr(t, "x")(),
    o.y += hr(t, "y")()),
    o
}, Po = function(e, t, i, r, s) {
    return !isNaN(e) && typeof e != "object" ? parseFloat(e) - s : xl(e) && e.charAt(1) === "=" ? parseFloat(e.substr(2)) * (e.charAt(0) === "-" ? -1 : 1) + r - s : e === "max" ? pr(t, i) - s : Math.min(pr(t, i), Sl(e, t)[i] - s)
}, ko = function() {
    He = Tl(),
    bl() && He && document.body && (xt = window,
    Ft = document.body,
    ct = document.documentElement,
    yl = He.utils.toArray,
    He.config({
        autoKillThreshold: 7
    }),
    wl = He.config(),
    vl = 1)
}, un = {
    version: "3.9.1",
    name: "scrollTo",
    rawVars: 1,
    register: function(e) {
        He = e,
        ko()
    },
    init: function(e, t, i, r, s) {
        vl || ko();
        var o = this
          , a = He.getProperty(e, "scrollSnapType");
        o.isWin = e === xt,
        o.target = e,
        o.tween = i,
        t = xd(t, r, e, s),
        o.vars = t,
        o.autoKill = !!t.autoKill,
        o.getX = hr(e, "x"),
        o.getY = hr(e, "y"),
        o.x = o.xPrev = o.getX(),
        o.y = o.yPrev = o.getY(),
        a && a !== "none" && (o.snap = 1,
        o.snapInline = e.style.scrollSnapType,
        e.style.scrollSnapType = "none"),
        t.x != null ? (o.add(o, "x", o.x, Po(t.x, e, "x", o.x, t.offsetX || 0), r, s),
        o._props.push("scrollTo_x")) : o.skipX = 1,
        t.y != null ? (o.add(o, "y", o.y, Po(t.y, e, "y", o.y, t.offsetY || 0), r, s),
        o._props.push("scrollTo_y")) : o.skipY = 1
    },
    render: function(e, t) {
        for (var i = t._pt, r = t.target, s = t.tween, o = t.autoKill, a = t.xPrev, l = t.yPrev, f = t.isWin, u = t.snap, p = t.snapInline, c, d, g, h, m; i; )
            i.r(e, i.d),
            i = i._next;
        c = f || !t.skipX ? t.getX() : a,
        d = f || !t.skipY ? t.getY() : l,
        g = d - l,
        h = c - a,
        m = wl.autoKillThreshold,
        t.x < 0 && (t.x = 0),
        t.y < 0 && (t.y = 0),
        o && (!t.skipX && (h > m || h < -m) && c < pr(r, "x") && (t.skipX = 1),
        !t.skipY && (g > m || g < -m) && d < pr(r, "y") && (t.skipY = 1),
        t.skipX && t.skipY && (s.kill(),
        t.vars.onAutoKill && t.vars.onAutoKill.apply(s, t.vars.onAutoKillParams || []))),
        f ? xt.scrollTo(t.skipX ? c : t.x, t.skipY ? d : t.y) : (t.skipY || (r.scrollTop = t.y),
        t.skipX || (r.scrollLeft = t.x)),
        u && (e === 1 || e === 0) && (d = r.scrollTop,
        c = r.scrollLeft,
        p ? r.style.scrollSnapType = p : r.style.removeProperty("scroll-snap-type"),
        r.scrollTop = d + 1,
        r.scrollLeft = c + 1,
        r.scrollTop = d,
        r.scrollLeft = c),
        t.xPrev = t.x,
        t.yPrev = t.y
    },
    kill: function(e) {
        var t = e === "scrollTo";
        (t || e === "scrollTo_x") && (this.skipX = 1),
        (t || e === "scrollTo_y") && (this.skipY = 1)
    }
};
un.max = pr;
un.getOffset = Sl;
un.buildGetter = hr;
Tl() && He.registerPlugin(un);
function Sd(n, e) {
    for (var t = 0; t < e.length; t++) {
        var i = e[t];
        i.enumerable = i.enumerable || !1,
        i.configurable = !0,
        "value"in i && (i.writable = !0),
        Object.defineProperty(n, i.key, i)
    }
}
function Ir(n) {
    return function(e) {
        if (Array.isArray(e))
            return jn(e)
    }(n) || function(e) {
        if (typeof Symbol != "undefined" && Symbol.iterator in Object(e))
            return Array.from(e)
    }(n) || function(e, t) {
        if (!!e) {
            if (typeof e == "string")
                return jn(e, t);
            var i = Object.prototype.toString.call(e).slice(8, -1);
            if (i === "Object" && e.constructor && (i = e.constructor.name),
            i === "Map" || i === "Set")
                return Array.from(e);
            if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
                return jn(e, t)
        }
    }(n) || function() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
    }()
}
function jn(n, e) {
    (e == null || e > n.length) && (e = n.length);
    for (var t = 0, i = new Array(e); t < e; t++)
        i[t] = n[t];
    return i
}
var Oo, Yn, Ht, Xn, Mo, Cd = (Oo = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'],
Yn = function() {
    function n(i) {
        var r = i.targetModal
          , s = i.triggers
          , o = s === void 0 ? [] : s
          , a = i.onShow
          , l = a === void 0 ? function() {}
        : a
          , f = i.onClose
          , u = f === void 0 ? function() {}
        : f
          , p = i.openTrigger
          , c = p === void 0 ? "data-micromodal-trigger" : p
          , d = i.closeTrigger
          , g = d === void 0 ? "data-micromodal-close" : d
          , h = i.openClass
          , m = h === void 0 ? "is-open" : h
          , v = i.disableScroll
          , b = v !== void 0 && v
          , y = i.disableFocus
          , _ = y !== void 0 && y
          , T = i.awaitCloseAnimation
          , x = T !== void 0 && T
          , w = i.awaitOpenAnimation
          , C = w !== void 0 && w
          , P = i.debugMode
          , E = P !== void 0 && P;
        (function(O, k) {
            if (!(O instanceof k))
                throw new TypeError("Cannot call a class as a function")
        }
        )(this, n),
        this.modal = document.getElementById(r),
        this.config = {
            debugMode: E,
            disableScroll: b,
            openTrigger: c,
            closeTrigger: g,
            openClass: m,
            onShow: l,
            onClose: u,
            awaitCloseAnimation: x,
            awaitOpenAnimation: C,
            disableFocus: _
        },
        o.length > 0 && this.registerTriggers.apply(this, Ir(o)),
        this.onClick = this.onClick.bind(this),
        this.onKeydown = this.onKeydown.bind(this)
    }
    var e, t;
    return e = n,
    (t = [{
        key: "registerTriggers",
        value: function() {
            for (var i = this, r = arguments.length, s = new Array(r), o = 0; o < r; o++)
                s[o] = arguments[o];
            s.filter(Boolean).forEach(function(a) {
                a.addEventListener("click", function(l) {
                    return i.showModal(l)
                })
            })
        }
    }, {
        key: "showModal",
        value: function() {
            var i = this
              , r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
            if (this.activeElement = document.activeElement,
            this.modal.setAttribute("aria-hidden", "false"),
            this.modal.classList.add(this.config.openClass),
            this.scrollBehaviour("disable"),
            this.addEventListeners(),
            this.config.awaitOpenAnimation) {
                var s = function o() {
                    i.modal.removeEventListener("animationend", o, !1),
                    i.setFocusToFirstNode()
                };
                this.modal.addEventListener("animationend", s, !1)
            } else
                this.setFocusToFirstNode();
            this.config.onShow(this.modal, this.activeElement, r)
        }
    }, {
        key: "closeModal",
        value: function() {
            var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null
              , r = this.modal;
            if (this.modal.setAttribute("aria-hidden", "true"),
            this.removeEventListeners(),
            this.scrollBehaviour("enable"),
            this.activeElement && this.activeElement.focus && this.activeElement.focus(),
            this.config.onClose(this.modal, this.activeElement, i),
            this.config.awaitCloseAnimation) {
                var s = this.config.openClass;
                this.modal.addEventListener("animationend", function o() {
                    r.classList.remove(s),
                    r.removeEventListener("animationend", o, !1)
                }, !1)
            } else
                r.classList.remove(this.config.openClass)
        }
    }, {
        key: "closeModalById",
        value: function(i) {
            this.modal = document.getElementById(i),
            this.modal && this.closeModal()
        }
    }, {
        key: "scrollBehaviour",
        value: function(i) {
            if (this.config.disableScroll) {
                var r = document.querySelector("body");
                switch (i) {
                case "enable":
                    Object.assign(r.style, {
                        overflow: ""
                    });
                    break;
                case "disable":
                    Object.assign(r.style, {
                        overflow: "hidden"
                    })
                }
            }
        }
    }, {
        key: "addEventListeners",
        value: function() {
            this.modal.addEventListener("touchstart", this.onClick),
            this.modal.addEventListener("click", this.onClick),
            document.addEventListener("keydown", this.onKeydown)
        }
    }, {
        key: "removeEventListeners",
        value: function() {
            this.modal.removeEventListener("touchstart", this.onClick),
            this.modal.removeEventListener("click", this.onClick),
            document.removeEventListener("keydown", this.onKeydown)
        }
    }, {
        key: "onClick",
        value: function(i) {
            (i.target.hasAttribute(this.config.closeTrigger) || i.target.parentNode.hasAttribute(this.config.closeTrigger)) && (i.preventDefault(),
            i.stopPropagation(),
            this.closeModal(i))
        }
    }, {
        key: "onKeydown",
        value: function(i) {
            i.keyCode === 27 && this.closeModal(i),
            i.keyCode === 9 && this.retainFocus(i)
        }
    }, {
        key: "getFocusableNodes",
        value: function() {
            var i = this.modal.querySelectorAll(Oo);
            return Array.apply(void 0, Ir(i))
        }
    }, {
        key: "setFocusToFirstNode",
        value: function() {
            var i = this;
            if (!this.config.disableFocus) {
                var r = this.getFocusableNodes();
                if (r.length !== 0) {
                    var s = r.filter(function(o) {
                        return !o.hasAttribute(i.config.closeTrigger)
                    });
                    s.length > 0 && s[0].focus(),
                    s.length === 0 && r[0].focus()
                }
            }
        }
    }, {
        key: "retainFocus",
        value: function(i) {
            var r = this.getFocusableNodes();
            if (r.length !== 0)
                if (r = r.filter(function(o) {
                    return o.offsetParent !== null
                }),
                this.modal.contains(document.activeElement)) {
                    var s = r.indexOf(document.activeElement);
                    i.shiftKey && s === 0 && (r[r.length - 1].focus(),
                    i.preventDefault()),
                    !i.shiftKey && r.length > 0 && s === r.length - 1 && (r[0].focus(),
                    i.preventDefault())
                } else
                    r[0].focus()
        }
    }]) && Sd(e.prototype, t),
    n
}(),
Ht = null,
Xn = function(n) {
    if (!document.getElementById(n))
        return console.warn("MicroModal: \u2757Seems like you have missed %c'".concat(n, "'"), "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "ID somewhere in your code. Refer example below to resolve it."),
        console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<div class="modal" id="'.concat(n, '"></div>')),
        !1
}
,
Mo = function(n, e) {
    if (function(i) {
        i.length <= 0 && (console.warn("MicroModal: \u2757Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute."),
        console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>'))
    }(n),
    !e)
        return !0;
    for (var t in e)
        Xn(t);
    return !0
}
,
{
    init: function(n) {
        var e = Object.assign({}, {
            openTrigger: "data-micromodal-trigger"
        }, n)
          , t = Ir(document.querySelectorAll("[".concat(e.openTrigger, "]")))
          , i = function(o, a) {
            var l = [];
            return o.forEach(function(f) {
                var u = f.attributes[a].value;
                l[u] === void 0 && (l[u] = []),
                l[u].push(f)
            }),
            l
        }(t, e.openTrigger);
        if (e.debugMode !== !0 || Mo(t, i) !== !1)
            for (var r in i) {
                var s = i[r];
                e.targetModal = r,
                e.triggers = Ir(s),
                Ht = new Yn(e)
            }
    },
    show: function(n, e) {
        var t = e || {};
        t.targetModal = n,
        t.debugMode === !0 && Xn(n) === !1 || (Ht && Ht.removeEventListeners(),
        (Ht = new Yn(t)).showModal())
    },
    close: function(n) {
        n ? Ht.closeModalById(n) : Ht.closeModal()
    }
});
typeof window != "undefined" && (window.MicroModal = Cd);
export {kd as A, Pd as N, X as S, Od as T, rt as a, Md as b, un as c, Rf as g, Ed as i, Cd as l, Ld as s};
