import { ref as i, onMounted as $, onUnmounted as T, defineComponent as B, toRefs as C, computed as c, watch as F, openBlock as b, createElementBlock as L, normalizeStyle as R, renderSlot as O, createTextVNode as V, normalizeClass as x } from "vue";
import j from "viewerjs";
import { default as ee } from "viewerjs";
const A = (e, a = !0, r, o) => {
  const l = i(), v = i(""), s = i(!1), y = i(!1), f = i(!1), n = i(!1), g = i(), w = () => {
    g.value = new IntersectionObserver(
      (u) => {
        u.forEach((d) => {
          const { intersectionRatio: m, target: p } = d;
          if (m > 0 && !p.classList.contains("lazy-loaded")) {
            const h = new Image();
            n.value = !0, h.addEventListener("load", (z) => {
              p.classList.add("lazy-loaded"), v.value = e, f.value = !0, s.value = !0, y.value = !1, n.value = !1, o && o(z);
            }), h.addEventListener("error", (z) => {
              p.classList.add("lazy-loaded"), f.value = !0, y.value = !0, s.value = !1, n.value = !1, r && r(z);
            }), h.src = e;
          }
        });
      },
      {
        threshold: [1]
      }
    ), l.value && g.value.observe(l.value);
  };
  return $(() => {
    a ? w() : v.value = e;
  }), T(() => {
    var u;
    l.value && ((u = g.value) == null || u.unobserve(l.value));
  }), {
    lazySrc: v,
    lazyloadSuccess: s,
    lazyloadError: y,
    lazyloaded: f,
    lazyloading: n,
    lazyloadTrigger: l
  };
};
function M(e) {
  return typeof e[0] == "string";
}
const U = B({
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
    // support v-model
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
  setup(e, { emit: a }) {
    const { previewSrcList: r, currentPreviewIndex: o } = C(e), {
      lazySrc: l,
      lazyloadTrigger: v,
      lazyloading: s,
      lazyloadError: y,
      lazyloadSuccess: f
    } = A(
      e.src,
      e.lazy,
      (t) => {
        a("load", t);
      },
      (t) => {
        a("error", t);
      }
    ), n = i(), g = c(() => ({
      "--img-object-fit": e.fit
    })), w = c(
      () => r.value && r.value.length > 0
    ), u = c(() => w.value ? M(r.value) ? r.value.map((t) => ({
      src: t,
      alt: t
    })) : r.value : []), d = c({
      get() {
        return o.value;
      },
      set(t) {
        a("update:currentPreviewIndex", t);
      }
    }), m = c(() => r.value.length || 0), p = () => {
      const t = document.createElement("div");
      return u.value.forEach((I) => {
        const S = new Image();
        Object.keys(I).forEach((_) => {
          S[_] = I[_];
        }), t.appendChild(S);
      }), t.addEventListener("view", (I) => {
        const S = I;
        d.value = S.detail.index, a("switch", d.value, n.value);
      }), t;
    }, h = c(() => e.viewerTitle ? (t) => e.viewerTitle(t, {
      index: d.value,
      total: m.value
    }) : (t) => `${t.alt} (${d.value + 1}/${m.value})`), z = c(() => Object.assign(
      {
        title: h.value,
        zIndex: e.zIndex
      },
      e.viewerOptions
    )), P = () => {
      w.value && (e.lazy && !f.value || (n.value = new j(
        p(),
        z.value
      )));
    };
    F(
      [f, r],
      () => {
        P();
      },
      {
        deep: !0
      }
    );
    const k = () => {
      var t;
      (t = n.value) == null || t.view(d.value);
    }, N = () => {
      P();
    };
    return $(() => {
      N();
    }), T(() => {
      var t;
      (t = n.value) == null || t.destroy();
    }), {
      lazyloadTrigger: v,
      PreviewListLength: m,
      finalPreviewSrcList: u,
      imgStyleVars: g,
      viewer: n,
      handleImgView: k,
      hasPreviewList: w,
      lazySrc: l,
      lazyloading: s,
      lazyloadError: y
    };
  }
});
const q = (e, a) => {
  const r = e.__vccOpts || e;
  for (const [o, l] of a)
    r[o] = l;
  return r;
}, D = {
  key: 0,
  class: "previewable-image__placeholder"
}, G = {
  key: 1,
  class: "previewable-image__error"
}, H = ["src", "alt", "referrerpolicy"];
function J(e, a, r, o, l, v) {
  return b(), L("div", {
    ref: "lazyloadTrigger",
    class: "previewable-image",
    style: R([{ width: e.width, height: e.height }, e.imgStyleVars])
  }, [
    e.lazy && e.lazyloading ? (b(), L("div", D, [
      O(e.$slots, "placeholder", {}, () => [
        V("Loading...")
      ])
    ])) : e.lazy && e.lazyloadError ? (b(), L("div", G, [
      O(e.$slots, "error", {}, () => [
        V("Load Error")
      ])
    ])) : (b(), L("img", {
      key: 2,
      src: e.lazySrc,
      alt: e.alt,
      referrerpolicy: e.referrerPolicy,
      class: x([
        "previewable-image__inner",
        { "previewable-image__preview": e.hasPreviewList }
      ]),
      onClick: a[0] || (a[0] = (...s) => e.handleImgView && e.handleImgView(...s))
    }, null, 10, H))
  ], 4);
}
const E = /* @__PURE__ */ q(U, [["render", J]]), K = (e, a) => {
  const r = Object.assign(
    {
      componentName: E.name,
      defaultViewerOptions: {}
    },
    a
  );
  e.component(r.componentName, E), j.setDefaults(r.defaultViewerOptions);
}, X = {
  install: K
};
export {
  E as PreviewableImage,
  ee as Viewer,
  X as default
};
