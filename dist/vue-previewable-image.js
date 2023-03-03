import { ref as f, onMounted as P, onUnmounted as O, defineComponent as T, toRefs as $, computed as w, watch as R } from "vue";
import V from "viewerjs";
import { default as G } from "viewerjs";
const x = (t, e = !0, n, y) => {
  const o = f(), u = f(""), d = f(!1), _ = f(!1), a = f(!1), l = f(!1), g = f(), v = () => {
    g.value = new IntersectionObserver(
      (i) => {
        i.forEach((s) => {
          const { intersectionRatio: c, target: p } = s;
          if (c > 0 && !p.classList.contains("lazy-loaded")) {
            const m = new Image();
            l.value = !0, m.addEventListener("load", (h) => {
              p.classList.add("lazy-loaded"), u.value = t, a.value = !0, d.value = !0, _.value = !1, l.value = !1, y && y(h);
            }), m.addEventListener("error", (h) => {
              p.classList.add("lazy-loaded"), a.value = !0, _.value = !0, d.value = !1, l.value = !1, n && n(h);
            }), m.src = t;
          }
        });
      },
      {
        threshold: [1]
      }
    ), o.value && g.value.observe(o.value);
  };
  return P(() => {
    e ? v() : u.value = t;
  }), O(() => {
    var i;
    o.value && ((i = g.value) == null || i.unobserve(o.value));
  }), {
    lazySrc: u,
    lazyloadSuccess: d,
    lazyloadError: _,
    lazyloaded: a,
    lazyloading: l,
    lazyloadTrigger: o
  };
};
function N(t) {
  return typeof t[0] == "string";
}
const F = T({
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
  setup(t, { emit: e }) {
    const { previewSrcList: n, currentPreviewIndex: y } = $(t), {
      lazySrc: o,
      lazyloadTrigger: u,
      lazyloading: d,
      lazyloadError: _,
      lazyloadSuccess: a
    } = x(
      t.src,
      t.lazy,
      (r) => {
        e("load", r);
      },
      (r) => {
        e("error", r);
      }
    ), l = f(), g = w(() => ({
      "--img-object-fit": t.fit
    })), v = w(
      () => n.value && n.value.length > 0
    ), i = w(() => v.value ? N(n.value) ? n.value.map((r) => ({
      src: r,
      alt: r
    })) : n.value : []), s = w({
      get() {
        return y.value;
      },
      set(r) {
        e("update:currentPreviewIndex", r);
      }
    }), c = w(() => n.value.length || 0), p = () => {
      const r = document.createElement("div");
      return i.value.forEach((z) => {
        const b = new Image();
        Object.keys(z).forEach((I) => {
          b[I] = z[I];
        }), r.appendChild(b);
      }), r.addEventListener("view", (z) => {
        const b = z;
        s.value = b.detail.index, e("switch", s.value, l.value);
      }), r;
    }, m = w(() => t.viewerTitle ? (r) => t.viewerTitle(r, {
      index: s.value,
      total: c.value
    }) : (r) => `${r.alt} (${s.value + 1}/${c.value})`), h = w(() => Object.assign(
      {
        title: m.value,
        zIndex: t.zIndex
      },
      t.viewerOptions
    )), S = () => {
      v.value && (t.lazy && !a.value || (l.value = new V(
        p(),
        h.value
      )));
    };
    R(
      [a, n],
      () => {
        S();
      },
      {
        deep: !0
      }
    );
    const C = () => {
      var r;
      (r = l.value) == null || r.view(s.value);
    }, E = () => {
      S();
    };
    return P(() => {
      E();
    }), O(() => {
      var r;
      (r = l.value) == null || r.destroy();
    }), {
      lazyloadTrigger: u,
      PreviewListLength: c,
      finalPreviewSrcList: i,
      imgStyleVars: g,
      viewer: l,
      handleImgView: C,
      hasPreviewList: v,
      lazySrc: o,
      lazyloading: d,
      lazyloadError: _
    };
  }
});
function j(t, e, n, y, o, u, d, _) {
  var a = typeof t == "function" ? t.options : t;
  e && (a.render = e, a.staticRenderFns = n, a._compiled = !0), y && (a.functional = !0), u && (a._scopeId = "data-v-" + u);
  var l;
  if (d ? (l = function(i) {
    i = i || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(d);
  }, a._ssrRegister = l) : o && (l = _ ? function() {
    o.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), l)
    if (a.functional) {
      a._injectStyles = l;
      var g = a.render;
      a.render = function(s, c) {
        return l.call(c), g(s, c);
      };
    } else {
      var v = a.beforeCreate;
      a.beforeCreate = v ? [].concat(v, l) : [l];
    }
  return {
    exports: t,
    options: a
  };
}
var U = function() {
  var e = this, n = e._self._c;
  return e._self._setupProxy, n("div", { ref: "lazyloadTrigger", staticClass: "previewable-image", style: [{ width: e.width, height: e.height }, e.imgStyleVars] }, [e.lazy && e.lazyloading ? n("div", { staticClass: "previewable-image__placeholder" }, [e._t("placeholder", function() {
    return [e._v("Loading...")];
  })], 2) : e.lazy && e.lazyloadError ? n("div", { staticClass: "previewable-image__error" }, [e._t("error", function() {
    return [e._v("Load Error")];
  })], 2) : n("img", { class: [
    "previewable-image__inner",
    { "previewable-image__preview": e.hasPreviewList }
  ], attrs: { src: e.lazySrc, alt: e.alt, referrerpolicy: e.referrerPolicy }, on: { click: e.handleImgView } })]);
}, X = [], A = /* @__PURE__ */ j(
  F,
  U,
  X,
  !1,
  null,
  null,
  null,
  null
);
const L = A.exports, B = (t, e) => {
  const n = Object.assign(
    {
      componentName: L.name,
      defaultViewerOptions: {}
    },
    e
  );
  t.component(n.componentName, L), V.setDefaults(n.defaultViewerOptions);
}, k = {
  install: B
};
export {
  L as PreviewableImage,
  G as Viewer,
  k as default
};
