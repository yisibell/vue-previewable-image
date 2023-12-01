import { ref as p, onMounted as z, onUnmounted as S, defineComponent as b, toRefs as x, computed as w, watch as O } from "vue";
import P from "viewerjs";
import { default as G } from "viewerjs";
const C = (r, e = !0, i, l) => {
  const o = p(), c = p(""), u = p(!1), v = p(!1), n = p(!1), a = p(!1), d = p(), _ = () => {
    d.value = new IntersectionObserver(
      (s) => {
        s.forEach((g) => {
          const { intersectionRatio: m, target: y } = g;
          if (m > 0 && !y.classList.contains("lazy-loaded")) {
            const t = new Image();
            a.value = !0, t.addEventListener("load", (f) => {
              y.classList.add("lazy-loaded"), c.value = r, n.value = !0, u.value = !0, v.value = !1, a.value = !1, l && l(f);
            }), t.addEventListener("error", (f) => {
              y.classList.add("lazy-loaded"), n.value = !0, v.value = !0, u.value = !1, a.value = !1, i && i(f);
            }), t.src = r;
          }
        });
      },
      {
        threshold: [1]
      }
    ), o.value && d.value.observe(o.value);
  };
  return z(() => {
    e ? _() : c.value = r;
  }), S(() => {
    var s;
    o.value && ((s = d.value) == null || s.unobserve(o.value));
  }), {
    lazySrc: c,
    lazyloadSuccess: u,
    lazyloadError: v,
    lazyloaded: n,
    lazyloading: a,
    lazyloadTrigger: o
  };
};
function E(r) {
  return typeof r[0] == "string";
}
const $ = b({
  name: "ImageViewer",
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    currentPreviewIndex: {
      type: Number,
      default: 0
    },
    previewSrcList: {
      type: Array,
      default: () => []
    },
    viewerOptions: {
      type: Object,
      default: () => ({})
    },
    viewerTitle: {
      type: Function,
      default: void 0
    },
    zIndex: {
      type: [Number, String],
      default: 2015
    }
  },
  emits: ["update:modelValue", "update:currentPreviewIndex", "switch"],
  setup(r, { emit: e }) {
    const { modelValue: i, previewSrcList: l, currentPreviewIndex: o } = x(r), c = w(
      () => l.value && l.value.length > 0
    ), u = p(), v = () => {
      var t;
      (t = u.value) == null || t.view(a.value);
    };
    O(i, (t) => {
      t && v();
    });
    const n = w(() => c.value ? E(l.value) ? l.value.map((t) => ({
      src: t,
      alt: t
    })) : l.value : []), a = w({
      get() {
        return o.value;
      },
      set(t) {
        e("update:currentPreviewIndex", t);
      }
    }), d = w(() => l.value.length || 0), _ = () => {
      const t = document.createElement("div");
      return n.value.forEach((f) => {
        const h = new Image();
        Object.keys(f).forEach((I) => {
          h[I] = f[I];
        }), t.appendChild(h);
      }), t.addEventListener("view", (f) => {
        const h = f;
        a.value = h.detail.index, e("switch", a.value, u.value);
      }), t.addEventListener("hidden", () => {
        e("update:modelValue", !1);
      }), t;
    }, s = w(() => r.viewerTitle ? (t) => r.viewerTitle(t, {
      index: a.value,
      total: d.value
    }) : (t) => `${t.alt} (${a.value + 1}/${d.value})`), g = w(() => Object.assign(
      {
        title: s.value,
        zIndex: r.zIndex
      },
      r.viewerOptions
    )), m = () => {
      c.value && (u.value = new P(
        _(),
        g.value
      ), i.value && v());
    }, y = () => {
      m();
    };
    return z(() => {
      y();
    }), S(() => {
      var t;
      (t = u.value) == null || t.destroy();
    }), {
      hasPreviewList: c,
      PreviewListLength: d,
      finalPreviewSrcList: n,
      viewer: u,
      handleImgView: v
    };
  }
});
function L(r, e, i, l, o, c, u, v) {
  var n = typeof r == "function" ? r.options : r;
  e && (n.render = e, n.staticRenderFns = i, n._compiled = !0), l && (n.functional = !0), c && (n._scopeId = "data-v-" + c);
  var a;
  if (u ? (a = function(s) {
    s = s || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ != "undefined" && (s = __VUE_SSR_CONTEXT__), o && o.call(this, s), s && s._registeredComponents && s._registeredComponents.add(u);
  }, n._ssrRegister = a) : o && (a = v ? function() {
    o.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), a)
    if (n.functional) {
      n._injectStyles = a;
      var d = n.render;
      n.render = function(g, m) {
        return a.call(m), d(g, m);
      };
    } else {
      var _ = n.beforeCreate;
      n.beforeCreate = _ ? [].concat(_, a) : [a];
    }
  return {
    exports: r,
    options: n
  };
}
var T = function() {
  var e = this, i = e._self._c;
  return e._self._setupProxy, i("div", { staticClass: "image-viewer" });
}, R = [], N = /* @__PURE__ */ L(
  $,
  T,
  R,
  !1,
  null,
  "5d94f490",
  null,
  null
);
const F = N.exports;
const j = b({
  name: "PreviewableImage",
  components: {
    ImageViewer: F
  },
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
    const { previewSrcList: i, currentPreviewIndex: l } = x(r), o = w(() => ({
      "--img-object-fit": r.fit
    })), {
      lazySrc: c,
      lazyloadTrigger: u,
      lazyloading: v,
      lazyloadError: n,
      lazyloadSuccess: a
    } = C(
      r.src,
      r.lazy,
      (t) => {
        e("load", t);
      },
      (t) => {
        e("error", t);
      }
    ), d = w(
      () => i.value && i.value.length > 0
    ), _ = w(() => !(!d.value || r.lazy && !a.value)), s = p(!1), g = () => {
      d.value && (s.value = !0);
    }, m = w({
      get() {
        return l.value;
      },
      set(t) {
        e("update:currentPreviewIndex", t);
      }
    });
    return {
      lazyloadTrigger: u,
      imgStyleVars: o,
      hasPreviewList: d,
      lazySrc: c,
      lazyloading: v,
      lazyloadError: n,
      lazyloadSuccess: a,
      showImageViewer: s,
      handleImgView: g,
      currentViewerIndex: m,
      handleSwitch: (t, f) => {
        e("switch", t, f);
      },
      initViewer: _
    };
  }
});
var U = function() {
  var e = this, i = e._self._c;
  return e._self._setupProxy, i("div", { ref: "lazyloadTrigger", staticClass: "previewable-image", style: [{ width: e.width, height: e.height }, e.imgStyleVars] }, [e.lazy && e.lazyloading ? i("div", { staticClass: "previewable-image__placeholder" }, [e._t("placeholder", function() {
    return [e._v("Loading...")];
  })], 2) : e.lazy && e.lazyloadError ? i("div", { staticClass: "previewable-image__error" }, [e._t("error", function() {
    return [e._v("Load Error")];
  })], 2) : i("img", { class: [
    "previewable-image__inner",
    { "previewable-image__preview": e.hasPreviewList }
  ], attrs: { src: e.lazySrc, alt: e.alt, referrerpolicy: e.referrerPolicy }, on: { click: e.handleImgView } }), e.initViewer ? i("ImageViewer", { attrs: { "current-preview-index": e.currentViewerIndex, "preview-src-list": e.previewSrcList, "viewer-options": e.viewerOptions, "viewer-title": e.viewerTitle, "z-index": e.zIndex }, on: { "update:currentPreviewIndex": function(l) {
    e.currentViewerIndex = l;
  }, "update:current-preview-index": function(l) {
    e.currentViewerIndex = l;
  }, switch: e.handleSwitch }, model: { value: e.showImageViewer, callback: function(l) {
    e.showImageViewer = l;
  }, expression: "showImageViewer" } }) : e._e()], 1);
}, A = [], B = /* @__PURE__ */ L(
  j,
  U,
  A,
  !1,
  null,
  null,
  null,
  null
);
const V = B.exports, X = (r, e) => {
  const i = Object.assign(
    {
      componentName: V.name,
      defaultViewerOptions: {}
    },
    e
  );
  r.component(i.componentName, V), P.setDefaults(i.defaultViewerOptions);
}, W = {
  install: X
};
export {
  F as ImageViewer,
  V as PreviewableImage,
  G as Viewer,
  W as default
};
