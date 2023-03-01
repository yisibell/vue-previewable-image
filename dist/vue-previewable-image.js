import { defineComponent as _, toRefs as S, ref as p, watch as V, onMounted as b } from "vue-demi";
import I from "viewerjs";
import { default as R } from "viewerjs";
import { computed as l, openBlock as L, createElementBlock as P, normalizeStyle as $, createElementVNode as O, normalizeClass as E } from "vue";
const k = _({
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
  setup(e, { emit: n }) {
    const { previewSrcList: r } = S(e), o = l(() => ({
      "--img-object-fit": e.fit
    })), a = l(
      () => r.value && r.value.length > 0
    ), v = l(() => a.value ? r.value.map((t) => ({
      src: typeof t == "string" ? t : t.src,
      alt: typeof t == "string" ? t : t.alt
    })) : []), i = p(0), w = l(() => r.value.length || 0), g = () => {
      const t = document.createElement("div");
      return v.value.forEach((u) => {
        const s = new Image();
        s.src = u.src, s.alt = u.alt || "", t.appendChild(s);
      }), t.addEventListener("view", (u) => {
        const s = u;
        i.value = s.detail.index, n("switch", i.value, c.value);
      }), t;
    }, c = p(), d = l(() => e.viewerTitle ? (t) => e.viewerTitle(t, {
      index: i.value,
      total: w.value
    }) : (t) => `${t.alt} [${i.value + 1}/${w.value}]`), f = l(() => Object.assign(
      {
        title: d.value
      },
      e.viewerOptions
    )), m = () => {
      a.value && (c.value = new I(
        g(),
        f.value
      ));
    };
    V(
      r,
      () => {
        m();
      },
      {
        deep: !0
      }
    );
    const h = () => {
      var t;
      (t = c.value) == null || t.view();
    }, y = () => {
      m();
    };
    return b(() => {
      y();
    }), {
      currentViewerIndex: i,
      PreviewListLength: w,
      finalPreviewSrcList: v,
      imgStyleVars: o,
      viewer: c,
      handleImgView: h,
      hasPreviewList: a
    };
  }
});
const C = (e, n) => {
  const r = e.__vccOpts || e;
  for (const [o, a] of n)
    r[o] = a;
  return r;
}, j = ["src", "alt"];
function T(e, n, r, o, a, v) {
  return L(), P("div", {
    class: "previewable-image",
    style: $([{ width: e.width, height: e.height }, e.imgStyleVars])
  }, [
    O("img", {
      src: e.src,
      alt: e.alt,
      class: E([
        "previewable-image__inner",
        { "previewable-image__preview": e.hasPreviewList }
      ]),
      onClick: n[0] || (n[0] = (...i) => e.handleImgView && e.handleImgView(...i))
    }, null, 10, j)
  ], 4);
}
const A = /* @__PURE__ */ C(k, [["render", T]]);
export {
  A as PreviewableImage,
  R as Viewer
};
