import { ref as f, onMounted as _, onUnmounted as O, defineComponent as $, toRefs as E, computed as c, watch as k, openBlock as y, createElementBlock as z, resolveComponent as x, normalizeStyle as j, renderSlot as b, createTextVNode as L, normalizeClass as B, createBlock as C, createCommentVNode as F } from "vue";
import T from "viewerjs";
import { default as re } from "viewerjs";
const U = (e, r = !0, a, n) => {
  const l = f(), u = f(""), o = f(!1), i = f(!1), p = f(!1), s = f(!1), d = f(), g = () => {
    d.value = new IntersectionObserver(
      (w) => {
        w.forEach((h) => {
          const { intersectionRatio: I, target: m } = h;
          if (I > 0 && !m.classList.contains("lazy-loaded")) {
            const t = new Image();
            s.value = !0, t.addEventListener("load", (v) => {
              m.classList.add("lazy-loaded"), u.value = e, p.value = !0, o.value = !0, i.value = !1, s.value = !1, n && n(v);
            }), t.addEventListener("error", (v) => {
              m.classList.add("lazy-loaded"), p.value = !0, i.value = !0, o.value = !1, s.value = !1, a && a(v);
            }), t.src = e;
          }
        });
      },
      {
        threshold: [1]
      }
    ), l.value && d.value.observe(l.value);
  };
  return _(() => {
    r ? g() : u.value = e;
  }), O(() => {
    var w;
    l.value && ((w = d.value) == null || w.unobserve(l.value));
  }), {
    lazySrc: u,
    lazyloadSuccess: o,
    lazyloadError: i,
    lazyloaded: p,
    lazyloading: s,
    lazyloadTrigger: l
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
    const { modelValue: a, previewSrcList: n, currentPreviewIndex: l } = E(e), u = c(
      () => n.value && n.value.length > 0
    ), o = f(), i = () => {
      var t;
      (t = o.value) == null || t.view(s.value);
    };
    k(a, (t) => {
      t && i();
    });
    const p = c(() => u.value ? A(n.value) ? n.value.map((t) => ({
      src: t,
      alt: t
    })) : n.value : []), s = c({
      get() {
        return l.value;
      },
      set(t) {
        r("update:currentPreviewIndex", t);
      }
    }), d = c(() => n.value.length || 0), g = () => {
      const t = document.createElement("div");
      return p.value.forEach((v) => {
        const V = new Image();
        Object.keys(v).forEach((S) => {
          V[S] = v[S];
        }), t.appendChild(V);
      }), t.addEventListener("view", (v) => {
        const V = v;
        s.value = V.detail.index, r("switch", s.value, o.value);
      }), t.addEventListener("hidden", () => {
        r("update:modelValue", !1);
      }), t;
    }, w = c(() => e.viewerTitle ? (t) => e.viewerTitle(t, {
      index: s.value,
      total: d.value
    }) : (t) => `${t.alt} (${s.value + 1}/${d.value})`), h = c(() => Object.assign(
      {
        title: w.value,
        zIndex: e.zIndex
      },
      e.viewerOptions
    )), I = () => {
      u.value && (o.value = new T(
        g(),
        h.value
      ), a.value && i());
    }, m = () => {
      I();
    };
    return _(() => {
      m();
    }), O(() => {
      var t;
      (t = o.value) == null || t.destroy();
    }), {
      hasPreviewList: u,
      PreviewListLength: d,
      finalPreviewSrcList: p,
      viewer: o,
      handleImgView: i
    };
  }
});
const N = (e, r) => {
  const a = e.__vccOpts || e;
  for (const [n, l] of r)
    a[n] = l;
  return a;
}, M = { class: "image-viewer" };
function q(e, r, a, n, l, u) {
  return y(), z("div", M);
}
const D = /* @__PURE__ */ N(R, [["render", q], ["__scopeId", "data-v-def9c787"]]);
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
    const { previewSrcList: a, currentPreviewIndex: n } = E(e), l = c(() => ({
      "--img-object-fit": e.fit
    })), {
      lazySrc: u,
      lazyloadTrigger: o,
      lazyloading: i,
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
    ), d = c(
      () => a.value && a.value.length > 0
    ), g = c(() => !(!d.value || e.lazy && !s.value)), w = f(!1), h = () => {
      d.value && (w.value = !0);
    }, I = c({
      get() {
        return n.value;
      },
      set(t) {
        r("update:currentPreviewIndex", t);
      }
    });
    return {
      lazyloadTrigger: o,
      imgStyleVars: l,
      hasPreviewList: d,
      lazySrc: u,
      lazyloading: i,
      lazyloadError: p,
      lazyloadSuccess: s,
      showImageViewer: w,
      handleImgView: h,
      currentViewerIndex: I,
      handleSwitch: (t, v) => {
        r("switch", t, v);
      },
      initViewer: g
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
function Q(e, r, a, n, l, u) {
  const o = x("ImageViewer");
  return y(), z("div", {
    ref: "lazyloadTrigger",
    class: "previewable-image",
    style: j([{ width: e.width, height: e.height }, e.imgStyleVars])
  }, [
    e.lazy && e.lazyloading ? (y(), z("div", H, [
      b(e.$slots, "placeholder", {}, () => [
        L("Loading...")
      ])
    ])) : e.lazy && e.lazyloadError ? (y(), z("div", J, [
      b(e.$slots, "error", {}, () => [
        L("Load Error")
      ])
    ])) : (y(), z("img", {
      key: 2,
      src: e.lazySrc,
      alt: e.alt,
      referrerpolicy: e.referrerPolicy,
      class: B([
        "previewable-image__inner",
        { "previewable-image__preview": e.hasPreviewList }
      ]),
      onClick: r[0] || (r[0] = (...i) => e.handleImgView && e.handleImgView(...i))
    }, null, 10, K)),
    e.initViewer ? (y(), C(o, {
      key: 3,
      modelValue: e.showImageViewer,
      "onUpdate:modelValue": r[1] || (r[1] = (i) => e.showImageViewer = i),
      "current-preview-index": e.currentViewerIndex,
      "onUpdate:currentPreviewIndex": r[2] || (r[2] = (i) => e.currentViewerIndex = i),
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
