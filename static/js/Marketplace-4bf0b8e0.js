import{u as l,z as t,f as e,a as s,k as a,b as i,B as r,ai as n,i as o,aj as p,d,F as u,l as c,o as g,j as h,t as m,p as v,v as w,x,y as b}from"./vendor-c73ab416.js";import{_ as f,a as y,b as k}from"./order_icon-67b197c7.js";import{_ as $,h as _,f as N}from"./index-88971f03.js";import{_ as U}from"./holder_icon-ddd4ff81.js";const C=l=>(w("data-v-5b646e34"),l=l(),x(),l),j={class:"etchCon"},S={class:"etchMiddle mw"},B={class:"market_head"},M=C((()=>i("div",{class:"title"},"Marketplace",-1))),T={class:"etchInput"},Z=C((()=>i("i",null,null,-1))),F=[C((()=>i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"#fff"},[i("path",{fill:"#fff",d:"m15.938 14.188 2.687 2.687c.25.25.25.625 0 .875l-.875.875a.604.604 0 0 1-.875 0L14.25 16c-1.375 1-3 1.563-4.813 1.563a8.109 8.109 0 0 1-8.124-8.125c0-4.5 3.625-8.126 8.124-8.126 4.5 0 8.126 3.625 8.126 8.126a8.52 8.52 0 0 1-1.625 4.75ZM9.375 16.25a6.855 6.855 0 0 0 6.875-6.875A6.855 6.855 0 0 0 9.375 2.5 6.855 6.855 0 0 0 2.5 9.375a6.855 6.855 0 0 0 6.875 6.875Z"})],-1)))],L={class:"table mw"},z={class:"root"},I=C((()=>i("p",null,"Trending Tokens",-1))),A={class:"scroll"},P={class:"tableList"},V=C((()=>i("div",{class:"tableLeft"},[i("p",null,"Collection"),i("p",null,"Floor Price"),i("p",null,"Total Vol"),i("p",null,"Market Cap"),i("p",null,"Holders"),i("p",null,"Listed"),i("p",{style:{width:"20px",flex:"none",height:"1px"}})],-1))),O=["onClick"],q={class:"tableRight"},D={class:"p1"},E=["src"],H=C((()=>i("img",{style:{width:"20px","margin-right":"8px"},src:f,alt:""},null,-1))),R=C((()=>i("img",{style:{width:"20px","margin-right":"8px"},src:N,alt:""},null,-1))),W=C((()=>i("img",{style:{width:"20px","margin-right":"8px"},src:y,alt:""},null,-1))),G=C((()=>i("img",{style:{width:"20px","margin-right":"8px"},src:U,alt:""},null,-1))),J=C((()=>i("img",{style:{width:"20px","margin-right":"8px"},src:k,alt:""},null,-1))),K=C((()=>i("div",{style:{width:"20px",flex:"none"}},[i("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"none",color:"rgba(255,255,255,0.45)"},[i("path",{fill:"currentColor",d:"m5.833 15 5-5-5-5L7.5 3.333 14.167 10 7.5 16.666 5.833 15Z"})])],-1))),Q={class:"pageNum"},X={class:"MuiPagination-ul"};var Y=$({__name:"Marketplace",setup(w){const x=l(),{proxy:f}=b(),y=t();const{total:k,size:$,page:N,list:U,getData:C,keyword:Y}=_(20);function ll(){N.value=1,C()}function tl(l){let t=f.$web3.utils.BN(f.$web3.utils.hexToNumberString("0x"+Number(l||0).toString(16))),e=f.$web3.utils.BN(x.state.wallet.bnbToUsdt);return(Number(t.mul(e).toString())/1e26).toFixed(4)}function el(l){let t=f.$web3.utils.BN(String(l||"0")),e=f.$web3.utils.BN(x.state.wallet.bnbToUsdt);return(Number(t.mul(e).toString())/1e26).toFixed(4)}return C(),(l,t)=>{const w=e("page-header"),b=e("el-pagination");return g(),s("div",j,[a(w),i("div",S,[i("div",B,[M,i("div",T,[r(i("input",{spellcheck:"false","onUpdate:modelValue":t[0]||(t[0]=l=>p(Y)?Y.value=l:null),type:"text",placeholder:"enter the tick name"},null,512),[[n,o(Y)]]),Z,i("button",{onClick:ll},F)])])]),i("div",L,[i("div",z,[I,i("div",{style:d({opacity:o(x).state.wallet.address?1:.5}),onClick:t[1]||(t[1]=l=>o(x).state.wallet.address&&o(y).push({name:"MyEthscriptions"})),class:"bscscriptions_btn"},"All Bscscriptions ",4)]),i("div",A,[i("div",P,[V,(g(!0),s(u,null,c(o(U),((t,e)=>{return g(),s("div",{class:"tableFlex",key:e,onClick:l=>{return e=t,void y.push({name:"detailToken",query:{project_id:e.project_id}});var e}},[i("div",q,[i("div",D,[h(m(t.tick),1),i("span",null,m(t.p),1),l.$Utils.getSrcById(t.project_id)?(g(),s("img",{key:0,src:l.$Utils.getSrcById(t.project_id),style:{width:"20px",height:"20px"}},null,8,E)):v("",!0)]),i("div",null,[H,h(" $"+m(l.$Utils.splitNum(l.$Utils.rpZero(el(t.floor_price))||"0")),1)]),i("div",null,[R,h(m(l.$Utils.splitNum(l.$Utils.rpZero((a=t.totalValue,f.$web3.utils.fromWei(String(a||"0"))||"0")))),1)]),i("div",null,[W,h(" $"+m(l.$Utils.splitNum(l.$Utils.rpZero(tl(t.market_cap)))),1)]),i("div",null,[G,h(m(l.$Utils.splitNum(t.holderAmount||0)),1)]),i("div",null,[J,h(m(l.$Utils.splitNum(t.totalOnSellOrder||0)),1)]),K])],8,O);var a})),128)),i("div",Q,[i("div",X,[a(b,{"page-size":o($),"hide-on-single-page":"","current-page":o(N),"onUpdate:currentPage":t[2]||(t[2]=l=>p(N)?N.value=l:null),onCurrentChange:o(C),layout:"prev, pager, next",total:o(k)},null,8,["page-size","current-page","onCurrentChange","total"])])])])])])])}}},[["__scopeId","data-v-5b646e34"]]);export{Y as default};
