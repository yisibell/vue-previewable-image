import { defineComponent as y, toRefs as b, computed as u, ref as g, watch as C, onMounted as S, onUnmounted as V } from "vue";
import P from "viewerjs";
import { default as N } from "viewerjs";
const $ = y({
  name: "PreviewableImage",
  props: {
    width: {
      type: String
    },
    height: {
      type: String
    },
    src: {
      type: String
    },
    alt: {
      type: String
    },
    fit: {
      type: String,
      default: "fill"
    },
    previewSrcList: {
      type: Array,
      default: () => []
    },
    viewerOptions: {
      type: Object
    },
    viewerTitle: {
      type: Function
    }
  },
  emits: ["switch"],
  setup(a, { emit: r }) {
    const { previewSrcList: s } = b(a), p = u(() => ({
      "--img-object-fit": a.fit
    })), l = u(
      () => s.value && s.value.length > 0
    ), c = u(() => l.value ? s.value.map((e) => ({
      src: typeof e == "string" ? e : e.src,
      alt: typeof e == "string" ? e : e.alt
    })) : []), o = g(0), v = u(() => s.value.length || 0), t = () => {
      const e = document.createElement("div");
      return c.value.forEach((w) => {
        const f = new Image();
        f.src = w.src, f.alt = w.alt || "", e.appendChild(f);
      }), e.addEventListener("view", (w) => {
        const f = w;
        o.value = f.detail.index, r("switch", o.value, i.value);
      }), e;
    }, i = g(), m = u(() => a.viewerTitle ? (e) => a.viewerTitle(e, {
      index: o.value,
      total: v.value
    }) : (e) => `${e.alt} [${o.value + 1}/${v.value}]`), _ = u(() => Object.assign(
      {
        title: m.value
      },
      a.viewerOptions
    )), n = () => {
      l.value && (i.value = new P(
        t(),
        _.value
      ));
    };
    C(
      s,
      () => {
        n();
      },
      {
        deep: !0
      }
    );
    const h = () => {
      var e;
      (e = i.value) == null || e.view();
    }, d = () => {
      n();
    };
    return S(() => {
      d();
    }), V(() => {
      var e;
      (e = i.value) == null || e.destroy();
    }), {
      currentViewerIndex: o,
      PreviewListLength: v,
      finalPreviewSrcList: c,
      imgStyleVars: p,
      viewer: i,
      handleImgView: h,
      hasPreviewList: l
    };
  }
});
function I(a, r, s, p, l, c, o, v) {
  var t = typeof a == "function" ? a.options : a;
  r && (t.render = r, t.staticRenderFns = s, t._compiled = !0), p && (t.functional = !0), c && (t._scopeId = "data-v-" + c);
  var i;
  if (o ? (i = function(n) {
    n = n || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), l && l.call(this, n), n && n._registeredComponents && n._registeredComponents.add(o);
  }, t._ssrRegister = i) : l && (i = v ? function() {
    l.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), i)
    if (t.functional) {
      t._injectStyles = i;
      var m = t.render;
      t.render = function(h, d) {
        return i.call(d), m(h, d);
      };
    } else {
      var _ = t.beforeCreate;
      t.beforeCreate = _ ? [].concat(_, i) : [i];
    }
  return {
    exports: a,
    options: t
  };
}
var L = function() {
  var r = this, s = r._self._c;
  return r._self._setupProxy, s("div", { staticClass: "previewable-image", style: [{ width: r.width, height: r.height }, r.imgStyleVars] }, [s("img", { class: [
    "previewable-image__inner",
    { "previewable-image__preview": r.hasPreviewList }
  ], attrs: { src: r.src, alt: r.alt }, on: { click: r.handleImgView } })]);
}, O = [], R = /* @__PURE__ */ I(
  $,
  L,
  O,
  !1,
  null,
  null,
  null,
  null
);
const F = R.exports;
export {
  F as PreviewableImage,
  N as Viewer
};
