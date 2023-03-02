import { defineComponent as b, toRefs as P, ref as S, computed as u, watch as C, onMounted as I, onUnmounted as V } from "vue";
import $ from "viewerjs";
import { default as X } from "viewerjs";
function L(n) {
  return typeof n[0] == "string";
}
const O = b({
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
    }
  },
  emits: ["switch", "update:currentPreviewIndex"],
  setup(n, { emit: r }) {
    const { previewSrcList: i, currentPreviewIndex: h } = P(n), l = S(), v = u(() => ({
      "--img-object-fit": n.fit
    })), o = u(
      () => i.value && i.value.length > 0
    ), c = u(() => o.value ? L(i.value) ? i.value.map((t) => ({
      src: t,
      alt: t
    })) : i.value : []), e = u({
      get() {
        return h.value;
      },
      set(t) {
        r("update:currentPreviewIndex", t);
      }
    }), a = u(() => i.value.length || 0), m = () => {
      const t = document.createElement("div");
      return c.value.forEach((_) => {
        const p = new Image();
        Object.keys(_).forEach((g) => {
          p[g] = _[g];
        }), t.appendChild(p);
      }), t.addEventListener("view", (_) => {
        const p = _;
        e.value = p.detail.index, r("switch", e.value, l.value);
      }), t;
    }, f = u(() => n.viewerTitle ? (t) => n.viewerTitle(t, {
      index: e.value,
      total: a.value
    }) : (t) => `${t.alt} (${e.value + 1}/${a.value})`), s = u(() => Object.assign(
      {
        title: f.value
      },
      n.viewerOptions
    )), d = () => {
      o.value && (l.value = new $(
        m(),
        s.value
      ));
    };
    C(
      i,
      () => {
        d();
      },
      {
        deep: !0
      }
    );
    const w = () => {
      var t;
      (t = l.value) == null || t.view(e.value);
    }, y = () => {
      d();
    };
    return I(() => {
      y();
    }), V(() => {
      var t;
      (t = l.value) == null || t.destroy();
    }), {
      PreviewListLength: a,
      finalPreviewSrcList: c,
      imgStyleVars: v,
      viewer: l,
      handleImgView: w,
      hasPreviewList: o
    };
  }
});
function R(n, r, i, h, l, v, o, c) {
  var e = typeof n == "function" ? n.options : n;
  r && (e.render = r, e.staticRenderFns = i, e._compiled = !0), h && (e.functional = !0), v && (e._scopeId = "data-v-" + v);
  var a;
  if (o ? (a = function(s) {
    s = s || // cached call
    this.$vnode && this.$vnode.ssrContext || // stateful
    this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), l && l.call(this, s), s && s._registeredComponents && s._registeredComponents.add(o);
  }, e._ssrRegister = a) : l && (a = c ? function() {
    l.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), a)
    if (e.functional) {
      e._injectStyles = a;
      var m = e.render;
      e.render = function(d, w) {
        return a.call(w), m(d, w);
      };
    } else {
      var f = e.beforeCreate;
      e.beforeCreate = f ? [].concat(f, a) : [a];
    }
  return {
    exports: n,
    options: e
  };
}
var T = function() {
  var r = this, i = r._self._c;
  return r._self._setupProxy, i("div", { staticClass: "previewable-image", style: [{ width: r.width, height: r.height }, r.imgStyleVars] }, [i("img", { class: [
    "previewable-image__inner",
    { "previewable-image__preview": r.hasPreviewList }
  ], attrs: { src: r.src, alt: r.alt }, on: { click: r.handleImgView } })]);
}, E = [], F = /* @__PURE__ */ R(
  O,
  T,
  E,
  !1,
  null,
  null,
  null,
  null
);
const U = F.exports;
export {
  U as PreviewableImage,
  X as Viewer
};
