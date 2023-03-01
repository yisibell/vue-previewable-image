(function(n,r){typeof exports=="object"&&typeof module<"u"?r(exports,require("vue-demi"),require("viewerjs"),require("vue")):typeof define=="function"&&define.amd?define(["exports","vue-demi","viewerjs","vue"],r):(n=typeof globalThis<"u"?globalThis:n||self,r(n.VuePreviewableImage={},n.vueDemi,n.Viewer,n.Vue))})(this,function(n,r,m,i){"use strict";const j="",g=r.defineComponent({name:"PreviewableImage",props:{width:{type:String},height:{type:String},src:{type:String},alt:{type:String},fit:{type:String,default:"fill"},previewSrcList:{type:Array,default:()=>[]},viewerOptions:{type:Object},viewerTitle:{type:Function}},emits:["switch"],setup(e,{emit:l}){const{previewSrcList:a}=r.toRefs(e),u=i.computed(()=>({"--img-object-fit":e.fit})),o=i.computed(()=>a.value&&a.value.length>0),p=i.computed(()=>o.value?a.value.map(t=>({src:typeof t=="string"?t:t.src,alt:typeof t=="string"?t:t.alt})):[]),s=r.ref(0),v=i.computed(()=>a.value.length||0),b=()=>{const t=document.createElement("div");return p.value.forEach(w=>{const c=new Image;c.src=w.src,c.alt=w.alt||"",t.appendChild(c)}),t.addEventListener("view",w=>{const c=w;s.value=c.detail.index,l("switch",s.value,d.value)}),t},d=r.ref(),V=i.computed(()=>e.viewerTitle?t=>e.viewerTitle(t,{index:s.value,total:v.value}):t=>`${t.alt} [${s.value+1}/${v.value}]`),I=i.computed(()=>Object.assign({title:V.value},e.viewerOptions)),f=()=>{o.value&&(d.value=new m(b(),I.value))};r.watch(a,()=>{f()},{deep:!0});const P=()=>{var t;(t=d.value)==null||t.view()},L=()=>{f()};return r.onMounted(()=>{L()}),{currentViewerIndex:s,PreviewListLength:v,finalPreviewSrcList:p,imgStyleVars:u,viewer:d,handleImgView:P,hasPreviewList:o}}}),O="",h=(e,l)=>{const a=e.__vccOpts||e;for(const[u,o]of l)a[u]=o;return a},y=["src","alt"];function S(e,l,a,u,o,p){return i.openBlock(),i.createElementBlock("div",{class:"previewable-image",style:i.normalizeStyle([{width:e.width,height:e.height},e.imgStyleVars])},[i.createElementVNode("img",{src:e.src,alt:e.alt,class:i.normalizeClass(["previewable-image__inner",{"previewable-image__preview":e.hasPreviewList}]),onClick:l[0]||(l[0]=(...s)=>e.handleImgView&&e.handleImgView(...s))},null,10,y)],4)}const _=h(g,[["render",S]]);n.Viewer=m,n.PreviewableImage=_,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
