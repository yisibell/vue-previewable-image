import { ref as f, onMounted as z, onUnmounted as S, defineComponent as E, toRefs as V, computed as p, watch as O } from "vue";
import T from "viewerjs";
import { default as W } from "viewerjs";
const $ = (a, t = !0) => {
  const r = f(), _ = f(""), o = f(!1), w = f(!1), v = f(!1), d = f(!1), e = f(), l = () => {
    e.value = new IntersectionObserver(
      (s) => {
        s.forEach((g) => {
          const { intersectionRatio: i, target: u } = g;
          if (i > 0 && !u.classList.contains("lazy-loaded")) {
            const c = new Image();
            d.value = !0, c.addEventListener("load", () => {
              u.classList.add("lazy-loaded"), v.value = !0, _.value = a, o.value = !0, d.value = !1;
            }), c.addEventListener("error", () => {
              u.classList.add("lazy-loaded"), v.value = !0, w.value = !0, d.value = !1;
            }), c.src = a;
          }
        });
      },
      {
        threshold: [1]
      }
    ), r.value && e.value.observe(r.value);
  };
  return z(() => {
    t ? l() : _.value = a;
  }), S(() => {
    var s;
    r.value && ((s = e.value) == null || s.unobserve(r.value));
  }), {
    lazySrc: _,
    lazyloadSuccess: o,
    lazyloadError: w,
    lazyloaded: v,
    lazyloading: d,
    lazyloadTrigger: r
  };
};
function R(a) {
  return typeof a[0] == "string";
}
const F = E({
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
    fit: {
      type: String,
      default: "fill"
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
  emits: ["switch", "update:currentPreviewIndex"],
  setup(a, { emit: t }) {
    const { previewSrcList: r, currentPreviewIndex: _ } = V(a), { lazySrc: o, lazyloadTrigger: w, lazyloading: v, lazyloadError: d } = $(a.src, a.lazy), e = f(), l = p(() => ({
      "--img-object-fit": a.fit
    })), s = p(
      () => r.value && r.value.length > 0
    ), g = p(() => s.value ? R(r.value) ? r.value.map((n) => ({
      src: n,
      alt: n
    })) : r.value : []), i = p({
      get() {
        return _.value;
      },
      set(n) {
        t("update:currentPreviewIndex", n);
      }
    }), u = p(() => r.value.length || 0), c = () => {
      const n = document.createElement("div");
      return g.value.forEach((y) => {
        const h = new Image();
        Object.keys(y).forEach((b) => {
          h[b] = y[b];
        }), n.appendChild(h);
      }), n.addEventListener("view", (y) => {
        const h = y;
        i.value = h.detail.index, t("switch", i.value, e.value);
      }), n;
    }, I = p(() => a.viewerTitle ? (n) => a.viewerTitle(n, {
      index: i.value,
      total: u.value
    }) : (n) => `${n.alt} (${i.value + 1}/${u.value})`), L = p(() => Object.assign(
      {
        title: I.value
      },
      a.viewerOptions
    )), m = () => {
      s.value && (e.value = new T(
        c(),
        L.value
      ));
    };
    O(
      r,
      () => {
        m();
      },
      {
        deep: !0
      }
    );
    const C = () => {
      var n;
      (n = e.value) == null || n.view(i.value);
    }, P = () => {
      m();
    };
    return z(() => {
      P();
    }), S(() => {
      var n;
      (n = e.value) == null || n.destroy();
    }), {
      lazyloadTrigger: w,
      PreviewListLength: u,
      finalPreviewSrcList: g,
      imgStyleVars: l,
      viewer: e,
      handleImgView: C,
      hasPreviewList: s,
      lazySrc: o,
      lazyloading: v,
      lazyloadError: d
    };
  }
});
function x(a, t, r, _, o, w, v, d) {
  var e = typeof a == "function" ? a.options : a;
  t && (e.render = t, e.staticRenderFns = r, e._compiled = !0), _ && (e.functional = !0), w && (e._scopeId = "data-v-" + w);
  var l;
  if (v ? (l = function(i) {
    i = i || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(v);
  }, e._ssrRegister = l) : o && (l = d ? function() {
    o.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), l)
    if (e.functional) {
      e._injectStyles = l;
      var s = e.render;
      e.render = function(u, c) {
        return l.call(c), s(u, c);
      };
    } else {
      var g = e.beforeCreate;
      e.beforeCreate = g ? [].concat(g, l) : [l];
    }
  return {
    exports: a,
    options: e
  };
}
var N = function() {
  var t = this, r = t._self._c;
  return t._self._setupProxy, r("div", { ref: "lazyloadTrigger", staticClass: "previewable-image", style: [{ width: t.width, height: t.height }, t.imgStyleVars] }, [t.lazyloading ? r("div", { staticClass: "previewable-image__placeholder" }, [t._t("placeholder", function() {
    return [t._v("Loading...")];
  })], 2) : t.lazyloadError ? r("div", { staticClass: "previewable-image__error" }, [t._t("error", function() {
    return [t._v("Load Error")];
  })], 2) : r("img", { class: [
    "previewable-image__inner",
    { "previewable-image__preview": t.hasPreviewList }
  ], attrs: { src: t.lazySrc, alt: t.alt }, on: { click: t.handleImgView } })]);
}, U = [], j = /* @__PURE__ */ x(
  F,
  N,
  U,
  !1,
  null,
  null,
  null,
  null
);
const A = j.exports;
export {
  A as PreviewableImage,
  W as Viewer
};
