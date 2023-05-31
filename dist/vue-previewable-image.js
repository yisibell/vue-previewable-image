import { ref as f, onMounted as _, onUnmounted as O, defineComponent as $, toRefs as E, computed as v, watch as k, openBlock as g, createElementBlock as z, resolveComponent as x, normalizeStyle as j, renderSlot as b, createTextVNode as L, normalizeClass as B, createBlock as C, createCommentVNode as F } from "vue";
import T from "viewerjs";
import { default as re } from "viewerjs";
const U = (e, r = !0, a, n) => {
  const i = f(), d = f(""), o = f(!1), l = f(!1), p = f(!1), s = f(!1), c = f(), y = () => {
    c.value = new IntersectionObserver(
      (w) => {
        w.forEach((h) => {
          const { intersectionRatio: I, target: m } = h;
          if (I > 0 && !m.classList.contains("lazy-loaded")) {
            const t = new Image();
            s.value = !0, t.addEventListener("load", (u) => {
              m.classList.add("lazy-loaded"), d.value = e, p.value = !0, o.value = !0, l.value = !1, s.value = !1, n && n(u);
            }), t.addEventListener("error", (u) => {
              m.classList.add("lazy-loaded"), p.value = !0, l.value = !0, o.value = !1, s.value = !1, a && a(u);
            }), t.src = e;
          }
        });
      },
      {
        threshold: [1]
      }
    ), i.value && c.value.observe(i.value);
  };
  return _(() => {
    r ? y() : d.value = e;
  }), O(() => {
    var w;
    i.value && ((w = c.value) == null || w.unobserve(i.value));
  }), {
    lazySrc: d,
    lazyloadSuccess: o,
    lazyloadError: l,
    lazyloaded: p,
    lazyloading: s,
    lazyloadTrigger: i
  };
};
function A(e) {
  return typeof e[0] == "string";
}
const R = $({
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
  setup(e, { emit: r }) {
    const { modelValue: a, previewSrcList: n, currentPreviewIndex: i } = E(e), d = v(
      () => n.value && n.value.length > 0
    ), o = f(), l = () => {
      var t;
      (t = o.value) == null || t.view(s.value);
    };
    k(a, (t) => {
      t && l();
    });
    const p = v(() => d.value ? A(n.value) ? n.value.map((t) => ({
      src: t,
      alt: t
    })) : n.value : []), s = v({
      get() {
        return i.value;
      },
      set(t) {
        r("update:currentPreviewIndex", t);
      }
    }), c = v(() => n.value.length || 0), y = () => {
      const t = document.createElement("div");
      return p.value.forEach((u) => {
        const V = new Image();
        Object.keys(u).forEach((S) => {
          V[S] = u[S];
        }), t.appendChild(V);
      }), t.addEventListener("view", (u) => {
        const V = u;
        s.value = V.detail.index, r("switch", s.value, o.value);
      }), t.addEventListener("hidden", (u) => {
        console.log(u), r("update:modelValue", !1);
      }), t;
    }, w = v(() => e.viewerTitle ? (t) => e.viewerTitle(t, {
      index: s.value,
      total: c.value
    }) : (t) => `${t.alt} (${s.value + 1}/${c.value})`), h = v(() => Object.assign(
      {
        title: w.value,
        zIndex: e.zIndex
      },
      e.viewerOptions
    )), I = () => {
      d.value && (o.value = new T(
        y(),
        h.value
      ), a.value && l());
    }, m = () => {
      I();
    };
    return _(() => {
      m();
    }), O(() => {
      var t;
      (t = o.value) == null || t.destroy();
    }), {
      hasPreviewList: d,
      PreviewListLength: c,
      finalPreviewSrcList: p,
      viewer: o,
      handleImgView: l
    };
  }
});
const N = (e, r) => {
  const a = e.__vccOpts || e;
  for (const [n, i] of r)
    a[n] = i;
  return a;
}, M = { class: "image-viewer" };
function q(e, r, a, n, i, d) {
  return g(), z("div", M);
}
const D = /* @__PURE__ */ N(R, [["render", q], ["__scopeId", "data-v-2617510c"]]);
const G = $({
  name: "PreviewableImage",
  components: {
    ImageViewer: D
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
  setup(e, { emit: r }) {
    const { previewSrcList: a, currentPreviewIndex: n } = E(e), i = v(() => ({
      "--img-object-fit": e.fit
    })), {
      lazySrc: d,
      lazyloadTrigger: o,
      lazyloading: l,
      lazyloadError: p,
      lazyloadSuccess: s
    } = U(
      e.src,
      e.lazy,
      (t) => {
        r("load", t);
      },
      (t) => {
        r("error", t);
      }
    ), c = v(
      () => a.value && a.value.length > 0
    ), y = v(() => !(!c.value || e.lazy && !s.value)), w = f(!1), h = () => {
      c.value && (w.value = !0);
    }, I = v({
      get() {
        return n.value;
      },
      set(t) {
        r("update:currentPreviewIndex", t);
      }
    });
    return {
      lazyloadTrigger: o,
      imgStyleVars: i,
      hasPreviewList: c,
      lazySrc: d,
      lazyloading: l,
      lazyloadError: p,
      lazyloadSuccess: s,
      showImageViewer: w,
      handleImgView: h,
      currentViewerIndex: I,
      handleSwitch: (t, u) => {
        r("switch", t, u);
      },
      initViewer: y
    };
  }
});
const H = {
  key: 0,
  class: "previewable-image__placeholder"
}, J = {
  key: 1,
  class: "previewable-image__error"
}, K = ["src", "alt", "referrerpolicy"];
function Q(e, r, a, n, i, d) {
  const o = x("ImageViewer");
  return g(), z("div", {
    ref: "lazyloadTrigger",
    class: "previewable-image",
    style: j([{ width: e.width, height: e.height }, e.imgStyleVars])
  }, [
    e.lazy && e.lazyloading ? (g(), z("div", H, [
      b(e.$slots, "placeholder", {}, () => [
        L("Loading...")
      ])
    ])) : e.lazy && e.lazyloadError ? (g(), z("div", J, [
      b(e.$slots, "error", {}, () => [
        L("Load Error")
      ])
    ])) : (g(), z("img", {
      key: 2,
      src: e.lazySrc,
      alt: e.alt,
      referrerpolicy: e.referrerPolicy,
      class: B([
        "previewable-image__inner",
        { "previewable-image__preview": e.hasPreviewList }
      ]),
      onClick: r[0] || (r[0] = (...l) => e.handleImgView && e.handleImgView(...l))
    }, null, 10, K)),
    e.initViewer ? (g(), C(o, {
      key: 3,
      modelValue: e.showImageViewer,
      "onUpdate:modelValue": r[1] || (r[1] = (l) => e.showImageViewer = l),
      "current-preview-index": e.currentViewerIndex,
      "onUpdate:currentPreviewIndex": r[2] || (r[2] = (l) => e.currentViewerIndex = l),
      "preview-src-list": e.previewSrcList,
      "viewer-options": e.viewerOptions,
      "viewer-title": e.viewerTitle,
      "z-index": e.zIndex,
      onSwitch: e.handleSwitch
    }, null, 8, ["modelValue", "current-preview-index", "preview-src-list", "viewer-options", "viewer-title", "z-index", "onSwitch"])) : F("", !0)
  ], 4);
}
const P = /* @__PURE__ */ N(G, [["render", Q]]), W = (e, r) => {
  const a = Object.assign(
    {
      componentName: P.name,
      defaultViewerOptions: {}
    },
    r
  );
  e.component(a.componentName, P), T.setDefaults(a.defaultViewerOptions);
}, Z = {
  install: W
};
export {
  D as ImageViewer,
  P as PreviewableImage,
  re as Viewer,
  Z as default
};
