import{_ as k}from"./CY0tO-rr.js";import{f,r as c,o,g as h,w as n,b as e,a as u,t as d,c as _,F as m,h as v,_ as x,i as w,j as y,u as C}from"./jO92AXoW.js";import{_ as b}from"./DKLm6ZsW.js";import{a as I}from"./B6xwUs71.js";const $={class:"mb-4"},j={class:"lines"},z=f({__name:"Button",props:{title:{},text:{},links:{}},setup(g){return(s,a)=>{const p=c("v-card-text"),l=k,i=c("v-card-actions"),r=c("v-card");return o(),h(r,{class:"mt-5 pa-4",justify:"center"},{default:n(()=>[e(r,{class:"elevation-0"},{default:n(()=>[e(p,null,{default:n(()=>[u("h3",$,d(s.title),1),(o(!0),_(m,null,v(s.text,t=>(o(),_("div",{class:"position",key:t.id},[u("p",j,d(t),1)]))),128))]),_:1}),e(i,{class:"text-center"},{default:n(()=>[(o(!0),_(m,null,v(s.links,(t,B)=>(o(),_("div",{class:"pa-4 w-100",key:B},[e(l,{variant:"outlined",class:"text-caption",message:`${t.name} | ${t.message}`,link:t.url,color:t.color},null,8,["message","link","color"])]))),128))]),_:1})]),_:1})]),_:1})}}}),F=x(z,[["__scopeId","data-v-9c00200c"]]),L=f({__name:"index",setup(g){const s=w([]);return y(async()=>{try{const a=await I.get("https://sumeshi.github.io/api/posts/");s.value=a.data.reverse()}catch(a){console.error("Failed to fetch posts data: ",a)}}),C({title:"Posts"}),(a,p)=>{const l=F,i=b,r=c("v-col"),t=c("v-row");return o(),h(t,{justify:"center",align:"center"},{default:n(()=>[e(r,{class:"main"},{default:n(()=>[e(l,{title:"Posts",text:["セキュリティとか興味のあることとか色々。ここで得た知識を悪用しないように。","まとまった内容はdevとかzennに書きます。"],links:[{name:"dev.to",url:"https://dev.to/sum3sh1",message:"@sum3sh1",color:"white"},{name:"zenn.dev",url:"https://zenn.dev/sum3sh1",message:"@sum3sh1",color:"blue-lighten-2"}]}),e(i,{title:"All Posts",postIndices:s.value},null,8,["postIndices"])]),_:1})]),_:1})}}}),A=x(L,[["__scopeId","data-v-efde18ff"]]);export{A as default};