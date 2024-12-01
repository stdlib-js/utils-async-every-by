// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(e="undefined"!=typeof globalThis?globalThis:e||self).everyByAsync=r()}(this,(function(){"use strict";var e="function"==typeof Object.defineProperty?Object.defineProperty:null;var r=Object.defineProperty;function t(e){return"number"==typeof e}function n(e){var r,t="";for(r=0;r<e;r++)t+="0";return t}function i(e,r,t){var i=!1,o=r-e.length;return o<0||(function(e){return"-"===e[0]}(e)&&(i=!0,e=e.substr(1)),e=t?e+n(o):n(o)+e,i&&(e="-"+e)),e}var o=String.prototype.toLowerCase,a=String.prototype.toUpperCase;function c(e){var r,n,c;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(n=e.arg,c=parseInt(n,10),!isFinite(c)){if(!t(n))throw new Error("invalid integer. Value: "+n);c=0}return c<0&&("u"===e.specifier||10!==r)&&(c=4294967295+c+1),c<0?(n=(-c).toString(r),e.precision&&(n=i(n,e.precision,e.padRight)),n="-"+n):(n=c.toString(r),c||e.precision?e.precision&&(n=i(n,e.precision,e.padRight)):n="",e.sign&&(n=e.sign+n)),16===r&&(e.alternate&&(n="0x"+n),n=e.specifier===a.call(e.specifier)?a.call(n):o.call(n)),8===r&&e.alternate&&"0"!==n.charAt(0)&&(n="0"+n),n}var u=Math.abs,l=String.prototype.toLowerCase,s=String.prototype.toUpperCase,f=String.prototype.replace,p=/e\+(\d)$/,g=/e-(\d)$/,d=/^(\d+)$/,y=/^(\d+)e/,h=/\.0$/,b=/\.0*e/,v=/(\..*[^0])0*e/;function m(e){var r,n,i=parseFloat(e.arg);if(!isFinite(i)){if(!t(e.arg))throw new Error("invalid floating-point number. Value: "+n);i=e.arg}switch(e.specifier){case"e":case"E":n=i.toExponential(e.precision);break;case"f":case"F":n=i.toFixed(e.precision);break;case"g":case"G":u(i)<1e-4?((r=e.precision)>0&&(r-=1),n=i.toExponential(r)):n=i.toPrecision(e.precision),e.alternate||(n=f.call(n,v,"$1e"),n=f.call(n,b,"e"),n=f.call(n,h,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return n=f.call(n,p,"e+0$1"),n=f.call(n,g,"e-0$1"),e.alternate&&(n=f.call(n,d,"$1."),n=f.call(n,y,"$1.e")),i>=0&&e.sign&&(n=e.sign+n),n=e.specifier===s.call(e.specifier)?s.call(n):l.call(n)}function w(e){var r,t="";for(r=0;r<e;r++)t+=" ";return t}var j=String.fromCharCode,_=Array.isArray;function E(e){return e!=e}function O(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function T(e){var r,t,n,o,a,u,l,s,f,p,g,d,y;if(!_(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(u="",l=1,s=0;s<e.length;s++)if(n=e[s],"string"==typeof n)u+=n;else{if(r=void 0!==n.precision,!(n=O(n)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+s+"`. Value: `"+n+"`.");for(n.mapping&&(l=n.mapping),t=n.flags,f=0;f<t.length;f++)switch(o=t.charAt(f)){case" ":n.sign=" ";break;case"+":n.sign="+";break;case"-":n.padRight=!0,n.padZeros=!1;break;case"0":n.padZeros=t.indexOf("-")<0;break;case"#":n.alternate=!0;break;default:throw new Error("invalid flag: "+o)}if("*"===n.width){if(n.width=parseInt(arguments[l],10),l+=1,E(n.width))throw new TypeError("the argument for * width at position "+l+" is not a number. Value: `"+n.width+"`.");n.width<0&&(n.padRight=!0,n.width=-n.width)}if(r&&"*"===n.precision){if(n.precision=parseInt(arguments[l],10),l+=1,E(n.precision))throw new TypeError("the argument for * precision at position "+l+" is not a number. Value: `"+n.precision+"`.");n.precision<0&&(n.precision=1,r=!1)}switch(n.arg=arguments[l],n.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(n.padZeros=!1),n.arg=c(n);break;case"s":n.maxWidth=r?n.precision:-1,n.arg=String(n.arg);break;case"c":if(!E(n.arg)){if((a=parseInt(n.arg,10))<0||a>127)throw new Error("invalid character code. Value: "+n.arg);n.arg=E(a)?String(n.arg):j(a)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(n.precision=6),n.arg=m(n);break;default:throw new Error("invalid specifier: "+n.specifier)}n.maxWidth>=0&&n.arg.length>n.maxWidth&&(n.arg=n.arg.substring(0,n.maxWidth)),n.padZeros?n.arg=i(n.arg,n.width||n.precision,n.padRight):n.width&&(n.arg=(p=n.arg,g=n.width,d=n.padRight,y=void 0,(y=g-p.length)<0?p:p=d?p+w(y):w(y)+p)),u+=n.arg||"",l+=1}return u}var S=/%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;function A(e){var r={mapping:e[1]?parseInt(e[1],10):void 0,flags:e[2],width:e[3],precision:e[5],specifier:e[6]};return"."===e[4]&&void 0===e[5]&&(r.precision="1"),r}function x(e){var r,t,n,i;for(t=[],i=0,n=S.exec(e);n;)(r=e.slice(i,S.lastIndex-n[0].length)).length&&t.push(r),t.push(A(n)),i=S.lastIndex,n=S.exec(e);return(r=e.slice(i)).length&&t.push(r),t}function P(e){var r,t;if("string"!=typeof e)throw new TypeError(P("invalid argument. First argument must be a string. Value: `%s`.",e));for(r=[x(e)],t=1;t<arguments.length;t++)r.push(arguments[t]);return T.apply(null,r)}var k,I=Object.prototype,F=I.toString,V=I.__defineGetter__,R=I.__defineSetter__,C=I.__lookupGetter__,N=I.__lookupSetter__;k=function(){try{return e({},"x",{}),!0}catch(e){return!1}}()?r:function(e,r,t){var n,i,o,a;if("object"!=typeof e||null===e||"[object Array]"===F.call(e))throw new TypeError(P("invalid argument. First argument must be an object. Value: `%s`.",e));if("object"!=typeof t||null===t||"[object Array]"===F.call(t))throw new TypeError(P("invalid argument. Property descriptor must be an object. Value: `%s`.",t));if((i="value"in t)&&(C.call(e,r)||N.call(e,r)?(n=e.__proto__,e.__proto__=I,delete e[r],e[r]=t.value,e.__proto__=n):e[r]=t.value),o="get"in t,a="set"in t,i&&(o||a))throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");return o&&V&&V.call(e,r,t.get),a&&R&&R.call(e,r,t.set),e};var $=k;function B(e,r,t){$(e,r,{configurable:!1,enumerable:!1,writable:!1,value:t})}var G=/./;function L(e){return"boolean"==typeof e}var M="function"==typeof Symbol&&"symbol"==typeof Symbol("foo");function Z(){return M&&"symbol"==typeof Symbol.toStringTag}var U=Object.prototype.toString;var W=Object.prototype.hasOwnProperty;function X(e,r){return null!=e&&W.call(e,r)}var q="function"==typeof Symbol?Symbol:void 0,z="function"==typeof q?q.toStringTag:"";var Y=Z()?function(e){var r,t,n;if(null==e)return U.call(e);t=e[z],r=X(e,z);try{e[z]=void 0}catch(r){return U.call(e)}return n=U.call(e),r?e[z]=t:delete e[z],n}:function(e){return U.call(e)},D=Boolean,J=Boolean.prototype.toString;var H=Z();function K(e){return"object"==typeof e&&(e instanceof D||(H?function(e){try{return J.call(e),!0}catch(e){return!1}}(e):"[object Boolean]"===Y(e)))}function Q(e){return L(e)||K(e)}B(Q,"isPrimitive",L),B(Q,"isObject",K);var ee="object"==typeof self?self:null,re="object"==typeof window?window:null,te="object"==typeof global?global:null,ne="object"==typeof globalThis?globalThis:null;var ie=function(e){if(arguments.length){if(!L(e))throw new TypeError(P("invalid argument. Must provide a boolean. Value: `%s`.",e));if(e)return new Function("return this;")()}if(ne)return ne;if(ee)return ee;if(re)return re;if(te)return te;throw new Error("unexpected error. Unable to resolve global object.")}(),oe=ie.document&&ie.document.childNodes,ae=Int8Array;function ce(){return/^\s*function\s*([^(]*)/i}var ue=/^\s*function\s*([^(]*)/i;B(ce,"REGEXP",ue);var le=Array.isArray?Array.isArray:function(e){return"[object Array]"===Y(e)};function se(e){return null!==e&&"object"==typeof e}function fe(e){var r,t,n,i;if(("Object"===(t=Y(e).slice(8,-1))||"Error"===t)&&e.constructor){if("string"==typeof(n=e.constructor).name)return n.name;if(r=ue.exec(n.toString()))return r[1]}return se(i=e)&&(i._isBuffer||i.constructor&&"function"==typeof i.constructor.isBuffer&&i.constructor.isBuffer(i))?"Buffer":t}B(se,"isObjectLikeArray",function(e){if("function"!=typeof e)throw new TypeError(P("invalid argument. Must provide a function. Value: `%s`.",e));return function(r){var t,n;if(!le(r))return!1;if(0===(t=r.length))return!1;for(n=0;n<t;n++)if(!1===e(r[n]))return!1;return!0}}(se));var pe="function"==typeof G||"object"==typeof ae||"function"==typeof oe?function(e){return fe(e).toLowerCase()}:function(e){var r;return null===e?"null":"object"===(r=typeof e)?fe(e).toLowerCase():r};function ge(e){return"function"===pe(e)}var de=Math.floor;function ye(e){return de(e)===e}var he=9007199254740991;var be=Number.POSITIVE_INFINITY;function ve(){var e,r=arguments,t="https://stdlib.io/e/"+r[0]+"?";for(e=1;e<r.length;e++)t+="&arg[]="+encodeURIComponent(r[e]);return t}var me,we=Object,je=Object.getPrototypeOf;me=ge(Object.getPrototypeOf)?je:function(e){var r=function(e){return e.__proto__}(e);return r||null===r?r:"[object Function]"===Y(e.constructor)?e.constructor.prototype:e instanceof Object?Object.prototype:null};var _e=me;var Ee=Object.prototype;function Oe(e){var r;return!!function(e){return"object"==typeof e&&null!==e&&!le(e)}(e)&&(r=function(e){return null==e?null:(e=we(e),_e(e))}(e),!r||!X(e,"constructor")&&X(r,"constructor")&&ge(r.constructor)&&"[object Function]"===Y(r.constructor)&&X(r,"isPrototypeOf")&&ge(r.isPrototypeOf)&&(r===Ee||function(e){var r;for(r in e)if(!X(e,r))return!1;return!0}(e)))}function Te(e){return"number"==typeof e}var Se=Number,Ae=Se.prototype.toString;var xe=Z();function Pe(e){return"object"==typeof e&&(e instanceof Se||(xe?function(e){try{return Ae.call(e),!0}catch(e){return!1}}(e):"[object Number]"===Y(e)))}function ke(e){return Te(e)||Pe(e)}B(ke,"isPrimitive",Te),B(ke,"isObject",Pe);var Ie=Se.NEGATIVE_INFINITY;function Fe(e){return e<be&&e>Ie&&ye(e)}function Ve(e){return Te(e)&&Fe(e)}function Re(e){return Pe(e)&&Fe(e.valueOf())}function Ce(e){return Ve(e)||Re(e)}function Ne(e){return Ve(e)&&e>0}function $e(e){return Re(e)&&e.valueOf()>0}function Be(e){return Ne(e)||$e(e)}function Ge(e){if(e.__esModule)return e;var r=e.default;if("function"==typeof r){var t=function e(){return this instanceof e?Reflect.construct(r,arguments,this.constructor):r.apply(this,arguments)};t.prototype=r.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(e).forEach((function(r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})})),t}B(Ce,"isPrimitive",Ve),B(Ce,"isObject",Re),B(Be,"isPrimitive",Ne),B(Be,"isObject",$e);var Le=Ge(Object.freeze({__proto__:null,default:()=>()=>{}}))("every-by-async:limit");function Me(e,r){var t,n,i;if(t={},arguments.length>1){if(n=function(e,r){return Oe(r)?(X(r,"thisArg")&&(e.thisArg=r.thisArg),X(r,"series")&&(e.series=r.series,!L(e.series))?new TypeError(ve("1R52o","series",e.series)):X(r,"limit")&&(e.limit=r.limit,!Ne(e.limit))?new TypeError(ve("1R53P","limit",e.limit)):null):new TypeError(ve("1R52V",r))}(t,e),n)throw n;i=r}else i=e;if(!ge(i))throw new TypeError(ve("1R53q",i));return t.series?t.limit=1:t.limit||(t.limit=be),function(e,r){if(n=e,!("object"==typeof n&&null!==n&&"number"==typeof n.length&&ye(n.length)&&n.length>=0&&n.length<=he))throw new TypeError(ve("1R5Ah",e));var n;if(!ge(r))throw new TypeError(ve("1R53q",r));return function(e,r,t,n){var i,o,a,c,u,l,s;if(u=e.length,Le("Collection length: %d",u),0===u)return Le("Finished processing a collection."),n(null,!0);for(c=u<r.limit?u:r.limit,Le("Concurrency limit: %d",c),Le("Number of arguments: %d",t.length),i=u-1,o=0,l=-1,s=0;s<c;s++)l<i&&f();function f(){Le("Collection element %d: %s.",l+=1,JSON.stringify(e[l])),2===t.length?t.call(r.thisArg,e[l],p):3===t.length?t.call(r.thisArg,e[l],l,p):t.call(r.thisArg,e[l],l,e,p)}function p(e,r){if(!a)return e?(a=!0,Le("Encountered an error: %s",e.message),n(e)):(Le("Processed %d of %d collection elements.",o+=1,u),Le("Test result: %s",!!r),r||a?l<i?f():o===u?(Le("Finished processing a collection."),n(null,!0)):void 0:(a=!0,Le("Finished processing a collection."),n(null,!1)))}}(e,t,i,(function(e,t){if(e)return r(e,!1);r(null,t)}))}}function Ze(e,r,t,n){if(arguments.length<4)return Me(r)(e,t);Me(r,t)(e,n)}return B(Ze,"factory",Me),Ze}));
//# sourceMappingURL=index.js.map