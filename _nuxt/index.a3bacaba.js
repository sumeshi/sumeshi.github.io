import{f as v,r as n,o as u,g as m,w as s,d as r,t as g,b as t,m as w,_ as b,a as e,c as x,F as I,h as B,i as $,j as E}from"./entry.6c1fd0cb.js";import{_ as C}from"./Latest.vue.0bd780c5.js";import{u as L}from"./vue.f36acd1f.09dc89db.js";import{a as j}from"./axios.28bc18a3.js";const z=v({__name:"ButtonExternal",props:{message:{},link:{},color:{default:"black"}},setup(f){return(o,l)=>{const a=n("v-btn");return u(),m(a,{class:"btn",href:o.link,color:o.color,target:"_blank",rel:"noopener noreferrer",raised:""},{default:s(()=>[r(g(o.message),1)]),_:1},8,["href","color"])}}});const F=v({__name:"Icon",props:{src:{},link:{},size:{default:200}},setup(f){return(o,l)=>{const a=n("v-img"),c=n("v-avatar"),i=n("router-link"),_=n("v-hover");return u(),m(_,null,{default:s(({isHovering:p,props:d})=>[t(i,{to:"posts"},{default:s(()=>[t(c,w({size:o.size,elevation:p?16:2,class:[{"on-hover":p},"mx-auto"]},d),{default:s(()=>[t(a,{src:o.src},null,8,["src"])]),_:2},1040,["size","elevation","class"])]),_:2},1024)]),_:1})}}});const P=b(F,[["__scopeId","data-v-96ee6eb2"]]),D={class:"mt-2 text-caption"},A=v({__name:"UserOverview",props:{name:{},position:{},icon:{},links:{}},setup(f){return(o,l)=>{const a=z,c=n("v-card-text"),i=n("v-card"),_=n("v-col"),p=P,d=n("v-card-actions"),k=n("v-row");return u(),m(i,{class:"pa-4",justify:"center"},{default:s(()=>[t(k,null,{default:s(()=>[t(_,null,{default:s(()=>[t(i,{class:"elevation-0"},{default:s(()=>[t(c,null,{default:s(()=>[e("h3",null,g(o.name),1),e("p",D,g(o.position),1),(u(!0),x(I,null,B(o.links,(h,y)=>(u(),x("div",{class:"mt-4",key:y},[t(a,{variant:"outlined",class:"text-caption",message:`${h.name} | ${h.message}`,link:h.url,color:h.color},null,8,["message","link","color"])]))),128))]),_:1})]),_:1})]),_:1}),t(_,{class:"d-none d-sm-flex justify-center align-center"},{default:s(()=>[t(i,{class:"elevation-0"},{default:s(()=>[t(d,null,{default:s(()=>[t(p,{src:o.icon.src,link:o.icon.link,size:120},null,8,["src","link"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}}),M={},S=e("p",{class:"pb-2"},"I am a security engineer working in Japan, focusing on forensics and malware analysis.",-1),T=e("p",{class:"pb-2"},"My interests extend beyond security to include new programming languages, design patterns, and technologies.",-1),N=e("p",{class:"pb-2"},"I am primarily active on Twitter and welcome discussions there.",-1),W=e("p",{class:"pb-2"},"Thank you.",-1),J=e("h3",{class:"mt-2"},"From Bachelor's Year 4 to Master's Year 2:",-1),R=e("p",{class:"mt-4 text-caption"},[e("ul",null,[e("li",{class:"pb-2"},"Worked as a Web Engineer for 2 years at a Japanese venture company."),e("li",{class:"pb-2"},"Focused on front-end development with Angular and back-end development with Python."),e("li",{class:"pb-2"},"Developed a full-text search feature utilizing Elasticsearch and machine learning, performed PostgreSQL performance tuning, and created efficient data search queries.")])],-1),U=e("h3",{class:"mt-5"},"After Master's Degree to Present:",-1),V=e("p",{class:"mt-4 text-caption"},[e("ul",null,[e("li",{class:"pb-2"},"Engaged in cybersecurity research at a Japanese IT company."),e("li",{class:"pb-2"},"Specialized in incident response and forensics, malware analysis, and threat intelligence.")])],-1),H=e("h3",{class:"mt-2"},[e("a",{href:"https://github.com/sumeshi/evtx2es",target:"_blank",rel:"noopener noreferrer"},"evtx2es"),r(", "),e("a",{href:"https://github.com/sumeshi/mft2es",target:"_blank",rel:"noopener noreferrer"},"mft2es"),r(":")],-1),O=e("p",{class:"mt-4 text-caption"},[e("ul",null,[e("li",{class:"pb-2"},"Python tools for importing Windows artifacts into Elasticsearch."),e("li",{class:"pb-2"},[r("Included as standard in the DFIR-focused Linux distribution "),e("a",{href:"https://tsurugi-linux.org",target:"_blank",rel:"noopener noreferrer"},"Tsurugi Linux LAB"),r(" 2022.1 - 2023.1.")])])],-1),Y=e("h3",{class:"mt-5"},[e("a",{href:"https://github.com/sumeshi/ntfsdump",target:"_blank",rel:"noopener noreferrer"},"ntfsdump"),r(", "),e("a",{href:"https://github.com/sumeshi/ntfsfind",target:"_blank",rel:"noopener noreferrer"},"ntfsfind"),r(":")],-1),q=e("p",{class:"mt-4 text-caption"},[e("ul",null,[e("li",{class:"pb-2"},"Forensic tools for extracting Windows artifacts from image files.")])],-1);function G(f,o){const l=n("v-card-title"),a=n("v-card-text"),c=n("v-card"),i=n("v-col"),_=n("v-row");return u(),m(c,{class:"mt-5 pa-4",justify:"center"},{default:s(()=>[t(_,null,{default:s(()=>[t(i,null,{default:s(()=>[t(c,{class:"elevation-0"},{default:s(()=>[t(l,{class:"font-weight-black"},{default:s(()=>[r("$ whoami")]),_:1}),t(a,null,{default:s(()=>[t(c,{class:"elevation-0"},{default:s(()=>[t(l,null,{default:s(()=>[r("About Me")]),_:1}),t(a,{class:"text-body-2"},{default:s(()=>[S,T,N,W]),_:1})]),_:1}),t(c,{class:"elevation-0"},{default:s(()=>[t(l,null,{default:s(()=>[r("Career and Experience")]),_:1}),t(a,null,{default:s(()=>[J,R,U,V]),_:1})]),_:1}),t(c,{class:"elevation-0"},{default:s(()=>[t(l,null,{default:s(()=>[r("Projects and Contributions")]),_:1}),t(a,null,{default:s(()=>[H,O,Y,q]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const Q=b(M,[["render",G]]),X=v({__name:"index",setup(f){const o=$([]);return E(()=>{j.get("https://sumeshi.github.io/api/posts/").then(l=>{o.value=l.data.slice(-5).reverse()})}),L({title:"Home"}),(l,a)=>{const c=A,i=Q,_=C,p=n("v-col"),d=n("v-row");return u(),m(d,{justify:"center",align:"center"},{default:s(()=>[t(p,{class:"main"},{default:s(()=>[t(c,{name:"S.Nakano",position:"DFIR Researcher / Software Developer",icon:{src:"/_nuxt/assets/glitchme.jpg",link:"/posts"},links:[{name:"GitHub",url:"https://github.com/sumeshi",message:"@sumeshi",color:"white"},{name:"X",url:"https://twitter.com/sum3sh1",message:"@sum3sh1",color:"white"}]},null,8,["icon","links"]),t(i),t(_,{title:"Latest Posts",postIndices:o.value},null,8,["postIndices"])]),_:1})]),_:1})}}});const se=b(X,[["__scopeId","data-v-c46d94ee"]]);export{se as default};
