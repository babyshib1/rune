import{ao as s,r as a,f as e,o as l,a as t,k as d,b as i,B as n,ai as c,F as p,l as v,j as r,t as u,an as o,s as h,v as m,x as f}from"./vendor-c73ab416.js";import{_ as x,i as g}from"./index-3dbf1fc1.js";const b=s=>(m("data-v-7d200221"),s=s(),f(),s),w={class:"etchCon"},y={class:"etchMiddle mw"},k={class:"market_head"},_=b((()=>i("div",{class:"title"},"Runes",-1))),C={class:"etchInput"},R=b((()=>i("i",null,null,-1))),B=[b((()=>i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"#fff"},[i("path",{fill:"#fff",d:"m15.938 14.188 2.687 2.687c.25.25.25.625 0 .875l-.875.875a.604.604 0 0 1-.875 0L14.25 16c-1.375 1-3 1.563-4.813 1.563a8.109 8.109 0 0 1-8.124-8.125c0-4.5 3.625-8.126 8.124-8.126 4.5 0 8.126 3.625 8.126 8.126a8.52 8.52 0 0 1-1.625 4.75ZM9.375 16.25a6.855 6.855 0 0 0 6.875-6.875A6.855 6.855 0 0 0 9.375 2.5 6.855 6.855 0 0 0 2.5 9.375a6.855 6.855 0 0 0 6.875 6.875Z"})],-1)))],M=b((()=>i("div",{class:"sub-title"},"bsc-20 rune platform",-1))),j={class:"table mw"},L={class:"scroll"},P={class:"tableList"},S=h('<div class="tableLeft" data-v-7d200221><p data-v-7d200221>Rune</p><p class="text-center" data-v-7d200221>Suppli</p><p class="text-center" data-v-7d200221>Progress </p><p class="text-center" data-v-7d200221>Holders</p><p data-v-7d200221> Deploy Time </p><p data-v-7d200221></p><p style="width:20px;flex:none;height:1px;" data-v-7d200221></p></div>',1),F={class:"tableRight"},I={class:"p1"},V=b((()=>i("img",{src:g,style:{width:"20px",height:"20px"}},null,-1))),Z={class:"text-center"},A={class:"Progress"},D=b((()=>i("div",{class:"procces_main"},[i("div",{class:"index",style:{width:"100%"}})],-1))),H={class:"text-center"},N=b((()=>i("div",{class:"pageNum"},[i("div",{class:"MuiPagination-ul"})],-1)));var T=x(s({__name:"Runes",setup(s){const h=a([{type:"BSCR",name:"BSC-20",supply:"100,000,000",progress:"0%",holders:"0",created:"2021-09-09 12:00:00"}]),m=a(""),f=()=>{};return(s,a)=>{const x=e("page-header");return l(),t("div",w,[d(x),i("div",y,[i("div",k,[_,i("div",C,[n(i("input",{spellcheck:"false","onUpdate:modelValue":a[0]||(a[0]=s=>m.value=s),type:"text",placeholder:"enter the tick name"},null,512),[[c,m.value]]),R,i("button",{onClick:f},B)]),M])]),i("div",j,[i("div",L,[i("div",P,[S,(l(!0),t(p,null,v(h.value,((e,d)=>(l(),t("div",{class:"tableFlex",key:d,onClick:a[2]||(a[2]=()=>s.$router.push({path:"/RuneView"}))},[i("div",F,[i("div",I,[r(u(e.type)+" ",1),i("span",null,u(e.name),1),V]),i("div",null,[i("div",Z,u(e.supply),1)]),i("div",A,[i("span",null,u(e.progress),1),D]),i("div",null,[i("div",H,u(e.holders),1)]),i("div",null,[i("span",null,u(e.created),1)]),i("div",null,[i("button",{class:"mintBtn",onClick:a[1]||(a[1]=o((()=>{}),["stop"]))},"Mint")])])])))),128)),N])])])])}}}),[["__scopeId","data-v-7d200221"]]);export{T as default};