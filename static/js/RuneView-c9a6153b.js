import{ao as e,r as t,ap as a,f as n,o as s,a as i,k as l,b as o,t as r,X as u,E as c,v as m,x as d,K as p}from"./vendor-2ecfd57a.js";import{b as f}from"./bscr-f4aa9d5c.js";import{_ as v}from"./index-5c783464.js";var y=[{inputs:[],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{inputs:[],name:"claim",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"ethMap",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getStakeCount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"getUserInfo",outputs:[{internalType:"uint256",name:"stakeAmount",type:"uint256"},{internalType:"uint256",name:"reward",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"redeem",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"rewardMap",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"stakeAmount",type:"uint256"}],name:"stake",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"stakeAmountMap",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"token_",type:"address"}],name:"sweep",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"tax",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"token",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalStake",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"users",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{stateMutability:"payable",type:"receive"}];const h=e=>(m("data-v-6554ce96"),e=e(),d(),e),g={class:"etchCon"},w={class:"rune-view"},k=h((()=>o("h2",{class:"rune-title"},"RUNE",-1))),b={class:"rune-detail-info"},C={class:"rune-detail-info-left"},S=h((()=>o("h3",{class:"rune-detail-info-title"},"BSCR POOL",-1))),B=h((()=>o("div",{class:"rune-detail-info-introduce"},[o("p",null,"Total supply: 210,000"),o("p",null," Only 50 valid minting transactions per block, and the fees for failed minting will be refunded. "),o("p",null,"Automatic addition of 20% liquidity."),o("p",null," Transaction tax: 5% (BSCR Fund Pool 2%, BSCS Fund Pool 2%, Marketing 1%). "),o("p",null,"Every hour, 0.1% of BSCR in liquidity is burned.")],-1))),T={class:"rune-mint-info"},M={class:"rune-mint-info-item"},N=h((()=>o("span",{class:"rune-mint-info-item-title"},"Total staking ",-1))),P={class:"rune-mint-info-item-value"},A={class:"rune-mint-info-item"},O=h((()=>o("span",{class:"rune-mint-info-item-title"},"Number of stakers",-1))),x={class:"rune-mint-info-item-value"},R={class:"rune-mint-info-item"},F=h((()=>o("span",{class:"rune-mint-info-item-title"},"Fund pools",-1))),W={class:"rune-mint-info-item-value"},j={class:"rune-mint-address"},E={class:"rune-mint-address-item"},I=h((()=>o("span",{class:"rune-mint-address-item-title"},"Pledge contract",-1))),U={class:"rune-mint-address-item-value"},_={class:"rune-mint-address-item"},$=h((()=>o("span",{class:"rune-mint-address-item-title"},"Token contract",-1))),G={class:"rune-mint-address-item-value"},H={class:"rune-detail-info-right"},J={class:"rune-mint-info"},L={class:"rune-mint-info-item"},q=h((()=>o("span",{class:"rune-mint-info-item-title"},"Staking",-1))),D={class:"rune-mint-info-item-value"},K={class:"rune-mint-info-item"},V=h((()=>o("span",{class:"rune-mint-info-item-title"},"Bonus",-1))),X={class:"rune-mint-info-item-value"},z={class:"rune-console"},Q={class:"rune-console-item"},Y={class:"rune-console-item-title"},Z={class:"rune-console-item"},ee={class:"rune-console-item-title"},te={class:"rune-console-item"},ae={class:"rune-console-item-title"},ne=h((()=>o("div",{class:"rune-detail-info-introduce"},[o("p",null," Users can stake any amount of BSCR runes in the fund pool with a staking tax rate of 5%. "),o("p",null,"Staking is used to share BNB from the staking pool.")],-1))),se={class:"rune-detail-info"},ie={class:"rune-detail-info-left"},le=h((()=>o("h3",{class:"rune-detail-info-title"},"BSCS POOL",-1))),oe=h((()=>o("div",{class:"rune-detail-info-introduce"},[o("p",null,"Total supply: 5000"),o("p",null," Users can stake any amount of BSCS inscription in the fund pool with a staking tax rate of 0%. "),o("p",null,"Staking is used to share BNB from the staking pool.")],-1))),re={class:"rune-mint-info"},ue={class:"rune-mint-info-item"},ce=h((()=>o("span",{class:"rune-mint-info-item-title"},"Total staking ",-1))),me={class:"rune-mint-info-item-value"},de={class:"rune-mint-info-item"},pe=h((()=>o("span",{class:"rune-mint-info-item-title"},"Number of stakers",-1))),fe={class:"rune-mint-info-item-value"},ve={class:"rune-mint-info-item"},ye=h((()=>o("span",{class:"rune-mint-info-item-title"},"Fund pools",-1))),he={class:"rune-mint-info-item-value"},ge={class:"rune-mint-address"},we={class:"rune-mint-address-item"},ke=h((()=>o("span",{class:"rune-mint-address-item-title"},"Pledge contract",-1))),be={class:"rune-mint-address-item-value"},Ce={class:"rune-detail-info-right"},Se={class:"rune-mint-info"},Be={class:"rune-mint-info-item"},Te=h((()=>o("span",{class:"rune-mint-info-item-title"},"Staking",-1))),Me={class:"rune-mint-info-item-value"},Ne={class:"rune-mint-info-item"},Pe=h((()=>o("span",{class:"rune-mint-info-item-title"},"Bonus",-1))),Ae={class:"rune-mint-info-item-value"},Oe={class:"rune-console"},xe={class:"rune-console-item"},Re={class:"rune-console-item-title"},Fe=h((()=>o("span",{class:"rune-console-item-button"},"Stake",-1))),We={class:"rune-console-item"},je={class:"rune-console-item-title"},Ee=h((()=>o("span",{class:"rune-console-item-button"},"Claim",-1))),Ie={class:"rune-console-item"},Ue={class:"rune-console-item-title"},_e=h((()=>o("span",{class:"rune-console-item-button"},"Redeem",-1))),$e=h((()=>o("div",{class:"rune-detail-info-introduce"},[o("p",null," Users can stake any amount of BSCS inscription in the fund pool with a staking tax rate of 0%. "),o("p",null,"Staking is used to share BNB from the staking pool.")],-1)));var Ge=v(e({__name:"RuneView",setup(e){t({name:"RUNE",image:"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg",description:"",stats:{attack:10,defense:10,magic:10,difficulty:10}});const m=t("0x40249a500d9e74B0c951631Fe576D7eF46598545"),d=t({totalStake:"0",stakers:"0",fundPools:"0",pledgeContract:"0x12e1ab713E98323C997fFf02E65F64F330ff1c14"}),v=t({totalStake:"0",stakers:"0",fundPools:"0",pledgeContract:"--"}),h=t({staking:"0",bonus:"0",balance:"0",allowance:"0"}),Ge=t({staking:"0",bonus:"0",balance:"0"}),He=t(null),Je=()=>{He.value=p.service({lock:!0,text:"Loading",background:"rgba(0, 0, 0, 0.7)"})},Le=()=>{He.value.close()},qe=async()=>{const e=window.ethereum;if(!e)return;const t=new u(e);if(56!==await t.eth.getChainId())return c({message:"Please switch to BSC network.",type:"error"});const a=new t.eth.Contract(f,m.value),n=new t.eth.Contract(y,d.value.pledgeContract),s=await t.eth.getAccounts().then((e=>e[0]));n.defaultAccount=s;try{const e=await n.methods.totalStake().call(),a=await n.methods.getStakeCount().call(),s=await t.eth.getBalance(d.value.pledgeContract);d.value.totalStake=u.utils.fromWei(e,"ether"),d.value.stakers=a,d.value.fundPools=u.utils.fromWei(s,"ether")}catch(i){}try{const e=await n.methods.getUserInfo().call(),t=await a.methods.balanceOf(s).call(),i=await a.methods.allowance(s,d.value.pledgeContract).call();h.value.staking=u.utils.fromWei(e.stakeAmount,"ether"),h.value.bonus=u.utils.fromWei(e.reward,"ether"),h.value.balance=u.utils.fromWei(t,"ether"),h.value.allowance=u.utils.fromWei(i,"ether")}catch(i){}try{const e=await t.eth.getBalance("0xaE73066BfC1986dD9ff5E85F3162A23e74839d12");v.value.fundPools=u.utils.fromWei(e,"ether")}catch(i){}await new Promise((e=>setTimeout(e,3e3))),qe()},De=async()=>{Je(),await(async()=>{var e;const t=window.ethereum;if(!t)return;const a=new u(t);if(56!==await a.eth.getChainId())return c({message:"Please switch to BSC network.",type:"error"});const n=new a.eth.Contract(f,m.value),s=await a.eth.getAccounts().then((e=>e[0]));n.defaultAccount=s;try{const e=[d.value.pledgeContract,u.utils.toWei(h.value.balance,"ether")],t=await n.methods.approve(...e).estimateGas({from:s}),a=await n.methods.approve(...e).send({from:s,gas:Math.floor(1.5*t),gasPrice:3e9});c({message:`Approve transaction has been sent. ${a.transactionHash}`,type:"info"})}catch(i){let t=(null==(e=i.message)?void 0:e.message)||i.reason||i.message||i;try{t=JSON.parse(t.split("\n").slice(1).join("")),t=t.message}catch(l){}c({message:t,type:"error"})}})(),Le()},Ke=async()=>{if("0"===h.value.balance)return c({message:"No Balance",type:"error"});Je(),await(async()=>{var e;const t=window.ethereum;if(!t)return;const a=new u(t);if(56!==await a.eth.getChainId())return c({message:"Please switch to BSC network.",type:"error"});const n=new a.eth.Contract(y,d.value.pledgeContract),s=await a.eth.getAccounts().then((e=>e[0]));n.defaultAccount=s;try{const e=[u.utils.toWei(h.value.balance,"ether")],t=await n.methods.stake(...e).estimateGas({from:s}),a=await n.methods.stake(u.utils.toWei(h.value.balance,"ether")).send({from:s,gas:Math.floor(1.5*t),gasPrice:3e9});c({message:`Stake transaction has been sent. ${a.transactionHash}`,type:"info"})}catch(i){let t=(null==(e=i.message)?void 0:e.message)||i.reason||i.message||i;try{t=JSON.parse(t.split("\n").slice(1).join("")),t=t.message}catch(l){}c({message:t,type:"error"})}})(),Le()},Ve=async()=>{if("0"===h.value.bonus)return c({message:"No Bones",type:"error"});Je(),await(async()=>{var e;const t=window.ethereum;if(!t)return;const a=new u(t);if(56!==await a.eth.getChainId())return c({message:"Please switch to BSC network.",type:"error"});const n=new a.eth.Contract(y,d.value.pledgeContract),s=await a.eth.getAccounts().then((e=>e[0]));n.defaultAccount=s;try{const e=[],t=await n.methods.claim(...e).estimateGas({from:s}),a=await n.methods.claim(...e).send({from:s,gas:Math.floor(1.5*t),gasPrice:3e9});c({message:`Claim transaction has been sent. ${a.transactionHash}`,type:"info"})}catch(i){let t=(null==(e=i.message)?void 0:e.message)||i.reason||i.message||i;try{t=JSON.parse(t.split("\n").slice(1).join("")),t=t.message}catch(l){}c({message:t,type:"error"})}})(),Le()},Xe=async()=>{if("0"===h.value.staking)return c({message:"No Stake",type:"error"});Je(),await(async()=>{var e;const t=window.ethereum;if(!t)return;const a=new u(t);if(56!==await a.eth.getChainId())return c({message:"Please switch to BSC network.",type:"error"});const n=new a.eth.Contract(y,d.value.pledgeContract),s=await a.eth.getAccounts().then((e=>e[0]));n.defaultAccount=s;try{const e=[],t=await n.methods.redeem(...e).estimateGas({from:s}),a=await n.methods.redeem(...e).send({from:s,gas:Math.floor(1.5*t),gasPrice:3e9});c({message:`Redeem transaction has been sent. ${a.transactionHash}`,type:"info"})}catch(i){let t=(null==(e=i.message)?void 0:e.message)||i.reason||i.message||i;try{t=JSON.parse(t.split("\n").slice(1).join("")),t=t.message}catch(l){}c({message:t,type:"error"})}})(),Le()};a((()=>{qe()}));const ze=(e,t,a)=>{const n=(e=e.toString()).indexOf(".");if(-1==n)return e;const s=e.split(".")[1].search(/[^0]/);return s?(a=a||Math.ceil(t/2),e=e.slice(0,n+s+a+1)):e=e.slice(0,n+t+1),e.replace(/0*$/,"").replace(/\.$/,"")};return(e,t)=>{const a=n("page-header");return s(),i("div",g,[l(a),o("div",w,[k,o("div",b,[o("div",C,[S,B,o("div",T,[o("div",M,[N,o("span",P,r(ze(d.value.totalStake,4))+" BSCR",1)]),o("div",A,[O,o("span",x,r(d.value.stakers),1)]),o("div",R,[F,o("span",W,r(ze(d.value.fundPools,4))+" BNB",1)])]),o("div",j,[o("div",E,[I,o("span",U,r(d.value.pledgeContract),1)]),o("div",_,[$,o("span",G,r(m.value),1)])])]),o("div",H,[o("div",J,[o("div",L,[q,o("span",D,r(ze(h.value.staking,4))+" BSCR",1)]),o("div",K,[V,o("span",X,r(ze(h.value.bonus,4))+" BNB",1)])]),o("div",z,[o("div",Q,[o("span",Y,"Stake:"+r(ze(h.value.balance,4))+" BSCR ",1),Number(h.value.balance)>Number(h.value.allowance)?(s(),i("span",{key:0,class:"rune-console-item-button",onClick:De}," Approve ")):(s(),i("span",{key:1,class:"rune-console-item-button",onClick:Ke}," Stake "))]),o("div",Z,[o("div",ee,[o("div",null,"Claim:"+r(ze(h.value.bonus,4))+" BNB",1)]),o("span",{class:"rune-console-item-button",onClick:Ve},"Claim")]),o("div",te,[o("div",ae,[o("div",null," Redeem:"+r(ze(h.value.staking,4))+" BSCR ",1)]),o("span",{class:"rune-console-item-button",onClick:Xe},"Redeem")])]),ne])]),o("div",se,[o("div",ie,[le,oe,o("div",re,[o("div",ue,[ce,o("span",me,r(ze(v.value.totalStake,4))+" BSCS ",1)]),o("div",de,[pe,o("span",fe,r(v.value.stakers),1)]),o("div",ve,[ye,o("span",he,r(ze(v.value.fundPools,4))+" BNB",1)])]),o("div",ge,[o("div",we,[ke,o("span",be,r(v.value.pledgeContract),1)])])]),o("div",Ce,[o("div",Se,[o("div",Be,[Te,o("span",Me,r(ze(Ge.value.staking,4))+" BSCS",1)]),o("div",Ne,[Pe,o("span",Ae,r(ze(Ge.value.bonus,4))+" BNB",1)])]),o("div",Oe,[o("div",xe,[o("span",Re,"Stake:"+r(ze(Ge.value.staking,4))+" BSCS",1),Fe]),o("div",We,[o("div",je,[o("div",null,"Claim:"+r(ze(Ge.value.bonus,4))+" BNB",1)]),Ee]),o("div",Ie,[o("div",Ue,[o("div",null," Redeem:"+r(ze(Ge.value.staking,4))+" BSCS ",1)]),_e]),$e])])])])])}}}),[["__scopeId","data-v-6554ce96"]]);export{Ge as default};
