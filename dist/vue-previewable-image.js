import { ref as f, onMounted as L, onUnmounted as P, defineComponent as V, toRefs as O, computed as g, watch as T } from "vue";
import $ from "viewerjs";
import { default as q } from "viewerjs";
const R = (a, e = !0, l, y) => {
  const o = f(), u = f(""), v = f(!1), _ = f(!1), r = f(!1), n = f(!1), w = f(), d = () => {
    w.value = new IntersectionObserver(
      (i) => {
        i.forEach((s) => {
          const { intersectionRatio: c, target: h } = s;
          if (c > 0 && !h.classList.contains("lazy-loaded")) {
            const p = new Image();
            n.value = !0, p.addEventListener("load", (m) => {
              h.classList.add("lazy-loaded"), u.value = a, r.value = !0, v.value = !0, _.value = !1, n.value = !1, y && y(m);
            }), p.addEventListener("error", (m) => {
              h.classList.add("lazy-loaded"), r.value = !0, _.value = !0, v.value = !1, n.value = !1, l && l(m);
            }), p.src = a;
          }
        });
      },
      {
        threshold: [1]
      }
    ), o.value && w.value.observe(o.value);
  };
  return L(() => {
    e ? d() : u.value = a;
  }), P(() => {
    var i;
    o.value && ((i = w.value) == null || i.unobserve(o.value));
  }), {
    lazySrc: u,
    lazyloadSuccess: v,
    lazyloadError: _,
    lazyloaded: r,
    lazyloading: n,
    lazyloadTrigger: o
  };
};
function F(a) {
  return typeof a[0] == "string";
}
const x = V({
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
  emits: ["switch", "update:currentPreviewIndex", "load", "error"],
  setup(a, { emit: e }) {
    const { previewSrcList: l, currentPreviewIndex: y } = O(a), {
      lazySrc: o,
      lazyloadTrigger: u,
      lazyloading: v,
      lazyloadError: _,
      lazyloadSuccess: r
    } = R(
      a.src,
      a.lazy,
      (t) => {
        e("load", t);
      },
      (t) => {
        e("error", t);
      }
    ), n = f(), w = g(() => ({
      "--img-object-fit": a.fit
    })), d = g(
      () => l.value && l.value.length > 0
    ), i = g(() => d.value ? F(l.value) ? l.value.map((t) => ({
      src: t,
      alt: t
    })) : l.value : []), s = g({
      get() {
        return y.value;
      },
      set(t) {
        e("update:currentPreviewIndex", t);
      }
    }), c = g(() => l.value.length || 0), h = () => {
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
    }, p = g(() => a.viewerTitle ? (t) => a.viewerTitle(t, {
      index: s.value,
      total: c.value
    }) : (t) => `${t.alt} (${s.value + 1}/${c.value})`), m = g(() => Object.assign(
      {
        title: p.value
      },
      a.viewerOptions
    )), S = () => {
      d.value && (a.lazy && !r.value || (n.value = new $(
        h(),
        m.value
      )));
    };
    T(
      [r, l],
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
      imgStyleVars: w,
      viewer: n,
      handleImgView: C,
      hasPreviewList: d,
      lazySrc: o,
      lazyloading: v,
      lazyloadError: _
    };
  }
});
function N(a, e, l, y, o, u, v, _) {
  var r = typeof a == "function" ? a.options : a;
  e && (r.render = e, r.staticRenderFns = l, r._compiled = !0), y && (r.functional = !0), u && (r._scopeId = "data-v-" + u);
  var n;
  if (v ? (n = function(i) {
    i = i || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(v);
  }, r._ssrRegister = n) : o && (n = _ ? function() {
    o.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), n)
    if (r.functional) {
      r._injectStyles = n;
      var w = r.render;
      r.render = function(s, c) {
        return n.call(c), w(s, c);
      };
    } else {
      var d = r.beforeCreate;
      r.beforeCreate = d ? [].concat(d, n) : [n];
    }
  return {
    exports: a,
    options: r
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
  ], attrs: { src: e.lazySrc, alt: e.alt }, on: { click: e.handleImgView } })]);
}, j = [], X = /* @__PURE__ */ N(
  x,
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
