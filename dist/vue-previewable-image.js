import { ref as f, onMounted as L, onUnmounted as P, defineComponent as V, toRefs as O, computed as y, watch as T } from "vue";
import $ from "viewerjs";
import { default as q } from "viewerjs";
const R = (r, e = !0, l, w) => {
  const o = f(), u = f(""), v = f(!1), _ = f(!1), a = f(!1), n = f(!1), g = f(), d = () => {
    g.value = new IntersectionObserver(
      (i) => {
        i.forEach((s) => {
          const { intersectionRatio: c, target: p } = s;
          if (c > 0 && !p.classList.contains("lazy-loaded")) {
            const h = new Image();
            n.value = !0, h.addEventListener("load", (m) => {
              p.classList.add("lazy-loaded"), u.value = r, a.value = !0, v.value = !0, _.value = !1, n.value = !1, w && w(m);
            }), h.addEventListener("error", (m) => {
              p.classList.add("lazy-loaded"), a.value = !0, _.value = !0, v.value = !1, n.value = !1, l && l(m);
            }), h.src = r;
          }
        });
      },
      {
        threshold: [1]
      }
    ), o.value && g.value.observe(o.value);
  };
  return L(() => {
    e ? d() : u.value = r;
  }), P(() => {
    var i;
    o.value && ((i = g.value) == null || i.unobserve(o.value));
  }), {
    lazySrc: u,
    lazyloadSuccess: v,
    lazyloadError: _,
    lazyloaded: a,
    lazyloading: n,
    lazyloadTrigger: o
  };
};
function x(r) {
  return typeof r[0] == "string";
}
const F = V({
  name: "PreviewableImage",
  props: {
    width: {
      type: String,
      default: void 0
    },
    height: {
      type: String,
      default: void 0
    },
    src: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    },
    referrerPolicy: {
      type: String,
      default: void 0
    },
    fit: {
      type: String,
      default: "fill"
    },
    zIndex: {
      type: [Number, String],
      default: 2015
    },
    previewSrcList: {
      type: Array,
      default: () => []
    },
    currentPreviewIndex: {
      type: Number,
      default: 0
    },
    viewerOptions: {
      type: Object,
      default: () => ({})
    },
    viewerTitle: {
      type: Function,
      default: void 0
    },
    lazy: {
      type: Boolean,
      default: !0
    }
  },
  emits: ["switch", "update:currentPreviewIndex", "load", "error"],
  setup(r, { emit: e }) {
    const { previewSrcList: l, currentPreviewIndex: w } = O(r), {
      lazySrc: o,
      lazyloadTrigger: u,
      lazyloading: v,
      lazyloadError: _,
      lazyloadSuccess: a
    } = R(
      r.src,
      r.lazy,
      (t) => {
        e("load", t);
      },
      (t) => {
        e("error", t);
      }
    ), n = f(), g = y(() => ({
      "--img-object-fit": r.fit
    })), d = y(
      () => l.value && l.value.length > 0
    ), i = y(() => d.value ? x(l.value) ? l.value.map((t) => ({
      src: t,
      alt: t
    })) : l.value : []), s = y({
      get() {
        return w.value;
      },
      set(t) {
        e("update:currentPreviewIndex", t);
      }
    }), c = y(() => l.value.length || 0), p = () => {
      const t = document.createElement("div");
      return i.value.forEach((z) => {
        const b = new Image();
        Object.keys(z).forEach((I) => {
          b[I] = z[I];
        }), t.appendChild(b);
      }), t.addEventListener("view", (z) => {
        const b = z;
        s.value = b.detail.index, e("switch", s.value, n.value);
      }), t;
    }, h = y(() => r.viewerTitle ? (t) => r.viewerTitle(t, {
      index: s.value,
      total: c.value
    }) : (t) => `${t.alt} (${s.value + 1}/${c.value})`), m = y(() => Object.assign(
      {
        title: h.value,
        zIndex: r.zIndex
      },
      r.viewerOptions
    )), S = () => {
      d.value && (r.lazy && !a.value || (n.value = new $(
        p(),
        m.value
      )));
    };
    T(
      [a, l],
      () => {
        S();
      },
      {
        deep: !0
      }
    );
    const C = () => {
      var t;
      (t = n.value) == null || t.view(s.value);
    }, E = () => {
      S();
    };
    return L(() => {
      E();
    }), P(() => {
      var t;
      (t = n.value) == null || t.destroy();
    }), {
      lazyloadTrigger: u,
      PreviewListLength: c,
      finalPreviewSrcList: i,
      imgStyleVars: g,
      viewer: n,
      handleImgView: C,
      hasPreviewList: d,
      lazySrc: o,
      lazyloading: v,
      lazyloadError: _
    };
  }
});
function N(r, e, l, w, o, u, v, _) {
  var a = typeof r == "function" ? r.options : r;
  e && (a.render = e, a.staticRenderFns = l, a._compiled = !0), w && (a.functional = !0), u && (a._scopeId = "data-v-" + u);
  var n;
  if (v ? (n = function(i) {
    i = i || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(v);
  }, a._ssrRegister = n) : o && (n = _ ? function() {
    o.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), n)
    if (a.functional) {
      a._injectStyles = n;
      var g = a.render;
      a.render = function(s, c) {
        return n.call(c), g(s, c);
      };
    } else {
      var d = a.beforeCreate;
      a.beforeCreate = d ? [].concat(d, n) : [n];
    }
  return {
    exports: r,
    options: a
  };
}
var U = function() {
  var e = this, l = e._self._c;
  return e._self._setupProxy, l("div", { ref: "lazyloadTrigger", staticClass: "previewable-image", style: [{ width: e.width, height: e.height }, e.imgStyleVars] }, [e.lazy && e.lazyloading ? l("div", { staticClass: "previewable-image__placeholder" }, [e._t("placeholder", function() {
    return [e._v("Loading...")];
  })], 2) : e.lazy && e.lazyloadError ? l("div", { staticClass: "previewable-image__error" }, [e._t("error", function() {
    return [e._v("Load Error")];
  })], 2) : l("img", { class: [
    "previewable-image__inner",
    { "previewable-image__preview": e.hasPreviewList }
  ], attrs: { src: e.lazySrc, alt: e.alt, referrerpolicy: e.referrerPolicy }, on: { click: e.handleImgView } })]);
}, j = [], X = /* @__PURE__ */ N(
  F,
  U,
  j,
  !1,
  null,
  null,
  null,
  null
);
const M = X.exports;
export {
  M as PreviewableImage,
  q as Viewer
};
