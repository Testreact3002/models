!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.models=e():t.models=e()}("undefined"!=typeof self?self:this,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){const n=r(1),o=r(2);t.exports={binary:n,sea:o}},function(t,e){t.exports={bin2dec:function(t="0"){for(var e,r,n=t.split(""),o=n.length,i=0;i<o&&"0"===n.start;i++);if("function"==typeof BigInt)r=BigInt(0),e=BigInt(1);else{if(o-i>53)throw Error("Number overflow");r=0,e=1}for(let t=i;t<o;t++)r<<=e,"1"===n[t]&&r++;return r}}},function(t,e,r){const n=r(3);class o{constructor(t=0){this.x=t%23}get dices(){return[6*Math.random()+1|0,6*Math.random()+1|0]}set to(t=[0,0]){this.x+=t[0]+t[1],this.x%=23}valueOf(){return this.x}}function i(t,e){var r=new e;class i extends t{constructor(t){super(),this.color=t,this.p=new o,this.bitten=0}swim(t){r.remove(this),this.p.to=t,r.add(this),this.emit(n.SEA_FISH__SWIM)}get dices(){const t=this.p.dices;return this.emit(n.SEA_FISH__DICE,t),t}toString(){return"bitten "+this.bitten+" times"}display(){this.emit(n.SEA_FISH__DISP)}toJSON(){return{color:this.color,name:this.name,bitten:this.bitten,p:0|this.p}}}class s extends i{constructor(t){super(t),this.bites=0}bite(){r.at(this.p,t=>{t!==this&&t.name!=this.name&&(t.bitten++,this.bites++,this.emit(n.SEA_FISH__BITE,{bitten:t}),t.display(),this.display())})}swim(t){super.swim(t),this.bite()}toString(){return"bites "+this.bites+" times"+super.toString()}toJSON(){var t=super.toJSON();return t.bites=0|this.bites,t}}return{Biteable:s,Swimable:i,sea:r,Shark:class extends s{get name(){return"shark"}toString(){return"Shark "+super.toString()}},Turtle:class extends s{get name(){return"turtle"}toString(){return"Turtle "+super.toString()}},Jellyfish:class extends i{get name(){return"jellyfish"}toString(){return"Jellyfish "+super.toString()}},Starfish:class extends i{get name(){return"starfish"}toString(){return"Starfish "+super.toString()}}}}t.exports={creator:i,Sea:class{constructor(){this.board=Array(23);for(let t=0;t<24;t++)this.board[t]=new Set}add(t){this.board[0|t.p].add(t)}remove(t){this.board[0|t.p].delete(t)}at(t,e){this.board[0|t].forEach(e)}print(){for(let t=0;t<24;t++)this.board[t].forEach(t=>{console.log(t)})}},deepSea:function(t,e){const{Biteable:r,Swimable:o,sea:s,Shark:u,Turtle:a,Jellyfish:l,Starfish:S}=i(t,e);let c=[new S,new S,new S,new u,new l,new a];c.forEach(t=>{t.on(n.SEA_FISH__DICE,(function(t){console.log(n.SEA_FISH__DICE,t.target,t.data)})),t.on(n.SEA_FISH__SWIM,(function(t){console.log(n.SEA_FISH__SWIM,t.target)})),t.on(n.SEA_FISH__BITE,(function(t){console.log(n.SEA_FISH__BITE,t.target,t.data)})),t.on(n.SEA_FISH__DISP,(function(t){console.log(n.SEA_FISH__DISP,t.target)}))});let f,_=0;!function t(e=0){if(e>=c.length){if(_>=3e3)return void clearTimeout(f);e=0}let r=c[e];const n=r.dices;r.swim(n),f=setTimeout(t,3e3,++e)}()},types:n}},function(t,e){t.exports={SEA_FISH__SWIM:"SEA_FISH__SWIM",SEA_FISH__BITE:"SEA_FISH__BYTE",SEA_FISH__DICE:"SEA_FISH__DICE",SEA_FISH__DISP:"SEA_FISH__DISPLAY"}}])}));
//# sourceMappingURL=index.js.map